'use client';

/* refs: 
https://tkdodo.eu/blog/zustand-and-react-context
https://gist.github.com/bryanltobing/e09cb4bb110c4d10cefde665b572d899#file-viewmodelzustand-tsx-L22-L27
*/
import type { AppRouterOutputs } from '@barely/lib/server/api/router';
import type {
	ActionNode,
	AddToMailchimpAudienceNode,
	BooleanEdge,
	BooleanNode,
	EmptyNode,
	FlowEdge,
	FlowState,
	SendEmailFromTemplateGroupNode,
	SendEmailNode,
	SimpleEdge,
	TriggerNode,
	WaitNode,
} from '@barely/lib/server/routes/flow/flow.ui.types';
import type { StoreApi } from 'zustand';
import { createContext, use, useContext, useState } from 'react';
import { useToast } from '@barely/lib/hooks/use-toast';
import { getFlowLayout } from '@barely/lib/server/routes/flow/flow.layout';
import {
	getDefaultFlowAction,
	getDefaultFlowAction_empty,
	hasEdgeLoop,
} from '@barely/lib/server/routes/flow/flow.utils';
import { newId } from '@barely/lib/utils/id';
import { addEdge, applyEdgeChanges, applyNodeChanges } from '@xyflow/react';
import { createStore, useStore } from 'zustand';

const FlowStoreContext = createContext<StoreApi<FlowState> | null>(null);

export const FlowStoreProvider = ({
	children,
	initialFlow,
	defaultEmailAddress,
	initialDefaultEmailTemplateGroup,
	initialDefaultMailchimpAudienceId,
}: {
	children: React.ReactNode;
	initialFlow: Promise<AppRouterOutputs['flow']['byId']>;
	defaultEmailAddress: Promise<AppRouterOutputs['emailAddress']['default']>;
	initialDefaultMailchimpAudienceId: Promise<
		AppRouterOutputs['mailchimp']['defaultAudience']
	>;
	initialDefaultEmailTemplateGroup: Promise<
		AppRouterOutputs['emailTemplateGroup']['default']
	>;
}) => {
	const initialData = use(initialFlow);
	const defaultFromEmail = use(defaultEmailAddress);
	const defaultMailchimpAudienceId = use(initialDefaultMailchimpAudienceId);
	const defaultEmailTemplateGroup = use(initialDefaultEmailTemplateGroup);
	const flowId = initialData.flow.id;

	const { toast } = useToast();

	const [flowStore] = useState(() =>
		createStore<FlowState>((set, get) => ({
			nodes: initialData.uiNodes ?? [],
			edges: initialData.uiEdges ?? [],
			currentNode: null,

			// history
			history: [],
			historyIndex: -1,
			saveSnapshot: () => {
				const currentState = {
					nodes: get().nodes,
					edges: get().edges,
				};
				console.log('saving snapshot', currentState);
				const historyIndex = get().historyIndex;
				set({
					history: [...get().history.slice(0, historyIndex + 1), currentState],
					historyIndex: historyIndex + 1,
				});
			},
			undo: () => {
				const historyIndex = get().historyIndex;
				if (historyIndex <= 0) return;
				const history = get().history;
				const nodes = history[historyIndex - 1]?.nodes;
				const edges = history[historyIndex - 1]?.edges;
				if (!nodes || !edges) return;
				set({
					nodes,
					edges,
					historyIndex: historyIndex - 1,
				});
				return setTimeout(() => {
					get().onLayout('TB');
				}, 0);
			},
			redo: () => {
				const historyIndex = get().historyIndex;
				const history = get().history;
				const nodes = history[historyIndex + 1]?.nodes;
				const edges = history[historyIndex + 1]?.edges;
				if (!nodes || !edges) return;
				set({
					nodes,
					edges,
					historyIndex: historyIndex + 1,
				});
				return setTimeout(() => {
					get().onLayout('TB');
				}, 0);
			},

			onNodesChange: changes => {
				set({
					nodes: applyNodeChanges(changes, get().nodes),
				});
			},

			onEdgesChange: changes => {
				set({
					edges: applyEdgeChanges(changes, get().edges),
				});
			},

			onConnect: connection => {
				// console.log('onConnect', connection);

				const hasLoop = hasEdgeLoop([...get().edges, connection]);
				console.log('hasLoop', hasLoop);

				if (hasLoop) {
					toast('Cannot create a loop');
					return;
				}

				// if the source is an empty node, instead of adding a new edge we should
				// modify the existing edge to point to the target

				const prevNodes = get().nodes;
				const prevEdges = get().edges;

				const sourceNode = prevNodes.find(node => node.id === connection.source);
				// const targetNode = prevNodes.find(node => node.id === connection.target);

				if (sourceNode?.type === 'empty') {
					const edgeAboveEmpty = prevEdges.find(
						edge => edge.target === connection.source,
					);
					if (edgeAboveEmpty) {
						return set({
							nodes: prevNodes.filter(node => node.id !== sourceNode.id),
							edges: prevEdges.map(edge => {
								if (edge.id === edgeAboveEmpty.id) {
									return {
										...edge,
										target: connection.target,
									};
								}
								return edge;
							}),
						});
					}
				}

				set({
					edges: addEdge(connection, get().edges),
				});
			},

			setCurrentNode: (id: string) => {
				const node = get().nodes.find(node => node.id === id);
				set({ currentNode: node });
			},

			setNodes: nodes => {
				console.log('setting nodes', nodes);
				set({ nodes });
			},

			setEdges: edges => {
				set({ edges });
			},

			replaceEmptyWithActionNode: (id: string, type: ActionNode['type']) => {
				const spacing = { x: 0, y: 100 }; // Horizontal and vertical spacing

				const prevNodes = get().nodes;
				const replacedNodeIndex = prevNodes.findIndex(node => node.id === id);
				const replacedNode = prevNodes[replacedNodeIndex];

				if (!replacedNode) {
					console.error('Node not found');
					return set({ nodes: prevNodes });
				}

				// calculate the new position
				const emptyNodeX = replacedNode.position.x;
				const emptyNodeWidth = replacedNode.measured?.width ?? 0;
				const emptyNodeY = replacedNode.position.y;

				// fixme: this is hacky. we should hardcode widths
				const newNodeWidth =
					type === 'boolean' ?
						prevNodes.find(node => node.type === 'boolean')?.measured?.width ?? 0
					: type === 'wait' ?
						prevNodes.find(node => node.type === 'wait')?.measured?.width ?? 0
					: type === 'sendEmail' ?
						prevNodes.find(node => node.type === 'sendEmail')?.measured?.width ?? 0
					:	0;

				const newNodeX = emptyNodeX + (emptyNodeWidth - newNodeWidth) / 2;

				const updatedNodes = prevNodes.map((node, index) => {
					if (index === replacedNodeIndex) {
						try {
							const { flowActionNode } = getDefaultFlowAction({
								flowId,
								id,
								position: { x: newNodeX, y: emptyNodeY },
								type,
								toast,
								mailchimpAudienceId: defaultMailchimpAudienceId ?? undefined,
								emailTemplateGroupId: defaultEmailTemplateGroup?.id ?? undefined,
								emailTemplate:
									defaultFromEmail ?
										{
											fromId: defaultFromEmail?.id ?? undefined,
										}
									:	undefined,
							});

							return flowActionNode;
						} catch (error) {
							console.error('Error creating flow action node', error);
							return node;
						}
					} else if (index > replacedNodeIndex) {
						return {
							...node,
							position: { ...node.position, y: node.position.y + spacing.y },
						};
					}
					return node;
				});

				const newEmptyNodeY = emptyNodeY + spacing.y;

				if (type === 'boolean') {
					const { flowActionNode: newTrueNode } = getDefaultFlowAction_empty({
						flowId,
						position: { x: newNodeX - spacing.x / 2, y: newEmptyNodeY },
					});

					const { flowActionNode: newFalseNode } = getDefaultFlowAction_empty({
						flowId,
						position: { x: newNodeX + spacing.x / 2, y: newEmptyNodeY },
					});

					updatedNodes.push(newTrueNode, newFalseNode);

					set({ nodes: updatedNodes });

					const updatedEdges = get().edges.filter(edge => edge.source !== id);

					updatedEdges.push(
						{
							id: `e-${id}-${newTrueNode.id}`,
							type: 'boolean',
							data: {
								boolean: true,
							},
							source: id,
							target: newTrueNode.id,
							deletable: false,
						} satisfies BooleanEdge,
						{
							id: `e-${id}-${newFalseNode.id}`,
							type: 'boolean',
							data: {
								boolean: false,
							},
							source: id,
							target: newFalseNode.id,
							deletable: false,
						} satisfies BooleanEdge,
					);

					set({ edges: updatedEdges });
				} else {
					const newNode: EmptyNode = {
						id: newId('flowAction'),
						type: 'empty',
						deletable: false,
						position: { x: newNodeX, y: newEmptyNodeY },
						data: {},
					};

					updatedNodes.push(newNode);

					set({ nodes: updatedNodes });

					const updatedEdges = get().edges.filter(edge => edge.source !== id);
					updatedEdges.push({
						id: `e-${id}-${newNode.id}`,
						source: id,
						target: newNode.id,
						deletable: false,
						type: 'simple',
					} satisfies SimpleEdge);

					set({ edges: updatedEdges });
				}

				get().saveSnapshot();

				return setTimeout(() => {
					get().onLayout('TB');
				}, 100);
			},

			updateTriggerNode: (id: string, data: TriggerNode['data']) => {
				const prevNodes = get().nodes;
				const triggerNodeIndex = prevNodes.findIndex(node => node.id === id);
				const triggerNode = prevNodes[triggerNodeIndex];

				if (!triggerNode) {
					console.error('Node not found');
					return set({ nodes: prevNodes });
				}

				const updatedNodes = prevNodes.map(node => {
					if (node.id === id) {
						const updatedTriggerNode: TriggerNode = {
							...node,
							type: 'trigger',
							data,
						};
						return updatedTriggerNode;
					}
					return node;
				});

				set({ nodes: updatedNodes });
			},

			updateWaitNode: (id: string, data: WaitNode['data']) => {
				const prevNodes = get().nodes;
				const waitNodeIndex = prevNodes.findIndex(node => node.id === id);
				const waitNode = prevNodes[waitNodeIndex];

				if (!waitNode) {
					console.error('Node not found');
					return set({ nodes: prevNodes });
				}

				const updatedNodes = prevNodes.map(node => {
					if (node.id === id) {
						const updatedWaitNote: WaitNode = {
							...node,
							type: 'wait',
							data,
						};
						return updatedWaitNote;
					}
					return node;
				});

				set({ nodes: updatedNodes });
			},

			updateSendEmailNode: (id: string, data: SendEmailNode['data']) => {
				const prevNodes = get().nodes;
				const sendEmailNodeIndex = prevNodes.findIndex(node => node.id === id);
				const sendEmailNode = prevNodes[sendEmailNodeIndex];

				if (!sendEmailNode) {
					console.error('Node not found');
					return set({ nodes: prevNodes });
				}

				const updatedNodes = prevNodes.map(node => {
					if (node.id === id) {
						const updatedSendEmailNode: SendEmailNode = {
							...node,
							type: 'sendEmail',
							data,
						};
						return updatedSendEmailNode;
					}
					return node;
				});

				return set({ nodes: updatedNodes });
			},

			updateSendEmailFromTemplateGroupNode: (
				id: string,
				data: SendEmailFromTemplateGroupNode['data'],
			) => {
				const prevNodes = get().nodes;
				const sendEmailFromTemplateGroupNodeIndex = prevNodes.findIndex(
					node => node.id === id,
				);
				const sendEmailFromTemplateGroupNode =
					prevNodes[sendEmailFromTemplateGroupNodeIndex];
				if (!sendEmailFromTemplateGroupNode) {
					console.error('Node not found');
					return set({ nodes: prevNodes });
				}

				const updatedNodes = prevNodes.map(node => {
					if (node.id === id) {
						return {
							...node,
							type: 'sendEmailFromTemplateGroup',
							data,
						} satisfies SendEmailFromTemplateGroupNode;
					}
					return node;
				});

				return set({ nodes: updatedNodes });
			},

			updateBooleanNode: (id: string, data: BooleanNode['data']) => {
				const prevNodes = get().nodes;
				const booleanNodeIndex = prevNodes.findIndex(node => node.id === id);
				const booleanNode = prevNodes[booleanNodeIndex];
				if (!booleanNode) {
					console.error('Node not found');
					return set({ nodes: prevNodes });
				}

				const updatedNodes = prevNodes.map(node => {
					if (node.id === id) {
						const updatedBooleanNode: BooleanNode = {
							...node,
							type: 'boolean',
							data,
						};
						return updatedBooleanNode;
					}
					return node;
				});
				return set({ nodes: updatedNodes });
			},

			updateAddToMailchimpAudienceNode: (
				id: string,
				data: AddToMailchimpAudienceNode['data'],
			) => {
				const prevNodes = get().nodes;
				const addToMailchimpAudienceNodeIndex = prevNodes.findIndex(
					node => node.id === id,
				);
				const addToMailchimpAudienceNode = prevNodes[addToMailchimpAudienceNodeIndex];
				if (!addToMailchimpAudienceNode) {
					console.error('Node not found');
					return set({ nodes: prevNodes });
				}

				const updatedNodes = prevNodes.map(node => {
					if (node.id === id) {
						return {
							...node,
							type: 'addToMailchimpAudience',
							data,
						} satisfies AddToMailchimpAudienceNode;
					}
					return node;
				});

				return set({ nodes: updatedNodes });
			},

			// insert in between nodes
			canInsertNodeInEdge: (edgeId: string) => {
				const edges = get().edges;
				const edge = edges.find(edge => edge.id === edgeId);

				const target = edge ? get().nodes.find(node => node.id === edge.target) : null;

				if (!target || target.type === 'empty') return false;
				return true;
			},

			insertActionNodeInEdge: (edgeId: string, type: ActionNode['type']) => {
				const prevEdges = get().edges;
				const prevNodes = get().nodes;

				const prevEdge = prevEdges.find(edge => edge.id === edgeId);
				if (!prevEdge) return;

				const source = get().nodes.find(node => node.id === prevEdge.source);
				if (!source || source.type === 'empty') return;

				const target = get().nodes.find(node => node.id === prevEdge.target);
				if (!target || target.type === 'empty') return;

				// create new node
				const { flowActionNode } = getDefaultFlowAction({
					flowId,
					id: newId('flowAction'),
					position: { x: target.position.x, y: target.position.y + 100 },
					type,
					toast,
					mailchimpAudienceId: defaultMailchimpAudienceId ?? undefined,
					emailTemplateGroupId: defaultEmailTemplateGroup?.id ?? undefined,
					emailTemplate:
						defaultFromEmail ?
							{
								fromId: defaultFromEmail?.id ?? undefined,
							}
						:	undefined,
				});

				set({ nodes: [...prevNodes, flowActionNode] });

				// remove current edge
				const updatedEdges = prevEdges.filter(edge => edge.id !== edgeId);

				// connect prev source to new node
				updatedEdges.push({
					...prevEdge,
					id: `e-${prevEdge.source}-${flowActionNode.id}`,
					// source: prevEdge.source,
					target: flowActionNode.id,
				} satisfies FlowEdge);

				// connect new node to prev target
				updatedEdges.push({
					...prevEdge,
					id: `e-${flowActionNode.id}-${prevEdge.target}`,
					source: flowActionNode.id,
					// target: prevEdge.target,
					deletable: false,
					type: 'simple',
				} satisfies SimpleEdge);

				set({ edges: updatedEdges });

				get().saveSnapshot();

				return setTimeout(() => {
					get().onLayout('TB');
				}, 100);
			},

			updateNodeEnabled: (id: string, enabled: boolean) => {
				const prevNodes = get().nodes;
				const nodeIndex = prevNodes.findIndex(node => node.id === id);
				const node = prevNodes[nodeIndex];
				if (!node) return;

				const updatedNodes = prevNodes.map(node => {
					if (node.id === id) {
						if (node.type === 'trigger') {
							return {
								...node,
								data: {
									...node.data,
									enabled,
								},
							} satisfies TriggerNode;
						}
						if (node.type === 'wait') {
							return {
								...node,
								data: {
									...node.data,
									enabled,
								},
							} satisfies WaitNode;
						}

						if (node.type === 'sendEmail') {
							return {
								...node,
								data: {
									...node.data,
									enabled,
								},
							} satisfies SendEmailNode;
						}

						if (node.type === 'sendEmailFromTemplateGroup') {
							return {
								...node,
								data: {
									...node.data,
									enabled,
								},
							} satisfies SendEmailFromTemplateGroupNode;
						}

						if (node.type === 'addToMailchimpAudience') {
							return {
								...node,
								data: {
									...node.data,
									enabled,
								},
							} satisfies AddToMailchimpAudienceNode;
						}

						if (node.type === 'boolean') {
							return {
								...node,
								data: {
									...node.data,
									enabled,
								},
							} satisfies BooleanNode;
						}

						return {
							...node,
							data: {
								...node.data,
								enabled,
							},
						} satisfies EmptyNode;
					}
					return node;
				});

				set({ nodes: updatedNodes });
			},

			//layout
			onLayout: (direction: 'TB' | 'LR' = 'TB') => {
				const initialNodes = get().nodes;
				const initialEdges = get().edges;

				const { nodes: layoutedNodes, edges: layoutedEdges } = getFlowLayout(
					initialNodes,
					initialEdges,
					direction,
				);

				set({
					nodes: [...layoutedNodes],
					edges: [...layoutedEdges],
				});
			},

			// modal
			showTriggerModal: false,
			setShowTriggerModal: (open: boolean) => {
				set({ showTriggerModal: open });
			},
			showEmailModal: false,
			setShowEmailModal: (open: boolean) => {
				set({ showEmailModal: open });
			},
			showEmailFromTemplateGroupModal: false,
			setShowEmailFromTemplateGroupModal: (open: boolean) => {
				set({ showEmailFromTemplateGroupModal: open });
			},
			showWaitModal: false,
			setShowWaitModal: (open: boolean) => {
				set({ showWaitModal: open });
			},
			showBooleanModal: false,
			setShowBooleanModal: (open: boolean) => {
				set({ showBooleanModal: open });
			},
			showMailchimpAudienceModal: false,
			setShowMailchimpAudienceModal: (open: boolean) => {
				set({ showMailchimpAudienceModal: open });
			},
		})),
	);

	return (
		<FlowStoreContext.Provider value={flowStore}>{children}</FlowStoreContext.Provider>
	);
};

export const useFlowStore = <T,>(selector: (state: FlowState) => T) => {
	const flowStore = useContext(FlowStoreContext);
	if (!flowStore) {
		throw new Error('useFlowStore must be used within a FlowStoreProvider');
	}
	return useStore(flowStore, selector);
};

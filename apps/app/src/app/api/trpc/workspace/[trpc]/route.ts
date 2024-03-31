import { workspaceRouter } from '@barely/lib/server/routes/workspace/workspace.router';
import { setCorsHeaders } from '@barely/lib/utils/cors';
import { createTRPCContext } from '@barely/server/api/trpc';
import { auth } from '@barely/server/auth';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const runtime = 'edge';

export function OPTIONS() {
	const response = new Response(null, {
		status: 204,
	});
	setCorsHeaders(response);
	return response;
}

const handler = auth(async req => {
	console.log('workspaceRouter!');

	const response = await fetchRequestHandler({
		endpoint: '/api/trpc/workspace',
		router: workspaceRouter,
		req,
		createContext: () =>
			createTRPCContext({
				session: req.auth,
				headers: req.headers,
			}),
		onError({ error, path }) {
			console.error(`>>> tRPC Error on '${path}'`, error);
		},
	}).catch(err => {
		console.error('err => ', err);
		return new Response(null, {
			statusText: 'Internal Server Error',
			status: 500,
		});
	});

	setCorsHeaders(response);

	return response;
});

export { handler as GET, handler as POST };

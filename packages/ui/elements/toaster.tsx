"use client";

// import {
// 	Toast,
// 	ToastClose,
// 	ToastDescription,
// 	ToastProvider,
// 	ToastTitle,
// 	ToastViewport,
// } from './toast';
// import { useToast } from '@barely/toast/src/use-toast';

// export function Toaster() {
// 	const { toasts } = useToast();

// 	return (
// 		<ToastProvider swipeDirection='right'>
// 			{toasts.map(function ({ id, title, description, action, ...props }) {
// 				return (
// 					<Toast key={id} {...props}>
// 						<div className='grid gap-1'>
// 							{title && <ToastTitle>{title}</ToastTitle>}
// 							{description && <ToastDescription>{description}</ToastDescription>}
// 						</div>
// 						{action}
// 						<ToastClose />
// 					</Toast>
// 				);
// 			})}
// 			<ToastViewport />
// 		</ToastProvider>
// 	);
// }

export { Toaster } from "@barely/toast/src/toaster";

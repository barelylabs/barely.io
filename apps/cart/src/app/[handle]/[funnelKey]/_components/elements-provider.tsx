'use client';

import type { EdgeRouterOutputs } from '@barely/lib/server/api/router.edge';
import type { InsertCart } from '@barely/lib/server/cart.schema';
import type { StripeElementsOptions } from '@stripe/stripe-js';
import { use, useState } from 'react';
import { isProduction } from '@barely/lib/utils/environment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

export function ElementsProvider({
	initialData,
	children,
}: {
	stage: InsertCart['stage'];
	initialData: Promise<EdgeRouterOutputs['cart']['createByFunnelKey']>;
	children: React.ReactNode;
}) {
	const { cart, funnel } = use(initialData);

	const stripeAccount = isProduction()
		? funnel.workspace.stripeConnectAccountId ?? undefined
		: funnel.workspace.stripeConnectAccountId_devMode ?? undefined;

	const clientSecret = cart.mainStripeClientSecret;

	const options: StripeElementsOptions = {
		clientSecret: clientSecret,
		appearance: {
			theme: 'stripe',
			variables: {
				colorPrimary: '#ffffff',
				colorBackground: '#ffffff',
				colorTextSecondary: '#f1f5f9',

				spacingUnit: '4px',
				fontSizeBase: '14px',
				fontFamily: 'Inter, sans-serif',
			},
			rules: {
				'.Label': { color: '#ffffff' },
				'.CheckboxLabel': { color: '#ffffff' },
			},
		},
		fonts: [
			{
				cssSrc: 'https://fonts.googleapis.com/css?family=Inter',
			},
		],
		loader: 'always',
	};

	const [stripePromise] = useState(() =>
		loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '', {
			stripeAccount,
		}),
	);

	return (
		<Elements stripe={stripePromise} options={options}>
			{children}
		</Elements>
	);
}

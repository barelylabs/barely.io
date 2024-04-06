import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

type RateLimitTime =
	| `${number} ms`
	| `${number} s`
	| `${number} m`
	| `${number} h`
	| `${number} d`;

const devPortSchema = z
	.string()
	.optional()
	.refine(v => process.env.VERCEL_ENV !== 'development' || !!v, {
		message: 'You need a dev port in order to run the app locally',
	});

export const env = createEnv({
	server: {
		AWS_S3_BUCKET_NAME: z.string(),
		AWS_S3_REGION: z.string(),
		AWS_S3_ACCESS_KEY_ID: z.string(),
		AWS_S3_SECRET_ACCESS_KEY: z.string(),
		BOT_SPOTIFY_ACCOUNT_ID: z.string(),
		BOT_THREADS_API_KEY: z.string(),
		DATABASE_URL: z.string().url(),
		DATABASE_POOL_URL: z.string().url(),
		GANDI_API_KEY: z.string(),
		LOCALHOST_IP: z.string(),
		META_TEST_EVENT_CODE: z.string().optional(),
		NEXTAUTH_SECRET: z.string(),
		OPENAI_API_KEY: z.string(),
		OPENAI_ORG_ID: z.string(),
		PUSHER_APP_SECRET: z.string(),
		RATE_LIMIT_RECORD_LINK_CLICK: z
			.string()
			.refine(
				v => {
					const isValid = /^\d+\s[msdh](s)?$/i.test(v);
					return isValid;
				},
				{
					message: 'Rate limit must be in the format: {number} {ms|s|m|h|d|ms}',
				},
			)
			.transform(v => {
				return v as RateLimitTime;
			})
			.optional()
			.default('1 h'),
		RESEND_API_KEY: z.string(),
		SCREENING_PHONE_NUMBER: z.string(),
		SHIPENGINE_API_KEY: z.string(),
		SPOTIFY_CLIENT_ID: z.string(),
		SPOTIFY_CLIENT_SECRET: z.string(),
		STRIPE_SECRET_KEY: z.string(),
		TINYBIRD_API_KEY: z.string(),
		TWILIO_ACCOUNT_SID: z.string(),
		TWILIO_AUTH_TOKEN: z.string(),
		TWILIO_PHONE_NUMBER: z.string(),
		UPSTASH_REDIS_REST_URL: z.string().url(),
		UPSTASH_REDIS_REST_TOKEN: z.string(),
		VERCEL_ENV: z.enum(['development', 'preview', 'production']),
		VERCEL_LINK_PROJECT_ID: z.string(),
		VERCEL_TEAM_ID: z.string(),
		VERCEL_TOKEN: z.string(),
	},
	client: {
		NEXT_PUBLIC_APP_BASE_URL: z.string().url(),
		NEXT_PUBLIC_APP_DEV_PORT: devPortSchema,
		NEXT_PUBLIC_BIO_BASE_URL: z.string().url(),
		NEXT_PUBLIC_BIO_DEV_PORT: devPortSchema,
		NEXT_PUBLIC_CART_BASE_URL: z.string().url(),
		NEXT_PUBLIC_CART_DEV_PORT: devPortSchema,
		NEXT_PUBLIC_PRESS_BASE_URL: z.string().url(),
		NEXT_PUBLIC_PRESS_DEV_PORT: devPortSchema,
		NEXT_PUBLIC_CURRENT_APP: z.enum(['app', 'bio', 'cart', 'link', 'press', 'www']),
		NEXT_PUBLIC_LINK_BASE_URL: z.string().url(),
		NEXT_PUBLIC_LINK_DEV_PORT: devPortSchema,
		NEXT_PUBLIC_PUSHER_APP_ID: z.string(),
		NEXT_PUBLIC_PUSHER_APP_KEY: z.string(),
		NEXT_PUBLIC_PUSHER_APP_CLUSTER: z.string(),
		NEXT_PUBLIC_VERCEL_ENV: z.enum(['development', 'preview', 'production']),
		NEXT_PUBLIC_WWW_BASE_URL: z.string().url(),
		NEXT_PUBLIC_WWW_DEV_PORT: devPortSchema,
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
		NEXT_PUBLIC_APP_DEV_PORT: process.env.NEXT_PUBLIC_APP_DEV_PORT,
		NEXT_PUBLIC_BIO_BASE_URL: process.env.NEXT_PUBLIC_BIO_BASE_URL,
		NEXT_PUBLIC_BIO_DEV_PORT: process.env.NEXT_PUBLIC_BIO_DEV_PORT,
		NEXT_PUBLIC_CART_BASE_URL: process.env.NEXT_PUBLIC_CART_BASE_URL,
		NEXT_PUBLIC_CART_DEV_PORT: process.env.NEXT_PUBLIC_CART_DEV_PORT,
		NEXT_PUBLIC_PRESS_BASE_URL: process.env.NEXT_PUBLIC_PRESS_BASE_URL,
		NEXT_PUBLIC_PRESS_DEV_PORT: process.env.NEXT_PUBLIC_PRESS_DEV_PORT,
		NEXT_PUBLIC_CURRENT_APP: process.env.NEXT_PUBLIC_CURRENT_APP,
		NEXT_PUBLIC_LINK_BASE_URL: process.env.NEXT_PUBLIC_LINK_BASE_URL,
		NEXT_PUBLIC_LINK_DEV_PORT: process.env.NEXT_PUBLIC_LINK_DEV_PORT,
		NEXT_PUBLIC_PUSHER_APP_ID: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
		NEXT_PUBLIC_PUSHER_APP_KEY: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
		NEXT_PUBLIC_PUSHER_APP_CLUSTER: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
		NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
		NEXT_PUBLIC_WWW_BASE_URL: process.env.NEXT_PUBLIC_WWW_BASE_URL,
		NEXT_PUBLIC_WWW_DEV_PORT: process.env.NEXT_PUBLIC_WWW_DEV_PORT,
	},
	skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});

// export const { env, clientEnv } = zEnv({
// 	serverEnvKeys: [
// 		'AWS_S3_BUCKET_NAME',
// 		'AWS_S3_REGION',
// 		'AWS_S3_ACCESS_KEY_ID',
// 		'AWS_S3_SECRET_ACCESS_KEY',
// 		'BOT_SPOTIFY_ACCOUNT_ID',
// 		'BOT_THREADS_API_KEY',
// 		'CLOUDINARY_API_SECRET',
// 		'EASYPOST_API_KEY',
// 		'GANDI_API_KEY',
// 		'LOCALHOST_IP',
// 		'META_TEST_EVENT_CODE',
// 		'NEXTAUTH_SECRET',
// 		'OPENAI_API_KEY',
// 		'OPENAI_ORG_ID',
// 		'PUSHER_APP_SECRET',
// 		'RATE_LIMIT_RECORD_LINK_CLICK',
// 		'RESEND_API_KEY',
// 		'SCREENING_PHONE_NUMBER',
// 		'SHIPENGINE_API_KEY',
// 		'SPOTIFY_CLIENT_ID',
// 		'SPOTIFY_CLIENT_SECRET',
// 		'STRIPE_SECRET_KEY',
// 		'TINYBIRD_API_KEY',
// 		'TWILIO_ACCOUNT_SID',
// 		'TWILIO_AUTH_TOKEN',
// 		'TWILIO_PHONE_NUMBER',
// 		'UPSTASH_REDIS_REST_URL',
// 		'UPSTASH_REDIS_REST_TOKEN',
// 		'VERCEL_ENV',
// 		'VERCEL_LINK_PROJECT_ID',
// 		'VERCEL_TEAM_ID',
// 		'VERCEL_TOKEN',
// 		'DATABASE_URL',
// 		'DATABASE_POOL_URL',
// 	],
// 	clientEnvKeys: [
// 		'NEXT_PUBLIC_APP_BASE_URL',
// 		'NEXT_PUBLIC_APP_DEV_PORT',
// 		'NEXT_PUBLIC_BIO_BASE_URL',
// 		'NEXT_PUBLIC_BIO_DEV_PORT',
// 		'NEXT_PUBLIC_CART_BASE_URL',
// 		'NEXT_PUBLIC_CART_DEV_PORT',
// 		'NEXT_PUBLIC_PRESS_BASE_URL',
// 		'NEXT_PUBLIC_PRESS_DEV_PORT',
// 		'NEXT_PUBLIC_CLOUDINARY_API_KEY',
// 		'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
// 		'NEXT_PUBLIC_CURRENT_APP',
// 		'NEXT_PUBLIC_LINK_BASE_URL',
// 		'NEXT_PUBLIC_LINK_DEV_PORT',
// 		'NEXT_PUBLIC_PUSHER_APP_ID',
// 		'NEXT_PUBLIC_PUSHER_APP_KEY',
// 		'NEXT_PUBLIC_PUSHER_APP_CLUSTER',
// 		'NEXT_PUBLIC_VERCEL_ENV',
// 		'NEXT_PUBLIC_WWW_BASE_URL',
// 		'NEXT_PUBLIC_WWW_DEV_PORT',
// 	],
// });

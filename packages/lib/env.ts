import { zEnv } from '@barely/env';

export const { env, clientEnv } = zEnv({
	serverEnvKeys: [
		'AWS_S3_BUCKET_NAME',
		'AWS_S3_REGION',
		'AWS_S3_ACCESS_KEY_ID',
		'AWS_S3_SECRET_ACCESS_KEY',
		'BOT_SPOTIFY_ACCOUNT_ID',
		'BOT_THREADS_API_KEY',
		'CLOUDINARY_API_SECRET',
		'EASYPOST_API_KEY',
		'GANDI_API_KEY',
		'LOCALHOST_IP',
		'META_TEST_EVENT_CODE',
		'NEXTAUTH_SECRET',
		'OPENAI_API_KEY',
		'OPENAI_ORG_ID',
		'PUSHER_APP_SECRET',
		'RATE_LIMIT_RECORD_LINK_CLICK',
		'RESEND_API_KEY',
		'SCREENING_PHONE_NUMBER',
		'SHIPENGINE_API_KEY',
		'SPOTIFY_CLIENT_ID',
		'SPOTIFY_CLIENT_SECRET',
		'STRIPE_SECRET_KEY',
		'TINYBIRD_API_KEY',
		'TWILIO_ACCOUNT_SID',
		'TWILIO_AUTH_TOKEN',
		'TWILIO_PHONE_NUMBER',
		'UPSTASH_REDIS_REST_URL',
		'UPSTASH_REDIS_REST_TOKEN',
		'VERCEL_ENV',
		'VERCEL_LINK_PROJECT_ID',
		'VERCEL_TEAM_ID',
		'VERCEL_TOKEN',
		'DATABASE_URL',
		'DATABASE_POOL_URL',
	],
	clientEnvKeys: [
		'NEXT_PUBLIC_APP_BASE_URL',
		'NEXT_PUBLIC_APP_DEV_PORT',
		'NEXT_PUBLIC_BIO_BASE_URL',
		'NEXT_PUBLIC_BIO_DEV_PORT',
		'NEXT_PUBLIC_CART_BASE_URL',
		'NEXT_PUBLIC_CART_DEV_PORT',
		'NEXT_PUBLIC_PRESS_BASE_URL',
		'NEXT_PUBLIC_PRESS_DEV_PORT',
		'NEXT_PUBLIC_CLOUDINARY_API_KEY',
		'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME',
		'NEXT_PUBLIC_CURRENT_APP',
		'NEXT_PUBLIC_LINK_BASE_URL',
		'NEXT_PUBLIC_LINK_DEV_PORT',
		'NEXT_PUBLIC_PUSHER_APP_ID',
		'NEXT_PUBLIC_PUSHER_APP_KEY',
		'NEXT_PUBLIC_PUSHER_APP_CLUSTER',
		'NEXT_PUBLIC_VERCEL_ENV',
		'NEXT_PUBLIC_WWW_BASE_URL',
		'NEXT_PUBLIC_WWW_DEV_PORT',
	],
});

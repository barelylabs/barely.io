import { pickClientEnvSchema, pickServerEnvSchema, zEnv } from "@barely/env";
import { z } from "zod";

const serverEnvSchema = pickServerEnvSchema([
  "AUTH_URL",
  "BOT_SPOTIFY_ACCOUNT_ID",
  "BOT_THREADS_API_KEY",
  "CLOUDINARY_API_SECRET",
  "GANDI_API_KEY",
  "LOCALHOST_IP",
  "NAMESILO_API_KEY",
  "NEXTAUTH_SECRET",
  "OPENAI_API_KEY",
  "OPENAI_ORG_ID",
  "PUSHER_APP_SECRET",
  "RESEND_API_KEY",
  "SCREENING_PHONE_NUMBER",
  "SPOTIFY_CLIENT_ID",
  "SPOTIFY_CLIENT_SECRET",
  "STRIPE_SECRET_KEY",
  "TINYBIRD_API_KEY",
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_PHONE_NUMBER",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "VERCEL_ENV",
  "VERCEL_LINK_PROJECT_ID",
  "VERCEL_TEAM_ID",
  "VERCEL_TOKEN",
  "DATABASE_URL",
  "DATABASE_POOL_URL",
]);

const clientEnvSchema = pickClientEnvSchema([
  "NEXT_PUBLIC_APP_BASE_URL",
  "NEXT_PUBLIC_APP_BASE_URL",
  "NEXT_PUBLIC_CLOUDINARY_API_KEY",
  "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
  "NEXT_PUBLIC_PUSHER_APP_ID",
  "NEXT_PUBLIC_PUSHER_APP_KEY",
  "NEXT_PUBLIC_PUSHER_APP_CLUSTER",
]);

const env = zEnv({ serverEnvSchema, clientEnvSchema });

export const clientEnv = zEnv({
  serverEnvSchema: z.object({}),
  clientEnvSchema,
});

export default env;

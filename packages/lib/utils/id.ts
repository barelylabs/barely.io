// a ref: https://unkey.dev/blog/uuid-ux

import { createId } from "@paralleldrive/cuid2";
import { customAlphabet } from "nanoid";

export const nanoid = customAlphabet(
  "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
);

const prefixes = {
  user: "user",
  workspace: "ws",
  providerAccount: "provider_account",
  // web
  link: "link",
  bio: "bio",
  press: "pr",
  webSession: "web_session",
  // assets
  playlist: "pl",
  track: "tr",
  // campaigns
  campaign: "camp",
  playlistPitchReview: "plpr",
  // forms
  form: "form",
  formResponse: "form_res",
  // payments
  transaction: "tx",
  lineItem: "txli",
} as const;

export function newId(prefix: keyof typeof prefixes) {
  return [prefixes[prefix], nanoid(16)].join("_");
}

export const randomKey = nanoid(7); // 7-character random string

export function newCuid() {
  return createId();
}

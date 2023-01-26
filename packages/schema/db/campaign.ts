import * as z from "zod"
import { campaignTypeSchema } from "./campaigntype"
import { campaignStageSchema } from "./campaignstage"
import { UserRelations, userRelationsSchema, userBaseSchema } from "./user"
import { TrackRelations, trackRelationsSchema, trackBaseSchema } from "./track"
import { PlaylistRelations, playlistRelationsSchema, playlistBaseSchema } from "./playlist"
import { AdCampaignRelations, adCampaignRelationsSchema, adCampaignBaseSchema } from "./adcampaign"
import { PitchReviewRelations, pitchReviewRelationsSchema, pitchReviewBaseSchema } from "./pitchreview"
import { CampaignUpdateRecordRelations, campaignUpdateRecordRelationsSchema, campaignUpdateRecordBaseSchema } from "./campaignupdaterecord"
import { LineItemRelations, lineItemRelationsSchema, lineItemBaseSchema } from "./lineitem"

export const campaignBaseSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  type: campaignTypeSchema,
  stage: campaignStageSchema,
  endDate: z.date().nullable(),
  createdById: z.string(),
  trackId: z.string(),
  playlistId: z.string().nullable(),
})

export interface CampaignRelations {
  createdBy: z.infer<typeof userBaseSchema> & UserRelations
  track: z.infer<typeof trackBaseSchema> & TrackRelations
  playlist: (z.infer<typeof playlistBaseSchema> & PlaylistRelations) | null
  adCampaigns: (z.infer<typeof adCampaignBaseSchema> & AdCampaignRelations)[]
  pitchReviews: (z.infer<typeof pitchReviewBaseSchema> & PitchReviewRelations)[]
  updates: (z.infer<typeof campaignUpdateRecordBaseSchema> & CampaignUpdateRecordRelations)[]
  lineItems: (z.infer<typeof lineItemBaseSchema> & LineItemRelations)[]
}

export const campaignRelationsSchema: z.ZodObject<{
  [K in keyof CampaignRelations]: z.ZodType<CampaignRelations[K]>
}> = z.object({
  createdBy: z.lazy(() => userBaseSchema.merge(userRelationsSchema)),
  track: z.lazy(() => trackBaseSchema.merge(trackRelationsSchema)),
  playlist: z.lazy(() => playlistBaseSchema.merge(playlistRelationsSchema)).nullable(),
  adCampaigns: z.lazy(() => adCampaignBaseSchema.merge(adCampaignRelationsSchema)).array(),
  pitchReviews: z.lazy(() => pitchReviewBaseSchema.merge(pitchReviewRelationsSchema)).array(),
  updates: z.lazy(() => campaignUpdateRecordBaseSchema.merge(campaignUpdateRecordRelationsSchema)).array(),
  lineItems: z.lazy(() => lineItemBaseSchema.merge(lineItemRelationsSchema)).array(),
})

export const campaignSchema = campaignBaseSchema
  .merge(campaignRelationsSchema)

export const campaignCreateSchema = campaignBaseSchema
  .extend({
    endDate: campaignBaseSchema.shape.endDate.unwrap(),
    playlistId: campaignBaseSchema.shape.playlistId.unwrap(),
  }).partial({
    id: true,
    createdAt: true,
    endDate: true,
    createdById: true,
    trackId: true,
    playlist: true,
    playlistId: true,
    adCampaigns: true,
    pitchReviews: true,
    updates: true,
    lineItems: true,
  })

export const campaignUpdateSchema = campaignBaseSchema
  .extend({
    endDate: campaignBaseSchema.shape.endDate.unwrap(),
    playlistId: campaignBaseSchema.shape.playlistId.unwrap(),
  })
  .partial()
  

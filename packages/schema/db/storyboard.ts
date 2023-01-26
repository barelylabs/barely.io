import * as z from "zod"
import { UserRelations, userRelationsSchema, userBaseSchema } from "./user"
import { StoryColumnRelations, storyColumnRelationsSchema, storyColumnBaseSchema } from "./storycolumn"

export const storyBoardBaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  createdById: z.string(),
  color: z.string().nullable(),
})

export interface StoryBoardRelations {
  createdBy: z.infer<typeof userBaseSchema> & UserRelations
  members: (z.infer<typeof userBaseSchema> & UserRelations)[]
  columns: (z.infer<typeof storyColumnBaseSchema> & StoryColumnRelations)[]
}

export const storyBoardRelationsSchema: z.ZodObject<{
  [K in keyof StoryBoardRelations]: z.ZodType<StoryBoardRelations[K]>
}> = z.object({
  createdBy: z.lazy(() => userBaseSchema.merge(userRelationsSchema)),
  members: z.lazy(() => userBaseSchema.merge(userRelationsSchema)).array(),
  columns: z.lazy(() => storyColumnBaseSchema.merge(storyColumnRelationsSchema)).array(),
})

export const storyBoardSchema = storyBoardBaseSchema
  .merge(storyBoardRelationsSchema)

export const storyBoardCreateSchema = storyBoardBaseSchema
  .extend({
    color: storyBoardBaseSchema.shape.color.unwrap(),
  }).partial({
    id: true,
    createdAt: true,
    createdById: true,
    members: true,
    color: true,
    columns: true,
  })

export const storyBoardUpdateSchema = storyBoardBaseSchema
  .extend({
    color: storyBoardBaseSchema.shape.color.unwrap(),
  })
  .partial()
  

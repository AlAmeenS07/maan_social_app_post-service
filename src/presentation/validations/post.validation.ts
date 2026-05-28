import { z } from "zod";


export const createPostSchema = z.object({

   content: z
      .string()
      .trim()
      .min(15, "Post content is required minimum 15 words")
      .max(2500, "Post content too long"),

   media: z
      .array(
         z.string().url("Invalid media URL")
      )
      .optional()
});


export const updatePostSchema = z.object({

   content: z
      .string()
      .trim()
      .min(15, "Post content is required minimum 15 words")
      .max(2500, "Post content too long")
      .optional(),

   media: z
      .array(
         z.string().url("Invalid media URL")
      )
      .optional()
});
import { z } from "zod";

export const postFormSchema = z.object({
  privacy: z.enum(["public", "friends", "private"]),
  content: z.string().min(1, "Post content is required").max(1000, "Post is too long"),
});

export type PostSchemaType = z.infer<typeof postFormSchema>;

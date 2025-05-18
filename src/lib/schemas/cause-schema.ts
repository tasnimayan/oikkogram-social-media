import { z } from "zod";

export const causeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  neighborhood_id: z.string().uuid().optional(),
  location: z.string().min(3, "Location must be at least 3 characters"),
  category: z.string().min(1, "Please select a category"),
  tags: z.array(z.string()).nullable().optional(),
  goal_type: z.string(),
  goal_value: z.number().int().positive().optional().nullable(),
  start_date: z.date(),
  end_date: z.date().optional().nullable(),
});

export type CauseFormValues = z.infer<typeof causeSchema>;

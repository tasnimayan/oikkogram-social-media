import { z } from "zod";

export const volunteerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
  skills: z.string().min(1, "Please select a skill"),
  description: z.string().max(500, "Description must be at most 500 characters").optional(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms to continue",
  }),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;

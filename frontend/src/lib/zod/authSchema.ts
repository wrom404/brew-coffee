import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address").max(100, "Email must be less than 100 characters"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters"),
})

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type SignUpSchema = z.infer<typeof signUpSchema>;

export type SignInSchema = z.infer<typeof signInSchema>;
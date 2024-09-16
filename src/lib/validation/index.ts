import { z } from "zod";

export const signUpValidationSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long",
  }),
  email: z
    .string()
    .email("Invalid email")
    .min(1, { message: "Email is required" }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const signinValidationSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .min(1, { message: "Email is required" }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  bio: z.string(),
});

// ============================================================
// POST
// ============================================================
export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  file: z.custom<File[]>(),
  tags: z.string(),
});
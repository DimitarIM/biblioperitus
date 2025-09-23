import z from "zod";

export const LoginFormSchema = z.object({
    email: z.email({ message: "Enter a valid email address" }),
    password: z.string().min(8),
})

export const SignupFormSchema = z.object({
    username: z.string().min(3),
    email: z.string().min(2).max(50),
    password: z.string().min(8),
})
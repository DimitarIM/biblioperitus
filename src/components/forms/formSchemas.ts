import z from "zod";

export const LoginFormSchema = z.object({
    email: z.email({ message: "Enter a valid email address" }),
    password: z.string().min(4, "Password too short"),
})

export const SignupFormSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.email({ message: "Enter a valid email address"}),
    password: z.string().min(4, "Password too short"),
})
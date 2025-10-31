import { createAuthClient } from "better-auth/react";

const BASE_URL = process.env.BETTER_AUTH_URL;

export const authClient = createAuthClient({
    baseURL: BASE_URL
})
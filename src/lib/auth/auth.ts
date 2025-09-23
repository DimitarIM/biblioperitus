import { betterAuth } from "better-auth";
import { Pool } from "pg";
import dotenv from "dotenv";
import { nextCookies } from "better-auth/next-js";

dotenv.config();
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

export const auth = betterAuth({
    database: new Pool({
        connectionString: `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: GOOGLE_CLIENT_ID as string,
            clientSecret: GOOGLE_CLIENT_SECRET as string
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 3 * 60,
        }
    },
    plugins: [nextCookies()]
})

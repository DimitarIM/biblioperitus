"use server"

import { auth } from "./auth"

export const signIn = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        return {
            success: true,
            message: "Signed in successfully",
        }
    } catch (error) {
        return {
            success: false,
            message: "Signing failed"
        }
    }

}

export const signUp = async (username:string, email:string, password:string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                name: username,
                email,
                password,
            }
        })
        return {
            success: true,
            message: "Signed up successfully",
        }
    } catch (error) {
        return {
            success: false,
            message: "Sign up failed"
        }
    }
}


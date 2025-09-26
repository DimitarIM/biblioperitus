'use client'

import { motion, Variants } from "motion/react"
import { signIn } from '@/lib/auth/actions';
import { authClient } from '@/lib/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, RefObject } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { LoginFormSchema } from './formSchemas';
import { useParticleContext } from "@/store/useParticleContext";
import LogoIntro from "../LogoIntro";
import Dec3 from '@/assets/images/form_dec_3.svg'
import Dec2 from '@/assets/images/form_dec_2.svg'
import Dec1 from '@/assets/images/form_dec_1.svg'

function LoginForm({ ref }: { ref: RefObject<HTMLDivElement | null> }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isExpanding, setExpanding] = useState<boolean>(false);
    const [isShrinking, setShrinking] = useState<boolean>(false);
    const [isShrunk, setShrunk] = useState<boolean>(true);

    const ctx = useParticleContext();
    if (!ctx) return null;
    const { setClearCanvasState, clearCanvasState } = ctx;

    const shadowColor = "rgb(255, 249, 239)";
    const [shadows, setShadows] = useState<string>(
        `10px 10px 100px 30px ${shadowColor},
    -20px 20px 100px 30px ${shadowColor},
    30px -30px 100px 30px ${shadowColor},
    -40px -40px 100px 30px ${shadowColor},
    40px 30px 100px 30px ${shadowColor}`
    );

    const router = useRouter();

    useEffect(() => {
        console.log("clearCanvasState changed:", clearCanvasState);
    }, [clearCanvasState]);

    useEffect(() => {
        const interval = setInterval(() => {
            const layer1X = Math.floor(Math.random() * 10);
            const layer1Y = Math.floor(Math.random() * 10);

            const layer2X = Math.floor(Math.random() * 20 - 20);
            const layer2Y = Math.floor(Math.random() * 20);

            const layer3X = Math.floor(Math.random() * 30);
            const layer3Y = Math.floor(Math.random() * 30 - 30);

            const layer4X = Math.floor(Math.random() * 40 - 40);
            const layer4Y = Math.floor(Math.random() * 40 - 40);

            const layer5X = Math.floor(Math.random() * 40);
            const layer5Y = Math.floor(Math.random() * 30);

            const newShadow =
                `${layer1X}px ${layer1Y}px 100px 30px ${shadowColor},
            ${layer2X}px ${layer2Y}px 100px 30px ${shadowColor},
            ${layer3X}px ${layer3Y}px 100px 30px ${shadowColor},
            ${layer4X}px ${layer4Y}px 100px 30px ${shadowColor},
            ${layer5X}px ${layer5Y}px 100px 30px ${shadowColor}`
            setShadows(newShadow);
        }, 250);

        return () => clearInterval(interval);
    }, [])


    const signInWithGoogle = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const { register, handleSubmit } = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onLogin(values: z.infer<typeof LoginFormSchema>) {
        setIsLoading(true);
        const { success, message } = await signIn(values.email, values.password);
        if (success) {
            setShrinking(true);
            setClearCanvasState(true);
            console.log(message);
        }
        else {
            console.log(message);
        }
        setIsLoading(false);
    }

    function handleToSignUpBtn() {
        setExpanding(true);
    }

    const parentVariants: Variants = {
        start: { width: 0, height: 0 },
        settle: { width: "auto", height: "auto", opacity: 1, transition: { duration: 0.4 } },
        expand: { width: isExpanding ? "100vw" : 'auto', height: isExpanding ? '100vh' : 'auto', transition: { duration: 0.2, ease: "easeOut" } },
        shrink: { width: 0, height: 0, opacity: 0, transition: { duration: 0.4, ease: "easeIn" } },
    }

    const contentVariants: Variants = {
        visible: { opacity: 1, transition: { duration: 0.3 } },
        hidden: { opacity: 0, transition: { duration: 0.3 } },
    }

    function animateParentVariants() {
        if (isShrinking) return "shrink";
        if (!isExpanding) return "settle";
        else if (isExpanding) return "expand";
    }

    function animateContentVariants() {
        if (isShrinking) return "hidden";
        if (!isExpanding) return "visible";
        else if (isExpanding) return "hidden";
    }

    return (
        <>
            <motion.div
                ref={ref}
                variants={parentVariants}
                initial={"start"}
                animate={animateParentVariants()}
                onAnimationComplete={() => {
                    if (isExpanding) {
                        setTimeout(() => {
                            router.push("/signUp");
                        }, 600)
                    }
                    else if (isShrinking) {
                        setTimeout(() => {
                            router.push("/");
                        }, 500)
                    }
                }}
                style={{
                    boxShadow: shadows,
                    transition: 'box-shadow 0.5s ease-in-out',
                }}
                className='z-2 flex flex-col bg-foreground text-background rounded-[10px] justify-center items-center'>
                <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate={animateContentVariants()}
                    className="relative flex flex-col justify-center items-center gap-5 p-2">
                    <div className="relative flex flex-col justify-center items-center">
                        <h4 className='font-bold pt-3'>Login</h4>
                        <Dec3 className="absolute z-[-1] w-50 h-20 opacity-30 bottom-7 text-background" />
                    </div>

                    {/* <Dec3 className="absolute text-background w-20 h-20 opacity-[0.2] rotate-180 top-[-80px]"/> */}
                    <form className='flex flex-col gap-y-9 w-[300px]' onSubmit={handleSubmit(onLogin)}>
                        <div className='flex flex-col gap-2'>
                            <label className='pb-2'>Email</label>

                            <input {...register("email", { required: true })} type="email" placeholder="example@test.com" id='email' className='border-b border-background focus:outline-none' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label>Password</label>
                            <input {...register("password", { required: true })} type="password" placeholder="Enter your password" id='password' required className='border-b border-background focus:outline-none' />
                        </div>

                        <div className="relative flex flex-col justify-center items-center">
                            <button type='submit' className='flex justify-center items-center bg-detail text-foreground cursor-pointer h-6 min-w-60'>
                                {
                                    isLoading ? <Loader2 className="size-4 animate-spin" />
                                        : "Login"
                                }
                            </button>
                        </div>

                    </form>
                    <div className='flex justify-center items-center gap-2 pb-5'>
                        <h5 className="text-[1.2rem]">Not signed in yet? </h5> <button onClick={handleToSignUpBtn} className='text-detail cursor-pointer text-[1.3rem]'>Sign Up</button>
                        
                    </div>
                        <Dec3 className="absolute z-[-1] w-50 h-20 opacity-30 bottom-[-50px] rotate-180 text-background" />
                </motion.div>
            </motion.div>
            {/* {
                isShrunk && <LogoIntro bg="background"/>
            } */}
        </>


    )
}

export default LoginForm
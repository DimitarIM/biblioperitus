'use client'

import { signUp } from '@/lib/auth/actions';
import { authClient } from '@/lib/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { RefObject, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
import { SignupFormSchema } from './formSchemas';
import { motion, Variants } from 'motion/react';

function SignupForm({ ref }: { ref: RefObject<HTMLDivElement | null> }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isExpanding, setExpanding] = useState<boolean>(false);
    const [isShrinking, setShrinking] = useState<boolean>(false);

    const shadowColor = "rgb(5, 4, 3)";
    const [shadows, setShadows] = useState<string>(
        `10px 10px 100px 30px ${shadowColor},
        -20px 20px 100px 30px ${shadowColor},
        30px -30px 100px 30px ${shadowColor},
        -40px -40px 100px 30px ${shadowColor},
        40px 30px 100px 30px ${shadowColor}`
    );

    const router = useRouter();

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
            callbackURL: "/dashboard",
        });
    };

    const { register, handleSubmit } = useForm<z.infer<typeof SignupFormSchema>>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSignUp(values: z.infer<typeof SignupFormSchema>) {
        setIsLoading(true);
        const { success, message } = await signUp(values.username, values.email, values.password);

        if (success) {
            setShrinking(true);
            console.log(message);
        }
        else {
            console.log(message);
        }
        setIsLoading(false);

    }

    
    function handleToLoginBtn() {
        setExpanding(true);
    }

    const parentVariants: Variants = {
        start: {width: 0, height: 0},
        settle: {width: "auto", height: "auto", transition: {duration: 0.4}},
        expand: {width: isExpanding ? "100vw" : 'auto', height: isExpanding ? '100vh' : 'auto', transition: {duration: 0.2}}
    }

    const contentVariants: Variants = {
        visible: { opacity: 1, transition: { duration: 0.3 } },
        hidden: { opacity: 0, transition: { duration: 0.3 } },
    }

        function animateParentVariants() {
        if(isShrinking) return "start";
        if(!isExpanding) return "settle";
        else if(isExpanding) return "expand";
    }

    function animateContentVariants() {
        if(isShrinking) return "hidden";
        if(!isExpanding) return "visible";
        else if (isExpanding) return "hidden";
    }


    return (
            <motion.div
                ref={ref}
                variants={parentVariants}
                initial={"start"}
                animate={animateParentVariants()}
                onAnimationComplete={() => {
                    if (isExpanding) {
                        setTimeout(() => {
                            router.push("/login");
                        }, 500)
                    }
                    else if (isShrinking) {
                        router.push("/");
                }
                }}
                style={{
                    boxShadow: shadows,
                    transition: 'box-shadow 0.5s ease-in-out',
                }}
                className='relative z-2 flex flex-col bg-background text-foreground rounded-[10px] justify-center items-center'>
                <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate={animateContentVariants()}
                    className="flex flex-col justify-center items-center gap-5 p-2">
                    <h4 className='font-bold'>Sign Up</h4>
                    <form className='flex flex-col gap-y-9 w-[300px]' onSubmit={handleSubmit(onSignUp)}>
                        <div className='flex flex-col gap-2'>
                            <label className='pb-2'>Username</label>

                            <input {...register("username", { required: true })} type="username" placeholder="Enter your username" id='username' className='border-b border-background focus:outline-none' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='pb-2'>Email</label>

                            <input {...register("email", { required: true })} type="email" placeholder="example@test.com" id='email' className='border-b border-background focus:outline-none' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label>Password</label>
                            <input {...register("password", { required: true })} type="password" placeholder="Enter your password" id='password' required className='border-b border-background focus:outline-none' />
                        </div>

                        <button type='submit' className='bg-red-900 text-white cursor-pointer'>
                            {
                                isLoading ? <Loader2 className="size-4 animate-spin" />
                                    : "Login"
                            }
                        </button>
                    </form>
                    <div className='flex gap-2'>
                        <p>Already have an account? </p> <button onClick={handleToLoginBtn} className='font text-red-800'>Login</button>
                    </div>
                </motion.div>
            </motion.div>
    )
}

export default SignupForm
'use client'

import SignupForm from "@/components/forms/SignupForm"
import ParticleProvider from "@/components/effects/ParticleProvider"
import { useRef } from "react";
import { ParticleContextProvider } from "@/store/useParticleContext";

export default function SignUpPage() {
  const signUpRef = useRef<HTMLDivElement>(null);
  return (
    <ParticleContextProvider>
      <div className="flex min-h-screen flex-col items-center justify-center bg-foreground ">
        <ParticleProvider targetRef={signUpRef} color="rgb(5, 4, 3)" />
        <SignupForm ref={signUpRef} />
      </div>
    </ParticleContextProvider>

  )
}

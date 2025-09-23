'use client'

import LoginForm from "@/components/forms/LoginForm"
import ParticleProvider from "@/components/effects/ParticleProvider"
import { useRef } from "react"
import { ParticleContextProvider } from "@/store/useParticleContext";


export default function LoginPage() {
  const loginRef = useRef<HTMLDivElement>(null);

  return (
    <ParticleContextProvider>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <ParticleProvider targetRef={loginRef} color="rgba(255, 249, 239, 0.3)" />
        <LoginForm ref={loginRef} />
      </div>
    </ParticleContextProvider>

  )
}

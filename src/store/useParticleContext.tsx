import React, { createContext, RefObject, useContext, useState } from 'react'

interface ParticleContextType {
    clearCanvasState: boolean;
    setClearCanvasState: (value: boolean) => void;
}

const ParticleContext = createContext<ParticleContextType | null>(null);

export const ParticleContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [clearCanvasState, setClearCanvasState] = useState<boolean>(false);

    return (
        <ParticleContext.Provider value={{ clearCanvasState, setClearCanvasState }}>
            {children}
        </ParticleContext.Provider>
    )
}

export const useParticleContext = () => {
    return useContext(ParticleContext);
}
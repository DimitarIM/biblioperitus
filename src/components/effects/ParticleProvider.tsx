"use client";

import { RefObject, useEffect, useRef } from "react";
import { Particle } from "./particle";
import { useParticleContext } from "@/context/useParticleContext";

export default function ParticleProvider({ targetRef, color }: { targetRef?: RefObject<HTMLDivElement | null>, color: string }) {
    const ctx = useParticleContext();
    const { clearCanvasState } = ctx;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const clearCanvasRef = useRef<boolean>(clearCanvasState);

    useEffect(() => {
    clearCanvasRef.current = clearCanvasState;
    }, [clearCanvasState]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const target = targetRef!.current;

        if (!canvas || !target) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        let componentRect = target.getBoundingClientRect();
        const particles = Array.from({ length: 20 }, () => new Particle(canvas, componentRect));

        function animate() {
            ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
            componentRect = target!.getBoundingClientRect();

            particles.forEach((p) => {
                p.update(componentRect, clearCanvasRef.current);
                p.draw(ctx!, color);
            });
            requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full"
        />
    );
}
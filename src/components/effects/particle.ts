export class Particle {
    x!: number;
    y!: number;
    vx!: number;
    vy!: number;
    size!: number;
    maxSize!: number;
    growing!: boolean;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement, componentRect: DOMRect) {
        this.canvas = canvas;
        this.reset(componentRect);
    }

    reset(componentRect: DOMRect) {
        const distance: number = 40;
        const sides = Math.floor(Math.random() * 4);
        const randVelocity = (Math.random() - 0.5) * 0.2; // Can be negative
        const strVelocity = 0.5 + Math.random() * 0.2; // Cannot be negative!

        switch (sides) {
            case 0: // Top side
                this.x = componentRect.left + Math.random() * componentRect.width;
                this.y = componentRect.top - distance;
                this.vx = randVelocity;
                this.vy = -strVelocity;
                break;
            case 1: // Right side
                this.x = componentRect.right + distance;
                this.y = componentRect.top + Math.random() * componentRect.height;
                this.vx = strVelocity;
                this.vy = randVelocity;
                break;
            case 2: // Bottom side
                this.x = componentRect.left + Math.random() * componentRect.width;
                this.y = componentRect.bottom + distance;
                this.vx = randVelocity;
                this.vy = strVelocity;
                break;
            case 3: // Left side
                this.x = componentRect.left - distance;
                this.y = componentRect.top + Math.random() * componentRect.height;
                this.vx = -strVelocity;
                this.vy = randVelocity;
                break;
        }
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;

        this.size = 0;
        this.maxSize = 2 + Math.random() * 3;
        this.growing = true;
    }

    update(componentRect: DOMRect, clearCanvasState: boolean) {
        if (clearCanvasState) {
            this.size -= 1;
            if (this.size < 0) this.size = 0;
            return;
        }
        this.x += this.vx;
        this.y += this.vy;
        if (
            this.x < 0 ||
            this.x > this.canvas.width ||
            this.y < 0 ||
            this.y > this.canvas.height
        ) {
            this.reset(componentRect);
        }

        if (this.growing) {
            this.size += 0.005;
            if (this.size >= this.maxSize) this.growing = false;
        } else {
            this.size -= 0.005;
            if (this.size <= 0) {
                this.reset(componentRect)
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, color: string) {
        if (this.size <= 0) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}
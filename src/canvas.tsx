import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
} from 'react';
import { Color } from './types';

interface Props {
    mouseRadius: number;
    color1: Color;
    color2: Color;
}

type MousePosition = {
    x?: number;
    y?: number;
};

function Canvas({ mouseRadius, color1, color2 }: Props): JSX.Element {
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef(0);

    const color1rgb = `rgb(${color1.r}, ${color1.g}, ${color1.b})`;
    const color2rgb = `rgb(${color2.r}, ${color2.g}, ${color2.b})`;

    const [mouse, setMouse] = useState<MousePosition>({
        x: undefined,
        y: undefined,
    });

    const getContext = useCallback(() => {
        if (canvasElement && canvasElement.current) {
            return canvasElement.current.getContext('2d');
        }
    }, [canvasElement]);

    const [particles, setParticles] = useState<Particle[]>([]);

    const onMouseMove = (event: { x: number; y: number }) => {
        setMouse({ x: event.x - 50, y: event.y - 75 });
    };

    const onMouseOut = useCallback(() => {
        setMouse({ x: undefined, y: undefined });
    }, []);

    const onResize = useCallback(() => {
        if (canvasElement && canvasElement.current) {
            console.log('resize');
            canvasElement.current.width = window.innerWidth - 100;
            canvasElement.current.height = window.innerHeight - 150;
        }
    }, []);

    useEffect(() => {
        if (canvasElement && canvasElement.current) {
            canvasElement.current.addEventListener('mousemove', onMouseMove);
            canvasElement.current.addEventListener('mouseout', onMouseOut);
            window.addEventListener('resize', onResize);
        }
        return () => {
            if (canvasElement && canvasElement.current) {
                canvasElement.current.removeEventListener(
                    'mousemove',
                    onMouseMove
                );
                canvasElement.current.removeEventListener(
                    'mouseout',
                    onMouseOut
                );
                window.removeEventListener('resize', onResize);
            }
        };
    }, [canvasElement, onMouseOut]);

    const animate = useCallback(() => {
        requestRef.current = requestAnimationFrame(animate);
        const context = getContext();
        if (canvasElement && canvasElement.current && context) {
            context.clearRect(
                0,
                0,
                canvasElement.current.width,
                canvasElement.current.height
            );
            particles.forEach((particle) =>
                particle.update(
                    context,
                    mouse,
                    mouseRadius,
                    canvasElement.current,
                    color1,
                    color2
                )
            );
        } //   drawMouse();
    }, [particles, getContext, color1, color2, mouse, mouseRadius]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    });

    useEffect(() => {
        const canvas = canvasElement.current;
        if (canvas) {
            canvas.width = window.innerWidth - 100;
            canvas.height = window.innerHeight - 150;
            const newParticles: Particle[] = [];
            for (let i = 0; i < 500; i++) {
                const particle = new Particle(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    (Math.round(Math.random()) * 2 - 1) * Math.random(),
                    (Math.round(Math.random()) * 2 - 1) * Math.random(),
                    0,
                    'black'
                );
                newParticles.push(particle);
            }
            console.log('setting particles');
            setParticles(newParticles);
            animate();
        }
    }, []);

    return <canvas id='canvas' ref={canvasElement}></canvas>;
}

export default Canvas;

class Particle {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
    color: string;
    minSize: number;
    maxSize: number;
    mousedOver: boolean;
    mouseDistance: number;

    constructor(
        x: number,
        y: number,
        dx: number,
        dy: number,
        size: number,
        color: string
    ) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
        this.maxSize = 35;
        this.minSize = 0;
        this.mousedOver = false;
        this.mouseDistance = Infinity;
    }

    checkIsMousedOver(mouse: MousePosition, mouseRadius: number) {
        if (!mouse.x || !mouse.y) {
            this.mousedOver = false;
            return;
        }
        const a = mouse.x - this.x;
        const b = mouse.y - this.y;
        this.mouseDistance = Math.hypot(a, b);
        this.mousedOver = this.mouseDistance < mouseRadius;
    }

    move(canvas: HTMLCanvasElement | null) {
        if ( canvas) {
            if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
            if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;

            this.x += this.dx;
            this.y += this.dy;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.mousedOver || this.size > this.minSize) {
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
            context.fillStyle = this.color;
            //               context.shadowBlur = 1;
            //               context.shadowColor = this.color;
            context.fill();
            context.strokeStyle = 'white';
            //               context.stroke();
        }
    }

    grow() {
        if (this.size < this.maxSize && this.mousedOver) {
            this.size = Math.min(
                this.maxSize,
                this.size + 70 / this.mouseDistance
            );
        } else if (!this.mousedOver && this.size > this.minSize) {
            this.size = Math.max(this.minSize, this.size - 0.5);
        }
    }

    updateColor(color1: Color, color2: Color) {
        //     if (this.size > this.minSize) {
        const r =
            this.size * (((color2.r - color1.r) * 1) / this.maxSize) + color1.r;
        const g =
            this.size * (((color2.g - color1.g) * 1) / this.maxSize) + color1.g;
        const b =
            this.size * (((color2.b - color1.b) * 1) / this.maxSize) + color1.b;
        this.color = `rgb(${r}, ${g}, ${b})`;
        //     }
        //     this.color = blues[Math.floor((this.size / this.maxSize) * 2 - 1)];
    }

    update(
        context: CanvasRenderingContext2D,
        mouse: MousePosition,
        mouseRadius: number,
        canvas: HTMLCanvasElement | null,
        color1: Color,
        color2: Color
    ) {
        this.checkIsMousedOver(mouse, mouseRadius);
        this.grow();
        this.updateColor(color1, color2);
        this.move(canvas);
        this.draw(context);
    }
}

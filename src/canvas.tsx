import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
} from 'react';
import { RGBValue } from './types';
import { Shape } from './enums';

interface Props {
    mouseRadius: number;
    showMouseRadius: boolean;
    baseColor: RGBValue;
    highlightColor: RGBValue;
    minSize: number;
    maxSize: number;
    numParticles: number;
}

type MousePosition = {
    x?: number;
    y?: number;
};

function Canvas({
    mouseRadius,
    showMouseRadius,
    baseColor,
    highlightColor,
    minSize,
    maxSize,
    numParticles,
}: Props): JSX.Element {
    const canvasElement = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef(0);

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
        setMouse({ x: event.x - 50, y: event.y - 100 });
    };

    const onMouseOut = useCallback(() => {
        setMouse({ x: undefined, y: undefined });
    }, []);

    const onResize = useCallback(() => {
        if (canvasElement && canvasElement.current) {
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

    const drawMouse = useCallback(() => {
        const context = getContext();
        if (context && mouse.x && mouse.y) {
            context.beginPath();
            context.arc(mouse.x, mouse.y, mouseRadius, 0, 2 * Math.PI);
            context.strokeStyle = '#000';
            context.stroke();
        }
    }, [mouse, mouseRadius]);

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
                    baseColor,
                    highlightColor
                )
            );
        }
        if (showMouseRadius) {
            drawMouse();
        }
    }, [
        particles,
        getContext,
        baseColor,
        highlightColor,
        mouse,
        mouseRadius,
        showMouseRadius,
        drawMouse,
    ]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    });

    const generateParticles = () => {
        const canvas = canvasElement.current;
        if (canvas) {
            canvas.width = window.innerWidth - 100;
            canvas.height = window.innerHeight - 150;
            const newParticles: Particle[] = [];
            for (let i = 0; i < numParticles; i++) {
                newParticles.push(generateParticle(canvas.width, canvas.height, minSize, maxSize));
            }
            setParticles(newParticles);
        }
    }

    useEffect(() => {
        generateParticles();
    }, []);

    useEffect(() => {
        particles.forEach((particle) => particle.updateSize(minSize, maxSize));
    }, [minSize, maxSize]);

    useEffect(() => {
        generateParticles();
    }, [numParticles]);

    return <canvas id='canvas' ref={canvasElement}></canvas>;
}

export default Canvas;

function generateParticle(width:number, height:number, minSize:number, maxSize:number) {
    return new Particle(
        Math.random() * width,
        Math.random() * height,
        (Math.round(Math.random()) * 2 - 1) * Math.random(),
        (Math.round(Math.random()) * 2 - 1) * Math.random(),
        'black',
        minSize,
        maxSize,
        Shape.Circle
    );
}

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
    shape: Shape;

    constructor(
        x: number,
        y: number,
        dx: number,
        dy: number,
        color: string,
        minSize: number,
        maxSize: number,
        shape: Shape,
    ) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = minSize;
        this.color = color;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.mousedOver = false;
        this.mouseDistance = Infinity;
        this.shape = shape;
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
        if (canvas) {
            if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
            if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;

            this.x += this.dx;
            this.y += this.dy;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        if (this.mousedOver || this.size > 0) {
            context.beginPath();
            switch (this.shape) {
                case Shape.Circle:
                    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
                    break;
                case Shape.Square:
                    context.rect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
                    break;
            }
            context.fillStyle = this.color;
            context.fill();
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

    updateColor(baseColor: RGBValue, highlightColor: RGBValue) {
        const r =
            (this.size - this.minSize) * (((highlightColor.r - baseColor.r) * 1) / (this.maxSize - this.minSize)) + baseColor.r;
        const g =
            (this.size - this.minSize) * (((highlightColor.g - baseColor.g) * 1) / (this.maxSize - this.minSize)) + baseColor.g;
        const b =
            (this.size - this.minSize) * (((highlightColor.b - baseColor.b) * 1) / (this.maxSize - this.minSize)) + baseColor.b;
        this.color = `rgb(${r}, ${g}, ${b})`;
    }

    updateSize(minSize:number, maxSize:number) {
        this.minSize = minSize;
        this.maxSize = maxSize;
        if (this.size < minSize) {
            this.size = minSize;
        }
    }

    update(
        context: CanvasRenderingContext2D,
        mouse: MousePosition,
        mouseRadius: number,
        canvas: HTMLCanvasElement | null,
        baseColor: RGBValue,
        highlightColor: RGBValue
    ) {
        this.checkIsMousedOver(mouse, mouseRadius);
        this.grow();
        this.updateColor(baseColor, highlightColor);
        this.move(canvas);
        this.draw(context);
    }
}

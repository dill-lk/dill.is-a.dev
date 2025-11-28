import React, { useRef, useState, MouseEvent } from 'react';

interface TiltedCardProps {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
    scale?: number;
    easing?: string;
}

const TiltedCard: React.FC<TiltedCardProps> = ({
    children,
    className = '',
    maxTilt = 15,
    scale = 1.05,
    easing = 'cubic-bezier(0.23, 1, 0.32, 1)'
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState('');
    const [transition, setTransition] = useState('');

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const tiltX = (0.5 - y) * maxTilt; // Rotate around X axis (up/down)
        const tiltY = (x - 0.5) * maxTilt; // Rotate around Y axis (left/right)

        setTransform(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`);
        setTransition('');
    };

    const handleMouseLeave = () => {
        setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
        setTransition(`transform 500ms ${easing}`);
    };

    return (
        <div
            ref={ref}
            className={`relative transition-all duration-200 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                transition,
                transformStyle: 'preserve-3d',
            }}
        >
            {children}
        </div>
    );
};

export default TiltedCard;

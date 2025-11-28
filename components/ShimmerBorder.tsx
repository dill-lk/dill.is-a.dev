import React from 'react';

interface ShimmerBorderProps {
    children: React.ReactNode;
    className?: string;
    borderRadius?: string;
    shimmerColor?: string;
    duration?: number;
}

const ShimmerBorder: React.FC<ShimmerBorderProps> = ({
    children,
    className = '',
    borderRadius = '24px',
    shimmerColor = 'rgba(255, 255, 255, 0.3)',
    duration = 3
}) => {
    return (
        <div className={`relative ${className}`} style={{ borderRadius }}>
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    borderRadius,
                    background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)`,
                    backgroundSize: '200% 100%',
                    animation: `shimmer ${duration}s infinite`,
                    padding: '1px',
                    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                }}
            />
            {children}
        </div>
    );
};

export default ShimmerBorder;

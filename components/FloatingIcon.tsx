import React from 'react';

interface FloatingIconProps {
    children: React.ReactNode;
    className?: string;
    duration?: number;
    delay?: number;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({
    children,
    className = '',
    duration = 3,
    delay = 0
}) => {
    return (
        <div
            className={`floating-icon ${className}`}
            style={{
                animationDuration: `${duration}s`,
                animationDelay: `${delay}s`,
            }}
        >
            {children}
        </div>
    );
};

export default FloatingIcon;

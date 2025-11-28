import React from 'react';

interface AuroraBackgroundProps {
    className?: string;
    children?: React.ReactNode;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className = '', children }) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div
                className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                    backgroundImage: `
            radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.4) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(236, 72, 153, 0.4) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(34, 211, 238, 0.4) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.4) 0px, transparent 50%)
          `,
                    filter: 'blur(40px)',
                    animation: 'aurora 10s infinite alternate',
                }}
            />
            <div className="relative z-10">{children}</div>
        </div>
    );
};

export default AuroraBackground;

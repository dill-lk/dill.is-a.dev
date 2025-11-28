import React, { useEffect, useRef, useState } from 'react';

interface BlurFadeProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  yOffset?: number;
}

const BlurFade: React.FC<BlurFadeProps> = ({ 
  children, 
  delay = 0, 
  duration = 1000,
  className = '',
  yOffset = 20
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transform: isVisible ? 'translateY(0)' : `translateY(${yOffset}px)`,
        transition: `all ${duration}ms cubic-bezier(0.25, 0.4, 0.25, 1)`,
      }}
    >
      {children}
    </div>
  );
};

export default BlurFade;

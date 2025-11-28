
import React from 'react';
import CoffeeAnimation from './CoffeeAnimation';

const Stack: React.FC = () => {
    return (
        <section className="py-32 bg-brand-950 border-t border-white/5">
            <div className="container mx-auto px-6 max-w-[1400px]">
                {/* Coffee / Work CTA */}
                <div className="flex flex-col items-center justify-center text-center reveal-on-scroll">
                    <div className="mb-8 p-4 bg-white/[0.02] rounded-full border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:bg-white/[0.04] transition-colors duration-500">
                        <CoffeeAnimation />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-3">
                        Need a coffee? <span className="text-brand-400 font-serif italic">Let's work.</span>
                    </h3>
                </div>
            </div>
        </section>
    );
};

export default Stack;

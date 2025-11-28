import React from 'react';
import FlowerAnimation from './FlowerAnimation';


const Philosophy: React.FC = () => {
  return (
    <section className="bg-brand-950 border-t border-white/5 py-24 mb-[-1490px]">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col md:flex-row gap-20 relative">
           <div className="md:w-1/3 reveal-on-scroll relative">
              <h2 className="text-xs font-mono text-brand-400 mb-8 uppercase tracking-wider sticky top-32">01.5 / Philosophy</h2>
              <FlowerAnimation />
           </div>
           
           <div className="md:w-2/3">
              <div className="space-y-16">
                 <div className="reveal-on-scroll delay-100">
                    <h3 className="text-3xl md:text-5xl font-medium text-white mb-8 tracking-tight leading-tight">
                        Simplicity is the <span className="font-serif italic text-brand-200">ultimate</span> sophistication.
                    </h3>
                    <p className="text-brand-300 text-lg md:text-xl font-light leading-relaxed max-w-3xl">
                       In a digital world cluttered with noise, I believe in the power of subtraction. Great engineering isn't about how much you can add, but how much you can take away while making the system <span className="text-white font-medium">stronger</span>, <span className="text-white font-medium">faster</span>, and more <span className="text-white font-medium">intuitive</span>. Every line of code should have a purpose. Every pixel should earn its place.
                    </p>
                 </div>

                 <div className="h-[1px] w-full bg-white/10 reveal-on-scroll delay-200"></div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="reveal-on-scroll delay-200">
                       <h4 className="text-white text-xl font-medium mb-4">User Centricity</h4>
                       <p className="text-brand-400 font-light leading-relaxed">
                          Technology serves humans, not the other way around. I build interfaces that feel <span className="italic font-serif text-brand-300">natural</span>, responding to intent with fluidity and grace.
                       </p>
                    </div>
                    <div className="reveal-on-scroll delay-300">
                       <h4 className="text-white text-xl font-medium mb-4">Technical Robustness</h4>
                       <p className="text-brand-400 font-light leading-relaxed">
                          A beautiful facade is nothing without a steel core. I architect systems that are fault-tolerant, secure by design, and ready to <span className="italic font-serif text-brand-300">scale</span> from day one.
                       </p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
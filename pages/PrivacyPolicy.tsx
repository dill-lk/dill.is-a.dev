import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="container mx-auto px-6 max-w-3xl pb-24">
        <div className="mb-12">
           <Link to="/#" className="inline-flex items-center gap-2 text-brand-400 hover:text-white mb-8 transition-colors group">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm uppercase tracking-wider">Back to Home</span>
           </Link>
           <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Privacy Policy</h1>
           <p className="text-brand-400 text-sm font-mono">Last Updated: November 30, 2025</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-brand-300 prose-li:text-brand-300">
          <p>
            Thank you for visiting the portfolio of Jinuk Chathusa. Your privacy is important to me. This Privacy Policy explains how I collect, use, and protect any information you might provide while using this website.
          </p>

          <h3>1. Information Collection</h3>
          <p>
            This website is primarily a static portfolio and does not require you to create an account or sign in. However, I may collect information in the following ways:
          </p>
          <ul>
            <li><strong>Contact Information:</strong> If you choose to contact me via email or the contact links provided, I will receive your email address and any other information you choose to share in your message.</li>
            <li><strong>Usage Data:</strong> Like most websites, this site may use basic analytics tools (e.g., Vercel Analytics, Google Analytics) to collect anonymous data about visitor behavior, such as pages visited, time spent on the site, and browser type. This helps me understand how users interact with my portfolio and improve the experience.</li>
          </ul>

          <h3>2. How I Use Your Information</h3>
          <p>
            Any information collected is used solely for the following purposes:
          </p>
          <ul>
            <li>To respond to your inquiries or job opportunities.</li>
            <li>To improve the performance and usability of this website.</li>
          </ul>
          <p>
            I do not sell, trade, or rent your personal information to third parties.
          </p>

          <h3>3. Third-Party Links</h3>
          <p>
            This website contains links to third-party websites (e.g., LinkedIn, GitHub, Twitter/X). Please be aware that I am not responsible for the content or privacy practices of these external sites. I encourage you to read the privacy policies of any website you visit.
          </p>

          <h3>4. Changes to This Policy</h3>
          <p>
            I may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of the website after any changes indicates your acceptance of the new policy.
          </p>

          <h3>5. Contact Me</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact me at <a href="mailto:dill.ruzz.official@gmail.com" className="text-white hover:underline">dill.ruzz.official@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
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
           <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">Terms of Service</h1>
           <p className="text-brand-400 text-sm font-mono">Last Updated: November 30, 2025</p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-brand-300 prose-li:text-brand-300">
          <p>
            Welcome to the portfolio website of Jinuk Chathusa. By accessing or using this website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use this website.
          </p>

          <h3>1. Intellectual Property</h3>
          <p>
            All content on this website, including text, graphics, logos, images, code, and software, is the property of Jinuk Chathusa unless otherwise noted. 
          </p>
          <ul>
            <li>You may view, download, and print pages from the website for your own personal, non-commercial use.</li>
            <li>You may not reproduce, republish, sell, rent, or sub-license material from this website without explicit permission.</li>
            <li>Open-source projects linked here are subject to their respective licenses (e.g., MIT, Apache) as specified in their repositories.</li>
          </ul>

          <h3>2. Use of the Website</h3>
          <p>
            You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within the website.
          </p>

          <h3>3. Disclaimer of Warranties</h3>
          <p>
            This website is provided on an "as is" and "as available" basis. I make no representations or warranties of any kind, express or implied, regarding the operation of the website or the information, content, materials, or products included on this website.
          </p>

          <h3>4. Limitation of Liability</h3>
          <p>
            In no event shall Jinuk Chathusa be liable for any damages arising out of or in connection with your use of this website. This includes, without limitation, direct loss, loss of business or profits (whether or not the loss of such profits was foreseeable, arose in the normal course of things or you have advised me of the possibility of such potential loss), damage caused to your computer, computer software, systems and programs and the data thereon or any other direct or indirect, consequential and incidental damages.
          </p>

          <h3>5. External Links</h3>
          <p>
            This website may contain links to external websites that are not provided or maintained by or in any way affiliated with me. Please note that I do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>

          <h3>6. Changes to Terms</h3>
          <p>
            I reserve the right to modify these terms at any time. You should check this page regularly to ensure you are familiar with the current version.
          </p>

          <h3>7. Contact</h3>
          <p>
            For any questions regarding these Terms of Service, please contact me at <a href="mailto:dill.ruzz.official@gmail.com" className="text-white hover:underline">dill.ruzz.official@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
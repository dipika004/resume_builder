import React, { useState } from 'react';
import Footer from '../components/common/Footer';
// --- SVG Icons (Self-contained components) ---
const FileTextIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const Wand2Icon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" />
    <path d="m14 7 3 3" />
    <path d="M5 6v4" />
    <path d="M19 14v4" />
    <path d="M10 2v2" />
    <path d="M7 8H3" />
    <path d="M21 16h-4" />
    <path d="M11 3H9" />
  </svg>
);

const LayersIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const DownloadIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
);

const ChevronDownIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6"/>
    </svg>
);


// --- Feature Card Component ---
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);


// --- "How It Works" Step Component ---
const Step = ({ number, title, description }) => (
    <div className="flex items-start space-x-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white font-bold text-lg flex-shrink-0">
            {number}
        </div>
        <div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-500 mt-1">{description}</p>
        </div>
    </div>
);


// --- FAQ Item Component ---
const FaqItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-200 py-5">
        <button
            className="w-full flex justify-between items-center text-left"
            onClick={onClick}
        >
            <h4 className="font-semibold text-gray-800">{question}</h4>
            <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
            <p className="text-gray-600 text-sm leading-relaxed">{answer}</p>
        </div>
    </div>
);


// --- Main App Component ---
export default function App() {
  // Mock user state to demonstrate dynamic CTA
  const [user, setUser] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      icon: <FileTextIcon className="w-6 h-6" />,
      title: "Intuitive Resume Builder",
      description: "Easily create and customize professional resumes with our user-friendly multi-section editor.",
    },
    {
      icon: <Wand2Icon className="w-6 h-6" />,
      title: "AI-Powered Suggestions",
      description: "Enhance your resume with intelligent, data-driven suggestions for content, keywords, and formatting.",
    },
    {
      icon: <LayersIcon className="w-6 h-6" />,
      title: "Smart Versioning",
      description: "Create and manage multiple versions of your resume, tailored for different job applications.",
    },
    {
      icon: <DownloadIcon className="w-6 h-6" />,
      title: "Instant PDF Exports",
      description: "Download pixel-perfect PDF copies of your resume anytime, ready to be sent to recruiters.",
    },
  ];

  const faqs = [
      { q: "Is this resume builder free to use?", a: "Yes, we offer a generous free plan that includes all the essential features to create a stunning resume. For advanced features like unlimited AI suggestions and premium templates, we have affordable paid plans." },
      { q: "Can I import my existing resume?", a: "Currently, we support building your resume from scratch using our intuitive editor. An import feature from LinkedIn or PDF is on our roadmap and coming soon!" },
      { q: "How does the AI suggestion feature work?", a: "Our AI analyzes your job title and industry to provide relevant keywords and phrase suggestions that can help your resume pass through Applicant Tracking Systems (ATS) and catch a recruiter's eye." },
      { q: "Is my data secure?", a: "Absolutely. We prioritize your privacy and security. Your data is encrypted and stored securely. You have full control over your information and can delete your account and all data at any time." },
  ];

  const handleFaqToggle = (index) => {
      setOpenFaq(openFaq === index ? null : index);
  };
  
  const dashboardLink = user ? "/dashboard" : "/signup";
  const ctaText = user ? "Go to Dashboard" : "Get Started for Free";

  return (
   <>
    <div className="bg-gray-50 min-h-screen font-sans text-gray-700">
      <main className="px-6 md:px-10">
        {/* --- Hero Section --- */}
        <section className="text-center py-20 md:py-32 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Craft Your Professional Story, <span className="text-blue-600">Effortlessly</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Go from a blank page to a stunning, interview-winning resume in minutes. With AI-powered insights and seamless version control, your next career move starts here.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={dashboardLink}
              className="px-8 py-3 rounded-lg bg-gray-900 text-white font-semibold shadow-md hover:bg-gray-700 transition-all transform hover:scale-105"
            >
              {ctaText}
            </a>
            <a
              href="#features"
              className="px-8 py-3 rounded-lg bg-white text-gray-800 font-semibold border border-gray-200 shadow-sm hover:bg-gray-100 hover:border-gray-300 transition-all transform hover:scale-105"
            >
              Explore Features
            </a>
          </div>
        </section>

        {/* --- Features Section --- */}
        <section id="features" className="py-20 max-w-6xl mx-auto">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything You Need to Succeed</h2>
              <p className="mt-4 text-gray-600 max-w-xl mx-auto">Our powerful features are designed to make resume building faster, smarter, and more effective.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* --- How It Works Section --- */}
        <section className="py-20 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <Step number="1" title="Choose a Template" description="Select from a collection of professionally designed, ATS-friendly templates."/>
                    <Step number="2" title="Add Your Details with AI Help" description="Fill in your sections and let our AI assist you with powerful, impactful phrasing."/>
                    <Step number="3" title="Version, Export, and Apply" description="Tailor your resume for specific roles, export to PDF, and land your dream job."/>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hidden lg:block">
                   <img src="https://placehold.co/600x400/E2E8F0/4A5568?text=Resume+Preview&font=inter" alt="Resume Preview" className="rounded-lg shadow-md w-full"/>
                   <p className="text-center text-sm text-gray-500 mt-4">Visualize your resume coming to life in real-time.</p>
                </div>
            </div>
        </section>
        
        {/* --- FAQ Section --- */}
        <section className="py-20 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
                <p className="mt-4 text-gray-600">Have questions? We've got answers.</p>
            </div>
            <div>
                {faqs.map((faq, index) => (
                    <FaqItem 
                        key={index} 
                        question={faq.q}
                        answer={faq.a}
                        isOpen={openFaq === index}
                        onClick={() => handleFaqToggle(index)}
                    />
                ))}
            </div>
        </section>
      </main>

    </div>
    <Footer />
   </>
  );
}


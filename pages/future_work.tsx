import React, { useState } from 'react';

// --- Reusable Components (For self-containment) ---

type SectionProps = {
  children: React.ReactNode;
  gradients?: boolean;
  className?: string;
};

const Section: React.FC<SectionProps> = ({ children, gradients, className = "" }) => {
  const gradientClasses = gradients ? "bg-white dark:bg-gray-900" : "";
  return <section className={`relative px-4 py-8 md:px-8 md:py-16 ${gradientClasses} ${className}`}>{children}</section>;
};

type ButtonProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`
      rounded-full shadow-lg transition-transform transform hover:scale-105
      font-semibold py-3 px-6
      focus:outline-none focus:ring-4 focus:ring-blue-300
      dark:focus:ring-blue-600
      bg-blue-600 text-white hover:bg-blue-700
      ${className}
    `}
  >
    {children}
  </button>
);

const Background = () => (
  <div
    className="absolute inset-0 translate-y-32 pointer-events-none dark:invert dark:brightness-90"
    aria-hidden="true"
  >
    <svg
      className="absolute w-[150vw] h-full"
      viewBox="0 0 1440 810"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
    </svg>
  </div>
);

// --- Page Components ---

/**
 * Landing page describing the problem and solution.
 */
type LandingPageProps = {
  onFeaturesClick: () => void;
  onFutureWorkClick: () => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ onFeaturesClick, onFutureWorkClick }) => {
    // The landing page is the root, so "Go Back" should do nothing or could be omitted.
    // For now, we'll just provide a no-op function.
    function onBack() {
        // go back  to localhost home page root
        window.location.href = "/";
    }

  return (
    <Section gradients className="flex flex-col items-center justify-center min-h-screen py-12 text-center">
      <Background />
      <div className="z-10 max-w-3xl mx-auto p-8 rounded-lg shadow-xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Unbiased Insurance Advice for Singapore
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          The Singaporean insurance market is confusing. Too many products, aggressive commission-based agents, and a lack of knowledge among young people make finding the right policy a challenge.
        </p>
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
          Our solution is an AI-powered chatbot that provides clear, unbiased insurance recommendations tailored to your life stage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={onFeaturesClick}>See Features</Button>
          <Button onClick={onFutureWorkClick}>Future Work</Button>
          <Button onClick={onBack}>Go Back</Button>
        </div>
      </div>
    </Section>
  );
};

/**
 * Page detailing all planned features.
 */
type FeaturesPageProps = {
  onBack: () => void;
};

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onBack }) => {
  return (
    <Section gradients className="flex flex-col items-center justify-center min-h-screen py-12 text-center">
      <Background />
      <div className="z-10 max-w-3xl mx-auto p-8 rounded-lg shadow-xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Our Current Features
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Beyond the core recommendations, our platform will offer these powerful tools:
        </p>

        <ul className="list-disc list-inside text-left mx-auto max-w-md text-gray-700 dark:text-gray-300 space-y-4 mb-8">
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Policy Analysis:</strong> Upload your existing policies (Travel, Home, Car, Life, etc.) and our bot will clarify complex terms and answer your questions.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">RAG (Retrieval-Augmented Generation):</strong> Our AI will use your existing policies as context to recommend similar or better alternatives.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Agent & Agency Track Records:</strong> Transparency is key. View the track record and reliability of agencies and specific agents to make informed decisions.
          </li>
        </ul>

        {/* The back button is here */}
        <Button onClick={onBack}>Go Back</Button>
      </div>
    </Section>
  );
};

/**
 * A page component displaying information about the project's future development.
 */
type FutureWorkPageProps = {
  onBack: () => void;
};
const FutureWorkPage: React.FC<FutureWorkPageProps> = ({ onBack }) => {
  return (
    <Section gradients className="items-center justify-center min-h-screen py-12 text-center">
      <Background />
      <div className="z-10 max-w-2xl mx-auto p-8 rounded-lg shadow-xl backdrop-blur-md bg-white/30 dark:bg-gray-800/30">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Future Work & Development
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          This project is a work in progress! We have a number of exciting features planned to enhance your experience.
        </p>

        <ul className="list-disc list-inside text-left mx-auto max-w-md text-gray-700 dark:text-gray-300 space-y-2 mb-8">
          <li>
            <strong className="text-gray-900 dark:text-gray-100">More Policies:</strong> We will enhance our database with more policy data to improve vector search and recommendations.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Comprehensive Reviews:</strong> More detailed and comprehensive reviews will be added for both policies and agents.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Other SEA Languages:</strong> We will expand language support to other languages in Southeast Asia to better serve a regional audience.
          </li>
          <li>
            <strong className="text-gray-900 dark:text-gray-100">Data Analytics:</strong> We will implement data analytics to identify trends and predict suitable policies for users.
          </li>
        </ul>

        {/* The back button is here */}
        <Button onClick={onBack}>Go Back</Button>
      </div>
    </Section>
  );
};


// --- Main Application Component ---

type View = 'landing' | 'features' | 'future-work';

/**
 * The main application component that manages state and renders different pages.
 * The core logic and state management are contained here.
 */
const App = () => {
  const [currentView, setCurrentView] = useState<View>('landing');

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return (
          <LandingPage
            onFeaturesClick={() => setCurrentView('features')}
            onFutureWorkClick={() => setCurrentView('future-work')}
          />
        );
      case 'features':
        return <FeaturesPage onBack={() => setCurrentView('landing')} />;
      case 'future-work':
        return <FutureWorkPage onBack={() => setCurrentView('landing')} />;
      default:
        return <LandingPage
          onFeaturesClick={() => setCurrentView('features')}
          onFutureWorkClick={() => setCurrentView('future-work')}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans antialiased">
      {renderContent()}
    </div>
  );
};

export default App;

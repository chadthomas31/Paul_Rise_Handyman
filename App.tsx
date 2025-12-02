import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

// Simple placeholder components for other pages to keep the code concise
// but demonstrably architected for multiple pages.

const ServicesPage = () => (
  <div className="py-20 max-w-7xl mx-auto px-4">
    <h1 className="text-4xl font-bold mb-8">All Services</h1>
    <p className="text-xl text-slate-600">Complete service catalog coming soon. Please see the home page for our core offerings.</p>
    <div className="h-96 bg-slate-100 rounded-xl mt-8 flex items-center justify-center text-slate-400">Services Placeholder</div>
  </div>
);

const AboutPage = () => (
  <div className="py-20 max-w-7xl mx-auto px-4">
    <h1 className="text-4xl font-bold mb-8">About Paul</h1>
    <p className="text-xl text-slate-600">Paul has been serving the San Clemente community for over a decade.</p>
    <div className="h-96 bg-slate-100 rounded-xl mt-8 flex items-center justify-center text-slate-400">About Placeholder</div>
  </div>
);

const ContactPage = () => (
  <div className="py-20 max-w-7xl mx-auto px-4">
     {/* Redirect logic or full page contact form would go here */}
     <Home /> 
  </div>
);

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

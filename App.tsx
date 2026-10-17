import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './LanguageContext';
import { AudioProvider } from './AudioContext';
import CustomCursor from './components/CustomCursor';
import GlobalBackground from './components/GlobalBackground';
import SplashScreen from './components/SplashScreen';
import GsapGlobalEffects from './components/GsapGlobalEffects';

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./components/LandingPage'));
const MetaAdsManagerPage = lazy(() => import('./MetaAdsManagerPage'));
const MetaAdsPage = lazy(() => import('./MetaAdsPage'));
const ServiceLanding = lazy(() => import('./components/ServiceLanding'));
const FAQPage = lazy(() => import('./components/FAQPage'));
const AcademyLanding = lazy(() => import('./components/AcademyLanding'));
const CertificateVerification = lazy(() => import('./components/CertificateVerification'));
const PharmacySalesCourse = lazy(() => import('./components/PharmacySalesCourse'));
const PoliciesPage = lazy(() => import('./components/PoliciesPage'));
const CheckoutPage = lazy(() => import('./components/Checkout'));
const ProductsPage = lazy(() => import('./components/ProductsPage'));
const BlogLandingPage = lazy(() => import('./components/blog/BlogLandingPage'));
const BlogPostPage = lazy(() => import('./components/blog/BlogPostPage'));
const AdminCertificateGenerator = lazy(() => import('./components/AdminCertificateGenerator'));
const BoboLanding = lazy(() => import('./components/BoboLanding'));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CustomCursor />
        <GlobalBackground />
        <GsapGlobalEffects />

        <LanguageProvider>
        <AudioProvider>
          <Suspense fallback={<SplashScreen />}>
            <Routes>
              <Route path="/bobo" element={<BoboLanding />} />
              <Route path="/service/bobo-super-intelligence" element={<BoboLanding />} />
              <Route path="/service/:slug" element={<ServiceLanding />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<LandingPage />} />
              <Route path="/services" element={<LandingPage />} />
              <Route path="/markets" element={<LandingPage />} />
              <Route path="/contact" element={<LandingPage />} />
              <Route path="/meta-ads-master" element={<MetaAdsPage />} />
              <Route path="/meta-ads-manager" element={<MetaAdsManagerPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/academy" element={<AcademyLanding />} />
              <Route path="/courses" element={<AcademyLanding />} />
              <Route path="/books" element={<AcademyLanding />} />
              <Route path="/verify-certificate" element={<CertificateVerification />} />
              <Route path="/pharmacy-sales" element={<PharmacySalesCourse />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/blog" element={<BlogLandingPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/medestra-admin-tools-cert-gen-8x9q" element={<AdminCertificateGenerator />} />
            </Routes>
          </Suspense>
          </AudioProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
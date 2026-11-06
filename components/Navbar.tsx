import React, { useState, useEffect } from 'react';
import {
  Menu, X, Languages, ChevronDown, Volume2, VolumeX,
  ArrowLeft, ArrowRight, BookOpen, GraduationCap,
  Layers, FileText, Home, Briefcase, PhoneCall
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { useAudio } from '../AudioContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { t, language, toggleLanguage, setLanguage, dir } = useLanguage();
  const { isMuted, toggleMute } = useAudio();
  const location = useLocation();
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(id);

    const isLandingPage = ['/', '/about', '/services', '/markets', '/contact'].includes(location.pathname);

    if (!isLandingPage) {
      navigate(href);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.history.pushState({}, '', href);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16 || document.documentElement.scrollTop > 16);

      // Update active section for informational navigation highlight
      const sections = ['hero', 'aboutUs', 'services', 'markets', 'contact'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: t.nav.home, id: 'hero', href: '/' },
    { label: t.nav.aboutUs, id: 'aboutUs', href: '/about' },
    { label: t.nav.services, id: 'services', href: '/services' },
    { label: t.nav.markets, id: 'markets', href: '/markets' },
    { label: t.nav.contact, id: 'contact', href: '/contact' },
  ];

  const languageOptions: Array<{ code: 'ar' | 'en' | 'es' | 'it'; label: string }> = [
    { code: 'ar', label: 'عربي' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'it', label: 'Italiano' },
  ];

  const isLanding = ['/', '/about', '/services', '/markets', '/contact'].includes(location.pathname);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50">
        {/* Top Solidarity Banner on Home */}
        {location.pathname === '/' && !scrolled && (
          <div className="w-full bg-gradient-to-r from-[#0099D6] via-[#00AEEF] to-[#0099D6] text-white flex justify-center items-center py-1 px-4 gap-2.5 border-b border-sky-300/30 shadow-xs">
            <img src="/photos/palestaine.webp" alt="Palestine Flag" className="h-3.5 object-contain drop-shadow-xs" />
            <span className="font-bold text-[10px] tracking-[0.2em] uppercase drop-shadow-xs" style={{ fontFamily: 'Thmanyah Sans, sans-serif' }}>
              WE STAND WITH PALESTINE
            </span>
            <img src="/photos/palestaine.webp" alt="Palestine Flag" className="h-3.5 object-contain drop-shadow-xs" />
          </div>
        )}

        {/* Calm Editorial Light Navigation Bar */}
        <div
          className={`w-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/92 backdrop-blur-xl border-b border-slate-200/85 shadow-[0_4px_20px_-6px_rgba(15,23,42,0.05)]'
              : 'bg-white/80 backdrop-blur-md border-b border-slate-200/50'
          }`}
        >
          {/* Live Informational Scroll Progress Bar */}
          <motion.div
            style={{ scaleX }}
            className="h-[2px] bg-[#00AEEF] origin-left w-full"
          />

          <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-14 md:h-16">
              {/* Logo & Back Button */}
              <div className="flex-shrink-0 flex items-center gap-2.5">
                {location.pathname !== '/' && (
                  <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 hover:text-[#00AEEF] hover:border-[#00AEEF]/40 transition-all text-xs font-bold active:scale-95"
                  >
                    {dir === 'rtl' ? <ArrowRight size={15} /> : <ArrowLeft size={15} />}
                    <span>{t.nav.back}</span>
                  </button>
                )}
                <div
                  className="cursor-pointer flex items-center py-1"
                  onClick={() => navigate('/')}
                >
                  <img
                    src="/mesestra.webp"
                    alt="Medestra Logo"
                    className="h-8 md:h-9 w-auto object-contain transition-opacity hover:opacity-85"
                  />
                </div>
              </div>

              {/* Desktop Informational Segmented Menu */}
              <div className="hidden xl:flex items-center gap-0.5 p-1 rounded-xl bg-slate-100/80 border border-slate-200/70">
                {navItems.map((item) => {
                  const isActive = isLanding ? activeSection === item.id : location.pathname === item.href;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavigation(e, item.id, item.href)}
                      className={`relative px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors duration-200 ${
                        isActive
                          ? 'text-[#0284c7]'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="desktop-nav-pill"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          className="absolute inset-0 bg-white rounded-lg shadow-2xs border border-slate-200/80 -z-10"
                        />
                      )}
                      {item.label}
                    </a>
                  );
                })}

                <div className="h-3.5 w-[1px] bg-slate-300/70 mx-1" />

                <Link
                  to="/courses"
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    location.pathname === '/courses' || location.pathname === '/academy'
                      ? 'bg-white text-[#0284c7] shadow-2xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {t.nav.courses}
                </Link>

                <Link
                  to="/books"
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    location.pathname === '/books'
                      ? 'bg-white text-[#0284c7] shadow-2xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {t.nav.specialtyBooks}
                </Link>

                <div className="relative group">
                  <Link
                    to="/products"
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                      location.pathname.startsWith('/products') || location.pathname === '/meni-clinic'
                        ? 'bg-white text-[#0284c7] shadow-2xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <span>{t.nav.products}</span>
                    <ChevronDown size={12} className="transition-transform duration-200 group-hover:rotate-180" />
                  </Link>

                  <div className="absolute right-0 top-full pt-1.5 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200/90 p-1.5 flex flex-col gap-1">
                      <Link
                        to="/products"
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-between ${
                          location.pathname === '/products' || location.pathname === '/products/mepos'
                            ? 'bg-sky-50 text-[#0284c7]'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#00AEEF]'
                        }`}
                      >
                        <span>MePOS</span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {language === 'ar' ? 'للصيدليات' : 'Pharmacy POS'}
                        </span>
                      </Link>
                      <Link
                        to="/meni-clinic"
                        className={`px-3 py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-between ${
                          location.pathname === '/meni-clinic' || location.pathname === '/products/meni-clinic'
                            ? 'bg-sky-50 text-[#0284c7]'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-[#00AEEF]'
                        }`}
                      >
                        <span>Meni Clinic</span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {language === 'ar' ? 'للعيادات CRM' : 'Clinic CRM'}
                        </span>
                      </Link>
                      <a
                        href="/MeniClinic/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100 transition-colors flex items-center justify-between border border-emerald-200/60"
                      >
                        <span>{language === 'ar' ? 'دخول Meni Clinic' : 'Open Meni Clinic'}</span>
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-200/70 px-1.5 py-0.5 rounded">
                          {language === 'ar' ? 'تطبيق حي' : 'Live App'}
                        </span>
                      </a>
                    </div>
                  </div>
                </div>

                <Link
                  to="/blog"
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    location.pathname.startsWith('/blog')
                      ? 'bg-white text-[#0284c7] shadow-2xs border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {language === 'ar' ? 'المدونة' : 'Blog'}
                </Link>
              </div>

              {/* Desktop Action Controls */}
              <div className="hidden xl:flex items-center gap-2">
                {/* Language Switcher - Full Native Names */}
                <div className="flex items-center p-0.5 rounded-xl bg-slate-100/80 border border-slate-200/70">
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-slate-800 hover:text-[#00AEEF] shadow-2xs border border-slate-200/60 transition-all text-xs font-bold"
                  >
                    <Languages size={13} className="text-[#00AEEF]" />
                    <span>{language === 'ar' ? 'English' : 'عربي'}</span>
                  </button>
                  <button
                    onClick={() => setLanguage('es')}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                      language === 'es'
                        ? 'bg-[#00AEEF] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Español
                  </button>
                  <button
                    onClick={() => setLanguage('it')}
                    className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                      language === 'it'
                        ? 'bg-[#00AEEF] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Italiano
                  </button>
                </div>

                {/* Audio Mute Button */}
                <button
                  onClick={toggleMute}
                  className={`flex items-center justify-center w-8 h-8 rounded-xl border transition-all ${
                    !isMuted
                      ? 'bg-sky-50 border-[#00AEEF]/40 text-[#00AEEF]'
                      : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                  }`}
                  title={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>

                {location.pathname === '/products' ? (
                  <div className="relative group">
                    <button className="flex items-center gap-1.5 bg-[#00AEEF] hover:bg-[#0284c7] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap">
                      {language === 'ar' ? 'تحميل البورتفوليو' : 'Download Portfolio'}
                      <ChevronDown size={13} />
                    </button>
                    <div className="absolute right-0 top-full mt-1.5 w-44 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col overflow-hidden z-50 p-1">
                      <a
                        href="/MePOS - Egypt.pdf"
                        download="MePOS - Egypt.pdf"
                        className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#00AEEF] font-bold text-xs text-center transition-colors"
                      >
                        {language === 'ar' ? 'نسخة مصر' : 'Egypt Version'}
                      </a>
                      <a
                        href="/MePOS - KSA.pdf"
                        download="MePOS - KSA.pdf"
                        className="px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-[#00AEEF] font-bold text-xs text-center transition-colors"
                      >
                        {language === 'ar' ? 'نسخة السعودية' : 'KSA Version'}
                      </a>
                    </div>
                  </div>
                ) : (
                  <a
                    href="/#contact"
                    onClick={(e) => handleNavigation(e, 'contact', '/contact')}
                    className="flex items-center gap-1.5 bg-[#00AEEF] hover:bg-[#0284c7] text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shadow-xs"
                  >
                    <span>{t.nav.book}</span>
                  </a>
                )}
              </div>

              {/* Mobile & Tablet Controls */}
              <div className="xl:hidden flex items-center gap-1.5">
                <button
                  onClick={toggleMute}
                  className={`flex items-center justify-center w-8 h-8 rounded-xl border transition-all ${
                    !isMuted
                      ? 'bg-sky-50 border-[#00AEEF]/40 text-[#00AEEF]'
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                  title={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>

                {/* Quick Language Toggle - Full Native Name */}
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200/80 text-slate-800 font-bold text-xs active:scale-95 transition-all"
                >
                  <Languages size={13} className="text-[#00AEEF]" />
                  <span>{language === 'ar' ? 'English' : 'عربي'}</span>
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`flex items-center justify-center w-9 h-9 rounded-xl border transition-all ${
                    isOpen
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </div>
          </nav>

          {/* Calm Light Informational Mobile Menu Drawer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="xl:hidden bg-white border-b border-slate-200 overflow-hidden"
              >
                <div className="max-w-6xl mx-auto px-4 py-4 space-y-3 max-h-[78vh] overflow-y-auto">
                  {/* Language Switcher Grid (Full Native Names) */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 mb-2">
                      <Languages size={13} className="text-[#00AEEF]" />
                      <span>{language === 'ar' ? 'اللغة' : 'Language'}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`py-2 px-2 rounded-lg text-xs font-bold transition-all ${
                            language === lang.code
                              ? 'bg-[#00AEEF] text-white shadow-2xs'
                              : 'bg-white text-slate-700 border border-slate-200/80 hover:border-[#00AEEF]'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Section Links */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {navItems.map((item) => {
                      const isActive = isLanding ? activeSection === item.id : location.pathname === item.href;
                      return (
                        <a
                          key={item.id}
                          href={item.href}
                          onClick={(e) => handleNavigation(e, item.id, item.href)}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-sky-50 text-[#0284c7] border border-sky-200'
                              : 'bg-slate-50/70 text-slate-700 hover:bg-slate-100 border border-slate-200/50'
                          }`}
                        >
                          <span>{item.label}</span>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00AEEF]' : 'bg-slate-300'}`} />
                        </a>
                      );
                    })}
                  </div>

                  {/* Academy, Books, Products, Blog Compact Informational Links */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to="/courses"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200/80 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-100/80 text-[#0284c7] flex items-center justify-center shrink-0">
                        <GraduationCap size={16} />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{t.nav.courses}</span>
                    </Link>

                    <Link
                      to="/books"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200/80 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
                        <BookOpen size={16} />
                      </div>
                      <span className="text-xs font-bold text-slate-800">{t.nav.specialtyBooks}</span>
                    </Link>

                    <Link
                      to="/products"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200/80 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                        <Layers size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">MePOS</span>
                        <span className="text-[10px] text-slate-500">{language === 'ar' ? 'نظام الصيدليات' : 'Pharmacy POS'}</span>
                      </div>
                    </Link>

                    <Link
                      to="/meni-clinic"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200/80 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-sky-100/80 text-[#0284c7] flex items-center justify-center shrink-0">
                        <Layers size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-800">Meni Clinic</span>
                        <span className="text-[10px] text-slate-500">{language === 'ar' ? 'نظام العيادات CRM' : 'Clinic CRM'}</span>
                      </div>
                    </Link>

                    <Link
                      to="/blog"
                      onClick={() => setIsOpen(false)}
                      className="col-span-2 flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200/80 transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-200/80 text-slate-700 flex items-center justify-center shrink-0">
                        <FileText size={16} />
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {language === 'ar' ? 'المدونة' : 'Blog'}
                      </span>
                    </Link>
                  </div>

                  {/* CTA Button */}
                  <a
                    href="/#contact"
                    onClick={(e) => handleNavigation(e, 'contact', '/contact')}
                    className="w-full flex items-center justify-center gap-2 bg-[#00AEEF] hover:bg-[#0284c7] text-white px-5 py-3 rounded-xl font-bold text-xs shadow-xs transition-all"
                  >
                    <span>{t.nav.book}</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Calm Light Floating Bottom Bar for Phone View */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-50 pointer-events-none">
        <div className="pointer-events-auto max-w-sm mx-auto bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl px-1.5 py-1.5 shadow-[0_10px_30px_-5px_rgba(15,23,42,0.1)] flex items-center justify-around">
          <a
            href="/"
            onClick={(e) => handleNavigation(e, 'hero', '/')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              isLanding && activeSection === 'hero'
                ? 'text-[#00AEEF] bg-sky-50'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Home size={16} />
            <span className="text-[10px] font-bold">{t.nav.home}</span>
          </a>

          <a
            href="/services"
            onClick={(e) => handleNavigation(e, 'services', '/services')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              (isLanding && activeSection === 'services') || location.pathname.startsWith('/service/')
                ? 'text-[#00AEEF] bg-sky-50'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <Briefcase size={16} />
            <span className="text-[10px] font-bold">{t.nav.services}</span>
          </a>

          <Link
            to="/courses"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              location.pathname === '/courses' || location.pathname === '/academy'
                ? 'text-[#00AEEF] bg-sky-50'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <GraduationCap size={16} />
            <span className="text-[10px] font-bold">{t.nav.courses}</span>
          </Link>

          <Link
            to="/blog"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
              location.pathname.startsWith('/blog')
                ? 'text-[#00AEEF] bg-sky-50'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText size={16} />
            <span className="text-[10px] font-bold">{language === 'ar' ? 'المدونة' : 'Blog'}</span>
          </Link>

          <a
            href="/contact"
            onClick={(e) => handleNavigation(e, 'contact', '/contact')}
            className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl bg-[#00AEEF] text-white shadow-2xs"
          >
            <PhoneCall size={15} />
            <span className="text-[10px] font-bold">{t.nav.contact}</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const imagePaths = [
  '/mascots/h1.webp',
  '/mascots/h2.webp',
  '/mascots/h3.webp',
  '/mascots/h4.webp',
];

const greetings = [
  "مرحباً",
  "Hello",
  "Ciao",
  "Hola",
  "你好",
  "Merhaba"
];

const Hero: React.FC = () => {
  const { t, dir, language } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>(imagePaths);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % imagePaths.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const cacheImages = async () => {
      try {
        const promises = imagePaths.map(async (path) => {
          const response = await fetch(path);
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        });
        const cachedUrls = await Promise.all(promises);
        setDisplayImages(cachedUrls);
      } catch (error) {
        console.error("Image caching failed, falling back to network paths:", error);
      }
    };
    cacheImages();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const activePose = currentIndex % displayImages.length;

  return (
    <section
      id="hero"
      className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden border-b border-slate-200/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Interactive Swipeable Mascot Showcase (Compact & Responsive) */}
          <div
            className={`w-full lg:col-span-5 flex flex-col items-center order-first ${
              dir === 'rtl' ? 'lg:order-last' : 'lg:order-first'
            }`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative w-full max-w-[300px] sm:max-w-[340px]">
              {/* Interactive Swipeable Card Surface */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) handleNext();
                  else if (info.offset.x > 40) handlePrev();
                }}
                className="relative aspect-square w-full rounded-3xl bg-white border border-slate-200/90 shadow-[0_12px_36px_-10px_rgba(15,23,42,0.06)] flex items-center justify-center p-5 cursor-grab active:cursor-grabbing select-none overflow-hidden"
              >
                {/* Soft Clinical Radial Tint */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,174,239,0.08),transparent_70%)] pointer-events-none" />

                {/* Top Informational Status Header Inside Card */}
                <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between z-20" dir="ltr">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    0{activePose + 1} / 0{displayImages.length}
                  </span>

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentIndex % greetings.length}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25 }}
                      className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-[#0284c7] font-extrabold text-xs"
                    >
                      {greetings[currentIndex % greetings.length]}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Swipeable Mascot Illustration */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activePose}
                    src={displayImages[activePose]}
                    alt={`وكيل التسويق الطبي ميديسترا - Medestra Medical Marketing Mascot ${activePose + 1}`}
                    loading="eager"
                    draggable={false}
                    className="w-[78%] h-[78%] object-contain relative z-10 mt-4"
                    initial={{ opacity: 0, x: 24, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -24, scale: 0.96 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>

                {/* Bottom Interactive Swipe Scrubber Bar */}
                <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between z-20" dir="ltr">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous pose"
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#00AEEF] text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronLeft size={15} />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {displayImages.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Pose ${idx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activePose === idx
                            ? 'w-6 bg-[#00AEEF]'
                            : 'w-1.5 bg-slate-200 hover:bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next pose"
                    className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-[#00AEEF] text-slate-600 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>
              </motion.div>

              {/* Subtle Interactive Swipe Hint */}
              <p className="text-[11px] font-medium text-slate-400 text-center mt-2">
                {language === 'ar' ? 'اسحب الكارت يميناً أو يساراً للتبديل التفاعلي' : 'Swipe or drag card to switch views'}
              </p>
            </div>
          </div>

          {/* Calm Informational Editorial Content */}
          <div className="w-full lg:col-span-7 text-center lg:text-start flex flex-col items-center lg:items-start">
            {/* Calm Editorial Partner Pill */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-4 rounded-full text-xs font-bold text-[#0284c7] bg-sky-50 border border-sky-200/80"
              dir="ltr"
            >
              <span className="w-2 h-2 rounded-full bg-[#00AEEF]" />
              <span>#1 Marketing Partner in Egypt, KSA &amp; Italy</span>
            </div>

            {/* Balanced Informational Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-black text-slate-900 leading-[1.32] mb-4 tracking-tight">
              {t.hero.titleStart}{' '}
              <span className="text-[#00AEEF]">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle / Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-7 leading-relaxed max-w-2xl font-normal">
              {t.hero.description}
            </p>

            {/* Compact, Refined Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center lg:justify-start">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group bg-[#00AEEF] hover:bg-[#0284c7] text-white px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
              >
                <span>{t.hero.quoteBtn}</span>
                <Arrow
                  className={`w-4 h-4 transition-transform duration-200 ${
                    dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </a>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white hover:bg-slate-50 text-slate-700 hover:text-[#00AEEF] border border-slate-200/90 hover:border-[#00AEEF]/40 px-6 sm:px-7 py-3.5 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-[0.99]"
              >
                {t.hero.servicesBtn}
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

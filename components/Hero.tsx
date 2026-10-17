import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
  const { t, dir } = useLanguage();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState<string[]>(imagePaths);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <section id="hero" className="relative h-screen flex items-center pt-16 md:pt-20 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 h-[calc(100vh-100px)] lg:h-auto gap-4 lg:gap-6 items-center justify-between">

          {/* Mascot Image Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`relative flex-1 w-full flex justify-center items-center min-h-0 p-4 ${dir === 'rtl' ? 'lg:justify-end lg:order-last' : 'lg:justify-start lg:order-first'} order-first`}
          >
            <div className="relative h-[80%] lg:h-auto lg:w-full aspect-square max-w-full lg:max-w-lg">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="md:block absolute inset-0 w-full h-full text-blue-200/50 animate-pulse">
                <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.3C93.4,8.6,81.8,21.5,70.5,32.4C59.2,43.3,48.2,52.2,36.2,60.6C24.2,69,11.2,76.9,-2.7,81.6C-16.6,86.3,-31.4,87.8,-43.3,81.8C-55.2,75.8,-64.2,62.3,-71.4,49.2C-78.6,36.1,-84,23.4,-84.9,10.2C-85.8,-3,-82.2,-16.7,-74.6,-28.6C-67,-40.5,-55.4,-50.6,-43.1,-58.5C-30.8,-66.4,-17.8,-72.1,-3.5,-66C10.8,-59.9,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center z-10 text-center">
                <div className="relative w-full h-full bg-white/20 backdrop-blur-sm rounded-full border-2 md:border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
                  <div className="text-center w-full h-full relative flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIndex % displayImages.length}
                        src={displayImages[currentIndex % displayImages.length]}
                        alt={`وكيل التسويق الطبي ميديسترا - Medestra Medical Marketing Mascot ${(currentIndex % displayImages.length) + 1}`}
                        loading="lazy"
                        className="w-[80%] h-[80%] object-contain absolute inset-0 m-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>
                  </div>
                </div>

                {/* Greeting Chat Bubble */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex % greetings.length}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -10 }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
                    className={`absolute top-[0%] md:top-[15%] ${dir === 'rtl' ? 'left-[-2%] md:left-[5%] rounded-br-[4px]' : 'right-[-2%] md:right-[5%] rounded-bl-[4px]'} bg-white px-4 md:px-8 py-2 md:py-4 rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl border-2 md:border-4 border-white/90 backdrop-blur-md z-30 flex items-center justify-center transform hover:scale-105 transition-transform`}
                  >
                    <span className="text-lg md:text-3xl font-black text-brand-blue drop-shadow-sm tracking-wide">
                      {greetings[currentIndex % greetings.length]}
                    </span>
                    <div className={`absolute -bottom-[8px] md:-bottom-[16px] ${dir === 'rtl' ? 'right-4 md:right-6 border-l-[8px] md:border-l-[16px] border-r-transparent' : 'left-4 md:left-6 border-r-[8px] md:border-r-[16px] border-l-transparent'} border-t-[8px] md:border-t-[16px] border-t-white border-x-transparent drop-shadow-md md:drop-shadow-lg`} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-start shrink-0 pb-4 mb-8"
          >
            <motion.div
              initial={{ backgroundPosition: '0% 50%' }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 mb-4 md:mb-6 rounded-full font-extrabold text-xs md:text-sm text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] border border-white/40 bg-[length:200%_200%] bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"
              dir="ltr"
            >
              #1 Marketing Partner in Egypt, KSA & Italy
            </motion.div>

            <h1 className="text-3xl md:text-6xl font-extrabold text-gray-900 leading-normal md:leading-[1.4] mb-3 md:mb-6">
              {t.hero.titleStart} <span className="text-brand-blue">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-4 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' }); }}
                className="gsap-magnetic group bg-brand-blue/90 backdrop-blur-xl text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_20px_40px_rgba(0,174,239,0.3),_inset_0_1px_1px_rgba(255,255,255,0.5)] border-t-[2px] border-l-[2px] border-white/60 border-b border-r border-black/10 hover:bg-brand-blue hover:shadow-[0_25px_50px_rgba(0,174,239,0.4),_inset_0_1px_2px_rgba(255,255,255,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer will-change-transform"
                data-strength="0.3"
              >
                {t.hero.quoteBtn}
                <Arrow className={`w-5 h-5 transition-transform ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
              </a>
              <a
                href="#services"
                onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: 'smooth' }); }}
                className="gsap-magnetic bg-white/5 backdrop-blur-[32px] text-gray-700 border-t-[2px] border-l-[2px] border-white/80 border-b border-r border-black/5 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/15 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.05),_inset_0_1px_1px_rgba(255,255,255,0.9)] cursor-pointer will-change-transform"
                data-strength="0.25"
              >
                {t.hero.servicesBtn}
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;

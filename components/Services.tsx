import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, ArrowUpLeft, ChevronLeft, ChevronRight,
  LayoutGrid, GalleryHorizontal, ChevronDown, CheckCircle2
} from 'lucide-react';
import { getAllServices } from '../constants/services';
import { useLanguage } from '../LanguageContext';
import doctorMeImg from '../photos/doctor me.webp';
import callCenterImg from '../photos/call center me.webp';
import salahMeImg from '../photos/salah me.webp';
import smsmImg from '../photos/smsm.webp';
import mohadaraImg from '../photos/mohadara.webp';
import mobarmegImg from '../photos/mobarmeg.webp';
import boboImg from '../photos/BoBo.webp';

const ServiceCard = ({ service, index, language, getLocalized, isSwipeMode }: any) => {
  const [expanded, setExpanded] = useState(false);

  const getImageSrc = (id: string) => {
    switch (id) {
      case 'bobo-si':
      case 'bobo-super-intelligence':
        return boboImg;
      case 'medical-content': return doctorMeImg;
      case 'customer-service': return callCenterImg;
      case 'ecommerce': return salahMeImg;
      case 'social-media': return smsmImg;
      case 'team-training': return mohadaraImg;
      case 'web-mobile': return mobarmegImg;
      default: return null;
    }
  };

  const imageSrc = getImageSrc(service.id);
  const isGold = service.isGold || service.id === 'bobo-si';
  const isRtl = language === 'ar';
  const CornerArrow = isRtl ? ArrowUpLeft : ArrowUpRight;

  // Extract up to 3 informational features if present on the service object
  const featuresList: string[] = Array.isArray(getLocalized(service, 'features'))
    ? getLocalized(service, 'features').slice(0, 3)
    : [];

  return (
    <div
      className={`${
        isSwipeMode ? 'w-[285px] sm:w-[325px] shrink-0 snap-start' : 'w-full'
      } h-full`}
    >
      <div
        className={`h-full rounded-2xl p-5 transition-all duration-300 group relative flex flex-col justify-between ${
          isGold
            ? 'bg-[#FFFDF7] border border-amber-300/90 shadow-[0_4px_20px_-4px_rgba(245,158,11,0.1)] hover:border-amber-400'
            : 'bg-white border border-slate-200/90 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.04)] hover:border-[#00AEEF]/45 hover:shadow-[0_10px_28px_-8px_rgba(0,174,239,0.12)]'
        }`}
      >
        <div>
          {/* Top Informational Row: Index Badge + Mascot Thumbnail + Interactive Expand Button */}
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <div className="flex items-center gap-2.5">
              {imageSrc && (
                <div
                  className={`w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center p-1 border shrink-0 transition-transform duration-300 group-hover:scale-105 ${
                    isGold
                      ? 'bg-amber-50/80 border-amber-200'
                      : 'bg-sky-50/70 border-sky-100'
                  }`}
                >
                  <img
                    src={imageSrc}
                    alt={service.id}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {isGold ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100/80 text-amber-800 border border-amber-300/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  SI · AI
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                  0{index + 1}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {featuresList.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                  aria-label="Toggle quick summary"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                    expanded
                      ? 'bg-[#00AEEF] text-white border-[#00AEEF]'
                      : 'bg-slate-50 text-slate-600 border-slate-200/80 hover:border-[#00AEEF]/40 hover:text-[#00AEEF]'
                  }`}
                >
                  <span>{language === 'ar' ? 'نقاط رئيسية' : 'Key Points'}</span>
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                  />
                </button>
              )}

              <Link
                to={`/service/${service.slug}`}
                aria-label={getLocalized(service, 'title')}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  isGold
                    ? 'bg-amber-100/70 text-amber-700 hover:bg-amber-500 hover:text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-[#00AEEF] hover:text-white'
                }`}
              >
                <CornerArrow className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Clickable Title & Short Description */}
          <Link to={`/service/${service.slug}`} className="block">
            <h3
              className={`text-base sm:text-lg font-black leading-snug mb-2 transition-colors ${
                isGold
                  ? 'text-slate-900 group-hover:text-amber-700'
                  : 'text-slate-900 group-hover:text-[#00AEEF]'
              }`}
            >
              {getLocalized(service, 'title')}
            </h3>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3">
              {getLocalized(service, 'shortDesc')}
            </p>
          </Link>

          {/* Interactive Inline Informational Drawer */}
          <AnimatePresence>
            {expanded && featuresList.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <ul className="pt-2.5 pb-3 mb-2 border-t border-slate-100 space-y-1.5">
                  {featuresList.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00AEEF] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Compact Footer Action Row */}
        <div className="pt-3 mt-1 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/service/${service.slug}`}
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg transition-all ${
              isGold
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-sky-50 hover:bg-[#00AEEF] text-[#0284c7] hover:text-white'
            }`}
          >
            {isGold
              ? (language === 'ar' ? 'تعرّف على BoBo \u2190' : language === 'es' ? 'Conoce a BoBo \u2192' : language === 'it' ? 'Scopri BoBo \u2192' : 'Meet BoBo \u2192')
              : (language === 'ar' ? 'اكتشف المزيد \u2190' : language === 'es' ? 'Descubrir Más \u2192' : 'Discover More \u2192')}
          </Link>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const langCtx = useLanguage() as any;
  const language = langCtx?.language || 'ar';
  const dir = langCtx?.dir || 'rtl';
  const t = langCtx?.t || { services: { heading: 'الخدمات', subheading: 'اكتشف خدماتنا المتخصصة' } };
  const services = getAllServices();

  const [viewMode, setViewMode] = useState<'grid' | 'swipe'>('grid');
  const swipeTrackRef = useRef<HTMLDivElement>(null);

  const getLocalized = (obj: any, key: string) => {
    return obj[`${key}_${language}`] || obj[`${key}_en`];
  };

  const scrollTrack = (direction: 'prev' | 'next') => {
    if (!swipeTrackRef.current) return;
    const step = 330;
    const delta = direction === 'next' ? step : -step;
    const rtlDelta = dir === 'rtl' ? -delta : delta;
    swipeTrackRef.current.scrollBy({ left: rtlDelta, behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-14 md:py-20 border-b border-slate-200/70 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Calm Informational Section Header + Interactive View Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-[#0284c7] text-xs font-bold mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF]" />
              {language === 'ar' ? 'دليل الخدمات المتخصصة' : 'Specialized Services Directory'}
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
              {t.services?.heading || (language === 'ar' ? 'خدماتنا' : 'Our Services')}
            </h2>

            <p
              className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: t.services?.subheading || (language === 'ar'
                  ? 'حلول تسويق طبي شاملة مصممة خصيصاً لتنمية ممارستك الطبية'
                  : 'Comprehensive healthcare marketing solutions designed to grow your medical practice')
              }}
            />
          </div>

          {/* Interactive View Switcher (Grid vs Swipe) */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/80">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#0284c7] shadow-2xs border border-slate-200/70'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid size={13} />
                <span>{language === 'ar' ? 'شبكة' : 'Grid'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('swipe')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'swipe'
                    ? 'bg-white text-[#0284c7] shadow-2xs border border-slate-200/70'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GalleryHorizontal size={13} />
                <span>{language === 'ar' ? 'سحب تفاعلي' : 'Swipe'}</span>
              </button>
            </div>

            {viewMode === 'swipe' && (
              <div className="flex items-center gap-1.5" dir="ltr">
                <button
                  type="button"
                  onClick={() => scrollTrack('prev')}
                  aria-label="Previous service"
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#00AEEF] flex items-center justify-center shadow-2xs"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrack('next')}
                  aria-label="Next service"
                  className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#00AEEF] flex items-center justify-center shadow-2xs"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Services Container: Responsive Mobile Swipe + Desktop Grid/Swipe Toggle */}
        {viewMode === 'swipe' ? (
          <div
            ref={swipeTrackRef}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 -mx-1 px-1"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                language={language}
                getLocalized={getLocalized}
                isSwipeMode={true}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                language={language}
                getLocalized={getLocalized}
                isSwipeMode={false}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Services;

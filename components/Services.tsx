import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { getAllServices } from '../constants/services';
import FeatureIcon from './icons/ServiceIcons';
import { useLanguage } from '../LanguageContext';
import doctorMeImg from '../photos/doctor me.webp';
import callCenterImg from '../photos/call center me.webp';
import salahMeImg from '../photos/salah me.webp';
import smsmImg from '../photos/smsm.webp';
import mohadaraImg from '../photos/mohadara.webp';
import mobarmegImg from '../photos/mobarmeg.webp';
import boboImg from '../photos/BoBo.webp';

const ServiceCard = ({ service, index, language, getLocalized, t }: any) => {
  const ref = useRef(null);
  // Trigger when the element is near the center of the viewport
  const isInView = useInView(ref, { margin: "-35% 0px -35% 0px", amount: "some" });

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
  
  return (
    <div ref={ref} className="relative group h-full z-20 hover:z-50">
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt={service.id} 
          className={`absolute top-0 left-1/2 w-[220px] object-contain transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] -z-10 drop-shadow-2xl pointer-events-none mascot-image ${isInView ? 'in-view' : ''}`}
          style={{ marginLeft: '-110px' }}
        />
      )}
      <Link to={`/service/${service.slug}`} className="block h-full relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        data-max-tilt="5"
        className={`gsap-tilt will-change-transform h-full rounded-[2.5rem] p-6 transition-all duration-700 cursor-pointer group relative overflow-hidden hover:-translate-y-3 ${
          isGold
            ? 'bg-gradient-to-br from-amber-400/[0.14] via-yellow-400/[0.08] to-amber-600/[0.14] backdrop-blur-[40px] border-t-[2.5px] border-l-[2.5px] border-amber-300/95 border-b border-r border-amber-500/30 shadow-[0_20px_50px_rgba(245,158,11,0.2),_inset_0_1px_3px_rgba(254,240,138,0.95)] hover:bg-gradient-to-br hover:from-amber-400/[0.22] hover:via-yellow-400/[0.14] hover:to-amber-600/[0.22] hover:shadow-[0_30px_70px_rgba(217,119,6,0.38),_inset_0_1px_4px_rgba(255,255,255,1)]'
            : 'bg-white/[0.05] backdrop-blur-[40px] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] hover:bg-white/[0.1] hover:shadow-[0_30px_70px_rgba(0,0,0,0.15),_inset_0_1px_3px_rgba(255,255,255,1)]'
        }`}
      >
        {/* Subtle Golden ambient flare for gold card */}
        {isGold && (
          <>
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/25 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
          </>
        )}

        {/* Full-card Company Logo Watermark */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none p-4 transition-opacity duration-700 ${
          isGold ? 'opacity-[0.10] group-hover:opacity-[0.16]' : 'opacity-[0.08] group-hover:opacity-[0.12]'
        }`}>
          <img
            src="/mesestra.webp"
            alt=""
            className="w-full h-full object-contain filter grayscale group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
          />
        </div>

        <div className="relative z-10 flex flex-col h-full text-start">
          {isGold && (
            <div className="mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-gradient-to-r from-amber-500/20 to-yellow-500/25 text-amber-900 border border-amber-300/70 shadow-xs backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
                Super Intelligence (SI)
              </span>
            </div>
          )}

          <div className="mb-3">
            <h3 className={`text-xl font-bold leading-normal ${
              isGold ? 'text-amber-950 font-black' : 'text-slate-900'
            }`}>
              {getLocalized(service, 'title')}
            </h3>
          </div>

          <p className={`mb-6 leading-relaxed text-base flex-grow ${
            isGold ? 'text-amber-950/80 font-medium' : 'text-slate-700'
          }`}>
            {getLocalized(service, 'shortDesc')}
          </p>

          <div className="flex justify-between items-center mt-auto pt-4">
            <div className={`flex items-center gap-2 text-sm font-bold w-fit px-6 py-2 rounded-full transition-all duration-300 transform group-hover:scale-105 ${
              isGold
                ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white shadow-[0_8px_20px_rgba(217,119,6,0.35)] group-hover:shadow-[0_12px_28px_rgba(217,119,6,0.55)] border border-amber-200/50'
                : 'bg-brand-blue text-white shadow-[0_8px_20px_rgba(0,174,239,0.25)] group-hover:shadow-[0_12px_25px_rgba(0,174,239,0.4)] group-hover:bg-[#009ADD] border border-white/20'
            }`}>
              {isGold
                ? (language === 'ar' ? 'تعرّف على BoBo \u2190' : language === 'es' ? 'Conoce a BoBo \u2192' : language === 'it' ? 'Scopri BoBo \u2192' : 'Meet BoBo \u2192')
                : (language === 'ar' ? 'اكتشف المزيد \u2190' : language === 'es' ? 'Descubrir Más \u2192' : 'Discover More \u2192')}
            </div>
          </div>
        </div>
      </motion.div>
      </Link>
    </div>
  );
};

const Services: React.FC = () => {
  const langCtx = useLanguage() as any;
  const language = langCtx?.language || 'ar';
  const t = langCtx?.t || { services: { heading: 'الخدمات', subheading: 'اكتشف خدماتنا المتخصصة' } };
  const services = getAllServices();

  const getLocalized = (obj: any, key: string) => {
    return obj[`${key}_${language}`] || obj[`${key}_en`];
  };

  return (
    <section id="services" className="min-h-screen pt-20 pb-4 md:pt-24 md:pb-4 bg-transparent flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t.services?.heading || (language === 'ar' ? 'خدماتنا' : 'Our Services')}
          </h2>
          <p
            className="text-lg text-slate-600 max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: t.services?.subheading || (language === 'ar'
                ? 'حلول تسويق طبي شاملة مصممة خصيصاً لتنمية <span class="text-[#F5C518] font-extrabold drop-shadow-[0_0_10px_rgba(245,197,24,0.9)]">ممارستك الطبية</span>'
                : 'Comprehensive healthcare marketing solutions designed to grow your <span class="text-[#F5C518] font-extrabold drop-shadow-[0_0_10px_rgba(245,197,24,0.9)]">medical practice</span>')
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-y-16 md:gap-x-8 mt-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index} 
              language={language} 
              getLocalized={getLocalized} 
              t={t} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

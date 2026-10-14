import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Database, 
  MessageSquare, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Brain, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Download,
  FileText,
  Building2, 
  Stethoscope, 
  ShoppingBag, 
  Briefcase, 
  ChevronDown, 
  PhoneCall, 
  Award, 
  ShieldCheck, 
  Zap, 
  Check, 
  X,
  Maximize2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Navbar from './Navbar';
import Footer from './Footer';
import boboImg from '../photos/BoBo.webp';
import comparisonImg from '../photos/bobo-vs-chatbot.png';

// Cute Robot Head Avatar matching the BoBo vs Chatbot infographic
function RobotHeadIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="11" r="5" fill="#38bdf8" />
      <path d="M50 16V25" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
      <rect x="13" y="44" width="7" height="16" rx="3.5" fill="#bae6fd" />
      <rect x="80" y="44" width="7" height="16" rx="3.5" fill="#bae6fd" />
      <rect x="18" y="25" width="64" height="54" rx="18" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="3.5" />
      <rect x="25" y="34" width="50" height="36" rx="12" fill="#0f172a" />
      <ellipse cx="38" cy="52" rx="6.5" ry="7.5" fill="#38bdf8" />
      <ellipse cx="62" cy="52" rx="6.5" ry="7.5" fill="#38bdf8" />
      <circle cx="39.5" cy="50" r="2" fill="#ffffff" />
      <circle cx="63.5" cy="50" r="2" fill="#ffffff" />
    </svg>
  );
}

export default function BoboLanding() {
  const { language, dir } = useLanguage();
  const isArabic = language === 'ar';
  const isItalian = language === 'it';
  const isSpanish = language === 'es';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: 'healthcare',
    targetCountry: 'egypt',
    phone: '',
    notes: ''
  });

  const [comparisonTab, setComparisonTab] = useState<'interactive' | 'infographic'>('interactive');
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  const comparisonRows = [
    {
      id: 'main-goal',
      title_en: 'Main Goal',
      title_ar: 'الهدف الأساسي',
      title_it: 'Obiettivo Principale',
      bobo_text_en: 'Execute tasks & achieve goals',
      bobo_text_ar: 'تنفيذ مهام وتحقيق أهداف',
      bobo_text_it: 'Eseguire compiti e raggiungere obiettivi',
      bobo_type: 'text' as const,
      chatbot_text_en: 'Answer questions',
      chatbot_text_ar: 'الرد على الأسئلة',
      chatbot_text_it: 'Rispondere alle domande',
      chatbot_type: 'text' as const,
    },
    {
      id: 'lead-generation',
      title_en: 'Lead Generation',
      title_ar: 'توليد العملاء',
      title_it: 'Generazione Lead',
      bobo_type: 'check' as const,
      chatbot_type: 'cross' as const,
    },
    {
      id: 'database-building',
      title_en: 'Database Building',
      title_ar: 'بناء قواعد البيانات',
      title_it: 'Costruzione Database',
      bobo_type: 'check' as const,
      chatbot_type: 'cross' as const,
    },
    {
      id: 'autonomy',
      title_en: 'Autonomy',
      title_ar: 'العمل باستقلالية',
      title_it: 'Lavoro in Autonomia',
      bobo_type: 'check' as const,
      chatbot_type: 'cross' as const,
    },
    {
      id: 'sales',
      title_en: 'Sales',
      title_ar: 'المبيعات',
      title_it: 'Vendite e Chiusura',
      bobo_type: 'check' as const,
      chatbot_type: 'cross' as const,
    },
  ];

  const whatsappMessage = encodeURIComponent(
    isArabic
      ? `مرحباً ميديسترا، أريد توظيف BoBo Super Intelligence لفريقي ولدعم مبيعات شركتي!`
      : isItalian
        ? `Ciao Medestra, vorrei assumere BoBo Super Intelligence per potenziare il mio team e le vendite aziendali!`
        : isSpanish
          ? `¡Hola Medestra! Me gustaría contratar a BoBo Super Intelligence para mi equipo y aumentar las ventas.`
          : `Hello Medestra, I would like to put BoBo Super Intelligence to work for my company and accelerate our sales pipeline!`
  );

  const whatsappUrl = `https://wa.me/201118080265?text=${whatsappMessage}`;

  const superpowers = [
    {
      id: 'find-customers',
      icon: Search,
      badge_en: 'Market Research',
      badge_ar: 'التنقيب عن الفرص',
      badge_it: 'Ricerche di Mercato',
      title_en: 'Find Potential Customers',
      title_ar: 'إيجاد العملاء المحتملين',
      title_it: 'Trova Potenziali Clienti',
      desc_en: 'I research target markets across Egypt, Saudi Arabia, and Italy, identify promising high-intent leads, and help your sales team discover qualified business opportunities.',
      desc_ar: 'أقوم بمسح الأسواق المستهدفة في مصر والمملكة العربية السعودية وإيطاليا، وتحديد العملاء الأكثر استعداداً للشراء، ومساعدة فريقك في اكتشاف فرص تجارية ذهبية.',
      desc_it: 'Esploro i mercati target in Egitto, Arabia Saudita e Italia, identificando lead qualificati e nuove opportunità commerciali per il tuo team di vendita.',
      benefit_en: 'Up to 3.5x more qualified pipeline meetings with decision-makers.',
      benefit_ar: 'مضاعفة فرص المقابلات مع متخذي القرار 3.5 أضعاف.',
      benefit_it: 'Fino a 3.5 volte più incontri qualificati con i decisori.'
    },
    {
      id: 'build-databases',
      icon: Database,
      badge_en: 'Data Structuring',
      badge_ar: 'هيكلة البيانات',
      badge_it: 'Database Intelligenti',
      title_en: 'Build Smart Databases',
      title_ar: 'بناء قواعد بيانات ذكية',
      title_it: 'Crea Database Intelligenti',
      desc_en: 'I collect, sanitize, organize, and structure valuable prospect data with full contact hierarchies so your team never wastes a minute on messy spreadsheets.',
      desc_ar: 'أجمع وأنظم وأهيكل بيانات العملاء والمستهدفين وأرقامهم بدقة عالية وتصنيفات مفصلة، لتودع الفوضى وجداول الإكسيل غير المنظمة نهائياً.',
      desc_it: 'Raccolgo, organizzo e strutturo informazioni aziendali cruciali per consentirti di prendere decisioni più rapide e contattare i prospect giusti.',
      benefit_en: '100% structured directories with automatic deduplication.',
      benefit_ar: 'قواعد بيانات منظمة ومفهرسة بنسبة 100% بدون تكرار.',
      benefit_it: 'Directory strutturate al 100% con deduplicazione automatica.'
    },
    {
      id: 'communicate-followup',
      icon: MessageSquare,
      badge_en: 'Omnichannel Nurture',
      badge_ar: 'المتابعة الذكية',
      badge_it: 'Comunicazione & Follow-Up',
      title_en: 'Communicate and Follow Up',
      title_ar: 'التواصل والمتابعة الفعالة',
      title_it: 'Comunica e Fai Follow-Up',
      desc_en: 'I maintain warm, professional business communication across Email and WhatsApp, following up at the ideal cadence so no opportunity ever goes cold.',
      desc_ar: 'أدير التواصل الاحترافي عبر البريد الإلكتروني والواتساب في التوقيت المثالي، مما يضمن متابعة منتظمة لكل عميل دون انقطاع أو إلحاح مزعج.',
      desc_it: 'Supporto la comunicazione multicanale via email e WhatsApp, garantendo un follow-up costante e tempestivo con i potenziali clienti.',
      benefit_en: 'Zero forgotten leads and 65% faster response times.',
      benefit_ar: 'استجابة أسرع بنسبة 65% وعدم فقدان أي فرصة بيعية.',
      benefit_it: 'Zero lead dimenticati e tempi di risposta più veloci del 65%.'
    },
    {
      id: 'close-deals',
      icon: TrendingUp,
      badge_en: 'Pipeline Velocity',
      badge_ar: 'إغلاق الصفقات',
      badge_it: 'Chiusura Contratti',
      title_en: 'Help You Close More Deals',
      title_ar: 'المساعدة في إغلاق الصفقات',
      title_it: 'Aiuta a Chiudere Più Accordi',
      desc_en: 'From early interest to objection handling and proposal readiness, I help guide prospects through each stage of your sales funnel toward conversion.',
      desc_ar: 'من لحظة الاهتمام الأولى وحتى معالجة الاعتراضات وتجهيز العروض، أرافق عملاءك خطوة بخطوة في مسار المبيعات لتحويلهم إلى عملاء دائمين.',
      desc_it: 'Dall’identificazione dei lead alla gestione delle obiezioni, aiuto il tuo team a far avanzare le trattative nel funnel di vendita fino alla chiusura.',
      benefit_en: 'Higher conversion velocity and smoother deal stages.',
      benefit_ar: 'تسريع دورة المبيعات وزيادة معدل إتمام الصفقات.',
      benefit_it: 'Maggiore velocità di conversione e passaggi di vendita fluidi.'
    },
    {
      id: 'analytics-reports',
      icon: Award,
      badge_en: 'Actionable Insights',
      badge_ar: 'تقارير ورؤى',
      badge_it: 'Analisi & Report',
      title_en: 'Analyze Data & Generate Reports',
      title_ar: 'تحليل البيانات وإصدار التقارير',
      title_it: 'Analizza Dati e Crea Report',
      desc_en: 'I translate raw numbers into actionable growth clarity. Spot winning market angles, evaluate campaign performance, and make confident executive decisions.',
      desc_ar: 'أحول أرقامك والبيانات الخام إلى قرارات استراتيجية واضحة، وأكشف نقاط القوة وفرص النمو لمساعدتك في اتخاذ قرارات تنفيذية رابحة.',
      desc_it: 'Trasformo le informazioni aziendali in insight azionabili, permettendoti di comprendere le performance e cogliere le migliori opportunità.',
      benefit_en: 'Executive summaries ready in seconds instead of days.',
      benefit_ar: 'تقارير تنفيذية فورية بدلاً من انتظار أيام لإعدادها.',
      benefit_it: 'Riepiloghi esecutivi pronti in pochi secondi.'
    },
    {
      id: 'save-time',
      icon: Clock,
      badge_en: 'Productivity Multiplication',
      badge_ar: 'توفير الوقت والجهد',
      badge_it: 'Risparmio di Tempo',
      title_en: 'Save Time & Increase Productivity',
      title_ar: 'توفير الوقت ورفع الإنتاجية',
      title_it: 'Risparmia Tempo e Aumenta la Produttività',
      desc_en: 'I handle repetitive, time-draining tasks so your human team can focus on what truly matters: building relationships, creative strategy, and closing big deals.',
      desc_ar: 'أتولى الأعمال الروتينية المستنزفة للوقت، ليتفرغ فريقك البشري لما يصنع الفارق الحقيقي: التفكير الاستراتيجي وبناء علاقات عميقة مع كبار العملاء.',
      desc_it: 'Gestisco i compiti ripetitivi e dispendiosi, consentendo al tuo team di concentrarsi sulle relazioni strategiche e sulla crescita del business.',
      benefit_en: 'Reclaim 20+ hours per week per sales representative.',
      benefit_ar: 'توفير أكثر من 20 ساعة عمل أسبوعياً لكل مسؤول مبيعات.',
      benefit_it: 'Recupera oltre 20 ore a settimana per ciascun membro del team.'
    },
    {
      id: 'continuously-improve',
      icon: Brain,
      badge_en: 'Internal Memory & Evolution',
      badge_ar: 'الذاكرة والتطور المستمر',
      badge_it: 'Miglioramento Continuo',
      title_en: 'Continuously Improve',
      title_ar: 'التعلم والتطور المستمر',
      title_it: 'Miglioramento Continuo con Memoria',
      desc_en: 'Built with dedicated internal memory, I learn company nuances, pitch iterations, and past win/loss patterns to become smarter and more valuable each month.',
      desc_ar: 'أمتلك ذاكرة داخلية تتذكر خصوصية عملك وسياق محادثاتك، وأتعلم من نتائج الصفقات السابقة لأصبح أكثر ذكاءً وفاعلية يوماً بعد يوم.',
      desc_it: 'Dotato di memoria interna, apprendo le sfumature della tua azienda migliorando costantemente per diventare un pilastro del tuo team.',
      benefit_en: 'Compounds intelligence and context over time.',
      benefit_ar: 'تراكم المعرفة والخبرة مع مرور الوقت بدون نسيان.',
      benefit_it: 'Crescita costante delle competenze senza perdita di contesto.'
    }
  ];

  const faqs = [
    {
      q_en: 'What makes BoBo fundamentally different from ChatGPT or generic chatbots?',
      q_ar: 'ما الذي يجعل BoBo مختلفاً جوهرياً عن روبوتات المحادثة العادية أو ChatGPT؟',
      q_it: 'Cosa rende BoBo fondamentalmente diverso dai chatbot tradizionali?',
      a_en: 'BoBo is not a chatbot that waits for someone to type a prompt. BoBo is a proactive Super Intelligence (SI) team member. He holds persistent internal memory, executes complex market research, autonomously builds and cleans prospective customer databases, manages multi-touch WhatsApp and email outreach, and is accountable for sales pipeline progression across Egypt, Saudi Arabia, and Italy.',
      a_ar: 'بوبو ليس مجرد بوت ينتظر أن تكتب له سؤالاً؛ إنه عضو فريق ذكي فائق (Super Intelligence) يبادر بالعمل. يمتلك ذاكرة داخلية تحفظ خصوصية عملك، ينقب في الأسواق، يبني قواعد بيانات دقيقة للعملاء، يدير المتابعات عبر واتساب والإيميل، ويدفع الصفقات للأمام باحترافية كاملة.',
      a_it: 'BoBo non è un semplice chatbot reattivo. È una Super Intelligenza (SI) proattiva dotata di memoria interna, capace di svolgere ricerche di mercato complesse, creare database verificati, gestire follow-up multicanale e far progredire le trattative.'
    },
    {
      q_en: 'How was BoBo tested before being made available to clients?',
      q_ar: 'كيف تم اختبار BoBo والتحقق من كفاءته قبل إتاحته للشركات؟',
      q_it: 'Come è stato testato BoBo prima del lancio ufficiale?',
      a_en: 'BoBo underwent six intensive months of internal testing and commercial deployment right inside Medestra. During this period, BoBo handled complex tasks that previously demanded an entire human team, proving unparalleled speed, consistency, and conversion efficiency.',
      a_ar: 'خضع بوبو لـ 6 أشهر كاملة من الاختبار المكثف والتطبيق العملي الحقيقي داخل أروقة Medestra. وأثبت خلالها قدرته على إنجاز مهام معقدة كانت تتطلب جهداً ووقتاً من فريق كامل، محققاً سرعة غير مسبوقة ودقة مذهلة في المتابعة وتحقيق النتائج.',
      a_it: 'BoBo è stato testato per sei mesi all’interno di Medestra, dimostrando la capacità di gestire compiti complessi che avrebbero richiesto un intero team, con standard di efficienza eccezionali.'
    },
    {
      q_en: 'Which industries can benefit from hiring BoBo?',
      q_ar: 'ما هي القطاعات والشركات التي تستفيد من توظيف BoBo؟',
      q_it: 'Quali settori possono beneficiare dell’integrazione di BoBo?',
      a_en: 'BoBo is engineered for high-growth enterprises across Healthcare (clinics, hospital groups, specialized medical centers), Pharmaceuticals and medical supply distributors, E-commerce & Retail, and B2B Corporate Sales organizations operating in Egypt, Saudi Arabia, Italy, and globally.',
      a_ar: 'صُمم BoBo لخدمة المنشآت الطبية (العيادات والمستشفيات)، شركات الأدوية والمستلزمات الطبية، المتاجر الإلكترونية، وشركات مبيعات الـ B2B في مصر والسعودية وإيطاليا والأسواق العالمية الراغبة في تسريع نموها.',
      a_it: 'BoBo è perfetto per la sanità (cliniche, ospedali), il settore farmaceutico, l’e-commerce e le vendite B2B in Italia, Egitto, Arabia Saudita e mercati internazionali.'
    },
    {
      q_en: 'How quickly can BoBo be integrated into our company?',
      q_ar: 'كم يستغرق دمج وتجهيز BoBo للعمل داخل شركتنا؟',
      q_it: 'In quanto tempo può essere integrato BoBo nella nostra azienda?',
      a_en: 'Onboarding is fast and turnkey. Our engineering and marketing teams train BoBo on your company’s ideal customer profile, product catalog, brand voice, and communication rules within just a few days so you start seeing pipeline momentum right away.',
      a_ar: 'عملية التدريب والانضمام سريعة وسلسة؛ يقوم خبراؤنا بتدريب BoBo على منتجاتك، هوية علامتك التجارية، مواصفات عميلك المثالي، وقواعد التواصل الخاصة بك خلال أيام معدودة لتبدأ برؤية النتائج فوراً.',
      a_it: 'L’integrazione è rapida: configuriamo BoBo con i dati della tua azienda, profilo cliente e canali di contatto in pochi giorni.'
    }
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      const summaryText = encodeURIComponent(
        `مرحباً ميديسترا! أود حجز جلسة عمل لتوظيف BoBo لفريقي:\nالشركة: ${formData.companyName}\nالمجال: ${formData.industry}\nالسوق المستهدف: ${formData.targetCountry}\nالهاتف: ${formData.phone}\nملاحظات: ${formData.notes}`
      );
      window.open(`https://wa.me/201118080265?text=${summaryText}`, '_blank');
      setIsModalOpen(false);
      setFormSubmitted(false);
    }, 1200);
  };

  return (
    <div className={`min-h-screen bg-[#FFFDF7] text-slate-900 ${isArabic ? 'rtl' : 'ltr'} selection:bg-amber-400 selection:text-amber-950 font-sans`}>
      <Helmet>
        <title>
          {isArabic 
            ? 'BoBo Super Intelligence | عضو فريقك الذكي القادم - ميديسترا'
            : isItalian
              ? 'BoBo Super Intelligence | Il Tuo Prossimo Membro del Team SI - Medestra'
              : 'BoBo Super Intelligence | Your Next SI Team Member - Medestra'}
        </title>
        <meta 
          name="description" 
          content={
            isArabic
              ? 'تعرف على BoBo، الذكاء الفائق (SI) من ميديسترا. عضو فريق ذكي بذاكرة داخلية لاكتشاف العملاء، بناء قواعد البيانات، دعم المبيعات وإغلاق الصفقات في مصر، السعودية، وإيطاليا.'
              : isItalian
                ? 'Scopri BoBo, la Super Intelligenza di Medestra. Trova clienti, costruisce database, gestisce follow-up e chiude vendite in Italia, Egitto e Arabia Saudita.'
                : 'Meet BoBo, Medestra’s Super Intelligence (SI). An SI team member with internal memory built to find clients, build smart databases, and close deals in Egypt, Saudi Arabia, and Italy.'
          }
        />
        <meta name="keywords" content="BoBo SI, Super Intelligence, Medical Marketing, Sales Automation Egypt, Sales Saudi Arabia, Business Italy, Medestra BoBo" />
        <link rel="canonical" href="https://medestra.me/service/bobo-super-intelligence" />
        <meta property="og:title" content="BoBo Super Intelligence | Your Next SI Team Member" />
        <meta property="og:description" content="What if your company had an intelligent team member who could identify new business opportunities, support your sales process, and help you close more deals?" />
        <meta property="og:image" content="https://medestra.me/photos/BoBo.webp" />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-[#FFFDF7]">
        {/* Warm Golden Glow Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-300/30 via-yellow-200/25 to-transparent rounded-full blur-[110px] pointer-events-none -z-0" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-amber-400/20 rounded-full blur-[100px] pointer-events-none -z-0" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-yellow-300/25 rounded-full blur-[90px] pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Text & Pitch Column */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 text-center lg:text-start"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400/25 via-yellow-400/20 to-amber-500/20 border border-amber-300/70 shadow-sm backdrop-blur-md mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping inline-block" />
                <span className="text-amber-950 font-bold text-xs md:text-sm tracking-wide">
                  {isArabic 
                    ? 'الذكاء الفائق (SI) • عضو فريقك التنفيذي القادم'
                    : isItalian
                      ? 'Super Intelligence (SI) • Il Tuo Prossimo Membro del Team'
                      : 'Super Intelligence (SI) • Your Next SI Team Member'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-[1.15] mb-6 tracking-tight">
                {isArabic ? (
                  <>
                    أهلاً، أنا <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">BoBo</span> — عضو فريقك الذكي القادم!
                  </>
                ) : isItalian ? (
                  <>
                    Ciao, sono <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">BoBo</span> — Il Tuo Prossimo Membro del Team SI!
                  </>
                ) : (
                  <>
                    Hi, I’m <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent">BoBo</span> — Your Next SI Team Member!
                  </>
                )}
              </h1>

              {/* Subtitle hook */}
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-medium mb-8 max-w-2xl mx-auto lg:mx-0">
                {isArabic 
                  ? 'ماذا لو كان لدى شركتك عضو فريق ذكي يكتشف الفرص التجارية الجديدة، ويدعم عمليات البيع، ويساعدك في إغلاق المزيد من الصفقات؟ هنا يأتي دوري!'
                  : isItalian
                    ? 'Cosa accadrebbe se la tua azienda avesse un membro del team intelligente in grado di scoprire nuove opportunità di business, supportare le vendite e chiudere più accordi? Ecco dove entro in gioco io.'
                    : 'What if your company had an intelligent team member who could identify new business opportunities, support your sales process, and help you close more deals? That’s where I come in.'}
              </p>

              {/* Key Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-start max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/[0.08] border border-amber-300/40 backdrop-blur-xs">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-700 shrink-0">
                    <Brain className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {isArabic ? 'ذاكرة داخلية وسياق دائم' : 'Internal Memory & Context'}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/[0.08] border border-amber-300/40 backdrop-blur-xs">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-700 shrink-0">
                    <Search className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {isArabic ? 'تنقيب ذكي عن العملاء' : 'Proactive Lead Discovery'}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/[0.08] border border-amber-300/40 backdrop-blur-xs">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-700 shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {isArabic ? 'متابعة آلية: واتساب وإيميل' : 'WhatsApp & Email Follow-Up'}
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-500/[0.08] border border-amber-300/40 backdrop-blur-xs">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-700 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-slate-800">
                    {isArabic ? 'مختبر 6 أشهر داخل ميديسترا' : '6 Months Battle-Tested'}
                  </span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start items-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-white font-extrabold text-base shadow-[0_10px_25px_rgba(217,119,6,0.35)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.5)] transition-all duration-300 transform hover:scale-[1.03] border border-amber-200/40"
                >
                  <span>
                    {isArabic ? 'وظّف BoBo في شركتك الآن' : isItalian ? 'Assumi BoBo per la Tua Azienda' : 'Put BoBo to Work For Your Company'}
                  </span>
                  {isArabic ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </a>

                {/* Download Portfolio Button */}
                <a
                  href="/Hi I'm BOBO.pdf"
                  download="Hi I'm BOBO.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-950 font-extrabold text-base border-2 border-amber-400/80 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md group"
                >
                  <Download className="w-5 h-5 text-amber-700 group-hover:-translate-y-0.5 transition-transform" />
                  <span>
                    {isArabic ? 'تحميل البرتفليو (PDF)' : isItalian ? 'Scarica Portfolio (PDF)' : isSpanish ? 'Descargar Portafolio (PDF)' : 'Download Portfolio (PDF)'}
                  </span>
                </a>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/80 hover:bg-white text-amber-950 font-bold text-base border-2 border-amber-300/60 shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-md"
                >
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                  <span>
                    {isArabic ? 'احجز استشارة' : isItalian ? 'Prenota Demo' : 'Request Demo'}
                  </span>
                </button>
              </div>


            </motion.div>

            {/* Visual Mascot Column */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center relative"
            >
              {/* Mascot Glass Stage */}
              <div className="relative w-full max-w-[380px] sm:max-w-[430px] aspect-square flex items-center justify-center">
                {/* Glowing Concentric Halo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/40 via-yellow-300/30 to-amber-500/20 blur-3xl animate-pulse" />
                
                {/* Glass Backdrop Card */}
                <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-amber-400/[0.18] via-yellow-300/[0.10] to-amber-600/[0.18] backdrop-blur-[30px] border-t-2 border-l-2 border-amber-200/90 border-b border-r border-amber-500/30 shadow-[0_25px_60px_rgba(245,158,11,0.22),_inset_0_2px_4px_rgba(255,255,255,0.9)]" />

                {/* The Mascot Image (BoBo) */}
                <motion.img 
                  src={boboImg} 
                  alt="BoBo Super Intelligence Mascot" 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="relative z-10 w-[78%] max-w-[320px] object-contain drop-shadow-[0_20px_35px_rgba(180,83,9,0.35)] select-none pointer-events-none"
                />

                {/* Floating Micro-Badge Top Left */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-3 -left-2 sm:left-2 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-300/70 shadow-lg flex items-center gap-2"
                >
                  <div className="text-start">
                    <div className="text-[11px] font-bold text-amber-900 leading-tight">Super Intelligence</div>
                    <div className="text-[9px] text-slate-500">Not Just a Chatbot</div>
                  </div>
                </motion.div>

                {/* Floating Micro-Badge Bottom Right */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-3 -right-2 sm:right-2 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-amber-300/70 shadow-lg flex items-center gap-2"
                >
                  <div className="w-3 h-3 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Check className="w-2 h-2 text-white stroke-[3]" />
                  </div>
                  <div className="text-start">
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">6 Months Verified</div>
                    <div className="text-[9px] text-slate-500">Tested inside Medestra</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Origin Story / The Medestra Statement */}
      <section className="py-16 md:py-24 bg-white relative border-y border-amber-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] p-8 md:p-14 bg-gradient-to-br from-amber-500/[0.07] via-yellow-400/[0.04] to-amber-600/[0.09] backdrop-blur-xl border-t-2 border-l-2 border-amber-300/80 border-b border-r border-amber-400/20 shadow-[0_20px_50px_rgba(245,158,11,0.1),_inset_0_1px_3px_rgba(255,255,255,0.9)] overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-black tracking-widest text-amber-700 uppercase mb-4 px-3 py-1 rounded-full bg-amber-200/50 border border-amber-300">
                {isArabic ? 'قصة ابتكار BoBo' : isItalian ? 'La Storia di BoBo' : 'The Genesis of BoBo'}
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mb-6 leading-snug">
                {isArabic 
                  ? 'أنا لست مجرد أداة ذكاء اصطناعي أخرى.. أنا عضو حقيقي في فريقك!'
                  : isItalian
                    ? 'Non sono un altro strumento di IA. Sono un vero membro del tuo team.'
                    : 'I’m not just another AI tool. I’m built to work like a real team member.'}
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-6 font-normal">
                {isArabic ? (
                  <>
                    تم تزويدي <strong>بذاكرة داخلية</strong> وقدرة على إدارة المهام المعقدة، وتنظيم المعلومات، وتحسين أدائي باستمرار. بعد <strong>ستة أشهر كاملة من الاختبار والعمل الفعلي داخل Medestra</strong>، أثبتّ قدرتي على التعامل مع المهام المعقدة التي كانت تتطلب في العادة وقداً وجهداً هائلين من فريق كامل.
                  </>
                ) : isItalian ? (
                  <>
                    Costruito con una <strong>memoria interna</strong> e la capacità di gestire compiti complessi, organizzare informazioni e migliorare costantemente le mie prestazioni. Dopo <strong>sei mesi di rigorosi test all’interno di Medestra</strong>, ho dimostrato di poter svolgere attività che normalmente richiederebbero un intero team.
                  </>
                ) : (
                  <>
                    I’m built to work like a real team member, with <strong>internal memory</strong> and the ability to handle complex tasks, organize information, and continuously improve my performance. After <strong>six months of testing inside Medestra</strong>, I demonstrated my ability to handle complex tasks that would typically require significant time and effort from an entire team.
                  </>
                )}
              </p>

              <div className="p-4 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-300/40 text-amber-950 font-bold text-base sm:text-lg mb-8 italic">
                {isArabic
                  ? '«أنت تضع الرؤية والأهداف.. وأنا أقدم الذكاء والتنفيذ لمساعدتك في المضي قُدماً بسرعة غير مسبوقة.»'
                  : isItalian
                    ? '«Tu porti la visione. Io porto l’intelligenza e l’esecuzione per aiutarti a crescere.»'
                    : '“You bring the vision. I bring the intelligence and execution to help you move forward.”'}
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-amber-200/60">
                <div className="p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-black text-amber-600 mb-1">6+ {isArabic ? 'أشهر' : 'Months'}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">
                    {isArabic ? 'اختبار وتحقق داخل ميديسترا' : 'Tested inside Medestra'}
                  </div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-black text-amber-600 mb-1">4 {isArabic ? 'أسواق' : 'Regions'}</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">
                    {isArabic ? 'مصر • السعودية • إيطاليا • أمريكا اللاتينية' : isItalian ? 'Egitto • Arabia Saudita • Italia • America Latina' : 'Egypt • Saudi Arabia • Italy • Latin America'}
                  </div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-3xl sm:text-4xl font-black text-amber-600 mb-1">24/7</div>
                  <div className="text-xs sm:text-sm text-slate-600 font-medium">
                    {isArabic ? 'عمل ومتابعة بلا انقطاع' : 'Always Active Pipeline'}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* The 7 Superpowers (Detailed Feature Cards) */}
      <section id="superpowers" className="py-20 md:py-28 bg-[#FFFDF7] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="inline-block text-xs font-black tracking-widest text-amber-700 uppercase mb-3 px-3 py-1 rounded-full bg-amber-200/50 border border-amber-300">
              {isArabic ? 'قدرات خارقة للأعمال' : isItalian ? 'Superpoteri per il Business' : 'Business Superpowers'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 mb-6">
              {isArabic 
                ? 'كيف أساعد شركتك على النمو السريع؟'
                : isItalian
                  ? 'Come Posso Aiutare la Tua Azienda a Crescere?'
                  : 'Here’s How I Can Help Your Business Grow'}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {isArabic
                ? 'قدرات تنفيذية مدمجة مصممة خصيصاً للتعامل مع تحديات المبيعات، واستقطاب العملاء، وأتمتة المتابعات باحترافية.'
                : isItalian
                  ? 'Capacità esecutive progettate per affrontare le sfide di vendita e acquisizione clienti.'
                  : 'Integrated execution capabilities designed to solve sales challenges, prospect acquisition, and follow-up automation.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {superpowers.map((power, idx) => {
              const Icon = power.icon;
              return (
                <motion.div
                  key={power.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  className={`rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between ${
                    idx === 0 
                      ? 'bg-gradient-to-br from-amber-500/[0.12] via-yellow-400/[0.08] to-amber-600/[0.12] border-2 border-amber-400/60 shadow-[0_15px_35px_rgba(245,158,11,0.15)]'
                      : 'bg-white/70 backdrop-blur-xl border border-amber-200/60 shadow-sm hover:shadow-xl hover:border-amber-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-extrabold text-amber-800 bg-amber-100/80 px-3 py-1 rounded-full border border-amber-200">
                        {isArabic ? power.badge_ar : isItalian ? power.badge_it : power.badge_en}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-3">
                      {isArabic ? power.title_ar : isItalian ? power.title_it : power.title_en}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                      {isArabic ? power.desc_ar : isItalian ? power.desc_it : power.desc_en}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-amber-200/50 flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50/60 p-2.5 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{isArabic ? power.benefit_ar : isItalian ? power.benefit_it : power.benefit_en}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 md:py-24 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-black tracking-widest text-amber-700 uppercase mb-3 px-3 py-1 rounded-full bg-amber-200/50 border border-amber-300">
              {isArabic ? 'تغطية شاملة للقطاعات' : isItalian ? 'Settori di Applicazione' : 'Versatile Across Industries'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 mb-4">
              {isArabic 
                ? 'سواء كنت في الرعاية الصحية، الأدوية، أو مبيعات الشركات'
                : isItalian
                  ? 'Sanità, Farmaceutico, Retail o Vendite B2B'
                  : 'Whether in Healthcare, Pharma, Retail, or B2B Sales'}
            </h2>
            <p className="text-base text-slate-600">
              {isArabic
                ? 'تم تدريب BoBo على التعامل مع متطلبات الأعمال المتقدمة في مختلف المجالات بكفاءة تامة.'
                : 'BoBo is ready to streamline operations and unlock high-ticket growth across multiple sectors.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-3xl bg-white/80 border border-amber-200/60 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {isArabic ? 'الرعاية الصحية والعيادات' : 'Healthcare & Clinics'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isArabic 
                  ? 'متابعة استفسارات المرضى، زيادة تأكيد الحجوزات، والتواصل مع الأطباء والمراكز المتخصصة.'
                  : 'Patient inquiry nurturing, appointment confirmation, and physician referral networking.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 border border-amber-200/60 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {isArabic ? 'شركات الأدوية والمستلزمات' : 'Pharmaceuticals & Supplies'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isArabic 
                  ? 'بناء قواعد بيانات الصيدليات والموزعين في مصر والسعودية وإيطاليا، وتنسيق أوامر التوريد.'
                  : 'Structuring verified pharmacy and distributor directories across Egypt, KSA, and Italy.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 border border-amber-200/60 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {isArabic ? 'التجارة الإلكترونية والتجزئة' : 'Retail & E-Commerce'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isArabic 
                  ? 'استرجاع السلات المتروكة، إرسال عروض الواتساب المخصصة، ورفع تكرار عمليات الشراء.'
                  : 'Cart recovery automation, personalized WhatsApp campaigns, and repeat customer retention.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white/80 border border-amber-200/60 shadow-xs hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {isArabic ? 'مبيعات الـ B2B والشركات' : 'B2B Corporate Sales'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isArabic 
                  ? 'التنقيب عن صُنّاع القرار، إرسال خطابات العروض المبدئية، ودعم المبيعات حتى توقيع العقد.'
                  : 'Prospecting high-level decision makers, personalized proposal delivery, and pipeline acceleration.'}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Comparison: BOBO vs Chat bot (Super Intelligence vs Traditional AI) */}
      <section id="comparison" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-[#006f80] via-[#0b7a8a] to-[#045564] text-white border-y border-amber-300/30">
        {/* Subtle Medestra Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] p-8">
          <img
            src="/mesestra.webp"
            alt=""
            className="w-full max-w-4xl object-contain filter brightness-200"
          />
        </div>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-300/20 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-widest text-amber-200 uppercase px-4 py-1.5 rounded-full bg-white/10 border border-amber-300/40 backdrop-blur-md mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {isArabic ? 'المقارنة الحاسمة • BoBo مقابل Chat bot' : isItalian ? 'Il Confronto Decisivo • BOBO vs Chat bot' : 'The Definitive Comparison • BOBO vs Chat bot'}
              </span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-sm">
              BOBO <span className="text-amber-300 font-extrabold italic">VS</span> Chat bot
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-cyan-50/90 max-w-2xl mx-auto font-medium leading-relaxed">
              {isArabic 
                ? 'روبوتات الدردشة تكتفي بالرد على الأسئلة السطحية.. أما BoBo فهو عضو فريق متكامل يستهدف العملاء، يبني قواعد البيانات، ويغلق الصفقات باستقلالية تامة.' 
                : isItalian
                  ? 'I chatbot si limitano a rispondere alle domande. BoBo è un membro attivo che genera lead, crea database e chiude trattative in piena autonomia.'
                  : 'Chatbots merely answer questions. BoBo executes complex workflows, generates qualified leads, builds verified databases, and drives sales autonomously.'}
            </p>

            {/* View Switcher Tabs */}
            <div className="flex items-center justify-center gap-2 p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 max-w-xs sm:max-w-md mx-auto mt-8 shadow-inner">
              <button
                type="button"
                onClick={() => setComparisonTab('interactive')}
                className={`flex-1 py-2 sm:py-2.5 px-4 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  comparisonTab === 'interactive'
                    ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {isArabic ? '📊 الجدول التفاعلي' : isItalian ? '📊 Tabella Interattiva' : '📊 Interactive View'}
              </button>
              <button
                type="button"
                onClick={() => setComparisonTab('infographic')}
                className={`flex-1 py-2 sm:py-2.5 px-4 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  comparisonTab === 'infographic'
                    ? 'bg-amber-400 text-amber-950 shadow-md scale-[1.02]'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {isArabic ? '🖼️ بوستر الإنفوجرافيك' : isItalian ? '🖼️ Poster Infografica' : '🖼️ Original Infographic'}
              </button>
            </div>
          </div>

          {/* TAB 1: Interactive View */}
          {comparisonTab === 'interactive' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              {/* Columns Header */}
              <div className="grid grid-cols-12 gap-2.5 sm:gap-4 md:gap-5 mb-3 sm:mb-4">
                {/* Column 1: Feature Title */}
                <div className="col-span-4 flex items-end justify-center">
                  <div className="hidden sm:block text-xs font-black uppercase tracking-wider text-cyan-100/70 py-2">
                    {isArabic ? 'المعيار / الوظيفة' : isItalian ? 'Caratteristica' : 'Capability'}
                  </div>
                </div>

                {/* Column 2: BOBO Header */}
                <div className="col-span-4">
                  <div className="bg-[#fce5d2] border-2 border-[#fbd2b3] rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-lg flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 transition-transform hover:scale-[1.02]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-400/30 p-1 flex items-center justify-center border-2 border-amber-400 shadow-sm shrink-0">
                      <img src={boboImg} alt="BoBo" className="w-full h-full object-contain" />
                    </div>
                    <div className="text-center sm:text-start">
                      <span className="block text-base sm:text-2xl font-black text-amber-950 tracking-tight leading-tight">BOBO</span>
                      <span className="hidden sm:block text-[10px] font-bold text-amber-700 uppercase tracking-widest">Super Intelligence</span>
                    </div>
                  </div>
                </div>

                {/* Column 3: Chat bot Header */}
                <div className="col-span-4">
                  <div className="bg-[#fce5d2] border-2 border-[#fbd2b3] rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 shadow-lg flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 transition-transform hover:scale-[1.02]">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-100 p-1 flex items-center justify-center border-2 border-cyan-300 shadow-sm shrink-0">
                      <RobotHeadIcon className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    <div className="text-center sm:text-start">
                      <span className="block text-base sm:text-2xl font-black text-slate-800 tracking-tight leading-tight">Chat bot</span>
                      <span className="hidden sm:block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Standard AI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-2.5 sm:space-y-4">
                {comparisonRows.map((row) => (
                  <div 
                    key={row.id}
                    className="grid grid-cols-12 gap-2.5 sm:gap-4 md:gap-5 items-stretch"
                  >
                    {/* Category Title Card */}
                    <div className="col-span-4 bg-[#fce5d2] border-2 border-[#fbd2b3] rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 shadow-md flex flex-col items-center justify-center text-center">
                      <span className="text-[#c2410c] font-black text-xs sm:text-lg md:text-xl leading-tight">
                        {row.title_en}
                      </span>
                      <span className="text-[#9a3412] font-bold text-[10px] sm:text-sm mt-0.5 sm:mt-1 leading-snug">
                        {isArabic ? row.title_ar : isItalian ? row.title_it : row.title_ar}
                      </span>
                    </div>

                    {/* BoBo Result Card */}
                    <div className="col-span-4 bg-[#fce5d2] border-2 border-[#fbd2b3] rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 shadow-md flex flex-col items-center justify-center text-center">
                      {row.bobo_type === 'text' ? (
                        <div className="flex flex-col items-center">
                          <span className="text-[#047857] font-black text-[11px] sm:text-base md:text-lg leading-tight">
                            {row.bobo_text_en}
                          </span>
                          <span className="text-[#065f46] font-bold text-[10px] sm:text-sm mt-0.5 sm:mt-1 leading-snug">
                            {isArabic ? row.bobo_text_ar : isItalian ? row.bobo_text_it : row.bobo_text_ar}
                          </span>
                        </div>
                      ) : (
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#108954] text-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                          <Check className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3.5]" />
                        </div>
                      )}
                    </div>

                    {/* Chat bot Result Card */}
                    <div className="col-span-4 bg-[#fce5d2] border-2 border-[#fbd2b3] rounded-2xl sm:rounded-3xl p-2.5 sm:p-5 shadow-md flex flex-col items-center justify-center text-center">
                      {row.chatbot_type === 'text' ? (
                        <div className="flex flex-col items-center">
                          <span className="text-[#b91c1c] font-black text-[11px] sm:text-base md:text-lg leading-tight">
                            {row.chatbot_text_en}
                          </span>
                          <span className="text-[#991b1b] font-bold text-[10px] sm:text-sm mt-0.5 sm:mt-1 leading-snug">
                            {isArabic ? row.chatbot_text_ar : isItalian ? row.chatbot_text_it : row.chatbot_text_ar}
                          </span>
                        </div>
                      ) : (
                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#9f1239] text-white flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                          <X className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3.5]" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table Footer: Branding & Quick Action */}
              <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cyan-100/80 border-t border-cyan-400/20">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Medestra® Super Intelligence (SI)</span>
                  <span>•</span>
                  <span>{isArabic ? 'جميع الحقوق محفوظة' : 'All Rights Reserved'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsComparisonModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold underline transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>{isArabic ? 'عرض البوستر الكامل عالي الدقة' : 'View Full-size Poster'}</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Infographic Poster View */}
          {comparisonTab === 'infographic' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div 
                className="relative rounded-3xl overflow-hidden border-4 border-[#fce5d2] shadow-2xl bg-slate-900 group cursor-pointer"
                onClick={() => setIsComparisonModalOpen(true)}
              >
                <img 
                  src={comparisonImg} 
                  alt="BOBO vs Chat bot - Medestra Infographic" 
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-amber-950 font-bold text-sm flex items-center gap-2 shadow-xl">
                    <Maximize2 className="w-4 h-4 text-amber-600" />
                    <span>{isArabic ? 'اضغط لتكبير البوستر بالكامل' : 'Click to enlarge'}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cyan-100/90 px-2">
                <span>All Rights Reserved Medestra®</span>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsComparisonModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'تكبير الشاشة' : 'Fullscreen'}</span>
                  </button>
                  <a
                    href="/photos/bobo-vs-chatbot.png"
                    download="BOBO-vs-Chatbot-Medestra.png"
                    className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isArabic ? 'تحميل الصورة' : 'Download Poster'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* 2027 Pricing Section */}
      <section id="pricing" className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#0e8fa9] via-[#097e97] to-[#06657a] text-white">
        {/* Subtle Medestra Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] p-8">
          <img
            src="/mesestra.webp"
            alt=""
            className="w-full max-w-4xl object-contain filter brightness-200"
          />
        </div>

        {/* Ambient Top Sunrays & Soft Radial Lights */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-200/30 via-cyan-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-300/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-black tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-amber-300 backdrop-blur-md shadow-xs">
              {isArabic ? 'باقات الاشتراك والأسعار الرسمية' : isItalian ? 'Piani di Abbonamento Ufficiali' : isSpanish ? 'Planes y Precios Oficiales' : 'Official Subscription Plans'}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-md">
              2027 Pricing
            </h2>
            <p className="text-base sm:text-lg text-cyan-100/95 max-w-2xl mx-auto font-medium leading-relaxed">
              {isArabic 
                ? 'استثمر في عضو فريق ذكي يعمل على مدار الساعة ليضاعف أرباحك وعملائك، بأسعار واضحة ومباشرة وبدون أي رسوم خفية.'
                : isItalian
                  ? 'Investi in BoBo come membro autonomo del tuo team commerciale: trasparente, scalabile e progettato per massimizzare il ROI.'
                  : 'Invest in BoBo as your autonomous SI team member: clear, scalable pricing with zero hidden fees.'}
            </p>
          </div>

          {/* Pricing Cards List matching the image layout */}
          <div className="space-y-6 max-w-5xl mx-auto">
            
            {/* Card 1: Annual Subscription */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/25 shadow-[0_20px_45px_rgba(0,0,0,0.18)] hover:bg-white/[0.14] transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: English text */}
                <div className="md:col-span-4 text-center md:text-start order-2 md:order-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5 tracking-tight">
                    Annual subscription
                  </h3>
                  <p className="text-sm sm:text-base text-cyan-100 font-medium">
                    (Including WhatsApp and email)
                  </p>
                </div>

                {/* Center: Yellow Price Pill Badge */}
                <div className="md:col-span-4 flex justify-center order-1 md:order-2">
                  <div className="w-full max-w-[270px] py-4 px-6 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-slate-950 text-center shadow-[0_12px_28px_rgba(245,158,11,0.4)] border-2 border-yellow-200/90 transform group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                      5999 SAR
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white/95 uppercase tracking-wider drop-shadow-xs">
                      Annually
                    </div>
                  </div>
                </div>

                {/* Right: Arabic text */}
                <div className="md:col-span-4 text-center md:text-end order-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5 font-sans">
                    الاشتراك السنوي
                  </h3>
                  <p className="text-sm sm:text-base text-cyan-100 font-medium font-sans">
                    (يشمل ربط الواتساب والبريد الالكتروني)
                  </p>
                </div>
              </div>

              {/* Bottom Details & CTA Bar */}
              <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-cyan-100/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                    {isArabic ? 'ذاكرة داخلية مخصصة لشركتك' : 'Dedicated Internal SI Memory'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                    {isArabic ? 'ربط رسمي كامل للواتساب والإيميل' : 'Full WhatsApp & Email Connection'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                    {isArabic ? 'تنقيب عن العملاء ومتابعة الصفقات' : 'Lead Discovery & Deal Nurturing'}
                  </span>
                </div>

                <a
                  href={`https://wa.me/201118080265?text=${encodeURIComponent(
                    isArabic
                      ? 'مرحباً ميديسترا، أود الاشتراك في باقة BoBo (الاشتراك السنوي - 5999 ريال سعودي)'
                      : 'Hello Medestra, I would like to subscribe to BoBo Annual subscription plan (5999 SAR)'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-white text-teal-950 font-black text-xs sm:text-sm shadow-md hover:bg-yellow-300 transition-all transform hover:scale-105 shrink-0"
                >
                  {isArabic ? 'اشترك في الباقة السنوية ←' : 'Subscribe to Annual Plan →'}
                </a>
              </div>
            </motion.div>

            {/* Card 2: Additional integration */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/25 shadow-[0_20px_45px_rgba(0,0,0,0.18)] hover:bg-white/[0.14] transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: English text */}
                <div className="md:col-span-4 text-center md:text-start order-2 md:order-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5 tracking-tight">
                    Additional integration
                  </h3>
                  <p className="text-sm sm:text-base text-cyan-100 font-medium">
                    for any platform
                  </p>
                </div>

                {/* Center: Yellow Price Pill Badge */}
                <div className="md:col-span-4 flex justify-center order-1 md:order-2">
                  <div className="w-full max-w-[270px] py-4 px-6 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-slate-950 text-center shadow-[0_12px_28px_rgba(245,158,11,0.4)] border-2 border-yellow-200/90 transform group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                      499 SAR
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white/95 lowercase tracking-wider drop-shadow-xs">
                      per platform
                    </div>
                  </div>
                </div>

                {/* Right: Arabic text */}
                <div className="md:col-span-4 text-center md:text-end order-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5 font-sans">
                    الربط الاضافي لأي منصة
                  </h3>
                  <p className="text-sm sm:text-base text-cyan-100 font-medium font-sans">
                    (ربط مع أنظمة CRM، المتاجر الإلكترونية، وقواعد البيانات)
                  </p>
                </div>
              </div>

              {/* Bottom Details & CTA Bar */}
              <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-cyan-100/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                    {isArabic ? 'ربط مباشر عبر Webhooks & API' : 'Direct API & Webhook Connectors'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                    {isArabic ? 'مزامنة لحظية للبيانات بدون تأخير' : 'Real-time Synchronous Data Sync'}
                  </span>
                </div>

                <a
                  href={`https://wa.me/201118080265?text=${encodeURIComponent(
                    isArabic
                      ? 'مرحباً ميديسترا، أود طلب ربط إضافي لمنصة مع BoBo (499 ريال سعودي لكل منصة)'
                      : 'Hello Medestra, I would like to request an Additional Platform Integration for BoBo (499 SAR per platform)'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-white text-teal-950 font-black text-xs sm:text-sm shadow-md hover:bg-yellow-300 transition-all transform hover:scale-105 shrink-0"
                >
                  {isArabic ? 'طلب ربط منصة ←' : 'Request Integration →'}
                </a>
              </div>
            </motion.div>

            {/* Card 3: Marketing Campaigns */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl p-6 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/25 shadow-[0_20px_45px_rgba(0,0,0,0.18)] hover:bg-white/[0.14] transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Left: English text */}
                <div className="md:col-span-4 text-center md:text-start order-2 md:order-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5 tracking-tight">
                    Marketing Campaigns
                  </h3>
                  <p className="text-sm sm:text-base text-cyan-100 font-medium">
                    Per 1,000 Messages
                  </p>
                </div>

                {/* Center: Yellow Price Pill Badge */}
                <div className="md:col-span-4 flex justify-center order-1 md:order-2">
                  <div className="w-full max-w-[270px] py-4 px-6 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-slate-950 text-center shadow-[0_12px_28px_rgba(245,158,11,0.4)] border-2 border-yellow-200/90 transform group-hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                      399 SAR
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-white/95 tracking-wider drop-shadow-xs">
                      Per 1,000 Messages
                    </div>
                  </div>
                </div>

                {/* Right: Arabic text */}
                <div className="md:col-span-4 text-center md:text-end order-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5 font-sans">
                    الحملات التسويقية
                  </h3>
                  <p className="text-sm sm:text-base text-cyan-100 font-medium font-sans">
                    لكل 1000 رسالة
                  </p>
                </div>
              </div>

              {/* Bottom Details & CTA Bar */}
              <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm text-cyan-100/90 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                    {isArabic ? 'إرسال ذكي ومخصص دون حظر' : 'Intelligent High-Deliverability Outreach'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                    {isArabic ? 'متابعة تفاعلية آلية للردود' : 'Automated Response Nurture Pipeline'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-yellow-300 shrink-0" />
                    {isArabic ? 'تقارير أداء وتحويل تفصيلية' : 'Comprehensive Conversion Analytics'}
                  </span>
                </div>

                <a
                  href={`https://wa.me/201118080265?text=${encodeURIComponent(
                    isArabic
                      ? 'مرحباً ميديسترا، أود طلب باقة الحملات التسويقية مع BoBo (399 ريال سعودي لكل 1000 رسالة)'
                      : 'Hello Medestra, I would like to order BoBo Marketing Campaign pack (399 SAR per 1,000 messages)'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-white text-teal-950 font-black text-xs sm:text-sm shadow-md hover:bg-yellow-300 transition-all transform hover:scale-105 shrink-0"
                >
                  {isArabic ? 'طلب باقة حملات ←' : 'Order Campaign Pack →'}
                </a>
              </div>
            </motion.div>

          </div>

          {/* Banner Reference & Consultation Prompt */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 text-center max-w-3xl mx-auto">
            <h4 className="text-xl sm:text-2xl font-black text-white mb-2">
              {isArabic ? 'هل تحتاج إلى باقة مخصصة لمنشأتك الطبية أو شركتك؟' : 'Need a Custom Enterprise Setup?'}
            </h4>
            <p className="text-sm sm:text-base text-cyan-100/90 mb-6 font-medium">
              {isArabic
                ? 'فريقنا جاهز لتصميم خطة متكاملة تشمل تدريب BoBo على بيانات عيادتك، منتجاتك، وتكامل أنظمتك بالكامل.'
                : 'Our team is ready to design a tailored rollout integrating BoBo with your internal databases and operations.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-950 font-black text-sm shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <span>{isArabic ? 'تحدث مع مستشار الأعمال عبر واتساب' : 'Talk to Business Advisor on WhatsApp'}</span>
                {isArabic ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/30 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-yellow-300" />
                <span>{isArabic ? 'حجز جلسة استشارية مخصصة' : 'Book Custom Consultation'}</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-[#FFFDF7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-950 mb-3">
              {isArabic ? 'الأسئلة الشائعة حول BoBo' : isItalian ? 'Domande Frequenti su BoBo' : 'Frequently Asked Questions about BoBo'}
            </h2>
            <p className="text-sm text-slate-600">
              {isArabic ? 'كل ما تحتاج معرفته قبل انضمام BoBo إلى فريقك' : 'Everything you need to know before putting BoBo to work.'}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, fidx) => {
              const isOpen = expandedFaq === fidx;
              return (
                <div 
                  key={fidx}
                  className="rounded-2xl border border-amber-200/80 bg-white/80 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setExpandedFaq(isOpen ? null : fidx)}
                    className="w-full p-5 text-start flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-amber-700 transition-colors"
                  >
                    <span>{isArabic ? faq.q_ar : isItalian ? faq.q_it : faq.q_en}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-600 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-amber-100 pt-3"
                      >
                        {isArabic ? faq.a_ar : isItalian ? faq.a_it : faq.a_en}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* High-Converting Final Call to Action */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-[#FFFDF7] via-amber-100/50 to-amber-200/70 border-t border-amber-300/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Mascot in CTA */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-2xl animate-pulse" />
            <img 
              src={boboImg} 
              alt="BoBo Mascot Ready to Work" 
              className="relative z-10 w-full h-full object-contain drop-shadow-xl"
            />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-950 mb-6 tracking-tight leading-tight">
            {isArabic ? (
              <>
                جاهز لتوظيف <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">BoBo</span> في شركتك؟
              </>
            ) : isItalian ? (
              <>
                Pronto a Mettere al Lavoro <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">BoBo</span>?
              </>
            ) : (
              <>
                Ready to Put <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">BoBo</span> to Work?
              </>
            )}
          </h2>

          <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {isArabic 
              ? 'دعنا نتحدث حول كيف يمكن لـ BoBo مساعدة شركتك على النمو السريع، مضاعفة الإنتاجية، واستقطاب المزيد من العملاء في مصر، السعودية، وإيطاليا.'
              : isItalian
                ? 'Parliamo di come BoBo può aiutare la tua azienda a crescere, migliorare la produttività e vincere più clienti.'
                : 'Let’s talk about how BoBo can help your business grow, improve productivity, and win more customers.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-5 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-white font-black text-lg shadow-[0_15px_35px_rgba(217,119,6,0.4)] hover:shadow-[0_20px_45px_rgba(217,119,6,0.6)] transition-all duration-300 transform hover:scale-105 border-2 border-amber-200/50"
            >
              <span>
                {isArabic ? 'تحدث معنا على واتساب لتشغيل BoBo' : isItalian ? 'Parla con Noi su WhatsApp' : 'Talk with Us on WhatsApp'}
              </span>
              {isArabic ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
            </a>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full bg-white text-amber-950 font-bold text-lg border-2 border-amber-300 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <Send className="w-5 h-5 text-amber-600" />
              <span>
                {isArabic ? 'إرسال بيانات الشركة للحصول على خطة' : isItalian ? 'Richiedi una Proposta Personalizzata' : 'Request Company Action Plan'}
              </span>
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {isArabic ? 'سرية بيانات مشددة' : 'Confidential Data Protection'}
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" />
              {isArabic ? 'بدء العمل خلال أيام' : 'Fast Onboarding'}
            </span>
          </div>

        </div>
      </section>

      {/* Consultation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border-2 border-amber-300 relative text-start overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6 border-b border-amber-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <img src={boboImg} alt="BoBo Icon" className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {isArabic ? 'طلب انضمام BoBo لشركتك' : 'Request BoBo Integration'}
                    </h3>
                    <p className="text-xs text-slate-500">Medestra Super Intelligence Consultation</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">
                    {isArabic ? 'جاري فتح المحادثة على واتساب...' : 'Connecting to WhatsApp...'}
                  </h4>
                  <p className="text-sm text-slate-600">
                    {isArabic ? 'تم تجهيز تفاصيل طلبك وسيتم توجيهك فوراً للتحدث مع فريقنا.' : 'Redirecting to our team.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isArabic ? 'اسم الشركة / المنشأة الطبية' : 'Company or Clinic Name'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={isArabic ? 'مثال: مجمع عيادات النور' : 'e.g. Al Noor Medical Center'}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {isArabic ? 'مجال العمل' : 'Industry'}
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 outline-none text-sm bg-white"
                      >
                        <option value="healthcare">{isArabic ? 'رعاية صحية وعيادات' : 'Healthcare & Clinics'}</option>
                        <option value="pharma">{isArabic ? 'أدوية ومستلزمات طبية' : 'Pharma & Supplies'}</option>
                        <option value="retail">{isArabic ? 'تجارة إلكترونية وتجزئة' : 'E-Commerce / Retail'}</option>
                        <option value="b2b">{isArabic ? 'مبيعات B2B وشركات' : 'B2B Sales'}</option>
                        <option value="other">{isArabic ? 'قطاع آخر' : 'Other'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        {isArabic ? 'السوق المستهدف' : 'Target Market'}
                      </label>
                      <select
                        value={formData.targetCountry}
                        onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 outline-none text-sm bg-white"
                      >
                        <option value="egypt">{isArabic ? 'مصر (Egypt)' : 'Egypt'}</option>
                        <option value="ksa">{isArabic ? 'السعودية (KSA)' : 'Saudi Arabia'}</option>
                        <option value="italy">{isArabic ? 'إيطاليا (Italy)' : 'Italy'}</option>
                        <option value="latam">{isArabic ? 'أمريكا اللاتينية (Latin America)' : 'Latin America'}</option>
                        <option value="multi">{isArabic ? 'الكل / أسواق متعددة' : 'Multiple Markets'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isArabic ? 'رقم الهاتف / واتساب للتواصل' : 'WhatsApp / Phone Number'}
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+20... / +966... / +39..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {isArabic ? 'أي أهداف أو مهام ترغب أن يركز عليها BoBo؟' : 'Primary Goals for BoBo'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={isArabic ? 'مثال: جلب عملاء جدد للعيادة، متابعة الواتساب، بناء قاعدة بيانات...' : 'e.g. Lead generation, WhatsApp follow-ups...'}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-amber-500 outline-none text-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-500 text-white font-black text-sm shadow-lg hover:shadow-xl transition-all"
                    >
                      {isArabic ? 'تأكيد وحجز الجلسة الآن' : 'Confirm & Book Session'}
                    </button>
                  </div>
                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal for BoBo vs Chatbot Infographic */}
      <AnimatePresence>
        {isComparisonModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setIsComparisonModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-slate-950 rounded-3xl p-3 sm:p-5 border border-white/20 shadow-2xl flex flex-col items-center"
            >
              <button
                type="button"
                onClick={() => setIsComparisonModalOpen(false)}
                className="absolute -top-3 -right-3 sm:top-3 sm:right-3 z-20 w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl hover:bg-amber-400 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>

              <img
                src={comparisonImg}
                alt="BOBO vs Chat bot - Medestra"
                className="w-full max-h-[80vh] object-contain rounded-2xl select-none"
              />

              <div className="mt-3 w-full flex flex-col sm:flex-row items-center justify-between gap-2 px-2 text-xs sm:text-sm text-slate-300 font-medium">
                <span>Medestra® Super Intelligence (SI) • BOBO vs Chat bot</span>
                <a
                  href="/photos/bobo-vs-chatbot.png"
                  download="BOBO-vs-Chatbot-Medestra.png"
                  className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>{isArabic ? 'تحميل الصورة عالية الدقة' : 'Download High-Res Poster'}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

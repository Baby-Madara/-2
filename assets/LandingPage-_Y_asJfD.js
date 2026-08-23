import { j as jsxRuntimeExports, m as motion, A as AnimatePresence, c as ArrowLeft, d as ArrowRight, u as useInView, G as Globe, C as CircleCheck, e as Phone, M as Mail, f as MapPin, g as Send } from "./ui-vendor-a5hQU3E-.js";
import { r as reactExports, L as Link, g as getDefaultExportFromCjs, d as React, b as reactDomExports, u as useLocation } from "./react-vendor-DY0Dzq76.js";
import { u as useLanguage, H as Helmet } from "./index-h9-LgMCI.js";
import { N as Navbar } from "./Navbar-BmjrySj7.js";
import { g as getAllServices } from "./services-BBmPw5w8.js";
import { c as clsx } from "./utils-vendor-Bpu5wKGe.js";
import { n as notifyContactMessage } from "./telegramService-DHvoeSJj.js";
import { F as Footer } from "./Footer-8-rgPz_h.js";
import { W as WhatsAppButton } from "./WhatsAppButton-BjgNavvJ.js";
const imagePaths = [
  "/mascots/h1.webp",
  "/mascots/h2.webp",
  "/mascots/h3.webp",
  "/mascots/h4.webp"
];
const greetings = [
  "مرحباً",
  "Hello",
  "Ciao",
  "Hola",
  "你好",
  "Merhaba"
];
const Hero = () => {
  const { t, dir } = useLanguage();
  const Arrow = dir === "rtl" ? ArrowLeft : ArrowRight;
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [displayImages, setDisplayImages] = reactExports.useState(imagePaths);
  reactExports.useEffect(() => {
    const interval2 = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 4e3);
    return () => clearInterval(interval2);
  }, []);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "hero", className: "relative h-screen flex items-center pt-16 md:pt-20 overflow-hidden bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:grid lg:grid-cols-2 h-[calc(100vh-100px)] lg:h-auto gap-4 lg:gap-6 items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.8, delay: 0.2 },
        className: `relative flex-1 w-full flex justify-center items-center min-h-0 p-4 ${dir === "rtl" ? "lg:justify-end lg:order-last" : "lg:justify-start lg:order-first"} order-first`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-[80%] lg:h-auto lg:w-full aspect-square max-w-full lg:max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 200 200", xmlns: "http://www.w3.org/2000/svg", className: "md:block absolute inset-0 w-full h-full text-blue-200/50 animate-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "currentColor", d: "M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.3C93.4,8.6,81.8,21.5,70.5,32.4C59.2,43.3,48.2,52.2,36.2,60.6C24.2,69,11.2,76.9,-2.7,81.6C-16.6,86.3,-31.4,87.8,-43.3,81.8C-55.2,75.8,-64.2,62.3,-71.4,49.2C-78.6,36.1,-84,23.4,-84.9,10.2C-85.8,-3,-82.2,-16.7,-74.6,-28.6C-67,-40.5,-55.4,-50.6,-43.1,-58.5C-30.8,-66.4,-17.8,-72.1,-3.5,-66C10.8,-59.9,30.5,-83.6,44.7,-76.4Z", transform: "translate(100 100)" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex items-center justify-center z-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-full bg-white/20 backdrop-blur-sm rounded-full border-2 md:border-4 border-white shadow-xl flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center w-full h-full relative flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.img,
              {
                src: displayImages[currentIndex % displayImages.length],
                alt: `وكيل التسويق الطبي ميديسترا - Medestra Medical Marketing Mascot ${currentIndex % displayImages.length + 1}`,
                loading: "lazy",
                className: "w-[80%] h-[80%] object-contain absolute inset-0 m-auto",
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                transition: { duration: 0.5 }
              },
              currentIndex % displayImages.length
            ) }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, scale: 0.5, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.5, y: -10 },
                transition: { duration: 0.5, type: "spring", bounce: 0.4 },
                className: `absolute top-[0%] md:top-[15%] ${dir === "rtl" ? "left-[-2%] md:left-[5%] rounded-br-[4px]" : "right-[-2%] md:right-[5%] rounded-bl-[4px]"} bg-white px-4 md:px-8 py-2 md:py-4 rounded-2xl md:rounded-[2rem] shadow-xl md:shadow-2xl border-2 md:border-4 border-white/90 backdrop-blur-md z-30 flex items-center justify-center transform hover:scale-105 transition-transform`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg md:text-3xl font-black text-brand-blue drop-shadow-sm tracking-wide", children: greetings[currentIndex % greetings.length] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute -bottom-[8px] md:-bottom-[16px] ${dir === "rtl" ? "right-4 md:right-6 border-l-[8px] md:border-l-[16px] border-r-transparent" : "left-4 md:left-6 border-r-[8px] md:border-r-[16px] border-l-transparent"} border-t-[8px] md:border-t-[16px] border-t-white border-x-transparent drop-shadow-md md:drop-shadow-lg` })
                ]
              },
              currentIndex % greetings.length
            ) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: dir === "rtl" ? 50 : -50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8 },
        className: "text-center lg:text-start shrink-0 pb-4 mb-8",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { backgroundPosition: "0% 50%" },
              animate: { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
              transition: { duration: 4, repeat: Infinity, ease: "linear" },
              className: "inline-flex items-center gap-2 px-4 md:px-5 py-1.5 md:py-2 mb-4 md:mb-6 rounded-full font-extrabold text-xs md:text-sm text-white shadow-[0_0_20px_rgba(249,115,22,0.4)] border border-white/40 bg-[length:200%_200%] bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400",
              dir: "ltr",
              children: "#1 Marketing Partner in Egypt, KSA & Italy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-6xl font-extrabold text-gray-900 leading-normal md:leading-[1.4] mb-3 md:mb-6", children: [
            t.hero.titleStart,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-blue", children: t.hero.titleHighlight })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-xl text-gray-600 mb-4 md:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0", children: t.hero.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-5 justify-center lg:justify-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "#contact",
                onClick: (e) => {
                  var _a;
                  e.preventDefault();
                  (_a = document.getElementById("contact")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                },
                className: "group bg-brand-blue/90 backdrop-blur-xl text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_20px_40px_rgba(0,174,239,0.3),_inset_0_1px_1px_rgba(255,255,255,0.5)] border-t-[2px] border-l-[2px] border-white/60 border-b border-r border-black/10 hover:bg-brand-blue hover:shadow-[0_25px_50px_rgba(0,174,239,0.4),_inset_0_1px_2px_rgba(255,255,255,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer",
                children: [
                  t.hero.quoteBtn,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { className: `w-5 h-5 transition-transform ${dir === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}` })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "#services",
                onClick: (e) => {
                  var _a;
                  e.preventDefault();
                  (_a = document.getElementById("services")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                },
                className: "bg-white/5 backdrop-blur-[32px] text-gray-700 border-t-[2px] border-l-[2px] border-white/80 border-b border-r border-black/5 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/15 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.05),_inset_0_1px_1px_rgba(255,255,255,0.9)] cursor-pointer",
                children: t.hero.servicesBtn
              }
            )
          ] })
        ]
      }
    )
  ] }) }) });
};
const omniaImg = "/assets/omnia%20yasser-Bni6Nh9P.webp";
const nadaImg = "/assets/nada-DdNfkxJ9.jpeg";
const yasminImg = "/assets/yasmin-DFZTrjUw.webp";
const ahmedImg = "/assets/ahmed%20farahat-wV4lE1qa.jfif";
const AboutUs = () => {
  const { t, language } = useLanguage();
  const teamMembers = [
    {
      name: t.aboutUs.cofounder1.name,
      title: t.aboutUs.cofounder1.title,
      image: "/photos/لابلرلات.jpeg"
      // Dr. Omaima
    },
    {
      name: t.aboutUs.founder.name,
      title: t.aboutUs.founder.title,
      image: "/photos/يبليبليلي.webp"
      // Dr. Mahmoud
    },
    {
      name: t.aboutUs.zonia.name,
      title: t.aboutUs.zonia.title,
      image: "/photos/zoni utu.webp"
      // Zonia Hernandez
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "aboutUs",
      className: "py-24 px-4 sm:px-6 lg:px-8 bg-transparent relative overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6", children: t.aboutUs.heading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto", children: t.aboutUs.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-bold text-center text-gray-900 mb-12", children: t.aboutUs.team }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-12 items-start justify-items-center mb-16 max-w-6xl mx-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full order-2 md:order-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-4 md:mb-6 w-full flex justify-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-1 md:p-1.5 bg-white/[0.05] backdrop-blur-[32px] rounded-full border-t-[1.5px] border-l-[1.5px] border-white/80 border-b border-r border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.1),_inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-700 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,1)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-transparent border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: teamMembers[0].image,
                  alt: `${teamMembers[0].name} - فريق التسويق الطبي ميديسترا`,
                  loading: "lazy",
                  className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                }
              ) }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-center ${language === "ar" ? "rtl" : "ltr"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2", children: teamMembers[0].name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] sm:text-xs md:text-sm text-brand-blue font-semibold mb-2", children: teamMembers[0].title })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://www.linkedin.com/in/pharmacist-mahmoud",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex flex-col items-center w-full col-span-2 md:col-span-1 order-1 md:order-2 mb-4 md:mb-0 cursor-pointer group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-4 md:mb-6 w-full flex justify-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-1.5 md:p-2 bg-white/[0.05] backdrop-blur-[40px] rounded-full border-t-[2px] border-l-[2px] border-white/90 border-b border-r border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.2),_inset_0_1px_3px_rgba(255,255,255,1)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-transparent border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: teamMembers[1].image,
                      alt: `${teamMembers[1].name} - فريق التسويق الطبي ميديسترا`,
                      loading: "lazy",
                      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    }
                  ) }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-center ${language === "ar" ? "rtl" : "ltr"}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2 group-hover:text-brand-blue transition-colors", children: teamMembers[1].name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-brand-blue font-semibold mb-2", children: teamMembers[1].title })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full order-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-4 md:mb-6 w-full flex justify-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-1 md:p-1.5 bg-white/[0.05] backdrop-blur-[32px] rounded-full border-t-[1.5px] border-l-[1.5px] border-white/80 border-b border-r border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.1),_inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-700 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,1)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-transparent border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: teamMembers[2].image,
                  alt: `${teamMembers[2].name} - فريق التسويق الطبي ميديسترا`,
                  loading: "lazy",
                  className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                }
              ) }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-center ${language === "ar" ? "rtl" : "ltr"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2", children: teamMembers[2].name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] sm:text-xs md:text-sm text-brand-blue font-semibold mb-2", children: teamMembers[2].title })
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-bold text-center text-gray-900 mb-12", children: language === "ar" ? "فريقنا" : "Our Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-12 items-start justify-items-center mb-16 max-w-7xl mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-4 md:mb-6 w-full flex justify-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-1.5 md:p-2 bg-white/[0.05] backdrop-blur-[40px] rounded-full border-t-[2px] border-l-[2px] border-white/90 border-b border-r border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.2),_inset_0_1px_3px_rgba(255,255,255,1)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-transparent border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: omniaImg,
                    alt: `${t.aboutUs.omnia.name} - فريق التسويق الطبي ميديسترا`,
                    loading: "lazy",
                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 object-[top]"
                  }
                ) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-center ${language === "ar" ? "rtl" : "ltr"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2", children: t.aboutUs.omnia.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-brand-blue font-semibold mb-2", children: t.aboutUs.omnia.title })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-4 md:mb-6 w-full flex justify-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-1.5 md:p-2 bg-white/[0.05] backdrop-blur-[40px] rounded-full border-t-[2px] border-l-[2px] border-white/90 border-b border-r border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.2),_inset_0_1px_3px_rgba(255,255,255,1)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-transparent border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: ahmedImg,
                    alt: `${t.aboutUs.ahmed.name} - فريق التسويق الطبي ميديسترا`,
                    loading: "lazy",
                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 object-[top]"
                  }
                ) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-center ${language === "ar" ? "rtl" : "ltr"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2", children: t.aboutUs.ahmed.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] sm:text-sm text-brand-blue font-semibold mb-2", children: t.aboutUs.ahmed.title })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-4 md:mb-6 w-full flex justify-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-1.5 md:p-2 bg-white/[0.05] backdrop-blur-[40px] rounded-full border-t-[2px] border-l-[2px] border-white/90 border-b border-r border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.2),_inset_0_1px_3px_rgba(255,255,255,1)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-transparent border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: nadaImg,
                    alt: `${t.aboutUs.nada.name} - فريق التسويق الطبي ميديسترا`,
                    loading: "lazy",
                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 object-[top]"
                  }
                ) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-center ${language === "ar" ? "rtl" : "ltr"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2", children: t.aboutUs.nada.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-brand-blue font-semibold mb-2", children: t.aboutUs.nada.title })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mb-4 md:mb-6 w-full flex justify-center group", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-1.5 md:p-2 bg-white/[0.05] backdrop-blur-[40px] rounded-full border-t-[2px] border-l-[2px] border-white/90 border-b border-r border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all duration-700 group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.2),_inset_0_1px_3px_rgba(255,255,255,1)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full overflow-hidden bg-transparent border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: yasminImg,
                    alt: `${t.aboutUs.yasmin.name} - فريق التسويق الطبي ميديسترا`,
                    loading: "lazy",
                    className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 object-[top]"
                  }
                ) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-center ${language === "ar" ? "rtl" : "ltr"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2", children: t.aboutUs.yasmin.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] sm:text-sm text-brand-blue font-semibold mb-2 leading-normal", children: t.aboutUs.yasmin.title })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backdrop-blur-[40px] bg-white/[0.05] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 rounded-[3rem] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_35px_80px_rgba(0,0,0,0.15),_inset_0_1px_3px_rgba(255,255,255,1)] transition-all duration-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-2xl font-bold text-gray-900 mb-4 text-center", children: t.aboutUs.mission }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-gray-700 leading-relaxed text-center ${language === "ar" ? "rtl" : "ltr"}`,
                  dangerouslySetInnerHTML: { __html: t.aboutUs.missionDescription }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backdrop-blur-[40px] bg-white/[0.05] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 rounded-[3rem] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] hover:shadow-[0_35px_80px_rgba(0,0,0,0.15),_inset_0_1px_3px_rgba(255,255,255,1)] transition-all duration-700", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-2xl font-bold text-gray-900 mb-4 text-center", children: t.aboutUs.vision }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-gray-700 leading-relaxed text-center ${language === "ar" ? "rtl" : "ltr"}`,
                  dangerouslySetInnerHTML: { __html: t.aboutUs.visionDescription }
                }
              )
            ] })
          ] }) })
        ] })
      ] })
    }
  );
};
const doctorMeImg = "/assets/doctor%20me-C7JxRoFC.webp";
const callCenterImg = "/assets/call%20center%20me-Cu5KJhf3.webp";
const salahMeImg = "/assets/salah%20me-CLddeuM9.webp";
const smsmImg = "/assets/smsm-BWmYrRg_.webp";
const mohadaraImg = "/assets/mohadara-DQ6DjlYp.webp";
const mobarmegImg = "/assets/mobarmeg-BaTqrvLZ.webp";
const ServiceCard = ({ service, index: index2, language, getLocalized, t }) => {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { margin: "-35% 0px -35% 0px", amount: "some" });
  const getImageSrc = (id2) => {
    switch (id2) {
      case "medical-content":
        return doctorMeImg;
      case "customer-service":
        return callCenterImg;
      case "ecommerce":
        return salahMeImg;
      case "social-media":
        return smsmImg;
      case "team-training":
        return mohadaraImg;
      case "web-mobile":
        return mobarmegImg;
      default:
        return null;
    }
  };
  const imageSrc = getImageSrc(service.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative group h-full z-20 hover:z-50", children: [
    imageSrc && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: imageSrc,
        alt: service.id,
        className: `absolute top-0 left-1/2 w-[220px] object-contain transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] -z-10 drop-shadow-xl pointer-events-none mascot-image ${isInView ? "in-view" : ""}`,
        style: { marginLeft: "-110px" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/service/${service.slug}`, className: "block h-full relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index2 * 0.1, duration: 0.5 },
        className: `h-full rounded-[2.5rem] p-6 bg-white/[0.05] backdrop-blur-[40px] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1),_inset_0_1px_2px_rgba(255,255,255,0.9)] hover:bg-white/[0.1] hover:shadow-[0_30px_70px_rgba(0,0,0,0.15),_inset_0_1px_3px_rgba(255,255,255,1)] hover:-translate-y-3 transition-all duration-700 cursor-pointer group relative overflow-hidden`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-[0.08] group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/mesestra.webp",
              alt: "",
              className: "w-full h-full object-contain filter grayscale group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col h-full text-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-slate-900 leading-normal", children: getLocalized(service, "title") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-700 mb-6 leading-relaxed text-base flex-grow", children: getLocalized(service, "shortDesc") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center mt-auto pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 text-sm font-bold bg-brand-blue text-white w-fit px-6 py-2 rounded-full shadow-[0_8px_20px_rgba(0,174,239,0.25)] group-hover:shadow-[0_12px_25px_rgba(0,174,239,0.4)] group-hover:bg-[#009ADD] transition-all duration-300 transform group-hover:scale-105 border border-white/20", children: language === "ar" ? "اكتشف المزيد ←" : language === "es" ? "Descubrir Más →" : "Discover More →" }) })
          ] })
        ]
      }
    ) })
  ] });
};
const Services = () => {
  var _a, _b;
  const langCtx = useLanguage();
  const language = (langCtx == null ? void 0 : langCtx.language) || "ar";
  const t = (langCtx == null ? void 0 : langCtx.t) || { services: { heading: "الخدمات", subheading: "اكتشف خدماتنا المتخصصة" } };
  const services = getAllServices();
  const getLocalized = (obj, key) => {
    return obj[`${key}_${language}`] || obj[`${key}_en`];
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "services", className: "min-h-screen pt-20 pb-4 md:pt-24 md:pb-4 bg-transparent flex flex-col justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12 md:mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold text-slate-900 mb-4", children: ((_a = t.services) == null ? void 0 : _a.heading) || (language === "ar" ? "خدماتنا" : "Our Services") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-lg text-slate-600 max-w-3xl mx-auto",
          dangerouslySetInnerHTML: {
            __html: ((_b = t.services) == null ? void 0 : _b.subheading) || (language === "ar" ? 'حلول تسويق طبي شاملة مصممة خصيصاً لتنمية <span class="text-[#F5C518] font-extrabold drop-shadow-[0_0_10px_rgba(245,197,24,0.9)]">ممارستك الطبية</span>' : 'Comprehensive healthcare marketing solutions designed to grow your <span class="text-[#F5C518] font-extrabold drop-shadow-[0_0_10px_rgba(245,197,24,0.9)]">medical practice</span>')
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-y-16 md:gap-x-8 mt-8", children: services.map((service, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServiceCard,
      {
        service,
        index: index2,
        language,
        getLocalized,
        t
      },
      service.id
    )) })
  ] }) });
};
const Beneficiaries = () => {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 md:py-28 bg-transparent border-t border-gray-100 flex flex-col justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12 md:mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4", children: t.beneficiaries.heading }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg md:text-xl text-gray-600 max-w-3xl mx-auto", dangerouslySetInnerHTML: { __html: t.beneficiaries.subheading } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 justify-items-center", children: t.beneficiaries.items.map((item, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index2 * 0.1, duration: 0.5, ease: "easeOut" },
        className: "flex flex-col items-center group w-full max-w-[200px]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full aspect-square mb-4 rounded-2xl overflow-hidden relative bg-white shadow-sm border border-gray-200 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: item.image,
                alt: item.label,
                className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-gray-800 text-sm md:text-base text-center group-hover:text-blue-600 transition-colors", children: item.label })
        ]
      },
      index2
    )) })
  ] }) });
};
const metaLogo = "/assets/%D9%85%D9%8A%D8%AA%D8%A7-DZQ7cYIV.webp";
const googleAnalyticsLogo = "/assets/%D8%AC%D9%88%D8%AC%D9%84%20%D8%A7%D9%86%D8%A7%D9%84%D9%8A%D8%AA%D9%83%D8%B3-CI6puRLS.webp";
const googleLogo = "/assets/%D8%AC%D9%88%D8%AC%D9%84-CQdNmooN.webp";
const snapchatLogo = "/assets/%D8%B3%D9%86%D8%A7%D8%A8%20%D8%B4%D8%A7%D8%AA-qgBXnNks.webp";
const tiktokLogo = "/assets/%D8%AA%D9%8A%D9%83%20%D8%AA%D9%88%D9%83-B9q5qbAI.webp";
const amazonLogo = "/assets/%D8%A7%D9%85%D8%A7%D8%B2%D9%88%D9%86-0HYEIATA.webp";
const noonLogo = "/assets/%D9%86%D9%88%D9%86-Ge7m3ttp.webp";
const jumiaLogo = "/assets/%D8%AC%D9%88%D9%85%D9%8A%D8%A7%20%D8%B5%D9%88%D8%B1%D8%A9-Cx2ERzcN.webp";
const trendyolLogo = "/assets/%D8%AA%D8%B1%D9%86%D8%AF%D9%8A%D9%88%D9%84-B99oLrFt.webp";
const talabatLogo = "/assets/%D8%B7%D9%84%D8%A8%D8%A7%D8%AA-JGGEd9hR.webp";
const shopifyLogo = "/assets/%D8%B4%D9%88%D8%A8%D9%8A%20%D9%81%D8%A7%D9%8A-rFA_G47G.webp";
const zidLogo = "/assets/%D8%B2%D8%AF-B7x4Stsh.webp";
const wooLogo = "/assets/WOO-D3KxNIZb.webp";
const PARTNERS = [
  { name: "Meta", logo: metaLogo },
  { name: "Google Analytics", logo: googleAnalyticsLogo },
  { name: "Google", logo: googleLogo },
  { name: "Snapchat", logo: snapchatLogo },
  { name: "TikTok", logo: tiktokLogo },
  { name: "Amazon", logo: amazonLogo },
  { name: "Noon", logo: noonLogo },
  { name: "Jumia", logo: jumiaLogo },
  { name: "Trendyol", logo: trendyolLogo },
  { name: "Talabat", logo: talabatLogo },
  { name: "Shopify", logo: shopifyLogo },
  { name: "Zid", logo: zidLogo },
  { name: "WooCommerce", logo: wooLogo }
];
const Partners = () => {
  const { language } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "py-12 md:py-16 bg-transparent overflow-hidden border-t border-gray-100",
      "aria-label": "Our Partners",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-10 md:mb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg md:text-xl font-bold tracking-[0.2em] text-gray-400 uppercase flex items-center justify-center gap-4 px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px bg-gray-200 w-8 md:w-20 hidden sm:block" }),
          language === "ar" ? "شبكة شركاء النجاح" : "OUR GROWTH NETWORK",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px bg-gray-200 w-8 md:w-20 hidden sm:block" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full overflow-hidden mask-image-linear", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "flex gap-16 md:gap-32 items-center w-fit pr-16 md:pr-32",
            initial: { x: 0 },
            animate: { x: "-50%" },
            transition: {
              duration: 40,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop"
            },
            children: [...PARTNERS, ...PARTNERS].map((partner, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center transition-all duration-700 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: partner.logo,
                alt: partner.name,
                loading: "lazy",
                draggable: "false",
                className: "h-7 md:h-10 lg:h-12 w-auto max-w-[140px] object-contain select-none"
              }
            ) }, i))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { dangerouslySetInnerHTML: {
          __html: `
        .mask-image-linear {
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `
        } })
      ]
    }
  );
};
var propTypes = { exports: {} };
var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  ReactPropTypesSecret_1 = ReactPropTypesSecret;
  return ReactPropTypesSecret_1;
}
var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var ReactPropTypesSecret = /* @__PURE__ */ requireReactPropTypesSecret();
  function emptyFunction() {
  }
  function emptyFunctionWithReset() {
  }
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }
      var err = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      err.name = "Invariant Violation";
      throw err;
    }
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  };
  return factoryWithThrowingShims;
}
var hasRequiredPropTypes;
function requirePropTypes() {
  if (hasRequiredPropTypes) return propTypes.exports;
  hasRequiredPropTypes = 1;
  {
    propTypes.exports = /* @__PURE__ */ requireFactoryWithThrowingShims()();
  }
  return propTypes.exports;
}
var propTypesExports = /* @__PURE__ */ requirePropTypes();
const PropTypes = /* @__PURE__ */ getDefaultExportFromCjs(propTypesExports);
class Adder {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x2) {
    const p = this._partials;
    let i = 0;
    for (let j2 = 0; j2 < this._n && j2 < 32; j2++) {
      const y2 = p[j2], hi = x2 + y2, lo = Math.abs(x2) < Math.abs(y2) ? x2 - (hi - y2) : y2 - (hi - x2);
      if (lo) p[i++] = lo;
      x2 = hi;
    }
    p[i] = x2;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n, x2, y2, lo, hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x2 = hi;
        y2 = p[--n];
        hi = x2 + y2;
        lo = y2 - (hi - x2);
        if (lo) break;
      }
      if (n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0)) {
        y2 = lo * 2;
        x2 = hi + y2;
        if (y2 == x2 - hi) hi = x2;
      }
    }
    return hi;
  }
}
function* flatten(arrays) {
  for (const array2 of arrays) {
    yield* array2;
  }
}
function merge(arrays) {
  return Array.from(flatten(arrays));
}
function range$1(start2, stop, step) {
  start2 = +start2, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start2, start2 = 0, 1) : n < 3 ? 1 : +step;
  var i = -1, n = Math.max(0, Math.ceil((stop - start2) / step)) | 0, range2 = new Array(n);
  while (++i < n) {
    range2[i] = start2 + i * step;
  }
  return range2;
}
var epsilon = 1e-6;
var epsilon2$1 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;
var degrees$1 = 180 / pi;
var radians = pi / 180;
var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;
var hypot = Math.hypot;
var log = Math.log;
var pow = Math.pow;
var sin = Math.sin;
var sign = Math.sign || function(x2) {
  return x2 > 0 ? 1 : x2 < 0 ? -1 : 0;
};
var sqrt = Math.sqrt;
var tan = Math.tan;
function acos(x2) {
  return x2 > 1 ? 0 : x2 < -1 ? pi : Math.acos(x2);
}
function asin(x2) {
  return x2 > 1 ? halfPi : x2 < -1 ? -halfPi : Math.asin(x2);
}
function haversin(x2) {
  return (x2 = sin(x2 / 2)) * x2;
}
function noop$1() {
}
function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}
var streamObjectType = {
  Feature: function(object2, stream) {
    streamGeometry(object2.geometry, stream);
  },
  FeatureCollection: function(object2, stream) {
    var features = object2.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};
var streamGeometryType = {
  Sphere: function(object2, stream) {
    stream.sphere();
  },
  Point: function(object2, stream) {
    object2 = object2.coordinates;
    stream.point(object2[0], object2[1], object2[2]);
  },
  MultiPoint: function(object2, stream) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) object2 = coordinates2[i], stream.point(object2[0], object2[1], object2[2]);
  },
  LineString: function(object2, stream) {
    streamLine(object2.coordinates, stream, 0);
  },
  MultiLineString: function(object2, stream) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) streamLine(coordinates2[i], stream, 0);
  },
  Polygon: function(object2, stream) {
    streamPolygon(object2.coordinates, stream);
  },
  MultiPolygon: function(object2, stream) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) streamPolygon(coordinates2[i], stream);
  },
  GeometryCollection: function(object2, stream) {
    var geometries = object2.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};
function streamLine(coordinates2, stream, closed) {
  var i = -1, n = coordinates2.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates2[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}
function streamPolygon(coordinates2, stream) {
  var i = -1, n = coordinates2.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates2[i], stream, 1);
  stream.polygonEnd();
}
function geoStream(object2, stream) {
  if (object2 && streamObjectType.hasOwnProperty(object2.type)) {
    streamObjectType[object2.type](object2, stream);
  } else {
    streamGeometry(object2, stream);
  }
}
var areaRingSum$1 = new Adder();
var areaSum$1 = new Adder(), lambda00$2, phi00$2, lambda0$2, cosPhi0$1, sinPhi0$1;
var areaStream$1 = {
  point: noop$1,
  lineStart: noop$1,
  lineEnd: noop$1,
  polygonStart: function() {
    areaRingSum$1 = new Adder();
    areaStream$1.lineStart = areaRingStart$1;
    areaStream$1.lineEnd = areaRingEnd$1;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum$1;
    areaSum$1.add(areaRing < 0 ? tau + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = noop$1;
  },
  sphere: function() {
    areaSum$1.add(tau);
  }
};
function areaRingStart$1() {
  areaStream$1.point = areaPointFirst$1;
}
function areaRingEnd$1() {
  areaPoint$1(lambda00$2, phi00$2);
}
function areaPointFirst$1(lambda, phi) {
  areaStream$1.point = areaPoint$1;
  lambda00$2 = lambda, phi00$2 = phi;
  lambda *= radians, phi *= radians;
  lambda0$2 = lambda, cosPhi0$1 = cos(phi = phi / 2 + quarterPi), sinPhi0$1 = sin(phi);
}
function areaPoint$1(lambda, phi) {
  lambda *= radians, phi *= radians;
  phi = phi / 2 + quarterPi;
  var dLambda = lambda - lambda0$2, sdLambda = dLambda >= 0 ? 1 : -1, adLambda = sdLambda * dLambda, cosPhi = cos(phi), sinPhi = sin(phi), k2 = sinPhi0$1 * sinPhi, u = cosPhi0$1 * cosPhi + k2 * cos(adLambda), v = k2 * sdLambda * sin(adLambda);
  areaRingSum$1.add(atan2(v, u));
  lambda0$2 = lambda, cosPhi0$1 = cosPhi, sinPhi0$1 = sinPhi;
}
function area(object2) {
  areaSum$1 = new Adder();
  geoStream(object2, areaStream$1);
  return areaSum$1 * 2;
}
function spherical(cartesian2) {
  return [atan2(cartesian2[1], cartesian2[0]), asin(cartesian2[2])];
}
function cartesian(spherical2) {
  var lambda = spherical2[0], phi = spherical2[1], cosPhi = cos(phi);
  return [cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi)];
}
function cartesianDot(a, b2) {
  return a[0] * b2[0] + a[1] * b2[1] + a[2] * b2[2];
}
function cartesianCross(a, b2) {
  return [a[1] * b2[2] - a[2] * b2[1], a[2] * b2[0] - a[0] * b2[2], a[0] * b2[1] - a[1] * b2[0]];
}
function cartesianAddInPlace(a, b2) {
  a[0] += b2[0], a[1] += b2[1], a[2] += b2[2];
}
function cartesianScale(vector, k2) {
  return [vector[0] * k2, vector[1] * k2, vector[2] * k2];
}
function cartesianNormalizeInPlace(d) {
  var l = sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}
var lambda0$1, phi0, lambda1, phi1, lambda2, lambda00$1, phi00$1, p0, deltaSum, ranges, range;
var boundsStream$1 = {
  point: boundsPoint$1,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function() {
    boundsStream$1.point = boundsRingPoint;
    boundsStream$1.lineStart = boundsRingStart;
    boundsStream$1.lineEnd = boundsRingEnd;
    deltaSum = new Adder();
    areaStream$1.polygonStart();
  },
  polygonEnd: function() {
    areaStream$1.polygonEnd();
    boundsStream$1.point = boundsPoint$1;
    boundsStream$1.lineStart = boundsLineStart;
    boundsStream$1.lineEnd = boundsLineEnd;
    if (areaRingSum$1 < 0) lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
    else if (deltaSum > epsilon) phi1 = 90;
    else if (deltaSum < -epsilon) phi0 = -90;
    range[0] = lambda0$1, range[1] = lambda1;
  },
  sphere: function() {
    lambda0$1 = -(lambda1 = 180), phi0 = -(phi1 = 90);
  }
};
function boundsPoint$1(lambda, phi) {
  ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
}
function linePoint(lambda, phi) {
  var p = cartesian([lambda * radians, phi * radians]);
  if (p0) {
    var normal = cartesianCross(p0, p), equatorial = [normal[1], -normal[0], 0], inflection = cartesianCross(equatorial, normal);
    cartesianNormalizeInPlace(inflection);
    inflection = spherical(inflection);
    var delta = lambda - lambda2, sign2 = delta > 0 ? 1 : -1, lambdai = inflection[0] * degrees$1 * sign2, phii, antimeridian = abs(delta) > 180;
    if (antimeridian ^ (sign2 * lambda2 < lambdai && lambdai < sign2 * lambda)) {
      phii = inflection[1] * degrees$1;
      if (phii > phi1) phi1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign2 * lambda2 < lambdai && lambdai < sign2 * lambda)) {
      phii = -inflection[1] * degrees$1;
      if (phii < phi0) phi0 = phii;
    } else {
      if (phi < phi0) phi0 = phi;
      if (phi > phi1) phi1 = phi;
    }
    if (antimeridian) {
      if (lambda < lambda2) {
        if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
      } else {
        if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
      }
    } else {
      if (lambda1 >= lambda0$1) {
        if (lambda < lambda0$1) lambda0$1 = lambda;
        if (lambda > lambda1) lambda1 = lambda;
      } else {
        if (lambda > lambda2) {
          if (angle(lambda0$1, lambda) > angle(lambda0$1, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda0$1, lambda1)) lambda0$1 = lambda;
        }
      }
    }
  } else {
    ranges.push(range = [lambda0$1 = lambda, lambda1 = lambda]);
  }
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
  p0 = p, lambda2 = lambda;
}
function boundsLineStart() {
  boundsStream$1.point = linePoint;
}
function boundsLineEnd() {
  range[0] = lambda0$1, range[1] = lambda1;
  boundsStream$1.point = boundsPoint$1;
  p0 = null;
}
function boundsRingPoint(lambda, phi) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add(abs(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda00$1 = lambda, phi00$1 = phi;
  }
  areaStream$1.point(lambda, phi);
  linePoint(lambda, phi);
}
function boundsRingStart() {
  areaStream$1.lineStart();
}
function boundsRingEnd() {
  boundsRingPoint(lambda00$1, phi00$1);
  areaStream$1.lineEnd();
  if (abs(deltaSum) > epsilon) lambda0$1 = -(lambda1 = 180);
  range[0] = lambda0$1, range[1] = lambda1;
  p0 = null;
}
function angle(lambda02, lambda12) {
  return (lambda12 -= lambda02) < 0 ? lambda12 + 360 : lambda12;
}
function rangeCompare(a, b2) {
  return a[0] - b2[0];
}
function rangeContains(range2, x2) {
  return range2[0] <= range2[1] ? range2[0] <= x2 && x2 <= range2[1] : x2 < range2[0] || range2[1] < x2;
}
function bounds(feature2) {
  var i, n, a, b2, merged, deltaMax, delta;
  phi1 = lambda1 = -(lambda0$1 = phi0 = Infinity);
  ranges = [];
  geoStream(feature2, boundsStream$1);
  if (n = ranges.length) {
    ranges.sort(rangeCompare);
    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
      b2 = ranges[i];
      if (rangeContains(a, b2[0]) || rangeContains(a, b2[1])) {
        if (angle(a[0], b2[1]) > angle(a[0], a[1])) a[1] = b2[1];
        if (angle(b2[0], a[1]) > angle(a[0], a[1])) a[0] = b2[0];
      } else {
        merged.push(a = b2);
      }
    }
    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b2, ++i) {
      b2 = merged[i];
      if ((delta = angle(a[1], b2[0])) > deltaMax) deltaMax = delta, lambda0$1 = b2[0], lambda1 = a[1];
    }
  }
  ranges = range = null;
  return lambda0$1 === Infinity || phi0 === Infinity ? [[NaN, NaN], [NaN, NaN]] : [[lambda0$1, phi0], [lambda1, phi1]];
}
var W0, W1, X0$1, Y0$1, Z0$1, X1$1, Y1$1, Z1$1, X2$1, Y2$1, Z2$1, lambda00, phi00, x0$4, y0$4, z0;
var centroidStream$1 = {
  sphere: noop$1,
  point: centroidPoint$1,
  lineStart: centroidLineStart$1,
  lineEnd: centroidLineEnd$1,
  polygonStart: function() {
    centroidStream$1.lineStart = centroidRingStart$1;
    centroidStream$1.lineEnd = centroidRingEnd$1;
  },
  polygonEnd: function() {
    centroidStream$1.lineStart = centroidLineStart$1;
    centroidStream$1.lineEnd = centroidLineEnd$1;
  }
};
function centroidPoint$1(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos(phi);
  centroidPointCartesian(cosPhi * cos(lambda), cosPhi * sin(lambda), sin(phi));
}
function centroidPointCartesian(x2, y2, z2) {
  ++W0;
  X0$1 += (x2 - X0$1) / W0;
  Y0$1 += (y2 - Y0$1) / W0;
  Z0$1 += (z2 - Z0$1) / W0;
}
function centroidLineStart$1() {
  centroidStream$1.point = centroidLinePointFirst;
}
function centroidLinePointFirst(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos(phi);
  x0$4 = cosPhi * cos(lambda);
  y0$4 = cosPhi * sin(lambda);
  z0 = sin(phi);
  centroidStream$1.point = centroidLinePoint;
  centroidPointCartesian(x0$4, y0$4, z0);
}
function centroidLinePoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos(phi), x2 = cosPhi * cos(lambda), y2 = cosPhi * sin(lambda), z2 = sin(phi), w2 = atan2(sqrt((w2 = y0$4 * z2 - z0 * y2) * w2 + (w2 = z0 * x2 - x0$4 * z2) * w2 + (w2 = x0$4 * y2 - y0$4 * x2) * w2), x0$4 * x2 + y0$4 * y2 + z0 * z2);
  W1 += w2;
  X1$1 += w2 * (x0$4 + (x0$4 = x2));
  Y1$1 += w2 * (y0$4 + (y0$4 = y2));
  Z1$1 += w2 * (z0 + (z0 = z2));
  centroidPointCartesian(x0$4, y0$4, z0);
}
function centroidLineEnd$1() {
  centroidStream$1.point = centroidPoint$1;
}
function centroidRingStart$1() {
  centroidStream$1.point = centroidRingPointFirst;
}
function centroidRingEnd$1() {
  centroidRingPoint(lambda00, phi00);
  centroidStream$1.point = centroidPoint$1;
}
function centroidRingPointFirst(lambda, phi) {
  lambda00 = lambda, phi00 = phi;
  lambda *= radians, phi *= radians;
  centroidStream$1.point = centroidRingPoint;
  var cosPhi = cos(phi);
  x0$4 = cosPhi * cos(lambda);
  y0$4 = cosPhi * sin(lambda);
  z0 = sin(phi);
  centroidPointCartesian(x0$4, y0$4, z0);
}
function centroidRingPoint(lambda, phi) {
  lambda *= radians, phi *= radians;
  var cosPhi = cos(phi), x2 = cosPhi * cos(lambda), y2 = cosPhi * sin(lambda), z2 = sin(phi), cx = y0$4 * z2 - z0 * y2, cy = z0 * x2 - x0$4 * z2, cz = x0$4 * y2 - y0$4 * x2, m = hypot(cx, cy, cz), w2 = asin(m), v = m && -w2 / m;
  X2$1.add(v * cx);
  Y2$1.add(v * cy);
  Z2$1.add(v * cz);
  W1 += w2;
  X1$1 += w2 * (x0$4 + (x0$4 = x2));
  Y1$1 += w2 * (y0$4 + (y0$4 = y2));
  Z1$1 += w2 * (z0 + (z0 = z2));
  centroidPointCartesian(x0$4, y0$4, z0);
}
function centroid(object2) {
  W0 = W1 = X0$1 = Y0$1 = Z0$1 = X1$1 = Y1$1 = Z1$1 = 0;
  X2$1 = new Adder();
  Y2$1 = new Adder();
  Z2$1 = new Adder();
  geoStream(object2, centroidStream$1);
  var x2 = +X2$1, y2 = +Y2$1, z2 = +Z2$1, m = hypot(x2, y2, z2);
  if (m < epsilon2$1) {
    x2 = X1$1, y2 = Y1$1, z2 = Z1$1;
    if (W1 < epsilon) x2 = X0$1, y2 = Y0$1, z2 = Z0$1;
    m = hypot(x2, y2, z2);
    if (m < epsilon2$1) return [NaN, NaN];
  }
  return [atan2(y2, x2) * degrees$1, asin(z2 / m) * degrees$1];
}
function constant$3(x2) {
  return function() {
    return x2;
  };
}
function compose(a, b2) {
  function compose2(x2, y2) {
    return x2 = a(x2, y2), b2(x2[0], x2[1]);
  }
  if (a.invert && b2.invert) compose2.invert = function(x2, y2) {
    return x2 = b2.invert(x2, y2), x2 && a.invert(x2[0], x2[1]);
  };
  return compose2;
}
function rotationIdentity(lambda, phi) {
  return [abs(lambda) > pi ? lambda + Math.round(-lambda / tau) * tau : lambda, phi];
}
rotationIdentity.invert = rotationIdentity;
function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= tau) ? deltaPhi || deltaGamma ? compose(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma)) : rotationLambda(deltaLambda) : deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma) : rotationIdentity;
}
function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > pi ? lambda - tau : lambda < -pi ? lambda + tau : lambda, phi];
  };
}
function rotationLambda(deltaLambda) {
  var rotation2 = forwardRotationLambda(deltaLambda);
  rotation2.invert = forwardRotationLambda(-deltaLambda);
  return rotation2;
}
function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = cos(deltaPhi), sinDeltaPhi = sin(deltaPhi), cosDeltaGamma = cos(deltaGamma), sinDeltaGamma = sin(deltaGamma);
  function rotation2(lambda, phi) {
    var cosPhi = cos(phi), x2 = cos(lambda) * cosPhi, y2 = sin(lambda) * cosPhi, z2 = sin(phi), k2 = z2 * cosDeltaPhi + x2 * sinDeltaPhi;
    return [
      atan2(y2 * cosDeltaGamma - k2 * sinDeltaGamma, x2 * cosDeltaPhi - z2 * sinDeltaPhi),
      asin(k2 * cosDeltaGamma + y2 * sinDeltaGamma)
    ];
  }
  rotation2.invert = function(lambda, phi) {
    var cosPhi = cos(phi), x2 = cos(lambda) * cosPhi, y2 = sin(lambda) * cosPhi, z2 = sin(phi), k2 = z2 * cosDeltaGamma - y2 * sinDeltaGamma;
    return [
      atan2(y2 * cosDeltaGamma + z2 * sinDeltaGamma, x2 * cosDeltaPhi + k2 * sinDeltaPhi),
      asin(k2 * cosDeltaPhi - x2 * sinDeltaPhi)
    ];
  };
  return rotation2;
}
function rotation(rotate) {
  rotate = rotateRadians(rotate[0] * radians, rotate[1] * radians, rotate.length > 2 ? rotate[2] * radians : 0);
  function forward(coordinates2) {
    coordinates2 = rotate(coordinates2[0] * radians, coordinates2[1] * radians);
    return coordinates2[0] *= degrees$1, coordinates2[1] *= degrees$1, coordinates2;
  }
  forward.invert = function(coordinates2) {
    coordinates2 = rotate.invert(coordinates2[0] * radians, coordinates2[1] * radians);
    return coordinates2[0] *= degrees$1, coordinates2[1] *= degrees$1, coordinates2;
  };
  return forward;
}
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = cos(radius), sinRadius = sin(radius), step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * tau;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = spherical([cosRadius, -sinRadius * cos(t), -sinRadius * sin(t)]);
    stream.point(point[0], point[1]);
  }
}
function circleRadius(cosRadius, point) {
  point = cartesian(point), point[0] -= cosRadius;
  cartesianNormalizeInPlace(point);
  var radius = acos(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + tau - epsilon) % tau;
}
function circle$1() {
  var center = constant$3([0, 0]), radius = constant$3(90), precision = constant$3(6), ring, rotate, stream = { point };
  function point(x2, y2) {
    ring.push(x2 = rotate(x2, y2));
    x2[0] *= degrees$1, x2[1] *= degrees$1;
  }
  function circle2() {
    var c = center.apply(this, arguments), r = radius.apply(this, arguments) * radians, p = precision.apply(this, arguments) * radians;
    ring = [];
    rotate = rotateRadians(-c[0] * radians, -c[1] * radians, 0).invert;
    circleStream(stream, r, p, 1);
    c = { type: "Polygon", coordinates: [ring] };
    ring = rotate = null;
    return c;
  }
  circle2.center = function(_2) {
    return arguments.length ? (center = typeof _2 === "function" ? _2 : constant$3([+_2[0], +_2[1]]), circle2) : center;
  };
  circle2.radius = function(_2) {
    return arguments.length ? (radius = typeof _2 === "function" ? _2 : constant$3(+_2), circle2) : radius;
  };
  circle2.precision = function(_2) {
    return arguments.length ? (precision = typeof _2 === "function" ? _2 : constant$3(+_2), circle2) : precision;
  };
  return circle2;
}
function clipBuffer() {
  var lines = [], line;
  return {
    point: function(x2, y2, m) {
      line.push([x2, y2, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: noop$1,
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}
function pointEqual(a, b2) {
  return abs(a[0] - b2[0]) < epsilon && abs(a[1] - b2[1]) < epsilon;
}
function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other;
  this.e = entry;
  this.v = false;
  this.n = this.p = null;
}
function clipRejoin(segments, compareIntersection2, startInside, interpolate2, stream) {
  var subject = [], clip2 = [], i, n;
  segments.forEach(function(segment) {
    if ((n2 = segment.length - 1) <= 0) return;
    var n2, p02 = segment[0], p1 = segment[n2], x2;
    if (pointEqual(p02, p1)) {
      if (!p02[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n2; ++i) stream.point((p02 = segment[i])[0], p02[1]);
        stream.lineEnd();
        return;
      }
      p1[0] += 2 * epsilon;
    }
    subject.push(x2 = new Intersection(p02, segment, null, true));
    clip2.push(x2.o = new Intersection(p02, null, x2, false));
    subject.push(x2 = new Intersection(p1, segment, null, false));
    clip2.push(x2.o = new Intersection(p1, null, x2, true));
  });
  if (!subject.length) return;
  clip2.sort(compareIntersection2);
  link(subject);
  link(clip2);
  for (i = 0, n = clip2.length; i < n; ++i) {
    clip2[i].e = startInside = !startInside;
  }
  var start2 = subject[0], points, point;
  while (1) {
    var current = start2, isSubject = true;
    while (current.v) if ((current = current.n) === start2) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate2(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate2(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}
function link(array2) {
  if (!(n = array2.length)) return;
  var n, i = 0, a = array2[0], b2;
  while (++i < n) {
    a.n = b2 = array2[i];
    b2.p = a;
    a = b2;
  }
  a.n = b2 = array2[0];
  b2.p = a;
}
function longitude(point) {
  if (abs(point[0]) <= pi)
    return point[0];
  else
    return sign(point[0]) * ((abs(point[0]) + pi) % tau - pi);
}
function polygonContains(polygon, point) {
  var lambda = longitude(point), phi = point[1], sinPhi = sin(phi), normal = [sin(lambda), -cos(lambda), 0], angle2 = 0, winding = 0;
  var sum = new Adder();
  if (sinPhi === 1) phi = halfPi + epsilon;
  else if (sinPhi === -1) phi = -halfPi - epsilon;
  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring, m, point0 = ring[m - 1], lambda02 = longitude(point0), phi02 = point0[1] / 2 + quarterPi, sinPhi02 = sin(phi02), cosPhi02 = cos(phi02);
    for (var j2 = 0; j2 < m; ++j2, lambda02 = lambda12, sinPhi02 = sinPhi1, cosPhi02 = cosPhi1, point0 = point1) {
      var point1 = ring[j2], lambda12 = longitude(point1), phi12 = point1[1] / 2 + quarterPi, sinPhi1 = sin(phi12), cosPhi1 = cos(phi12), delta = lambda12 - lambda02, sign2 = delta >= 0 ? 1 : -1, absDelta = sign2 * delta, antimeridian = absDelta > pi, k2 = sinPhi02 * sinPhi1;
      sum.add(atan2(k2 * sign2 * sin(absDelta), cosPhi02 * cosPhi1 + k2 * cos(absDelta)));
      angle2 += antimeridian ? delta + sign2 * tau : delta;
      if (antimeridian ^ lambda02 >= lambda ^ lambda12 >= lambda) {
        var arc = cartesianCross(cartesian(point0), cartesian(point1));
        cartesianNormalizeInPlace(arc);
        var intersection = cartesianCross(normal, arc);
        cartesianNormalizeInPlace(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * asin(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }
  return (angle2 < -epsilon || angle2 < epsilon && sum < -epsilon2$1) ^ winding & 1;
}
function clip(pointVisible, clipLine2, interpolate2, start2) {
  return function(sink) {
    var line = clipLine2(sink), ringBuffer = clipBuffer(), ringSink = clipLine2(ringBuffer), polygonStarted = false, polygon, segments, ring;
    var clip2 = {
      point,
      lineStart,
      lineEnd,
      polygonStart: function() {
        clip2.point = pointRing;
        clip2.lineStart = ringStart;
        clip2.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip2.point = point;
        clip2.lineStart = lineStart;
        clip2.lineEnd = lineEnd;
        segments = merge(segments);
        var startInside = polygonContains(polygon, start2);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          clipRejoin(segments, compareIntersection, startInside, interpolate2, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate2(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate2(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };
    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }
    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }
    function lineStart() {
      clip2.point = pointLine;
      line.lineStart();
    }
    function lineEnd() {
      clip2.point = point;
      line.lineEnd();
    }
    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }
    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }
    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();
      var clean = ringSink.clean(), ringSegments = ringBuffer.result(), i, n = ringSegments.length, m, segment, point2;
      ring.pop();
      polygon.push(ring);
      ring = null;
      if (!n) return;
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point2 = segment[i])[0], point2[1]);
          sink.lineEnd();
        }
        return;
      }
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));
      segments.push(ringSegments.filter(validSegment));
    }
    return clip2;
  };
}
function validSegment(segment) {
  return segment.length > 1;
}
function compareIntersection(a, b2) {
  return ((a = a.x)[0] < 0 ? a[1] - halfPi - epsilon : halfPi - a[1]) - ((b2 = b2.x)[0] < 0 ? b2[1] - halfPi - epsilon : halfPi - b2[1]);
}
const clipAntimeridian = clip(
  function() {
    return true;
  },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-pi, -halfPi]
);
function clipAntimeridianLine(stream) {
  var lambda02 = NaN, phi02 = NaN, sign0 = NaN, clean;
  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda12, phi12) {
      var sign1 = lambda12 > 0 ? pi : -pi, delta = abs(lambda12 - lambda02);
      if (abs(delta - pi) < epsilon) {
        stream.point(lambda02, phi02 = (phi02 + phi12) / 2 > 0 ? halfPi : -halfPi);
        stream.point(sign0, phi02);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi02);
        stream.point(lambda12, phi02);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= pi) {
        if (abs(lambda02 - sign0) < epsilon) lambda02 -= sign0 * epsilon;
        if (abs(lambda12 - sign1) < epsilon) lambda12 -= sign1 * epsilon;
        phi02 = clipAntimeridianIntersect(lambda02, phi02, lambda12, phi12);
        stream.point(sign0, phi02);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi02);
        clean = 0;
      }
      stream.point(lambda02 = lambda12, phi02 = phi12);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda02 = phi02 = NaN;
    },
    clean: function() {
      return 2 - clean;
    }
  };
}
function clipAntimeridianIntersect(lambda02, phi02, lambda12, phi12) {
  var cosPhi02, cosPhi1, sinLambda0Lambda1 = sin(lambda02 - lambda12);
  return abs(sinLambda0Lambda1) > epsilon ? atan((sin(phi02) * (cosPhi1 = cos(phi12)) * sin(lambda12) - sin(phi12) * (cosPhi02 = cos(phi02)) * sin(lambda02)) / (cosPhi02 * cosPhi1 * sinLambda0Lambda1)) : (phi02 + phi12) / 2;
}
function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * halfPi;
    stream.point(-pi, phi);
    stream.point(0, phi);
    stream.point(pi, phi);
    stream.point(pi, 0);
    stream.point(pi, -phi);
    stream.point(0, -phi);
    stream.point(-pi, -phi);
    stream.point(-pi, 0);
    stream.point(-pi, phi);
  } else if (abs(from[0] - to[0]) > epsilon) {
    var lambda = from[0] < to[0] ? pi : -pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}
function clipCircle(radius) {
  var cr = cos(radius), delta = 6 * radians, smallRadius = cr > 0, notHemisphere = abs(cr) > epsilon;
  function interpolate2(from, to, direction, stream) {
    circleStream(stream, radius, delta, direction, from, to);
  }
  function visible(lambda, phi) {
    return cos(lambda) * cos(phi) > cr;
  }
  function clipLine2(stream) {
    var point0, c0, v0, v00, clean;
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi], point2, v = visible(lambda, phi), c = smallRadius ? v ? 0 : code(lambda, phi) : v ? code(lambda + (lambda < 0 ? pi : -pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || pointEqual(point0, point2) || pointEqual(point1, point2))
            point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }
        if (v && (!point0 || !pointEqual(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | (v00 && v0) << 1;
      }
    };
  }
  function intersect(a, b2, two) {
    var pa = cartesian(a), pb = cartesian(b2);
    var n1 = [1, 0, 0], n2 = cartesianCross(pa, pb), n2n2 = cartesianDot(n2, n2), n1n2 = n2[0], determinant = n2n2 - n1n2 * n1n2;
    if (!determinant) return !two && a;
    var c1 = cr * n2n2 / determinant, c2 = -cr * n1n2 / determinant, n1xn2 = cartesianCross(n1, n2), A5 = cartesianScale(n1, c1), B2 = cartesianScale(n2, c2);
    cartesianAddInPlace(A5, B2);
    var u = n1xn2, w2 = cartesianDot(A5, u), uu = cartesianDot(u, u), t2 = w2 * w2 - uu * (cartesianDot(A5, A5) - 1);
    if (t2 < 0) return;
    var t = sqrt(t2), q2 = cartesianScale(u, (-w2 - t) / uu);
    cartesianAddInPlace(q2, A5);
    q2 = spherical(q2);
    if (!two) return q2;
    var lambda02 = a[0], lambda12 = b2[0], phi02 = a[1], phi12 = b2[1], z2;
    if (lambda12 < lambda02) z2 = lambda02, lambda02 = lambda12, lambda12 = z2;
    var delta2 = lambda12 - lambda02, polar = abs(delta2 - pi) < epsilon, meridian = polar || delta2 < epsilon;
    if (!polar && phi12 < phi02) z2 = phi02, phi02 = phi12, phi12 = z2;
    if (meridian ? polar ? phi02 + phi12 > 0 ^ q2[1] < (abs(q2[0] - lambda02) < epsilon ? phi02 : phi12) : phi02 <= q2[1] && q2[1] <= phi12 : delta2 > pi ^ (lambda02 <= q2[0] && q2[0] <= lambda12)) {
      var q1 = cartesianScale(u, (-w2 + t) / uu);
      cartesianAddInPlace(q1, A5);
      return [q2, spherical(q1)];
    }
  }
  function code(lambda, phi) {
    var r = smallRadius ? radius : pi - radius, code2 = 0;
    if (lambda < -r) code2 |= 1;
    else if (lambda > r) code2 |= 2;
    if (phi < -r) code2 |= 4;
    else if (phi > r) code2 |= 8;
    return code2;
  }
  return clip(visible, clipLine2, interpolate2, smallRadius ? [0, -radius] : [-pi, radius - pi]);
}
function clipLine(a, b2, x02, y02, x12, y12) {
  var ax = a[0], ay = a[1], bx = b2[0], by = b2[1], t0 = 0, t1 = 1, dx = bx - ax, dy = by - ay, r;
  r = x02 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }
  r = x12 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }
  r = y02 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }
  r = y12 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }
  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b2[0] = ax + t1 * dx, b2[1] = ay + t1 * dy;
  return true;
}
var clipMax = 1e9, clipMin = -clipMax;
function clipRectangle(x02, y02, x12, y12) {
  function visible(x2, y2) {
    return x02 <= x2 && x2 <= x12 && y02 <= y2 && y2 <= y12;
  }
  function interpolate2(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null || (a = corner(from, direction)) !== (a1 = corner(to, direction)) || comparePoint(from, to) < 0 ^ direction > 0) {
      do
        stream.point(a === 0 || a === 3 ? x02 : x12, a > 1 ? y12 : y02);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }
  function corner(p, direction) {
    return abs(p[0] - x02) < epsilon ? direction > 0 ? 0 : 3 : abs(p[0] - x12) < epsilon ? direction > 0 ? 2 : 1 : abs(p[1] - y02) < epsilon ? direction > 0 ? 1 : 0 : direction > 0 ? 3 : 2;
  }
  function compareIntersection2(a, b2) {
    return comparePoint(a.x, b2.x);
  }
  function comparePoint(a, b2) {
    var ca = corner(a, 1), cb = corner(b2, 1);
    return ca !== cb ? ca - cb : ca === 0 ? b2[1] - a[1] : ca === 1 ? a[0] - b2[0] : ca === 2 ? a[1] - b2[1] : b2[0] - a[0];
  }
  return function(stream) {
    var activeStream = stream, bufferStream = clipBuffer(), segments, polygon, ring, x__, y__, v__, x_, y_, v_, first, clean;
    var clipStream = {
      point,
      lineStart,
      lineEnd,
      polygonStart,
      polygonEnd
    };
    function point(x2, y2) {
      if (visible(x2, y2)) activeStream.point(x2, y2);
    }
    function polygonInside() {
      var winding = 0;
      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring2 = polygon[i], j2 = 1, m = ring2.length, point2 = ring2[0], a0, a1, b0 = point2[0], b1 = point2[1]; j2 < m; ++j2) {
          a0 = b0, a1 = b1, point2 = ring2[j2], b0 = point2[0], b1 = point2[1];
          if (a1 <= y12) {
            if (b1 > y12 && (b0 - a0) * (y12 - a1) > (b1 - a1) * (x02 - a0)) ++winding;
          } else {
            if (b1 <= y12 && (b0 - a0) * (y12 - a1) < (b1 - a1) * (x02 - a0)) --winding;
          }
        }
      }
      return winding;
    }
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }
    function polygonEnd() {
      var startInside = polygonInside(), cleanInside = clean && startInside, visible2 = (segments = merge(segments)).length;
      if (cleanInside || visible2) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate2(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible2) {
          clipRejoin(segments, compareIntersection2, startInside, interpolate2, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }
    function lineStart() {
      clipStream.point = linePoint2;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }
    function lineEnd() {
      if (segments) {
        linePoint2(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }
    function linePoint2(x2, y2) {
      var v = visible(x2, y2);
      if (polygon) ring.push([x2, y2]);
      if (first) {
        x__ = x2, y__ = y2, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x2, y2);
        }
      } else {
        if (v && v_) activeStream.point(x2, y2);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))], b2 = [x2 = Math.max(clipMin, Math.min(clipMax, x2)), y2 = Math.max(clipMin, Math.min(clipMax, y2))];
          if (clipLine(a, b2, x02, y02, x12, y12)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b2[0], b2[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x2, y2);
            clean = false;
          }
        }
      }
      x_ = x2, y_ = y2, v_ = v;
    }
    return clipStream;
  };
}
function extent() {
  var x02 = 0, y02 = 0, x12 = 960, y12 = 500, cache, cacheStream, clip2;
  return clip2 = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = clipRectangle(x02, y02, x12, y12)(cacheStream = stream);
    },
    extent: function(_2) {
      return arguments.length ? (x02 = +_2[0][0], y02 = +_2[0][1], x12 = +_2[1][0], y12 = +_2[1][1], cache = cacheStream = null, clip2) : [[x02, y02], [x12, y12]];
    }
  };
}
var lengthSum$1, lambda0, sinPhi0, cosPhi0;
var lengthStream$1 = {
  sphere: noop$1,
  point: noop$1,
  lineStart: lengthLineStart,
  lineEnd: noop$1,
  polygonStart: noop$1,
  polygonEnd: noop$1
};
function lengthLineStart() {
  lengthStream$1.point = lengthPointFirst$1;
  lengthStream$1.lineEnd = lengthLineEnd;
}
function lengthLineEnd() {
  lengthStream$1.point = lengthStream$1.lineEnd = noop$1;
}
function lengthPointFirst$1(lambda, phi) {
  lambda *= radians, phi *= radians;
  lambda0 = lambda, sinPhi0 = sin(phi), cosPhi0 = cos(phi);
  lengthStream$1.point = lengthPoint$1;
}
function lengthPoint$1(lambda, phi) {
  lambda *= radians, phi *= radians;
  var sinPhi = sin(phi), cosPhi = cos(phi), delta = abs(lambda - lambda0), cosDelta = cos(delta), sinDelta = sin(delta), x2 = cosPhi * sinDelta, y2 = cosPhi0 * sinPhi - sinPhi0 * cosPhi * cosDelta, z2 = sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosDelta;
  lengthSum$1.add(atan2(sqrt(x2 * x2 + y2 * y2), z2));
  lambda0 = lambda, sinPhi0 = sinPhi, cosPhi0 = cosPhi;
}
function length(object2) {
  lengthSum$1 = new Adder();
  geoStream(object2, lengthStream$1);
  return +lengthSum$1;
}
var coordinates = [null, null], object$1 = { type: "LineString", coordinates };
function distance(a, b2) {
  coordinates[0] = a;
  coordinates[1] = b2;
  return length(object$1);
}
var containsObjectType = {
  Feature: function(object2, point) {
    return containsGeometry(object2.geometry, point);
  },
  FeatureCollection: function(object2, point) {
    var features = object2.features, i = -1, n = features.length;
    while (++i < n) if (containsGeometry(features[i].geometry, point)) return true;
    return false;
  }
};
var containsGeometryType = {
  Sphere: function() {
    return true;
  },
  Point: function(object2, point) {
    return containsPoint(object2.coordinates, point);
  },
  MultiPoint: function(object2, point) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) if (containsPoint(coordinates2[i], point)) return true;
    return false;
  },
  LineString: function(object2, point) {
    return containsLine(object2.coordinates, point);
  },
  MultiLineString: function(object2, point) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) if (containsLine(coordinates2[i], point)) return true;
    return false;
  },
  Polygon: function(object2, point) {
    return containsPolygon(object2.coordinates, point);
  },
  MultiPolygon: function(object2, point) {
    var coordinates2 = object2.coordinates, i = -1, n = coordinates2.length;
    while (++i < n) if (containsPolygon(coordinates2[i], point)) return true;
    return false;
  },
  GeometryCollection: function(object2, point) {
    var geometries = object2.geometries, i = -1, n = geometries.length;
    while (++i < n) if (containsGeometry(geometries[i], point)) return true;
    return false;
  }
};
function containsGeometry(geometry, point) {
  return geometry && containsGeometryType.hasOwnProperty(geometry.type) ? containsGeometryType[geometry.type](geometry, point) : false;
}
function containsPoint(coordinates2, point) {
  return distance(coordinates2, point) === 0;
}
function containsLine(coordinates2, point) {
  var ao, bo, ab;
  for (var i = 0, n = coordinates2.length; i < n; i++) {
    bo = distance(coordinates2[i], point);
    if (bo === 0) return true;
    if (i > 0) {
      ab = distance(coordinates2[i], coordinates2[i - 1]);
      if (ab > 0 && ao <= ab && bo <= ab && (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < epsilon2$1 * ab)
        return true;
    }
    ao = bo;
  }
  return false;
}
function containsPolygon(coordinates2, point) {
  return !!polygonContains(coordinates2.map(ringRadians), pointRadians(point));
}
function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}
function pointRadians(point) {
  return [point[0] * radians, point[1] * radians];
}
function contains(object2, point) {
  return (object2 && containsObjectType.hasOwnProperty(object2.type) ? containsObjectType[object2.type] : containsGeometry)(object2, point);
}
function graticuleX(y02, y12, dy) {
  var y2 = range$1(y02, y12 - epsilon, dy).concat(y12);
  return function(x2) {
    return y2.map(function(y3) {
      return [x2, y3];
    });
  };
}
function graticuleY(x02, x12, dx) {
  var x2 = range$1(x02, x12 - epsilon, dx).concat(x12);
  return function(y2) {
    return x2.map(function(x3) {
      return [x3, y2];
    });
  };
}
function graticule() {
  var x12, x02, X12, X02, y12, y02, Y12, Y02, dx = 10, dy = dx, DX = 90, DY = 360, x2, y2, X3, Y3, precision = 2.5;
  function graticule2() {
    return { type: "MultiLineString", coordinates: lines() };
  }
  function lines() {
    return range$1(ceil(X02 / DX) * DX, X12, DX).map(X3).concat(range$1(ceil(Y02 / DY) * DY, Y12, DY).map(Y3)).concat(range$1(ceil(x02 / dx) * dx, x12, dx).filter(function(x3) {
      return abs(x3 % DX) > epsilon;
    }).map(x2)).concat(range$1(ceil(y02 / dy) * dy, y12, dy).filter(function(y3) {
      return abs(y3 % DY) > epsilon;
    }).map(y2));
  }
  graticule2.lines = function() {
    return lines().map(function(coordinates2) {
      return { type: "LineString", coordinates: coordinates2 };
    });
  };
  graticule2.outline = function() {
    return {
      type: "Polygon",
      coordinates: [
        X3(X02).concat(
          Y3(Y12).slice(1),
          X3(X12).reverse().slice(1),
          Y3(Y02).reverse().slice(1)
        )
      ]
    };
  };
  graticule2.extent = function(_2) {
    if (!arguments.length) return graticule2.extentMinor();
    return graticule2.extentMajor(_2).extentMinor(_2);
  };
  graticule2.extentMajor = function(_2) {
    if (!arguments.length) return [[X02, Y02], [X12, Y12]];
    X02 = +_2[0][0], X12 = +_2[1][0];
    Y02 = +_2[0][1], Y12 = +_2[1][1];
    if (X02 > X12) _2 = X02, X02 = X12, X12 = _2;
    if (Y02 > Y12) _2 = Y02, Y02 = Y12, Y12 = _2;
    return graticule2.precision(precision);
  };
  graticule2.extentMinor = function(_2) {
    if (!arguments.length) return [[x02, y02], [x12, y12]];
    x02 = +_2[0][0], x12 = +_2[1][0];
    y02 = +_2[0][1], y12 = +_2[1][1];
    if (x02 > x12) _2 = x02, x02 = x12, x12 = _2;
    if (y02 > y12) _2 = y02, y02 = y12, y12 = _2;
    return graticule2.precision(precision);
  };
  graticule2.step = function(_2) {
    if (!arguments.length) return graticule2.stepMinor();
    return graticule2.stepMajor(_2).stepMinor(_2);
  };
  graticule2.stepMajor = function(_2) {
    if (!arguments.length) return [DX, DY];
    DX = +_2[0], DY = +_2[1];
    return graticule2;
  };
  graticule2.stepMinor = function(_2) {
    if (!arguments.length) return [dx, dy];
    dx = +_2[0], dy = +_2[1];
    return graticule2;
  };
  graticule2.precision = function(_2) {
    if (!arguments.length) return precision;
    precision = +_2;
    x2 = graticuleX(y02, y12, 90);
    y2 = graticuleY(x02, x12, precision);
    X3 = graticuleX(Y02, Y12, 90);
    Y3 = graticuleY(X02, X12, precision);
    return graticule2;
  };
  return graticule2.extentMajor([[-180, -90 + epsilon], [180, 90 - epsilon]]).extentMinor([[-180, -80 - epsilon], [180, 80 + epsilon]]);
}
function graticule10() {
  return graticule()();
}
function interpolate$1(a, b2) {
  var x02 = a[0] * radians, y02 = a[1] * radians, x12 = b2[0] * radians, y12 = b2[1] * radians, cy0 = cos(y02), sy0 = sin(y02), cy1 = cos(y12), sy1 = sin(y12), kx0 = cy0 * cos(x02), ky0 = cy0 * sin(x02), kx1 = cy1 * cos(x12), ky1 = cy1 * sin(x12), d = 2 * asin(sqrt(haversin(y12 - y02) + cy0 * cy1 * haversin(x12 - x02))), k2 = sin(d);
  var interpolate2 = d ? function(t) {
    var B2 = sin(t *= d) / k2, A5 = sin(d - t) / k2, x2 = A5 * kx0 + B2 * kx1, y2 = A5 * ky0 + B2 * ky1, z2 = A5 * sy0 + B2 * sy1;
    return [
      atan2(y2, x2) * degrees$1,
      atan2(z2, sqrt(x2 * x2 + y2 * y2)) * degrees$1
    ];
  } : function() {
    return [x02 * degrees$1, y02 * degrees$1];
  };
  interpolate2.distance = d;
  return interpolate2;
}
const identity$4 = (x2) => x2;
var areaSum = new Adder(), areaRingSum = new Adder(), x00$2, y00$2, x0$3, y0$3;
var areaStream = {
  point: noop$1,
  lineStart: noop$1,
  lineEnd: noop$1,
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = noop$1;
    areaSum.add(abs(areaRingSum));
    areaRingSum = new Adder();
  },
  result: function() {
    var area2 = areaSum / 2;
    areaSum = new Adder();
    return area2;
  }
};
function areaRingStart() {
  areaStream.point = areaPointFirst;
}
function areaPointFirst(x2, y2) {
  areaStream.point = areaPoint;
  x00$2 = x0$3 = x2, y00$2 = y0$3 = y2;
}
function areaPoint(x2, y2) {
  areaRingSum.add(y0$3 * x2 - x0$3 * y2);
  x0$3 = x2, y0$3 = y2;
}
function areaRingEnd() {
  areaPoint(x00$2, y00$2);
}
var x0$2 = Infinity, y0$2 = x0$2, x1 = -x0$2, y1 = x1;
var boundsStream = {
  point: boundsPoint,
  lineStart: noop$1,
  lineEnd: noop$1,
  polygonStart: noop$1,
  polygonEnd: noop$1,
  result: function() {
    var bounds2 = [[x0$2, y0$2], [x1, y1]];
    x1 = y1 = -(y0$2 = x0$2 = Infinity);
    return bounds2;
  }
};
function boundsPoint(x2, y2) {
  if (x2 < x0$2) x0$2 = x2;
  if (x2 > x1) x1 = x2;
  if (y2 < y0$2) y0$2 = y2;
  if (y2 > y1) y1 = y2;
}
var X0 = 0, Y0 = 0, Z0 = 0, X1 = 0, Y1 = 0, Z1 = 0, X2 = 0, Y2 = 0, Z2 = 0, x00$1, y00$1, x0$1, y0$1;
var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid2 = Z2 ? [X2 / Z2, Y2 / Z2] : Z1 ? [X1 / Z1, Y1 / Z1] : Z0 ? [X0 / Z0, Y0 / Z0] : [NaN, NaN];
    X0 = Y0 = Z0 = X1 = Y1 = Z1 = X2 = Y2 = Z2 = 0;
    return centroid2;
  }
};
function centroidPoint(x2, y2) {
  X0 += x2;
  Y0 += y2;
  ++Z0;
}
function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}
function centroidPointFirstLine(x2, y2) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0$1 = x2, y0$1 = y2);
}
function centroidPointLine(x2, y2) {
  var dx = x2 - x0$1, dy = y2 - y0$1, z2 = sqrt(dx * dx + dy * dy);
  X1 += z2 * (x0$1 + x2) / 2;
  Y1 += z2 * (y0$1 + y2) / 2;
  Z1 += z2;
  centroidPoint(x0$1 = x2, y0$1 = y2);
}
function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}
function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}
function centroidRingEnd() {
  centroidPointRing(x00$1, y00$1);
}
function centroidPointFirstRing(x2, y2) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00$1 = x0$1 = x2, y00$1 = y0$1 = y2);
}
function centroidPointRing(x2, y2) {
  var dx = x2 - x0$1, dy = y2 - y0$1, z2 = sqrt(dx * dx + dy * dy);
  X1 += z2 * (x0$1 + x2) / 2;
  Y1 += z2 * (y0$1 + y2) / 2;
  Z1 += z2;
  z2 = y0$1 * x2 - x0$1 * y2;
  X2 += z2 * (x0$1 + x2);
  Y2 += z2 * (y0$1 + y2);
  Z2 += z2 * 3;
  centroidPoint(x0$1 = x2, y0$1 = y2);
}
function PathContext(context) {
  this._context = context;
}
PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_2) {
    return this._radius = _2, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x2, y2) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x2, y2);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x2, y2);
        break;
      }
      default: {
        this._context.moveTo(x2 + this._radius, y2);
        this._context.arc(x2, y2, this._radius, 0, tau);
        break;
      }
    }
  },
  result: noop$1
};
var lengthSum = new Adder(), lengthRing, x00, y00, x0, y0;
var lengthStream = {
  point: noop$1,
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x00, y00);
    lengthStream.point = noop$1;
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length2 = +lengthSum;
    lengthSum = new Adder();
    return length2;
  }
};
function lengthPointFirst(x2, y2) {
  lengthStream.point = lengthPoint;
  x00 = x0 = x2, y00 = y0 = y2;
}
function lengthPoint(x2, y2) {
  x0 -= x2, y0 -= y2;
  lengthSum.add(sqrt(x0 * x0 + y0 * y0));
  x0 = x2, y0 = y2;
}
function PathString() {
  this._string = [];
}
PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_2) {
    if ((_2 = +_2) !== this._radius) this._radius = _2, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x2, y2) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x2, ",", y2);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x2, ",", y2);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x2, ",", y2, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};
function circle(radius) {
  return "m0," + radius + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius + "z";
}
function index(projection2, context) {
  var pointRadius = 4.5, projectionStream, contextStream;
  function path(object2) {
    if (object2) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      geoStream(object2, projectionStream(contextStream));
    }
    return contextStream.result();
  }
  path.area = function(object2) {
    geoStream(object2, projectionStream(areaStream));
    return areaStream.result();
  };
  path.measure = function(object2) {
    geoStream(object2, projectionStream(lengthStream));
    return lengthStream.result();
  };
  path.bounds = function(object2) {
    geoStream(object2, projectionStream(boundsStream));
    return boundsStream.result();
  };
  path.centroid = function(object2) {
    geoStream(object2, projectionStream(centroidStream));
    return centroidStream.result();
  };
  path.projection = function(_2) {
    return arguments.length ? (projectionStream = _2 == null ? (projection2 = null, identity$4) : (projection2 = _2).stream, path) : projection2;
  };
  path.context = function(_2) {
    if (!arguments.length) return context;
    contextStream = _2 == null ? (context = null, new PathString()) : new PathContext(context = _2);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };
  path.pointRadius = function(_2) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _2 === "function" ? _2 : (contextStream.pointRadius(+_2), +_2);
    return path;
  };
  return path.projection(projection2).context(context);
}
function transform$1(methods) {
  return {
    stream: transformer(methods)
  };
}
function transformer(methods) {
  return function(stream) {
    var s = new TransformStream();
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}
function TransformStream() {
}
TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x2, y2) {
    this.stream.point(x2, y2);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};
function fit(projection2, fitBounds, object2) {
  var clip2 = projection2.clipExtent && projection2.clipExtent();
  projection2.scale(150).translate([0, 0]);
  if (clip2 != null) projection2.clipExtent(null);
  geoStream(object2, projection2.stream(boundsStream));
  fitBounds(boundsStream.result());
  if (clip2 != null) projection2.clipExtent(clip2);
  return projection2;
}
function fitExtent(projection2, extent2, object2) {
  return fit(projection2, function(b2) {
    var w2 = extent2[1][0] - extent2[0][0], h = extent2[1][1] - extent2[0][1], k2 = Math.min(w2 / (b2[1][0] - b2[0][0]), h / (b2[1][1] - b2[0][1])), x2 = +extent2[0][0] + (w2 - k2 * (b2[1][0] + b2[0][0])) / 2, y2 = +extent2[0][1] + (h - k2 * (b2[1][1] + b2[0][1])) / 2;
    projection2.scale(150 * k2).translate([x2, y2]);
  }, object2);
}
function fitSize(projection2, size, object2) {
  return fitExtent(projection2, [[0, 0], size], object2);
}
function fitWidth(projection2, width, object2) {
  return fit(projection2, function(b2) {
    var w2 = +width, k2 = w2 / (b2[1][0] - b2[0][0]), x2 = (w2 - k2 * (b2[1][0] + b2[0][0])) / 2, y2 = -k2 * b2[0][1];
    projection2.scale(150 * k2).translate([x2, y2]);
  }, object2);
}
function fitHeight(projection2, height, object2) {
  return fit(projection2, function(b2) {
    var h = +height, k2 = h / (b2[1][1] - b2[0][1]), x2 = -k2 * b2[0][0], y2 = (h - k2 * (b2[1][1] + b2[0][1])) / 2;
    projection2.scale(150 * k2).translate([x2, y2]);
  }, object2);
}
var maxDepth = 16, cosMinDistance = cos(30 * radians);
function resample(project, delta2) {
  return +delta2 ? resample$1(project, delta2) : resampleNone(project);
}
function resampleNone(project) {
  return transformer({
    point: function(x2, y2) {
      x2 = project(x2, y2);
      this.stream.point(x2[0], x2[1]);
    }
  });
}
function resample$1(project, delta2) {
  function resampleLineTo(x02, y02, lambda02, a0, b0, c0, x12, y12, lambda12, a1, b1, c1, depth, stream) {
    var dx = x12 - x02, dy = y12 - y02, d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1, b2 = b0 + b1, c = c0 + c1, m = sqrt(a * a + b2 * b2 + c * c), phi2 = asin(c /= m), lambda22 = abs(abs(c) - 1) < epsilon || abs(lambda02 - lambda12) < epsilon ? (lambda02 + lambda12) / 2 : atan2(b2, a), p = project(lambda22, phi2), x2 = p[0], y2 = p[1], dx2 = x2 - x02, dy2 = y2 - y02, dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 || abs((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) {
        resampleLineTo(x02, y02, lambda02, a0, b0, c0, x2, y2, lambda22, a /= m, b2 /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda22, a, b2, c, x12, y12, lambda12, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda002, x002, y002, a00, b00, c00, lambda02, x02, y02, a0, b0, c0;
    var resampleStream = {
      point,
      lineStart,
      lineEnd,
      polygonStart: function() {
        stream.polygonStart();
        resampleStream.lineStart = ringStart;
      },
      polygonEnd: function() {
        stream.polygonEnd();
        resampleStream.lineStart = lineStart;
      }
    };
    function point(x2, y2) {
      x2 = project(x2, y2);
      stream.point(x2[0], x2[1]);
    }
    function lineStart() {
      x02 = NaN;
      resampleStream.point = linePoint2;
      stream.lineStart();
    }
    function linePoint2(lambda, phi) {
      var c = cartesian([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x02, y02, lambda02, a0, b0, c0, x02 = p[0], y02 = p[1], lambda02 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x02, y02);
    }
    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }
    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }
    function ringPoint(lambda, phi) {
      linePoint2(lambda002 = lambda, phi), x002 = x02, y002 = y02, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint2;
    }
    function ringEnd() {
      resampleLineTo(x02, y02, lambda02, a0, b0, c0, x002, y002, lambda002, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }
    return resampleStream;
  };
}
var transformRadians = transformer({
  point: function(x2, y2) {
    this.stream.point(x2 * radians, y2 * radians);
  }
});
function transformRotate(rotate) {
  return transformer({
    point: function(x2, y2) {
      var r = rotate(x2, y2);
      return this.stream.point(r[0], r[1]);
    }
  });
}
function scaleTranslate(k2, dx, dy, sx, sy) {
  function transform2(x2, y2) {
    x2 *= sx;
    y2 *= sy;
    return [dx + k2 * x2, dy - k2 * y2];
  }
  transform2.invert = function(x2, y2) {
    return [(x2 - dx) / k2 * sx, (dy - y2) / k2 * sy];
  };
  return transform2;
}
function scaleTranslateRotate(k2, dx, dy, sx, sy, alpha) {
  if (!alpha) return scaleTranslate(k2, dx, dy, sx, sy);
  var cosAlpha = cos(alpha), sinAlpha = sin(alpha), a = cosAlpha * k2, b2 = sinAlpha * k2, ai = cosAlpha / k2, bi = sinAlpha / k2, ci = (sinAlpha * dy - cosAlpha * dx) / k2, fi = (sinAlpha * dx + cosAlpha * dy) / k2;
  function transform2(x2, y2) {
    x2 *= sx;
    y2 *= sy;
    return [a * x2 - b2 * y2 + dx, dy - b2 * x2 - a * y2];
  }
  transform2.invert = function(x2, y2) {
    return [sx * (ai * x2 - bi * y2 + ci), sy * (fi - bi * x2 - ai * y2)];
  };
  return transform2;
}
function projection(project) {
  return projectionMutator(function() {
    return project;
  })();
}
function projectionMutator(projectAt) {
  var project, k2 = 150, x2 = 480, y2 = 250, lambda = 0, phi = 0, deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, alpha = 0, sx = 1, sy = 1, theta = null, preclip = clipAntimeridian, x02 = null, y02, x12, y12, postclip = identity$4, delta2 = 0.5, projectResample, projectTransform, projectRotateTransform, cache, cacheStream;
  function projection2(point) {
    return projectRotateTransform(point[0] * radians, point[1] * radians);
  }
  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * degrees$1, point[1] * degrees$1];
  }
  projection2.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };
  projection2.preclip = function(_2) {
    return arguments.length ? (preclip = _2, theta = void 0, reset()) : preclip;
  };
  projection2.postclip = function(_2) {
    return arguments.length ? (postclip = _2, x02 = y02 = x12 = y12 = null, reset()) : postclip;
  };
  projection2.clipAngle = function(_2) {
    return arguments.length ? (preclip = +_2 ? clipCircle(theta = _2 * radians) : (theta = null, clipAntimeridian), reset()) : theta * degrees$1;
  };
  projection2.clipExtent = function(_2) {
    return arguments.length ? (postclip = _2 == null ? (x02 = y02 = x12 = y12 = null, identity$4) : clipRectangle(x02 = +_2[0][0], y02 = +_2[0][1], x12 = +_2[1][0], y12 = +_2[1][1]), reset()) : x02 == null ? null : [[x02, y02], [x12, y12]];
  };
  projection2.scale = function(_2) {
    return arguments.length ? (k2 = +_2, recenter()) : k2;
  };
  projection2.translate = function(_2) {
    return arguments.length ? (x2 = +_2[0], y2 = +_2[1], recenter()) : [x2, y2];
  };
  projection2.center = function(_2) {
    return arguments.length ? (lambda = _2[0] % 360 * radians, phi = _2[1] % 360 * radians, recenter()) : [lambda * degrees$1, phi * degrees$1];
  };
  projection2.rotate = function(_2) {
    return arguments.length ? (deltaLambda = _2[0] % 360 * radians, deltaPhi = _2[1] % 360 * radians, deltaGamma = _2.length > 2 ? _2[2] % 360 * radians : 0, recenter()) : [deltaLambda * degrees$1, deltaPhi * degrees$1, deltaGamma * degrees$1];
  };
  projection2.angle = function(_2) {
    return arguments.length ? (alpha = _2 % 360 * radians, recenter()) : alpha * degrees$1;
  };
  projection2.reflectX = function(_2) {
    return arguments.length ? (sx = _2 ? -1 : 1, recenter()) : sx < 0;
  };
  projection2.reflectY = function(_2) {
    return arguments.length ? (sy = _2 ? -1 : 1, recenter()) : sy < 0;
  };
  projection2.precision = function(_2) {
    return arguments.length ? (projectResample = resample(projectTransform, delta2 = _2 * _2), reset()) : sqrt(delta2);
  };
  projection2.fitExtent = function(extent2, object2) {
    return fitExtent(projection2, extent2, object2);
  };
  projection2.fitSize = function(size, object2) {
    return fitSize(projection2, size, object2);
  };
  projection2.fitWidth = function(width, object2) {
    return fitWidth(projection2, width, object2);
  };
  projection2.fitHeight = function(height, object2) {
    return fitHeight(projection2, height, object2);
  };
  function recenter() {
    var center = scaleTranslateRotate(k2, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)), transform2 = scaleTranslateRotate(k2, x2 - center[0], y2 - center[1], sx, sy, alpha);
    rotate = rotateRadians(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = compose(project, transform2);
    projectRotateTransform = compose(rotate, projectTransform);
    projectResample = resample(projectTransform, delta2);
    return reset();
  }
  function reset() {
    cache = cacheStream = null;
    return projection2;
  }
  return function() {
    project = projectAt.apply(this, arguments);
    projection2.invert = project.invert && invert;
    return recenter();
  };
}
function conicProjection(projectAt) {
  var phi02 = 0, phi12 = pi / 3, m = projectionMutator(projectAt), p = m(phi02, phi12);
  p.parallels = function(_2) {
    return arguments.length ? m(phi02 = _2[0] * radians, phi12 = _2[1] * radians) : [phi02 * degrees$1, phi12 * degrees$1];
  };
  return p;
}
function cylindricalEqualAreaRaw(phi02) {
  var cosPhi02 = cos(phi02);
  function forward(lambda, phi) {
    return [lambda * cosPhi02, sin(phi) / cosPhi02];
  }
  forward.invert = function(x2, y2) {
    return [x2 / cosPhi02, asin(y2 * cosPhi02)];
  };
  return forward;
}
function conicEqualAreaRaw(y02, y12) {
  var sy0 = sin(y02), n = (sy0 + sin(y12)) / 2;
  if (abs(n) < epsilon) return cylindricalEqualAreaRaw(y02);
  var c = 1 + sy0 * (2 * n - sy0), r0 = sqrt(c) / n;
  function project(x2, y2) {
    var r = sqrt(c - 2 * n * sin(y2)) / n;
    return [r * sin(x2 *= n), r0 - r * cos(x2)];
  }
  project.invert = function(x2, y2) {
    var r0y = r0 - y2, l = atan2(x2, abs(r0y)) * sign(r0y);
    if (r0y * n < 0)
      l -= pi * sign(x2) * sign(r0y);
    return [l / n, asin((c - (x2 * x2 + r0y * r0y) * n * n) / (2 * n))];
  };
  return project;
}
function conicEqualArea() {
  return conicProjection(conicEqualAreaRaw).scale(155.424).center([0, 33.6442]);
}
function albers() {
  return conicEqualArea().parallels([29.5, 45.5]).scale(1070).translate([480, 250]).rotate([96, 0]).center([-0.6, 38.7]);
}
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function(x2, y2) {
      var i = -1;
      while (++i < n) streams[i].point(x2, y2);
    },
    sphere: function() {
      var i = -1;
      while (++i < n) streams[i].sphere();
    },
    lineStart: function() {
      var i = -1;
      while (++i < n) streams[i].lineStart();
    },
    lineEnd: function() {
      var i = -1;
      while (++i < n) streams[i].lineEnd();
    },
    polygonStart: function() {
      var i = -1;
      while (++i < n) streams[i].polygonStart();
    },
    polygonEnd: function() {
      var i = -1;
      while (++i < n) streams[i].polygonEnd();
    }
  };
}
function albersUsa() {
  var cache, cacheStream, lower48 = albers(), lower48Point, alaska = conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, hawaii = conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, point, pointStream = { point: function(x2, y2) {
    point = [x2, y2];
  } };
  function albersUsa2(coordinates2) {
    var x2 = coordinates2[0], y2 = coordinates2[1];
    return point = null, (lower48Point.point(x2, y2), point) || (alaskaPoint.point(x2, y2), point) || (hawaiiPoint.point(x2, y2), point);
  }
  albersUsa2.invert = function(coordinates2) {
    var k2 = lower48.scale(), t = lower48.translate(), x2 = (coordinates2[0] - t[0]) / k2, y2 = (coordinates2[1] - t[1]) / k2;
    return (y2 >= 0.12 && y2 < 0.234 && x2 >= -0.425 && x2 < -0.214 ? alaska : y2 >= 0.166 && y2 < 0.234 && x2 >= -0.214 && x2 < -0.115 ? hawaii : lower48).invert(coordinates2);
  };
  albersUsa2.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };
  albersUsa2.precision = function(_2) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_2), alaska.precision(_2), hawaii.precision(_2);
    return reset();
  };
  albersUsa2.scale = function(_2) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_2), alaska.scale(_2 * 0.35), hawaii.scale(_2);
    return albersUsa2.translate(lower48.translate());
  };
  albersUsa2.translate = function(_2) {
    if (!arguments.length) return lower48.translate();
    var k2 = lower48.scale(), x2 = +_2[0], y2 = +_2[1];
    lower48Point = lower48.translate(_2).clipExtent([[x2 - 0.455 * k2, y2 - 0.238 * k2], [x2 + 0.455 * k2, y2 + 0.238 * k2]]).stream(pointStream);
    alaskaPoint = alaska.translate([x2 - 0.307 * k2, y2 + 0.201 * k2]).clipExtent([[x2 - 0.425 * k2 + epsilon, y2 + 0.12 * k2 + epsilon], [x2 - 0.214 * k2 - epsilon, y2 + 0.234 * k2 - epsilon]]).stream(pointStream);
    hawaiiPoint = hawaii.translate([x2 - 0.205 * k2, y2 + 0.212 * k2]).clipExtent([[x2 - 0.214 * k2 + epsilon, y2 + 0.166 * k2 + epsilon], [x2 - 0.115 * k2 - epsilon, y2 + 0.234 * k2 - epsilon]]).stream(pointStream);
    return reset();
  };
  albersUsa2.fitExtent = function(extent2, object2) {
    return fitExtent(albersUsa2, extent2, object2);
  };
  albersUsa2.fitSize = function(size, object2) {
    return fitSize(albersUsa2, size, object2);
  };
  albersUsa2.fitWidth = function(width, object2) {
    return fitWidth(albersUsa2, width, object2);
  };
  albersUsa2.fitHeight = function(height, object2) {
    return fitHeight(albersUsa2, height, object2);
  };
  function reset() {
    cache = cacheStream = null;
    return albersUsa2;
  }
  return albersUsa2.scale(1070);
}
function azimuthalRaw(scale) {
  return function(x2, y2) {
    var cx = cos(x2), cy = cos(y2), k2 = scale(cx * cy);
    if (k2 === Infinity) return [2, 0];
    return [
      k2 * cy * sin(x2),
      k2 * sin(y2)
    ];
  };
}
function azimuthalInvert(angle2) {
  return function(x2, y2) {
    var z2 = sqrt(x2 * x2 + y2 * y2), c = angle2(z2), sc = sin(c), cc = cos(c);
    return [
      atan2(x2 * sc, z2 * cc),
      asin(z2 && y2 * sc / z2)
    ];
  };
}
var azimuthalEqualAreaRaw = azimuthalRaw(function(cxcy) {
  return sqrt(2 / (1 + cxcy));
});
azimuthalEqualAreaRaw.invert = azimuthalInvert(function(z2) {
  return 2 * asin(z2 / 2);
});
function azimuthalEqualArea() {
  return projection(azimuthalEqualAreaRaw).scale(124.75).clipAngle(180 - 1e-3);
}
var azimuthalEquidistantRaw = azimuthalRaw(function(c) {
  return (c = acos(c)) && c / sin(c);
});
azimuthalEquidistantRaw.invert = azimuthalInvert(function(z2) {
  return z2;
});
function azimuthalEquidistant() {
  return projection(azimuthalEquidistantRaw).scale(79.4188).clipAngle(180 - 1e-3);
}
function mercatorRaw(lambda, phi) {
  return [lambda, log(tan((halfPi + phi) / 2))];
}
mercatorRaw.invert = function(x2, y2) {
  return [x2, 2 * atan(exp(y2)) - halfPi];
};
function mercator() {
  return mercatorProjection(mercatorRaw).scale(961 / tau);
}
function mercatorProjection(project) {
  var m = projection(project), center = m.center, scale = m.scale, translate = m.translate, clipExtent = m.clipExtent, x02 = null, y02, x12, y12;
  m.scale = function(_2) {
    return arguments.length ? (scale(_2), reclip()) : scale();
  };
  m.translate = function(_2) {
    return arguments.length ? (translate(_2), reclip()) : translate();
  };
  m.center = function(_2) {
    return arguments.length ? (center(_2), reclip()) : center();
  };
  m.clipExtent = function(_2) {
    return arguments.length ? (_2 == null ? x02 = y02 = x12 = y12 = null : (x02 = +_2[0][0], y02 = +_2[0][1], x12 = +_2[1][0], y12 = +_2[1][1]), reclip()) : x02 == null ? null : [[x02, y02], [x12, y12]];
  };
  function reclip() {
    var k2 = pi * scale(), t = m(rotation(m.rotate()).invert([0, 0]));
    return clipExtent(x02 == null ? [[t[0] - k2, t[1] - k2], [t[0] + k2, t[1] + k2]] : project === mercatorRaw ? [[Math.max(t[0] - k2, x02), y02], [Math.min(t[0] + k2, x12), y12]] : [[x02, Math.max(t[1] - k2, y02)], [x12, Math.min(t[1] + k2, y12)]]);
  }
  return reclip();
}
function tany(y2) {
  return tan((halfPi + y2) / 2);
}
function conicConformalRaw(y02, y12) {
  var cy0 = cos(y02), n = y02 === y12 ? sin(y02) : log(cy0 / cos(y12)) / log(tany(y12) / tany(y02)), f = cy0 * pow(tany(y02), n) / n;
  if (!n) return mercatorRaw;
  function project(x2, y2) {
    if (f > 0) {
      if (y2 < -halfPi + epsilon) y2 = -halfPi + epsilon;
    } else {
      if (y2 > halfPi - epsilon) y2 = halfPi - epsilon;
    }
    var r = f / pow(tany(y2), n);
    return [r * sin(n * x2), f - r * cos(n * x2)];
  }
  project.invert = function(x2, y2) {
    var fy = f - y2, r = sign(n) * sqrt(x2 * x2 + fy * fy), l = atan2(x2, abs(fy)) * sign(fy);
    if (fy * n < 0)
      l -= pi * sign(x2) * sign(fy);
    return [l / n, 2 * atan(pow(f / r, 1 / n)) - halfPi];
  };
  return project;
}
function conicConformal() {
  return conicProjection(conicConformalRaw).scale(109.5).parallels([30, 30]);
}
function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}
equirectangularRaw.invert = equirectangularRaw;
function equirectangular() {
  return projection(equirectangularRaw).scale(152.63);
}
function conicEquidistantRaw(y02, y12) {
  var cy0 = cos(y02), n = y02 === y12 ? sin(y02) : (cy0 - cos(y12)) / (y12 - y02), g2 = cy0 / n + y02;
  if (abs(n) < epsilon) return equirectangularRaw;
  function project(x2, y2) {
    var gy = g2 - y2, nx = n * x2;
    return [gy * sin(nx), g2 - gy * cos(nx)];
  }
  project.invert = function(x2, y2) {
    var gy = g2 - y2, l = atan2(x2, abs(gy)) * sign(gy);
    if (gy * n < 0)
      l -= pi * sign(x2) * sign(gy);
    return [l / n, g2 - sign(n) * sqrt(x2 * x2 + gy * gy)];
  };
  return project;
}
function conicEquidistant() {
  return conicProjection(conicEquidistantRaw).scale(131.154).center([0, 13.9389]);
}
var A1 = 1.340264, A2 = -0.081106, A3 = 893e-6, A4 = 3796e-6, M$1 = sqrt(3) / 2, iterations = 12;
function equalEarthRaw(lambda, phi) {
  var l = asin(M$1 * sin(phi)), l2 = l * l, l6 = l2 * l2 * l2;
  return [
    lambda * cos(l) / (M$1 * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
  ];
}
equalEarthRaw.invert = function(x2, y2) {
  var l = y2, l2 = l * l, l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y2;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (abs(delta) < epsilon2$1) break;
  }
  return [
    M$1 * x2 * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / cos(l),
    asin(sin(l) / M$1)
  ];
};
function equalEarth() {
  return projection(equalEarthRaw).scale(177.158);
}
function gnomonicRaw(x2, y2) {
  var cy = cos(y2), k2 = cos(x2) * cy;
  return [cy * sin(x2) / k2, sin(y2) / k2];
}
gnomonicRaw.invert = azimuthalInvert(atan);
function gnomonic() {
  return projection(gnomonicRaw).scale(144.049).clipAngle(60);
}
function identity$3() {
  var k2 = 1, tx = 0, ty = 0, sx = 1, sy = 1, alpha = 0, ca, sa, x02 = null, y02, x12, y12, kx = 1, ky = 1, transform2 = transformer({
    point: function(x2, y2) {
      var p = projection2([x2, y2]);
      this.stream.point(p[0], p[1]);
    }
  }), postclip = identity$4, cache, cacheStream;
  function reset() {
    kx = k2 * sx;
    ky = k2 * sy;
    cache = cacheStream = null;
    return projection2;
  }
  function projection2(p) {
    var x2 = p[0] * kx, y2 = p[1] * ky;
    if (alpha) {
      var t = y2 * ca - x2 * sa;
      x2 = x2 * ca + y2 * sa;
      y2 = t;
    }
    return [x2 + tx, y2 + ty];
  }
  projection2.invert = function(p) {
    var x2 = p[0] - tx, y2 = p[1] - ty;
    if (alpha) {
      var t = y2 * ca + x2 * sa;
      x2 = x2 * ca - y2 * sa;
      y2 = t;
    }
    return [x2 / kx, y2 / ky];
  };
  projection2.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transform2(postclip(cacheStream = stream));
  };
  projection2.postclip = function(_2) {
    return arguments.length ? (postclip = _2, x02 = y02 = x12 = y12 = null, reset()) : postclip;
  };
  projection2.clipExtent = function(_2) {
    return arguments.length ? (postclip = _2 == null ? (x02 = y02 = x12 = y12 = null, identity$4) : clipRectangle(x02 = +_2[0][0], y02 = +_2[0][1], x12 = +_2[1][0], y12 = +_2[1][1]), reset()) : x02 == null ? null : [[x02, y02], [x12, y12]];
  };
  projection2.scale = function(_2) {
    return arguments.length ? (k2 = +_2, reset()) : k2;
  };
  projection2.translate = function(_2) {
    return arguments.length ? (tx = +_2[0], ty = +_2[1], reset()) : [tx, ty];
  };
  projection2.angle = function(_2) {
    return arguments.length ? (alpha = _2 % 360 * radians, sa = sin(alpha), ca = cos(alpha), reset()) : alpha * degrees$1;
  };
  projection2.reflectX = function(_2) {
    return arguments.length ? (sx = _2 ? -1 : 1, reset()) : sx < 0;
  };
  projection2.reflectY = function(_2) {
    return arguments.length ? (sy = _2 ? -1 : 1, reset()) : sy < 0;
  };
  projection2.fitExtent = function(extent2, object2) {
    return fitExtent(projection2, extent2, object2);
  };
  projection2.fitSize = function(size, object2) {
    return fitSize(projection2, size, object2);
  };
  projection2.fitWidth = function(width, object2) {
    return fitWidth(projection2, width, object2);
  };
  projection2.fitHeight = function(height, object2) {
    return fitHeight(projection2, height, object2);
  };
  return projection2;
}
function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (3971e-6 * phi2 - 1529e-6 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4)))
  ];
}
naturalEarth1Raw.invert = function(x2, y2) {
  var phi = y2, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 5916e-6 * phi4))) - y2) / (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 5916e-6 * 11 * phi4)));
  } while (abs(delta) > epsilon && --i > 0);
  return [
    x2 / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (3971e-6 - 1529e-6 * phi2)))),
    phi
  ];
};
function naturalEarth1() {
  return projection(naturalEarth1Raw).scale(175.295);
}
function orthographicRaw(x2, y2) {
  return [cos(y2) * sin(x2), sin(y2)];
}
orthographicRaw.invert = azimuthalInvert(asin);
function orthographic() {
  return projection(orthographicRaw).scale(249.5).clipAngle(90 + epsilon);
}
function stereographicRaw(x2, y2) {
  var cy = cos(y2), k2 = 1 + cos(x2) * cy;
  return [cy * sin(x2) / k2, sin(y2) / k2];
}
stereographicRaw.invert = azimuthalInvert(function(z2) {
  return 2 * atan(z2);
});
function stereographic() {
  return projection(stereographicRaw).scale(250).clipAngle(142);
}
function transverseMercatorRaw(lambda, phi) {
  return [log(tan((halfPi + phi) / 2)), -lambda];
}
transverseMercatorRaw.invert = function(x2, y2) {
  return [-y2, 2 * atan(exp(x2)) - halfPi];
};
function transverseMercator() {
  var m = mercatorProjection(transverseMercatorRaw), center = m.center, rotate = m.rotate;
  m.center = function(_2) {
    return arguments.length ? center([-_2[1], _2[0]]) : (_2 = center(), [_2[1], -_2[0]]);
  };
  m.rotate = function(_2) {
    return arguments.length ? rotate([_2[0], _2[1], _2.length > 2 ? _2[2] + 90 : 90]) : (_2 = rotate(), [_2[0], _2[1], _2[2] - 90]);
  };
  return rotate([0, 0, 90]).scale(159.155);
}
const d3Geo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  geoAlbers: albers,
  geoAlbersUsa: albersUsa,
  geoArea: area,
  geoAzimuthalEqualArea: azimuthalEqualArea,
  geoAzimuthalEqualAreaRaw: azimuthalEqualAreaRaw,
  geoAzimuthalEquidistant: azimuthalEquidistant,
  geoAzimuthalEquidistantRaw: azimuthalEquidistantRaw,
  geoBounds: bounds,
  geoCentroid: centroid,
  geoCircle: circle$1,
  geoClipAntimeridian: clipAntimeridian,
  geoClipCircle: clipCircle,
  geoClipExtent: extent,
  geoClipRectangle: clipRectangle,
  geoConicConformal: conicConformal,
  geoConicConformalRaw: conicConformalRaw,
  geoConicEqualArea: conicEqualArea,
  geoConicEqualAreaRaw: conicEqualAreaRaw,
  geoConicEquidistant: conicEquidistant,
  geoConicEquidistantRaw: conicEquidistantRaw,
  geoContains: contains,
  geoDistance: distance,
  geoEqualEarth: equalEarth,
  geoEqualEarthRaw: equalEarthRaw,
  geoEquirectangular: equirectangular,
  geoEquirectangularRaw: equirectangularRaw,
  geoGnomonic: gnomonic,
  geoGnomonicRaw: gnomonicRaw,
  geoGraticule: graticule,
  geoGraticule10: graticule10,
  geoIdentity: identity$3,
  geoInterpolate: interpolate$1,
  geoLength: length,
  geoMercator: mercator,
  geoMercatorRaw: mercatorRaw,
  geoNaturalEarth1: naturalEarth1,
  geoNaturalEarth1Raw: naturalEarth1Raw,
  geoOrthographic: orthographic,
  geoOrthographicRaw: orthographicRaw,
  geoPath: index,
  geoProjection: projection,
  geoProjectionMutator: projectionMutator,
  geoRotation: rotation,
  geoStereographic: stereographic,
  geoStereographicRaw: stereographicRaw,
  geoStream,
  geoTransform: transform$1,
  geoTransverseMercator: transverseMercator,
  geoTransverseMercatorRaw: transverseMercatorRaw
}, Symbol.toStringTag, { value: "Module" }));
function identity$2(x2) {
  return x2;
}
function transform(transform2) {
  if (transform2 == null) return identity$2;
  var x02, y02, kx = transform2.scale[0], ky = transform2.scale[1], dx = transform2.translate[0], dy = transform2.translate[1];
  return function(input, i) {
    if (!i) x02 = y02 = 0;
    var j2 = 2, n = input.length, output = new Array(n);
    output[0] = (x02 += input[0]) * kx + dx;
    output[1] = (y02 += input[1]) * ky + dy;
    while (j2 < n) output[j2] = input[j2], ++j2;
    return output;
  };
}
function reverse(array2, n) {
  var t, j2 = array2.length, i = j2 - n;
  while (i < --j2) t = array2[i], array2[i++] = array2[j2], array2[j2] = t;
}
function feature(topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection" ? { type: "FeatureCollection", features: o.geometries.map(function(o2) {
    return feature$1(topology, o2);
  }) } : feature$1(topology, o);
}
function feature$1(topology, o) {
  var id2 = o.id, bbox = o.bbox, properties = o.properties == null ? {} : o.properties, geometry = object(topology, o);
  return id2 == null && bbox == null ? { type: "Feature", properties, geometry } : bbox == null ? { type: "Feature", id: id2, properties, geometry } : { type: "Feature", id: id2, bbox, properties, geometry };
}
function object(topology, o) {
  var transformPoint = transform(topology.transform), arcs = topology.arcs;
  function arc(i, points) {
    if (points.length) points.pop();
    for (var a = arcs[i < 0 ? ~i : i], k2 = 0, n = a.length; k2 < n; ++k2) {
      points.push(transformPoint(a[k2], k2));
    }
    if (i < 0) reverse(points, n);
  }
  function point(p) {
    return transformPoint(p);
  }
  function line(arcs2) {
    var points = [];
    for (var i = 0, n = arcs2.length; i < n; ++i) arc(arcs2[i], points);
    if (points.length < 2) points.push(points[0]);
    return points;
  }
  function ring(arcs2) {
    var points = line(arcs2);
    while (points.length < 4) points.push(points[0]);
    return points;
  }
  function polygon(arcs2) {
    return arcs2.map(ring);
  }
  function geometry(o2) {
    var type = o2.type, coordinates2;
    switch (type) {
      case "GeometryCollection":
        return { type, geometries: o2.geometries.map(geometry) };
      case "Point":
        coordinates2 = point(o2.coordinates);
        break;
      case "MultiPoint":
        coordinates2 = o2.coordinates.map(point);
        break;
      case "LineString":
        coordinates2 = line(o2.arcs);
        break;
      case "MultiLineString":
        coordinates2 = o2.arcs.map(line);
        break;
      case "Polygon":
        coordinates2 = polygon(o2.arcs);
        break;
      case "MultiPolygon":
        coordinates2 = o2.arcs.map(polygon);
        break;
      default:
        return null;
    }
    return { type, coordinates: coordinates2 };
  }
  return geometry(o);
}
function stitch(topology, arcs) {
  var stitchedArcs = {}, fragmentByStart = {}, fragmentByEnd = {}, fragments = [], emptyIndex = -1;
  arcs.forEach(function(i, j2) {
    var arc = topology.arcs[i < 0 ? ~i : i], t;
    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j2] = t;
    }
  });
  arcs.forEach(function(i) {
    var e = ends(i), start2 = e[0], end = e[1], f, g2;
    if (f = fragmentByEnd[start2]) {
      delete fragmentByEnd[f.end];
      f.push(i);
      f.end = end;
      if (g2 = fragmentByStart[end]) {
        delete fragmentByStart[g2.start];
        var fg = g2 === f ? f : f.concat(g2);
        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g2.end] = fg;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else if (f = fragmentByStart[end]) {
      delete fragmentByStart[f.start];
      f.unshift(i);
      f.start = start2;
      if (g2 = fragmentByEnd[start2]) {
        delete fragmentByEnd[g2.end];
        var gf = g2 === f ? f : g2.concat(f);
        fragmentByStart[gf.start = g2.start] = fragmentByEnd[gf.end = f.end] = gf;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else {
      f = [i];
      fragmentByStart[f.start = start2] = fragmentByEnd[f.end = end] = f;
    }
  });
  function ends(i) {
    var arc = topology.arcs[i < 0 ? ~i : i], p02 = arc[0], p1;
    if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) {
      p1[0] += dp[0], p1[1] += dp[1];
    });
    else p1 = arc[arc.length - 1];
    return i < 0 ? [p1, p02] : [p02, p1];
  }
  function flush(fragmentByEnd2, fragmentByStart2) {
    for (var k2 in fragmentByEnd2) {
      var f = fragmentByEnd2[k2];
      delete fragmentByStart2[f.start];
      delete f.start;
      delete f.end;
      f.forEach(function(i) {
        stitchedArcs[i < 0 ? ~i : i] = 1;
      });
      fragments.push(f);
    }
  }
  flush(fragmentByEnd, fragmentByStart);
  flush(fragmentByStart, fragmentByEnd);
  arcs.forEach(function(i) {
    if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]);
  });
  return fragments;
}
function mesh(topology) {
  return object(topology, meshArcs.apply(this, arguments));
}
function meshArcs(topology, object2, filter2) {
  var arcs, i, n;
  if (arguments.length > 1) arcs = extractArcs(topology, object2, filter2);
  else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) arcs[i] = i;
  return { type: "MultiLineString", arcs: stitch(topology, arcs) };
}
function extractArcs(topology, object2, filter2) {
  var arcs = [], geomsByArc = [], geom;
  function extract0(i) {
    var j2 = i < 0 ? ~i : i;
    (geomsByArc[j2] || (geomsByArc[j2] = [])).push({ i, g: geom });
  }
  function extract1(arcs2) {
    arcs2.forEach(extract0);
  }
  function extract2(arcs2) {
    arcs2.forEach(extract1);
  }
  function extract3(arcs2) {
    arcs2.forEach(extract2);
  }
  function geometry(o) {
    switch (geom = o, o.type) {
      case "GeometryCollection":
        o.geometries.forEach(geometry);
        break;
      case "LineString":
        extract1(o.arcs);
        break;
      case "MultiLineString":
      case "Polygon":
        extract2(o.arcs);
        break;
      case "MultiPolygon":
        extract3(o.arcs);
        break;
    }
  }
  geometry(object2);
  geomsByArc.forEach(filter2 == null ? function(geoms) {
    arcs.push(geoms[0].i);
  } : function(geoms) {
    if (filter2(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i);
  });
  return arcs;
}
var noop = { value: () => {
} };
function dispatch() {
  for (var i = 0, n = arguments.length, _2 = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || t in _2 || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _2[t] = [];
  }
  return new Dispatch(_2);
}
function Dispatch(_2) {
  this._ = _2;
}
function parseTypenames$1(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return { type: t, name };
  });
}
Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _2 = this._, T2 = parseTypenames$1(typename + "", _2), t, i = -1, n = T2.length;
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T2[i]).type) && (t = get$1(_2[t], typename.name))) return t;
      return;
    }
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T2[i]).type) _2[t] = set$1(_2[t], typename.name, callback);
      else if (callback == null) for (t in _2) _2[t] = set$1(_2[t], typename.name, null);
    }
    return this;
  },
  copy: function() {
    var copy = {}, _2 = this._;
    for (var t in _2) copy[t] = _2[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};
function get$1(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}
function set$1(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({ name, value: callback });
  return type;
}
var xhtml = "http://www.w3.org/1999/xhtml";
const namespaces = {
  svg: "http://www.w3.org/2000/svg",
  xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? { space: namespaces[prefix], local: name } : name;
}
function creatorInherit(name) {
  return function() {
    var document2 = this.ownerDocument, uri = this.namespaceURI;
    return uri === xhtml && document2.documentElement.namespaceURI === xhtml ? document2.createElement(name) : document2.createElementNS(uri, name);
  };
}
function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}
function creator(name) {
  var fullname = namespace(name);
  return (fullname.local ? creatorFixed : creatorInherit)(fullname);
}
function none() {
}
function selector(selector2) {
  return selector2 == null ? none : function() {
    return this.querySelector(selector2);
  };
}
function selection_select(select2) {
  if (typeof select2 !== "function") select2 = selector(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group = groups[j2], n = group.length, subgroup = subgroups[j2] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function array(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}
function empty() {
  return [];
}
function selectorAll(selector2) {
  return selector2 == null ? empty : function() {
    return this.querySelectorAll(selector2);
  };
}
function arrayAll(select2) {
  return function() {
    var group = select2.apply(this, arguments);
    return group == null ? [] : array(group);
  };
}
function selection_selectAll(select2) {
  if (typeof select2 === "function") select2 = arrayAll(select2);
  else select2 = selectorAll(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j2 = 0; j2 < m; ++j2) {
    for (var group = groups[j2], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select2.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }
  return new Selection$1(subgroups, parents);
}
function matcher(selector2) {
  return function() {
    return this.matches(selector2);
  };
}
function childMatcher(selector2) {
  return function(node) {
    return node.matches(selector2);
  };
}
var find = Array.prototype.find;
function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}
function childFirst() {
  return this.firstElementChild;
}
function selection_selectChild(match) {
  return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : childMatcher(match)));
}
var filter = Array.prototype.filter;
function children() {
  return this.children;
}
function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}
function selection_selectChildren(match) {
  return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}
function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group = groups[j2], n = group.length, subgroup = subgroups[j2] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Selection$1(subgroups, this._parents);
}
function sparse(update) {
  return new Array(update.length);
}
function selection_enter() {
  return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
}
function EnterNode(parent, datum2) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum2;
}
EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) {
    return this._parent.insertBefore(child, this._next);
  },
  insertBefore: function(child, next) {
    return this._parent.insertBefore(child, next);
  },
  querySelector: function(selector2) {
    return this._parent.querySelector(selector2);
  },
  querySelectorAll: function(selector2) {
    return this._parent.querySelectorAll(selector2);
  }
};
function constant$2(x2) {
  return function() {
    return x2;
  };
}
function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0, node, groupLength = group.length, dataLength = data.length;
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}
function bindKey(parent, group, enter, update, exit, data, key) {
  var i, node, nodeByKeyValue = /* @__PURE__ */ new Map(), groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) {
      exit[i] = node;
    }
  }
}
function datum(node) {
  return node.__data__;
}
function selection_data(value, key) {
  if (!arguments.length) return Array.from(this, datum);
  var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
  if (typeof value !== "function") value = constant$2(value);
  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j2 = 0; j2 < m; ++j2) {
    var parent = parents[j2], group = groups[j2], groupLength = group.length, data = array(value.call(parent, parent && parent.__data__, j2, parents)), dataLength = data.length, enterGroup = enter[j2] = new Array(dataLength), updateGroup = update[j2] = new Array(dataLength), exitGroup = exit[j2] = new Array(groupLength);
    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength) ;
        previous._next = next || null;
      }
    }
  }
  update = new Selection$1(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}
function selection_exit() {
  return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
}
function selection_join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove();
  else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}
function selection_merge(selection2) {
  if (!(selection2 instanceof Selection$1)) throw new Error("invalid merge");
  for (var groups0 = this._groups, groups1 = selection2._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j2 = 0; j2 < m; ++j2) {
    for (var group0 = groups0[j2], group1 = groups1[j2], n = group0.length, merge2 = merges[j2] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge2[i] = node;
      }
    }
  }
  for (; j2 < m0; ++j2) {
    merges[j2] = groups0[j2];
  }
  return new Selection$1(merges, this._parents);
}
function selection_order() {
  for (var groups = this._groups, j2 = -1, m = groups.length; ++j2 < m; ) {
    for (var group = groups[j2], i = group.length - 1, next = group[i], node; --i >= 0; ) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }
  return this;
}
function selection_sort(compare) {
  if (!compare) compare = ascending;
  function compareNode(a, b2) {
    return a && b2 ? compare(a.__data__, b2.__data__) : !a - !b2;
  }
  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group = groups[j2], n = group.length, sortgroup = sortgroups[j2] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }
  return new Selection$1(sortgroups, this._parents).order();
}
function ascending(a, b2) {
  return a < b2 ? -1 : a > b2 ? 1 : a >= b2 ? 0 : NaN;
}
function selection_call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}
function selection_nodes() {
  return Array.from(this);
}
function selection_node() {
  for (var groups = this._groups, j2 = 0, m = groups.length; j2 < m; ++j2) {
    for (var group = groups[j2], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }
  return null;
}
function selection_size() {
  let size = 0;
  for (const node of this) ++size;
  return size;
}
function selection_empty() {
  return !this.node();
}
function selection_each(callback) {
  for (var groups = this._groups, j2 = 0, m = groups.length; j2 < m; ++j2) {
    for (var group = groups[j2], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }
  return this;
}
function attrRemove$1(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS$1(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant$1(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}
function attrConstantNS$1(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}
function attrFunction$1(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}
function attrFunctionNS$1(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}
function selection_attr(name, value) {
  var fullname = namespace(name);
  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
  }
  return this.each((value == null ? fullname.local ? attrRemoveNS$1 : attrRemove$1 : typeof value === "function" ? fullname.local ? attrFunctionNS$1 : attrFunction$1 : fullname.local ? attrConstantNS$1 : attrConstant$1)(fullname, value));
}
function defaultView(node) {
  return node.ownerDocument && node.ownerDocument.defaultView || node.document && node || node.defaultView;
}
function styleRemove$1(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant$1(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}
function styleFunction$1(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}
function selection_style(name, value, priority) {
  return arguments.length > 1 ? this.each((value == null ? styleRemove$1 : typeof value === "function" ? styleFunction$1 : styleConstant$1)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
}
function styleValue(node, name) {
  return node.style.getPropertyValue(name) || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
}
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}
function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}
function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}
function selection_property(name, value) {
  return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
}
function classArray(string) {
  return string.trim().split(/^|\s+/);
}
function classList(node) {
  return node.classList || new ClassList(node);
}
function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};
function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}
function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}
function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}
function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}
function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}
function selection_classed(name, value) {
  var names = classArray(name + "");
  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }
  return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
}
function textRemove() {
  this.textContent = "";
}
function textConstant$1(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction$1(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}
function selection_text(value) {
  return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction$1 : textConstant$1)(value)) : this.node().textContent;
}
function htmlRemove() {
  this.innerHTML = "";
}
function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}
function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}
function selection_html(value) {
  return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
}
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}
function selection_raise() {
  return this.each(raise);
}
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function selection_lower() {
  return this.each(lower);
}
function selection_append(name) {
  var create2 = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create2.apply(this, arguments));
  });
}
function constantNull() {
  return null;
}
function selection_insert(name, before) {
  var create2 = typeof name === "function" ? name : creator(name), select2 = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create2.apply(this, arguments), select2.apply(this, arguments) || null);
  });
}
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}
function selection_remove() {
  return this.each(remove);
}
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}
function selection_datum(value) {
  return arguments.length ? this.property("__data__", value) : this.node().__data__;
}
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}
function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return { type: t, name };
  });
}
function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j2 = 0, i = -1, m = on.length, o; j2 < m; ++j2) {
      if (o = on[j2], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}
function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j2 = 0, m = on.length; j2 < m; ++j2) {
      if ((o = on[j2]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = { type: typename.type, name: typename.name, value, listener, options };
    if (!on) this.__on = [o];
    else on.push(o);
  };
}
function selection_on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j2 = 0, m = on.length, o; j2 < m; ++j2) {
      for (i = 0, o = on[j2]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }
  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}
function dispatchEvent(node, type, params) {
  var window2 = defaultView(node), event = window2.CustomEvent;
  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window2.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }
  node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}
function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}
function selection_dispatch(type, params) {
  return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
}
function* selection_iterator() {
  for (var groups = this._groups, j2 = 0, m = groups.length; j2 < m; ++j2) {
    for (var group = groups[j2], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}
var root = [null];
function Selection$1(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}
function selection() {
  return new Selection$1([[document.documentElement]], root);
}
function selection_selection() {
  return this;
}
Selection$1.prototype = selection.prototype = {
  constructor: Selection$1,
  select: selection_select,
  selectAll: selection_selectAll,
  selectChild: selection_selectChild,
  selectChildren: selection_selectChildren,
  filter: selection_filter,
  data: selection_data,
  enter: selection_enter,
  exit: selection_exit,
  join: selection_join,
  merge: selection_merge,
  selection: selection_selection,
  order: selection_order,
  sort: selection_sort,
  call: selection_call,
  nodes: selection_nodes,
  node: selection_node,
  size: selection_size,
  empty: selection_empty,
  each: selection_each,
  attr: selection_attr,
  style: selection_style,
  property: selection_property,
  classed: selection_classed,
  text: selection_text,
  html: selection_html,
  raise: selection_raise,
  lower: selection_lower,
  append: selection_append,
  insert: selection_insert,
  remove: selection_remove,
  clone: selection_clone,
  datum: selection_datum,
  on: selection_on,
  dispatch: selection_dispatch,
  [Symbol.iterator]: selection_iterator
};
function select(selector2) {
  return typeof selector2 === "string" ? new Selection$1([[document.querySelector(selector2)]], [document.documentElement]) : new Selection$1([[selector2]], root);
}
function sourceEvent(event) {
  let sourceEvent2;
  while (sourceEvent2 = event.sourceEvent) event = sourceEvent2;
  return event;
}
function pointer(event, node) {
  event = sourceEvent(event);
  if (node === void 0) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}
function noevent$1(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function dragDisable(view) {
  var root2 = view.document.documentElement, selection2 = select(view).on("dragstart.drag", noevent$1, true);
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", noevent$1, true);
  } else {
    root2.__noselect = root2.style.MozUserSelect;
    root2.style.MozUserSelect = "none";
  }
}
function yesdrag(view, noclick) {
  var root2 = view.document.documentElement, selection2 = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection2.on("click.drag", noevent$1, true);
    setTimeout(function() {
      selection2.on("click.drag", null);
    }, 0);
  }
  if ("onselectstart" in root2) {
    selection2.on("selectstart.drag", null);
  } else {
    root2.style.MozUserSelect = root2.__noselect;
    delete root2.__noselect;
  }
}
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"), reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"), reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"), reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"), reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"), reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) : l === 3 ? new Rgb(m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, (m & 15) << 4 | m & 15, 1) : l === 8 ? rgba(m >> 24 & 255, m >> 16 & 255, m >> 8 & 255, (m & 255) / 255) : l === 4 ? rgba(m >> 12 & 15 | m >> 8 & 240, m >> 8 & 15 | m >> 4 & 240, m >> 4 & 15 | m & 240, ((m & 15) << 4 | m & 15) / 255) : null) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) : named.hasOwnProperty(format) ? rgbn(named[format]) : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
  return new Rgb(n >> 16 & 255, n >> 8 & 255, n & 255, 1);
}
function rgba(r, g2, b2, a) {
  if (a <= 0) r = g2 = b2 = NaN;
  return new Rgb(r, g2, b2, a);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g2, b2, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g2, b2, opacity == null ? 1 : opacity);
}
function Rgb(r, g2, b2, opacity) {
  this.r = +r;
  this.g = +g2;
  this.b = +b2;
  this.opacity = +opacity;
}
define(Rgb, rgb, extend(Color, {
  brighter: function(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker: function(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
  var a = this.opacity;
  a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255, g2 = o.g / 255, b2 = o.b / 255, min2 = Math.min(r, g2, b2), max2 = Math.max(r, g2, b2), h = NaN, s = max2 - min2, l = (max2 + min2) / 2;
  if (s) {
    if (r === max2) h = (g2 - b2) / s + (g2 < b2) * 6;
    else if (g2 === max2) h = (b2 - r) / s + 2;
    else h = (r - g2) / s + 4;
    s /= l < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color, {
  brighter: function(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker: function(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
  }
}));
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}
const constant$1 = (x2) => () => x2;
function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}
function exponential(a, b2, y2) {
  return a = Math.pow(a, y2), b2 = Math.pow(b2, y2) - a, y2 = 1 / y2, function(t) {
    return Math.pow(a + t * b2, y2);
  };
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a, b2) {
    return b2 - a ? exponential(a, b2, y2) : constant$1(isNaN(a) ? b2 : a);
  };
}
function nogamma(a, b2) {
  var d = b2 - a;
  return d ? linear(a, d) : constant$1(isNaN(a) ? b2 : a);
}
const interpolateRgb = (function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb$1(start2, end) {
    var r = color2((start2 = rgb(start2)).r, (end = rgb(end)).r), g2 = color2(start2.g, end.g), b2 = color2(start2.b, end.b), opacity = nogamma(start2.opacity, end.opacity);
    return function(t) {
      start2.r = r(t);
      start2.g = g2(t);
      start2.b = b2(t);
      start2.opacity = opacity(t);
      return start2 + "";
    };
  }
  rgb$1.gamma = rgbGamma;
  return rgb$1;
})(1);
function interpolateNumber(a, b2) {
  return a = +a, b2 = +b2, function(t) {
    return a * (1 - t) + b2 * t;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b2) {
  return function() {
    return b2;
  };
}
function one(b2) {
  return function(t) {
    return b2(t) + "";
  };
}
function interpolateString(a, b2) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q2 = [];
  a = a + "", b2 = b2 + "";
  while ((am = reA.exec(a)) && (bm = reB.exec(b2))) {
    if ((bs = bm.index) > bi) {
      bs = b2.slice(bi, bs);
      if (s[i]) s[i] += bs;
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s[i]) s[i] += bm;
      else s[++i] = bm;
    } else {
      s[++i] = null;
      q2.push({ i, x: interpolateNumber(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b2.length) {
    bs = b2.slice(bi);
    if (s[i]) s[i] += bs;
    else s[++i] = bs;
  }
  return s.length < 2 ? q2[0] ? one(q2[0].x) : zero(b2) : (b2 = q2.length, function(t) {
    for (var i2 = 0, o; i2 < b2; ++i2) s[(o = q2[i2]).i] = o.x(t);
    return s.join("");
  });
}
var degrees = 180 / Math.PI;
var identity$1 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function decompose(a, b2, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b2 * b2)) a /= scaleX, b2 /= scaleX;
  if (skewX = a * c + b2 * d) c -= a * skewX, d -= b2 * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b2 * c) a = -a, b2 = -b2, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b2, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX,
    scaleY
  };
}
var svgNode;
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? identity$1 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}
function parseSvg(value) {
  if (value == null) return identity$1;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}
function interpolateTransform(parse, pxComma, pxParen, degParen) {
  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }
  function translate(xa, ya, xb, yb, s, q2) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q2.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }
  function rotate(a, b2, s, q2) {
    if (a !== b2) {
      if (a - b2 > 180) b2 += 360;
      else if (b2 - a > 180) a += 360;
      q2.push({ i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b2) });
    } else if (b2) {
      s.push(pop(s) + "rotate(" + b2 + degParen);
    }
  }
  function skewX(a, b2, s, q2) {
    if (a !== b2) {
      q2.push({ i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b2) });
    } else if (b2) {
      s.push(pop(s) + "skewX(" + b2 + degParen);
    }
  }
  function scale(xa, ya, xb, yb, s, q2) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q2.push({ i: i - 4, x: interpolateNumber(xa, xb) }, { i: i - 2, x: interpolateNumber(ya, yb) });
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }
  return function(a, b2) {
    var s = [], q2 = [];
    a = parse(a), b2 = parse(b2);
    translate(a.translateX, a.translateY, b2.translateX, b2.translateY, s, q2);
    rotate(a.rotate, b2.rotate, s, q2);
    skewX(a.skewX, b2.skewX, s, q2);
    scale(a.scaleX, a.scaleY, b2.scaleX, b2.scaleY, s, q2);
    a = b2 = null;
    return function(t) {
      var i = -1, n = q2.length, o;
      while (++i < n) s[(o = q2[i]).i] = o.x(t);
      return s.join("");
    };
  };
}
var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");
var epsilon2 = 1e-12;
function cosh(x2) {
  return ((x2 = Math.exp(x2)) + 1 / x2) / 2;
}
function sinh(x2) {
  return ((x2 = Math.exp(x2)) - 1 / x2) / 2;
}
function tanh(x2) {
  return ((x2 = Math.exp(2 * x2)) - 1) / (x2 + 1);
}
const interpolateZoom = (function zoomRho(rho, rho2, rho4) {
  function zoom2(p02, p1) {
    var ux0 = p02[0], uy0 = p02[1], w0 = p02[2], ux1 = p1[0], uy1 = p1[1], w1 = p1[2], dx = ux1 - ux0, dy = uy1 - uy0, d2 = dx * dx + dy * dy, i, S2;
    if (d2 < epsilon2) {
      S2 = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S2)
        ];
      };
    } else {
      var d1 = Math.sqrt(d2), b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1), b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1), r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0), r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S2 = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S2, coshr0 = cosh(r0), u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      };
    }
    i.duration = S2 * 1e3 * rho / Math.SQRT2;
    return i;
  }
  zoom2.rho = function(_2) {
    var _1 = Math.max(1e-3, +_2), _22 = _1 * _1, _4 = _22 * _22;
    return zoomRho(_1, _22, _4);
  };
  return zoom2;
})(Math.SQRT2, 2, 4);
var frame = 0, timeout$1 = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
  setTimeout(f, 17);
};
function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
  clockNow = 0;
}
function Timer() {
  this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};
function timer(callback, delay, time) {
  var t = new Timer();
  t.restart(callback, delay, time);
  return t;
}
function timerFlush() {
  now();
  ++frame;
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
    t = t._next;
  }
  --frame;
}
function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout$1 = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}
function poke() {
  var now2 = clock.now(), delay = now2 - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now2;
}
function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}
function sleep(time) {
  if (frame) return;
  if (timeout$1) timeout$1 = clearTimeout(timeout$1);
  var delay = time - clockNow;
  if (delay > 24) {
    if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}
function timeout(callback, delay, time) {
  var t = new Timer();
  delay = delay == null ? 0 : +delay;
  t.restart((elapsed) => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}
var emptyOn = dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function schedule(node, name, id2, index2, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id2 in schedules) return;
  create(node, id2, {
    name,
    index: index2,
    // For context during callback.
    group,
    // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}
function init(node, id2) {
  var schedule2 = get(node, id2);
  if (schedule2.state > CREATED) throw new Error("too late; already scheduled");
  return schedule2;
}
function set(node, id2) {
  var schedule2 = get(node, id2);
  if (schedule2.state > STARTED) throw new Error("too late; already running");
  return schedule2;
}
function get(node, id2) {
  var schedule2 = node.__transition;
  if (!schedule2 || !(schedule2 = schedule2[id2])) throw new Error("transition not found");
  return schedule2;
}
function create(node, id2, self) {
  var schedules = node.__transition, tween;
  schedules[id2] = self;
  self.timer = timer(schedule2, 0, self.time);
  function schedule2(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start2, self.delay, self.time);
    if (self.delay <= elapsed) start2(elapsed - self.delay);
  }
  function start2(elapsed) {
    var i, j2, n, o;
    if (self.state !== SCHEDULED) return stop();
    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;
      if (o.state === STARTED) return timeout(start2);
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      } else if (+i < id2) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }
    timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return;
    self.state = STARTED;
    tween = new Array(n = self.tween.length);
    for (i = 0, j2 = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j2] = o;
      }
    }
    tween.length = j2 + 1;
  }
  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
    while (++i < n) {
      tween[i].call(node, t);
    }
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }
  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id2];
    for (var i in schedules) return;
    delete node.__transition;
  }
}
function interrupt(node, name) {
  var schedules = node.__transition, schedule2, active, empty2 = true, i;
  if (!schedules) return;
  name = name == null ? null : name + "";
  for (i in schedules) {
    if ((schedule2 = schedules[i]).name !== name) {
      empty2 = false;
      continue;
    }
    active = schedule2.state > STARTING && schedule2.state < ENDING;
    schedule2.state = ENDED;
    schedule2.timer.stop();
    schedule2.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule2.index, schedule2.group);
    delete schedules[i];
  }
  if (empty2) delete node.__transition;
}
function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}
function tweenRemove(id2, name) {
  var tween0, tween1;
  return function() {
    var schedule2 = set(this, id2), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }
    schedule2.tween = tween1;
  };
}
function tweenFunction(id2, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error();
  return function() {
    var schedule2 = set(this, id2), tween = schedule2.tween;
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = { name, value }, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }
    schedule2.tween = tween1;
  };
}
function transition_tween(name, value) {
  var id2 = this._id;
  name += "";
  if (arguments.length < 2) {
    var tween = get(this.node(), id2).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }
  return this.each((value == null ? tweenRemove : tweenFunction)(id2, name, value));
}
function tweenValue(transition, name, value) {
  var id2 = transition._id;
  transition.each(function() {
    var schedule2 = set(this, id2);
    (schedule2.value || (schedule2.value = {}))[name] = value.apply(this, arguments);
  });
  return function(node) {
    return get(node, id2).value[name];
  };
}
function interpolate(a, b2) {
  var c;
  return (typeof b2 === "number" ? interpolateNumber : b2 instanceof color ? interpolateRgb : (c = color(b2)) ? (b2 = c, interpolateRgb) : interpolateString)(a, b2);
}
function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}
function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}
function attrConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrConstantNS(fullname, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function attrFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function attrFunctionNS(fullname, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}
function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}
function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}
function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}
function delayFunction(id2, value) {
  return function() {
    init(this, id2).delay = +value.apply(this, arguments);
  };
}
function delayConstant(id2, value) {
  return value = +value, function() {
    init(this, id2).delay = value;
  };
}
function transition_delay(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id2, value)) : get(this.node(), id2).delay;
}
function durationFunction(id2, value) {
  return function() {
    set(this, id2).duration = +value.apply(this, arguments);
  };
}
function durationConstant(id2, value) {
  return value = +value, function() {
    set(this, id2).duration = value;
  };
}
function transition_duration(value) {
  var id2 = this._id;
  return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id2, value)) : get(this.node(), id2).duration;
}
function easeConstant(id2, value) {
  if (typeof value !== "function") throw new Error();
  return function() {
    set(this, id2).ease = value;
  };
}
function transition_ease(value) {
  var id2 = this._id;
  return arguments.length ? this.each(easeConstant(id2, value)) : get(this.node(), id2).ease;
}
function easeVarying(id2, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error();
    set(this, id2).ease = v;
  };
}
function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error();
  return this.each(easeVarying(this._id, value));
}
function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group = groups[j2], n = group.length, subgroup = subgroups[j2] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }
  return new Transition(subgroups, this._parents, this._name, this._id);
}
function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error();
  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j2 = 0; j2 < m; ++j2) {
    for (var group0 = groups0[j2], group1 = groups1[j2], n = group0.length, merge2 = merges[j2] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge2[i] = node;
      }
    }
  }
  for (; j2 < m0; ++j2) {
    merges[j2] = groups0[j2];
  }
  return new Transition(merges, this._parents, this._name, this._id);
}
function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}
function onFunction(id2, name, listener) {
  var on0, on1, sit = start(name) ? init : set;
  return function() {
    var schedule2 = sit(this, id2), on = schedule2.on;
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
    schedule2.on = on1;
  };
}
function transition_on(name, listener) {
  var id2 = this._id;
  return arguments.length < 2 ? get(this.node(), id2).on.on(name) : this.each(onFunction(id2, name, listener));
}
function removeFunction(id2) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id2) return;
    if (parent) parent.removeChild(this);
  };
}
function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}
function transition_select(select2) {
  var name = this._name, id2 = this._id;
  if (typeof select2 !== "function") select2 = selector(select2);
  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j2 = 0; j2 < m; ++j2) {
    for (var group = groups[j2], n = group.length, subgroup = subgroups[j2] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select2.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id2, i, subgroup, get(node, id2));
      }
    }
  }
  return new Transition(subgroups, this._parents, name, id2);
}
function transition_selectAll(select2) {
  var name = this._name, id2 = this._id;
  if (typeof select2 !== "function") select2 = selectorAll(select2);
  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j2 = 0; j2 < m; ++j2) {
    for (var group = groups[j2], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children2 = select2.call(node, node.__data__, i, group), child, inherit2 = get(node, id2), k2 = 0, l = children2.length; k2 < l; ++k2) {
          if (child = children2[k2]) {
            schedule(child, name, id2, k2, children2, inherit2);
          }
        }
        subgroups.push(children2);
        parents.push(node);
      }
    }
  }
  return new Transition(subgroups, parents, name, id2);
}
var Selection = selection.prototype.constructor;
function transition_selection() {
  return new Selection(this._groups, this._parents);
}
function styleNull(name, interpolate2) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, string10 = string1);
  };
}
function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}
function styleConstant(name, interpolate2, value1) {
  var string00, string1 = value1 + "", interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate2(string00 = string0, value1);
  };
}
function styleFunction(name, interpolate2, value) {
  var string00, string10, interpolate0;
  return function() {
    var string0 = styleValue(this, name), value1 = value(this), string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate2(string00 = string0, value1));
  };
}
function styleMaybeRemove(id2, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove2;
  return function() {
    var schedule2 = set(this, id2), on = schedule2.on, listener = schedule2.value[key] == null ? remove2 || (remove2 = styleRemove(name)) : void 0;
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
    schedule2.on = on1;
  };
}
function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
}
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}
function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}
function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}
function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}
function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}
function transition_text(value) {
  return this.tween("text", typeof value === "function" ? textFunction(tweenValue(this, "text", value)) : textConstant(value == null ? "" : value + ""));
}
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}
function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}
function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error();
  return this.tween(key, textTween(value));
}
function transition_transition() {
  var name = this._name, id0 = this._id, id1 = newId();
  for (var groups = this._groups, m = groups.length, j2 = 0; j2 < m; ++j2) {
    for (var group = groups[j2], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit2 = get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit2.time + inherit2.delay + inherit2.duration,
          delay: 0,
          duration: inherit2.duration,
          ease: inherit2.ease
        });
      }
    }
  }
  return new Transition(groups, this._parents, name, id1);
}
function transition_end() {
  var on0, on1, that = this, id2 = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = { value: reject }, end = { value: function() {
      if (--size === 0) resolve();
    } };
    that.each(function() {
      var schedule2 = set(this, id2), on = schedule2.on;
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }
      schedule2.on = on1;
    });
    if (size === 0) resolve();
  });
}
var id = 0;
function Transition(groups, parents, name, id2) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id2;
}
function newId() {
  return ++id;
}
var selection_prototype = selection.prototype;
Transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition_transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: transition_tween,
  delay: transition_delay,
  duration: transition_duration,
  ease: transition_ease,
  easeVarying: transition_easeVarying,
  end: transition_end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};
function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var defaultTiming = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};
function inherit(node, id2) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id2])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id2} not found`);
    }
  }
  return timing;
}
function selection_transition(name) {
  var id2, timing;
  if (name instanceof Transition) {
    id2 = name._id, name = name._name;
  } else {
    id2 = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }
  for (var groups = this._groups, m = groups.length, j2 = 0; j2 < m; ++j2) {
    for (var group = groups[j2], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id2, i, group, timing || inherit(node, id2));
      }
    }
  }
  return new Transition(groups, this._parents, name, id2);
}
selection.prototype.interrupt = selection_interrupt;
selection.prototype.transition = selection_transition;
const constant = (x2) => () => x2;
function ZoomEvent(type, {
  sourceEvent: sourceEvent2,
  target,
  transform: transform2,
  dispatch: dispatch2
}) {
  Object.defineProperties(this, {
    type: { value: type, enumerable: true, configurable: true },
    sourceEvent: { value: sourceEvent2, enumerable: true, configurable: true },
    target: { value: target, enumerable: true, configurable: true },
    transform: { value: transform2, enumerable: true, configurable: true },
    _: { value: dispatch2 }
  });
}
function Transform(k2, x2, y2) {
  this.k = k2;
  this.x = x2;
  this.y = y2;
}
Transform.prototype = {
  constructor: Transform,
  scale: function(k2) {
    return k2 === 1 ? this : new Transform(this.k * k2, this.x, this.y);
  },
  translate: function(x2, y2) {
    return x2 === 0 & y2 === 0 ? this : new Transform(this.k, this.x + this.k * x2, this.y + this.k * y2);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x2) {
    return x2 * this.k + this.x;
  },
  applyY: function(y2) {
    return y2 * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x2) {
    return (x2 - this.x) / this.k;
  },
  invertY: function(y2) {
    return (y2 - this.y) / this.k;
  },
  rescaleX: function(x2) {
    return x2.copy().domain(x2.range().map(this.invertX, this).map(x2.invert, x2));
  },
  rescaleY: function(y2) {
    return y2.copy().domain(y2.range().map(this.invertY, this).map(y2.invert, y2));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var identity = new Transform(1, 0, 0);
Transform.prototype;
function nopropagation(event) {
  event.stopImmediatePropagation();
}
function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === "wheel") && !event.button;
}
function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}
function defaultTransform() {
  return this.__zoom || identity;
}
function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 2e-3) * (event.ctrlKey ? 10 : 1);
}
function defaultTouchable() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function defaultConstrain(transform2, extent2, translateExtent) {
  var dx0 = transform2.invertX(extent2[0][0]) - translateExtent[0][0], dx1 = transform2.invertX(extent2[1][0]) - translateExtent[1][0], dy0 = transform2.invertY(extent2[0][1]) - translateExtent[0][1], dy1 = transform2.invertY(extent2[1][1]) - translateExtent[1][1];
  return transform2.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}
function zoom() {
  var filter2 = defaultFilter, extent2 = defaultExtent, constrain = defaultConstrain, wheelDelta = defaultWheelDelta, touchable = defaultTouchable, scaleExtent = [0, Infinity], translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]], duration = 250, interpolate2 = interpolateZoom, listeners = dispatch("start", "zoom", "end"), touchstarting, touchfirst, touchending, touchDelay = 500, wheelDelay = 150, clickDistance2 = 0, tapDistance = 10;
  function zoom2(selection2) {
    selection2.property("__zoom", defaultTransform).on("wheel.zoom", wheeled).on("mousedown.zoom", mousedowned).on("dblclick.zoom", dblclicked).filter(touchable).on("touchstart.zoom", touchstarted).on("touchmove.zoom", touchmoved).on("touchend.zoom touchcancel.zoom", touchended).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  zoom2.transform = function(collection, transform2, point, event) {
    var selection2 = collection.selection ? collection.selection() : collection;
    selection2.property("__zoom", defaultTransform);
    if (collection !== selection2) {
      schedule2(collection, transform2, point, event);
    } else {
      selection2.interrupt().each(function() {
        gesture(this, arguments).event(event).start().zoom(null, typeof transform2 === "function" ? transform2.apply(this, arguments) : transform2).end();
      });
    }
  };
  zoom2.scaleBy = function(selection2, k2, p, event) {
    zoom2.scaleTo(selection2, function() {
      var k0 = this.__zoom.k, k1 = typeof k2 === "function" ? k2.apply(this, arguments) : k2;
      return k0 * k1;
    }, p, event);
  };
  zoom2.scaleTo = function(selection2, k2, p, event) {
    zoom2.transform(selection2, function() {
      var e = extent2.apply(this, arguments), t0 = this.__zoom, p02 = p == null ? centroid2(e) : typeof p === "function" ? p.apply(this, arguments) : p, p1 = t0.invert(p02), k1 = typeof k2 === "function" ? k2.apply(this, arguments) : k2;
      return constrain(translate(scale(t0, k1), p02, p1), e, translateExtent);
    }, p, event);
  };
  zoom2.translateBy = function(selection2, x2, y2, event) {
    zoom2.transform(selection2, function() {
      return constrain(this.__zoom.translate(
        typeof x2 === "function" ? x2.apply(this, arguments) : x2,
        typeof y2 === "function" ? y2.apply(this, arguments) : y2
      ), extent2.apply(this, arguments), translateExtent);
    }, null, event);
  };
  zoom2.translateTo = function(selection2, x2, y2, p, event) {
    zoom2.transform(selection2, function() {
      var e = extent2.apply(this, arguments), t = this.__zoom, p02 = p == null ? centroid2(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(identity.translate(p02[0], p02[1]).scale(t.k).translate(
        typeof x2 === "function" ? -x2.apply(this, arguments) : -x2,
        typeof y2 === "function" ? -y2.apply(this, arguments) : -y2
      ), e, translateExtent);
    }, p, event);
  };
  function scale(transform2, k2) {
    k2 = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k2));
    return k2 === transform2.k ? transform2 : new Transform(k2, transform2.x, transform2.y);
  }
  function translate(transform2, p02, p1) {
    var x2 = p02[0] - p1[0] * transform2.k, y2 = p02[1] - p1[1] * transform2.k;
    return x2 === transform2.x && y2 === transform2.y ? transform2 : new Transform(transform2.k, x2, y2);
  }
  function centroid2(extent3) {
    return [(+extent3[0][0] + +extent3[1][0]) / 2, (+extent3[0][1] + +extent3[1][1]) / 2];
  }
  function schedule2(transition, transform2, point, event) {
    transition.on("start.zoom", function() {
      gesture(this, arguments).event(event).start();
    }).on("interrupt.zoom end.zoom", function() {
      gesture(this, arguments).event(event).end();
    }).tween("zoom", function() {
      var that = this, args = arguments, g2 = gesture(that, args).event(event), e = extent2.apply(that, args), p = point == null ? centroid2(e) : typeof point === "function" ? point.apply(that, args) : point, w2 = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]), a = that.__zoom, b2 = typeof transform2 === "function" ? transform2.apply(that, args) : transform2, i = interpolate2(a.invert(p).concat(w2 / a.k), b2.invert(p).concat(w2 / b2.k));
      return function(t) {
        if (t === 1) t = b2;
        else {
          var l = i(t), k2 = w2 / l[2];
          t = new Transform(k2, p[0] - l[0] * k2, p[1] - l[1] * k2);
        }
        g2.zoom(null, t);
      };
    });
  }
  function gesture(that, args, clean) {
    return !clean && that.__zooming || new Gesture(that, args);
  }
  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent2.apply(that, args);
    this.taps = 0;
  }
  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform2) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform2.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform2.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform2.invert(this.touch1[0]);
      this.that.__zoom = transform2;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = select(this.that).datum();
      listeners.call(
        type,
        this.that,
        new ZoomEvent(type, {
          sourceEvent: this.sourceEvent,
          target: zoom2,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };
  function wheeled(event, ...args) {
    if (!filter2.apply(this, arguments)) return;
    var g2 = gesture(this, args).event(event), t = this.__zoom, k2 = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))), p = pointer(event);
    if (g2.wheel) {
      if (g2.mouse[0][0] !== p[0] || g2.mouse[0][1] !== p[1]) {
        g2.mouse[1] = t.invert(g2.mouse[0] = p);
      }
      clearTimeout(g2.wheel);
    } else if (t.k === k2) return;
    else {
      g2.mouse = [p, t.invert(p)];
      interrupt(this);
      g2.start();
    }
    noevent(event);
    g2.wheel = setTimeout(wheelidled, wheelDelay);
    g2.zoom("mouse", constrain(translate(scale(t, k2), g2.mouse[0], g2.mouse[1]), g2.extent, translateExtent));
    function wheelidled() {
      g2.wheel = null;
      g2.end();
    }
  }
  function mousedowned(event, ...args) {
    if (touchending || !filter2.apply(this, arguments)) return;
    var g2 = gesture(this, args, true).event(event), v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true), p = pointer(event, currentTarget), currentTarget = event.currentTarget, x02 = event.clientX, y02 = event.clientY;
    dragDisable(event.view);
    nopropagation(event);
    g2.mouse = [p, this.__zoom.invert(p)];
    interrupt(this);
    g2.start();
    function mousemoved(event2) {
      noevent(event2);
      if (!g2.moved) {
        var dx = event2.clientX - x02, dy = event2.clientY - y02;
        g2.moved = dx * dx + dy * dy > clickDistance2;
      }
      g2.event(event2).zoom("mouse", constrain(translate(g2.that.__zoom, g2.mouse[0] = pointer(event2, currentTarget), g2.mouse[1]), g2.extent, translateExtent));
    }
    function mouseupped(event2) {
      v.on("mousemove.zoom mouseup.zoom", null);
      yesdrag(event2.view, g2.moved);
      noevent(event2);
      g2.event(event2).end();
    }
  }
  function dblclicked(event, ...args) {
    if (!filter2.apply(this, arguments)) return;
    var t0 = this.__zoom, p02 = pointer(event.changedTouches ? event.changedTouches[0] : event, this), p1 = t0.invert(p02), k1 = t0.k * (event.shiftKey ? 0.5 : 2), t1 = constrain(translate(scale(t0, k1), p02, p1), extent2.apply(this, args), translateExtent);
    noevent(event);
    if (duration > 0) select(this).transition().duration(duration).call(schedule2, t1, p02, event);
    else select(this).call(zoom2.transform, t1, p02, event);
  }
  function touchstarted(event, ...args) {
    if (!filter2.apply(this, arguments)) return;
    var touches = event.touches, n = touches.length, g2 = gesture(this, args, event.changedTouches.length === n).event(event), started, i, t, p;
    nopropagation(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g2.touch0) g2.touch0 = p, started = true, g2.taps = 1 + !!touchstarting;
      else if (!g2.touch1 && g2.touch0[2] !== p[2]) g2.touch1 = p, g2.taps = 0;
    }
    if (touchstarting) touchstarting = clearTimeout(touchstarting);
    if (started) {
      if (g2.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() {
        touchstarting = null;
      }, touchDelay);
      interrupt(this);
      g2.start();
    }
  }
  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g2 = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t, p, l;
    noevent(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = pointer(t, this);
      if (g2.touch0 && g2.touch0[2] === t.identifier) g2.touch0[0] = p;
      else if (g2.touch1 && g2.touch1[2] === t.identifier) g2.touch1[0] = p;
    }
    t = g2.that.__zoom;
    if (g2.touch1) {
      var p02 = g2.touch0[0], l0 = g2.touch0[1], p1 = g2.touch1[0], l1 = g2.touch1[1], dp = (dp = p1[0] - p02[0]) * dp + (dp = p1[1] - p02[1]) * dp, dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p02[0] + p1[0]) / 2, (p02[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    } else if (g2.touch0) p = g2.touch0[0], l = g2.touch0[1];
    else return;
    g2.zoom("touch", constrain(translate(t, p, l), g2.extent, translateExtent));
  }
  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g2 = gesture(this, args).event(event), touches = event.changedTouches, n = touches.length, i, t;
    nopropagation(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() {
      touchending = null;
    }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g2.touch0 && g2.touch0[2] === t.identifier) delete g2.touch0;
      else if (g2.touch1 && g2.touch1[2] === t.identifier) delete g2.touch1;
    }
    if (g2.touch1 && !g2.touch0) g2.touch0 = g2.touch1, delete g2.touch1;
    if (g2.touch0) g2.touch0[1] = this.__zoom.invert(g2.touch0[0]);
    else {
      g2.end();
      if (g2.taps === 2) {
        t = pointer(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = select(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }
  zoom2.wheelDelta = function(_2) {
    return arguments.length ? (wheelDelta = typeof _2 === "function" ? _2 : constant(+_2), zoom2) : wheelDelta;
  };
  zoom2.filter = function(_2) {
    return arguments.length ? (filter2 = typeof _2 === "function" ? _2 : constant(!!_2), zoom2) : filter2;
  };
  zoom2.touchable = function(_2) {
    return arguments.length ? (touchable = typeof _2 === "function" ? _2 : constant(!!_2), zoom2) : touchable;
  };
  zoom2.extent = function(_2) {
    return arguments.length ? (extent2 = typeof _2 === "function" ? _2 : constant([[+_2[0][0], +_2[0][1]], [+_2[1][0], +_2[1][1]]]), zoom2) : extent2;
  };
  zoom2.scaleExtent = function(_2) {
    return arguments.length ? (scaleExtent[0] = +_2[0], scaleExtent[1] = +_2[1], zoom2) : [scaleExtent[0], scaleExtent[1]];
  };
  zoom2.translateExtent = function(_2) {
    return arguments.length ? (translateExtent[0][0] = +_2[0][0], translateExtent[1][0] = +_2[1][0], translateExtent[0][1] = +_2[0][1], translateExtent[1][1] = +_2[1][1], zoom2) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };
  zoom2.constrain = function(_2) {
    return arguments.length ? (constrain = _2, zoom2) : constrain;
  };
  zoom2.duration = function(_2) {
    return arguments.length ? (duration = +_2, zoom2) : duration;
  };
  zoom2.interpolate = function(_2) {
    return arguments.length ? (interpolate2 = _2, zoom2) : interpolate2;
  };
  zoom2.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom2 : value;
  };
  zoom2.clickDistance = function(_2) {
    return arguments.length ? (clickDistance2 = (_2 = +_2) * _2, zoom2) : Math.sqrt(clickDistance2);
  };
  zoom2.tapDistance = function(_2) {
    return arguments.length ? (tapDistance = +_2, zoom2) : tapDistance;
  };
  return zoom2;
}
function ownKeys(object2, enumerableOnly) {
  var keys = Object.keys(object2);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object2);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object2, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
var _excluded$a = ["width", "height", "projection", "projectionConfig"];
var geoPath = index, projections = _objectWithoutProperties(d3Geo, ["geoPath"]);
var MapContext = reactExports.createContext();
var makeProjection = function makeProjection2(_ref) {
  var _ref$projectionConfig = _ref.projectionConfig, projectionConfig = _ref$projectionConfig === void 0 ? {} : _ref$projectionConfig, _ref$projection = _ref.projection, projection2 = _ref$projection === void 0 ? "geoEqualEarth" : _ref$projection, _ref$width = _ref.width, width = _ref$width === void 0 ? 800 : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? 600 : _ref$height;
  var isFunc = typeof projection2 === "function";
  if (isFunc) return projection2;
  var proj = projections[projection2]().translate([width / 2, height / 2]);
  var supported = [proj.center ? "center" : null, proj.rotate ? "rotate" : null, proj.scale ? "scale" : null, proj.parallels ? "parallels" : null];
  supported.forEach(function(d) {
    if (!d) return;
    proj = proj[d](projectionConfig[d] || proj[d]());
  });
  return proj;
};
var MapProvider = function MapProvider2(_ref2) {
  var width = _ref2.width, height = _ref2.height, projection2 = _ref2.projection, projectionConfig = _ref2.projectionConfig, restProps = _objectWithoutProperties(_ref2, _excluded$a);
  var _ref3 = projectionConfig.center || [], _ref4 = _slicedToArray(_ref3, 2), cx = _ref4[0], cy = _ref4[1];
  var _ref5 = projectionConfig.rotate || [], _ref6 = _slicedToArray(_ref5, 3), rx = _ref6[0], ry = _ref6[1], rz = _ref6[2];
  var _ref7 = projectionConfig.parallels || [], _ref8 = _slicedToArray(_ref7, 2), p1 = _ref8[0], p2 = _ref8[1];
  var s = projectionConfig.scale || null;
  var projMemo = reactExports.useMemo(function() {
    return makeProjection({
      projectionConfig: {
        center: cx || cx === 0 || cy || cy === 0 ? [cx, cy] : null,
        rotate: rx || rx === 0 || ry || ry === 0 ? [rx, ry, rz] : null,
        parallels: p1 || p1 === 0 || p2 || p2 === 0 ? [p1, p2] : null,
        scale: s
      },
      projection: projection2,
      width,
      height
    });
  }, [width, height, projection2, cx, cy, rx, ry, rz, p1, p2, s]);
  var proj = reactExports.useCallback(projMemo, [projMemo]);
  var value = reactExports.useMemo(function() {
    return {
      width,
      height,
      projection: proj,
      path: geoPath().projection(proj)
    };
  }, [width, height, proj]);
  return /* @__PURE__ */ React.createElement(MapContext.Provider, _extends({
    value
  }, restProps));
};
MapProvider.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  projection: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  projectionConfig: PropTypes.object
};
var _excluded$9 = ["width", "height", "projection", "projectionConfig", "className"];
var ComposableMap = reactExports.forwardRef(function(_ref, ref) {
  var _ref$width = _ref.width, width = _ref$width === void 0 ? 800 : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? 600 : _ref$height, _ref$projection = _ref.projection, projection2 = _ref$projection === void 0 ? "geoEqualEarth" : _ref$projection, _ref$projectionConfig = _ref.projectionConfig, projectionConfig = _ref$projectionConfig === void 0 ? {} : _ref$projectionConfig, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = _objectWithoutProperties(_ref, _excluded$9);
  return /* @__PURE__ */ React.createElement(MapProvider, {
    width,
    height,
    projection: projection2,
    projectionConfig
  }, /* @__PURE__ */ React.createElement("svg", _extends({
    ref,
    viewBox: "0 0 ".concat(width, " ").concat(height),
    className: "rsm-svg ".concat(className)
  }, restProps)));
});
ComposableMap.displayName = "ComposableMap";
ComposableMap.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  projection: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  projectionConfig: PropTypes.object,
  className: PropTypes.string
};
function getCoords(w2, h, t) {
  var xOffset = (w2 * t.k - w2) / 2;
  var yOffset = (h * t.k - h) / 2;
  return [w2 / 2 - (xOffset + t.x) / t.k, h / 2 - (yOffset + t.y) / t.k];
}
function fetchGeographies(url) {
  return fetch(url).then(function(res) {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res.json();
  })["catch"](function(error) {
    console.log("There was a problem when fetching the data: ", error);
  });
}
function getFeatures(geographies, parseGeographies) {
  var isTopojson = geographies.type === "Topology";
  if (!isTopojson) {
    return parseGeographies ? parseGeographies(geographies.features || geographies) : geographies.features || geographies;
  }
  var feats = feature(geographies, geographies.objects[Object.keys(geographies.objects)[0]]).features;
  return parseGeographies ? parseGeographies(feats) : feats;
}
function getMesh(geographies) {
  var isTopojson = geographies.type === "Topology";
  if (!isTopojson) return null;
  var outline = mesh(geographies, geographies.objects[Object.keys(geographies.objects)[0]], function(a, b2) {
    return a === b2;
  });
  var borders = mesh(geographies, geographies.objects[Object.keys(geographies.objects)[0]], function(a, b2) {
    return a !== b2;
  });
  return {
    outline,
    borders
  };
}
function prepareMesh(outline, borders, path) {
  return outline && borders ? {
    outline: _objectSpread2(_objectSpread2({}, outline), {}, {
      rsmKey: "outline",
      svgPath: path(outline)
    }),
    borders: _objectSpread2(_objectSpread2({}, borders), {}, {
      rsmKey: "borders",
      svgPath: path(borders)
    })
  } : {};
}
function prepareFeatures(geographies, path) {
  return geographies ? geographies.map(function(d, i) {
    return _objectSpread2(_objectSpread2({}, d), {}, {
      rsmKey: "geo-".concat(i),
      svgPath: path(d)
    });
  }) : [];
}
function createConnectorPath() {
  var dx = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 30;
  var dy = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 30;
  var curve = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.5;
  var curvature = Array.isArray(curve) ? curve : [curve, curve];
  var curveX = dx / 2 * curvature[0];
  var curveY = dy / 2 * curvature[1];
  return "M".concat(0, ",", 0, " Q", -dx / 2 - curveX, ",").concat(-dy / 2 + curveY, " ").concat(-dx, ",").concat(-dy);
}
function isString(geo) {
  return typeof geo === "string";
}
function useGeographies(_ref) {
  var geography = _ref.geography, parseGeographies = _ref.parseGeographies;
  var _useContext = reactExports.useContext(MapContext), path = _useContext.path;
  var _useState = reactExports.useState({}), _useState2 = _slicedToArray(_useState, 2), output = _useState2[0], setOutput = _useState2[1];
  reactExports.useEffect(function() {
    if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "undefined") return;
    if (!geography) return;
    if (isString(geography)) {
      fetchGeographies(geography).then(function(geos) {
        if (geos) {
          setOutput({
            geographies: getFeatures(geos, parseGeographies),
            mesh: getMesh(geos)
          });
        }
      });
    } else {
      setOutput({
        geographies: getFeatures(geography, parseGeographies),
        mesh: getMesh(geography)
      });
    }
  }, [geography, parseGeographies]);
  var _useMemo = reactExports.useMemo(function() {
    var mesh2 = output.mesh || {};
    var preparedMesh = prepareMesh(mesh2.outline, mesh2.borders, path);
    return {
      geographies: prepareFeatures(output.geographies, path),
      outline: preparedMesh.outline,
      borders: preparedMesh.borders
    };
  }, [output, path]), geographies = _useMemo.geographies, outline = _useMemo.outline, borders = _useMemo.borders;
  return {
    geographies,
    outline,
    borders
  };
}
var _excluded$8 = ["geography", "children", "parseGeographies", "className"];
var Geographies = reactExports.forwardRef(function(_ref, ref) {
  var geography = _ref.geography, children2 = _ref.children, parseGeographies = _ref.parseGeographies, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = _objectWithoutProperties(_ref, _excluded$8);
  var _useContext = reactExports.useContext(MapContext), path = _useContext.path, projection2 = _useContext.projection;
  var _useGeographies = useGeographies({
    geography,
    parseGeographies
  }), geographies = _useGeographies.geographies, outline = _useGeographies.outline, borders = _useGeographies.borders;
  return /* @__PURE__ */ React.createElement("g", _extends({
    ref,
    className: "rsm-geographies ".concat(className)
  }, restProps), geographies && geographies.length > 0 && children2({
    geographies,
    outline,
    borders,
    path,
    projection: projection2
  }));
});
Geographies.displayName = "Geographies";
Geographies.propTypes = {
  geography: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]),
  children: PropTypes.func,
  parseGeographies: PropTypes.func,
  className: PropTypes.string
};
var _excluded$7 = ["geography", "onMouseEnter", "onMouseLeave", "onMouseDown", "onMouseUp", "onFocus", "onBlur", "style", "className"];
var Geography = reactExports.forwardRef(function(_ref, ref) {
  var geography = _ref.geography, onMouseEnter = _ref.onMouseEnter, onMouseLeave = _ref.onMouseLeave, onMouseDown = _ref.onMouseDown, onMouseUp = _ref.onMouseUp, onFocus = _ref.onFocus, onBlur = _ref.onBlur, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = _objectWithoutProperties(_ref, _excluded$7);
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray(_useState, 2), isPressed = _useState2[0], setPressed = _useState2[1];
  var _useState3 = reactExports.useState(false), _useState4 = _slicedToArray(_useState3, 2), isFocused = _useState4[0], setFocus = _useState4[1];
  function handleMouseEnter(evt) {
    setFocus(true);
    if (onMouseEnter) onMouseEnter(evt);
  }
  function handleMouseLeave(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onMouseLeave) onMouseLeave(evt);
  }
  function handleFocus(evt) {
    setFocus(true);
    if (onFocus) onFocus(evt);
  }
  function handleBlur(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onBlur) onBlur(evt);
  }
  function handleMouseDown(evt) {
    setPressed(true);
    if (onMouseDown) onMouseDown(evt);
  }
  function handleMouseUp(evt) {
    setPressed(false);
    if (onMouseUp) onMouseUp(evt);
  }
  return /* @__PURE__ */ React.createElement("path", _extends({
    ref,
    tabIndex: "0",
    className: "rsm-geography ".concat(className),
    d: geography.svgPath,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    style: style[isPressed || isFocused ? isPressed ? "pressed" : "hover" : "default"]
  }, restProps));
});
Geography.displayName = "Geography";
Geography.propTypes = {
  geography: PropTypes.object,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
};
var Geography$1 = reactExports.memo(Geography);
var _excluded$6 = ["fill", "stroke", "step", "className"];
var Graticule = reactExports.forwardRef(function(_ref, ref) {
  var _ref$fill = _ref.fill, fill = _ref$fill === void 0 ? "transparent" : _ref$fill, _ref$stroke = _ref.stroke, stroke = _ref$stroke === void 0 ? "currentcolor" : _ref$stroke, _ref$step = _ref.step, step = _ref$step === void 0 ? [10, 10] : _ref$step, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = _objectWithoutProperties(_ref, _excluded$6);
  var _useContext = reactExports.useContext(MapContext), path = _useContext.path;
  return /* @__PURE__ */ React.createElement("path", _extends({
    ref,
    d: path(graticule().step(step)()),
    fill,
    stroke,
    className: "rsm-graticule ".concat(className)
  }, restProps));
});
Graticule.displayName = "Graticule";
Graticule.propTypes = {
  fill: PropTypes.string,
  stroke: PropTypes.string,
  step: PropTypes.array,
  className: PropTypes.string
};
reactExports.memo(Graticule);
var _excluded$5 = ["value"];
var ZoomPanContext = reactExports.createContext();
var defaultValue = {
  x: 0,
  y: 0,
  k: 1,
  transformString: "translate(0 0) scale(1)"
};
var ZoomPanProvider = function ZoomPanProvider2(_ref) {
  var _ref$value = _ref.value, value = _ref$value === void 0 ? defaultValue : _ref$value, restProps = _objectWithoutProperties(_ref, _excluded$5);
  return /* @__PURE__ */ React.createElement(ZoomPanContext.Provider, _extends({
    value
  }, restProps));
};
ZoomPanProvider.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  k: PropTypes.number,
  transformString: PropTypes.string
};
function useZoomPan(_ref) {
  var center = _ref.center, filterZoomEvent = _ref.filterZoomEvent, onMoveStart = _ref.onMoveStart, onMoveEnd = _ref.onMoveEnd, onMove = _ref.onMove, _ref$translateExtent = _ref.translateExtent, translateExtent = _ref$translateExtent === void 0 ? [[-Infinity, -Infinity], [Infinity, Infinity]] : _ref$translateExtent, _ref$scaleExtent = _ref.scaleExtent, scaleExtent = _ref$scaleExtent === void 0 ? [1, 8] : _ref$scaleExtent, _ref$zoom = _ref.zoom, zoom$1 = _ref$zoom === void 0 ? 1 : _ref$zoom;
  var _useContext = reactExports.useContext(MapContext), width = _useContext.width, height = _useContext.height, projection2 = _useContext.projection;
  var _center = _slicedToArray(center, 2), lon = _center[0], lat = _center[1];
  var _useState = reactExports.useState({
    x: 0,
    y: 0,
    k: 1
  }), _useState2 = _slicedToArray(_useState, 2), position = _useState2[0], setPosition = _useState2[1];
  var lastPosition = reactExports.useRef({
    x: 0,
    y: 0,
    k: 1
  });
  var mapRef = reactExports.useRef();
  var zoomRef = reactExports.useRef();
  var bypassEvents = reactExports.useRef(false);
  var _translateExtent = _slicedToArray(translateExtent, 2), a = _translateExtent[0], b2 = _translateExtent[1];
  var _a = _slicedToArray(a, 2), a1 = _a[0], a2 = _a[1];
  var _b = _slicedToArray(b2, 2), b1 = _b[0], b22 = _b[1];
  var _scaleExtent = _slicedToArray(scaleExtent, 2), minZoom = _scaleExtent[0], maxZoom = _scaleExtent[1];
  reactExports.useEffect(function() {
    var svg = select(mapRef.current);
    function handleZoomStart(d3Event) {
      if (!onMoveStart || bypassEvents.current) return;
      onMoveStart({
        coordinates: projection2.invert(getCoords(width, height, d3Event.transform)),
        zoom: d3Event.transform.k
      }, d3Event);
    }
    function handleZoom(d3Event) {
      if (bypassEvents.current) return;
      var transform2 = d3Event.transform, sourceEvent2 = d3Event.sourceEvent;
      setPosition({
        x: transform2.x,
        y: transform2.y,
        k: transform2.k,
        dragging: sourceEvent2
      });
      if (!onMove) return;
      onMove({
        x: transform2.x,
        y: transform2.y,
        zoom: transform2.k,
        dragging: sourceEvent2
      }, d3Event);
    }
    function handleZoomEnd(d3Event) {
      if (bypassEvents.current) {
        bypassEvents.current = false;
        return;
      }
      var _projection$invert = projection2.invert(getCoords(width, height, d3Event.transform)), _projection$invert2 = _slicedToArray(_projection$invert, 2), x2 = _projection$invert2[0], y2 = _projection$invert2[1];
      lastPosition.current = {
        x: x2,
        y: y2,
        k: d3Event.transform.k
      };
      if (!onMoveEnd) return;
      onMoveEnd({
        coordinates: [x2, y2],
        zoom: d3Event.transform.k
      }, d3Event);
    }
    function filterFunc(d3Event) {
      if (filterZoomEvent) {
        return filterZoomEvent(d3Event);
      }
      return d3Event ? !d3Event.ctrlKey && !d3Event.button : false;
    }
    var zoom$12 = zoom().filter(filterFunc).scaleExtent([minZoom, maxZoom]).translateExtent([[a1, a2], [b1, b22]]).on("start", handleZoomStart).on("zoom", handleZoom).on("end", handleZoomEnd);
    zoomRef.current = zoom$12;
    svg.call(zoom$12);
  }, [width, height, a1, a2, b1, b22, minZoom, maxZoom, projection2, onMoveStart, onMove, onMoveEnd, filterZoomEvent]);
  reactExports.useEffect(function() {
    if (lon === lastPosition.current.x && lat === lastPosition.current.y && zoom$1 === lastPosition.current.k) return;
    var coords = projection2([lon, lat]);
    var x2 = coords[0] * zoom$1;
    var y2 = coords[1] * zoom$1;
    var svg = select(mapRef.current);
    bypassEvents.current = true;
    svg.call(zoomRef.current.transform, identity.translate(width / 2 - x2, height / 2 - y2).scale(zoom$1));
    setPosition({
      x: width / 2 - x2,
      y: height / 2 - y2,
      k: zoom$1
    });
    lastPosition.current = {
      x: lon,
      y: lat,
      k: zoom$1
    };
  }, [lon, lat, zoom$1, width, height, projection2]);
  return {
    mapRef,
    position,
    transformString: "translate(".concat(position.x, " ").concat(position.y, ") scale(").concat(position.k, ")")
  };
}
var _excluded$4 = ["center", "zoom", "minZoom", "maxZoom", "translateExtent", "filterZoomEvent", "onMoveStart", "onMove", "onMoveEnd", "className"];
var ZoomableGroup = reactExports.forwardRef(function(_ref, ref) {
  var _ref$center = _ref.center, center = _ref$center === void 0 ? [0, 0] : _ref$center, _ref$zoom = _ref.zoom, zoom2 = _ref$zoom === void 0 ? 1 : _ref$zoom, _ref$minZoom = _ref.minZoom, minZoom = _ref$minZoom === void 0 ? 1 : _ref$minZoom, _ref$maxZoom = _ref.maxZoom, maxZoom = _ref$maxZoom === void 0 ? 8 : _ref$maxZoom, translateExtent = _ref.translateExtent, filterZoomEvent = _ref.filterZoomEvent, onMoveStart = _ref.onMoveStart, onMove = _ref.onMove, onMoveEnd = _ref.onMoveEnd, className = _ref.className, restProps = _objectWithoutProperties(_ref, _excluded$4);
  var _useContext = reactExports.useContext(MapContext), width = _useContext.width, height = _useContext.height;
  var _useZoomPan = useZoomPan({
    center,
    filterZoomEvent,
    onMoveStart,
    onMove,
    onMoveEnd,
    scaleExtent: [minZoom, maxZoom],
    translateExtent,
    zoom: zoom2
  }), mapRef = _useZoomPan.mapRef, transformString = _useZoomPan.transformString, position = _useZoomPan.position;
  return /* @__PURE__ */ React.createElement(ZoomPanProvider, {
    value: {
      x: position.x,
      y: position.y,
      k: position.k,
      transformString
    }
  }, /* @__PURE__ */ React.createElement("g", {
    ref: mapRef
  }, /* @__PURE__ */ React.createElement("rect", {
    width,
    height,
    fill: "transparent"
  }), /* @__PURE__ */ React.createElement("g", _extends({
    ref,
    transform: transformString,
    className: "rsm-zoomable-group ".concat(className)
  }, restProps))));
});
ZoomableGroup.displayName = "ZoomableGroup";
ZoomableGroup.propTypes = {
  center: PropTypes.array,
  zoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  translateExtent: PropTypes.arrayOf(PropTypes.array),
  onMoveStart: PropTypes.func,
  onMove: PropTypes.func,
  onMoveEnd: PropTypes.func,
  className: PropTypes.string
};
var _excluded$3 = ["id", "fill", "stroke", "strokeWidth", "className"];
var Sphere = reactExports.forwardRef(function(_ref, ref) {
  var _ref$id = _ref.id, id2 = _ref$id === void 0 ? "rsm-sphere" : _ref$id, _ref$fill = _ref.fill, fill = _ref$fill === void 0 ? "transparent" : _ref$fill, _ref$stroke = _ref.stroke, stroke = _ref$stroke === void 0 ? "currentcolor" : _ref$stroke, _ref$strokeWidth = _ref.strokeWidth, strokeWidth = _ref$strokeWidth === void 0 ? 0.5 : _ref$strokeWidth, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = _objectWithoutProperties(_ref, _excluded$3);
  var _useContext = reactExports.useContext(MapContext), path = _useContext.path;
  var spherePath = reactExports.useMemo(function() {
    return path({
      type: "Sphere"
    });
  }, [path]);
  return /* @__PURE__ */ React.createElement(reactExports.Fragment, null, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
    id: id2
  }, /* @__PURE__ */ React.createElement("path", {
    d: spherePath
  }))), /* @__PURE__ */ React.createElement("path", _extends({
    ref,
    d: spherePath,
    fill,
    stroke,
    strokeWidth,
    style: {
      pointerEvents: "none"
    },
    className: "rsm-sphere ".concat(className)
  }, restProps)));
});
Sphere.displayName = "Sphere";
Sphere.propTypes = {
  id: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string
};
reactExports.memo(Sphere);
var _excluded$2 = ["coordinates", "children", "onMouseEnter", "onMouseLeave", "onMouseDown", "onMouseUp", "onFocus", "onBlur", "style", "className"];
var Marker = reactExports.forwardRef(function(_ref, ref) {
  var coordinates2 = _ref.coordinates, children2 = _ref.children, onMouseEnter = _ref.onMouseEnter, onMouseLeave = _ref.onMouseLeave, onMouseDown = _ref.onMouseDown, onMouseUp = _ref.onMouseUp, onFocus = _ref.onFocus, onBlur = _ref.onBlur, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = _objectWithoutProperties(_ref, _excluded$2);
  var _useContext = reactExports.useContext(MapContext), projection2 = _useContext.projection;
  var _useState = reactExports.useState(false), _useState2 = _slicedToArray(_useState, 2), isPressed = _useState2[0], setPressed = _useState2[1];
  var _useState3 = reactExports.useState(false), _useState4 = _slicedToArray(_useState3, 2), isFocused = _useState4[0], setFocus = _useState4[1];
  var _projection = projection2(coordinates2), _projection2 = _slicedToArray(_projection, 2), x2 = _projection2[0], y2 = _projection2[1];
  function handleMouseEnter(evt) {
    setFocus(true);
    if (onMouseEnter) onMouseEnter(evt);
  }
  function handleMouseLeave(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onMouseLeave) onMouseLeave(evt);
  }
  function handleFocus(evt) {
    setFocus(true);
    if (onFocus) onFocus(evt);
  }
  function handleBlur(evt) {
    setFocus(false);
    if (isPressed) setPressed(false);
    if (onBlur) onBlur(evt);
  }
  function handleMouseDown(evt) {
    setPressed(true);
    if (onMouseDown) onMouseDown(evt);
  }
  function handleMouseUp(evt) {
    setPressed(false);
    if (onMouseUp) onMouseUp(evt);
  }
  return /* @__PURE__ */ React.createElement("g", _extends({
    ref,
    transform: "translate(".concat(x2, ", ").concat(y2, ")"),
    className: "rsm-marker ".concat(className),
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    style: style[isPressed || isFocused ? isPressed ? "pressed" : "hover" : "default"]
  }, restProps), children2);
});
Marker.displayName = "Marker";
Marker.propTypes = {
  coordinates: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
};
var _excluded$1 = ["from", "to", "coordinates", "stroke", "strokeWidth", "fill", "className"];
var Line = reactExports.forwardRef(function(_ref, ref) {
  var _ref$from = _ref.from, from = _ref$from === void 0 ? [0, 0] : _ref$from, _ref$to = _ref.to, to = _ref$to === void 0 ? [0, 0] : _ref$to, coordinates2 = _ref.coordinates, _ref$stroke = _ref.stroke, stroke = _ref$stroke === void 0 ? "currentcolor" : _ref$stroke, _ref$strokeWidth = _ref.strokeWidth, strokeWidth = _ref$strokeWidth === void 0 ? 3 : _ref$strokeWidth, _ref$fill = _ref.fill, fill = _ref$fill === void 0 ? "transparent" : _ref$fill, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = _objectWithoutProperties(_ref, _excluded$1);
  var _useContext = reactExports.useContext(MapContext), path = _useContext.path;
  var lineData = {
    type: "LineString",
    coordinates: coordinates2 || [from, to]
  };
  return /* @__PURE__ */ React.createElement("path", _extends({
    ref,
    d: path(lineData),
    className: "rsm-line ".concat(className),
    stroke,
    strokeWidth,
    fill
  }, restProps));
});
Line.displayName = "Line";
Line.propTypes = {
  from: PropTypes.array,
  to: PropTypes.array,
  coordinates: PropTypes.array,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  fill: PropTypes.string,
  className: PropTypes.string
};
var _excluded = ["subject", "children", "connectorProps", "dx", "dy", "curve", "className"];
var Annotation = reactExports.forwardRef(function(_ref, ref) {
  var subject = _ref.subject, children2 = _ref.children, connectorProps = _ref.connectorProps, _ref$dx = _ref.dx, dx = _ref$dx === void 0 ? 30 : _ref$dx, _ref$dy = _ref.dy, dy = _ref$dy === void 0 ? 30 : _ref$dy, _ref$curve = _ref.curve, curve = _ref$curve === void 0 ? 0 : _ref$curve, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, restProps = _objectWithoutProperties(_ref, _excluded);
  var _useContext = reactExports.useContext(MapContext), projection2 = _useContext.projection;
  var _projection = projection2(subject), _projection2 = _slicedToArray(_projection, 2), x2 = _projection2[0], y2 = _projection2[1];
  var connectorPath = createConnectorPath(dx, dy, curve);
  return /* @__PURE__ */ React.createElement("g", _extends({
    ref,
    transform: "translate(".concat(x2 + dx, ", ").concat(y2 + dy, ")"),
    className: "rsm-annotation ".concat(className)
  }, restProps), /* @__PURE__ */ React.createElement("path", _extends({
    d: connectorPath,
    fill: "transparent",
    stroke: "#000"
  }, connectorProps)), children2);
});
Annotation.displayName = "Annotation";
Annotation.propTypes = {
  subject: PropTypes.array,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  dx: PropTypes.number,
  dy: PropTypes.number,
  curve: PropTypes.number,
  connectorProps: PropTypes.object,
  className: PropTypes.string
};
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp(start2, value, end) {
  return max(start2, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length2 = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length2] > rects.floating[length2]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
const lrPlacement = ["left", "right"];
const rlPlacement = ["right", "left"];
const tbPlacement = ["top", "bottom"];
const btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x2,
    y: y2,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y2,
    left: x2,
    right: x2 + width,
    bottom: y2 + height,
    x: x2,
    y: y2
  };
}
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x2,
    y: y2,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
const MAX_RESET_COUNT = 50;
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x2,
    y: y2
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i = 0; i < middleware.length; i++) {
    const currentMiddleware = middleware[i];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x2,
      y: y2,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x2 = nextX != null ? nextX : x2;
    y2 = nextY != null ? nextY : y2;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x2,
          y: y2
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x: x2,
    y: y2,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
const arrow$1 = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x2,
      y: y2,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x2,
      y: y2
    };
    const axis = getAlignmentAxis(placement);
    const length2 = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length2] + rects.reference[axis] - coords[axis] - rects.floating[length2];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length2];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length2] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const min$1 = minPadding;
    const max2 = clientSize - arrowDimensions[length2] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length2] / 2 + centerToReference;
    const offset2 = clamp(min$1, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length2] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length2] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset2,
        centerOffset: center - offset2 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
const flip$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b2) => a.overflows[1] - b2.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b2) => a[1] - b2[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
const originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$1 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x2,
        y: y2,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x2 + diffCoords.x,
        y: y2 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$1 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x2,
        y: y2,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x3,
              y: y3
            } = _ref;
            return {
              x: x3,
              y: y3
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x2,
        y: y2
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x2,
          y: limitedCoords.y - y2,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
const willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
const containRe = /paint|layout|strict|content/;
const isNotNone = (value) => !!value && value !== "none";
let isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $2
  } = getCssDimensions(domElement);
  let x2 = ($2 ? round(rect.width) : rect.width) / width;
  let y2 = ($2 ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x: x2,
    y: y2
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y2 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y: y2
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x2 = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y2 = htmlRect.top + scroll.scrollTop;
  return {
    x: x2,
    y: y2
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x2 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
const SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const clippingStableScrollbarWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    if (clippingStableScrollbarWidth <= SCROLLBAR_MAX) {
      width -= clippingStableScrollbarWidth;
    }
  } else if (windowScrollbarX <= SCROLLBAR_MAX) {
    width += windowScrollbarX;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && (currentContainingBlockComputedStyle.position === "absolute" || currentContainingBlockComputedStyle.position === "fixed") || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i = 1; i < clippingAncestors.length; i++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x2 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y2 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x2,
    y: y2,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a, b2) {
  return a.x === b2.x && a.y === b2.y && a.width === b2.width && a.height === b2.height;
}
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root2 = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root2.clientWidth - (left + width));
    const insetBottom = floor(root2.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        refresh();
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root2.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const offset = offset$1;
const shift = shift$1;
const flip = flip$1;
const arrow = arrow$1;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var define_process_env_default = {};
const y = { core: false, base: false };
function w({ css: e2, id: t2 = "react-tooltip-base-styles", type: o2 = "base", ref: r2, state: n2 = {} }) {
  if (!e2 || "undefined" == typeof document || (void 0 !== n2[o2] ? n2[o2] : y[o2])) return;
  if ("core" === o2 && "undefined" != typeof process && define_process_env_default && define_process_env_default.REACT_TOOLTIP_DISABLE_CORE_STYLES) return;
  if ("base" === o2 && "undefined" != typeof process && define_process_env_default && define_process_env_default.REACT_TOOLTIP_DISABLE_BASE_STYLES) return;
  "core" === o2 && (t2 = "react-tooltip-core-styles"), r2 || (r2 = {});
  const { insertAt: l2 } = r2;
  if (document.getElementById(t2)) return;
  const c2 = document.head || document.getElementsByTagName("head")[0], i2 = document.createElement("style");
  i2.id = t2, i2.type = "text/css", "top" === l2 && c2.firstChild ? c2.insertBefore(i2, c2.firstChild) : c2.appendChild(i2), i2.styleSheet ? i2.styleSheet.cssText = e2 : i2.appendChild(document.createTextNode(e2)), void 0 !== n2[o2] ? n2[o2] = true : y[o2] = true;
}
const b = flip({ fallbackAxisSideDirection: "start" }), S = shift({ padding: 5 }), g = async ({ elementReference: e2 = null, tooltipReference: t2 = null, tooltipArrowReference: o2 = null, place: r2 = "top", offset: n2 = 10, strategy: l2 = "absolute", middlewares: c2 = [offset(Number(n2)), b, S], border: i2, arrowSize: s2 = 8 }) => {
  if (!e2) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: r2 };
  if (null === t2) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: r2 };
  const u2 = [...c2];
  return o2 ? (u2.push(arrow({ element: o2, padding: 5 })), computePosition(e2, t2, { placement: r2, strategy: l2, middleware: u2 }).then(({ x: e3, y: t3, placement: o3, middlewareData: r3 }) => {
    var n3, l3;
    const c3 = { left: `${e3}px`, top: `${t3}px`, border: i2 }, { x: u3, y: a2 } = null !== (n3 = r3.arrow) && void 0 !== n3 ? n3 : { x: 0, y: 0 }, d2 = null !== (l3 = { top: "bottom", right: "left", bottom: "top", left: "right" }[o3.split("-")[0]]) && void 0 !== l3 ? l3 : "bottom", p2 = i2 && { borderBottom: i2, borderRight: i2 };
    let v2 = 0;
    if (i2) {
      const e4 = `${i2}`.match(/(\d+)px/);
      v2 = (null == e4 ? void 0 : e4[1]) ? Number(e4[1]) : 1;
    }
    return { tooltipStyles: c3, tooltipArrowStyles: { left: null != u3 ? `${u3}px` : "", top: null != a2 ? `${a2}px` : "", right: "", bottom: "", ...p2, [d2]: `-${s2 / 2 + v2 - 1}px` }, place: o3 };
  })) : computePosition(e2, t2, { placement: "bottom", strategy: l2, middleware: u2 }).then(({ x: e3, y: t3, placement: o3 }) => ({ tooltipStyles: { left: `${e3}px`, top: `${t3}px` }, tooltipArrowStyles: {}, place: o3 }));
}, A = (e2, t2, o2) => {
  let r2 = null, n2 = e2;
  const l2 = function(...e3) {
    const o3 = () => {
      r2 = null;
    };
    r2 || (n2.apply(this, e3), r2 = setTimeout(o3, t2));
  };
  return l2.cancel = () => {
    r2 && (clearTimeout(r2), r2 = null);
  }, l2.setCallback = (e3) => {
    n2 = e3;
  }, l2;
}, E = (e2) => {
  if (!(e2 instanceof HTMLElement || e2 instanceof SVGElement)) return false;
  const t2 = getComputedStyle(e2);
  return ["overflow", "overflow-x", "overflow-y"].some((e3) => {
    const o2 = t2.getPropertyValue(e3);
    return "auto" === o2 || "scroll" === o2;
  });
}, _ = (e2) => {
  if (!e2) return null;
  let t2 = e2.parentElement;
  for (; t2; ) {
    if (E(t2)) return t2;
    t2 = t2.parentElement;
  }
  return document.scrollingElement || document.documentElement;
}, T = "undefined" != typeof window && void 0 !== window.document && void 0 !== window.document.createElement ? reactExports.useLayoutEffect : reactExports.useEffect, k = (e2) => {
  e2.current && (clearTimeout(e2.current), e2.current = null);
};
var O = { tooltip: "core-styles-module_tooltip__3vRRp", fixed: "core-styles-module_fixed__pcSol", arrow: "core-styles-module_arrow__cvMwQ", content: "core-styles-module_content__BRKdB", noArrow: "core-styles-module_noArrow__xock6", clickable: "core-styles-module_clickable__ZuTTB", show: "core-styles-module_show__Nt9eE", closing: "core-styles-module_closing__sGnxF" }, C = { tooltip: "styles-module_tooltip__mnnfp", content: "styles-module_content__ydYdI", arrow: "styles-module_arrow__K0L3T", dark: "styles-module_dark__xNqje", light: "styles-module_light__Z6W-X", success: "styles-module_success__A2AKt", warning: "styles-module_warning__SCK0X", error: "styles-module_error__JvumD", info: "styles-module_info__BWdHW" };
const R = /* @__PURE__ */ new Map();
let x = null;
function L(e2) {
  const t2 = e2.match(/^\[data-tooltip-id=(['"])((?:\\.|(?!\1).)*)\1\]$/);
  return t2 ? t2[2].replace(/\\(['"])/g, "$1") : null;
}
function N(e2) {
  try {
    return { anchors: Array.from(document.querySelectorAll(e2)), error: null };
  } catch (e3) {
    return { anchors: [], error: e3 instanceof Error ? e3 : new Error(String(e3)) };
  }
}
function B(e2, t2) {
  var o2, r2, n2, l2;
  const c2 = N(e2), i2 = null !== (r2 = null === (o2 = c2.error) || void 0 === o2 ? void 0 : o2.message) && void 0 !== r2 ? r2 : null, s2 = null !== (l2 = null === (n2 = t2.error) || void 0 === n2 ? void 0 : n2.message) && void 0 !== l2 ? l2 : null;
  if (u2 = t2.anchors, a2 = c2.anchors, u2.length === a2.length && u2.every((e3, t3) => e3 === a2[t3]) && i2 === s2) return;
  var u2, a2;
  const d2 = { ...t2, anchors: c2.anchors, error: c2.error };
  R.set(e2, d2), (function(e3) {
    e3.subscribers.forEach((t3) => t3(e3.anchors, e3.error));
  })(d2);
}
let z = false, I = null, $ = false;
function j(e2) {
  if (e2 ? (I || (I = /* @__PURE__ */ new Set()), e2.forEach((e3) => I.add(e3))) : $ = true, z) return;
  z = true;
  const t2 = () => {
    z = false;
    const e3 = $, t3 = I;
    var o2;
    $ = false, I = null, e3 ? R.forEach((e4, t4) => {
      B(t4, e4);
    }) : t3 && t3.size > 0 && (o2 = t3, R.forEach((e4, t4) => {
      (null === e4.tooltipId || o2.has(e4.tooltipId)) && B(t4, e4);
    }));
  };
  "function" == typeof requestAnimationFrame ? requestAnimationFrame(t2) : Promise.resolve().then(t2);
}
function D() {
  x || "undefined" == typeof MutationObserver || (x = new MutationObserver((e2) => {
    const t2 = (function(e3) {
      var t3;
      if (R.size <= 4) return null;
      const o2 = /* @__PURE__ */ new Set();
      for (const r2 of e3) {
        if ("attributes" === r2.type) {
          const e4 = r2.target, n2 = null === (t3 = e4.getAttribute) || void 0 === t3 ? void 0 : t3.call(e4, "data-tooltip-id");
          n2 && o2.add(n2), r2.oldValue && o2.add(r2.oldValue);
          continue;
        }
        if ("childList" === r2.type) {
          const e4 = (e5) => {
            var t4, r3;
            for (let n2 = 0; n2 < e5.length; n2++) {
              const l2 = e5[n2];
              if (l2.nodeType !== Node.ELEMENT_NODE) continue;
              const c2 = l2, i2 = null === (t4 = c2.getAttribute) || void 0 === t4 ? void 0 : t4.call(c2, "data-tooltip-id");
              i2 && o2.add(i2);
              const s2 = null === (r3 = c2.querySelectorAll) || void 0 === r3 ? void 0 : r3.call(c2, "[data-tooltip-id]");
              if (s2) {
                if (s2.length > 50) return true;
                for (let e6 = 0; e6 < s2.length; e6++) {
                  const t5 = s2[e6].getAttribute("data-tooltip-id");
                  t5 && o2.add(t5);
                }
              }
            }
            return false;
          };
          if (e4(r2.addedNodes) || e4(r2.removedNodes)) return null;
          continue;
        }
      }
      return o2;
    })(e2);
    j(t2);
  }), x.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-tooltip-id"], attributeOldValue: true }));
}
function H(e2, t2) {
  let o2 = R.get(e2);
  if (!o2) {
    const t3 = N(e2);
    o2 = { anchors: t3.anchors, error: t3.error, subscribers: /* @__PURE__ */ new Set(), tooltipId: L(e2) }, R.set(e2, o2);
  }
  return o2.subscribers.add(t2), D(), t2([...o2.anchors], o2.error), () => {
    const o3 = R.get(e2);
    o3 && (o3.subscribers.delete(t2), 0 === o3.subscribers.size && R.delete(e2), 0 === R.size && x && (x.disconnect(), x = null));
  };
}
const M = /* @__PURE__ */ new Map();
function P(e2) {
  const t2 = M.get(e2.type);
  t2 && t2.forEach((t3) => {
    t3(e2);
  });
}
function W(e2, t2) {
  const o2 = (function(e3) {
    let t3 = M.get(e3);
    return t3 || (t3 = /* @__PURE__ */ new Set(), M.set(e3, t3), document.addEventListener(e3, P)), t3;
  })(e2);
  return o2.add(t2), () => {
    o2.delete(t2), 0 === o2.size && (M.delete(e2), document.removeEventListener(e2, P));
  };
}
let q = null;
var F = reactExports.memo(({ forwardRef: t2, id: c2, className: d2, classNameArrow: p2, variant: v2 = "dark", portalRoot: m2, anchorSelect: f2, place: y2 = "top", offset: w2 = 10, openOnClick: b2 = false, positionStrategy: S2 = "absolute", middlewares: E2, wrapper: R2, delayShow: x2 = 0, delayHide: L2 = 0, autoClose: N2, float: B2 = false, hidden: z2 = false, noArrow: I2 = false, clickable: $2 = false, openEvents: j2, closeEvents: D2, globalCloseEvents: M2, imperativeModeOnly: P2, style: F2, position: V2, afterShow: K2, afterHide: Y22, disableTooltip: X22, content: G2, contentWrapperRef: Z22, isOpen: J, defaultIsOpen: Q = false, setIsOpen: U, previousActiveAnchor: ee, activeAnchor: te, setActiveAnchor: oe, border: re, opacity: ne, arrowColor: le, arrowSize: ce = 8, role: ie = "tooltip" }) => {
  var se;
  const ue = reactExports.useRef(null), ae = reactExports.useRef(null), de = reactExports.useRef(null), pe = reactExports.useRef(null), ve = reactExports.useRef(null), me = reactExports.useRef(null), [fe, he] = reactExports.useState({ tooltipStyles: {}, tooltipArrowStyles: {}, place: y2 }), [ye, we] = reactExports.useState(false), [be, Se] = reactExports.useState(false), [ge, Ae] = reactExports.useState(null), Ee = reactExports.useRef(false), _e = reactExports.useRef(null), Te = reactExports.useRef(false), ke = reactExports.useRef(false), Oe = reactExports.useRef({ getBoundingClientRect: () => ({ x: 0, y: 0, width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0 }) });
  T(() => (ke.current = true, () => {
    ke.current = false;
  }), []);
  const Ce = reactExports.useCallback((e2) => {
    ke.current && (e2 && Se(true), setTimeout(() => {
      ke.current && (null == U || U(e2), void 0 === J && we(e2));
    }, 10));
  }, [J, U]);
  reactExports.useEffect(() => {
    if (c2) {
      if (ye) {
        t3(ee);
        const o2 = e2(te), r2 = [.../* @__PURE__ */ new Set([...o2, c2])].filter(Boolean).join(" ");
        null == te || te.setAttribute("aria-describedby", r2);
      } else t3(te);
      return () => {
        t3(te), t3(ee);
      };
    }
    function e2(e3) {
      var t4;
      return (null === (t4 = null == e3 ? void 0 : e3.getAttribute("aria-describedby")) || void 0 === t4 ? void 0 : t4.split(" ")) || [];
    }
    function t3(t4) {
      const o2 = e2(t4).filter((e3) => e3 !== c2);
      o2.length ? null == t4 || t4.setAttribute("aria-describedby", o2.join(" ")) : null == t4 || t4.removeAttribute("aria-describedby");
    }
  }, [te, ye, c2, ee]), reactExports.useEffect(() => {
    if (void 0 === J) return () => null;
    J && Se(true);
    const e2 = setTimeout(() => {
      we(J);
    }, 10);
    return () => {
      clearTimeout(e2);
    };
  }, [J]), reactExports.useEffect(() => {
    if (ye !== Ee.current) if (k(me), Ee.current = ye, ye) null == K2 || K2();
    else {
      if (null === q) {
        const e3 = getComputedStyle(document.body);
        q = ((e4) => {
          const t3 = e4.match(/^([\d.]+)(m?s)$/);
          if (!t3) return 0;
          const [, o2, r2] = t3;
          return Number(o2) * ("ms" === r2 ? 1 : 1e3);
        })(e3.getPropertyValue("--rt-transition-show-delay"));
      }
      const e2 = q;
      me.current = setTimeout(() => {
        Se(false), Ae(null), null == Y22 || Y22();
      }, e2 + 25);
    }
  }, [Y22, K2, ye]), reactExports.useEffect(() => (k(ve), !ye || !N2 || N2 <= 0 || (ve.current = setTimeout(() => {
    Ce(false);
  }, N2)), () => {
    k(ve);
  }), [te, N2, Ce, ye]);
  const Re = reactExports.useCallback((e2) => {
    ke.current && he((t3) => t3.place === e2.place && t3.tooltipStyles.left === e2.tooltipStyles.left && t3.tooltipStyles.top === e2.tooltipStyles.top && t3.tooltipStyles.border === e2.tooltipStyles.border && t3.tooltipArrowStyles.left === e2.tooltipArrowStyles.left && t3.tooltipArrowStyles.top === e2.tooltipArrowStyles.top && t3.tooltipArrowStyles.right === e2.tooltipArrowStyles.right && t3.tooltipArrowStyles.bottom === e2.tooltipArrowStyles.bottom && t3.tooltipArrowStyles.borderBottom === e2.tooltipArrowStyles.borderBottom && t3.tooltipArrowStyles.borderRight === e2.tooltipArrowStyles.borderRight ? t3 : e2);
  }, []), xe = reactExports.useRef(be);
  xe.current = be;
  const Le = reactExports.useCallback((e2 = x2) => {
    de.current && clearTimeout(de.current), xe.current ? Ce(true) : de.current = setTimeout(() => {
      Ce(true);
    }, e2);
  }, [x2, Ce]), Ne = reactExports.useCallback((e2 = L2) => {
    pe.current && clearTimeout(pe.current), pe.current = setTimeout(() => {
      Te.current || Ce(false);
    }, e2);
  }, [L2, Ce]), Be = reactExports.useCallback(({ x: e2, y: t3 }) => {
    var o2;
    Oe.current.getBoundingClientRect = () => ({ x: e2, y: t3, width: 0, height: 0, top: t3, left: e2, right: e2, bottom: t3 }), g({ place: null !== (o2 = null == ge ? void 0 : ge.place) && void 0 !== o2 ? o2 : y2, offset: w2, elementReference: Oe.current, tooltipReference: ue.current, tooltipArrowReference: ae.current, strategy: S2, middlewares: E2, border: re, arrowSize: ce }).then((e3) => {
      Re(e3);
    });
  }, [null == ge ? void 0 : ge.place, y2, w2, S2, E2, re, ce, Re]), ze = reactExports.useCallback(() => {
    var e2, t3;
    const o2 = null !== (e2 = null == ge ? void 0 : ge.position) && void 0 !== e2 ? e2 : V2;
    o2 ? Be(o2) : B2 ? _e.current && Be(_e.current) : (null == te ? void 0 : te.isConnected) && g({ place: null !== (t3 = null == ge ? void 0 : ge.place) && void 0 !== t3 ? t3 : y2, offset: w2, elementReference: te, tooltipReference: ue.current, tooltipArrowReference: ae.current, strategy: S2, middlewares: E2, border: re, arrowSize: ce }).then((e3) => {
      ke.current && Re(e3);
    });
  }, [null == ge ? void 0 : ge.position, null == ge ? void 0 : ge.place, V2, B2, te, y2, w2, S2, E2, re, Be, Re, ce]), Ie = reactExports.useCallback(() => {
    Se(false), Ce(false), oe(null), k(de), k(pe), k(ve);
  }, [Ce, oe]), $e = be || Q || Boolean(J) || Boolean(te) || Boolean(null == ge ? void 0 : ge.anchorSelect), { anchorElements: je, selector: De } = (({ id: e2, anchorSelect: t3, imperativeAnchorSelect: c3, activeAnchor: i2, disableTooltip: s2, onActiveAnchorRemoved: u2, trackAnchors: a2 }) => {
    const [d3, p3] = reactExports.useState([]), [v3, m3] = reactExports.useState(null), f3 = reactExports.useRef(null), h2 = reactExports.useMemo(() => (({ id: e3, anchorSelect: t4, imperativeAnchorSelect: o2 }) => {
      var r2;
      let n2 = null !== (r2 = null != o2 ? o2 : t4) && void 0 !== r2 ? r2 : "";
      return !n2 && e3 && (n2 = `[data-tooltip-id='${e3.replace(/'/g, "\\'")}']`), n2;
    })({ id: e2, anchorSelect: t3, imperativeAnchorSelect: c3 }), [e2, t3, c3]), y3 = reactExports.useMemo(() => d3.filter((e3) => !(null == s2 ? void 0 : s2(e3))), [d3, s2]), w3 = reactExports.useMemo(() => {
      if (!i2 || !h2) return false;
      try {
        return i2.matches(h2);
      } catch (e3) {
        return false;
      }
    }, [i2, h2, y3]);
    return reactExports.useEffect(() => h2 && a2 ? H(h2, (e3, t4) => {
      p3(e3), m3(t4);
    }) : (p3([]), void m3(null)), [h2, a2]), reactExports.useEffect(() => {
      v3 && f3.current !== h2 && (f3.current = h2);
    }, [h2, v3]), reactExports.useEffect(() => {
      i2 && (i2.isConnected && (y3.includes(i2) || w3) || u2());
    }, [i2, y3, w3, u2]), { anchorElements: y3, selector: h2 };
  })({ id: c2, anchorSelect: f2, imperativeAnchorSelect: null == ge ? void 0 : ge.anchorSelect, activeAnchor: te, disableTooltip: X22, onActiveAnchorRemoved: Ie, trackAnchors: $e });
  (({ activeAnchor: e2, anchorElements: t3, anchorSelector: r2, clickable: c3, closeEvents: i2, delayHide: s2, delayShow: u2, disableTooltip: a2, float: d3, globalCloseEvents: p3, handleHideTooltipDelayed: v3, handleShow: m3, handleShowTooltipDelayed: f3, handleTooltipPosition: y3, hoveringTooltip: w3, imperativeModeOnly: b3, lastFloatPosition: S3, openEvents: g2, openOnClick: E3, rendered: T2, setActiveAnchor: O2, show: C2, tooltipHideDelayTimerRef: R3, tooltipRef: x3, tooltipShowDelayTimerRef: L3, updateTooltipPosition: N3 }) => {
    const B3 = reactExports.useRef(A((e3) => {
    }, 50)), z3 = reactExports.useRef(A(() => {
    }, 50)), I3 = reactExports.useRef(null), $3 = reactExports.useRef(null), j3 = reactExports.useRef(null), D3 = reactExports.useRef(null);
    e2 !== j3.current && (j3.current = e2, I3.current = _(e2));
    const H2 = x3.current;
    H2 !== D3.current && (D3.current = H2, $3.current = _(H2));
    const M3 = E3 || (null == g2 ? void 0 : g2.click) || (null == g2 ? void 0 : g2.dblclick) || (null == g2 ? void 0 : g2.mousedown), P3 = reactExports.useMemo(() => {
      const e3 = g2 ? { ...g2 } : { mouseenter: true, focus: true, click: false, dblclick: false, mousedown: false };
      return !g2 && E3 && Object.assign(e3, { mouseenter: false, focus: false, click: true }), b3 && Object.assign(e3, { mouseenter: false, focus: false, click: false, dblclick: false, mousedown: false }), e3;
    }, [g2, E3, b3]), q2 = reactExports.useMemo(() => {
      const e3 = i2 ? { ...i2 } : { mouseleave: true, blur: true, click: false, dblclick: false, mouseup: false };
      return !i2 && E3 && Object.assign(e3, { mouseleave: false, blur: false }), b3 && Object.assign(e3, { mouseleave: false, blur: false, click: false, dblclick: false, mouseup: false }), e3;
    }, [i2, E3, b3]), F3 = reactExports.useMemo(() => {
      const e3 = p3 ? { ...p3 } : { escape: false, scroll: false, resize: false, clickOutsideAnchor: M3 || false };
      return b3 && Object.assign(e3, { escape: false, scroll: false, resize: false, clickOutsideAnchor: false }), e3;
    }, [p3, M3, b3]), V3 = reactExports.useRef(e2);
    V3.current = e2;
    const K3 = reactExports.useRef(C2);
    K3.current = C2;
    const Y3 = reactExports.useRef(t3);
    Y3.current = t3;
    const X3 = reactExports.useRef(m3);
    X3.current = m3;
    const G3 = reactExports.useRef(y3);
    G3.current = y3;
    const Z3 = reactExports.useRef(N3);
    Z3.current = N3;
    const J2 = reactExports.useRef(() => null), Q2 = reactExports.useRef(() => {
    }), U2 = reactExports.useRef(() => {
    }), ee2 = r2 ? (function(e3) {
      const t4 = e3.match(/^\[data-tooltip-id=(['"])((?:\\.|(?!\1).)*)\1\]$/);
      return t4 ? t4[2].replace(/\\(['"])/g, "$1") : null;
    })(r2) : null;
    J2.current = (e3) => {
      var t4, o2;
      const n2 = e3;
      if (!(null == n2 ? void 0 : n2.isConnected)) return null;
      if (ee2) {
        const e4 = (function(e5, t5) {
          let o3 = e5;
          for (; o3; ) {
            if (o3.dataset.tooltipId === t5) return o3;
            o3 = o3.parentElement;
          }
          return null;
        })(n2, ee2);
        if (e4 && !(null == a2 ? void 0 : a2(e4))) return e4;
      } else if (r2) try {
        const e4 = null !== (t4 = n2.matches(r2) ? n2 : n2.closest(r2)) && void 0 !== t4 ? t4 : null;
        if (e4 && !(null == a2 ? void 0 : a2(e4))) return e4;
      } catch (e4) {
        return null;
      }
      return null !== (o2 = Y3.current.find((e4) => e4 === n2 || e4.contains(n2))) && void 0 !== o2 ? o2 : null;
    }, Q2.current = (e3) => {
      e3 && (e3.isConnected ? (null == a2 ? void 0 : a2(e3)) || (u2 && V3.current && e3 !== V3.current ? (L3.current && clearTimeout(L3.current), L3.current = setTimeout(() => {
        O2(e3), m3(true);
      }, u2)) : (O2(e3), u2 ? f3() : m3(true)), R3.current && clearTimeout(R3.current)) : O2(null));
    }, U2.current = () => {
      c3 ? v3(s2 || 100) : s2 ? v3() : m3(false), L3.current && clearTimeout(L3.current);
    };
    const te2 = B3.current, oe2 = z3.current;
    te2.setCallback((e3) => Q2.current(e3)), oe2.setCallback(() => U2.current()), reactExports.useEffect(() => {
      const e3 = [], t4 = (t5, o3) => {
        e3.push(W(t5, o3));
      }, o2 = (e4) => {
        var t5;
        return Boolean((null == e4 ? void 0 : e4.target) && (null === (t5 = V3.current) || void 0 === t5 ? void 0 : t5.contains(e4.target)));
      }, r3 = (e4) => {
        oe2.cancel(), te2(e4);
      }, n2 = () => {
        te2.cancel(), oe2();
      }, l2 = () => {
        t4("mouseover", (e4) => {
          const t5 = J2.current(e4.target);
          t5 && J2.current(e4.relatedTarget) !== t5 && r3(t5);
        });
      }, i3 = () => {
        t4("mouseout", (e4) => {
          const t5 = J2.current(e4.target);
          if (!t5 && !o2(e4)) return;
          const r4 = e4.relatedTarget, l3 = t5 || V3.current;
          (null == l3 ? void 0 : l3.contains(r4)) || n2();
        });
      };
      P3.mouseenter && l2(), q2.mouseleave && i3(), P3.mouseover && l2(), q2.mouseout && i3(), P3.focus && t4("focusin", (e4) => {
        r3(J2.current(e4.target));
      }), q2.blur && t4("focusout", (e4) => {
        const t5 = J2.current(e4.target);
        if (!t5 && !o2(e4)) return;
        const r4 = e4.relatedTarget, l3 = t5 || V3.current;
        (null == l3 ? void 0 : l3.contains(r4)) || n2();
      });
      const s3 = ["mouseover", "mouseout", "mouseenter", "mouseleave", "focus", "blur"], u3 = ["click", "dblclick", "mousedown", "mouseup"], a3 = (e4) => {
        var t5;
        const o3 = J2.current(null !== (t5 = null == e4 ? void 0 : e4.target) && void 0 !== t5 ? t5 : null);
        o3 && (K3.current && V3.current === o3 || Q2.current(o3));
      }, p4 = (e4) => {
        K3.current && o2(e4) && U2.current();
      };
      Object.entries(P3).forEach(([e4, o3]) => {
        o3 && !s3.includes(e4) && u3.includes(e4) && t4(e4, a3);
      }), Object.entries(q2).forEach(([e4, o3]) => {
        o3 && !s3.includes(e4) && u3.includes(e4) && t4(e4, p4);
      }), d3 && t4("pointermove", (e4) => {
        const t5 = V3.current;
        if (!t5) return;
        if (J2.current(e4.target) !== t5) return;
        const o3 = e4, r4 = { x: o3.clientX, y: o3.clientY };
        G3.current(r4), S3.current = r4;
      });
      const v4 = x3.current, m4 = () => {
        w3.current = true;
      }, f4 = () => {
        w3.current = false, U2.current();
      }, h2 = c3 && (q2.mouseout || q2.mouseleave);
      return h2 && (null == v4 || v4.addEventListener("mouseover", m4), null == v4 || v4.addEventListener("mouseout", f4)), () => {
        e3.forEach((e4) => e4()), h2 && (null == v4 || v4.removeEventListener("mouseover", m4), null == v4 || v4.removeEventListener("mouseout", f4)), te2.cancel(), oe2.cancel();
      };
    }, [P3, q2, d3, c3, T2]), reactExports.useEffect(() => {
      const t4 = () => {
        X3.current(false);
      }, o2 = $3.current, r3 = I3.current;
      F3.scroll && (window.addEventListener("scroll", t4), null == r3 || r3.addEventListener("scroll", t4), null == o2 || o2.addEventListener("scroll", t4));
      let n2 = null;
      F3.resize ? window.addEventListener("resize", t4) : e2 && x3.current && (n2 = autoUpdate(e2, x3.current, () => Z3.current(), { ancestorResize: true, elementResize: true, layoutShift: true }));
      const l2 = (e3) => {
        "Escape" === e3.key && X3.current(false);
      };
      F3.escape && window.addEventListener("keydown", l2);
      const c4 = (e3) => {
        var t5, o3;
        if (!K3.current) return;
        const r4 = e3.target;
        (null == r4 ? void 0 : r4.isConnected) && ((null === (t5 = x3.current) || void 0 === t5 ? void 0 : t5.contains(r4)) || (null === (o3 = V3.current) || void 0 === o3 ? void 0 : o3.contains(r4)) || Y3.current.some((e4) => null == e4 ? void 0 : e4.contains(r4)) || (X3.current(false), k(L3)));
      };
      return F3.clickOutsideAnchor && window.addEventListener("click", c4), () => {
        F3.scroll && (window.removeEventListener("scroll", t4), null == r3 || r3.removeEventListener("scroll", t4), null == o2 || o2.removeEventListener("scroll", t4)), F3.resize && window.removeEventListener("resize", t4), n2 && n2(), F3.escape && window.removeEventListener("keydown", l2), F3.clickOutsideAnchor && window.removeEventListener("click", c4);
      };
    }, [F3, e2]);
  })({ activeAnchor: te, anchorElements: je, anchorSelector: De, clickable: $2, closeEvents: D2, delayHide: L2, delayShow: x2, disableTooltip: X22, float: B2, globalCloseEvents: M2, handleHideTooltipDelayed: Ne, handleShow: Ce, handleShowTooltipDelayed: Le, handleTooltipPosition: Be, hoveringTooltip: Te, imperativeModeOnly: P2, lastFloatPosition: _e, openEvents: j2, openOnClick: b2, rendered: be, setActiveAnchor: oe, show: ye, tooltipHideDelayTimerRef: pe, tooltipRef: ue, tooltipShowDelayTimerRef: de, updateTooltipPosition: ze });
  const He = reactExports.useRef(ze);
  He.current = ze, reactExports.useEffect(() => {
    be && ze();
  }, [be, ze]), reactExports.useEffect(() => {
    if (!be || !(null == Z22 ? void 0 : Z22.current)) return () => null;
    let e2 = null;
    const t3 = new ResizeObserver(() => {
      e2 && clearTimeout(e2), e2 = setTimeout(() => {
        ke.current && He.current(), e2 = null;
      }, 0);
    });
    return t3.observe(Z22.current), () => {
      t3.disconnect(), e2 && clearTimeout(e2);
    };
  }, [G2, Z22, be]), reactExports.useEffect(() => {
    var e2;
    if (!(Q || Boolean(J))) return;
    const t3 = (() => {
      if (!te || !(null == ge ? void 0 : ge.anchorSelect)) return false;
      try {
        return te.matches(ge.anchorSelect);
      } catch (e3) {
        return false;
      }
    })();
    if (!te || !je.includes(te)) {
      if (t3) return;
      oe(null !== (e2 = je[0]) && void 0 !== e2 ? e2 : null);
    }
  }, [te, je, Q, null == ge ? void 0 : ge.anchorSelect, J, be, oe]), reactExports.useEffect(() => (Q && Ce(true), () => {
    k(de), k(pe), k(ve), k(me);
  }), [Q, Ce]), reactExports.useEffect(() => {
    de.current && (k(de), Le(x2));
  }, [x2, Le]);
  const Me = null !== (se = null == ge ? void 0 : ge.content) && void 0 !== se ? se : G2, Pe = null != Me, We = ye && void 0 !== fe.tooltipStyles.left, qe = reactExports.useMemo(() => ({ ...F2, ...fe.tooltipStyles, opacity: void 0 !== ne && We ? ne : void 0 }), [F2, fe.tooltipStyles, ne, We]), Fe = reactExports.useMemo(() => le ? `linear-gradient(to right bottom, transparent 50%, ${le} 50%)` : void 0, [le]), Ve = reactExports.useMemo(() => ({ ...fe.tooltipArrowStyles, background: Fe, "--rt-arrow-size": `${ce}px` }), [fe.tooltipArrowStyles, Fe, ce]);
  reactExports.useImperativeHandle(t2, () => ({ open: (e2) => {
    let t3 = null;
    if (null == e2 ? void 0 : e2.anchorSelect) {
      try {
        t3 = document.querySelector(e2.anchorSelect);
      } catch (e3) {
        return;
      }
      if (!t3) return;
    }
    t3 && oe(t3), Ae(null != e2 ? e2 : null), (null == e2 ? void 0 : e2.delay) ? Le(e2.delay) : Ce(true);
  }, close: (e2) => {
    (null == e2 ? void 0 : e2.delay) ? Ne(e2.delay) : Ce(false);
  }, activeAnchor: te, place: fe.place, isOpen: Boolean(be && !z2 && Pe && We) })), reactExports.useEffect(() => () => {
    k(de), k(pe), k(ve), k(me);
  }, []);
  const Ke = be && !z2 && Pe ? React.createElement(R2, { id: c2, role: ie, className: clsx("react-tooltip", O.tooltip, C.tooltip, C[v2], d2, `react-tooltip__place-${fe.place}`, O[We ? "show" : "closing"], We ? "react-tooltip__show" : "react-tooltip__closing", "fixed" === S2 && O.fixed, $2 && O.clickable), onTransitionEnd: (e2) => {
    k(me), ye || "opacity" !== e2.propertyName || (Se(false), Ae(null), null == Y22 || Y22());
  }, style: qe, ref: ue }, React.createElement(R2, { className: clsx("react-tooltip-content-wrapper", O.content, C.content) }, Me), React.createElement(R2, { className: clsx("react-tooltip-arrow", O.arrow, C.arrow, p2, I2 && O.noArrow), style: Ve, ref: ae })) : null;
  return Ke ? m2 ? reactDomExports.createPortal(Ke, m2) : Ke : null;
});
const V = /* @__PURE__ */ new Map();
let K = null;
const Y = { attributes: true, childList: false, subtree: false };
function X(e2, t2) {
  const o2 = (K || (K = new MutationObserver((e3) => {
    var t3;
    for (const o3 of e3) {
      if ("attributes" !== o3.type || !(null === (t3 = o3.attributeName) || void 0 === t3 ? void 0 : t3.startsWith("data-tooltip-"))) continue;
      const e4 = o3.target, r3 = V.get(e4);
      r3 && r3.forEach((t4) => t4(e4));
    }
  })), K);
  let r2 = V.get(e2);
  return r2 || (r2 = /* @__PURE__ */ new Set(), V.set(e2, r2), o2.observe(e2, Y)), r2.add(t2), () => {
    const r3 = V.get(e2);
    r3 && (r3.delete(t2), 0 === r3.size && (V.delete(e2), 0 === V.size ? o2.disconnect() : (o2.disconnect(), V.forEach((e3, t3) => {
      o2.observe(t3, Y);
    }))));
  };
}
const G = React.forwardRef(({ id: t2, anchorSelect: l2, content: c2, render: s2, className: a2, classNameArrow: d2, variant: p2 = "dark", portalRoot: v2, place: m2 = "top", offset: f2 = 10, wrapper: h2 = "div", children: y2 = null, openOnClick: w2 = false, positionStrategy: b2 = "absolute", middlewares: S2, delayShow: g2 = 0, delayHide: A22 = 0, autoClose: E2, float: _2 = false, hidden: T2 = false, noArrow: k2 = false, clickable: O2 = false, openEvents: C2, closeEvents: R2, globalCloseEvents: x2, imperativeModeOnly: L2 = false, style: N2, position: B2, isOpen: z2, defaultIsOpen: I2 = false, disableStyleInjection: $2 = false, border: j2, opacity: D2, arrowColor: H2, arrowSize: M2, setIsOpen: P2, afterShow: W2, afterHide: q2, disableTooltip: V2, role: K2 = "tooltip" }, Y22) => {
  var G2, Z22, J, Q, U, ee, te, oe;
  const [re, ne] = reactExports.useState(null), [le, ce] = reactExports.useState({}), ie = reactExports.useRef(null), se = reactExports.useRef($2), ue = reactExports.useCallback((e2) => {
    ne((t3) => ((null == e2 ? void 0 : e2.isSameNode(t3)) || (ie.current = t3), e2));
  }, []), ae = (e2) => {
    const t3 = null == e2 ? void 0 : e2.getAttributeNames().reduce((t4, o2) => {
      var r2;
      if (o2.startsWith("data-tooltip-")) {
        t4[o2.replace(/^data-tooltip-/, "")] = null !== (r2 = null == e2 ? void 0 : e2.getAttribute(o2)) && void 0 !== r2 ? r2 : null;
      }
      return t4;
    }, {});
    return t3;
  };
  reactExports.useEffect(() => {
    se.current;
  }, [$2]), reactExports.useEffect(() => {
    "undefined" != typeof window && window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles", { detail: { disableCore: "core" === $2, disableBase: $2 } }));
  }, []), reactExports.useEffect(() => {
    if (!re) return ce({}), () => {
    };
    const e2 = (e3) => {
      const t3 = ae(e3);
      ce((e4) => {
        const o2 = Object.keys(t3), r2 = Object.keys(e4);
        return o2.length === r2.length && o2.every((o3) => t3[o3] === e4[o3]) ? e4 : t3;
      });
    };
    e2(re);
    return X(re, e2);
  }, [re, l2]), reactExports.useEffect(() => {
  }, [j2, D2, null == N2 ? void 0 : N2.border, null == N2 ? void 0 : N2.opacity]);
  const de = re ? ae(re) : le, pe = null !== (G2 = de.content) && void 0 !== G2 ? G2 : c2, ve = null !== (Z22 = de.place) && void 0 !== Z22 ? Z22 : m2, me = null !== (J = de.variant) && void 0 !== J ? J : p2, fe = null == de.offset ? f2 : Number(de.offset), he = null !== (Q = de.wrapper) && void 0 !== Q ? Q : h2, ye = null !== (U = de["position-strategy"]) && void 0 !== U ? U : b2, we = null == de["delay-show"] ? g2 : Number(de["delay-show"]), be = null == de["delay-hide"] ? A22 : Number(de["delay-hide"]), Se = null == de["auto-close"] ? E2 : Number(de["auto-close"]), ge = null == de.float ? _2 : "true" === de.float, Ae = null == de.hidden ? T2 : "true" === de.hidden, Ee = null !== (ee = de["class-name"]) && void 0 !== ee ? ee : null;
  let _e = y2;
  const Te = reactExports.useRef(null);
  if (s2) {
    const t3 = s2({ content: null !== (oe = null !== (te = de.content) && void 0 !== te ? te : pe) && void 0 !== oe ? oe : null, activeAnchor: re });
    _e = t3 ? React.createElement("div", { ref: Te, className: "react-tooltip-content-wrapper" }, t3) : null;
  } else null != pe && (_e = pe);
  const ke = { forwardRef: Y22, id: t2, anchorSelect: l2, className: clsx(a2, Ee), classNameArrow: d2, content: _e, contentWrapperRef: Te, portalRoot: v2, place: ve, variant: me, offset: fe, wrapper: he, openOnClick: w2, positionStrategy: ye, middlewares: S2, delayShow: we, delayHide: be, autoClose: Se, float: ge, hidden: Ae, noArrow: k2, clickable: O2, openEvents: C2, closeEvents: R2, globalCloseEvents: x2, imperativeModeOnly: L2, style: N2, position: B2, isOpen: z2, defaultIsOpen: I2, border: j2, opacity: D2, arrowColor: H2, arrowSize: M2, setIsOpen: P2, afterShow: W2, afterHide: q2, disableTooltip: V2, activeAnchor: re, previousActiveAnchor: ie.current, setActiveAnchor: ue, role: K2 };
  return React.createElement(F, { ...ke });
});
var Z = reactExports.memo(G);
"undefined" != typeof window && window.addEventListener("react-tooltip-inject-styles", (e2) => {
  e2.detail.disableCore || w({ css: `:root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s;--rt-arrow-size:8px}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit;z-index:-1;-webkit-backface-visibility:hidden;backface-visibility:hidden}.core-styles-module_content__BRKdB{position:relative;z-index:1}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out;will-change:opacity}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in;will-change:opacity}`, type: "core" }), e2.detail.disableBase || w({ css: `
.styles-module_tooltip__mnnfp{border-radius:3px;font-size:90%;width:max-content}.styles-module_content__ydYdI{background:inherit;border-radius:inherit;padding:8px 16px}.styles-module_arrow__K0L3T{width:var(--rt-arrow-size);height:var(--rt-arrow-size)}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`, type: "base" });
});
const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";
const highlightedCountries = ["Egypt", "Italy", "Saudi Arabia", "Mexico", "Colombia"];
const highlightColor = "#0EA5E9";
const highlightHoverColor = "#0284C7";
const countryNameMap = {
  "Israel": "Palestine",
  "Somaliland": "Somalia"
};
const getCountryDisplayName = (name) => {
  return countryNameMap[name] || name;
};
const MapChart = ({ setTooltipContent }) => {
  const [hoveredCountry, setHoveredCountry] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComposableMap,
    {
      "data-tip": "",
      "data-tooltip-id": "map-tooltip",
      projectionConfig: { scale: 147 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomableGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Geographies, { geography: geoUrl, children: ({ geographies }) => geographies.map((geo) => {
        const baseName = geo.properties.name;
        const displayName = getCountryDisplayName(baseName);
        const isHighlighted = highlightedCountries.includes(baseName);
        const isSharedHover = hoveredCountry === displayName && hoveredCountry !== "";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          Geography$1,
          {
            geography: geo,
            onMouseEnter: () => {
              setHoveredCountry(displayName);
              setTooltipContent(displayName || "Unknown");
            },
            onMouseLeave: () => {
              setHoveredCountry("");
              setTooltipContent("");
            },
            style: {
              default: {
                fill: isSharedHover ? isHighlighted ? highlightHoverColor : "#10B981" : isHighlighted ? highlightColor : "#E5E7EB",
                stroke: isSharedHover ? isHighlighted ? "#0284C7" : "#059669" : "#D1D5DB",
                strokeWidth: 0.75,
                outline: "none",
                cursor: "pointer",
                transition: "all 250ms"
              },
              hover: {
                fill: isHighlighted ? highlightHoverColor : "#10B981",
                stroke: isHighlighted ? "#0284C7" : "#059669",
                strokeWidth: 0.75,
                outline: "none",
                cursor: "pointer",
                transition: "all 250ms"
              },
              pressed: {
                fill: isHighlighted ? highlightHoverColor : "#059669",
                stroke: isHighlighted ? "#0284C7" : "#047857",
                strokeWidth: 0.75,
                outline: "none"
              }
            }
          },
          geo.rsmKey
        );
      }) }) })
    }
  );
};
const MemoizedMap = reactExports.memo(MapChart);
const Markets = () => {
  const { t } = useLanguage();
  const [content, setContent] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "markets", className: "min-h-screen pt-20 md:pt-24 pb-0 bg-transparent text-slate-900 relative flex flex-col justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.05]", style: { backgroundImage: "radial-gradient(#00AEEF 1px, transparent 1px)", backgroundSize: "30px 30px" } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-brand-blue mb-3 md:mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 md:w-5 md:h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm md:text-base", children: t.markets.badge })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl md:text-5xl font-bold mb-3 md:mb-6 leading-normal text-slate-900", children: [
          t.markets.title,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-blue", children: t.markets.subtitle })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 text-base md:text-lg mb-4 md:mb-8 leading-relaxed max-w-lg", children: t.markets.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 md:space-y-4 mb-6 md:mb-8", children: t.markets.points.map((point, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 md:gap-3 text-sm md:text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "text-brand-green w-5 h-5 md:w-6 md:h-6 flex-shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: point })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MemoizedMap, { setTooltipContent: setContent }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Z,
            {
              id: "map-tooltip",
              content,
              isOpen: content !== "",
              className: "z-50 !bg-slate-800 !text-white !font-bold !px-4 !py-2 !rounded-lg !text-sm"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-slate-600 mb-2", children: "Our Markets" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: highlightedCountries.map((country) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-flex items-center px-3 py-1.5 rounded-full bg-sky-100 text-sky-700 font-semibold text-sm border border-sky-300 hover:bg-sky-200 transition-colors",
              children: country
            },
            country
          )) })
        ] })
      ] })
    ] }) })
  ] });
};
const Contact = () => {
  const [formState, setFormState] = reactExports.useState({ name: "", phone: "", clinic: "", message: "" });
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [isSuccess, setIsSuccess] = reactExports.useState(false);
  const { t } = useLanguage();
  const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby6Kwyfdjpz6zsyvPvlfDR-Ls0d8kNbTaDoJ9PdZl7XBescpjjDz9uKaVuU5u6hJ7HOkg/exec";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        // Use no-cors to avoid preflight issues with Apps Script redirect
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });
      await notifyContactMessage({
        name: formState.name,
        phone: formState.phone,
        clinic: formState.clinic,
        message: formState.message
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: "", phone: "", clinic: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5e3);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
      alert("حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا عبر الواتساب.");
    }
  };
  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "contact", className: "min-h-screen pt-20 pb-0 md:pt-24 md:pb-4 bg-transparent flex flex-col justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 w-full h-full flex flex-col justify-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden flex-col justify-between items-center bg-brand-blue text-white p-4 rounded-t-2xl shadow-lg mb-0 z-10 shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden flex justify-between items-center ", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-lg", children: t.contact.heading }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://wa.me/+201130428384", target: "_blank", "aria-label": "WhatsApp", className: "bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:marketing@medestra.me", "aria-label": "Email Us", className: "bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.google.com/maps", target: "_blank", "aria-label": "Google Maps", className: "bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 mb-2 mt-2 text", children: t.contact.subheading })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 bg-white/[0.05] backdrop-blur-[40px] rounded-b-[2rem] lg:rounded-[3rem] border-t-[2.5px] border-l-[2.5px] border-white/90 border-b border-r border-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.15),_inset_0_1px_2px_rgba(255,255,255,0.8)] overflow-hidden h-auto lg:h-auto shrink flex-1 lg:flex-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex bg-brand-blue p-8 text-white flex-col justify-between relative overflow-hidden h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6", children: t.contact.heading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 mb-10 text-lg", children: t.contact.subheading }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://wa.me/+201130428384",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-green-500/30 w-full",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5 fill-current" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.contact.whatsappBtn })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-white/20 my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "mailto:marketing@medestra.me", className: "flex items-center gap-4 hover:opacity-80 transition-opacity", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-100 uppercase", children: t.contact.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg", children: "marketing@medestra.me" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://wa.me/+201130428384", className: "flex items-center gap-4 hover:opacity-80 transition-opacity", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-100 uppercase", children: t.contact.call }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg", dir: "ltr", children: "+20 113 042 8384" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://www.google.com/maps/search/?api=1&query=Medestra+Marketing", target: "_blank", rel: "noopener noreferrer", className: "flex items-center gap-4 hover:opacity-80 transition-opacity", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-5 h-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-blue-100 uppercase", children: t.contact.addressTitle }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg", children: t.contact.address })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-10 -right-10 opacity-20 z-0 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12rem] font-extrabold text-white leading-none", children: "me" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-8 flex flex-col justify-center h-full overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "hidden lg:block text-2xl font-bold text-gray-900 mb-8", children: t.contact.formTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-3 md:space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 md:gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2", children: t.contact.nameLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  id: "name",
                  name: "name",
                  required: true,
                  value: formState.name,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-sm",
                  placeholder: t.contact.namePlaceholder
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "phone", className: "block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2", children: t.contact.phoneLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "tel",
                  id: "phone",
                  name: "phone",
                  required: true,
                  value: formState.phone,
                  onChange: handleChange,
                  className: "w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-sm",
                  placeholder: t.contact.phonePlaceholder
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "clinic", className: "block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2", children: t.contact.clinicLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                id: "clinic",
                name: "clinic",
                value: formState.clinic,
                onChange: handleChange,
                className: "w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all text-sm",
                placeholder: t.contact.clinicPlaceholder
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: "block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2", children: t.contact.messageLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                id: "message",
                name: "message",
                required: true,
                value: formState.message,
                onChange: handleChange,
                rows: 3,
                className: "w-full px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none transition-all resize-none text-sm",
                placeholder: t.contact.messagePlaceholder
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "submit",
              disabled: isSubmitting,
              className: `w-full py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg flex items-center justify-center gap-2 transition-all ${isSuccess ? "bg-green-500 text-white cursor-default" : "bg-brand-red text-white hover:bg-red-600 shadow-lg hover:shadow-red-200"}`,
              children: isSuccess ? t.contact.success : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                isSubmitting ? t.contact.submitting : t.contact.submit,
                !isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 md:w-5 md:h-5" })
              ] })
            }
          )
        ] })
      ] })
    ] })
  ] }) });
};
const FadeInSection = ({ children: children2, delay = 0, direction = "up" }) => {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      initial: "hidden",
      animate: isInView ? "visible" : "hidden",
      variants,
      children: children2
    }
  );
};
const LandingPage = () => {
  const location = useLocation();
  React.useEffect(() => {
    const sectionMap = {
      "/about": "aboutUs",
      "/services": "services",
      "/markets": "markets",
      "/contact": "contact"
    };
    const sectionId = sectionMap[location.pathname];
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, [location.pathname]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-transparent", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "ميديسترا للتسويق الطبي الالكتروني | أفضل شركة تسويق طبي | Medestra" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: "ميديسترا هي وكالة تسويق رقمي طبية متقدمة متخصصة في تحسين محركات البحث للرعاية الصحية، الإعلانات المدفوعة، وإنتاج المحتوى للعيادات والمستشفيات." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: "https://medestra.me/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: "ميديسترا للتسويق الطبي الالكتروني | أفضل شركة تسويق طبي" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: "ميديسترا هي وكالة تسويق رقمي طبية متقدمة متخصصة في تحسين محركات البحث للرعاية الصحية، الإعلانات المدفوعة، وإنتاج المحتوى." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: "https://medestra.me/mascots/h1.webp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: "https://medestra.me/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeInSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AboutUs, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeInSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Services, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeInSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Beneficiaries, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeInSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Partners, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeInSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Markets, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FadeInSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppButton, {})
  ] });
};
export {
  LandingPage as default
};

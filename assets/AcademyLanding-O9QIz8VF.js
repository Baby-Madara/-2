import { j as jsxRuntimeExports, m as motion, ap as BookOpen, d as ArrowRight, av as ShieldCheck, ag as Award, a as ShoppingCart } from "./ui-vendor-a5hQU3E-.js";
import { h as useNavigate, u as useLocation, j as useSearchParams, r as reactExports, L as Link } from "./react-vendor-DY0Dzq76.js";
import { u as useLanguage, H as Helmet } from "./index-ViklniuA.js";
import { N as Navbar } from "./Navbar-BJ91ogvA.js";
import { F as Footer } from "./Footer-BtiNoqIK.js";
import "./utils-vendor-Bpu5wKGe.js";
function AcademyLanding() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
  const { t, dir, language } = useLanguage();
  const isAr = language === "ar";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");
  const isCoursesPath = pathname === "/courses";
  const isBooksPath = pathname === "/books";
  const showCourses = isCoursesPath || section === "courses" || !isBooksPath && !section;
  const showBooks = isBooksPath || section === "books" || !isCoursesPath && !section;
  reactExports.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, section]);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#F8FAFC]", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "أكاديمية ميديسترا | كورسات وكتب متخصصة في التسويق الطبي | Medestra Academy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: "تعلم وتدرب واحصل على شهادات معتمدة في التسويق والمبيعات الطبية. تسوق أفضل الكتب الطبية المتخصصة من متجر ميديسترا." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("link", { rel: "canonical", href: "https://medestra.me/academy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: "أكاديمية ميديسترا | كورسات وكتب متخصصة في التسويق الطبي" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: "تعلم وتدرب واحصل على شهادات معتمدة في التسويق والمبيعات الطبية. تسوق أفضل الكتب الطبية المتخصصة." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: "https://medestra.me/photos/صيدلية.webp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:url", content: "https://medestra.me/academy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "website" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "twitter:card", content: "summary_large_image" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-32 pb-20 overflow-hidden bg-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-0 ${isAr ? "left-0" : "right-0"} w-[50vw] h-[50vw] bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 relative z-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block py-1 px-4 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold uppercase tracking-wider mb-6", children: ((_a = t.academy) == null ? void 0 : _a.badge) || (isAr ? "أكاديمية ميديسترا" : "Medestra Academy") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-normal", children: [
              showBooks && !showCourses ? ((_b = t.academy) == null ? void 0 : _b.booksStore) || (isAr ? "متجر الكتب" : "Books Store") : ((_c = t.academy) == null ? void 0 : _c.pathTitle) || (isAr ? "طريقك نحو" : "Your Path to"),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-600", children: showBooks && !showCourses ? ((_d = t.academy) == null ? void 0 : _d.specialized) || (isAr ? "المتخصصة" : "Specialized") : ((_e = t.academy) == null ? void 0 : _e.medicalProfessionalism) || (isAr ? "الاحتراف الطبي" : "Medical Professionalism") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed", children: showBooks && !showCourses ? ((_f = t.academy) == null ? void 0 : _f.booksDesc) || (isAr ? "احصل على أفضل الكتب الطبية المتخصصة لتطوير مهاراتك العلمية والعملية." : "Get the best specialized medical books to develop your scientific and practical skills.") : ((_g = t.academy) == null ? void 0 : _g.academyDesc) || (isAr ? "تعلم، تدرب، واحصل على شهادات معتمدة لتطوير مهاراتك في التسويق والمبيعات الطبية." : "Learn, practice, and get certified to develop your medical marketing and sales skills.") })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-4 py-20", children: [
      showCourses && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-32", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-brand-blue rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-blue/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 24 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-gray-900", children: t.nav.courses })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              variants: containerVariants,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "group flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden h-full transform hover:-translate-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-gray-50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/photos/صيدلية.webp",
                        alt: t.nav.pharmacySales,
                        className: "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 right-5 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-xs font-extrabold px-4 py-2 rounded-full uppercase shadow-lg shadow-red-500/30 tracking-wide", children: t.nav.new }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10 flex flex-col flex-grow relative bg-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-normal group-hover:text-brand-blue transition-colors duration-300", children: t.nav.pharmacySales }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-8 font-medium text-lg leading-relaxed flex-grow", children: ((_h = t.academy) == null ? void 0 : _h.pharmacyDesc) || (isAr ? "دورة متكاملة لإتقان فنون البيع الأخلاقي في الصيدليات، من فهم احتياجات المريض إلى بناء الثقة والولاء." : "A complete course to master ethical selling in pharmacies, from understanding patient needs to building trust and loyalty.") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/pharmacy-sales",
                        className: "inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-blue hover:shadow-xl hover:shadow-brand-blue/30 transition-all duration-300 w-full",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.nav.start }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20, className: isAr ? "rotate-180" : "" })
                        ]
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "group flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden h-full transform hover:-translate-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-gray-50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/photos/اعلانات.webp",
                        alt: t.nav.metaAdsMaster,
                        className: "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 right-5 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-brand-blue text-white text-xs font-extrabold px-4 py-2 rounded-full uppercase shadow-lg shadow-brand-blue/30 tracking-wide", children: t.nav.free }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10 flex flex-col flex-grow relative bg-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-normal group-hover:text-brand-blue transition-colors duration-300", children: t.nav.metaAdsMaster }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-8 font-medium text-lg leading-relaxed flex-grow", children: ((_i = t.academy) == null ? void 0 : _i.metaAdsDesc) || (isAr ? "تعلم أسرار إعلانات الفيسبوك والانستجرام الموجهة للقطاع الطبي لتحقيق أعلى العوائد." : "Learn the secrets of Facebook and Instagram ads for the medical sector to achieve the highest returns.") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Link,
                      {
                        to: "/meta-ads-master",
                        className: "inline-flex items-center justify-center gap-3 bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-blue hover:text-white hover:shadow-xl hover:shadow-brand-blue/30 transition-all duration-300 w-full",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.nav.start }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20, className: isAr ? "rotate-180" : "" })
                        ]
                      }
                    ) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "group flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden h-full transform hover:-translate-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-gray-50", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: "/photos/HR PHOTO.webp",
                        alt: ((_j = t.academy) == null ? void 0 : _j.hrCourse) || (isAr ? "أساسيات إدارة الموارد البشرية" : "Fundamentals of HR Management"),
                        className: "w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 right-5 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-xs font-extrabold px-4 py-2 rounded-full uppercase shadow-lg shadow-red-500/30 tracking-wide", children: t.nav.new }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-10 flex flex-col flex-grow relative bg-white", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-normal group-hover:text-brand-blue transition-colors duration-300", children: ((_k = t.academy) == null ? void 0 : _k.hrCourse) || (isAr ? "أساسيات إدارة الموارد البشرية" : "Fundamentals of HR Management") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 mb-8 font-medium text-lg leading-relaxed flex-grow", children: ((_l = t.academy) == null ? void 0 : _l.hrDesc) || (isAr ? "دليلك الشامل والمكثف لدخول عالم إدارة الموارد البشرية بشكل احترافي، تعلم أساسيات الموارد البشرية وكيفية تطبيقها عملياً." : "Your comprehensive guide to entering the world of HR management professionally, learn the basics of HR and how to apply them.") }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        href: "/hr-professional-master-course/index.html",
                        className: "inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-blue hover:shadow-xl hover:shadow-brand-blue/30 transition-all duration-300 w-full",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t.nav.start }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 20, className: isAr ? "rotate-180" : "" })
                        ]
                      }
                    ) })
                  ] })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-32", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-gray-900", children: t.nav.simulators }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              variants: containerVariants,
              initial: "hidden",
              whileInView: "visible",
              viewport: { once: true },
              className: "max-w-2xl",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "group relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-center overflow-hidden", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 z-0 scale-105", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/photos/محاكي.webp",
                      alt: "",
                      className: "w-full h-full object-cover opacity-100 blur-[4px] scale-125 group-hover:scale-[1.35] transition-transform duration-700"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/70 via-white/30 to-transparent" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex-1 text-center md:text-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-black text-gray-900 mb-2", children: t.nav.metaAdsManager }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-800 mb-6 font-bold leading-relaxed", children: isAr ? "تدرب على مدير الإعلانات في بيئة محاكاة واقعية دون المخاطرة بميزانيتك." : "Practice ads manager in a realistic simulation environment without risking your budget." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/meta-ads-manager",
                      className: "inline-flex items-center gap-2 text-purple-700 font-black hover:gap-3 transition-all",
                      children: [
                        t.nav.start,
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18, className: isAr ? "rotate-180" : "" })
                      ]
                    }
                  )
                ] })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            className: "bg-brand-blue rounded-[40px] p-12 text-center text-white relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-2xl mx-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 40 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-black mb-6", children: t.nav.certified }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-lg mb-10 font-medium", children: ((_m = t.academy) == null ? void 0 : _m.verifyDesc) || (isAr ? "هل حصلت على شهادة من ميديسترا؟ يمكنك التحقق من صحتها وتوثيقها الآن عبر معرف الشهادة الخاص بك." : "Did you get a certificate from Medestra? You can verify its authenticity and validate it now via your certificate ID.") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/verify-certificate",
                    className: "inline-flex items-center gap-2 bg-white text-brand-blue px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl hover:-translate-y-1 transition",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { size: 22 }),
                      t.nav.verifyBtn
                    ]
                  }
                )
              ] })
            ]
          }
        ) })
      ] }),
      showBooks && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-red/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-black text-gray-900", children: t.nav.specialtyBooks })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            variants: containerVariants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            className: "flex flex-wrap gap-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "group relative bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 max-w-[260px] w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] mb-4 rounded-xl overflow-hidden bg-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/photos/First Aid.webp",
                      alt: "First Aid Skills Notes",
                      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase shadow-lg shadow-red-500/20", children: t.nav.new }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-gray-900 mb-1 leading-normal", children: "First Aid Skills Notes [Adult and Pediatric]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-500 font-bold", children: "Mahmoud M.Hussein" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 line-through text-xs font-bold", children: [
                      "1200 ",
                      ((_n = t.academy) == null ? void 0 : _n.currency) || (isAr ? "جنية" : "EGP")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-black text-brand-blue", children: [
                      "690 ",
                      ((_o = t.academy) == null ? void 0 : _o.currency) || (isAr ? "جنية" : "EGP")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        navigate("/checkout", { state: { name: "First Aid Skills Notes [Adult and Pediatric]", price: "690 EGP" } });
                      },
                      className: "bg-brand-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition shadow-lg shadow-brand-blue/20",
                      children: t.bookStore.addToCart
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "group relative bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 max-w-[260px] w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] mb-4 rounded-xl overflow-hidden bg-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/photos/nahl.webp",
                      alt: "Communication Skills notes",
                      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase shadow-lg shadow-red-500/20", children: t.nav.new }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-gray-900 mb-1 leading-normal", children: "Communication Skills Notes [For community pharmacists]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-500 font-bold", children: "Mahmoud M.Hussein" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 line-through text-xs font-bold", children: [
                      "780 ",
                      ((_p = t.academy) == null ? void 0 : _p.currency) || (isAr ? "جنية" : "EGP")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-black text-brand-blue", children: [
                      "430 ",
                      ((_q = t.academy) == null ? void 0 : _q.currency) || (isAr ? "جنية" : "EGP")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        navigate("/checkout", { state: { name: "Communication Skills Notes [For community pharmacists]", price: "430 EGP" } });
                      },
                      className: "bg-brand-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition shadow-lg shadow-brand-blue/20",
                      children: t.bookStore.addToCart
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: itemVariants, className: "group relative bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 max-w-[260px] w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] mb-4 rounded-xl overflow-hidden bg-gray-100", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: "/photos/Copy of Copy of Copy of Communication Skills.webp",
                      alt: "Antibiotics Classification",
                      className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500 text-white text-[10px] md:text-xs font-black px-4 py-1.5 rounded-full uppercase shadow-lg shadow-red-500/20", children: t.nav.new }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-black text-gray-900 mb-1 leading-normal", children: "Antibiotics Classification [short speech]" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] text-gray-500 font-bold", children: "Mahmoud M.Hussein" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-400 line-through text-xs font-bold", children: [
                      "320 ",
                      ((_r = t.academy) == null ? void 0 : _r.currency) || (isAr ? "جنية" : "EGP")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl font-black text-brand-blue", children: [
                      "190 ",
                      ((_s = t.academy) == null ? void 0 : _s.currency) || (isAr ? "جنية" : "EGP")
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        navigate("/checkout", { state: { name: "Antibiotics Classification [short speech]", price: "190 EGP" } });
                      },
                      className: "bg-brand-blue text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition shadow-lg shadow-brand-blue/20",
                      children: t.bookStore.addToCart
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  AcademyLanding as default
};

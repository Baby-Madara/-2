import { j as jsxRuntimeExports, m as motion, ap as BookOpen, K as Search, a9 as Calendar, az as Clock, c as ArrowLeft, d as ArrowRight, X, R as MessageCircle } from "./ui-vendor-a5hQU3E-.js";
import { r as reactExports, L as Link } from "./react-vendor-DY0Dzq76.js";
import { u as useLanguage, H as Helmet } from "./index-4qG1EIbH.js";
import { N as Navbar } from "./Navbar-DAC1ZDq0.js";
import { F as Footer } from "./Footer-BqkZY3eo.js";
import { b as blogPosts } from "./blogPosts-N-5cpjTR.js";
import "./utils-vendor-Bpu5wKGe.js";
const BlogLandingPage = () => {
  const { t, language, dir } = useLanguage();
  const isAr = language === "ar";
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  reactExports.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  const filteredAndSortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).filter((post) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    return post.title_ar.toLowerCase().includes(query) || post.title_en.toLowerCase().includes(query) || post.author_ar.toLowerCase().includes(query) || post.author_en.toLowerCase().includes(query);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 text-slate-900", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: isAr ? "المدونة الطبية | ميديسترا للتسويق الطبي" : "Medical Marketing Blog | Medestra" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: isAr ? "أحدث استراتيجيات ومقالات التسويق الطبي لزيادة أرباح المستشفيات والعيادات." : "Latest medical marketing strategies and articles to increase hospital and clinic revenue." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-28 sm:top-32 rtl:left-4 ltr:right-4 sm:rtl:left-8 sm:ltr:right-8 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setIsModalOpen(true),
          className: "bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-2.5 px-4 sm:px-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2 text-sm sm:text-base",
          children: isAr ? "اكتب مدونتك الآن" : "Write Your Blog Now"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-3xl mx-auto mb-16 mt-8 sm:mt-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-sm font-bold mb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4" }),
              isAr ? "مدونة ميديسترا" : "Medestra Blog"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            className: "text-4xl md:text-5xl font-extrabold mb-6",
            children: [
              isAr ? "دليلك الشامل لـ " : "Your Ultimate Guide to ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-blue", children: isAr ? "النمو الطبي" : "Medical Growth" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            className: "text-lg text-slate-600 leading-relaxed",
            children: isAr ? "مقالات حصرية، استراتيجيات مجربة، وأسرار التسويق الطبي للعيادات والمستشفيات الحديثة." : "Exclusive articles, proven strategies, and medical marketing secrets for modern clinics and hospitals."
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl mx-auto mb-12 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: `absolute ${isAr ? "right-4" : "left-4"} w-5 h-5 text-slate-400` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            placeholder: isAr ? "ابحث باسم الكاتب أو عنوان المقال..." : "Search by author or article title...",
            className: `w-full bg-white border border-slate-200 rounded-full py-3.5 ${isAr ? "pr-12 pl-4" : "pl-12 pr-4"} text-slate-700 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all shadow-sm`
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          variants: containerVariants,
          initial: "hidden",
          animate: "visible",
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          children: filteredAndSortedPosts.length > 0 ? filteredAndSortedPosts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.article,
            {
              variants: itemVariants,
              className: "bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: `/blog/${post.slug}`, className: "block relative overflow-hidden aspect-[16/10]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: post.coverImage,
                      alt: isAr ? post.title_ar : post.title_en,
                      className: "w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500",
                      loading: "lazy"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-blue shadow-sm", children: isAr ? post.category_ar : post.category_en })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col flex-grow", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-slate-500 mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(post.date).toLocaleDateString(isAr ? "ar-EG" : "en-US") })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isAr ? post.readTime_ar : post.readTime_en })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/blog/${post.slug}`, className: "block group-hover:text-brand-blue transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-3 line-clamp-2 text-slate-900 group-hover:text-brand-blue", children: isAr ? post.title_ar : post.title_en }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow", children: isAr ? post.excerpt_ar : post.excerpt_en }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: `/blog/${post.slug}`,
                      className: "inline-flex items-center gap-2 text-brand-blue font-bold text-sm hover:text-blue-700 transition-colors mt-auto",
                      children: [
                        isAr ? "اقرأ المقال كاملًا" : "Read Full Article",
                        isAr ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                      ]
                    }
                  )
                ] })
              ]
            },
            post.id
          )) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full text-center py-12 text-slate-500", children: isAr ? "لم يتم العثور على مقالات تطابق بحثك." : "No articles found matching your search." })
        }
      ),
      isModalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          className: "bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setIsModalOpen(false),
                className: "absolute top-4 rtl:left-4 ltr:right-4 text-slate-400 hover:text-slate-600 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-6 h-6" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-900 mb-6 text-start", children: isAr ? "شروط كتابة مقال كضيف" : "Guest Blogging Guidelines" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-slate-600 mb-8 text-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5", children: "1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: isAr ? "يجب أن يكون المقال حصرياً ولم يسبق نشره في أي موقع آخر لتجنب مشاكل السيو." : "The article must be exclusive and not published anywhere else to avoid SEO issues." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5", children: "2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: isAr ? "عدد الكلمات لا يقل عن 800 كلمة ولا يزيد عن 1500 كلمة." : "Word count must be between 800 and 1500 words." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5", children: "3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: isAr ? "يجب أن يكون المحتوى ذو قيمة عالية ويركز على التسويق الطبي أو إدارة العيادات." : "Content must provide high value, focusing on medical marketing or clinic management." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center flex-shrink-0 mt-0.5", children: "4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: isAr ? "تجنب الترويج المباشر والمبالغ فيه، وركز على إفادة القارئ." : "Avoid overly direct promotion; focus on benefiting the reader." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: "https://wa.me/+201130428384?text=مرحباً، أود نشر مقال كضيف في مدونة ميديسترا.",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-4 px-6 rounded-xl transition-all hover:shadow-lg hover:-translate-y-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-6 h-6" }),
                  isAr ? "تواصل معنا الآن لنشر مدونتك" : "Contact Us Now to Publish"
                ]
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
};
export {
  BlogLandingPage as default
};

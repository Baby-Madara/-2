import { j as jsxRuntimeExports, d as ArrowRight, c as ArrowLeft, ak as User, a9 as Calendar, az as Clock, S as Share2 } from "./ui-vendor-a5hQU3E-.js";
import { i as useParams, r as reactExports, L as Link } from "./react-vendor-DY0Dzq76.js";
import { u as useLanguage, H as Helmet } from "./index-ViklniuA.js";
import { N as Navbar } from "./Navbar-BJ91ogvA.js";
import { F as Footer } from "./Footer-BtiNoqIK.js";
import { b as blogPosts } from "./blogPosts-DiDbaXt5.js";
import "./utils-vendor-Bpu5wKGe.js";
const BlogPostPage = () => {
  const { slug } = useParams();
  const { t, language, dir } = useLanguage();
  const isAr = language === "ar";
  const post = reactExports.useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);
  reactExports.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-slate-50 flex items-center justify-center flex-col gap-6", dir, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold", children: isAr ? "المقال غير موجود" : "Article Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "text-brand-blue font-bold flex items-center gap-2", children: [
        isAr ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" }),
        isAr ? "العودة للمدونة" : "Back to Blog"
      ] })
    ] });
  }
  const title = isAr ? post.title_ar : post.title_en;
  const description = isAr ? post.excerpt_ar : post.excerpt_en;
  const content = isAr ? post.content_ar : post.content_en;
  const author = isAr ? post.author_ar : post.author_en;
  const category = isAr ? post.category_ar : post.category_en;
  const readTime = isAr ? post.readTime_ar : post.readTime_en;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": `https://medestra.me${post.coverImage}`,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Medestra",
      "logo": {
        "@type": "ImageObject",
        "url": "https://medestra.me/mesestra.webp"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date
  };
  const shareUrl = `https://medestra.me/blog/${post.slug}`;
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: description,
        url: shareUrl
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert(isAr ? "تم نسخ الرابط!" : "Link copied!");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-white text-slate-900", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Helmet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("title", { children: [
        title,
        " | Medestra Blog"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:title", content: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:description", content: description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:image", content: `https://medestra.me${post.coverImage}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "og:type", content: "article" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { name: "author", content: author }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "article:author", content: author }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("meta", { property: "article:published_time", content: post.date }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: JSON.stringify(articleSchema) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-32 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 text-brand-blue font-bold text-sm mb-8 hover:text-blue-700 transition-colors", children: [
          isAr ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          isAr ? "العودة للمقالات" : "Back to Articles"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-xs font-bold", children: category }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-5xl font-extrabold mb-6 leading-normal", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 overflow-hidden", children: post.authorImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.authorImage, alt: author, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-brand-blue" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start", children: [
              post.authorLink ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: post.authorLink, target: "_blank", rel: "noopener noreferrer", className: "font-bold text-brand-blue hover:text-blue-700 hover:underline leading-tight", children: author }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-slate-800 leading-tight", children: author }),
              (post.authorRole_ar || post.authorRole_en) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-slate-400 leading-tight mt-0.5", children: isAr ? post.authorRole_ar : post.authorRole_en })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("time", { dateTime: post.date, children: new Date(post.date).toLocaleDateString(isAr ? "ar-EG" : "en-US", { year: "numeric", month: "long", day: "numeric" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: readTime })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 rounded-3xl overflow-hidden shadow-2xl aspect-[16/9] bg-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: post.coverImage,
          alt: title,
          className: "w-full h-full object-cover",
          loading: "eager"
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-lg md:prose-xl prose-slate max-w-none mx-auto mb-16 prose-headings:text-brand-blue prose-a:text-brand-blue hover:prose-a:text-blue-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: { __html: content } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: post.keywords.map((kw, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium", children: [
          "#",
          kw
        ] }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleShare,
            className: "inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-5 h-5" }),
              isAr ? "مشاركة المقال" : "Share Article"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
};
export {
  BlogPostPage as default
};

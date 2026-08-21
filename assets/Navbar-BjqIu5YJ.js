import { j as jsxRuntimeExports, d as ArrowRight, c as ArrowLeft, ao as Languages, aU as VolumeX, aV as Volume2, X, al as Menu } from "./ui-vendor-a5hQU3E-.js";
import { r as reactExports, u as useLocation, h as useNavigate, L as Link } from "./react-vendor-DY0Dzq76.js";
import { u as useLanguage, a as useAudio } from "./index-DQ3_D6t3.js";
const Navbar = () => {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const { t, language, toggleLanguage, setLanguage, dir } = useLanguage();
  const { isMuted, toggleMute } = useAudio();
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavigation = (e, id, href) => {
    e.preventDefault();
    setIsOpen(false);
    const isLandingPage = ["/", "/about", "/services", "/markets", "/contact"].includes(location.pathname);
    if (!isLandingPage) {
      navigate(href);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      window.history.pushState({}, "", href);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  reactExports.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20 || document.documentElement.scrollTop > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems = [
    { label: t.nav.home, id: "hero", href: "/" },
    { label: t.nav.aboutUs, id: "aboutUs", href: "/about" },
    { label: t.nav.services, id: "services", href: "/services" },
    { label: t.nav.markets, id: "markets", href: "/markets" },
    { label: t.nav.contact, id: "contact", href: "/contact" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: `fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-[rgba(255,255,255,0.6)] backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center h-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-4", children: [
        location.pathname !== "/" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => navigate(-1),
            className: `flex items-center gap-1 px-3 py-1.5 rounded-xl border transition-all hover:scale-105 active:scale-95 ${scrolled ? "border-gray-200 text-gray-700 bg-white/50 hover:border-brand-blue hover:text-brand-blue" : "border-white/20 text-gray-800 bg-white/20 hover:bg-white/40"}`,
            children: [
              dir === "rtl" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold", children: t.nav.back })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "cursor-pointer", onClick: () => navigate("/"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/mesestra.webp", alt: "Medestra Logo", className: "h-10 md:h-12 w-auto object-contain" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-8", children: [
        navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: item.href,
            onClick: (e) => handleNavigation(e, item.id, item.href),
            className: `text-base font-medium whitespace-nowrap transition-colors hover:text-brand-blue ${scrolled ? "text-gray-700" : "text-gray-800"}`,
            children: item.label
          },
          item.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/courses",
            className: `text-base font-medium whitespace-nowrap transition-colors hover:text-brand-blue ${scrolled ? "text-gray-700" : "text-gray-800"}`,
            children: t.nav.courses
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/books",
            className: `text-base font-medium whitespace-nowrap transition-colors hover:text-brand-blue ${scrolled ? "text-gray-700" : "text-gray-800"}`,
            children: t.nav.specialtyBooks
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/products",
            className: `text-base font-medium whitespace-nowrap transition-colors hover:text-brand-blue ${scrolled ? "text-gray-700" : "text-gray-800"}`,
            children: t.nav.products
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/blog",
            className: `text-base font-medium whitespace-nowrap transition-colors hover:text-brand-blue ${scrolled ? "text-gray-700" : "text-gray-800"}`,
            children: language === "ar" ? "المدونة" : "Blog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: toggleLanguage,
            className: `flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${scrolled ? "border-gray-300 text-gray-700 hover:border-brand-blue" : "border-gray-400 text-gray-800 hover:border-brand-blue"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { size: 18 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase", children: language === "ar" ? "English" : "عربي" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setLanguage("es"),
              className: `px-2 py-1 text-sm font-bold rounded border transition-colors ${language === "es" ? "bg-brand-blue text-white border-brand-blue" : scrolled ? "border-gray-300 text-gray-700 hover:border-brand-blue hover:text-brand-blue" : "border-gray-400 text-gray-800 hover:border-brand-blue hover:text-brand-blue"}`,
              children: "ES"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setLanguage("it"),
              className: `px-2 py-1 text-sm font-bold rounded border transition-colors ${language === "it" ? "bg-brand-blue text-white border-brand-blue" : scrolled ? "border-gray-300 text-gray-700 hover:border-brand-blue hover:text-brand-blue" : "border-gray-400 text-gray-800 hover:border-brand-blue hover:text-brand-blue"}`,
              children: "IT"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleMute,
            className: `flex items-center gap-1 px-3 py-1 rounded-full border transition-colors ${scrolled ? "border-gray-300 text-gray-700 hover:border-brand-blue" : "border-gray-400 text-gray-800 hover:border-brand-blue"}`,
            title: isMuted ? "Unmute audio" : "Mute audio",
            children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { size: 18 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 18 })
          }
        ),
        location.pathname === "/products" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "/MePOS.pdf",
            download: "MePOS.pdf",
            className: "hidden lg:flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap",
            children: language === "ar" ? "تحميل البورتفوليو" : "Download Portfolio"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleMute,
            className: "text-gray-700 hover:text-brand-blue focus:outline-none",
            title: isMuted ? "Unmute audio" : "Mute audio",
            children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 20 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleLanguage,
            className: "flex items-center gap-1 text-gray-700 font-bold",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm uppercase", children: language === "ar" ? "En" : "عربي" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-sm font-bold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setLanguage("es"),
              className: `transition-colors ${language === "es" ? "text-brand-blue" : "text-gray-700"}`,
              children: "ES"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "|" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setLanguage("it"),
              className: `transition-colors ${language === "it" ? "text-brand-blue" : "text-gray-700"}`,
              children: "IT"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setIsOpen(!isOpen),
            className: "text-gray-700 hover:text-brand-blue focus:outline-none",
            "aria-label": isOpen ? "Close menu" : "Open menu",
            children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 28 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 28 })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `md:hidden bg-white shadow-xl absolute w-full left-0 top-full border-t border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-start", children: [
          navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: item.href,
              onClick: (e) => handleNavigation(e, item.id, item.href),
              className: "block px-3 py-3 w-full text-start text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md",
              children: item.label
            },
            item.id
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/courses",
              className: "block px-3 py-3 w-full text-start text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md border-t border-gray-100 mt-2",
              onClick: () => setIsOpen(false),
              children: t.nav.courses
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/books",
              className: "block px-3 py-3 w-full text-start text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md",
              onClick: () => setIsOpen(false),
              children: t.nav.specialtyBooks
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/products",
              className: "block px-3 py-3 w-full text-start text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md",
              onClick: () => setIsOpen(false),
              children: t.nav.products
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/blog",
              className: "block px-3 py-3 w-full text-start text-base font-medium text-gray-700 hover:text-brand-blue hover:bg-gray-50 rounded-md border-t border-gray-100 mt-2",
              onClick: () => setIsOpen(false),
              children: language === "ar" ? "المدونة" : "Blog"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/#contact",
              onClick: (e) => handleNavigation(e, "contact", "/contact"),
              className: "mt-4 w-full block text-center bg-brand-blue text-white px-6 py-3 rounded-xl font-bold",
              children: t.nav.book
            }
          ),
          location.pathname === "/products" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: "/MePOS.pdf",
              download: "MePOS.pdf",
              className: "mt-2 w-full block text-center bg-gray-100 text-brand-blue border border-brand-blue/20 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors",
              children: language === "ar" ? "تحميل البورتفوليو" : "Download Portfolio"
            }
          )
        ] })
      }
    )
  ] });
};
export {
  Navbar as N
};

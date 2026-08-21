import { j as jsxRuntimeExports, m as motion, av as ShieldCheck, K as Search, A as AnimatePresence, a4 as CircleCheckBig, ac as CircleX } from "./ui-vendor-a5hQU3E-.js";
import { r as reactExports } from "./react-vendor-DY0Dzq76.js";
import { u as useLanguage } from "./index-DQ3_D6t3.js";
import { N as Navbar } from "./Navbar-BjqIu5YJ.js";
import { F as Footer } from "./Footer-DB-JCz_e.js";
import "./utils-vendor-Bpu5wKGe.js";
const CertificateVerification = () => {
  const { t, language, dir } = useLanguage();
  const [certId, setCertId] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("idle");
  const isAr = language === "ar";
  const certRegex = /^MED-\d{3}-[A-Z]{2}ra\d{2}@[A-Z]\/[A-Z0-9]{4}$/i;
  const handleVerify = (e) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setStatus("loading");
    setTimeout(() => {
      if (certRegex.test(certId.trim())) {
        setStatus("valid");
      } else {
        setStatus("invalid");
      }
    }, 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 font-sans", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pt-32 pb-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { scale: 0 },
            animate: { scale: 1 },
            className: "w-20 h-20 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-10 h-10 text-brand-blue" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl md:text-4xl font-black text-gray-900 mb-4", children: t.certificate.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 text-lg max-w-xl mx-auto", children: t.certificate.subtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-[2.5rem] shadow-2xl shadow-brand-blue/5 border border-gray-100 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleVerify, className: "relative mb-8 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "text",
                  value: certId,
                  onChange: (e) => setCertId(e.target.value),
                  placeholder: t.certificate.placeholder,
                  className: `w-full px-8 py-5 rounded-2xl bg-gray-50 border-2 transition-all outline-none text-lg font-mono text-center tracking-widest ${status === "invalid" ? "border-red-200 focus:border-red-400" : "border-gray-100 focus:border-brand-blue"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: `absolute ${isAr ? "left-6" : "right-6"} top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: status === "loading",
                className: "mt-6 w-full md:w-auto px-12 py-4 bg-brand-blue text-white rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-brand-blue/30 active:scale-95 transition-all disabled:opacity-50",
                children: status === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isAr ? "جاري التحقق..." : "Verifying..." })
                ] }) : t.certificate.verify
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
            status === "valid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                className: "bg-green-50 border border-green-100 rounded-3xl p-8 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-16 h-16 text-green-500 mx-auto mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-green-800 mb-2", children: t.certificate.valid })
                ]
              },
              "valid"
            ),
            status === "invalid" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -20 },
                className: "bg-red-50 border border-red-100 rounded-3xl p-8 text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-16 h-16 text-red-500 mx-auto mb-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-red-800", children: t.certificate.invalid }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600/70 mt-2 text-sm", children: isAr ? "يرجى التأكد من كتابة الرقم بشكل صحيح أو التواصل معنا للدعم." : "Please check the ID or contact us for support." })
                ]
              },
              "invalid"
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-50 border-t border-gray-100 p-6 flex items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "text-brand-blue", size: 24 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-gray-500 uppercase tracking-widest", children: "Medestra Anti-Forgery Shield Active" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
};
export {
  CertificateVerification as default
};

import { j as jsxRuntimeExports, a8 as FileText, au as ChevronUp, s as ChevronDown, aA as Truck, a6 as RotateCcw, aB as Shield } from "./ui-vendor-a5hQU3E-.js";
import { r as reactExports } from "./react-vendor-DY0Dzq76.js";
import { u as useLanguage } from "./index-4qG1EIbH.js";
import { N as Navbar } from "./Navbar-DAC1ZDq0.js";
import { F as Footer } from "./Footer-BqkZY3eo.js";
import { W as WhatsAppButton } from "./WhatsAppButton-BjgNavvJ.js";
import "./utils-vendor-Bpu5wKGe.js";
const POLICY_COLORS = {
  terms: { from: "#3B82F6", to: "#06B6D4", lightBg: "rgba(59,130,246,0.06)", border: "rgba(59,130,246,0.2)", text: "#2563EB" },
  privacy: { from: "#A855F7", to: "#6366F1", lightBg: "rgba(168,85,247,0.06)", border: "rgba(168,85,247,0.2)", text: "#7C3AED" },
  returns: { from: "#10B981", to: "#14B8A6", lightBg: "rgba(16,185,129,0.06)", border: "rgba(16,185,129,0.2)", text: "#059669" },
  delivery: { from: "#F97316", to: "#F59E0B", lightBg: "rgba(249,115,22,0.06)", border: "rgba(249,115,22,0.2)", text: "#EA580C" }
};
const POLICY_ICONS = {
  terms: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5" }),
  privacy: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
  returns: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-5 h-5" }),
  delivery: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-5 h-5" })
};
const POLICY_KEYS = ["terms", "privacy", "returns", "delivery"];
const PoliciesPage = () => {
  const { t, language, dir } = useLanguage();
  const p = t.policies;
  const isRtl = language === "ar";
  const [openPolicy, setOpenPolicy] = reactExports.useState("terms");
  const toggle = (id) => setOpenPolicy((prev) => prev === id ? null : id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-transparent", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative z-10 pt-28 pb-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-5",
            style: { background: "rgba(0,174,239,0.1)", color: "#00AEEF", border: "1px solid rgba(0,174,239,0.25)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
              p.pageTitle
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight", children: isRtl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "سياسات ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#00AEEF" }, children: "Medestra" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#00AEEF" }, children: "Medestra" }),
          " Policies"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 text-lg max-w-xl mx-auto leading-relaxed", children: p.pageSubtitle })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3", children: POLICY_KEYS.map((key) => {
        const policyData = p[key];
        const colors = POLICY_COLORS[key];
        const isActive = openPolicy === key;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              setOpenPolicy(key);
              setTimeout(() => {
                var _a;
                return (_a = document.getElementById(`policy-${key}`)) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            },
            style: {
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1.25rem",
              borderRadius: "9999px",
              background: isActive ? `linear-gradient(135deg, ${colors.from}, ${colors.to})` : "rgba(255,255,255,0.8)",
              border: isActive ? "none" : `1px solid ${colors.border}`,
              color: isActive ? "#fff" : colors.text,
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 600,
              transition: "all 0.25s",
              boxShadow: isActive ? `0 4px 14px ${colors.lightBg.replace("0.06", "0.35")}` : "none",
              backdropFilter: "blur(8px)"
            },
            children: [
              POLICY_ICONS[key],
              policyData.title
            ]
          },
          key
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4", children: POLICY_KEYS.map((key) => {
        const policyData = p[key];
        const isOpen = openPolicy === key;
        const colors = POLICY_COLORS[key];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            id: `policy-${key}`,
            style: {
              borderRadius: "1.25rem",
              border: `1px solid ${isOpen ? colors.border : "rgba(0,0,0,0.07)"}`,
              background: isOpen ? `linear-gradient(135deg, ${colors.lightBg}, rgba(255,255,255,0.9))` : "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              overflow: "hidden",
              transition: "all 0.3s",
              boxShadow: isOpen ? `0 8px 32px ${colors.lightBg.replace("0.06", "0.15")}` : "0 2px 8px rgba(0,0,0,0.04)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => toggle(key),
                  style: {
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 1.5rem",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    flexDirection: isRtl ? "row-reverse" : "row",
                    textAlign: isRtl ? "right" : "left"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "1rem", flexDirection: isRtl ? "row-reverse" : "row" }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          style: {
                            width: "2.75rem",
                            height: "2.75rem",
                            borderRadius: "0.875rem",
                            background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            flexShrink: 0,
                            boxShadow: `0 4px 12px ${colors.lightBg.replace("0.06", "0.4")}`
                          },
                          children: POLICY_ICONS[key]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: isRtl ? "right" : "left" }, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#111827", fontWeight: 700, fontSize: "1.05rem" }, children: policyData.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#9CA3AF", fontSize: "0.78rem", marginTop: "0.1rem" }, children: policyData.titleEn })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: colors.text, flexShrink: 0 }, children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5" }) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  style: {
                    maxHeight: isOpen ? "9999px" : "0",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s ease, opacity 0.3s ease"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        padding: "0 1.5rem 1.75rem",
                        borderTop: `1px solid ${colors.border}`,
                        marginTop: "0"
                      },
                      children: [
                        "intro" in policyData && policyData.intro && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: {
                              color: "#374151",
                              lineHeight: 1.8,
                              margin: "1.25rem 0",
                              fontSize: "0.95rem",
                              background: colors.lightBg,
                              border: `1px solid ${colors.border}`,
                              borderRadius: "0.75rem",
                              padding: "1rem 1.25rem",
                              textAlign: isRtl ? "right" : "left"
                            },
                            children: policyData.intro
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: { listStyle: "none", padding: 0, margin: "1.25rem 0 0", display: "flex", flexDirection: "column", gap: "0.75rem" }, children: policyData.points.map((point, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "li",
                          {
                            style: {
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.75rem",
                              flexDirection: isRtl ? "row-reverse" : "row"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    width: "1.5rem",
                                    height: "1.5rem",
                                    minWidth: "1.5rem",
                                    borderRadius: "50%",
                                    background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#fff",
                                    fontSize: "0.65rem",
                                    fontWeight: 700,
                                    marginTop: "0.15rem"
                                  },
                                  children: idx + 1
                                }
                              ),
                              /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  style: {
                                    color: "#4B5563",
                                    fontSize: "0.9rem",
                                    lineHeight: 1.8,
                                    flex: 1,
                                    textAlign: isRtl ? "right" : "left"
                                  },
                                  children: point
                                }
                              )
                            ]
                          },
                          idx
                        )) }),
                        "outro" in policyData && policyData.outro && /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            style: {
                              color: "#6B7280",
                              lineHeight: 1.8,
                              marginTop: "1.5rem",
                              fontSize: "0.875rem",
                              borderTop: "1px solid rgba(0,0,0,0.06)",
                              paddingTop: "1.25rem",
                              textAlign: isRtl ? "right" : "left"
                            },
                            children: policyData.outro
                          }
                        )
                      ]
                    }
                  )
                }
              )
            ]
          },
          key
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WhatsAppButton, {})
  ] });
};
export {
  PoliciesPage as default
};

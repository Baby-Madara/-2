import { j as jsxRuntimeExports, m as motion, aF as Store, aG as Building2, aH as Warehouse, aA as Truck, aI as Stethoscope, aJ as Cross, aK as MonitorSmartphone, a as ShoppingCart, aL as ChartColumn, U as Users, aM as Calculator, as as LayoutDashboard, az as Clock, aN as ScanBarcode, av as ShieldCheck, C as CircleCheck, aO as UserCheck, l as Settings, aP as Link } from "./ui-vendor-a5hQU3E-.js";
import { N as Navbar } from "./Navbar-BmjrySj7.js";
import { F as Footer } from "./Footer-8-rgPz_h.js";
import { u as useLanguage } from "./index-h9-LgMCI.js";
import "./react-vendor-DY0Dzq76.js";
import "./utils-vendor-Bpu5wKGe.js";
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
const content = {
  ar: {
    hero: {
      title: "نظام",
      brand: "MEPOS",
      desc: "نظام ERP وPOS متكامل تم تطويره بواسطة <strong>Medestra</strong> لإدارة الصيدليات الفردية وسلاسل الصيدليات. يجمع بين إدارة المبيعات، المخزون، الموارد البشرية، المحاسبة، وإدارة العملاء في منصة واحدة."
    },
    vision: {
      title: "رؤية النظام",
      desc: "أن يكون MEPOS أفضل نظام لإدارة الصيدليات في الشرق الأوسط وأفريقيا، ويقدم تجربة سهلة وسريعة وآمنة تساعد أصحاب الصيدليات على زيادة الأرباح وتقليل الأخطاء وتحسين إدارة جميع العمليات."
    },
    targets: {
      title: "الفئات المستهدفة",
      items: [
        { name: "الصيدليات الفردية", icon: Store },
        { name: "سلاسل الصيدليات", icon: Building2 },
        { name: "المستودعات الدوائية", icon: Warehouse },
        { name: "شركات التوزيع", icon: Truck },
        { name: "المخازن الطبية", icon: Warehouse },
        { name: "العيادات الطبية", icon: Stethoscope },
        { name: "المراكز الطبية", icon: Cross }
      ]
    },
    modules: {
      title: "الوحدات الرئيسية للنظام",
      items: [
        {
          title: "نقطة البيع (POS)",
          icon: MonitorSmartphone,
          features: ["• بيع سريع وشاشة Touch Screen", "• Barcode Scanner و QR Code", "• البحث السريع (علمي وتجاري)", "• طرق دفع متعددة (Cash, Visa, محافظ إلكترونية)", "• Split Payment و Hold/Resume Invoice", "• المرتجعات والاستبدال", "• الخصومات وكوبونات الولاء"]
        },
        {
          title: "إدارة المخزون",
          icon: Warehouse,
          features: ["• الأصناف والتصنيفات والشركات", "• الحد الأدنى وإعادة الطلب", "• متابعة تواريخ الصلاحية والباتش", "• جرد كامل وجزئي", "• تحويلات بين الفروع والمخازن", "• تسويات المخزون (تالف وهالك)", "• المنتجات المجانية والبديلة"]
        },
        {
          title: "المشتريات",
          icon: ShoppingCart,
          features: ["• طلبات وعروض وأوامر شراء", "• استلام الأصناف ومرتجعات الموردين", "• إدارة وتقييم الموردين", "• متابعة ديون الموردين"]
        },
        {
          title: "المبيعات و CRM",
          icon: ChartColumn,
          features: ["• فواتير بيع وعروض أسعار", "• متابعة العملاء وحدود الائتمان", "• رسائل SMS و WhatsApp Integration", "• نقاط الولاء وتذكير بالأدوية", "• متابعة الأمراض المزمنة"]
        },
        {
          title: "الموارد البشرية",
          icon: Users,
          features: ["• الموظفين والعقود والشفتات", "• الحضور والانصراف (بصمة)", "• الإجازات والمرتبات", "• المكافآت والجزاءات", "• تقييم الأداء والترقيات"]
        },
        {
          title: "الحسابات العامة",
          icon: Calculator,
          features: ["• دليل الحسابات والقيود اليومية", "• العملاء، الموردين، الخزائن، البنوك", "• المصروفات والإيرادات والضرائب", "• الأرباح والخسائر", "• الميزانية العمومية والتدفقات النقدية"]
        }
      ]
    },
    features: {
      title: "مميزات نظام متقدمة",
      items: [
        { title: "لوحة تحكم (Dashboard)", desc: "أكثر من 300 تقرير، متابعة المبيعات، الأرباح، المنتجات الراكدة وقرب الانتهاء لحظياً.", icon: LayoutDashboard },
        { title: "تعدد الفروع والمخازن", desc: "إدارة عدد غير محدود من الفروع والمخازن مع تقارير مخصصة لكل فرع ونقل سهل للمنتجات.", icon: Building2 },
        { title: "أولوية البيع FEFO", desc: "نظام ذكي لمتابعة انتهاء الصلاحية والتنبيهات، وضمان بيع الأقدم أولاً.", icon: Clock },
        { title: "نظام باركود متكامل", desc: "إنشاء وطباعة وقراءة الباركود و QR Code لسهولة إدارة الأصناف.", icon: ScanBarcode }
      ]
    },
    security: {
      title: "الأمان والحماية",
      features: ["تشفير كامل للبيانات", "سجل العمليات (Audit Log)", "المصادقة الثنائية (2FA)", "تتبع الأجهزة والـ IP Restrictions", "نسخ احتياطي تلقائي (Cloud & Local)"]
    },
    permissions: {
      title: "صلاحيات دقيقة",
      items: [
        { title: "Super Admin", desc: "تحكم كامل في جميع الفروع، الإعدادات، المستخدمين، التقارير والنسخ الاحتياطية." },
        { title: "مدير الفرع", desc: "إدارة الفرع، المبيعات، المخزون، الموظفين واعتماد الجرد الخاص بالفرع." },
        { title: "الصيدلي", desc: "البيع، المرتجعات، صرف الروشتات، البحث عن البدائل والاطلاع على المخزون." },
        { title: "مساعد الصيدلي", desc: "البيع، البحث عن المنتجات، طباعة الفواتير (بدون صلاحيات حذف أو تعديل)." }
      ]
    },
    tech: {
      title: "تقنيات حديثة وتكامل متقدم",
      tags: ["Web Based", "Cloud Ready", "Offline Mode", "Dark & Light Mode", "REST API", "Multi Language (Ar/En)"],
      saas: {
        title: "نظام التراخيص (SaaS)",
        desc: "إدارة مركزية للتراخيص تسمح لشركة <strong>Medestra</strong> بالتحكم في العملاء والاشتراكات بكفاءة:",
        features: ["تحديد عدد الفروع والمستخدمين", "تحديد مواعيد الاشتراك والتجديد التلقائي", "إدارة الإصدارات (Version Control) والتحديثات التلقائية", "ترقية وتخفيض الباقات بسهولة"]
      },
      integrations: {
        title: "التكاملات الخارجية",
        features: ["بوابات الدفع الإلكتروني.", "WhatsApp Business API و SMS Gateway.", "أجهزة الباركود، الطابعات، وقارئات QR.", "أجهزة البصمة والموازين.", "أنظمة المحاسبة الخارجية عبر API.", "دعم الفواتير الإلكترونية (E-invoicing)."]
      }
    },
    cta: {
      title: "أهداف MEPOS",
      desc: "نحن لا نقدم مجرد برنامج كاشير، بل منصة متكاملة تهدف إلى تقليل الأخطاء البشرية، تسريع خدمة العملاء، تقليل الفاقد، وزيادة الأرباح مع توفير نظام قابل للتوسع مع نمو نشاطك التجاري.",
      button: "تواصل معنا الآن للبدء"
    }
  },
  en: {
    hero: {
      title: "System",
      brand: "MEPOS",
      desc: "An integrated ERP and POS system developed by <strong>Medestra</strong> for managing individual pharmacies and pharmacy chains. It combines sales, inventory, HR, accounting, and customer management in a single platform."
    },
    vision: {
      title: "System Vision",
      desc: "To be the best pharmacy management system in the Middle East and Africa, offering a simple, fast, and secure experience that helps pharmacy owners increase profits, reduce errors, and improve all operations management."
    },
    targets: {
      title: "Target Audience",
      items: [
        { name: "Individual Pharmacies", icon: Store },
        { name: "Pharmacy Chains", icon: Building2 },
        { name: "Drug Warehouses", icon: Warehouse },
        { name: "Distribution Companies", icon: Truck },
        { name: "Medical Stores", icon: Warehouse },
        { name: "Medical Clinics", icon: Stethoscope },
        { name: "Medical Centers", icon: Cross }
      ]
    },
    modules: {
      title: "Main System Modules",
      items: [
        {
          title: "Point of Sale (POS)",
          icon: MonitorSmartphone,
          features: ["• Fast selling and Touch Screen", "• Barcode Scanner and QR Code", "• Quick Search (Scientific & Commercial)", "• Multiple payment methods (Cash, Visa, E-wallets)", "• Split Payment & Hold/Resume Invoice", "• Returns and Exchanges", "• Discounts and Loyalty Coupons"]
        },
        {
          title: "Inventory Management",
          icon: Warehouse,
          features: ["• Items, Categories, and Companies", "• Minimum limit and Reorder level", "• Expiry dates and Batch tracking", "• Full and partial inventory checks", "• Transfers between branches/stores", "• Inventory adjustments (damaged & expired)", "• Free and alternative products"]
        },
        {
          title: "Purchasing",
          icon: ShoppingCart,
          features: ["• Requests, Offers, and Purchase Orders", "• Receiving items and supplier returns", "• Supplier management and evaluation", "• Tracking supplier debts"]
        },
        {
          title: "Sales & CRM",
          icon: ChartColumn,
          features: ["• Sales invoices and Quotations", "• Customer tracking and Credit limits", "• SMS and WhatsApp Integration", "• Loyalty points and Medication reminders", "• Chronic diseases tracking"]
        },
        {
          title: "Human Resources (HR)",
          icon: Users,
          features: ["• Employees, Contracts, and Shifts", "• Attendance and Departure (Fingerprint)", "• Leaves and Salaries", "• Rewards and Penalties", "• Performance evaluation and Promotions"]
        },
        {
          title: "General Accounting",
          icon: Calculator,
          features: ["• Chart of accounts and Journal entries", "• Customers, Suppliers, Safes, Banks", "• Expenses, Revenues, and Taxes", "• Profit and Loss", "• Balance Sheet and Cash Flows"]
        }
      ]
    },
    features: {
      title: "Advanced System Features",
      items: [
        { title: "Dashboard", desc: "Over 300 reports, real-time tracking of sales, profits, stagnant products, and near-expiry items.", icon: LayoutDashboard },
        { title: "Multi-Branch & Stores", desc: "Manage unlimited branches and stores with customized reports and easy product transfers.", icon: Building2 },
        { title: "FEFO Selling Priority", desc: "Smart system to track expiry dates and alerts, ensuring the oldest items are sold first.", icon: Clock },
        { title: "Integrated Barcode System", desc: "Create, print, and read Barcodes and QR Codes for easy item management.", icon: ScanBarcode }
      ]
    },
    security: {
      title: "Security and Protection",
      features: ["End-to-End Data Encryption", "Audit Log", "Two-Factor Authentication (2FA)", "Device Tracking and IP Restrictions", "Automatic Backup (Cloud & Local)"]
    },
    permissions: {
      title: "Precise Permissions",
      items: [
        { title: "Super Admin", desc: "Full control over all branches, settings, users, reports, and backups." },
        { title: "Branch Manager", desc: "Manage the branch, sales, inventory, employees, and approve branch inventory checks." },
        { title: "Pharmacist", desc: "Sales, returns, dispensing prescriptions, searching for alternatives, and viewing inventory." },
        { title: "Pharmacist Assistant", desc: "Sales, searching for products, printing invoices (without delete or edit permissions)." }
      ]
    },
    tech: {
      title: "Modern Tech & Advanced Integration",
      tags: ["Web Based", "Cloud Ready", "Offline Mode", "Dark & Light Mode", "REST API", "Multi Language (Ar/En)"],
      saas: {
        title: "Licensing System (SaaS)",
        desc: "Centralized licensing management allowing <strong>Medestra</strong> to control clients and subscriptions efficiently:",
        features: ["Set number of branches and users", "Set subscription and auto-renewal dates", "Version Control and automatic updates", "Easy package upgrades and downgrades"]
      },
      integrations: {
        title: "External Integrations",
        features: ["Electronic Payment Gateways.", "WhatsApp Business API & SMS Gateway.", "Barcode Devices, Printers, and QR readers.", "Fingerprint Devices and Scales.", "External Accounting Systems via API.", "E-invoicing Support."]
      }
    },
    cta: {
      title: "MEPOS Goals",
      desc: "We offer more than just a cashier program; we provide an integrated platform aimed at reducing human errors, speeding up customer service, minimizing waste, and increasing profits with a scalable system that grows with your business.",
      button: "Contact Us Now to Start"
    }
  }
};
const ProductsPage = () => {
  const langCtx = useLanguage();
  const language = (langCtx == null ? void 0 : langCtx.language) || "en";
  const isArabic = language === "ar";
  const t = isArabic ? content.ar : content.en;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50 flex flex-col font-sans", dir: isArabic ? "rtl" : "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-blue/10 to-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.img,
        {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.8, ease: "easeOut" },
          src: "/mepos-logo.webp",
          alt: "MEPOS Logo",
          className: "h-32 md:h-48 mx-auto mb-8 object-contain drop-shadow-xl",
          onError: (e) => {
            e.target.src = "/mesestra.webp";
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.3 },
          className: "text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 flex items-center justify-center gap-3",
          children: isArabic ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            t.hero.title,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-blue", children: t.hero.brand })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-blue", children: t.hero.brand }),
            " ",
            t.hero.title
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          className: "text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed",
          dangerouslySetInnerHTML: { __html: t.hero.desc }
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 bg-white px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-4", children: t.vision.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-700 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm leading-relaxed", children: t.vision.desc })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-gray-50 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-center text-gray-900 mb-10", children: t.targets.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: t.targets.items.map((item, idx) => {
        const IconComponent = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            variants: fadeUpVariant,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true },
            className: "bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow flex flex-col items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { size: 24 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-gray-800", children: item.name })
            ]
          },
          idx
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16", children: t.modules.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8", children: t.modules.items.map((mod, idx) => {
        const IconComponent = mod.icon;
        const colorClasses = [
          "text-brand-blue border-brand-blue/30",
          "text-brand-green border-brand-green/30",
          "text-brand-yellow border-brand-yellow/30",
          "text-brand-red border-brand-red/30",
          "text-purple-600 border-purple-600/30",
          "text-blue-600 border-blue-600/30"
        ];
        const colorClass = colorClasses[idx % colorClasses.length];
        const iconColor = colorClass.split(" ")[0];
        const borderColor = colorClass.split(" ")[1];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { variants: fadeUpVariant, initial: "hidden", whileInView: "visible", viewport: { once: true }, className: `bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:${borderColor} transition-colors`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-3 mb-4 ${iconColor}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { size: 32 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-gray-900", children: mod.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-gray-700", children: mod.features.map((feature, fIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: feature }, fIdx)) })
        ] }, idx);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-gray-900 text-white px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-center mb-12", children: t.features.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", children: t.features.items.map((feat, idx) => {
        const IconComponent = feat.icon;
        const colors = ["text-brand-yellow", "text-brand-blue", "text-brand-red", "text-brand-green"];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { size: 40, className: `${colors[idx % colors.length]} mb-4` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-2", children: feat.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: feat.desc })
        ] }, idx);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-gray-50 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto grid lg:grid-cols-2 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "text-brand-blue" }),
          " ",
          t.security.title
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: t.security.features.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "text-green-500 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: item })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "text-brand-blue" }),
          " ",
          t.permissions.title
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: t.permissions.items.map((perm, i) => {
          const borderColors = ["border-brand-red", "border-brand-blue", "border-brand-green", "border-gray-400"];
          const borderDir = isArabic ? "border-r-4" : "border-l-4";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white p-5 rounded-xl shadow-sm ${borderDir} ${borderColors[i % borderColors.length]}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-gray-900 mb-1", children: perm.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: perm.desc })
          ] }, i);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 bg-white px-4 border-t border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold text-gray-900 mb-10", children: t.tech.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-4 mb-12", children: t.tech.tags.map((tech, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gray-100 text-gray-800 px-6 py-2 rounded-full font-medium text-sm", children: tech }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid md:grid-cols-2 gap-8 ${isArabic ? "text-right" : "text-left"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-brand-blue/5 to-transparent p-8 rounded-2xl border border-brand-blue/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-2xl font-bold text-brand-blue mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}),
            " ",
            t.tech.saas.title
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-700 mb-4 leading-relaxed", dangerouslySetInnerHTML: { __html: t.tech.saas.desc } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside space-y-2 text-gray-600", children: t.tech.saas.features.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: feat }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-brand-green/5 to-transparent p-8 rounded-2xl border border-brand-green/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-2xl font-bold text-brand-green mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {}),
            " ",
            t.tech.integrations.title
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside space-y-3 text-gray-600", children: t.tech.integrations.features.map((feat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: feat }, i)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-brand-blue text-white px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-6", children: t.cta.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-blue-100 mb-10 leading-relaxed", children: t.cta.desc }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/contact", className: "inline-block bg-white text-brand-blue font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-gray-50 transition-colors", children: t.cta.button })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
};
export {
  ProductsPage as default
};

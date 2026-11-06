import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
import {
  MonitorSmartphone, ShoppingCart, Users, Calculator,
  BarChart3, LayoutDashboard, Building2, Warehouse,
  Clock, ScanBarcode, ShieldCheck, CheckCircle2,
  Stethoscope, Store, Cross, Truck, Link,
  Settings, UserCheck, Sparkles
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { useLanguage } from '../LanguageContext';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const content = {
  ar: {
    hero: {
      title: 'نظام',
      brand: 'MEPOS',
      desc: 'نظام ERP وPOS متكامل تم تطويره بواسطة <strong>Medestra</strong> لإدارة الصيدليات الفردية وسلاسل الصيدليات. يجمع بين إدارة المبيعات، المخزون، الموارد البشرية، المحاسبة، وإدارة العملاء في منصة واحدة.'
    },
    vision: {
      title: 'رؤية النظام',
      desc: 'أن يكون MEPOS أفضل نظام لإدارة الصيدليات في الشرق الأوسط وأفريقيا، ويقدم تجربة سهلة وسريعة وآمنة تساعد أصحاب الصيدليات على زيادة الأرباح وتقليل الأخطاء وتحسين إدارة جميع العمليات.'
    },
    targets: {
      title: 'الفئات المستهدفة',
      items: [
        { name: 'الصيدليات الفردية', icon: Store },
        { name: 'سلاسل الصيدليات', icon: Building2 },
        { name: 'المستودعات الدوائية', icon: Warehouse },
        { name: 'شركات التوزيع', icon: Truck },
        { name: 'المخازن الطبية', icon: Warehouse },
        { name: 'العيادات الطبية', icon: Stethoscope },
        { name: 'المراكز الطبية', icon: Cross },
      ]
    },
    modules: {
      title: 'الوحدات الرئيسية للنظام',
      items: [
        {
          title: 'نقطة البيع (POS)',
          icon: MonitorSmartphone,
          features: ['• بيع سريع وشاشة Touch Screen', '• Barcode Scanner و QR Code', '• البحث السريع (علمي وتجاري)', '• طرق دفع متعددة (Cash, Visa, محافظ إلكترونية)', '• Split Payment و Hold/Resume Invoice', '• المرتجعات والاستبدال', '• الخصومات وكوبونات الولاء']
        },
        {
          title: 'إدارة المخزون',
          icon: Warehouse,
          features: ['• الأصناف والتصنيفات والشركات', '• الحد الأدنى وإعادة الطلب', '• متابعة تواريخ الصلاحية والباتش', '• جرد كامل وجزئي', '• تحويلات بين الفروع والمخازن', '• تسويات المخزون (تالف وهالك)', '• المنتجات المجانية والبديلة']
        },
        {
          title: 'المشتريات',
          icon: ShoppingCart,
          features: ['• طلبات وعروض وأوامر شراء', '• استلام الأصناف ومرتجعات الموردين', '• إدارة وتقييم الموردين', '• متابعة ديون الموردين']
        },
        {
          title: 'المبيعات و CRM',
          icon: BarChart3,
          features: ['• فواتير بيع وعروض أسعار', '• متابعة العملاء وحدود الائتمان', '• رسائل SMS و WhatsApp Integration', '• نقاط الولاء وتذكير بالأدوية', '• متابعة الأمراض المزمنة']
        },
        {
          title: 'الموارد البشرية',
          icon: Users,
          features: ['• الموظفين والعقود والشفتات', '• الحضور والانصراف (بصمة)', '• الإجازات والمرتبات', '• المكافآت والجزاءات', '• تقييم الأداء والترقيات']
        },
        {
          title: 'الحسابات العامة',
          icon: Calculator,
          features: ['• دليل الحسابات والقيود اليومية', '• العملاء، الموردين، الخزائن، البنوك', '• المصروفات والإيرادات والضرائب', '• الأرباح والخسائر', '• الميزانية العمومية والتدفقات النقدية']
        }
      ]
    },
    features: {
      title: 'مميزات نظام متقدمة',
      items: [
        { title: 'لوحة تحكم (Dashboard)', desc: 'أكثر من 300 تقرير، متابعة المبيعات، الأرباح، المنتجات الراكدة وقرب الانتهاء لحظياً.', icon: LayoutDashboard },
        { title: 'تعدد الفروع والمخازن', desc: 'إدارة عدد غير محدود من الفروع والمخازن مع تقارير مخصصة لكل فرع ونقل سهل للمنتجات.', icon: Building2 },
        { title: 'أولوية البيع FEFO', desc: 'نظام ذكي لمتابعة انتهاء الصلاحية والتنبيهات، وضمان بيع الأقدم أولاً.', icon: Clock },
        { title: 'نظام باركود متكامل', desc: 'إنشاء وطباعة وقراءة الباركود و QR Code لسهولة إدارة الأصناف.', icon: ScanBarcode },
      ]
    },
    security: {
      title: 'الأمان والحماية',
      features: ['تشفير كامل للبيانات', 'سجل العمليات (Audit Log)', 'المصادقة الثنائية (2FA)', 'تتبع الأجهزة والـ IP Restrictions', 'نسخ احتياطي تلقائي (Cloud & Local)']
    },
    permissions: {
      title: 'صلاحيات دقيقة',
      items: [
        { title: 'Super Admin', desc: 'تحكم كامل في جميع الفروع، الإعدادات، المستخدمين، التقارير والنسخ الاحتياطية.' },
        { title: 'مدير الفرع', desc: 'إدارة الفرع، المبيعات، المخزون، الموظفين واعتماد الجرد الخاص بالفرع.' },
        { title: 'الصيدلي', desc: 'البيع، المرتجعات، صرف الروشتات، البحث عن البدائل والاطلاع على المخزون.' },
        { title: 'مساعد الصيدلي', desc: 'البيع، البحث عن المنتجات، طباعة الفواتير (بدون صلاحيات حذف أو تعديل).' }
      ]
    },
    tech: {
      title: 'تقنيات حديثة وتكامل متقدم',
      tags: ['Web Based', 'Cloud Ready', 'Offline Mode', 'Dark & Light Mode', 'REST API', 'Multi Language (Ar/En)'],
      saas: {
        title: 'نظام التراخيص (SaaS)',
        desc: 'إدارة مركزية للتراخيص تسمح لشركة <strong>Medestra</strong> بالتحكم في العملاء والاشتراكات بكفاءة:',
        features: ['تحديد عدد الفروع والمستخدمين', 'تحديد مواعيد الاشتراك والتجديد التلقائي', 'إدارة الإصدارات (Version Control) والتحديثات التلقائية', 'ترقية وتخفيض الباقات بسهولة']
      },
      integrations: {
        title: 'التكاملات الخارجية',
        features: ['بوابات الدفع الإلكتروني.', 'WhatsApp Business API و SMS Gateway.', 'أجهزة الباركود، الطابعات، وقارئات QR.', 'أجهزة البصمة والموازين.', 'أنظمة المحاسبة الخارجية عبر API.', 'دعم الفواتير الإلكترونية (E-invoicing).']
      }
    },
    cta: {
      title: 'أهداف MEPOS',
      desc: 'نحن لا نقدم مجرد برنامج كاشير، بل منصة متكاملة تهدف إلى تقليل الأخطاء البشرية، تسريع خدمة العملاء، تقليل الفاقد، وزيادة الأرباح مع توفير نظام قابل للتوسع مع نمو نشاطك التجاري.',
      button: 'تواصل معنا الآن للبدء'
    }
  },
  en: {
    hero: {
      title: 'System',
      brand: 'MEPOS',
      desc: 'An integrated ERP and POS system developed by <strong>Medestra</strong> for managing individual pharmacies and pharmacy chains. It combines sales, inventory, HR, accounting, and customer management in a single platform.'
    },
    vision: {
      title: 'System Vision',
      desc: 'To be the best pharmacy management system in the Middle East and Africa, offering a simple, fast, and secure experience that helps pharmacy owners increase profits, reduce errors, and improve all operations management.'
    },
    targets: {
      title: 'Target Audience',
      items: [
        { name: 'Individual Pharmacies', icon: Store },
        { name: 'Pharmacy Chains', icon: Building2 },
        { name: 'Drug Warehouses', icon: Warehouse },
        { name: 'Distribution Companies', icon: Truck },
        { name: 'Medical Stores', icon: Warehouse },
        { name: 'Medical Clinics', icon: Stethoscope },
        { name: 'Medical Centers', icon: Cross },
      ]
    },
    modules: {
      title: 'Main System Modules',
      items: [
        {
          title: 'Point of Sale (POS)',
          icon: MonitorSmartphone,
          features: ['• Fast selling and Touch Screen', '• Barcode Scanner and QR Code', '• Quick Search (Scientific & Commercial)', '• Multiple payment methods (Cash, Visa, E-wallets)', '• Split Payment & Hold/Resume Invoice', '• Returns and Exchanges', '• Discounts and Loyalty Coupons']
        },
        {
          title: 'Inventory Management',
          icon: Warehouse,
          features: ['• Items, Categories, and Companies', '• Minimum limit and Reorder level', '• Expiry dates and Batch tracking', '• Full and partial inventory checks', '• Transfers between branches/stores', '• Inventory adjustments (damaged & expired)', '• Free and alternative products']
        },
        {
          title: 'Purchasing',
          icon: ShoppingCart,
          features: ['• Requests, Offers, and Purchase Orders', '• Receiving items and supplier returns', '• Supplier management and evaluation', '• Tracking supplier debts']
        },
        {
          title: 'Sales & CRM',
          icon: BarChart3,
          features: ['• Sales invoices and Quotations', '• Customer tracking and Credit limits', '• SMS and WhatsApp Integration', '• Loyalty points and Medication reminders', '• Chronic diseases tracking']
        },
        {
          title: 'Human Resources (HR)',
          icon: Users,
          features: ['• Employees, Contracts, and Shifts', '• Attendance and Departure (Fingerprint)', '• Leaves and Salaries', '• Rewards and Penalties', '• Performance evaluation and Promotions']
        },
        {
          title: 'General Accounting',
          icon: Calculator,
          features: ['• Chart of accounts and Journal entries', '• Customers, Suppliers, Safes, Banks', '• Expenses, Revenues, and Taxes', '• Profit and Loss', '• Balance Sheet and Cash Flows']
        }
      ]
    },
    features: {
      title: 'Advanced System Features',
      items: [
        { title: 'Dashboard', desc: 'Over 300 reports, real-time tracking of sales, profits, stagnant products, and near-expiry items.', icon: LayoutDashboard },
        { title: 'Multi-Branch & Stores', desc: 'Manage unlimited branches and stores with customized reports and easy product transfers.', icon: Building2 },
        { title: 'FEFO Selling Priority', desc: 'Smart system to track expiry dates and alerts, ensuring the oldest items are sold first.', icon: Clock },
        { title: 'Integrated Barcode System', desc: 'Create, print, and read Barcodes and QR Codes for easy item management.', icon: ScanBarcode },
      ]
    },
    security: {
      title: 'Security and Protection',
      features: ['End-to-End Data Encryption', 'Audit Log', 'Two-Factor Authentication (2FA)', 'Device Tracking and IP Restrictions', 'Automatic Backup (Cloud & Local)']
    },
    permissions: {
      title: 'Precise Permissions',
      items: [
        { title: 'Super Admin', desc: 'Full control over all branches, settings, users, reports, and backups.' },
        { title: 'Branch Manager', desc: 'Manage the branch, sales, inventory, employees, and approve branch inventory checks.' },
        { title: 'Pharmacist', desc: 'Sales, returns, dispensing prescriptions, searching for alternatives, and viewing inventory.' },
        { title: 'Pharmacist Assistant', desc: 'Sales, searching for products, printing invoices (without delete or edit permissions).' }
      ]
    },
    tech: {
      title: 'Modern Tech & Advanced Integration',
      tags: ['Web Based', 'Cloud Ready', 'Offline Mode', 'Dark & Light Mode', 'REST API', 'Multi Language (Ar/En)'],
      saas: {
        title: 'Licensing System (SaaS)',
        desc: 'Centralized licensing management allowing <strong>Medestra</strong> to control clients and subscriptions efficiently:',
        features: ['Set number of branches and users', 'Set subscription and auto-renewal dates', 'Version Control and automatic updates', 'Easy package upgrades and downgrades']
      },
      integrations: {
        title: 'External Integrations',
        features: ['Electronic Payment Gateways.', 'WhatsApp Business API & SMS Gateway.', 'Barcode Devices, Printers, and QR readers.', 'Fingerprint Devices and Scales.', 'External Accounting Systems via API.', 'E-invoicing Support.']
      }
    },
    cta: {
      title: 'MEPOS Goals',
      desc: 'We offer more than just a cashier program; we provide an integrated platform aimed at reducing human errors, speeding up customer service, minimizing waste, and increasing profits with a scalable system that grows with your business.',
      button: 'Contact Us Now to Start'
    }
  }
};

const ProductsPage: React.FC = () => {
  const langCtx = useLanguage() as any;
  const language = langCtx?.language || 'en';
  const isArabic = language === 'ar';
  const t = isArabic ? content.ar : content.en;

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans" dir={isArabic ? "rtl" : "ltr"}>
      <Helmet>
        <title>
          {isArabic
            ? 'نظام MePOS | سيستم ERP و POS لإدارة الصيدليات وسلاسل الصيدليات - ميديسترا'
            : 'MePOS System | Integrated Pharmacy ERP & POS Software - Medestra'}
        </title>
        <meta
          name="description"
          content={
            isArabic
              ? 'نظام MePOS من ميديسترا: أقوى سيستم ERP و POS متكامل لإدارة الصيدليات وسلاسل الصيدليات في مصر والسعودية وإيطاليا. نقطة بيع سريعة، إدارة مخزون، حسابات، وموارد بشرية.'
              : 'MePOS by Medestra: Integrated ERP and POS system for individual pharmacies and pharmacy chains across Egypt, Saudi Arabia (KSA), and Italy.'
          }
        />
        <link rel="canonical" href="https://medestra.me/products" />
      </Helmet>

      <Navbar />

      {/* Top Product Switcher Pill Bar (MePOS / Meni Clinic) */}
      <div className="pt-20 md:pt-24 px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="max-w-md mx-auto flex items-center justify-center p-1.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-xs">
          <RouterLink
            to="/products"
            className="flex-1 text-center py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold bg-[#00AEEF] text-white shadow-xs transition-all"
          >
            {isArabic ? 'نظام الصيدليات MePOS' : 'MePOS (Pharmacies)'}
          </RouterLink>
          <RouterLink
            to="/meni-clinic"
            className="flex-1 text-center py-2 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-slate-600 hover:text-slate-900 transition-all"
          >
            {isArabic ? 'نظام العيادات Meni Clinic' : 'Meni Clinic (CRM)'}
          </RouterLink>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-8 pb-14 md:pt-12 md:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center justify-center p-6 sm:p-8 rounded-[2.5rem] argon-glass mb-8"
          >
            <img
              src="/mepos-logo.webp"
              alt="MEPOS Logo"
              className="h-24 sm:h-32 md:h-40 object-contain drop-shadow-xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/mesestra.webp';
              }}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-6 flex items-center justify-center gap-3 tracking-tight"
          >
            {isArabic ? (
              <>{t.hero.title} <span className="text-gradient-medestra">{t.hero.brand}</span></>
            ) : (
              <><span className="text-gradient-medestra">{t.hero.brand}</span> {t.hero.title}</>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
            dangerouslySetInnerHTML={{ __html: t.hero.desc }}
          />
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="argon-glass p-7 sm:p-10 rounded-3xl md:rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#00AEEF] via-[#FFD037] to-[#8DC63F]" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">{t.vision.title}</h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
              {t.vision.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-900 mb-12">{t.targets.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {t.targets.items.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="argon-glass-interactive p-5 sm:p-6 rounded-2xl text-center flex flex-col items-center gap-3.5 group hover:-translate-y-1.5"
                >
                  <div className="w-13 h-13 bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] rounded-2xl flex items-center justify-center group-hover:bg-[#00AEEF] group-hover:text-white transition-all duration-300">
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">{item.name}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Modules */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center text-slate-900 mb-12 sm:mb-16">{t.modules.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.modules.items.map((mod, idx) => {
              const IconComponent = mod.icon;
              const badgeStyles = [
                'text-[#00AEEF] bg-[#00AEEF]/10 border-[#00AEEF]/20',
                'text-[#8DC63F] bg-[#8DC63F]/10 border-[#8DC63F]/20',
                'text-amber-500 bg-amber-500/10 border-amber-500/20',
                'text-[#EF4136] bg-[#EF4136]/10 border-[#EF4136]/20',
                'text-purple-600 bg-purple-600/10 border-purple-600/20',
                'text-blue-600 bg-blue-600/10 border-blue-600/20'
              ];
              const badgeStyle = badgeStyles[idx % badgeStyles.length];

              return (
                <motion.div
                  key={idx}
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="argon-glass-interactive rounded-3xl p-6 sm:p-8 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shrink-0 ${badgeStyle}`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">{mod.title}</h3>
                  </div>
                  <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base font-medium">
                    {mod.features.map((feature, fIdx) => (
                      <li key={fIdx}>{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Highlights - Dark Obsidian Bento */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto argon-glass-dark rounded-[2.5rem] md:rounded-[3rem] p-8 sm:p-12 md:p-16 text-white relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-black text-center mb-12">{t.features.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {t.features.items.map((feat, idx) => {
              const IconComponent = feat.icon;
              const colors = ['text-[#FFD037]', 'text-[#00AEEF]', 'text-[#EF4136]', 'text-[#8DC63F]'];
              return (
                <div key={idx} className="flex flex-col items-center text-center bg-white/[0.06] border border-white/10 rounded-3xl p-6 sm:p-7">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                    <IconComponent size={30} className={`${colors[idx % colors.length]}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black mb-2">{feat.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Permissions and Security */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 sm:gap-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <ShieldCheck className="text-[#00AEEF] w-8 h-8" /> {t.security.title}
            </h2>
            <ul className="space-y-3.5">
              {t.security.features.map((item, i) => (
                <li key={i} className="flex items-center gap-3.5 argon-glass-interactive p-4 rounded-2xl">
                  <CheckCircle2 className="text-emerald-500 shrink-0 w-5 h-5" />
                  <span className="font-bold text-slate-800 text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8 flex items-center gap-3">
              <UserCheck className="text-[#00AEEF] w-8 h-8" /> {t.permissions.title}
            </h2>
            <div className="space-y-3.5">
              {t.permissions.items.map((perm, i) => {
                const borderColors = ['border-[#EF4136]', 'border-[#00AEEF]', 'border-[#8DC63F]', 'border-slate-400'];
                const borderDir = isArabic ? 'border-r-4' : 'border-l-4';
                return (
                  <div key={i} className={`argon-glass-interactive p-5 rounded-2xl ${borderDir} ${borderColors[i % borderColors.length]}`}>
                    <h4 className="font-black text-slate-900 mb-1 text-base sm:text-lg">{perm.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">{perm.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Licensing & Tech */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-8">{t.tech.title}</h2>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {t.tech.tags.map((tech, i) => (
              <span key={i} className="argon-glass text-[#0284c7] px-5 py-2 rounded-full font-extrabold text-xs sm:text-sm border border-[#00AEEF]/20">
                {tech}
              </span>
            ))}
          </div>

          <div className={`grid md:grid-cols-2 gap-6 sm:gap-8 ${isArabic ? 'text-right' : 'text-left'}`}>
            <div className="argon-glass-interactive p-7 sm:p-9 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#00AEEF]" />
              <h3 className="text-xl sm:text-2xl font-black text-[#00AEEF] mb-4 flex items-center gap-2.5"><Settings /> {t.tech.saas.title}</h3>
              <p className="text-slate-700 mb-4 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: t.tech.saas.desc }} />
              <ul className="list-disc list-inside space-y-2 text-slate-600 text-sm sm:text-base font-medium">
                {t.tech.saas.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
            <div className="argon-glass-interactive p-7 sm:p-9 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#8DC63F]" />
              <h3 className="text-xl sm:text-2xl font-black text-[#659624] mb-4 flex items-center gap-2.5"><Link /> {t.tech.integrations.title}</h3>
              <ul className="list-disc list-inside space-y-2.5 text-slate-600 text-sm sm:text-base font-medium">
                {t.tech.integrations.features.map((feat, i) => (
                  <li key={i}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Goals */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-r from-[#00AEEF] via-[#0284c7] to-[#0369a1] text-white p-8 sm:p-14 text-center shadow-[0_25px_70px_-15px_rgba(0,174,239,0.45)]">
          <h2 className="text-2xl sm:text-4xl font-black mb-5">{t.cta.title}</h2>
          <p className="text-base sm:text-xl text-sky-100 mb-8 leading-relaxed max-w-3xl mx-auto font-medium">
            {t.cta.desc}
          </p>
          <a href="/contact" className="inline-block bg-white text-[#00AEEF] font-black text-base sm:text-lg px-8 sm:px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform">
            {t.cta.button}
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProductsPage;

import { ak as User, aC as Wallet, W as ShoppingBag, j as jsxRuntimeExports, m as motion, am as Lock, a4 as CircleCheckBig, A as AnimatePresence, e as Phone, M as Mail, f as MapPin, b as Smartphone, aA as Truck, Y as CircleAlert, D as Sparkles, av as ShieldCheck, aD as CreditCard, c as ArrowLeft, ai as ChevronLeft, x as ChevronRight, aE as Package, aB as Shield } from "./ui-vendor-a5hQU3E-.js";
import { u as useLocation, h as useNavigate, r as reactExports, L as Link } from "./react-vendor-DY0Dzq76.js";
import { u as useLanguage } from "./index-4qG1EIbH.js";
import { N as Navbar } from "./Navbar-DAC1ZDq0.js";
import { F as Footer } from "./Footer-BqkZY3eo.js";
import { b as notifyPurchaseOrder } from "./telegramService-DHvoeSJj.js";
import "./utils-vendor-Bpu5wKGe.js";
function Checkout() {
  const { t, dir, language } = useLanguage();
  const isAr = language === "ar";
  const location = useLocation();
  const navigate = useNavigate();
  const bookData = location.state || { name: "Medestra Specialty Book", price: "0 EGP" };
  const SHIPPING_FEE = 35;
  const bookPriceInt = parseInt(bookData.price.replace(/\D/g, ""), 10) || 0;
  const totalPrice = bookPriceInt + SHIPPING_FEE;
  const [step, setStep] = reactExports.useState(1);
  const [formData, setFormData] = reactExports.useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const [paymentMethod, setPaymentMethod] = reactExports.useState(null);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [paymentIframeUrl, setPaymentIframeUrl] = reactExports.useState(null);
  const [orderCompleted, setOrderCompleted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  const handleNext = () => {
    if (step === 1) {
      if (formData.name && formData.phone && formData.email && formData.address) {
        setStep(2);
      }
    } else if (step === 2) {
      if (paymentMethod === "card") {
        initiatePaymobPayment();
      } else if (paymentMethod === "instapay") {
        setStep(3);
      } else if (paymentMethod === "cod") {
        submitPurchaseToGoogleSheet("COD");
      }
    }
  };
  const handleBack = () => {
    if (step > 1) {
      if (step === 4 && !orderCompleted) setStep(2);
      else if (step === 3) setStep(2);
      else setStep(step - 1);
    } else {
      navigate("/academy");
    }
  };
  const submitPurchaseToGoogleSheet = async (method) => {
    setIsSubmitting(true);
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwvkhxTa42jjcxXNgZxEvjwJk7RcHdbYaD3tZxbLLDL_70asj9XnDVoGGIZbLiecQl1/exec";
    const now = /* @__PURE__ */ new Date();
    const cairoOptions = { timeZone: "Africa/Cairo" };
    const purchaseDate = now.toLocaleDateString("en-GB", cairoOptions);
    const purchaseTime = now.toLocaleTimeString("en-US", { ...cairoOptions, hour: "2-digit", minute: "2-digit", hour12: true });
    const data = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      bookName: bookData.name,
      price: `${totalPrice} EGP`,
      shipping: `${SHIPPING_FEE} EGP`,
      paymentMethod: method,
      date: purchaseDate,
      time: purchaseTime
    };
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      await notifyPurchaseOrder(data);
      setOrderCompleted(true);
      setStep(4);
    } catch (error) {
      console.error("Error submitting order:", error);
      setOrderCompleted(true);
      setStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };
  const initiatePaymobPayment = async () => {
    setIsSubmitting(true);
    const amountCents = totalPrice * 100;
    const apiKey = "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRFek56VTJNaXdpYm1GdFpTSTZJbWx1YVhScFlXd2lmUS5KUG5kQnF5UTBDVmdmTS1XYjAyZ2NLSVhSa0ZhNTdvOWRqNWNxeGl0T3ZKNC1uQjAzZkQ5SmsydlcwNGFzUkl5b2FidUVSdmd5OWVzMTk4eU50eWg5UQ==";
    try {
      const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: apiKey })
      });
      const authData = await authRes.json();
      const token = authData.token;
      const orderRes = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: token,
          delivery_needed: "false",
          amount_cents: amountCents.toString(),
          currency: "EGP",
          items: [
            {
              name: bookData.name,
              amount_cents: amountCents.toString(),
              description: bookData.name,
              quantity: "1"
            }
          ]
        })
      });
      const orderData = await orderRes.json();
      const orderId = orderData.id;
      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "User";
      const lastName = nameParts.slice(1).join(" ") || "User";
      const paymentKeyRes = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: token,
          amount_cents: amountCents.toString(),
          expiration: 3600,
          order_id: orderId,
          billing_data: {
            apartment: "NA",
            email: formData.email || "test@test.com",
            floor: "NA",
            first_name: firstName,
            street: "NA",
            building: "NA",
            phone_number: formData.phone || "+201000000000",
            shipping_method: "NA",
            postal_code: "NA",
            city: "Cairo",
            country: "EG",
            last_name: lastName,
            state: "Cairo"
          },
          currency: "EGP",
          integration_id: 5565798
        })
      });
      const paymentKeyData = await paymentKeyRes.json();
      const paymentToken = paymentKeyData.token;
      const iframeId = 1012124;
      setPaymentIframeUrl(`https://accept.paymob.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`);
      setStep(4);
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwvkhxTa42jjcxXNgZxEvjwJk7RcHdbYaD3tZxbLLDL_70asj9XnDVoGGIZbLiecQl1/exec";
      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          bookName: bookData.name,
          price: `${totalPrice} EGP`,
          shipping: `${SHIPPING_FEE} EGP`,
          paymentMethod: "Paymob Card",
          date: (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", { timeZone: "Africa/Cairo" }),
          time: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", { timeZone: "Africa/Cairo", hour: "2-digit", minute: "2-digit", hour12: true })
        })
      }).catch((e) => console.log(e));
      notifyPurchaseOrder({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        bookName: bookData.name,
        price: `${totalPrice} EGP`,
        shipping: `${SHIPPING_FEE} EGP`,
        paymentMethod: "Paymob Card"
      }).catch((e) => console.log(e));
    } catch (error) {
      console.error("Paymob Error:", error);
      alert(isAr ? "حدث خطأ أثناء معالجة الدفع" : "An error occurred while processing payment");
    } finally {
      setIsSubmitting(false);
    }
  };
  const steps = [
    { id: 1, name: t.checkout.personalInfo, icon: User },
    { id: 2, name: t.checkout.paymentMethod, icon: Wallet },
    { id: 3, name: t.checkout.summary, icon: ShoppingBag }
  ];
  const currentStepIndex = step > 3 ? 2 : step - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30", dir, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-32 pb-20 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-black mb-4 uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 14 }),
              isAr ? "دفع آمن 100%" : "100% Secure Checkout"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-black text-gray-900 mb-4", children: t.checkout.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-medium max-w-lg mx-auto", children: isAr ? "أكمل بياناتك لتحصل على كتابك المتخصص وتبدأ رحلة التطوير" : "Complete your details to get your specialized book and start your growth journey" })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-16 max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 left-0 w-full h-[2px] bg-gray-200 z-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute top-5 left-0 h-[2px] bg-brand-blue z-0",
            initial: { width: "0%" },
            animate: { width: `${currentStepIndex / (steps.length - 1) * 100}%` },
            transition: { duration: 0.5, ease: "easeInOut" }
          }
        ),
        steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = step >= s.id;
          const isCompleted = step > s.id || orderCompleted;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: false,
                animate: {
                  backgroundColor: isActive ? "#00AEEF" : "#E5E7EB",
                  scale: isActive ? 1.1 : 1,
                  boxShadow: isActive ? "0 0 20px rgba(0, 174, 239, 0.3)" : "none"
                },
                className: `w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 text-white`,
                children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 22 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20, className: isActive ? "text-white" : "text-gray-400" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-3 text-xs font-black transition-colors duration-300 ${isActive ? "text-brand-blue" : "text-gray-400"}`, children: s.name })
          ] }, s.id);
        })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-8 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: { duration: 0.4 },
            className: "bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-blue-900/5 border border-white/50 relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" }),
              step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 24 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-gray-900", children: t.checkout.personalInfo }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 font-bold", children: isAr ? "يرجى إدخال بيانات التوصيل بدقة" : "Please enter delivery details accurately" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-black text-gray-700 mb-2 ml-1", children: t.bookStore.fullName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: `absolute ${isAr ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors`, size: 20 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: formData.name,
                          onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                          placeholder: isAr ? "الاسم بالكامل" : "Your Full Name",
                          className: `w-full ${isAr ? "pr-12 pl-5" : "pl-12 pr-5"} py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all font-bold outline-none`
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-black text-gray-700 mb-2 ml-1", children: t.bookStore.phone }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: `absolute ${isAr ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors`, size: 20 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "tel",
                            value: formData.phone,
                            onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                            placeholder: "+201...",
                            className: `w-full ${isAr ? "pr-12 pl-5" : "pl-12 pr-5"} py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all font-bold outline-none`
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-black text-gray-700 mb-2 ml-1", children: t.bookStore.email }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: `absolute ${isAr ? "right-5" : "left-5"} top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors`, size: 20 }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: "email",
                            value: formData.email,
                            onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                            placeholder: "example@mail.com",
                            className: `w-full ${isAr ? "pr-12 pl-5" : "pl-12 pr-5"} py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all font-bold outline-none`
                          }
                        )
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block text-sm font-black text-gray-700 mb-2 ml-1", children: [
                      isAr ? "العنوان بالتفصيل" : "Detailed Address",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 mx-1", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: `absolute ${isAr ? "right-5" : "left-5"} top-6 text-gray-400 group-focus-within:text-brand-blue transition-colors`, size: 20 }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "textarea",
                        {
                          value: formData.address,
                          onChange: (e) => setFormData({ ...formData, address: e.target.value }),
                          placeholder: isAr ? "المحافظة، المدينة، اسم الشارع، رقم العقار..." : "City, Street, Building No...",
                          rows: 3,
                          className: `w-full ${isAr ? "pr-12 pl-5" : "pl-12 pr-5"} py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:border-brand-blue focus:bg-white focus:ring-4 focus:ring-brand-blue/5 transition-all font-bold outline-none resize-none`
                        }
                      )
                    ] })
                  ] })
                ] })
              ] }),
              step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { size: 24 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-gray-900", children: t.checkout.paymentMethod }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 font-bold", children: isAr ? "اختر الوسيلة الأنسب لك للدفع" : "Choose your preferred payment method" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => setPaymentMethod("instapay"),
                      className: `group relative flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all text-start overflow-hidden ${paymentMethod === "instapay" ? "border-purple-600 bg-purple-50 ring-4 ring-purple-600/10" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${paymentMethod === "instapay" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-500"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 28 }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-gray-900 text-lg", children: t.checkout.instapay }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 font-bold", children: isAr ? "تحويل مباشر عبر تطبيق انستا باي" : "Direct transfer via Instapay app" })
                        ] }),
                        paymentMethod === "instapay" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layoutId: "payment-check", className: "bg-purple-600 text-white p-1 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 20 }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => setPaymentMethod("cod"),
                      className: `group relative flex items-center gap-5 p-6 rounded-[2rem] border-2 transition-all text-start overflow-hidden ${paymentMethod === "cod" ? "border-brand-red bg-brand-red/5 ring-4 ring-brand-red/10" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${paymentMethod === "cod" ? "bg-brand-red text-white" : "bg-gray-100 text-gray-500"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { size: 28 }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-black text-gray-900 text-lg", children: t.checkout.cod }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 font-bold", children: isAr ? "ادفع كاش عند استلام الطلب" : "Pay cash upon order delivery" })
                        ] }),
                        paymentMethod === "cod" && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layoutId: "payment-check", className: "bg-brand-red text-white p-1 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 20 }) })
                      ]
                    }
                  )
                ] })
              ] }),
              step === 3 && paymentMethod === "instapay" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { size: 32 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-gray-900 mb-4", children: t.checkout.instapay }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-blue/20 blur-2xl group-hover:blur-3xl transition-all duration-500 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-56 h-56 mx-auto mb-8 bg-white rounded-[2.5rem] p-6 border-2 border-brand-blue/10 shadow-xl flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/photos/qr.webp", alt: "Instapay QR", className: "w-full h-full object-contain" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-900 font-bold mb-8 leading-relaxed max-w-md mx-auto", children: t.bookStore.instapayNote }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-brand-blue/5 border border-brand-blue/10 p-5 rounded-[2rem] mb-8 flex items-center gap-4 text-brand-blue text-sm font-bold max-w-md mx-auto text-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 20 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: isAr ? "يرجى تصوير الشاشة بعد إتمام عملية التحويل وإرسالها عند تواصل مندوبنا معك." : "Please take a screenshot after the transfer is complete and send it when our representative contacts you." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => submitPurchaseToGoogleSheet("Instapay"),
                    disabled: isSubmitting,
                    className: "w-full bg-brand-blue text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-brand-blue/25 hover:bg-blue-600 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-3",
                    children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 22 }),
                      t.bookStore.amountTransferred
                    ] })
                  }
                )
              ] }),
              step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6", children: orderCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { scale: 0.9, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  className: "space-y-8",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          animate: { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] },
                          transition: { repeat: Infinity, duration: 4 },
                          className: "w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 50 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          initial: { opacity: 0 },
                          animate: { opacity: 1 },
                          className: "absolute -top-4 -right-4 bg-brand-yellow text-white p-2 rounded-xl shadow-lg",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 20 })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-4xl font-black text-gray-900 mb-4", children: t.bookStore.congratulations }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 font-bold mb-10 leading-relaxed max-w-lg mx-auto text-lg", children: t.bookStore.deliveryNote })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-gray-50", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/academy",
                          className: "w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gray-900 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-black transition-all shadow-xl hover:-translate-y-1",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 20 }),
                            isAr ? "العودة للأكاديمية" : "Back to Academy"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Link,
                        {
                          to: "/",
                          className: "w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-brand-blue border-2 border-brand-blue/10 px-10 py-5 rounded-[2rem] font-black hover:bg-brand-blue/5 transition-all",
                          children: isAr ? "الرئيسية" : "Back to Home"
                        }
                      )
                    ] })
                  ]
                }
              ) : paymentIframeUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full min-h-[600px]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 px-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { size: 20 }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-gray-900", children: isAr ? "الدفع الآمن" : "Secure Payment" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-xs font-black", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 14 }),
                    isAr ? "مشفر بالكامل" : "SSL Secure"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-brand-blue/5 blur-2xl rounded-3xl" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "iframe",
                    {
                      src: paymentIframeUrl,
                      className: "relative w-full h-[750px] border-0 rounded-3xl shadow-inner bg-white",
                      title: "Payment"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: () => setStep(2),
                    className: "mt-8 text-gray-400 font-bold hover:text-brand-blue transition-all flex items-center gap-2 mx-auto px-6 py-3 rounded-full hover:bg-brand-blue/5",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 18, className: isAr ? "rotate-180" : "" }),
                      isAr ? "تغيير وسيلة الدفع" : "Change Payment Method"
                    ]
                  }
                )
              ] }) : null }),
              step < 3 && !isSubmitting && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-gray-50", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: handleBack,
                    className: "w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-gray-400 font-black hover:text-gray-600 hover:bg-gray-100/50 transition-all group",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { size: 20, className: `${isAr ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"} transition-transform` }),
                      t.checkout.back
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    onClick: handleNext,
                    disabled: step === 1 && (!formData.name || !formData.phone || !formData.email || !formData.address) || step === 2 && !paymentMethod,
                    className: "w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-blue text-white px-12 py-5 rounded-[2rem] font-black text-lg hover:bg-blue-600 transition-all shadow-xl shadow-brand-blue/20 disabled:opacity-50 disabled:shadow-none hover:-translate-y-1 group",
                    children: [
                      step === 2 ? paymentMethod === "card" ? t.checkout.payNow : t.checkout.confirm : t.checkout.next,
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 20, className: `${isAr ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"} transition-transform` })
                    ]
                  }
                )
              ] })
            ]
          },
          step
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4 lg:sticky lg:top-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.3 },
            className: "bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden relative",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue via-purple-500 to-brand-red" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-black text-gray-900 mb-8 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 22, className: "text-brand-blue" }),
                t.checkout.summary
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 mb-8 pb-8 border-b border-gray-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-28 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100 p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: `/photos/${bookData.name.includes("First Aid") ? "First Aid" : bookData.name.includes("Communication") ? "nahl" : "Copy of Copy of Copy of Communication Skills"}.webp`,
                    alt: bookData.name,
                    className: "w-full h-full object-cover rounded-xl shadow-sm",
                    onError: (e) => {
                      e.target.src = "/photos/First Aid.webp";
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block px-2 py-1 rounded-md bg-brand-blue/5 text-brand-blue text-[10px] font-black mb-2 uppercase tracking-tight", children: "Specialized Edition" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-black text-gray-900 leading-snug mb-2", children: bookData.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-gray-400 font-bold text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 14 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Qty: 1" })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mb-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: isAr ? "قيمة الكتاب" : "Book Price" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-gray-900", children: bookData.price })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-gray-500", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: isAr ? "رسوم الشحن" : "Shipping Fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-black text-gray-900", children: [
                    SHIPPING_FEE,
                    " ",
                    isAr ? "جنية" : "EGP"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-5 border-t border-dashed border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 font-black text-lg", children: t.checkout.total }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-end", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-2xl font-black text-brand-blue", children: [
                      totalPrice,
                      " ",
                      isAr ? "جنية" : "EGP"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-gray-400 font-bold", children: isAr ? "شامل الضريبة" : "Includes all taxes" })
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 rounded-[2rem] p-6 relative overflow-hidden group", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 60 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-brand-blue shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 22 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "text-xs font-black text-gray-900 mb-1", children: isAr ? "حماية فائقة" : "Ultra-Safe Checkout" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-gray-500 font-bold leading-relaxed", children: isAr ? "يتم تشفير جميع بياناتك الشخصية وبيانات الدفع ولا يتم مشاركتها أبداً مع أي طرف خارجي." : "Your personal and payment data is encrypted and never shared with external parties." })
                  ] })
                ] })
              ] })
            ]
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Checkout as default
};

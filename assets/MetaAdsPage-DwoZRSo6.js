import { j as jsxRuntimeExports, a4 as CircleCheckBig, ac as CircleX, n as CircleQuestionMark, _ as Check, ad as GripVertical, ae as ArrowDown, af as MousePointerClick, ag as Award, g as Send, ah as Code, x as ChevronRight, ai as ChevronLeft, l as Settings, G as Globe, aj as Loader, ab as Download, X, ak as User, D as Sparkles, al as Menu, d as ArrowRight, am as Lock, an as Trophy, ao as Languages, ap as BookOpen, aq as CirclePlay, m as motion, ar as Rocket, as as LayoutDashboard } from "./ui-vendor-a5hQU3E-.js";
import { r as reactExports, d as React, L as Link } from "./react-vendor-DY0Dzq76.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Line, b as ReferenceDot, h as html2canvas, E } from "./utils-vendor-Bpu5wKGe.js";
import { u as useLanguage, H as Helmet } from "./index-DQ3_D6t3.js";
import { F as Footer } from "./Footer-DB-JCz_e.js";
import { N as Navbar } from "./Navbar-BjqIu5YJ.js";
var InteractionType = /* @__PURE__ */ ((InteractionType2) => {
  InteractionType2["QUIZ"] = "QUIZ";
  InteractionType2["DRAG_DROP"] = "DRAG_DROP";
  InteractionType2["CHART"] = "CHART";
  InteractionType2["SCENARIO"] = "SCENARIO";
  InteractionType2["INPUT"] = "INPUT";
  InteractionType2["FINAL"] = "FINAL";
  return InteractionType2;
})(InteractionType || {});
const COURSE_CONTENT_AR = [
  {
    id: 1,
    title: "مقدمة في مدير الأعمال (Business Manager)",
    objective: "فهم ما هو Business Manager ولماذا هو مهم.",
    content: [
      "Business Manager (BM) هو أداة مجانية من فيسبوك تتيح لك إدارة حساباتك الإعلانية وصفحاتك وتطبيقاتك في مكان واحد.",
      "يفصل بين العمل الشخصي والعمل التجاري، مما يجعله أكثر احترافية وأماناً.",
      "يتكون من: الحسابات الإعلانية، الصفحات، الأشخاص والأدوار، وطرق الدفع (الفوترة).",
      "يسمح لك بمنح صلاحيات محددة للموظفين أو الوكالات دون إعطائهم كلمات مرور حسابك الشخصي."
    ],
    interactionType: InteractionType.DRAG_DROP,
    interactionData: {
      instruction: "قم بتصنيف العناصر التالية إلى أماكنها الصحيحة (اسحب العنصر أو انقر عليه ثم انقر على الصندوق المناسب):",
      items: [
        { id: "i1", text: "بطاقة ائتمان الشركة", targetId: "billing" },
        { id: "i2", text: "صفحة المطعم الرسمية", targetId: "assets" },
        { id: "i3", text: "أحمد (مدير تسويق)", targetId: "people" },
        { id: "i4", text: "حساب إعلانات الربع الأول", targetId: "assets" }
      ],
      zones: [
        { id: "people", title: "الأشخاص والأدوار" },
        { id: "assets", title: "الأصول (صفحات/حسابات)" },
        { id: "billing", title: "الفوترة والدفع" }
      ]
    }
  },
  {
    id: 2,
    title: "نظرة عامة على مدير الإعلانات (Ads Manager)",
    objective: "فهم كيفية هيكلة الحملة الإعلانية.",
    content: [
      "هيكل الحملة يتكون من 3 مستويات رئيسية كالهرم:",
      "1. الحملة (Campaign): حيث تحدد الهدف الرئيسي (مثلاً: الوعي، المبيعات).",
      "2. المجموعة الإعلانية (Ad Set): حيث تحدد الجمهور، الميزانية، الجدول الزمني، وأماكن العرض (Placements).",
      "3. الإعلان (Ad): هو ما يراه الجمهور (الصورة، الفيديو، النص، الرابط)."
    ],
    interactionType: InteractionType.QUIZ,
    interactionData: {
      question: 'أين نقوم بتحديد "الجمهور المستهدف" و "الميزانية"؟',
      options: [
        { id: "a", text: "مستوى الحملة (Campaign)", isCorrect: false, feedback: "مستوى الحملة مخصص لتحديد الهدف الإعلاني فقط (إلا إذا استخدمت ميزانية الحملة Advantage+)." },
        { id: "b", text: "مستوى المجموعة الإعلانية (Ad Set)", isCorrect: true, feedback: "صحيح! المجموعة الإعلانية هي المسؤولة عن الاستهداف والميزانية والجدول الزمني." },
        { id: "c", text: "مستوى الإعلان (Ad)", isCorrect: false, feedback: "مستوى الإعلان مخصص للتصميم والنصوص والروابط." }
      ]
    }
  },
  {
    id: 3,
    title: "الجمهور والاستهداف (Audience & Targeting)",
    objective: "تعلم استهداف الجمهور الصحيح.",
    content: [
      "أنواع الجماهير:",
      "1. الجمهور الأساسي (Core Audience): الاستهداف حسب العمر، الموقع، والاهتمامات.",
      "2. الجمهور المخصص (Custom Audience): أشخاص تفاعلوا معك سابقاً (زاروا موقعك، شاهدوا فيديو).",
      "3. الجمهور المشابه (Lookalike Audience): أشخاص يشبهون جمهورك المخصص.",
      "الاستهداف الدقيق يوفر الميزانية ويزيد النتائج."
    ],
    interactionType: InteractionType.SCENARIO,
    interactionData: {
      question: 'لديك متجر إلكتروني لبيع "ألعاب تعليمية للأطفال من عمر 3-6 سنوات". أي خيار استهداف هو الأفضل للبدء؟',
      options: [
        { id: "a", text: "استهداف الأطفال مباشرة (أعمار 3-6)", isCorrect: false, feedback: "خطأ. سياسات فيسبوك تمنع استهداف الأطفال، كما أنهم لا يملكون قرار الشراء." },
        { id: "b", text: "استهداف الآباء والأمهات (Parents) ولديهم أطفال في سن الحضانة/الروضة", isCorrect: true, feedback: "ممتاز! هذا الخيار يستهدف صانع القرار (الوالدين) بدقة." },
        { id: "c", text: "استهداف عام لكل الناس في دولتك", isCorrect: false, feedback: "جمهور واسع جداً سيؤدي لهدر الميزانية على غير المهتمين." }
      ]
    }
  },
  {
    id: 4,
    title: "الميزانية والمزايدة (Budgeting & Bidding)",
    objective: "إدارة الميزانية وفهم أنواع المزايدة.",
    content: [
      "CBO (Advantage+ Campaign Budget): فيسبوك يوزع الميزانية تلقائياً على المجموعات الأفضل أداءً.",
      "ABO (Ad Set Budget): أنت تحدد ميزانية ثابتة لكل مجموعة إعلانية يدوياً.",
      "استراتيجيات المزايدة: التكلفة الأقل (Lowest Cost) للحصول على أقصى نتائج بأقل سعر، وسقف العرض (Bid Cap) للتحكم الصارم في تكلفة النتيجة."
    ],
    interactionType: InteractionType.QUIZ,
    interactionData: {
      question: "تريد اختبار 3 جماهير مختلفة لتعرف أيهم أفضل، وتريد ضمان أن كل جمهور يحصل على فرصة متساوية في الصرف. ماذا تختار؟",
      options: [
        { id: "a", text: "ميزانية الحملة (CBO)", isCorrect: false, feedback: "CBO ستقوم بصرف الميزانية على الجمهور الأسهل وصولاً ولن تعطي فرصة متساوية للاختبار." },
        { id: "b", text: "ميزانية المجموعة الإعلانية (ABO)", isCorrect: true, feedback: "صحيح! تحديد ميزانية لكل مجموعة يضمن أن كل جمهور سيحصل على نصيبه من الصرف للاختبار." }
      ]
    }
  },
  {
    id: 5,
    title: "الإبداع وكتابة المحتوى (Creative & Copywriting)",
    objective: "فهم إنشاء الإعلان الجذاب.",
    content: [
      "أنواع الإعلانات: صورة واحدة، فيديو، تشكيلة (Collection)، أو دوار (Carousel).",
      "النص الإعلاني (Ad Copy): يجب أن يخاطب مشكلة العميل ويقدم الحل.",
      "CTA (Call to Action): الزر الذي يوجه العميل (تسوق الآن، سجل الآن، تعرف على المزيد).",
      "أول 3 ثوانٍ في الفيديو هي الأهم لجذب الانتباه."
    ],
    interactionType: InteractionType.INPUT,
    // Using Input to simulate writing
    interactionData: {
      prompt: 'اكتب عنواناً (Headline) جذاباً لإعلان يبيع "دورة تعلم اللغة الإنجليزية للمبتدئين" مع خصم 50%.',
      placeholder: "اكتب العنوان هنا...",
      expectedKeywords: ["خصم", "50", "إنجليزية", "تعلم", "عرض", "نصف"],
      successMessage: "عنوان رائع! استخدام الأرقام والخصومات والكلمات الواضحة يزيد من نسبة النقر."
    }
  },
  {
    id: 6,
    title: "البكسل والتتبع (Pixel & Tracking)",
    objective: "معرفة كيفية قياس أداء الإعلانات.",
    content: [
      "Facebook Pixel: كود برمجي يوضع في موقعك لتتبع أفعال الزوار.",
      "يسمح لك بمعرفة من اشترى، من أضاف للسلة، ومن مجرد زار الصفحة.",
      "يستخدم لإعادة الاستهداف (Retargeting) وإنشاء جماهير مشابهة.",
      "الأحداث (Events): PageView, AddToCart, Purchase, Lead."
    ],
    interactionType: InteractionType.DRAG_DROP,
    interactionData: {
      instruction: "اربط نوع الحدث (Event) بالهدف المناسب للحملة:",
      items: [
        { id: "e1", text: "Purchase (شراء)", targetId: "sales" },
        { id: "e2", text: "Lead (عميل محتمل)", targetId: "forms" },
        { id: "e3", text: "View Content (مشاهدة محتوى)", targetId: "traffic" }
      ],
      zones: [
        { id: "sales", title: "زيادة مبيعات المتجر" },
        { id: "forms", title: "جمع بيانات العملاء للعقارات" },
        { id: "traffic", title: "قراءة مقالات المدونة" }
      ]
    }
  },
  {
    id: 7,
    title: "قمع التسويق (Marketing Funnel)",
    objective: "فهم رحلة العميل من الوعي إلى التحويل.",
    content: [
      "TOFU (Top of Funnel): مرحلة الوعي (Awareness). الهدف: تعريف الناس بالعلامة التجارية.",
      "MOFU (Middle of Funnel): مرحلة الاهتمام (Consideration). الهدف: تفاعل، زيارات، رسائل.",
      "BOFU (Bottom of Funnel): مرحلة التحويل (Conversion). الهدف: مبيعات، تسجيل.",
      "يجب تغيير رسالة الإعلان حسب المرحلة."
    ],
    interactionType: InteractionType.SCENARIO,
    interactionData: {
      question: "عميل زار موقعك وأضاف منتجاً للسلة لكنه لم يشترِ. في أي مرحلة هو الآن، وما هو الإعلان المناسب له؟",
      options: [
        { id: "a", text: "مرحلة الوعي - نعرض له فيديو تعريفي عن الشركة", isCorrect: false, feedback: "هو يعرف الشركة بالفعل وزار الموقع." },
        { id: "b", text: "مرحلة التحويل - نعرض له إعلان خصم إضافي لإتمام الشراء (Retargeting)", isCorrect: true, feedback: "بالضبط! هو جاهز للشراء ويحتاج لدفعة صغيرة (خصم أو تذكير)." },
        { id: "c", text: "مرحلة الاهتمام - نطلب منه عمل لايك للصفحة", isCorrect: false, feedback: "لقد تجاوز هذه المرحلة، هو قريب جداً من الشراء." }
      ]
    }
  },
  {
    id: 8,
    title: "التحليلات والتحسين (Analytics & Optimization)",
    objective: "فهم كيفية تحسين الحملات وقراءة الأرقام.",
    content: [
      "CTR (Click-Through Rate): نسبة النقر للظهور. يدل على جاذبية الإعلان.",
      "CPC (Cost Per Click): تكلفة النقرة.",
      "ROAS (Return on Ad Spend): العائد على الإنفاق الإعلاني. (المبيعات ÷ الصرف).",
      "CPM (Cost Per 1000 Impressions): تكلفة الوصول لألف شخص.",
      "إذا كان الـ CTR منخفضاً، جرب تغيير التصميم أو العنوان."
    ],
    interactionType: InteractionType.CHART,
    interactionData: {
      instruction: 'قم بتحليل أداء الحملة في الرسم البياني أدناه. الخط الأزرق يمثل "المصاريف" والخط الأخضر يمثل "المبيعات". برأيك، ما هو "اليوم الذهبي" الذي حققت فيه الحملة أعلى كفاءة (ROAS) قبل أن نبدأ في زيادة الصرف وتراجع النتائج؟',
      // Chart data handled in component
      correctDayIndex: 4,
      // e.g., Day 5
      feedback: 'ممتاز! في "يوم 5" حققنا مبيعات 250 بمصروف 75 فقط (ROAS = 3.33). بعد ذلك، ورغم زيادة المصاريف بشكل كبير في يوم 6 و 7، لم تزد المبيعات بنفس النسبة، مما يعني انخفاض الكفاءة (Scaling Issues).'
    }
  },
  {
    id: 9,
    title: "التحدي النهائي (Final Challenge)",
    objective: "تطبيق شامل لكل ما تعلمته.",
    content: [
      "حان وقت الاختبار النهائي!",
      "ستقوم بإعداد استراتيجية حملة كاملة لمتجر عطور جديد.",
      "يجب عليك اتخاذ القرارات الصحيحة في كل خطوة."
    ],
    interactionType: InteractionType.FINAL,
    interactionData: {
      steps: [
        {
          question: "المتجر جديد تماماً. ما هو الهدف الأول للحملة؟",
          options: [
            { id: "1a", text: "Conversion (مبيعات) فوراً", isCorrect: false, feedback: "صعب جداً لمتجر غير معروف. ابدأ بالوعي أو الزيارات أولاً." },
            { id: "1b", text: "Awareness (وعي) أو Traffic (زيارات)", isCorrect: true, feedback: "صحيح. نحتاج لتعريف الناس بالماركة أولاً." }
          ]
        },
        {
          question: "ما هو الجمهور الأنسب للبدء؟",
          options: [
            { id: "2a", text: "جمهور واسع (Broad) مهتم بالعطور والموضة", isCorrect: true, feedback: "جيد. ليس لدينا بيانات سابقة، لذا الاستهداف بالاهتمامات هو الأفضل." },
            { id: "2b", text: "Lookalike Audience", isCorrect: false, feedback: "لا يمكن إنشاء جمهور مشابه بدون بيانات سابقة (Custom Audience)." }
          ]
        },
        {
          question: "الإعلان: ما هو أهم عنصر للتركيز عليه؟",
          options: [
            { id: "3a", text: "صورة المنتج بجودة عالية توحي بالفخامة", isCorrect: true, feedback: 'ممتاز. العطور تعتمد على "الإحساس" والشكل لأن العميل لا يشمها.' },
            { id: "3b", text: "كتابة نص طويل جداً يشرح المكونات الكيميائية", isCorrect: false, feedback: "ممل وقد لا يقرأه أحد." }
          ]
        }
      ]
    }
  }
];
const COURSE_CONTENT_EN = [
  {
    id: 1,
    title: "Introduction to Business Manager",
    objective: "Understand what Business Manager is and why it matters.",
    content: [
      "Business Manager (BM) is a free tool from Facebook to manage your ad accounts, pages, and apps in one place.",
      "It separates personal and business work, making it more professional and secure.",
      "It consists of: Ad Accounts, Pages, People & Roles, and Payment Methods (Billing).",
      "It allows you to grant specific permissions to employees or agencies without giving them your personal account password."
    ],
    interactionType: InteractionType.DRAG_DROP,
    interactionData: {
      instruction: "Categorize the following items into their correct places (drag the item or click it then click the appropriate box):",
      items: [
        { id: "i1", text: "Company Credit Card", targetId: "billing" },
        { id: "i2", text: "Official Restaurant Page", targetId: "assets" },
        { id: "i3", text: "Ahmed (Marketing Manager)", targetId: "people" },
        { id: "i4", text: "Q1 Ads Account", targetId: "assets" }
      ],
      zones: [
        { id: "people", title: "People & Roles" },
        { id: "assets", title: "Assets (Pages/Accounts)" },
        { id: "billing", title: "Billing & Payment" }
      ]
    }
  },
  {
    id: 2,
    title: "Ads Manager Overview",
    objective: "Understand how an ad campaign is structured.",
    content: [
      "Campaign structure consists of 3 main levels like a pyramid:",
      "1. Campaign: Where you define the main objective (e.g., Awareness, Sales).",
      "2. Ad Set: Where you define audience, budget, schedule, and placements.",
      "3. Ad: What the audience sees (Image, Video, Text, Link)."
    ],
    interactionType: InteractionType.QUIZ,
    interactionData: {
      question: 'Where do we define "Target Audience" and "Budget"?',
      options: [
        { id: "a", text: "Campaign Level", isCorrect: false, feedback: "Campaign level is for defined the objective only (unless using Advantage+ Campaign Budget)." },
        { id: "b", text: "Ad Set Level", isCorrect: true, feedback: "Correct! The Ad Set is responsible for targeting, budget, and schedule." },
        { id: "c", text: "Ad Level", isCorrect: false, feedback: "Ad level is for design, copy, and links." }
      ]
    }
  },
  {
    id: 3,
    title: "Audience & Targeting",
    objective: "Learn to target the right audience.",
    content: [
      "Audience Types:",
      "1. Core Audience: Targeting by age, location, and interests.",
      "2. Custom Audience: People who interacted with you before (visited website, watched video).",
      "3. Lookalike Audience: People who look like your custom audience.",
      "Precise targeting saves budget and increases results."
    ],
    interactionType: InteractionType.SCENARIO,
    interactionData: {
      question: 'You have an online store selling "Educational Toys for Kids aged 3-6". Which targeting option is best to start?',
      options: [
        { id: "a", text: "Target Kids directly (ages 3-6)", isCorrect: false, feedback: "Wrong. Facebook policies strictly restrict targeting children, and they dont make purchasing decisions." },
        { id: "b", text: "Target Parents with kids in preschool/early school age", isCorrect: true, feedback: "Excellent! This option targets the decision maker (parents) accurately." },
        { id: "c", text: "General targeting for everyone in your country", isCorrect: false, feedback: "Too broad audience will waste budget on uninterested people." }
      ]
    }
  },
  {
    id: 4,
    title: "Budgeting & Bidding",
    objective: "Manage budget and understand bidding types.",
    content: [
      "CBO (Advantage+ Campaign Budget): Facebook automatically distributes budget to best performing ad sets.",
      "ABO (Ad Set Budget): You set a fixed budget for each ad set manually.",
      "Bidding Strategies: Lowest Cost for max results at lowest price, and Bid Cap for strict control over cost per result."
    ],
    interactionType: InteractionType.QUIZ,
    interactionData: {
      question: "You want to test 3 different audiences to see which is best, and ensure each audience gets equal spend chance. What do you choose?",
      options: [
        { id: "a", text: "Campaign Budget (CBO)", isCorrect: false, feedback: "CBO will spend on the easiest-to-reach audience and wont give equal testing chance." },
        { id: "b", text: "Ad Set Budget (ABO)", isCorrect: true, feedback: "Correct! Setting a budget for each ad set ensures every audience gets its share of spend for testing." }
      ]
    }
  },
  {
    id: 5,
    title: "Creative & Copywriting",
    objective: "Understand creating attractive ads.",
    content: [
      "Ad Formats: Single Image, Video, Collection, or Carousel.",
      "Ad Copy: Must address customer pain points and offer a solution.",
      "CTA (Call to Action): The button guiding the user (Shop Now, Sign Up, Learn More).",
      "The first 3 seconds of a video are crucial for grabbing attention."
    ],
    interactionType: InteractionType.INPUT,
    interactionData: {
      prompt: 'Write a catchy Headline for an ad selling "English Course for Beginners" with 50% discount.',
      placeholder: "Write the headline here...",
      expectedKeywords: ["discount", "50", "english", "learn", "offer", "beginner", "half", "off"],
      successMessage: "Great headline! Using numbers, discounts, and clear words increases Click-Through Rate."
    }
  },
  {
    id: 6,
    title: "Pixel & Tracking",
    objective: "Know how to measure ad performance.",
    content: [
      "Facebook Pixel: Code placed on your website to track visitor actions.",
      "Allows you to know who bought, added to cart, or just visited.",
      "Used for Retargeting and creating Lookalike Audiences.",
      "Events: PageView, AddToCart, Purchase, Lead."
    ],
    interactionType: InteractionType.DRAG_DROP,
    interactionData: {
      instruction: "Match the Event type to the appropriate Campaign Goal:",
      items: [
        { id: "e1", text: "Purchase", targetId: "sales" },
        { id: "e2", text: "Lead", targetId: "forms" },
        { id: "e3", text: "View Content", targetId: "traffic" }
      ],
      zones: [
        { id: "sales", title: "Increase Store Sales" },
        { id: "forms", title: "Collect Real Estate Leads" },
        { id: "traffic", title: "Read Blog Articles" }
      ]
    }
  },
  {
    id: 7,
    title: "Marketing Funnel",
    objective: "Understand the customer journey from awareness to conversion.",
    content: [
      "TOFU (Top of Funnel): Awareness. Goal: Introduce brand to people.",
      "MOFU (Middle of Funnel): Consideration. Goal: Engagement, visits, messages.",
      "BOFU (Bottom of Funnel): Conversion. Goal: Sales, registrations.",
      "Ad message must change according to the stage."
    ],
    interactionType: InteractionType.SCENARIO,
    interactionData: {
      question: "A customer visited your site and added a product to cart but didn’t buy. Which stage is he in, and what ad fits him?",
      options: [
        { id: "a", text: "Awareness - Show him an intro video about the company", isCorrect: false, feedback: "He already knows the company and visited the site." },
        { id: "b", text: "Conversion - Show him an extra discount ad to complete purchase (Retargeting)", isCorrect: true, feedback: "Exactly! He is ready to buy and needs a small push (discount or reminder)." },
        { id: "c", text: "Consideration - Ask him to like the page", isCorrect: false, feedback: "He passed this stage, he is very close to buying." }
      ]
    }
  },
  {
    id: 8,
    title: "Analytics & Optimization",
    objective: "Understand how to optimize campaigns and read numbers.",
    content: [
      "CTR (Click-Through Rate): Indicates ad attractiveness.",
      "CPC (Cost Per Click).",
      "ROAS (Return on Ad Spend): (Sales ÷ Spend).",
      "CPM (Cost Per 1000 Impressions).",
      "If CTR is low, try changing the design or headline."
    ],
    interactionType: InteractionType.CHART,
    interactionData: {
      instruction: 'Analyze campaign performance in the chart below. Blue line is "Spend", Green line is "Sales". In your opinion, what is the "Golden Day" where campaign had highest efficiency (ROAS) before we started increasing spend and results declined?',
      correctDayIndex: 4,
      feedback: 'Excellent! On "Day 5" we made 250 sales with only 75 spend (ROAS = 3.33). After that, despite increasing spend significantly on days 6 & 7, sales didn’t increase by same ratio, indicating efficiency drop (Scaling Issues).'
    }
  },
  {
    id: 9,
    title: "Final Challenge",
    objective: "Comprehensive application of everything learned.",
    content: [
      "Time for the final test!",
      "You will create a full campaign strategy for a new Perfume Store.",
      "You must make the right decisions at every step."
    ],
    interactionType: InteractionType.FINAL,
    interactionData: {
      steps: [
        {
          question: "The store is brand new. What is the first campaign objective?",
          options: [
            { id: "1a", text: "Conversion immediately", isCorrect: false, feedback: "Very hard for unknown store. Start with Awareness or Traffic first." },
            { id: "1b", text: "Awareness or Traffic", isCorrect: true, feedback: "Correct. We need to introduce the brand to people first." }
          ]
        },
        {
          question: "What is the most suitable audience to start?",
          options: [
            { id: "2a", text: "Broad audience interested in Perfumes/Fashion", isCorrect: true, feedback: "Good. We don’t have past data, so interest targeting is best." },
            { id: "2b", text: "Lookalike Audience", isCorrect: false, feedback: "Cannot create Lookalike without past data (Custom Audience)." }
          ]
        },
        {
          question: "Ad Creative: What is the most important element to focus on?",
          options: [
            { id: "3a", text: "High quality product image implying luxury", isCorrect: true, feedback: 'Excellent. Perfumes rely on "Feeling" and look because customer can’t smell it.' },
            { id: "3b", text: "Write very long text explaining chemical ingredients", isCorrect: false, feedback: "Boring and likely no one will read it." }
          ]
        }
      ]
    }
  }
];
const getCourseContent = (lang) => {
  return lang === "ar" ? COURSE_CONTENT_AR : COURSE_CONTENT_EN;
};
const QuizComponent = ({ question, options, onComplete }) => {
  const [selectedId, setSelectedId] = reactExports.useState(null);
  const [isSubmitted, setIsSubmitted] = reactExports.useState(false);
  const handleSubmit = () => {
    if (!selectedId) return;
    setIsSubmitted(true);
    const selected = options.find((o) => o.id === selectedId);
    if (selected == null ? void 0 : selected.isCorrect) {
      onComplete(true);
    }
  };
  const selectedOption = options.find((o) => o.id === selectedId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-6 text-slate-800 leading-snug", children: question }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: options.map((option) => {
      const isSelected = selectedId === option.id;
      const showCorrect = isSubmitted && option.isCorrect;
      const showWrong = isSubmitted && isSelected && !option.isCorrect;
      let borderColor = "border-slate-200";
      let bgColor = "bg-white";
      let textColor = "text-slate-700";
      if (showCorrect) {
        borderColor = "border-green-500";
        bgColor = "bg-green-50";
        textColor = "text-green-800";
      } else if (showWrong) {
        borderColor = "border-red-500";
        bgColor = "bg-red-50";
        textColor = "text-red-800";
      } else if (isSelected) {
        borderColor = "border-meta-blue";
        bgColor = "bg-blue-50";
        textColor = "text-meta-blue";
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => !isSubmitted && setSelectedId(option.id),
          disabled: isSubmitted,
          className: `w-full text-right p-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group relative overflow-hidden
                  ${borderColor} ${bgColor} ${textColor}
                  ${!isSubmitted && !isSelected ? "hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5" : ""}
                `,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-lg relative z-10", children: option.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
              showCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-6 h-6 text-green-500 animate-bounce-in" }),
              showWrong && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-6 h-6 text-red-500 animate-bounce-in" }),
              !isSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-5 h-5 rounded-full border-2 ${isSelected ? "border-meta-blue bg-meta-blue" : "border-slate-300 group-hover:border-blue-400"}` })
            ] })
          ]
        },
        option.id
      );
    }) }),
    !isSubmitted && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleSubmit,
        disabled: !selectedId,
        className: "mt-8 w-full bg-meta-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-meta-hover shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 active:translate-y-0",
        children: "تحقق من الإجابة"
      }
    ),
    isSubmitted && selectedOption && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-6 p-6 rounded-2xl border animate-slide-up ${selectedOption.isCorrect ? "bg-green-50 border-green-200 text-green-900" : "bg-red-50 border-red-200 text-red-900"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2 rounded-full shrink-0 ${selectedOption.isCorrect ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`, children: selectedOption.isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg mb-1", children: selectedOption.isCorrect ? "إجابة صحيحة!" : "إجابة خاطئة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "opacity-90 leading-relaxed", children: selectedOption.feedback }),
        !selectedOption.isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setIsSubmitted(false);
              setSelectedId(null);
            },
            className: "text-sm font-bold underline mt-3 hover:opacity-75",
            children: "حاول مرة أخرى"
          }
        )
      ] })
    ] }) })
  ] });
};
const DragDropComponent = ({ instruction, items, zones, onComplete }) => {
  const [unplacedItems, setUnplacedItems] = reactExports.useState(items);
  const [placements, setPlacements] = reactExports.useState({});
  const [selectedItem, setSelectedItem] = reactExports.useState(null);
  const [feedback, setFeedback] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const initialPlacements = {};
    zones.forEach((z) => initialPlacements[z.id] = []);
    setPlacements(initialPlacements);
  }, [zones]);
  const handleItemClick = (itemId) => {
    setSelectedItem(itemId);
    setFeedback(null);
  };
  const handleZoneClick = (zoneId) => {
    if (!selectedItem) return;
    const item = items.find((i) => i.id === selectedItem);
    if (!item) return;
    if (item.targetId === zoneId) {
      setPlacements((prev) => ({
        ...prev,
        [zoneId]: [...prev[zoneId] || [], item.id]
      }));
      setUnplacedItems((prev) => prev.filter((i) => i.id !== item.id));
      setSelectedItem(null);
      setFeedback(null);
    } else {
      setFeedback("هذا ليس المكان الصحيح لهذا العنصر، حاول مرة أخرى.");
      setTimeout(() => setFeedback(null), 2e3);
    }
  };
  reactExports.useEffect(() => {
    if (unplacedItems.length === 0 && items.length > 0) {
      onComplete(true);
    }
  }, [unplacedItems, items.length, onComplete]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in select-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-6 text-slate-800", children: instruction }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-slate-100/80 backdrop-blur rounded-2xl p-6 mb-8 border border-slate-200 min-h-[100px] flex flex-wrap gap-3 items-center justify-center shadow-inner", children: unplacedItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center animate-bounce-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-700 font-bold", children: "أحسنت! تم تصنيف جميع العناصر." })
    ] }) : unplacedItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => handleItemClick(item.id),
        className: `
                group px-5 py-3 rounded-xl font-medium transition-all duration-300 shadow-sm border
                flex items-center gap-2 transform hover:-translate-y-1
                ${selectedItem === item.id ? "bg-meta-blue text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-105 ring-2 ring-offset-2 ring-blue-300" : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:shadow-md"}
              `,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: `w-4 h-4 opacity-50 ${selectedItem === item.id ? "text-white" : "group-hover:text-blue-500"}` }),
          item.text
        ]
      },
      item.id
    )) }),
    feedback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 text-center bg-red-50 text-red-600 font-medium py-2 px-4 rounded-lg inline-block mx-auto animate-pulse border border-red-100", children: feedback }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: zones.map((zone) => {
      var _a, _b;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => handleZoneClick(zone.id),
          className: `
                min-h-[180px] rounded-2xl p-4 flex flex-col items-center transition-all duration-300 relative overflow-hidden group
                ${selectedItem ? "border-2 border-dashed border-blue-400 bg-blue-50/50 cursor-pointer hover:bg-blue-100" : "border border-slate-200 bg-white hover:shadow-md"}
            `,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-slate-700 mb-4 border-b pb-3 w-full text-center relative z-10 group-hover:text-meta-blue transition-colors", children: zone.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full space-y-2 flex-grow relative z-10", children: [
              (_a = placements[zone.id]) == null ? void 0 : _a.map((itemId) => {
                const item = items.find((i) => i.id === itemId);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border-l-4 border-green-500 shadow-sm px-4 py-3 rounded-r-lg text-sm text-slate-700 font-medium animate-slide-up flex items-center justify-between", children: [
                  item == null ? void 0 : item.text,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3 h-3 text-green-500" })
                ] }, itemId);
              }),
              ((_b = placements[zone.id]) == null ? void 0 : _b.length) === 0 && selectedItem && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full opacity-30 text-blue-600 animate-pulse", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-8 h-8 mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold uppercase tracking-widest", children: "ضع هنا" })
              ] })
            ] })
          ]
        },
        zone.id
      );
    }) })
  ] });
};
const data = [
  { day: "يوم 1", spend: 50, sales: 60 },
  { day: "يوم 2", spend: 55, sales: 70 },
  { day: "يوم 3", spend: 60, sales: 90 },
  { day: "يوم 4", spend: 70, sales: 110 },
  { day: "يوم 5", spend: 75, sales: 250 },
  // Correct day (Index 4)
  { day: "يوم 6", spend: 150, sales: 180 },
  // Efficiency drops
  { day: "يوم 7", spend: 200, sales: 210 }
];
const InteractiveChart = ({ instruction, correctDayIndex, feedback, onComplete }) => {
  const [selectedIndex, setSelectedIndex] = reactExports.useState(null);
  const handleSelect = (index) => {
    setSelectedIndex(index);
    if (index === correctDayIndex) {
      onComplete(true);
    }
  };
  const getFeedbackMessage = (index) => {
    if (index === correctDayIndex) return feedback;
    if (index > correctDayIndex) return 'خطأ: لاحظ أن المصاريف (الخط الأزرق) ارتفعت بشكل حاد في هذا اليوم، لكن المبيعات (الخط الأخضر) لم ترتفع بنفس القوة. هذا يعني أن "تكلفة النتيجة" زادت والعائد قل (ROAS انخفض).';
    return "خطأ: النتائج هنا جيدة وتتصاعد باستقرار، لكننا لم نصل للذروة الحقيقية بعد. ابحث عن اليوم الذي حقق أكبر قفزة في المبيعات مع ثبات نسبي في المصاريف.";
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-4 animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-100 rounded-lg text-blue-600 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-slate-800 text-lg leading-snug", children: instruction }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-500 mt-2 font-medium", children: "اضغط على أزرار الأيام بالأسفل لاختيار إجابتك:" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full select-none mb-6", dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      LineChart,
      {
        data,
        margin: { top: 20, right: 30, left: -10, bottom: 0 },
        onClick: (e) => {
          if (e && e.activeTooltipIndex !== void 0) {
            handleSelect(e.activeTooltipIndex);
          }
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false, stroke: "#f1f5f9" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "day",
              tick: { fontSize: 12, fill: "#64748b" },
              tickMargin: 10,
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              tick: { fontSize: 12, fill: "#64748b" },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              contentStyle: { borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", direction: "rtl", textAlign: "right", fontFamily: "Tajawal" },
              cursor: { stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "4 4" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "sales",
              stroke: "#10b981",
              strokeWidth: 3,
              name: "المبيعات (Sales)",
              activeDot: { r: 8 }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Line,
            {
              type: "monotone",
              dataKey: "spend",
              stroke: "#3b82f6",
              strokeWidth: 3,
              name: "المصاريف (Spend)",
              activeDot: { r: 8 }
            }
          ),
          selectedIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReferenceDot,
            {
              x: data[selectedIndex].day,
              y: data[selectedIndex].sales,
              r: 6,
              fill: selectedIndex === correctDayIndex ? "#10b981" : "#ef4444",
              stroke: "white",
              strokeWidth: 2
            }
          )
        ]
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 md:grid-cols-7 gap-2", children: data.map((d, idx) => {
      const isSelected = selectedIndex === idx;
      const isCorrect = idx === correctDayIndex;
      let btnClass = "bg-white border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600";
      if (isSelected) {
        if (isCorrect) {
          btnClass = "bg-green-500 text-white border-green-600 shadow-lg shadow-green-200 scale-105 ring-2 ring-offset-1 ring-green-300";
        } else {
          btnClass = "bg-red-500 text-white border-red-600 shadow-lg shadow-red-200 scale-105 ring-2 ring-offset-1 ring-red-300";
        }
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => handleSelect(idx),
          className: `py-3 px-1 rounded-xl border-2 text-sm font-bold transition-all duration-200 flex flex-col items-center justify-center gap-1 ${btnClass}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d.day }),
            isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/20 rounded-full p-0.5", children: isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }) })
          ]
        },
        idx
      );
    }) }),
    selectedIndex !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mt-6 p-4 rounded-xl border animate-slide-up flex items-start gap-3 ${selectedIndex === correctDayIndex ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-1 p-1 rounded-full shrink-0 ${selectedIndex === correctDayIndex ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`, children: selectedIndex === correctDayIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-5 h-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold mb-1 text-lg", children: selectedIndex === correctDayIndex ? "إجابة صحيحة! 🎉" : "إجابة خاطئة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 leading-relaxed font-medium", children: getFeedbackMessage(selectedIndex) })
      ] })
    ] })
  ] });
};
const FinalChallenge = ({ steps, onComplete }) => {
  const [currentStep, setCurrentStep] = reactExports.useState(0);
  const [score, setScore] = reactExports.useState(0);
  const [showResult, setShowResult] = reactExports.useState(false);
  const [lastFeedback, setLastFeedback] = reactExports.useState(null);
  const handleOptionSelect = (isCorrect, feedback) => {
    setLastFeedback(feedback);
    if (isCorrect) {
      setScore((s) => s + 1);
    }
    setTimeout(() => {
      setLastFeedback(null);
      if (currentStep < steps.length - 1) {
        setCurrentStep((c) => c + 1);
      } else {
        setShowResult(true);
        onComplete(true);
      }
    }, 2500);
  };
  if (showResult) {
    const passed = score >= steps.length - 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-8 rounded-xl shadow-lg border border-slate-200 mt-4 text-center", children: passed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-12 h-12 text-yellow-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-2", children: "مبروك! لقد أتممت الدورة بنجاح" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 mb-6", children: "لقد أثبتت مهارتك في إدارة إعلانات Meta." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 bg-slate-50 border rounded-lg w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg", children: "شهادة إتمام: Meta Ads Master" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-slate-500", children: [
          "النتيجة: ",
          score,
          " / ",
          steps.length
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-800 mb-2", children: "حاول مرة أخرى" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 mb-4", children: "تحتاج لتركيز أكثر في القرارات الاستراتيجية." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            setCurrentStep(0);
            setScore(0);
            setShowResult(false);
          },
          className: "bg-meta-blue text-white px-6 py-2 rounded-lg",
          children: "إعادة التحدي"
        }
      )
    ] }) });
  }
  const step = steps[currentStep];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-4 text-sm text-slate-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "السؤال ",
        currentStep + 1,
        " من ",
        steps.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "النقاط: ",
        score
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold mb-6 text-slate-800", children: step.question }),
    lastFeedback ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-slate-50 rounded-lg text-center animate-fade-in", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-lg mb-2", children: lastFeedback }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400", children: "جاري الانتقال للسؤال التالي..." })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: step.options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => handleOptionSelect(option.isCorrect, option.feedback),
        className: "w-full text-right p-5 rounded-lg border border-slate-200 hover:border-meta-blue hover:bg-meta-light transition-all flex items-center justify-between group",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-slate-700 group-hover:text-meta-blue", children: option.text })
      },
      option.id
    )) })
  ] });
};
const InputChallenge = ({ prompt, placeholder, expectedKeywords, successMessage, onComplete }) => {
  const [value, setValue] = reactExports.useState("");
  const [feedback, setFeedback] = reactExports.useState(null);
  const [completed, setCompleted] = reactExports.useState(false);
  const handleSubmit = () => {
    const lowerVal = value.toLowerCase();
    const hasKeyword = expectedKeywords.some((k) => lowerVal.includes(k.toLowerCase()));
    if (hasKeyword && value.length > 5) {
      setFeedback(successMessage);
      setCompleted(true);
      onComplete(true);
    } else {
      setFeedback('حاول كتابة عنوان أكثر جاذبية يحتوي على كلمات مثل "خصم" أو "عرض".');
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold mb-4 text-slate-800", children: prompt }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value,
          onChange: (e) => setValue(e.target.value),
          placeholder,
          disabled: completed,
          className: "w-full p-4 pl-12 rounded-lg border border-slate-300 focus:border-meta-blue focus:ring-1 focus:ring-meta-blue outline-none"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSubmit,
          disabled: completed || !value,
          className: "absolute left-2 top-2 bottom-2 bg-meta-blue text-white px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-300 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" })
        }
      )
    ] }),
    feedback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mt-4 p-3 rounded text-sm ${completed ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`, children: feedback })
  ] });
};
const PixelInstallationGuide = () => {
  const [currentStep, setCurrentStep] = reactExports.useState(0);
  const { language } = useLanguage();
  const isAr = language === "ar";
  const steps = isAr ? [
    {
      title: "مدير الأحداث (Events Manager)",
      description: 'من قائمة Business Manager، انتقل إلى "Events Manager" لبدء الإعداد. هذه هي لوحة التحكم الخاصة ببياناتك.',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-10 h-10 text-white" }),
      color: "bg-slate-600",
      imageHint: "ابحث عن أيقونة الترس أو القائمة الجانبية."
    },
    {
      title: "ربط مصدر البيانات (Connect Data)",
      description: 'اختر "Web" كمصدر للبيانات لأنك تريد تتبع موقع إلكتروني، ثم اضغط على زر "Connect" الأزرق للبدء.',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-10 h-10 text-white" }),
      color: "bg-blue-500",
      imageHint: "ستظهر لك خيارات مثل App و CRM، اختر Web."
    },
    {
      title: "تسمية البكسل (Name Your Pixel)",
      description: 'اكتب اسماً واضحاً للبكسل (مثلاً: "بكسل متجري") واضغط "Create". الاسم يساعدك في تنظيم حساباتك لاحقاً.',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "w-10 h-10 text-white" }),
      color: "bg-indigo-500",
      imageHint: "يمكنك تغيير الاسم لاحقاً إذا أردت."
    },
    {
      title: "تثبيت الكود (Install Code)",
      description: 'للمبتدئين: اختر "Partner Integration" لربطه تلقائياً مع منصات مثل Shopify أو WordPress بدون برمجة.',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "w-10 h-10 text-white" }),
      color: "bg-purple-500",
      imageHint: "إذا كان لديك مبرمج، اختر Manual Install."
    },
    {
      title: "التحقق (Verify Setup)",
      description: 'استخدم أداة "Test Events" في فيسبوك، أو افتح موقعك للتأكد من أن مؤشر الحالة أصبح "Active" (أخضر).',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-white" }),
      color: "bg-green-500",
      imageHint: "حمل إضافة Facebook Pixel Helper للمساعدة."
    }
  ] : [
    {
      title: "Events Manager",
      description: 'From Business Manager menu, go to "Events Manager" to start setup. This is your data dashboard.',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-10 h-10 text-white" }),
      color: "bg-slate-600",
      imageHint: "Look for the gear icon or side menu."
    },
    {
      title: "Connect Data",
      description: 'Select "Web" as your data source to track a website, then click the blue "Connect" button.',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-10 h-10 text-white" }),
      color: "bg-blue-500",
      imageHint: "You will see options like App and CRM, choose Web."
    },
    {
      title: "Name Your Pixel",
      description: 'Enter a clear name for your pixel (e.g., "My Store Pixel") and click "Create". Naming helps organize accounts later.',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MousePointerClick, { className: "w-10 h-10 text-white" }),
      color: "bg-indigo-500",
      imageHint: "You can change the name later if you want."
    },
    {
      title: "Install Code",
      description: 'For beginners: Choose "Partner Integration" to connect automatically with platforms like Shopify or WordPress without coding.',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "w-10 h-10 text-white" }),
      color: "bg-purple-500",
      imageHint: "If you have a developer, choose Manual Install."
    },
    {
      title: "Verify Setup",
      description: 'Use "Test Events" tool in Facebook, or open your site to check if the status indicator becomes "Active" (Green).',
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-white" }),
      color: "bg-green-500",
      imageHint: "Install Facebook Pixel Helper extension to help."
    }
  ];
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const step = steps[currentStep];
  const progress = (currentStep + 1) / steps.length * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200", dir: isAr ? "rtl" : "ltr", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 border-b pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-bold text-lg text-slate-800 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Code, { className: "w-6 h-6 text-meta-blue" }),
        isAr ? "دليل تثبيت البكسل التفاعلي" : "Interactive Pixel Guide"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full", children: isAr ? `خطوة ${currentStep + 1} من ${steps.length}` : `Step ${currentStep + 1} of ${steps.length}` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 rounded-full h-2 mb-8 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-meta-blue h-full transition-all duration-500 ease-out rounded-full",
        style: { width: `${progress}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center animate-fade-in py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `
          w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105
          ${step.color}
        `, children: step.icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-slate-800 mb-3", children: step.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-600 leading-relaxed max-w-lg mb-4 text-lg", children: step.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-yellow-50 text-yellow-800 text-sm px-4 py-2 rounded-lg border border-yellow-100 flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "💡" }),
        " ",
        step.imageHint
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handlePrev,
            disabled: currentStep === 0,
            className: `
              flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors
              ${currentStep === 0 ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}
            `,
            children: [
              isAr ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" }),
              isAr ? "السابق" : "Previous"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: handleNext,
            disabled: currentStep === steps.length - 1,
            className: `
              flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold transition-colors min-w-[140px]
              ${currentStep === steps.length - 1 ? "bg-green-500 text-white cursor-default" : "bg-meta-blue text-white hover:bg-blue-700"}
            `,
            children: currentStep === steps.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              isAr ? "تم الإكمال" : "Completed",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-5 h-5" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              isAr ? "التالي" : "Next",
              " ",
              isAr ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
            ] })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-2 mt-8", children: steps.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `w-2.5 h-2.5 rounded-full transition-colors ${idx === currentStep ? "bg-meta-blue" : "bg-slate-200"}`
      },
      idx
    )) })
  ] });
};
const Certificate = ({ recipientName, onClose }) => {
  const certificateRef = reactExports.useRef(null);
  const [isGenerating, setIsGenerating] = reactExports.useState(false);
  const { language } = useLanguage();
  const isAr = language === "ar";
  const certId = React.useMemo(() => {
    const random3 = Math.floor(100 + Math.random() * 900);
    const monthNames = ["JA", "FE", "MA", "AP", "MA", "JU", "JU", "AU", "SE", "OC", "NO", "DE"];
    const month = monthNames[(/* @__PURE__ */ new Date()).getMonth()];
    const year = (/* @__PURE__ */ new Date()).getFullYear().toString().slice(-2);
    const initial = recipientName.trim().charAt(0).toUpperCase() || "A";
    const random4 = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `MED-${random3}-${month}ra${year}@${initial}/${random4}`;
  }, [recipientName]);
  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2,
        // Higher quality
        useCORS: true,
        // For images to work cross-origin
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        imageTimeout: 15e3
        // Wait longer for images
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new E("l", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Meta_Ads_Certificate_${recipientName.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert(isAr ? "حدث خطأ أثناء إنشاء الشهادة. يرجى المحاولة مرة أخرى." : "Error generating certificate. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4 overflow-y-auto", dir: isAr ? "rtl" : "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-800 text-white p-4 flex justify-between items-center shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-5 h-5 text-yellow-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: isAr ? "معاينة الشهادة" : "Certificate Preview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleDownload,
            disabled: isGenerating,
            className: "flex items-center gap-2 bg-meta-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold transition-colors disabled:opacity-50",
            children: [
              isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
              isGenerating ? isAr ? "جاري التحميل..." : "Downloading..." : isAr ? "تحميل PDF" : "Download PDF"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            className: "p-2 hover:bg-slate-700 rounded-lg transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto bg-slate-100 p-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: certificateRef,
        className: "w-[1000px] h-[707px] bg-white relative shadow-xl shrink-0 text-slate-900 flex flex-col",
        style: { direction: "ltr" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-4 border-4 border-double border-meta-blue/30 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-6 border border-meta-gold pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-meta-blue/20 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-meta-blue/20 via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-between py-16 px-16 relative z-10 font-sans", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between w-full items-center mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-slate-800 tracking-widest uppercase font-serif", children: "Medestra" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 tracking-[0.2em] uppercase", children: "Online Academy" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-32 h-24 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "https://lh3.googleusercontent.com/d/1sBR2GW-CwhHfpREEl8cXdYX3tNbBzb6g",
                  alt: "Logo",
                  className: "max-w-full max-h-full",
                  crossOrigin: "anonymous"
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-extrabold text-meta-blue mb-1 tracking-tight font-serif uppercase", children: "Certificate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-slate-500 font-medium tracking-[0.3em] uppercase", children: "Of Completion" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center w-full max-w-3xl space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-slate-600 font-serif italic", children: "This certificate is proudly presented to" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 border-b-2 border-slate-200 w-full min-h-[80px] flex items-end justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-5xl font-script text-slate-900 leading-normal pb-2", children: recipientName }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg text-slate-600 leading-relaxed font-serif", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2", children: "For successfully completing the comprehensive training course" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-meta-blue text-2xl font-sans mb-2", children: "Meta Ads Master Class" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "and demonstrating exceptional skills in digital advertising strategy and campaign management." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end w-full mt-10 px-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center w-48", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-slate-400 pb-2 mb-2 text-lg font-bold text-slate-800 font-serif", children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500 font-bold uppercase tracking-wider", children: "Date" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center w-64", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-slate-400 pb-2 mb-2 relative h-20 flex items-end justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "https://lh3.googleusercontent.com/d/1UhcX3cRqK73ZiPyM9SC8ZYd9joicnXL5",
                    className: "max-h-full max-w-full",
                    alt: "Signature",
                    crossOrigin: "anonymous"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-slate-800 font-serif", children: "Dr. Mahmoud Hussein" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-meta-blue font-bold uppercase tracking-wider", children: "CEO, Medestra" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 w-full text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-slate-300 font-mono", children: [
              "ID: ",
              certId,
              " • Medestra Online Academy"
            ] }) })
          ] })
        ]
      }
    ) })
  ] }) });
};
const WelcomeScreen = ({ onStart }) => {
  const { language, t, dir } = useLanguage();
  const isAr = language === "ar";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-white text-gray-800 selection:bg-brand-blue selection:text-white", dir: isAr ? "rtl" : "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen flex flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute top-0 ${isAr ? "left-0" : "right-0"} w-[50vw] h-[50vw] bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute bottom-0 ${isAr ? "right-0" : "left-0"} w-[40vw] h-[40vw] bg-brand-blue/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto mt-32 mb-20 text-balance", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block py-1 px-4 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider shadow-md transform -rotate-2 border border-brand-blue/20", children: isAr ? "دورة تفاعلية!" : "Interactive Course!" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-7xl font-black mb-6 leading-tight text-gray-900", children: [
              isAr ? "اتقن " : "Master ",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-600 to-cyan-500", children: isAr ? "إعلانات Meta" : "Meta Ads" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-medium leading-relaxed", children: isAr ? "انضم لأقوى تجربة تفاعلية لاحتراف إعلانات Meta. تعلم بالممارسة، نافس نفسك، واستعن بالذكاء الاصطناعي ميديسترا." : "The most powerful interactive experience to master Meta Ads. Learn by doing, challenge yourself, and use Medestra AI." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: onStart,
                className: "px-8 py-4 bg-brand-blue text-white font-bold text-lg rounded-2xl hover:bg-blue-600 transition shadow-xl shadow-brand-blue/20 flex items-center gap-2 group transform hover:-translate-y-1",
                children: [
                  isAr ? "ابدأ كورس الاحتراف الآن" : "Start Master Course Now",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `bg-white/20 rounded-full p-1 ${isAr ? "rotate-180" : ""}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { size: 20, className: "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" }) })
                ]
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 w-full", children: [
        { label: isAr ? "مستويات" : "Levels", value: "10", icon: LayoutDashboard, color: "text-brand-blue", bg: "bg-brand-blue/10" },
        { label: isAr ? "المدة" : "Duration", value: isAr ? "3 ساعات" : "3 Hours", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-600/10" },
        { label: isAr ? "المستوى" : "Level", value: isAr ? "متقدم" : "Advanced", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: isAr ? "الشهادة" : "Certificate", value: isAr ? "مشمولة" : "Included", icon: Award, color: "text-emerald-500", bg: "bg-emerald-500/10" }
      ].map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${stat.color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl md:text-3xl font-bold text-gray-900 mb-1", children: stat.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-gray-500 uppercase tracking-widest font-bold", children: stat.label })
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-12 text-sm text-gray-400 font-bold uppercase tracking-widest", children: isAr ? "تحديثات Meta 2026 • الإصدار 1.0" : "Meta 2026 Updates • v1.0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) });
};
const MetaAdsPage = () => {
  const [hasStarted, setHasStarted] = reactExports.useState(false);
  const [currentLevelId, setCurrentLevelId] = reactExports.useState(1);
  const [unlockedLevels, setUnlockedLevels] = reactExports.useState(1);
  const [isSidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [isLevelComplete, setIsLevelComplete] = reactExports.useState(false);
  const { language, toggleLanguage } = useLanguage();
  const isAr = language === "ar";
  const mainRef = React.useRef(null);
  const COURSE_CONTENT = getCourseContent(language);
  const [showCertForm, setShowCertForm] = reactExports.useState(false);
  const [showCertPreview, setShowCertPreview] = reactExports.useState(false);
  const [userName, setUserName] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (hasStarted) {
      window.scrollTo(0, 0);
      if (mainRef.current) {
        mainRef.current.scrollTo({ top: 0, behavior: "instant" });
      }
      if (currentLevelId < unlockedLevels) {
        setIsLevelComplete(true);
      } else {
        setIsLevelComplete(false);
      }
    }
  }, [currentLevelId, hasStarted, unlockedLevels]);
  const currentLevel = COURSE_CONTENT.find((l) => l.id === currentLevelId) || COURSE_CONTENT[0];
  const isFinalLevel = currentLevel.id === COURSE_CONTENT.length;
  const handleLevelComplete = (success) => {
    if (success) {
      setIsLevelComplete(true);
      if (currentLevelId === unlockedLevels) {
        setUnlockedLevels((prev) => Math.min(prev + 1, COURSE_CONTENT.length + 1));
      }
    }
  };
  const nextLevel = () => {
    if (currentLevelId < COURSE_CONTENT.length) {
      setCurrentLevelId((prev) => prev + 1);
    }
  };
  const handleCertSubmit = (e) => {
    e.preventDefault();
    if (userName.trim().length > 2) {
      setShowCertForm(false);
      setShowCertPreview(true);
    }
  };
  const renderInteraction = (level) => {
    switch (level.interactionType) {
      case InteractionType.QUIZ:
      case InteractionType.SCENARIO:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          QuizComponent,
          {
            question: level.interactionData.question,
            options: level.interactionData.options,
            onComplete: handleLevelComplete
          },
          level.id
        );
      case InteractionType.DRAG_DROP:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          DragDropComponent,
          {
            instruction: level.interactionData.instruction,
            items: level.interactionData.items,
            zones: level.interactionData.zones,
            onComplete: handleLevelComplete
          },
          level.id
        );
      case InteractionType.CHART:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          InteractiveChart,
          {
            instruction: level.interactionData.instruction,
            correctDayIndex: level.interactionData.correctDayIndex,
            feedback: level.interactionData.feedback,
            onComplete: handleLevelComplete
          },
          level.id
        );
      case InteractionType.INPUT:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputChallenge,
          {
            prompt: level.interactionData.prompt,
            placeholder: level.interactionData.placeholder,
            expectedKeywords: level.interactionData.expectedKeywords,
            successMessage: level.interactionData.successMessage,
            onComplete: handleLevelComplete
          },
          level.id
        );
      case InteractionType.FINAL:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          FinalChallenge,
          {
            steps: level.interactionData.steps,
            onComplete: handleLevelComplete
          },
          level.id
        );
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Unknown Interaction" });
    }
  };
  if (!hasStarted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomeScreen, { onStart: () => setHasStarted(true) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Helmet, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("script", { type: "application/ld+json", children: `
            {
              "@context": "https://schema.org",
              "@type": "Course",
              "name": "كورس إعلانات ميتا للقطاع الطبي - Meta Ads Master",
              "description": "دورة تفاعلية شاملة لاحتراف إعلانات فيسبوك وانستجرام للقطاع الطبي. تعلم بالممارسة من الصفر للاحتراف مع الذكاء الاصطناعي.",
              "provider": {
                "@type": "Organization",
                "name": "ميديسترا - Medestra",
                "sameAs": "https://medestra.me"
              }
            }
          ` }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen md:h-screen bg-slate-50 flex flex-col md:flex-row font-sans md:overflow-hidden animate-fade-in", dir: isAr ? "rtl" : "ltr", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `fixed top-0 ${isAr ? "left-0" : "right-0"} w-full h-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-transparent pointer-events-none z-0` }),
      showCertPreview && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Certificate,
        {
          recipientName: userName,
          onClose: () => setShowCertPreview(false)
        }
      ),
      showCertForm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-bounce-in relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setShowCertForm(false),
            className: "absolute top-4 right-4 text-slate-400 hover:text-slate-600",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-slate-800", children: isAr ? "إصدار الشهادة" : "Issue Certificate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 mt-2", children: isAr ? "يرجى كتابة اسمك الثلاثي كما تريد أن يظهر في الشهادة." : "Please enter your full name as you want it to appear on the certificate." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCertSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: `block text-sm font-bold text-slate-700 mb-2 ${isAr ? "text-right" : "text-left"}`, children: isAr ? "الاسم الكامل" : "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: userName,
                onChange: (e) => setUserName(e.target.value),
                placeholder: isAr ? "مثال: أحمد محمد علي" : "Ex: John Doe",
                className: `w-full p-3 rounded-xl border border-slate-300 focus:border-meta-blue focus:ring-2 focus:ring-meta-blue/20 outline-none transition-all ${isAr ? "text-right" : "text-left"}`,
                required: true,
                minLength: 3
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "submit",
              className: "w-full bg-meta-blue text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isAr ? "إنشاء الشهادة" : "Generate Certificate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5" })
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden bg-white/80 backdrop-blur-md border-b p-4 flex justify-between items-center sticky top-0 z-40 shadow-sm h-[74px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setHasStarted(false),
            className: "font-extrabold text-slate-800 flex items-center gap-3 text-lg hover:opacity-75 transition-opacity",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "https://drive.google.com/thumbnail?id=1sBR2GW-CwhHfpREEl8cXdYX3tNbBzb6g&sz=w200",
                  alt: "Meta Master Logo",
                  className: "w-8 h-8 object-contain",
                  referrerPolicy: "no-referrer"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Meta Master" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSidebarOpen(!isSidebarOpen), className: "p-2 hover:bg-slate-100 rounded-lg transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-6 h-6 text-slate-600" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: `
          fixed bottom-0 top-[74px] md:top-0 ${isAr ? "right-0 border-l" : "left-0 border-r"} z-30 w-72 bg-white border-slate-200 shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-full flex flex-col
          ${isSidebarOpen ? "translate-x-0" : isAr ? "translate-x-full" : "-translate-x-full"}
        `, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 border-b border-slate-100 hidden md:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setHasStarted(false),
            className: `text-xl font-extrabold text-slate-800 flex items-center gap-3 w-full ${isAr ? "text-right" : "text-left"} hover:opacity-75 transition-opacity`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "https://drive.google.com/thumbnail?id=1sBR2GW-CwhHfpREEl8cXdYX3tNbBzb6g&sz=w200",
                  alt: "Meta Ads Master Logo",
                  className: "w-12 h-12 object-contain drop-shadow-sm hover:scale-105 transition-transform",
                  referrerPolicy: "no-referrer"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Meta Ads Master" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-meta-blue hover:bg-blue-50 rounded-lg mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: `w-4 h-4 ${isAr ? "" : "rotate-180"}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isAr ? "العودة للرئيسية" : "Back to Home" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2", children: isAr ? "المسار التعليمي" : "Learning Path" }),
          COURSE_CONTENT.map((level) => {
            const isUnlocked = level.id <= unlockedLevels;
            const isActive = level.id === currentLevelId;
            const isCompleted = level.id < unlockedLevels;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                disabled: !isUnlocked,
                onClick: () => {
                  setCurrentLevelId(level.id);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                },
                className: `group w-full ${isAr ? "text-right" : "text-left"} p-3 rounded-xl flex items-center gap-3 transition-all duration-200 relative overflow-hidden
                    ${isActive ? "bg-meta-light text-meta-blue font-bold shadow-sm ring-1 ring-blue-100" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}
                    ${!isUnlocked ? "opacity-60 cursor-not-allowed grayscale" : ""}
                  `,
                children: [
                  isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `absolute ${isAr ? "right-0" : "left-0"} top-0 bottom-0 w-1 bg-meta-blue ${isAr ? "rounded-l-full" : "rounded-r-full"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `
                      w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors
                      ${isActive ? "bg-white text-meta-blue shadow-sm" : isCompleted ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"}
                  `, children: isCompleted && !isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5" }) : isUnlocked ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold font-mono", children: level.id }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 truncate text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block truncate", children: level.title }) })
                ]
              },
              level.id
            );
          })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-t border-slate-100 bg-slate-50/50 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-slate-800", children: isAr ? "مستواك الحالي" : "Current Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-500", children: unlockedLevels === 1 ? isAr ? "مبتدئ جديد" : "Newbie" : unlockedLevels > 8 ? isAr ? "خبير إعلانات" : "Ads Expert" : isAr ? "مسوق طموح" : "Aspiring Marketer" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: toggleLanguage,
              className: "w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-slate-200 text-slate-600 hover:bg-white hover:text-meta-blue hover:shadow-sm transition-all text-sm font-bold",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: language === "ar" ? "Switch to English" : "التحويل للعربية" })
              ]
            }
          )
        ] })
      ] }),
      isSidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 md:hidden transition-opacity",
          onClick: () => setSidebarOpen(false)
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { ref: mainRef, className: "flex-1 p-4 md:p-8 lg:p-12 md:overflow-y-auto relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto space-y-8 pb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 animate-fade-in", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm font-bold text-slate-600 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isAr ? "التقدم العام" : "Overall Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-meta-blue", children: [
              Math.round((unlockedLevels - 1) / COURSE_CONTENT.length * 100),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-slate-100 rounded-full h-3 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-gradient-to-r from-meta-blue to-blue-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(6,104,225,0.3)]",
              style: { width: `${(unlockedLevels - 1) / COURSE_CONTENT.length * 100}%` }
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-slide-up space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-blue-200", children: [
                isAr ? "المستوى" : "Level",
                " ",
                currentLevel.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-slate-400 text-sm font-medium", children: [
                "/ ",
                COURSE_CONTENT.length
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4", children: currentLevel.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-blue-900", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 text-meta-blue shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium leading-relaxed", children: currentLevel.objective })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50 transition-transform group-hover:scale-110" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xl font-bold mb-6 text-slate-800 flex items-center gap-2 relative z-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-8 bg-meta-blue rounded-full" }),
              isAr ? "المادة التعليمية" : "Learning Material"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4 relative z-10", children: currentLevel.content.map((point, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-4 text-slate-700 leading-relaxed p-2 rounded-lg hover:bg-slate-50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-blue-100 text-meta-blue flex items-center justify-center shrink-0 text-xs font-bold mt-0.5", children: index + 1 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: point })
            ] }, index)) }),
            currentLevel.id === 6 && /* @__PURE__ */ jsxRuntimeExports.jsx(PixelInstallationGuide, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-white p-1 rounded-3xl shadow-lg border border-slate-100 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 text-white p-6 md:p-8 rounded-t-3xl relative overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-slate-800 to-slate-900 z-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center gap-3 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-yellow-400 text-slate-900 p-1.5 rounded-lg shadow-lg shadow-yellow-400/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-6 h-6" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold", children: isAr ? "نشاط تفاعلي" : "Interactive Activity" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative z-10 text-slate-400 text-sm", children: isAr ? "أثبت مهاراتك وانتقل للمستوى التالي" : "Prove your skills and unlock next level" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 md:p-8 bg-slate-50", children: [
              renderInteraction(currentLevel),
              isLevelComplete && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 flex justify-center animate-bounce-in", children: !isFinalLevel ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: nextLevel,
                  className: "group bg-meta-blue text-white pl-8 pr-6 py-4 rounded-2xl font-bold text-lg hover:bg-meta-hover shadow-xl shadow-blue-500/30 transition-all transform hover:-translate-y-1 flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isAr ? "الانتقال للمستوى التالي" : "Next Level" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `bg-white/20 p-1 rounded-full group-hover:translate-x-1 transition-transform ${isAr ? "" : "rotate-180"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" }) })
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: () => setShowCertForm(true),
                  className: "group bg-gradient-to-r from-yellow-400 to-orange-500 text-white pl-8 pr-6 py-4 rounded-2xl font-bold text-lg hover:shadow-orange-500/40 shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isAr ? "احصل على الشهادة الخاصة بك" : "Get Your Certificate" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white/20 p-2 rounded-full group-hover:rotate-12 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-6 h-6" }) })
                  ]
                }
              ) })
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] });
};
export {
  MetaAdsPage as default
};

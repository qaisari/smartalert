import Address from "@/components/block/Address";
import { start } from "@popperjs/core";

const ar = {
  home: {
    sources: {
      title: "استكشف مواقع السيارات المتاحة",
    },
    hero: {
      text_1: "التطبيق الذي لا غنى عنه",
      text_2: "للعثور على سيارتك المثالية في المغرب!",
      text_3: "لا تفوت الفرصة المثالية مرة أخرى. إعلانات حديثة من جميع مواقع السيارات في المغرب في الوقت الفعلي على سمارت أليرت.",
    },
    guide: {
      _1: {
        title: "بوابة موحدة",
        text: "وصول مجمع إلى مواقع البيع الرئيسية في المغرب، مثل Avito و Wandaloo وغيرها.",
      },
      _2: {
        title: "تصميم سهل الاستخدام",
        text: "واجهة مستخدم بديهية وسهلة الاستخدام لتجربة سلسة وممتعة.",
      },
      _3: {
        title: "تحديثات بانتظام",
        text: "تحديثات دائمة لتحسين التطبيق باستمرار.",
      },
    },
    rating: {
      title: {
        _1: "تعرّف على ما يقوله",
        _2: "عملاؤنا.",
      },
      satisfaction: {
        _1: "+20 ألف",
        _2: "مستخدم راضٍ!",
      },
      note: {
        _1: "4.88",
        _2: "تقييم عام",
      },
    },
    usedCars: {
      title: "أحدث السيارات المستعملة",
      description: "اكتشف مجموعتنا المختارة من السيارات المستعملة",
      tag: "مباع",
    },
    newCars: {
      title: "سيارات جديدة على عرض خاص",
      description: "استفد من خصم على مجموعة مختارة من السيارات الجديدة",
      tag: "تخفيض",
    },
  },
  about: {
    banner: {
      text_1: "هل تبحث عن سيارة؟",
      text_2: "شريكك الموثوق",
    },
    whyUs: {
      title: "لماذا نحن",
      bloc_1: {
        title: "أفضل سعر",
        text: `الوصول المجمّع إلى مواقع البيع الرئيسية في المغرب، لضمان العثور على السيارة المناسبة بأفضل سعر.`,
      },
      bloc_2: {
        title: "واجهة سهلة الاستخدام",
        text: `واجهة مستخدم بديهية وسهلة الاستخدام لتجربة سلسة وممتعة.`,
      },
      bloc_3: {
        title: "تخصيص التنبيهات",
        text: `ضبط الإشعارات بناءً على معاييرك الخاصة .`,
      },
    },
    description: {
      title: "نبذة عن سمارت أليرت",
      sub: "البوابة الحصرية التي أحدثت ثورة في طريقة إعلان الناس عن سياراتهم في المغرب!",
      text: "خدمةالتنبيه الذكي هي الحل الأكثر اكتمالاً وعملية لشراء سيارتك في المغرب.\
    توفر هذه الخدمة وصولاً شاملاً إلى جميع مواقع إعلانات السيارات في المغرب،\
    بالإضافة إلى أنها ترسل إشعارات في الوقت الفعلي لكل إعلان جديد يتم نشره على جميع هذه المواقع."
    },
    counter: {
      bloc_1: {
        meta: "التحميلات النشطة",
      },
      bloc_2: {
        meta: "آراء العملاء",
      },
      bloc_3: {
        meta: "تقييم Play Store",
      },
      bloc_4: {
        meta: "عدد الإعلانات",
      },
    },
    testimonial: {
      title: "ما يقوله عملاؤنا",
      sub: "شريكك الموثوق",
    },
    counter2: {
      satisfaction: {
        _1: "+20 ألف",
        _2: "مستخدم راضٍ",
      },
      note: {
        _1: "4.88",
        _2: "تقييم عام",
      },
    },
  },
  terms: [
    {
      tab_title: "الشروط والأحكام العامة",
      title: "الشروط العامة والمسؤوليات",
      content: [{
        title: "1. قبول الشروط",
        body: `باستخدامك لتطبيق التجارة الإلكترونية عبر الهاتف المحمول هذا، فإنك تقبل
                شروط الاستخدام هذه بشكل كامل ودون تحفظ.
                إذا كنت لا تقبل هذه الشروط، يُرجى التوقف عن استخدام
                التطبيق فوراً.`,
      },
      {
        title: "2. تعديل الشروط والأحكام",
        body: `نحتفظ بالحق في تعديل شروط الاستخدام هذه
        في أي وقت. ستدخل التغييرات حيز التنفيذ بمجرد نشرها
        في التطبيق. يُنصح بمراجعة
        شروط الاستخدام بانتظام للاطلاع على
        أي تحديثات.`,
      },
      {
        title: "3. المسؤولية",
        body: `يتم توفير التطبيق "كما هو" ونحن لا نضمن
        تشغيله دون انقطاع أو خلوه من الأخطاء أو خلوه من الفيروسات.
                        لا نتحمل أي مسؤولية عن أي أضرار مباشرة أو
        غير مباشرة أو تبعية تنشأ عن استخدام التطبيق.`,
      }
      ],
    },
    {
      tab_title: "استخدام التطبيق",
      title: "استخدام التطبيق والملكية الفكرية والمنتجات",
      content: [
        {
          title: "1. استخدام التطبيق",
          body: `يحق لك استخدام هذا التطبيق لأغراض
                شخصية غير تجارية فقط
                . لا يجوز لك إعادة إنتاج
                محتوى هذا التطبيقأو
                توزيعه أو تعديله أو استغلاله دون
                إذن مسبق.`
        },
        {
          title: "2. المنتجات والمعاملات",
          body: `المنتجات المعروضة في التطبيق تخضع للتوافر.
                          يتم توفير أسعار المنتجات وأوصافها وصورها
          للعلم فقط وقد تخضع للتغيير دون إشعار مسبق.
                          تخضع المعاملات التي تتم عبر التطبيق
          لسياسات الدفع والتسليم والإرجاع المحددة.`,
        },
        {
          title: "3. الملكية الفكرية",
          body: `إن جميع حقوق الملكية الفكرية المتعلقة بالتطبيق،
          بما في ذلك الشعارات والعلامات التجارية والمحتوى،
          هي ملك للشركة أو الجهات المرخصة لها.
                          غير مصرح لك باستخدام هذه
          العناصر أو إعادة إنتاجها أو توزيعها
          دون إذن مسبق.`
        }
      ],
    },
    {
      tab_title: "إدارة البيانات",
      title: "إدارة حسابات المستخدمين والبيانات الشخصية",
      content: [
        {
          title: "1. حساب المستخدم",
          body: `عند إنشاء حساب مستخدم، يجب عليك تقديم
          معلومات دقيقة وكاملة وحديثة. أنت مسؤول عن
          سرية تفاصيل تسجيل الدخول الخاصة بك وجميع
          الأنشطة التي تتم على حسابك.`
        },
        {
          title: "2. جمع البيانات الشخصية واستخدامها",
          body: `قد يجمع التطبيق بيانات شخصية معينة ويعالجها
          من أجل تقديم خدماته وتحسين تجربة المستخدم
          وضمان أمن الحساب. تُستخدم البيانات التي يتم جمعها
          فقط من أجل التشغيل السليم للتطبيق
          ولا يُعاد بيعها أو مشاركتها مع أطراف ثالثة غير مصرح لها.
                <br />
                باستخدام التطبيق، فإنك توافق على هذا الجمع والاستخدام
          وفقًا للقوانين السارية بشأن حماية البيانات الشخصية.`
        },
        {
          title: "3. حذف البيانات الشخصية",
          body: `يمكنك حذف حسابك وجميع بياناتك الشخصية 
          عن طريق الوصول إلى خيار "حذف الحساب" في إعدادات 
          التطبيق. هذا الإجراء نهائي وسيؤدي 
          إلى الحذف الفوري لمعلوماتك من خوادمنا.`,
        },
      ],
    }
  ],
  cars: {
    filterTitle: "فلتر",
    null: "غير متوفر",
    sold: "مباع",
    promo: "تخفيض",
    others: "أخرى",
  },
  usedCars: {
    details: "المزيد من التفاصيل",
    essential: "النقاط الأساسية",
    specification: "المواصفات",
    brand: "العلامة التجارية",
    model: "الموديل",
    year: "السنة",
    mileage: "عدد الكيلومترات",
    mileageMin: "الحد الأدنى للكيلومترات",
    mileageMax: "الحد الأقصى للكيلومترات",
    transmission: "ناقل الحركة",
    doors: "عدد الأبواب",
    condition: "الحالة",
    origin: "الأصل",
  },
  newCars: {
    versions: "الإصدارات",
    versionName: "اسم الإصدار",
    fuel: "نوع الوقود",
    power: "القوة",
    price: "السعر",
    promo: "تخفيض",
    priceFrom: "ابتداءً من",
    moreDetails: "المزيد من التفاصيل"
  },
  notFound : {
    title: "عفوًا! يبدو أنك قد ضعت.",
    description: "الصفحة التي تبحث عنها غير متوفرة. حاول البحث مرة أخرى أو استخدم الانتقال إلى.",
    buttonLabel: "العودة إلى الصفحة الرئيسية",
  },
  sideBar: {
    source: {
      title: "المصدر",
      placeHolder: "مثال: SmartAlert",
    },
    city: {
      title: "المدينة",
      placeHolder: "مثال: الرباط",
    },
    brand: {
      title: "العلامة التجارية",
      placeHolder: "مثال: داسيا",
      placeholder: "مثال: داسيا",
    },
    model: {
      title: "الموديل",
      placeHolder: "مثال: داستر",
      placeholder: "مثال: A3",
    },
    price: {
      title: "السعر",
    },
    year: {
      title: "السنة",
    },
    mileage: {
      title: "عدد الكيلومترات",
    },
    promo: {
      cartitle: "تخفيض",
      title: "تخفيض",
      default: "نعم",
    },
    origin: {
      title: "الأصل",
    },
    fuel: {
      title: "نوع الوقود",
    },
    doors: {
      title: "عدد الأبواب",
    },
    firstHand: {
      title: "يد أولى",
    },
    transmission: {
      title: "نوع ناقل الحركة",
    },
    search: "بحث"
  },
  rental: {
    Address: "العنوان:",
    Telephone: "الهاتف:",
    period: "الفترة",
    pickupLocation: "مكان الانطلاق",
    dropoffLocation: "مكان الإيداع",
    sameLocation: "نفس المكان",
    differentLocation: "مكان مختلف",
    startDate: "البداية",
    startHour: "ساعة الانطلاق",
    endHour: "ساعة العودة",
    endDate: "النهاية",
    from: "من",
    to: "إلى",
  oneway: "رحلة ذهاب فقط",
  roundTrip: "رحلة ذهاب وإياب",
  roundtrip: "رحلة ذهاب وإياب", // alias
  rentalDetails: "تفاصيل الإيجار",
  character: "الخصائص",
  toutes: "جميع الخصائص",
  bigtoutes: "جميع الخصائص",
  reduction: "إخفاء",
  conditions: "الشروط",
  conditionsAgeLabel: "عمر المستأجر",
  conditionsAgeValue: "22 - 65 سنة",
  drivingExperienceLabel: "خبرة القيادة",
  drivingExperienceValue: "منذ سنتين على الأقل",
  mileageLimitLabel: "حد الكيلومترات",
  mileageLimitValue: "لا يوجد",
  assuranceTitle: "التأمين",
  noExtraCoverage: "لا توجد تغطية إضافية",
    tripDetails: ":تفاصيل الرحلة",
    carDetails: ":تفاصيل السيارة",
    specs: {
      transmission: "علبة السرعات",
      engine: "المحرك",
      productionYear: "سنة الصنع",
      audio: "الصوت",
      bluetooth: "بلوتوث",
      seats: "عدد المقاعد",
      airConditioning: "مكيف الهواء",
      consumption: "استهلاك الوقود",
      abs: "ABS",
      rearCamera: "كاميرا الرجوع للخلف",
      yes: "نعم",
      no: "لا"
    },
  yourContact: "معلوماتك",
  contactForm: {
    fields: {
      fullNameLabel: "الاسم الكامل *",
      fullNamePh: "أدخل الاسم واللقب",
      birthDateLabel: "تاريخ الميلاد *",
      birthDatePh: "أدخل تاريخ الميلاد",
      emailLabel: "البريد الإلكتروني *",
      emailPh: "عنوان البريد الإلكتروني",
      phoneLabel: "الهاتف *",
      phonePh: "رقم الاتصال",
      appsHint: "حدد التطبيقات المرتبطة برقمك",
      secondaryPhoneSection: "هاتف إضافي (اختياري)",
      addAnother: "إضافة رقم آخر",
      secondaryPhonePh: "هاتف إضافي",
      commentLabel: "ملاحظة",
    },
    errors: {
      fullNameReq: "يرجى إدخال الاسم واللقب",
      birthReq: "يرجى إدخال تاريخ الميلاد",
      emailReq: "البريد الإلكتروني مطلوب",
      phoneReq: "رقم الهاتف مطلوب",
    },
    apps: {
      telegram: "تيليغرام",
      whatsapp: "واتساب",
      viber: "فايبر"
    }
  },
  payment: {
    title: "الدفع",
    pay: "ادفع",
    cash: "الدفع عند التسليم",
    cashDesc: "ستدفع عند تسليم السيارة.",
    card: "بطاقة بنكية",
    cardDesc: "الدفع بالبطاقة في المكان.",
    transfer: "تحويل بنكي",
    transferDesc: "الدفع عن طريق التحويل قبل التسليم.",
    methods: {
      gpayLabel: "Google Pay",
      cardNewLabel: "بطاقة ائتمان أو خصم جديدة",
      paypalLabel: "PayPal",
      revolutLabel: "Revolut"
    },
    fields: {
      cardNumber: "رقم البطاقة",
      numberPh: "1111 2222 3333 4444",
      expiry: "تاريخ الانتهاء (شهر/سنة)",
      mmPh: "شهر",
      yyPh: "سنة",
      cvc: "CVC/CVV",
      cvcPh: "123",
      holder: "اسم صاحب البطاقة (كما يظهر على البطاقة)",
      holderPh: "مثال: محمد أحمد"
    }
  },
    departureLabel: "المغادرة",
    returnLabel: "العودة",
    cityPlaceholder: "مثال: الرباط",
    selectPlaceholder: "اختر...",
    selectDates: "اختر هذه التواريخ",
    selectHour: "اختر الساعة",
    reset: "إعادة تعيين",
    pricePerDayLabel: "السعر لكل يوم:",
    rentalDurationLabel: "مدة الإيجار:",
    assuranceLabel: "التأمين:",
    totalLabel: "المجموع:",
    insurancePlans: {
      securityDeposit: "الوديعة",
      plus: {
        name: "تأمين بلس",
        f1: "تغطية لجميع الأضرار\nبدون وديعة",
        f2: "إلغاء الرحلة (مرض، حادث، وفاة)",
        f3: "خدمات المساعدة"
      },
      basic: {
        name: "تأمين أساسي",
        f1: "تغطية لجميع الأضرار بعد خصم نسبة التحمل",
        f3: "إلغاء الرحلة (مرض، حادث، وفاة)",
        f4: "خدمات المساعدة"
      },
      none: {
        name: "بدون تأمين",
        f1: "لا يغطي الأضرار للمركبة، لكنه يغطي الأضرار للمركبات الأخرى"
      }
    }
  },
  weekdays: {
    sunday: "الأحد",
    monday: "الإثنين",
    tuesday: "الثلاثاء",
    wednesday: "الأربعاء",
    thursday: "الخميس",
    friday: "الجمعة",
    saturday: "السبت"
  },
  smallMonths: {
    january: "يناير",
    february: "فبراير",
    march: "مارس",
    april: "أبريل",
    may: "مايو",
    june: "يونيو",
    july: "يوليو",
    august: "أغسطس",
    september: "سبتمبر",
    october: "أكتوبر",
    november: "نوفمبر",
    december: "ديسمبر"
  },
  months: {
    january: "يناير",
    february: "فبراير",
    march: "مارس",
    april: "أبريل",
    may: "مايو",
    june: "يونيو",
    july: "يوليو",
    august: "أغسطس",
    september: "سبتمبر",
    october: "أكتوبر",
    november: "نوفمبر",
    december: "ديسمبر"
  },
  days: {
    sunday: "أحد",
    monday: "إثن",
    tuesday: "ثلا",
    wednesday: "أرب",
    thursday: "خمي",
    friday: "جمع",
    saturday: "سبت"
  },
  carSpecs: {
    essence: "بنزين",
    diesel: "ديزل",
    electric: "كهربائي",
    hybrid: "هجين",
    manual: "يدوي",
    automatic: "أوتوماتيكي"
  },
  cities: {
    casablanca: "الدار البيضاء",
    rabat: "الرباط",
    marrakech: "مراكش",
    agadir: "أكادير",
    fes: "فاس",
    tanger: "طنجة"
  },
  header: {
    home: "الرئيسية",
    usedCars: "المستعمل",
    newCars: "الجديد",
    location: "كراء",
    reparation: "إصلاح السيارات",
    about: "معلومات عنا",
    terms: "الأحكام والشروط",
    selectLanguage: "اختر لغتك",
  },
  rentals: {
    title: "تأجير السيارات",
    filterTitle: "فلتر",
    searchTitle: "البحث عن سيارات للإيجار",
    properties: "عقارات",
    inLocation: "في",
    checkInOut: "الوصول - المغادرة",
    guests: "ضيوف",
    guest: "ضيف",
    bedroom: "غرفة نوم",
    bed: "سرير",
    search: "بحث",
    sort: "ترتيب",
    filter: "تصفية",
    from: "ابتداءً من",
    perAdult: "للشخص البالغ",
    perDay: "في اليوم",
    viewDetail: "عرض التفاصيل",
    reviews: "تقييمات",
    exceptional: "استثنائي",
    typeOfPlace: "نوع المكان",
    price: "السعر",
    guestRating: "تقييم الضيوف",
    amenities: "وسائل الراحة",
    breakfastIncluded: "الإفطار مشمول",
    romantic: "رومانسي",
    airportTransfer: "نقل المطار",
    wifi: "واي فاي",
    parking: "موقف سيارات",
    spa: "سبا",
    breakfast: "إفطار",
    bar: "بار",
    pool: "مسبح",
    gym: "صالة رياضية",
    roomService: "خدمة الغرف",
    entirePlace: "المكان بأكمله",
    privateRoom: "غرفة خاصة",
    sharedRoom: "غرفة مشتركة",
    excellent: "ممتاز",
    veryGood: "جيد جداً",
    good: "جيد",
    pleasant: "لطيف",
    noPreference: "لا تفضيل",
    findOnMap: "العثور على الخريطة",
    showOnMap: "عرض على الخريطة",
    closeMap: "إغلاق الخريطة",
    overview: "نظرة عامة",
    highlights: "النقاط البارزة",
    location: "الموقع",
    availability: "التوفر",
    policies: "السياسات",
    houseRules: "قواعد المنزل",
    helpfulFacts: "معلومات مفيدة",
    guestReviews: "تقييمات الضيوف",
    writeReview: "كتابة تقييم",
    submitReview: "إرسال التقييم",
    bookNow: "احجز الآن",
    checkAvailability: "تحقق من التوفر",
    instantBook: "حجز فوري",
    contactHost: "اتصل بالمضيف",
    reportListing: "الإبلاغ عن هذا الإعلان",
    saveListing: "حفظ",
    shareListing: "مشاركة",
    cancellationPolicy: "سياسة الإلغاء",
    checkInTime: "وقت الوصول",
    checkOutTime: "وقت المغادرة",
    minimumStay: "الحد الأدنى للإقامة",
    maximumStay: "الحد الأقصى للإقامة",
    hostLanguages: "لغات المضيف",
    responseTime: "وقت الاستجابة",
    responseRate: "معدل الاستجابة",
    superhost: "مضيف متميز",
    identityVerified: "الهوية موثقة",
    cleanlinessRating: "تقييم النظافة",
    accuracyRating: "تقييم الدقة",
    communicationRating: "تقييم التواصل",
    locationRating: "تقييم الموقع",
    checkinRating: "تقييم الوصول",
    valueRating: "تقييم القيمة مقابل المال",
    totalRating: "التقييم الإجمالي",
    basedOnReviews: "بناءً على {count} تقييم",
    showMore: "عرض المزيد",
    showLess: "عرض أقل",
    readMore: "اقرأ المزيد",
    readLess: "اقرأ أقل",
    allAmenities: "جميع وسائل الراحة",
    popularAmenities: "وسائل الراحة الشائعة",
    safetyAmenities: "وسائل الأمان",
    internetAmenities: "الإنترنت والمكتب",
    kitchenAmenities: "المطبخ وغرفة الطعام",
    bedroomAmenities: "غرفة النوم والبياضات",
    bathroomAmenities: "الحمام",
    entertainmentAmenities: "الترفيه",
    familyAmenities: "العائلة",
    accessibilityAmenities: "إمكانية الوصول",
    outdoorAmenities: "في الهواء الطلق",
    parkingAmenities: "موقف السيارات والمرافق",
    servicesAmenities: "الخدمات",
    notIncluded: "غير مشمول",
    smoking: "مدخن",
    noSmoking: "غير مدخن",
    petsAllowed: "الحيوانات الأليفة مسموحة",
    noPets: "الحيوانات الأليفة غير مسموحة",
    partiesAllowed: "الحفلات مسموحة",
    noParties: "الحفلات غير مسموحة",
    quietHours: "ساعات الهدوء",
    maximumGuests: "الحد الأقصى للضيوف",
    additionalRules: "قواعد إضافية",
    // Car rental specific translations
    carsAvailable: "سيارة متاحة",
    forDays: "لمدة {count} يوم",
    reserve: "احجز",
    moreDetails: "المزيد من التفاصيل",
    currency: "درهم",
    perDayShort: "/يوم",
    carsFound: "سيارات موجودة",
    noCarsFound: "لم يتم العثور على سيارات بهذه المعايير",
  tryModifyFilters: "جرب تعديل المرشحات",
  periodRequired: "الفترة مطلوبة",
  selectDates: "اختر تاريخ البداية والنهاية"
  ,periodRequiredFull: "يرجى اختيار تاريخ بداية وتاريخ نهاية للمتابعة"
  ,periodRequiredShort: "اختر فترة"
  },
  footer: {
    contactInfo: {
      title: "تواصل معنا",
      clientService: "خدمة العملاء",
      supportService: "تحتاج إلى مساعدة؟",
    },
    mobile: {
      title: "الجوال",
      downloadOn: "حمل على",
      findOn: "متوفر على",
    },
    rights: "كل الحقوق محفوظة.",
  }
}

export default ar;
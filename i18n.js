/**
 * ColorExtract - Internationalization (i18n) Module
 * Complete English and Arabic translations
 */

const translations = {
  en: {
    // Brand
    brandName: "ColorExtract",
    brandTagline: "Extract colors. Create better designs.",
    
    // Navigation
    navHome: "Home",
    navHowItWorks: "How It Works",
    navPreview: "UI Preview",
    navAbout: "About",
    langName: "العربية",
    themeDark: "Dark Mode",
    themeLight: "Light Mode",
    
    // Hero
    heroBadge: "100% In-Browser & Private",
    heroTitle: "Extract Colors From Any Image 🎨",
    heroSubtitle: "Upload an image and instantly discover its most important colors with HEX, RGB, and HSL values ready to use.",
    btnUpload: "Upload Image",
    dropzoneTitle: "Drop your image here, or browse",
    dropzoneSubtitle: "Supports JPG, JPEG, PNG, WEBP (Max 25MB)",
    dropzoneOr: "OR",
    privacyNotice: "Your image is processed locally in your browser whenever possible.",
    sampleImagesTitle: "Or try with an instant sample image:",
    sampleSunset: "Sunset Coast",
    sampleCyberpunk: "Cyberpunk City",
    sampleNature: "Forest Fern",
    sampleMinimal: "Warm Terracotta",
    
    // Image Preview & Controls
    previewTitle: "Uploaded Image",
    fileName: "File Name",
    dimensions: "Dimensions",
    fileSize: "Size",
    btnReplace: "Replace Image",
    btnRemove: "Remove",
    optionsTitle: "Number of Colors to Extract",
    colorCount3: "3 Colors",
    colorCount5: "5 Colors",
    colorCount8: "8 Colors",
    colorCount10: "10 Colors",
    colorCount20: "20 Colors",
    colorCountAll: "All Colors",
    allColorsBadge: "Dynamic Detection",
    allColorsNote: "All Colors — Detect all meaningful colors in the image while automatically removing nearly identical shades.",
    btnExtract: "Extract Colors",
    btnExtracting: "Analyzing your image...",
    
    // Palette Section
    paletteTitle: "Extracted Color Palette",
    paletteSubtitle: "Click any color card to copy its HEX code instantly.",
    colorsFound: "colors detected",
    sortLabel: "Sort by:",
    sortDominant: "Dominant",
    sortBrightness: "Brightness",
    sortHue: "Hue",
    sortSaturation: "Saturation",
    cardUsage: "Usage",
    clickToCopy: "Click card to copy HEX",
    copied: "Copied!",
    copyHex: "Copy HEX",
    copyRgb: "Copy RGB",
    copyHsl: "Copy HSL",
    btnDownloadPalette: "Download Palette",
    btnExportOptions: "Export Options",
    
    // Gradient Section
    gradientTitle: "Color Gradient",
    gradientSubtitle: "Automatically generated gradient using your extracted colors.",
    gradientLinear: "Linear",
    gradientRadial: "Radial",
    gradientConic: "Conic",
    gradientAngle: "Angle",
    btnCopyCss: "Copy CSS",
    gradientCopied: "CSS Copied!",
    
    // Color Preview (UI Mockup)
    previewSectionTitle: "Color Preview",
    previewSectionSubtitle: "See how your extracted palette works inside a real user interface design.",
    shuffleColors: "Shuffle Palette Roles",
    mockupBadge: "Design System",
    mockupHeading: "Build Beautiful Products",
    mockupParagraph: "This interactive preview applies your extracted palette across backgrounds, headings, buttons, cards, and subtle accents.",
    mockupPrimaryBtn: "Get Started",
    mockupSecondaryBtn: "Learn More",
    mockupCardTitle: "Active Color Harmony",
    mockupCardDesc: "Balanced light, dark, and vibrant accents derived directly from your image.",
    mockupMetricLabel: "Color Harmony Score",
    mockupMetricValue: "98.4%",
    mockupTag: "Palette Verified",
    
    // Export Modal
    exportModalTitle: "Export Color Palette",
    tabPng: "PNG Palette",
    tabCss: "CSS Variables",
    tabJson: "JSON",
    tabTailwind: "Tailwind CSS",
    tabTxt: "Plain Text",
    tabSvg: "SVG Vector",
    btnCopyCode: "Copy Code",
    btnDownloadFile: "Download File",
    closeModal: "Close",
    
    // How It Works
    howItWorksTitle: "How It Works",
    howItWorksSubtitle: "Simple, fast, and completely client-side in three easy steps.",
    step1Num: "01",
    step1Title: "Upload",
    step1Desc: "Upload your image via drag-and-drop or file picker. Supports JPG, JPEG, PNG, and WEBP.",
    step2Num: "02",
    step2Title: "Analyze",
    step2Desc: "ColorExtract analyzes pixels and identifies meaningful colors using intelligent color quantization.",
    step3Num: "03",
    step3Title: "Get Your Palette",
    step3Desc: "Copy, download, or export your color palette in HEX, RGB, HSL, CSS, PNG, or JSON formats.",
    
    // About & Privacy
    aboutTitle: "About ColorExtract",
    aboutDesc: "ColorExtract is a modern image color extraction tool built for designers, content creators, developers, and digital artists. It runs advanced color clustering algorithms entirely inside your browser, giving you instant, beautiful palettes with zero server latency.",
    privacyTitle: "Your Privacy Comes First",
    privacyDesc: "Your photos and graphics are processed locally on your device. ColorExtract does not upload, transmit, or store your images on any remote server. Your creativity stays yours.",
    
    // Empty State
    emptyStateTitle: "Upload an image to discover its colors.",
    emptyStateDesc: "Drop any photo, illustration, or UI screenshot above to automatically generate a rich color palette.",
    
    // Errors & Alerts
    errInvalidFormat: "Unsupported image format. Please upload a JPG, JPEG, PNG, or WEBP image.",
    errTooLarge: "Image file is too large. Please upload an image under 25MB.",
    errCorrupt: "Could not read this image file. It may be corrupted or unsupported.",
    errExtraction: "An error occurred during color extraction. Please try another image.",
    
    // Footer
    footerTagline: "ColorExtract — Extract colors. Create better designs.",
    footerPrivacy: "Privacy",
    footerAbout: "About",
    footerHowItWorks: "How It Works",
    footerContact: "Contact",
    footerRights: "All rights reserved."
  },

  ar: {
    // Brand
    brandName: "ColorExtract",
    brandTagline: "استخرج الألوان وصمّم بشكل أفضل.",
    
    // Navigation
    navHome: "الرئيسية",
    navHowItWorks: "كيف يعمل؟",
    navPreview: "معاينة الواجهة",
    navAbout: "حول الموقع",
    langName: "English",
    themeDark: "الوضع الليلي",
    themeLight: "الوضع النهاري",
    
    // Hero
    heroBadge: "100% داخل المتصفح وبخصوصية تامة",
    heroTitle: "استخرج الألوان من أي صورة 🎨",
    heroSubtitle: "ارفع أي صورة واكتشف أهم الألوان الموجودة فيها مع أكواد HEX وRGB وHSL جاهزة للاستخدام.",
    btnUpload: "رفع صورة",
    dropzoneTitle: "اسحب وأفلت صورتك هنا، أو تصفح الملفات",
    dropzoneSubtitle: "يدعم صيغ JPG و JPEG و PNG و WEBP (بحد أقصى 25 ميجابايت)",
    dropzoneOr: "أو",
    privacyNotice: "تتم معالجة صورتك محليًا داخل المتصفح كلما أمكن ذلك.",
    sampleImagesTitle: "أو جرب مباشرة بأحد النماذج الجاهزة:",
    sampleSunset: "ساحل الغروب",
    sampleCyberpunk: "مدينة سايبربانك",
    sampleNature: "نباتات الغابة",
    sampleMinimal: "طين التيراكوتا",
    
    // Image Preview & Controls
    previewTitle: "الصورة المرفوعة",
    fileName: "اسم الملف",
    dimensions: "الأبعاد",
    fileSize: "الحجم",
    btnReplace: "استبدال الصورة",
    btnRemove: "حذف",
    optionsTitle: "عدد الألوان المطلوب استخراجها",
    colorCount3: "3 ألوان",
    colorCount5: "5 ألوان",
    colorCount8: "8 ألوان",
    colorCount10: "10 ألوان",
    colorCount20: "20 لون",
    colorCountAll: "كل الألوان",
    allColorsBadge: "اكتشاف ديناميكي",
    allColorsNote: "كل الألوان — اكتشف جميع الألوان المميزة في الصورة مع إزالة الدرجات المتشابهة جدًا تلقائيًا.",
    btnExtract: "استخراج الألوان",
    btnExtracting: "جاري تحليل الصورة...",
    
    // Palette Section
    paletteTitle: "لوحة الألوان المستخرجة",
    paletteSubtitle: "انقر على أي بطاقة لون لنسخ كود HEX مباشرة.",
    colorsFound: "لون تم اكتشافه",
    sortLabel: "ترتيب حسب:",
    sortDominant: "الأكثر ظهورًا",
    sortBrightness: "السطوع",
    sortHue: "درجة اللون",
    sortSaturation: "التشبع",
    cardUsage: "النسبة",
    clickToCopy: "انقر لنسخ كود HEX",
    copied: "تم النسخ!",
    copyHex: "نسخ HEX",
    copyRgb: "نسخ RGB",
    copyHsl: "نسخ HSL",
    btnDownloadPalette: "تحميل لوحة الألوان",
    btnExportOptions: "خيارات التصدير",
    
    // Gradient Section
    gradientTitle: "تدرج الألوان",
    gradientSubtitle: "تدرج لوني تم توليده تلقائيًا من ألوان صورتك المستخرجة.",
    gradientLinear: "خطي",
    gradientRadial: "دائري",
    gradientConic: "مخروطي",
    gradientAngle: "الزاوية",
    btnCopyCss: "نسخ CSS",
    gradientCopied: "تم نسخ CSS!",
    
    // Color Preview (UI Mockup)
    previewSectionTitle: "معاينة الألوان",
    previewSectionSubtitle: "شاهد كيف تبدو لوحة الألوان المستخرجة داخل واجهة مستخدم حقيقية.",
    shuffleColors: "تبديل توزيع الألوان",
    mockupBadge: "نظام التصميم",
    mockupHeading: "ابنِ منتجات بتصاميم استثنائية",
    mockupParagraph: "تطبق هذه المعاينة التفاعلية لوحة الألوان المستخرجة عبر الخلفيات والعناوين والأزرار والبطاقات والتفاصيل الدقيقة.",
    mockupPrimaryBtn: "ابدأ الآن",
    mockupSecondaryBtn: "اكتشف المزيد",
    mockupCardTitle: "تناسق الألوان المستخرجة",
    mockupCardDesc: "ألوان فاتحة وداكنة ولمسات حيوية متناسقة تم استخلاصها مباشرة من صورتك.",
    mockupMetricLabel: "نسبة تناسق الألوان",
    mockupMetricValue: "98.4%",
    mockupTag: "لوحة متناسقة",
    
    // Export Modal
    exportModalTitle: "تصدير لوحة الألوان",
    tabPng: "صورة PNG",
    tabCss: "متغيرات CSS",
    tabJson: "ملف JSON",
    tabTailwind: "تنسيق Tailwind",
    tabTxt: "نص عادي TXT",
    tabSvg: "فيكتور SVG",
    btnCopyCode: "نسخ الكود",
    btnDownloadFile: "تحميل الملف",
    closeModal: "إغلاق",
    
    // How It Works
    howItWorksTitle: "كيف يعمل؟",
    howItWorksSubtitle: "بسيط، فائق السرعة، ويعمل بالكامل داخل متصفحك في 3 خطوات سهلة.",
    step1Num: "01",
    step1Title: "ارفع الصورة",
    step1Desc: "ارفع صورتك عبر السحب والإفلات أو اختيار الملف. يدعم JPG و JPEG و PNG و WEBP.",
    step2Num: "02",
    step2Title: "حلل الصورة",
    step2Desc: "يقوم ColorExtract بتحليل بيكسلات الصورة واكتشاف الألوان المهمة باستخدام خوارزميات التجميع الذكية.",
    step3Num: "03",
    step3Title: "احصل على لوحة الألوان",
    step3Desc: "انسخ أو حمّل أو صدّر لوحة الألوان الخاصة بك بصيغ متعددة مثل HEX و RGB و HSL و CSS و PNG و JSON.",
    
    // About & Privacy
    aboutTitle: "حول ColorExtract",
    aboutDesc: "ColorExtract أداة حديثة ومصممة خصيصًا للمصممين والمطورين وصناع المحتوى والفنانين الرقميين. تعمل بخوارزميات متقدمة لتجميع الألوان مباشرة داخل متصفحك، مما يمنحك لوحات ألوان دقيقة وفورية دون أي تأخير من السيرفر.",
    privacyTitle: "خصوصيتك تأتي دائمًا أولاً",
    privacyDesc: "تتم معالجة صورك وتصميماتك محليًا على جهازك بالكامل. لا يقوم ColorExtract برفع أو إرسال أو تخزين صورك على أي سيرفر خارجي. إبداعك يبقى دائمًا ملكك.",
    
    // Empty State
    emptyStateTitle: "ارفع صورة لاكتشاف ألوانها.",
    emptyStateDesc: "اسحب وأفلت أي صورة أو رسم أو لقطة شاشة بالأعلى لتوليد لوحة ألوان مخصصة واحترافية.",
    
    // Errors & Alerts
    errInvalidFormat: "صيغة الصورة غير مدعومة. يرجى رفع صورة بصيغة JPG أو JPEG أو PNG أو WEBP.",
    errTooLarge: "حجم الصورة كبير جدًا. يرجى اختيار صورة يقل حجمها عن 25 ميجابايت.",
    errCorrupt: "تعذر قراءة ملف الصورة. قد يكون الملف تالفًا أو غير مدعوم.",
    errExtraction: "حدث خطأ أثناء استخراج الألوان. يرجى تجربة صورة أخرى.",
    
    // Footer
    footerTagline: "ColorExtract — استخرج الألوان وصمّم بشكل أفضل.",
    footerPrivacy: "الخصوصية",
    footerAbout: "حول الموقع",
    footerHowItWorks: "كيف يعمل؟",
    footerContact: "تواصل معنا",
    footerRights: "جميع الحقوق محفوظة."
  }
};

class I18nManager {
  constructor() {
    // Load persisted language or default to browser language or 'en'
    const saved = localStorage.getItem('colorextract_lang');
    if (saved && (saved === 'en' || saved === 'ar')) {
      this.currentLang = saved;
    } else {
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      this.currentLang = browserLang.startsWith('ar') ? 'ar' : 'en';
    }
    this.listeners = [];
  }

  getLang() {
    return this.currentLang;
  }

  isRtl() {
    return this.currentLang === 'ar';
  }

  setLang(lang) {
    if (lang !== 'en' && lang !== 'ar') return;
    this.currentLang = lang;
    localStorage.setItem('colorextract_lang', lang);
    this.applyToDOM();
    this.notifyListeners();
  }

  toggleLang() {
    this.setLang(this.currentLang === 'en' ? 'ar' : 'en');
  }

  t(key) {
    return (translations[this.currentLang] && translations[this.currentLang][key]) || 
           (translations['en'] && translations['en'][key]) || 
           key;
  }

  onLanguageChange(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => {
      try { cb(this.currentLang); } catch (e) { console.error(e); }
    });
  }

  applyToDOM() {
    const html = document.documentElement;
    const isAr = this.currentLang === 'ar';
    
    html.lang = this.currentLang;
    html.dir = isAr ? 'rtl' : 'ltr';
    if (isAr) {
      document.body.classList.add('rtl-layout');
    } else {
      document.body.classList.remove('rtl-layout');
    }

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translation = this.t(key);
      if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
        el.value = translation;
      } else {
        el.textContent = translation;
      }
    });

    // Update all elements with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = this.t(key);
    });

    // Update all elements with data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = this.t(key);
    });

    // Update document title
    document.title = `${this.t('brandName')} — ${this.t('heroTitle')}`;
  }
}

// Global instance
window.i18n = new I18nManager();

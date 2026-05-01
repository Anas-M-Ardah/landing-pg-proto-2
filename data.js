// Shared data layer — persists everything in localStorage so the public site
// and admin panel share state. CRUD happens entirely in the browser.

const STORAGE_KEY = 'medequip_db_v2';

const SEED = {
  company: {
    name_en: 'MediCore Solutions',
    name_ar: 'حلول ميديكور',
    tagline_en: 'Trusted medical equipment, delivered with care.',
    tagline_ar: 'معدات طبية موثوقة، تُقدَّم بعناية.',
    about_en: 'MediCore Solutions has been supplying hospitals, clinics, and laboratories across the region for over 15 years. We partner with leading global manufacturers to deliver certified medical equipment, complete with installation, training, and lifetime support.',
    about_ar: 'تقوم حلول ميديكور بتزويد المستشفيات والعيادات والمختبرات في المنطقة لأكثر من 15 عامًا. نتشارك مع أبرز المصنّعين العالميين لتوريد معدات طبية معتمدة، مع التركيب والتدريب والدعم مدى الحياة.',
    phone: '+962 6 555 1234',
    email: 'info@medicore.example',
    address_en: '23 King Hussein Street, Amman, Jordan',
    address_ar: 'شارع الملك حسين 23، عمّان، الأردن',
    hours_en: 'Sun – Thu · 8:30 AM – 6:00 PM',
    hours_ar: 'الأحد – الخميس · 8:30 ص – 6:00 م',
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    instagram: 'https://instagram.com/',
  },
  homepage: {
    hero_title_en: 'Equipping the next generation of healthcare.',
    hero_title_ar: 'نُجهّز الجيل القادم من الرعاية الصحية.',
    hero_sub_en: 'Certified medical equipment, expert installation, lifetime support — for hospitals and clinics across the region.',
    hero_sub_ar: 'معدات طبية معتمدة، تركيب احترافي، ودعم مدى الحياة — للمستشفيات والعيادات في المنطقة.',
    hero_cta_en: 'Browse Equipment',
    hero_cta_ar: 'تصفّح المعدات',
    stats: [
      { v: '15+', l_en: 'Years in business', l_ar: 'سنة من الخبرة' },
      { v: '300+', l_en: 'Hospitals served', l_ar: 'مستشفى نخدمها' },
      { v: '40+', l_en: 'Brand partners', l_ar: 'شريك تجاري' },
      { v: '24/7', l_en: 'Technical support', l_ar: 'دعم فني' },
    ],
  },
  categories: [
    { id: 'cat-1', slug: 'diagnostic',  name_en: 'Diagnostic Equipment',  name_ar: 'معدات التشخيص',     icon: 'stethoscope' },
    { id: 'cat-2', slug: 'monitoring',  name_en: 'Patient Monitoring',     name_ar: 'مراقبة المرضى',     icon: 'activity' },
    { id: 'cat-3', slug: 'surgical',    name_en: 'Surgical Instruments',   name_ar: 'الأدوات الجراحية',   icon: 'scissors' },
    { id: 'cat-4', slug: 'imaging',     name_en: 'Imaging Systems',        name_ar: 'أنظمة التصوير',     icon: 'scan' },
    { id: 'cat-5', slug: 'laboratory',  name_en: 'Laboratory Equipment',   name_ar: 'معدات المختبرات',   icon: 'beaker' },
    { id: 'cat-6', slug: 'mobility',    name_en: 'Mobility & Care',        name_ar: 'الحركة والرعاية',   icon: 'wheelchair' },
  ],
  products: [
    {
      id: 'p-1', categoryId: 'cat-1', sku: 'DSC-300',
      name_en: 'Digital Stethoscope DSC-300',
      name_ar: 'سماعة طبية رقمية DSC-300',
      desc_en: 'Bluetooth-enabled electronic stethoscope with active noise cancellation, 24-hour battery life, and PC waveform recording.',
      desc_ar: 'سماعة طبية إلكترونية مع البلوتوث، تقنية إلغاء الضوضاء، بطارية 24 ساعة، وتسجيل الموجات على الحاسوب.',
      image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=900&q=80',
      featured: true,
      brand: 'CardioTech',
      specs_en: ['Bluetooth 5.2', '24h battery', 'Active noise cancel', 'Waveform recording', '2-year warranty'],
      specs_ar: ['بلوتوث 5.2', 'بطارية 24 ساعة', 'إلغاء الضوضاء', 'تسجيل الموجات', 'ضمان سنتين'],
    },
    {
      id: 'p-2', categoryId: 'cat-2', sku: 'PM-X8',
      name_en: 'Multi-Parameter Patient Monitor X8',
      name_ar: 'جهاز مراقبة المرضى متعدد المعايير X8',
      desc_en: '12-inch touchscreen monitor for ICU and operating rooms. Tracks ECG, SpO2, NIBP, temperature, and respiration in real time.',
      desc_ar: 'جهاز مراقبة بشاشة لمسية 12 بوصة لغرف العناية المركزة وغرف العمليات. يتتبع تخطيط القلب والأكسجة والضغط ودرجة الحرارة والتنفس.',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=900&q=80',
      featured: true,
      brand: 'VitalGuard',
      specs_en: ['12" touchscreen', '5-lead ECG', 'SpO2 + NIBP', 'Battery 6h', 'Network sync'],
      specs_ar: ['شاشة لمس 12"', 'تخطيط قلب 5 أطراف', 'أكسجة + ضغط', 'بطارية 6 ساعات', 'مزامنة شبكية'],
    },
    {
      id: 'p-3', categoryId: 'cat-2', sku: 'PO-FT1',
      name_en: 'Fingertip Pulse Oximeter FT-1',
      name_ar: 'مقياس النبض على الإصبع FT-1',
      desc_en: 'Compact OLED fingertip pulse oximeter. Reads SpO2 and pulse rate in under 8 seconds. Ideal for clinics and home care.',
      desc_ar: 'جهاز مدمج بشاشة OLED لقياس الأكسجة والنبض في أقل من 8 ثوانٍ. مثالي للعيادات والرعاية المنزلية.',
      image: 'https://images.unsplash.com/photo-1626078299034-94f5919b2c92?auto=format&fit=crop&w=900&q=80',
      featured: false,
      brand: 'OxyMed',
      specs_en: ['OLED display', 'SpO2 70-100%', 'Pulse 25-250 bpm', '2x AAA battery', 'CE certified'],
      specs_ar: ['شاشة OLED', 'أكسجة 70-100%', 'نبض 25-250', 'بطارية AAA', 'شهادة CE'],
    },
    {
      id: 'p-4', categoryId: 'cat-1', sku: 'BPM-A2',
      name_en: 'Automatic Blood Pressure Monitor A2',
      name_ar: 'جهاز قياس ضغط الدم الأوتوماتيكي A2',
      desc_en: 'Clinical-grade arm-cuff monitor with irregular heartbeat detection and 100-reading memory.',
      desc_ar: 'جهاز قياس ضغط بمستوى المستشفيات مع كشف عدم انتظام النبض وذاكرة 100 قراءة.',
      image: 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=900&q=80',
      featured: true,
      brand: 'CardioTech',
      specs_en: ['Arm cuff 22-42cm', '100 readings memory', 'IHB detection', 'Mains + battery', 'WHO indicator'],
      specs_ar: ['كفة 22-42 سم', 'ذاكرة 100 قراءة', 'كشف عدم انتظام', 'كهرباء + بطارية', 'مؤشر WHO'],
    },
    {
      id: 'p-5', categoryId: 'cat-4', sku: 'US-LX9',
      name_en: 'Portable Ultrasound Scanner LX9',
      name_ar: 'جهاز التصوير بالموجات فوق الصوتية المحمول LX9',
      desc_en: 'Cart-based 4D ultrasound system with full DICOM connectivity. Suitable for OB/GYN, cardiology, and abdominal imaging.',
      desc_ar: 'نظام موجات صوتية رباعي الأبعاد مع توصيل DICOM كامل. مناسب لطب النساء والقلب وتصوير البطن.',
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=900&q=80',
      featured: true,
      brand: 'ImagePro',
      specs_en: ['4D imaging', 'DICOM 3.0', '21" 4K monitor', '4 probe ports', 'Cart-based'],
      specs_ar: ['تصوير رباعي', 'DICOM 3.0', 'شاشة 21" 4K', '4 منافذ مجسات', 'بعجلات'],
    },
    {
      id: 'p-6', categoryId: 'cat-3', sku: 'SL-OR2',
      name_en: 'LED Surgical Lamp OR-2',
      name_ar: 'مصباح جراحي LED OR-2',
      desc_en: 'Ceiling-mounted dual-head surgical lamp with shadowless 160,000 lux illumination and adjustable color temperature.',
      desc_ar: 'مصباح جراحي معلّق برأسين، إنارة بدون ظلال 160,000 لوكس، ودرجة حرارة لون قابلة للتعديل.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80',
      featured: false,
      brand: 'SurgiLite',
      specs_en: ['Dual head', '160,000 lux', '3500-5000K CCT', 'Camera mount', 'Sterile handle'],
      specs_ar: ['رأسان', '160 ألف لوكس', '3500-5000K', 'حامل كاميرا', 'مقبض معقّم'],
    },
    {
      id: 'p-7', categoryId: 'cat-5', sku: 'CFG-T16',
      name_en: 'Centrifuge T-16 Benchtop',
      name_ar: 'جهاز طرد مركزي T-16 للطاولة',
      desc_en: 'High-speed benchtop centrifuge for clinical and research labs. 16-tube rotor, max speed 16,000 RPM.',
      desc_ar: 'جهاز طرد مركزي عالي السرعة للمختبرات السريرية والبحثية. دوّار 16 أنبوبًا، سرعة قصوى 16,000 RPM.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=80',
      featured: false,
      brand: 'LabCore',
      specs_en: ['16,000 RPM max', '16-tube rotor', 'Auto-balance', 'Touch interface', 'Quiet operation'],
      specs_ar: ['16,000 RPM', 'دوّار 16 أنبوب', 'موازنة ذاتية', 'واجهة لمسية', 'تشغيل هادئ'],
    },
    {
      id: 'p-8', categoryId: 'cat-6', sku: 'WC-EZ',
      name_en: 'Foldable Wheelchair EZ-Lite',
      name_ar: 'كرسي متحرك قابل للطي EZ-Lite',
      desc_en: 'Lightweight aluminum-frame wheelchair with quick-release wheels. Folds in seconds for transport and storage.',
      desc_ar: 'كرسي متحرك بهيكل ألمنيوم خفيف، عجلات قابلة للفك السريع، يطوى في ثوانٍ للنقل والتخزين.',
      image: 'https://images.unsplash.com/photo-1559757175-7b21671636f0?auto=format&fit=crop&w=900&q=80',
      featured: true,
      brand: 'MobiCare',
      specs_en: ['Aluminum frame', '12 kg weight', 'Capacity 120 kg', 'Foldable', 'Padded seat'],
      specs_ar: ['هيكل ألمنيوم', 'وزن 12 كغ', 'حمولة 120 كغ', 'قابل للطي', 'مقعد مبطّن'],
    },
    {
      id: 'p-9', categoryId: 'cat-2', sku: 'AED-R5',
      name_en: 'Automated External Defibrillator R5',
      name_ar: 'جهاز إنعاش قلب آلي خارجي R5',
      desc_en: 'Public-access AED with voice prompts and auto-shock delivery. Two-button operation. Suitable for clinics, schools, and offices.',
      desc_ar: 'جهاز إنعاش آلي مع تعليمات صوتية وصدمة تلقائية. تشغيل بزرّين. مناسب للعيادات والمدارس والمكاتب.',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=900&q=80',
      featured: false,
      brand: 'CardioTech',
      specs_en: ['Voice prompts', 'Auto-shock', '5-yr battery', 'IP55 rated', 'CPR coach'],
      specs_ar: ['تعليمات صوتية', 'صدمة آلية', 'بطارية 5 سنوات', 'IP55', 'مدرّب إنعاش'],
    },
  ],
  services: [
    { id: 's-1', icon: 'truck',     title_en: 'Equipment Sales & Distribution',  title_ar: 'بيع وتوزيع المعدات',
      desc_en: 'Authorized distribution of certified medical equipment from leading global brands.',
      desc_ar: 'توزيع رسمي لمعدات طبية معتمدة من أبرز العلامات التجارية العالمية.' },
    { id: 's-2', icon: 'wrench',    title_en: 'Installation & Commissioning',    title_ar: 'التركيب والتشغيل',
      desc_en: 'Turnkey installation by certified engineers — from site survey to live commissioning.',
      desc_ar: 'تركيب متكامل بواسطة مهندسين معتمدين — من المعاينة حتى التشغيل الفعلي.' },
    { id: 's-3', icon: 'shield',    title_en: 'Maintenance & Calibration',       title_ar: 'الصيانة والمعايرة',
      desc_en: 'Preventive maintenance contracts with traceable calibration certificates and SLA-backed response times.',
      desc_ar: 'عقود صيانة وقائية مع شهادات معايرة موثّقة وأوقات استجابة مضمونة.' },
    { id: 's-4', icon: 'graduation', title_en: 'Training & Certification',       title_ar: 'التدريب والاعتماد',
      desc_en: 'On-site training programs for biomedical engineers, technicians, and clinical staff.',
      desc_ar: 'برامج تدريبية في الموقع لمهندسي المعدات الطبية والفنيين والكوادر السريرية.' },
    { id: 's-5', icon: 'phone',     title_en: '24/7 Technical Support',          title_ar: 'دعم فني 24/7',
      desc_en: 'Round-the-clock helpline with remote diagnostics and on-call field engineers.',
      desc_ar: 'خط دعم فني متواصل مع تشخيص عن بُعد ومهندسين ميدانيين عند الطلب.' },
    { id: 's-6', icon: 'compass',   title_en: 'Consultation & Planning',         title_ar: 'الاستشارات والتخطيط',
      desc_en: 'Pre-procurement consulting — equipment selection, room planning, and capacity sizing.',
      desc_ar: 'استشارات ما قبل الشراء — اختيار المعدات وتخطيط الغرف وتقدير السعة.' },
  ],
  clients: [
    { id: 'c-1', name_en: 'Capital Medical Center',     name_ar: 'مركز العاصمة الطبي',          logo: '' },
    { id: 'c-2', name_en: 'Royal Care Hospital',         name_ar: 'مستشفى الرعاية الملكية',     logo: '' },
    { id: 'c-3', name_en: 'Al-Shifa Medical Group',     name_ar: 'مجموعة الشفاء الطبية',        logo: '' },
    { id: 'c-4', name_en: 'Premier Health Network',     name_ar: 'شبكة بريمير الصحية',          logo: '' },
    { id: 'c-5', name_en: 'MediPlus Diagnostics',       name_ar: 'ميديبلاس للتشخيص',            logo: '' },
    { id: 'c-6', name_en: 'Northern Regional Hospital', name_ar: 'مستشفى الشمال الإقليمي',     logo: '' },
    { id: 'c-7', name_en: 'Health Plus Centers',        name_ar: 'مراكز هيلث بلاس',             logo: '' },
    { id: 'c-8', name_en: 'CityCare Clinics',           name_ar: 'عيادات سيتي كير',             logo: '' },
  ],
  users: [
    { id: 'u-1', name: 'Admin User',   email: 'admin@medicore.example',   role: 'Admin',  active: true,
      created: '2026-01-15' },
    { id: 'u-2', name: 'Editor User',  email: 'editor@medicore.example',  role: 'Editor', active: true,
      created: '2026-02-03' },
    { id: 'u-3', name: 'Viewer User',  email: 'viewer@medicore.example',  role: 'Viewer', active: false,
      created: '2026-03-22' },
  ],
  messages: [],
};

const DB = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.save(SEED);
        return JSON.parse(JSON.stringify(SEED));
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error('DB.load failed', e);
      return JSON.parse(JSON.stringify(SEED));
    }
  },
  save(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY);
    return this.load();
  },
  uid(prefix='id') {
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  },
};

const I18N = {
  current: localStorage.getItem('medequip_lang') || 'en',
  set(lang) {
    this.current = lang;
    localStorage.setItem('medequip_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  },
  t(key) {
    const map = (this.current === 'ar') ? STRINGS_AR : STRINGS_EN;
    return map[key] || key;
  },
};

const STRINGS_EN = {
  // Nav
  home: 'Home', about: 'About Us', services: 'Services', products: 'Products',
  clients: 'Our Clients', contact: 'Contact', admin: 'Admin', login: 'Login',
  // Buttons / actions
  browse: 'Browse Equipment', request_quote: 'Request a Quote', learn_more: 'Learn More',
  view_all: 'View all', view_details: 'View details', back: 'Back', send: 'Send Message',
  // Sections
  featured_products: 'Featured Equipment',
  our_services: 'What We Do',
  why_us: 'Why MediCore',
  trusted_by: 'Trusted by leading institutions',
  cta_banner: 'Looking for a specific piece of equipment?',
  cta_sub: 'Our specialists will help you choose the right model and prepare a tailored quote within 24 hours.',
  // Forms
  full_name: 'Full Name', email: 'Email', phone: 'Phone',
  subject: 'Subject', message: 'Message', search: 'Search products…',
  filter_all: 'All categories',
  // Product detail
  specifications: 'Specifications', brand: 'Brand', sku: 'SKU', category: 'Category',
  related: 'Related products', no_products: 'No products match your search.',
  // Contact
  visit_us: 'Visit Us', call_us: 'Call Us', email_us: 'Email Us', working_hours: 'Working Hours',
  contact_intro: 'Talk to a specialist. Quote in 24 hours.',
  // Footer
  quick_links: 'Quick Links', get_in_touch: 'Get in Touch',
  rights: 'All rights reserved.',
  // Toasts
  msg_sent: 'Thank you — we will contact you within one business day.',
  // Admin
  dashboard: 'Dashboard', total_products: 'Products', total_categories: 'Categories',
  total_services: 'Services', total_clients: 'Clients', total_messages: 'Messages',
  add_new: 'Add new', edit: 'Edit', delete: 'Delete', save: 'Save', cancel: 'Cancel',
  confirm_delete: 'Delete this item? This cannot be undone.',
  saved: 'Saved.', deleted: 'Deleted.',
  back_to_site: 'Back to site',
  manage_products: 'Manage Products', manage_categories: 'Manage Categories',
  manage_services: 'Manage Services', manage_clients: 'Manage Clients',
  manage_users: 'Manage Users', manage_homepage: 'Homepage Content',
  manage_company: 'Company Info', view_messages: 'Messages',
  reset_data: 'Reset to seed data',
};

const STRINGS_AR = {
  home: 'الرئيسية', about: 'من نحن', services: 'الخدمات', products: 'المنتجات',
  clients: 'عملاؤنا', contact: 'اتصل بنا', admin: 'الإدارة', login: 'دخول',
  browse: 'تصفّح المعدات', request_quote: 'طلب عرض سعر', learn_more: 'المزيد',
  view_all: 'عرض الكل', view_details: 'عرض التفاصيل', back: 'رجوع', send: 'إرسال الرسالة',
  featured_products: 'المعدات المميزة',
  our_services: 'ماذا نقدم',
  why_us: 'لماذا ميديكور',
  trusted_by: 'موثوقة من أبرز المؤسسات',
  cta_banner: 'تبحث عن معدّة طبية محدّدة؟',
  cta_sub: 'سيساعدك مختصونا في اختيار الموديل المناسب وإعداد عرض سعر خلال 24 ساعة.',
  full_name: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'الهاتف',
  subject: 'الموضوع', message: 'الرسالة', search: 'ابحث عن المنتجات…',
  filter_all: 'جميع الفئات',
  specifications: 'المواصفات', brand: 'العلامة التجارية', sku: 'الرمز', category: 'الفئة',
  related: 'منتجات ذات صلة', no_products: 'لا توجد منتجات مطابقة.',
  visit_us: 'زورونا', call_us: 'اتصل بنا', email_us: 'راسلنا', working_hours: 'ساعات العمل',
  contact_intro: 'تحدّث مع مختص. عرض سعر خلال 24 ساعة.',
  quick_links: 'روابط سريعة', get_in_touch: 'تواصل معنا',
  rights: 'جميع الحقوق محفوظة.',
  msg_sent: 'شكرًا لك — سنتواصل معك خلال يوم عمل واحد.',
  dashboard: 'لوحة التحكم', total_products: 'المنتجات', total_categories: 'الفئات',
  total_services: 'الخدمات', total_clients: 'العملاء', total_messages: 'الرسائل',
  add_new: 'إضافة جديد', edit: 'تعديل', delete: 'حذف', save: 'حفظ', cancel: 'إلغاء',
  confirm_delete: 'حذف هذا العنصر؟ لا يمكن التراجع.',
  saved: 'تم الحفظ.', deleted: 'تم الحذف.',
  back_to_site: 'العودة للموقع',
  manage_products: 'إدارة المنتجات', manage_categories: 'إدارة الفئات',
  manage_services: 'إدارة الخدمات', manage_clients: 'إدارة العملاء',
  manage_users: 'إدارة المستخدمين', manage_homepage: 'محتوى الصفحة الرئيسية',
  manage_company: 'معلومات الشركة', view_messages: 'الرسائل',
  reset_data: 'إعادة ضبط البيانات',
};

window.DB = DB;
window.I18N = I18N;

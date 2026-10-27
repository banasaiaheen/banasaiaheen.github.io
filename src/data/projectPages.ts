import type { Language } from "../types/language";
import signIn from "../assets/medconnect/sign-in.png";
import patientDashboard from "../assets/medconnect/patient-dashboard.png";
import doctorDashboard from "../assets/medconnect/doctor-dashboard.png";
import patientCalendar from "../assets/medconnect/patient-calendar.png";
import doctorPatients from "../assets/medconnect/doctor-patients.png";
import patientInbox from "../assets/medconnect/patient-inbox.png";

/**
 * ============================================================================
 *  PROJECT (CHILD) PAGES — the content of each project's own page
 *  (/projects/<slug>), keyed by the same `slug` you set on the card in
 *  src/data/projects.ts. It fills the Figma child-page template: a header and
 *  a stack of sections, each one a `text`, `list` or `gallery` layout.
 *
 *  To add a project page:
 *   1. Give its entry in src/data/projects.ts a `slug` (both languages).
 *   2. Add the same slug below, for both languages, and list its `sections`
 *      in the order they should appear.
 *  Removing a slug here is safe: its card just isn't linked, and the URL shows
 *  the 404 page.
 *
 *  Section kinds:
 *   - text     a title and paragraphs (Overview, Outcome, ...)
 *   - list     a title and numbered items (What I Did, ...)
 *   - gallery  a title and screens with captions (add `src` to show an image)
 * ============================================================================
 */
export interface TextSection {
  kind: "text";
  title: string;
  paragraphs: string[];
}

export interface ListSection {
  kind: "list";
  title: string;
  items: { title: string; body: string }[];
}

export interface GallerySection {
  kind: "gallery";
  title: string;
  screens: { caption: string; src?: string }[];
}

export type ProjectSection = TextSection | ListSection | GallerySection;

export interface ProjectPageContent {
  title: string;
  /** Software and project type are shown above the title, e.g. "FIGMA · Personal". */
  software: string;
  type: string;
  description: string;
  /** Link to the public Figma file, shown next to the title. */
  figmaHref: string;
  sections: ProjectSection[];
}

export const PROJECT_PAGES: Record<Language, Record<string, ProjectPageContent>> = {
  english: {
    "portfolio-design": {
      title: "PORTFOLIO DESIGN",
      software: "FIGMA",
      type: "Personal",
      description:
        "A behind-the-scenes look at how this portfolio was designed from concept to final product. Red, black, and white — a portfolio built on the idea that a small palette is enough. Designed and prototyped entirely in Figma, then built with Claude Code.",
      figmaHref: "https://www.figma.com/community/file/1696876249789704241",
      sections: [
        {
          kind: "text",
          title: "Overview",
          paragraphs: [
            "The idea was to create something entirely my own, using my three favourite colours: red, black, and white. I wanted a clean, responsive site available in both English and my native language, Arabic, and I kept everything neat and simple on purpose. I've always believed you don't need an overwhelming variety of colours or a complex design for something to work.",
            "Everything was first designed and prototyped in Figma. Once the design was in place, I prototyped the entire experience navigation, interactions, both layouts to validate the user flow and make sure it felt polished before development ever started.",
          ],
        },
        {
          kind: "list",
          title: "What I Did",
          items: [
            {
              title: "Built on variables, not one-off screens",
              body: "My favourite part of Figma is variables, so I built the whole design system on them: a colours collection that every colour in the file is bound to, a numbers collection with reusable values that aren't limited to one scope, a typography collection that holds the English and Arabic font families and weights, a version collection that switches between desktop and responsive, a navigation collection that powers the nav prototype without building every state by hand, a form collection that drives the contact form, and a content collection with English and Arabic modes that holds every translated string.",
            },
            {
              title: "Prototyped before a line of code existed",
              body: "I prototyped the full experience in Figma before moving into development: the navigation, the inquiry dropdown, a contact form that flags empty required fields and confirms when a message is sent, and a 404 page, across both desktop and responsive layouts.",
            },
            {
              title: "One set of components, two languages",
              body: "Rather than building separate translated components, every component has a direction property: ltr for English and rtl for Arabic. Switching the content collection to Arabic changes the text, font, line height, and letter spacing on its own, and switching the direction mirrors the layout.",
            },
            {
              title: "Designed by me, built with Claude Code",
              body: "My original plan was to publish this with Framer, but I changed my mind and built it with Claude Code instead. I learned some coding basics at university, so I wasn't starting from zero.",
            },
          ],
        },
        {
          kind: "text",
          title: "Outcome",
          paragraphs: [
            "I'm happy with how it turned out. I made it simply because I wanted a portfolio of my own, and that's exactly what it is.",
            "Three colours, two languages, one portfolio.",
          ],
        },
      ],
    },
    medconnect: {
      title: "MEDCONNECT",
      software: "FIGMA",
      type: "Case Study",
      description:
        "A unified platform for doctors and patients: appointments, records, and communication. One of the first case studies I created at the start of my UX/UI journey.",
      figmaHref: "https://www.figma.com/community/file/1691801641903978805/medconnect-case-study",
      sections: [
        {
          kind: "text",
          title: "Overview",
          paragraphs: [
            "A medical application creates a connection between patients and doctors. The patient can take appointments, access their medical information and history, send a message to a doctor, and get reminded of their appointments.",
            "On the other hand, doctors have a list of patients who visit the clinic, a schedule of appointments, and the ability to upload documents and send messages to patients.",
            "This was a 3-week, end-to-end UX project, from research to handoff.",
          ],
        },
        {
          kind: "list",
          title: "What I Did",
          items: [
            {
              title: "Defined the problem and the goal",
              body: "Despite wanting to monitor their health, people don't have time and are scared to visit their doctors. The goal was to improve communication between patients and medical providers, save both parties time and money, and reduce medical errors by enhancing the gathering of health data.",
            },
            {
              title: "Researched the pain points",
              body: "Making an appointment takes time and money from both patients and providers, securing stored data is costly while patients misplace essential records and prescriptions, and in emergencies medical records are hard to access, which leads to medical mistakes.",
            },
            {
              title: "Got to know the users",
              body: "I turned the research into personas, a user story, a user journey and a survey, and listed my assumptions about what the app needed: tracking, scheduling, reminders, a personal account, chat, data storage, ratings and reviews, and geolocation.",
            },
            {
              title: "Structured the experience",
              body: "I mapped the flow with a flowchart, an information architecture and a site map, sketched paper wireframes, and then designed the doctor and patient screens in Figma.",
            },
          ],
        },
        {
          kind: "gallery",
          title: "Selected Screens",
          screens: [
            { caption: "Sign in", src: signIn },
            { caption: "Patient dashboard", src: patientDashboard },
            { caption: "Doctor dashboard", src: doctorDashboard },
            { caption: "Patient calendar", src: patientCalendar },
            { caption: "Doctor's patients", src: doctorPatients },
            { caption: "Patient inbox", src: patientInbox },
          ],
        },
        {
          kind: "text",
          title: "Outcome",
          paragraphs: [
            "MedConnect is one of the first case studies I created in the early days of my UX/UI journey.",
            "It shows where I started: a full process, from research to finished screens, that I've kept building on since.",
          ],
        },
      ],
    },
  },
  arabic: {
    "portfolio-design": {
      title: "تصميم ملف الأعمال",
      software: "FIGMA",
      type: "مشروع شخصي",
      description:
        "نظرة من وراء الكواليس على كيفية تصميم ملف الأعمال هذا من الفكرة إلى المنتج النهائي. الأحمر والأسود والأبيض — ملف أعمال مبني على فكرة أن لوحة ألوان صغيرة تكفي. صُمّم ونُفّذ نموذجه الأولي بالكامل في Figma، ثم بُني باستخدام Claude Code.",
      figmaHref: "https://www.figma.com/community/file/1696876249789704241",
      sections: [
        {
          kind: "text",
          title: "نظرة عامة",
          paragraphs: [
            "كانت الفكرة أن أصنع شيئًا خاصًا بي بالكامل، باستخدام ألواني الثلاثة المفضلة: الأحمر والأسود والأبيض. أردت موقعًا نظيفًا ومتجاوبًا متاحًا بالإنجليزية وبلغتي الأم العربية، وحرصت عمدًا على أن يبقى كل شيء مرتبًا وبسيطًا. لطالما آمنت بأنك لا تحتاج إلى كمٍّ هائل من الألوان أو تصميم معقّد لكي ينجح ما تصنعه.",
            "صُمّم كل شيء أولًا ونُفّذ نموذجه الأولي في Figma. وبعد اكتمال التصميم، بنيت نموذجًا أوليًا للتجربة كاملة — التنقل والتفاعلات وكلا التخطيطين — للتحقق من رحلة المستخدم والتأكد من أنها مصقولة قبل أن يبدأ التطوير.",
          ],
        },
        {
          kind: "list",
          title: "ما الذي قمت به",
          items: [
            {
              title: "مبني على المتغيرات، لا على شاشات منفردة",
              body: "أكثر ما أحبه في Figma هو المتغيرات، لذا بنيت نظام التصميم بالكامل عليها: مجموعة ألوان ترتبط بها كل الألوان في الملف، ومجموعة أرقام بقيم قابلة لإعادة الاستخدام غير مقيّدة بنطاق محدد، ومجموعة طباعة تحمل عائلات الخطوط الإنجليزية والعربية وأوزانها، ومجموعة إصدارات تبدّل بين سطح المكتب والشاشات المتجاوبة، ومجموعة تنقل شغّلت النموذج الأولي للقائمة دون بناء كل حالة يدويًا، ومجموعة نموذج تتحكم بنموذج التواصل، ومجموعة محتوى بوضعين إنجليزي وعربي تحمل كل نص مترجم.",
            },
            {
              title: "نموذج أولي قبل كتابة سطر برمجي واحد",
              body: "بنيت نموذجًا أوليًا للتجربة كاملة في Figma قبل الانتقال إلى التطوير: التنقل، والقائمة المنسدلة لنوع الاستفسار، ونموذج تواصل ينبّه إلى الحقول المطلوبة الفارغة ويؤكد إرسال الرسالة، وصفحة 404، على تخطيطَي سطح المكتب والشاشات المتجاوبة.",
            },
            {
              title: "مجموعة مكوّنات واحدة، بلغتين",
              body: "بدلًا من بناء مكوّنات مترجمة منفصلة، لكل مكوّن خاصية اتجاه: ltr للإنجليزية و rtl للعربية. يؤدي تبديل مجموعة المحتوى إلى العربية إلى تغيير النص والخط وارتفاع السطر وتباعد الأحرف تلقائيًا، ويؤدي تبديل الاتجاه إلى عكس التخطيط.",
            },
            {
              title: "من تصميمي، ومبني باستخدام Claude Code",
              body: "كانت خطتي الأصلية أن أنشره عبر Framer، لكنني غيّرت رأيي وبنيته باستخدام Claude Code بدلًا من ذلك. تعلّمت بعض أساسيات البرمجة في الجامعة، فلم أبدأ من الصفر.",
            },
          ],
        },
        {
          kind: "text",
          title: "النتيجة",
          paragraphs: [
            "أنا سعيدة بالنتيجة. صنعته ببساطة لأنني أردت ملف أعمال خاصًا بي، وهذا بالضبط ما هو عليه.",
            "ثلاثة ألوان، لغتان، وملف أعمال واحد.",
          ],
        },
      ],
    },
    medconnect: {
      title: "MEDCONNECT",
      software: "FIGMA",
      type: "دراسة حالة",
      description:
        "منصة موحّدة للأطباء والمرضى: المواعيد والسجلات والتواصل. إحدى أولى دراسات الحالة التي أنجزتها في بداية رحلتي في تصميم تجربة المستخدم وواجهته.",
      figmaHref: "https://www.figma.com/community/file/1691801641903978805/medconnect-case-study",
      sections: [
        {
          kind: "text",
          title: "نظرة عامة",
          paragraphs: [
            "يربط هذا التطبيق الطبي بين المرضى والأطباء. يستطيع المريض حجز المواعيد، والاطّلاع على معلوماته وتاريخه الطبي، وإرسال رسالة إلى الطبيب، كما يذكّره التطبيق بمواعيده.",
            "وفي المقابل، يملك الأطباء قائمة بالمرضى الذين يزورون العيادة، وجدولًا بالمواعيد، وإمكانية رفع المستندات وإرسال الرسائل إلى المرضى.",
            "كان هذا مشروعًا متكاملًا في تصميم تجربة المستخدم استغرق ثلاثة أسابيع، من البحث إلى التسليم.",
          ],
        },
        {
          kind: "list",
          title: "ما الذي قمت به",
          items: [
            {
              title: "تحديد المشكلة والهدف",
              body: "رغم رغبة الناس في متابعة صحتهم، لا يملكون الوقت ويخافون من زيارة أطبائهم. كان الهدف تحسين التواصل بين المرضى ومقدّمي الرعاية الصحية، وتوفير الوقت والمال على الطرفين، وتقليل الأخطاء الطبية بتحسين جمع البيانات الصحية.",
            },
            {
              title: "دراسة نقاط الألم",
              body: "يستغرق حجز الموعد وقتًا ومالًا من المرضى ومقدّمي الرعاية، ويكلّف تأمين البيانات المخزّنة مالًا بينما يضيّع المرضى سجلاتهم ووصفاتهم الطبية المهمة، وفي حالات الطوارئ يصعب الوصول إلى السجلات الطبية، ما يؤدي إلى أخطاء طبية.",
            },
            {
              title: "التعرّف على المستخدمين",
              body: "حوّلت البحث إلى شخصيات وقصة مستخدم ورحلة مستخدم واستبيان، ودوّنت افتراضاتي حول ما يحتاجه التطبيق: التتبّع، والجدولة، والتذكيرات، والحساب الشخصي، والمحادثة، وتخزين البيانات، والتقييمات والمراجعات، وتحديد الموقع الجغرافي.",
            },
            {
              title: "بناء هيكل التجربة",
              body: "رسمت مسار التجربة بمخطط تدفق وهيكلة معلومات وخريطة موقع، ثم رسمت نماذج ورقية، وبعدها صمّمت شاشات الطبيب والمريض في Figma.",
            },
          ],
        },
        {
          kind: "gallery",
          title: "شاشات مختارة",
          screens: [
            { caption: "تسجيل الدخول", src: signIn },
            { caption: "لوحة تحكم المريض", src: patientDashboard },
            { caption: "لوحة تحكم الطبيب", src: doctorDashboard },
            { caption: "تقويم المريض", src: patientCalendar },
            { caption: "مرضى الطبيب", src: doctorPatients },
            { caption: "صندوق وارد المريض", src: patientInbox },
          ],
        },
        {
          kind: "text",
          title: "النتيجة",
          paragraphs: [
            "MedConnect إحدى أولى دراسات الحالة التي أنجزتها في بدايات رحلتي في تصميم تجربة المستخدم وواجهته.",
            "تُظهر من أين بدأت: عملية متكاملة، من البحث إلى الشاشات النهائية، واصلت البناء عليها منذ ذلك الحين.",
          ],
        },
      ],
    },
  },
};

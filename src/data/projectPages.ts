import type { Language } from "../types/language";
import signIn from "../assets/medconnect/sign-in.webp";
import patientDashboard from "../assets/medconnect/patient-dashboard.webp";
import doctorDashboard from "../assets/medconnect/doctor-dashboard.webp";
import patientCalendar from "../assets/medconnect/patient-calendar.webp";
import doctorPatients from "../assets/medconnect/doctor-patients.webp";
import patientInbox from "../assets/medconnect/patient-inbox.webp";
import pdOverview from "../assets/portfolio-design/overview.webp";
import pdWhy from "../assets/portfolio-design/why-i-made-it.webp";
import pdSketches from "../assets/portfolio-design/sketches.webp";
import pdDesignSystem from "../assets/portfolio-design/design-system.webp";
import pdResponsive from "../assets/portfolio-design/responsive.webp";
import pdFigmaToCode from "../assets/portfolio-design/figma-to-code.webp";
import pdFormToInbox from "../assets/portfolio-design/form-to-inbox.webp";
import pdFinalThoughts from "../assets/portfolio-design/final-thoughts.webp";
import pdLaunchVideo from "../assets/portfolio-design/launch-video.mp4";
// Arabic (right-to-left) versions of the slides above, for the Arabic page.
import pdOverviewAr from "../assets/portfolio-design/overview-ar.webp";
import pdWhyAr from "../assets/portfolio-design/why-i-made-it-ar.webp";
import pdSketchesAr from "../assets/portfolio-design/sketches-ar.webp";
import pdDesignSystemAr from "../assets/portfolio-design/design-system-ar.webp";
import pdResponsiveAr from "../assets/portfolio-design/responsive-ar.webp";
import pdFigmaToCodeAr from "../assets/portfolio-design/figma-to-code-ar.webp";
import pdFormToInboxAr from "../assets/portfolio-design/form-to-inbox-ar.webp";
import pdFinalThoughtsAr from "../assets/portfolio-design/final-thoughts-ar.webp";

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
 *
 *  A text section, or a single item of a list section, can also carry a
 *  `figure` (a full-width 16:9 image with a caption) and a list item a `video`
 *  (same frame, with controls), shown under its text.
 * ============================================================================
 */
/** A full-width 16:9 picture or video shown under a section's text, with a caption. */
export interface Figure {
  src: string;
  caption: string;
}

export interface TextSection {
  kind: "text";
  title: string;
  paragraphs: string[];
  figure?: Figure;
}

export interface ListItem {
  title: string;
  body: string;
  figure?: Figure;
  video?: Figure;
}

export interface ListSection {
  kind: "list";
  title: string;
  items: ListItem[];
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
          figure: { src: pdOverview, caption: "The portfolio on desktop and mobile, in English and Arabic." },
        },
        {
          kind: "text",
          title: "Why I Made It",
          paragraphs: [
            "Honestly? I just wanted to. As a designer, I spend most of my time shaping other people's ideas, and I wanted one space that was completely mine: my rules, my brand, my pace.",
            "With no client and no deadline, I set my own goals: show process and decisions, not just final screens; work equally well in English and Arabic; look and feel like my personal brand; and grow easily as I add new projects.",
            "I was the client, the designer and the builder all at once, which made it the most fun project I've worked on, and the hardest one to call finished.",
          ],
          figure: { src: pdWhy, caption: "Client, designer and builder: all me." },
        },
        {
          kind: "text",
          title: "From Vision to Sketches",
          paragraphs: [
            "I didn't start with mood boards or research. I had the full vision of the portfolio in my head from day one, so I went straight to paper, sketched the layouts, and designed as I went.",
            "The direction came naturally from my personal brand: bold condensed headlines and a small, limited palette. Confident but not loud, with the work always in front.",
          ],
          figure: { src: pdSketches, caption: "Early sketches: the home page, a project page and the mobile layout in RTL." },
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
              body: "My original plan was to publish this with Framer, but I changed my mind and built it with Claude Code instead. I learned some coding basics at university, so I wasn't starting from zero. I built it with React, Vite and Tailwind CSS, in a loop of designing in Figma, building in code, reviewing in the browser and refining in Figma. My Figma variables became the site's colours, type and spacing, so the design and the build stayed in sync. AI helped me build faster, but every design and UX decision was mine.",
              figure: { src: pdFigmaToCode, caption: "Figma variables and the same values in the site's CSS." },
            },
            {
              title: "A design system, not just a UI kit",
              body: "People often build a set of components in Figma and call it a design system, but that's a UI kit. A design system is a complete system of foundations, components, rules and documentation that helps every team work consistently and efficiently. I built mine as a system: Barlow Condensed for English and Cairo for Arabic, a small palette with red as the single accent, reusable components, and variables behind all of it.",
              figure: { src: pdDesignSystem, caption: "The design system: colour, typography and components." },
            },
            {
              title: "One design, every screen, both directions",
              body: "The site was designed for desktop and responsive from the start, left-to-right for English and a clean right-to-left mirror for Arabic, so nothing was squeezed down or flipped at the end. Navigation order, text alignment, card layouts and directional icons flip; logos, images, video and brand marks stay. Arabic and Latin scripts sit differently on the line, so I tuned sizes and line heights for each language to keep the same visual weight and rhythm. On smaller screens the navigation collapses into a compact menu, and the language switch stays one tap away.",
              figure: { src: pdResponsive, caption: "Desktop in English, tablet and mobile in Arabic (RTL)." },
            },
          ],
        },
        {
          kind: "list",
          title: "Beyond the Screen",
          items: [
            {
              title: "From form to inbox",
              body: "The experience doesn't end when someone hits send. I designed the contact form and the email it delivers as one flow, in the same colours, type and tone, from the moment a visitor writes a message to the moment it lands in my inbox. Visitors will never see that email, but it still got the same care as the homepage.",
              figure: { src: pdFormToInbox, caption: "The contact form on the site, and the email it sends to my inbox." },
            },
            {
              title: "A launch video",
              body: "The concept reflects my current state: touching grass between pixels. A cube placed in nature represents the balance between the digital and physical worlds. When I pick it up, it turns from a 3D object into a flat 2D pixel, which opens up to reveal my portfolio, then zooms out to the full desktop site, switches to Arabic and moves through the responsive layouts. I created the animation in Figma and edited the video in Runway. On the site itself, motion stays subtle, with small transitions that guide attention without slowing anyone down.",
              video: { src: pdLaunchVideo, caption: "The launch video: a cube in nature becomes a pixel that opens into the portfolio." },
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
          figure: { src: pdFinalThoughts, caption: "Final thoughts: variables always, designed to be built, never finished." },
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
          figure: { src: pdOverviewAr, caption: "ملف الأعمال على سطح المكتب والجوال، بالإنجليزية والعربية." },
        },
        {
          kind: "text",
          title: "لماذا صنعته؟",
          paragraphs: [
            "بصراحة؟ أردت ذلك فحسب. بصفتي مصممة، أقضي معظم وقتي في تشكيل أفكار الآخرين، وأردت مساحة واحدة تخصّني بالكامل: قواعدي وهويتي وإيقاعي.",
            "وبلا عميل ولا موعد تسليم، وضعت أهدافي بنفسي: أن أُظهر العملية والقرارات لا الشاشات النهائية فقط، وأن يعمل الموقع بالمستوى نفسه بالإنجليزية والعربية، وأن يبدو ويُشعر كهويتي الشخصية، وأن يتّسع بسهولة كلما أضفت مشاريع جديدة.",
            "كنت العميلة والمصممة والمطوّرة في آنٍ واحد، فكان أمتع مشروع عملت عليه، وأصعبه في أن أعتبره منتهيًا.",
          ],
          figure: { src: pdWhyAr, caption: "العميلة والمصممة والمطوّرة: كلها أنا." },
        },
        {
          kind: "text",
          title: "من الرؤية إلى الرسومات",
          paragraphs: [
            "لم أبدأ بلوحات إلهام أو بحث. كانت الصورة الكاملة لملف الأعمال في رأسي منذ اليوم الأول، فانتقلت مباشرة إلى الورق ورسمت التخطيطات وصمّمت أثناء التقدّم.",
            "جاء الاتجاه بشكل طبيعي من هويتي الشخصية: عناوين عريضة ومكثّفة ولوحة ألوان صغيرة ومحدودة. واثق دون صخب، والأعمال دائمًا في المقدّمة.",
          ],
          figure: { src: pdSketchesAr, caption: "رسومات أولية: الصفحة الرئيسية وصفحة المشروع وتخطيط الجوال من اليمين إلى اليسار." },
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
              body: "كانت خطتي الأصلية أن أنشره عبر Framer، لكنني غيّرت رأيي وبنيته باستخدام Claude Code بدلًا من ذلك. تعلّمت بعض أساسيات البرمجة في الجامعة، فلم أبدأ من الصفر. بنيته باستخدام React وVite وTailwind CSS ضمن حلقة متكررة: أصمّم في Figma، وأبني بالكود، وأراجع في المتصفح، ثم أحسّن في Figma. تحوّلت متغيرات Figma إلى ألوان الموقع وخطوطه ومسافاته، فبقي التصميم والتنفيذ متطابقين دائمًا. ساعدني الذكاء الاصطناعي على البناء بشكل أسرع، لكن كل قرار تصميمي وكل قرار في تجربة المستخدم كان قراري.",
              figure: { src: pdFigmaToCodeAr, caption: "متغيرات Figma والقيم نفسها في CSS الموقع." },
            },
            {
              title: "نظام تصميم، لا مجرد مجموعة واجهات",
              body: "كثيرًا ما يبني المصممون مجموعة مكوّنات في Figma ويسمّونها نظام تصميم، لكنها في الحقيقة مجموعة واجهات (UI kit). أما نظام التصميم فهو منظومة متكاملة من الأسس والمكوّنات والقواعد والتوثيق تساعد كل فريق على العمل بتناسق وكفاءة. بنيت نظامي كنظام فعلي: خط Barlow Condensed للإنجليزية وخط Cairo للعربية، ولوحة ألوان صغيرة بالأحمر كلون تمييز وحيد، ومكوّنات قابلة لإعادة الاستخدام، ومتغيرات تقف خلف كل ذلك.",
              figure: { src: pdDesignSystemAr, caption: "نظام التصميم: الألوان والطباعة والمكوّنات." },
            },
            {
              title: "تصميم واحد، لكل الشاشات، وبالاتجاهين",
              body: "صُمّم الموقع لسطح المكتب والشاشات المتجاوبة منذ البداية، من اليسار إلى اليمين للإنجليزية وبانعكاس نظيف من اليمين إلى اليسار للعربية، فلم يُضغط شيء ولم يُقلب في النهاية. ينعكس ترتيب التنقل ومحاذاة النص وتخطيطات البطاقات والأيقونات والأسهم الاتجاهية، وتبقى الشعارات والصور والفيديو وعلامات الهوية كما هي. تتموضع الحروف العربية واللاتينية على السطر بشكل مختلف، لذا ضبطت الأحجام وارتفاعات الأسطر لكل لغة للحفاظ على الثقل البصري والإيقاع نفسهما. وفي الشاشات الأصغر تنطوي قائمة التنقل في قائمة مدمجة ويبقى مبدّل اللغة على بُعد نقرة واحدة.",
              figure: { src: pdResponsiveAr, caption: "سطح المكتب بالإنجليزية، والجهاز اللوحي والجوال بالعربية (من اليمين إلى اليسار)." },
            },
          ],
        },
        {
          kind: "list",
          title: "ما وراء الشاشة",
          items: [
            {
              title: "من النموذج إلى صندوق الوارد",
              body: "لا تنتهي التجربة عندما يضغط الزائر على إرسال. صمّمت نموذج التواصل والرسالة التي يرسلها كتدفّق واحد، بالألوان والخطوط والنبرة نفسها، من لحظة كتابة الزائر لرسالته إلى لحظة وصولها إلى بريدي. لن يرى الزوّار هذه الرسالة أبدًا، لكنها نالت العناية نفسها التي نالتها الصفحة الرئيسية.",
              figure: { src: pdFormToInboxAr, caption: "نموذج التواصل في الموقع، والرسالة التي تصل إلى بريدي." },
            },
            {
              title: "فيديو الإطلاق",
              body: "تعكس الفكرة حالتي الحالية: ألمس العشب بين البكسلات. وضعت مكعبًا في الطبيعة ليمثّل التوازن بين العالم الرقمي والمادي. وعندما ألتقطه يتحوّل من جسم ثلاثي الأبعاد إلى بكسل مسطّح ثنائي الأبعاد، ثم ينفتح ليكشف ملف أعمالي، فتبتعد الكاميرا لتُظهر الموقع كاملًا على سطح المكتب، ثم يتحوّل إلى العربية ويمرّ بالتخطيطات المتجاوبة. أنشأت الحركة في Figma وحرّرت الفيديو باستخدام Runway. أما في الموقع نفسه فتبقى الحركة هادئة، بانتقالات صغيرة توجّه الانتباه دون أن تبطّئ أحدًا.",
              video: { src: pdLaunchVideo, caption: "فيديو الإطلاق: مكعب في الطبيعة يتحوّل إلى بكسل ينفتح على ملف الأعمال." },
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
          figure: { src: pdFinalThoughtsAr, caption: "خواطر أخيرة: المتغيرات دائمًا، تصميم مهيّأ للبناء، ولا يكتمل أبدًا." },
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

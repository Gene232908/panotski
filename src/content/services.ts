// THE single ordered service source (Milestone 1 revision §14 Phase 1).
//
// What We Do (home grid), Detailed Services, and the Contact form's Service
// Interest dropdown all read from this file. There is deliberately no separate
// `homeName` or per-page order any more: plan §6.1 forbids What We Do and
// Detailed Services showing different labels or ordering, and one field cannot
// diverge from itself. See RULES.md § Content Fidelity.
//
// The order and the labels below are client-approved. Do not reorder or
// rename without a new client decision — the home grid, the detail page and
// the contact dropdown all read from this one array.
//
// `description` — TEMPORARY where `copyPending` is true. The owner supplies
//                 final descriptions later (plan §6.2); the structure is built
//                 so copy drops in without redesigning the section. Do not
//                 invent approved-sounding permanent marketing copy.
// `imageHint`   — what photo belongs here, shown in the placeholder until the
//                 client supplies approved imagery. Prefer the owner's real
//                 projects, team and training sessions over stock faces (§4.4).

export type ServiceBullet = {
  text: string;
  sub?: string[];
};

export type Service = {
  slug: string;
  anchor: string;
  name: string;
  description: string;
  bullets: ServiceBullet[];
  imageHint: string;
  /** Owner still to supply final approved copy (plan §6.2). */
  copyPending?: boolean;
  /** Opens an in-page sample gallery instead of an inline panel (plan §5). */
  gallery?: boolean;
};

// Plan §4.2 — exact order, exact labels. Twelve services so the desktop grid
// forms three complete rows of four (§4.1).
export const services: Service[] = [
  {
    slug: "car-rental-advisory",
    anchor: "rac",
    name: "Car Rental Advisory",
    // Rewritten per §6.2: the previous copy read as a rent-a-car sales advert
    // ("Affordable rent a car services…", "Economical Vehicle"). This service
    // is advisory and fleet management, never vehicle sales.
    description:
      "Advisory and consultancy for car rental and mobility operations — end to end process",
    bullets: [
      { text: "Fleet structure" },
      { text: "Day-to-day operations" },
      { text: "Revenue performance" },
    ],
    imageHint: "Fleet operations or vehicle management — owner's actual project",
    copyPending: true,
  },
  {
    slug: "manpower-sourcing-staffing",
    anchor: "mss",
    name: "Manpower Sourcing",
    description:
      "Sourcing and staffing across executive, white collar and blue collar roles, from junior positions through senior appointments.",
    bullets: [
      { text: "Executive positions" },
      { text: "Blue collar and white collar roles" },
      { text: "Junior and senior appointments" },
    ],
    imageHint: "Team recruitment or staffing engagement",
    copyPending: true,
  },
  {
    slug: "web-design-development",
    anchor: "wdd",
    name: "Website & Mobile Application Design and Development",
    description:
      "Custom, responsive and SEO-friendly websites and mobile applications that improve online visibility and business growth. We build fast, secure, user-focused products designed to attract visitors and convert them into customers.",
    // "What's included" is written for the CLIENT reading it, not for another
    // developer: no framework, library or CSS-tool names anywhere (owner's
    // instruction). Each line names the deliverable, then says in plain words
    // what they actually get.
    //
    // The split against Software Development below is deliberate and must not
    // blur: THIS entry is what the customer sees and uses — the public website
    // and the mobile app. Software Development is the internal system the
    // client's own team runs the business on. Nothing appears in both lists.
    bullets: [
      {
        text: "Website & App Design — We plan and design every screen and the path a visitor takes through them before any building starts, so you approve the look and flow while changes are still cheap.",
      },
      {
        text: "Front-End Development — Everything your visitor sees and uses: pages, menus, forms, galleries, product listings and animations, built to load quickly and work properly on any screen.",
      },
      {
        text: "Back-End Development — The working part behind the pages: enquiry forms that reach your inbox, bookings, customer logins, file uploads, and content you can update yourself without calling us.",
      },
      {
        text: "Mobile Application — One app that runs on both Android and iPhone, so you pay for a single build instead of two, complete with app icon, opening screen and store listing.",
      },
      {
        text: "Responsive Design — The same site or app stays readable and easy to use on phones, tablets and desktops, with no separate mobile version to maintain.",
      },
      {
        text: "Launch & Setup — We take it live properly: domain, hosting, security certificate, email routing and redirects from your old pages so nothing that used to work breaks.",
      },
      {
        text: "Visual Assets — Banners, cards, icons and branded graphics prepared to match the site or app.",
      },
      {
        text: "Basic Search Engine Optimization — Page titles, descriptions and structure set up so search engines can find your pages and list them correctly.",
      },
    ],
    imageHint: "Website or mobile app design work — laptop or device mockup",
  },
  {
    slug: "software-development",
    anchor: "sd",
    name: "Software Development",
    description:
      "Our Software Development services provide custom, scalable, and secure software solutions tailored to your business needs. We develop high-performance applications that improve efficiency, streamline operations, and support business growth.",
    // The counterpart to the entry above, and the one most easily confused
    // with it — so every line here is about the system the client's OWN TEAM
    // uses to run the business day to day, never about the public website.
    // Same rule as above: no framework or tool names, plain outcomes only.
    bullets: [
      {
        text: "Custom Business Systems — Software built around the way your company already works, instead of forcing your process to fit whatever an off-the-shelf product allows.",
      },
      {
        text: "Dashboards & Reports — One screen showing your live figures — sales, bookings, stock, staff performance — with charts, filters by date or branch, and export to Excel or PDF.",
      },
      {
        text: "Workflow Automation — The steps your team repeats by hand, done by the system instead: automatic email notifications, approval routing, reminders, scheduled reports and recurring tasks.",
      },
      {
        text: "User Accounts & Access Levels — Secure logins where each role — owner, manager, staff — sees and can change only what that role should.",
      },
      {
        text: "Records & Data Management — Your customers, transactions, documents and history kept in one organised place that can be searched, filtered, exported and backed up.",
      },
      {
        text: "System Integrations — Your software connected to the other tools you already pay for, such as payment, messaging, accounting or supplier systems, so information moves across on its own instead of being re-typed.",
      },
      {
        text: "AI Features — Practical AI inside your system: assistants that answer from your own company information, automatic drafting and summarising, and document or form processing.",
      },
      {
        text: "Performance Optimization — Speeding up an existing system that has grown slow as your records, users and daily volume increased.",
      },
      {
        text: "Maintenance & Support — Ongoing fixes, updates and small improvements after launch, so issues are handled as they appear rather than piling up.",
      },
      {
        text: "Systems & Network Support — Server setup, network troubleshooting and internal tooling that keeps daily operations running.",
      },
      {
        text: "Technical Consultation — Straight advice on the right approach, tools and realistic cost before you commit to building anything.",
      },
    ],
    imageHint: "Development team or software dashboard",
  },
  {
    slug: "creative-arts-consulting",
    anchor: "cac",
    // Renamed from "creative-arts-naturescape". Plan §4.2 removes ecosystem /
    // nature / aquascaping terms from this service's identity; the old slug
    // carried them. Nothing links to the old anchor yet (the site is
    // pre-launch), so this is safe to change now rather than after launch.
    name: "Creative Arts Consulting",
    // Visually led and sample-driven, not a service list (plan §5).
    description:
      "Creative arts consulting for residential, commercial and public spaces.",
    bullets: [],
    imageHint: "Creative arts project — approved sample work",
    copyPending: true,
    gallery: true,
  },
  {
    slug: "product-sourcing",
    anchor: "ps",
    name: "Product Sourcing",
    // Split out of the former "Manpower & Product Sourcing" (plan §4.2).
    description:
      "Sourcing that connects businesses with trusted suppliers, quality products and competitive pricing — handling supplier sourcing, negotiation, quality control and logistics.",
    bullets: [
      { text: "Chinese products (A to Z)" },
      { text: "Fire Rated Door (FRD)" },
      { text: "Bio Chemicals Product (STP)" },
    ],
    imageHint: "Warehouse, supplier sourcing or product inspection",
    copyPending: true,
  },
  {
    slug: "business-management-consultancy",
    anchor: "bmc",
    name: "Business Management and Startup Consultancy",
    description:
      "Optimize your business with expert management consulting services. We help companies improve operations, increase efficiency, develop growth strategies, and achieve sustainable success through tailored business solutions.",
    bullets: [
      {
        text: "New business or existing — set up or expansion, feasibility study, market research, go-to-market strategy.",
      },
      {
        text: "Strategic enhancement — sales and revenue, operations, process improvement, soft skills training.",
      },
      { text: "Startup structure and launch support" },
    ],
    imageHint: "Business strategy session or management consulting meeting",
  },
  {
    slug: "marketing-management",
    anchor: "mm",
    name: "Marketing Management",
    description:
      "Our Marketing Management services help businesses grow through strategic branding, digital marketing, and targeted campaigns. We create effective marketing solutions that increase brand awareness, generate leads, and drive business growth.",
    bullets: [
      { text: "Global Audience Targeting" },
      { text: "Cross-Channel Campaigns" },
      { text: "Real-Time Bidding" },
      { text: "Multinational Analytics" },
    ],
    imageHint: "Marketing campaign planning or brand collateral",
  },
  {
    slug: "online-training",
    anchor: "ot",
    // Renamed from "training-quality-standardization" — plan §4.2 removes
    // "Quality and Standardization" from this service entirely.
    name: "Online Training",
    description:
      "Our Online Training helps you find accredited courses and recognized certifications to build skills, advance your career, and achieve professional success.",
    bullets: [
      { text: "Health & Safety" },
      { text: "IOSH, COSH/BOSH" },
      {
        text: "ISO certification",
        sub: [
          "i. 9001 – Quality Management System",
          "ii. 45001 – Occupational Health & Safety Management System",
          "iii. 14001 – Environmental Management System",
          "iv. 39001 – Road Traffic Safety Management System",
          "v. 55001 – Asset Management System",
          "vi. 50001 – Energy Management System",
        ],
      },
    ],
    // Plan §4.4: the owner is supplying an approved student/children
    // learning photo for this slot specifically.
    imageHint: "Approved student / children learning session photo",
  },
  {
    slug: "business-development",
    anchor: "bd",
    // Promoted from a bullet under Business Management to its own service
    // (plan §4.2 position 11).
    name: "Business Development",
    description:
      "Structured business development support — building the partnerships, channels and pipeline that turn a plan into sustained growth.",
    bullets: [],
    imageHint: "Business development or partnership meeting",
    copyPending: true,
  },
  {
    slug: "brand-accelerator",
    anchor: "ba",
    // Promoted from a bullet under Business Management (plan §4.2 position 12).
    name: "Brand Accelerator",
    description:
      "Focused support for brands that need to move quickly — positioning, identity and go-to-market execution in one programme.",
    bullets: [],
    imageHint: "Brand identity or accelerator workshop",
    copyPending: true,
  },
  {
    slug: "interior-design-consulting",
    anchor: "idc",
    name: "Interior Design Consulting",
    description:
      "Our Interior Design Consulting services provide expert guidance to create functional, stylish, and personalized spaces. We help transform homes and businesses with innovative design solutions tailored to your vision and budget.",
    bullets: [],
    imageHint: "Interior design project or finished space",
  },
];

// Single order for every surface (plan §6.1). Kept as a derived export so the
// home grid and the Services page can never drift apart.
export const homeServices = services;

// Options for the Contact form's Service Interest dropdown (plan §10.1),
// derived from the same list so a new service appears everywhere at once.
// "Other" is appended here, NOT added to `services` — it is a form choice, not
// a thirteenth service, and the twelve-service list is what the grid and the
// detail page render. A visitor whose need does not match a named service can
// still pick something and explain it in the message field.
export const SERVICE_INTEREST_OTHER = "Other";

export const serviceInterestOptions = [
  ...services.map((service) => service.name),
  SERVICE_INTEREST_OTHER,
];

export const servicesIntro = {
  eyebrow: "SERVICES",
  body: "from strategy to implementation, we provide structured solutions that help businesses operate with clarity, efficiency, and scalability.",
} as const;

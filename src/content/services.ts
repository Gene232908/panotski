// VERBATIM content from cresvcs.com/services. Do not rewrite or "improve"
// this copy — it is the client's approved wording. See RULES.md § Content Fidelity.
//
// `name`     — as written on the Services page.
// `homeName` — as written in the Home page "WHAT WE DO" grid (a few differ).
// `imageHint`— what photo belongs here, shown in the placeholder until the
//              client supplies approved imagery.

export type ServiceBullet = {
  text: string;
  sub?: string[];
};

export type Service = {
  slug: string;
  anchor: string;
  name: string;
  homeName: string;
  description: string;
  bullets: ServiceBullet[];
  imageHint: string;
};

// Order as published on the Services page.
export const services: Service[] = [
  {
    slug: "business-management-consultancy",
    anchor: "bmc",
    name: "Business Management Consultancy",
    homeName: "Business Management Consultancy",
    description:
      "Optimize your business with expert management consulting services. We help companies improve operations, increase efficiency, develop growth strategies, and achieve sustainable success through tailored business solutions.",
    bullets: [
      {
        text: "New Business or Existing – set up or expansion, feasibility study, market research, go market strategy etc.",
      },
      {
        text: "Strategic enhancement - Sales & revenue, Operations, process improvement, soft skills training.",
      },
      { text: "Business Development – brand accelerator" },
    ],
    imageHint: "Business strategy session or management consulting meeting",
  },
  {
    slug: "car-rental-advisory",
    anchor: "rac",
    name: "Car Rental Advisory/Consultancy",
    homeName: "Car Rental Advisory/Consultancy",
    description:
      "Affordable rent a car services with a wide selection of reliable, well-maintained vehicles for daily or weekly rentals. Enjoy flexible car rental options, competitive rates, and a hassle-free booking experience.",
    bullets: [
      { text: "Economical Vehicle" },
      {
        text: "Car Rental/Mobility Solutions - Fleet Management & Operations, Sales and Revenue",
      },
      { text: "Business Development" },
    ],
    imageHint: "Fleet vehicles or car rental operations",
  },
  {
    slug: "manpower-product-sourcing",
    anchor: "mps",
    name: "Manpower & Product Sourcing",
    homeName: "Manpower & Product Sourcing",
    description:
      "Our sourcing services connect businesses with trusted suppliers, quality products, and competitive pricing. We handle supplier sourcing, negotiation, quality control, and logistics to ensure a reliable, cost-effective, and efficient procurement process.",
    bullets: [
      {
        text: "Manpower – Executive position, Blue & White Collar, Junior and Senior position.",
      },
      {
        text: "Product – Chinese products (A to Z), Fire Rated Door (FRD), Bio Chemicals Product (STP).",
      },
      {
        text: "Services - full stack software development, website design/hosting, finance/accounting management, Marketing management – Programmatic Marketing.",
      },
    ],
    imageHint: "Team recruitment, warehouse, or supplier sourcing",
  },
  {
    slug: "training-quality-standardization",
    anchor: "otcc",
    name: "Online Training & Quality Standardization",
    homeName: "Online Training & Quality Standardization",
    description:
      "Our Online Training & Certification Consulting helps you find accredited courses and recognized certifications to build skills, advance your career, and achieve professional success.",
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
    imageHint: "Training session, workshop, or certification class",
  },
  {
    slug: "interior-design-consulting",
    anchor: "idc",
    name: "Interior Design Consulting",
    homeName: "Interior Design Consulting",
    description:
      "Our Interior Design Consulting services provide expert guidance to create functional, stylish, and personalized spaces. We help transform homes and businesses with innovative design solutions tailored to your vision and budget.",
    bullets: [],
    imageHint: "Interior design project or finished space",
  },
  {
    slug: "creative-arts-naturescape",
    anchor: "facne",
    name: "Creative Arts Consultancy- Naturescape Ecosystem",
    homeName: "Creative Arts Consulting - Nature/Aqua escape Ecosystem",
    description:
      "Our Fine Arts Consulting – Naturescape Ecosystem services create nature-inspired, eco-friendly designs that enhance residential, commercial, and public spaces with sustainable artistic solutions.",
    bullets: [],
    imageHint: "Naturescape or aqua-escape installation",
  },
  {
    slug: "marketing-management",
    anchor: "mm",
    name: "Marketing Management",
    homeName: "Marketing Management",
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
    slug: "web-design-development",
    anchor: "wdd",
    name: "Web Design & Development",
    homeName: "Web Design & Development",
    description:
      "Our Web Design & Development services deliver custom, responsive, and SEO-friendly websites that improve online visibility and business growth. We create fast, secure, and user-focused websites designed to attract visitors and convert them into customers.",
    bullets: [
      { text: "Custom UI/UX Design" },
      { text: "Responsive Development" },
      { text: "Basic Search Engine Optimization" },
    ],
    imageHint: "Website design work — laptop or screen mockup",
  },
  {
    slug: "software-development",
    anchor: "sd",
    name: "Software Development",
    homeName: "Software Development",
    description:
      "Our Software Development services provide custom, scalable, and secure software solutions tailored to your business needs. We develop high-performance applications that improve efficiency, streamline operations, and support business growth.",
    bullets: [
      { text: "Global Workflow Automation" },
      { text: "Custom Dashboards" },
      { text: "International API Integrations" },
      { text: "Scalable Architecture" },
    ],
    imageHint: "Development team or software dashboard",
  },
];

// Home page "WHAT WE DO" order (differs from the Services page order).
export const homeServiceOrder = [
  "car-rental-advisory",
  "manpower-product-sourcing",
  "training-quality-standardization",
  "interior-design-consulting",
  "marketing-management",
  "web-design-development",
  "software-development",
  "creative-arts-naturescape",
  "business-management-consultancy",
] as const;

export const homeServices = homeServiceOrder.map(
  (slug) => services.find((service) => service.slug === slug)!,
);

export const servicesIntro = {
  eyebrow: "SERVICES",
  body: "from strategy to implementation, we provide structured solutions that help businesses operate with clarity, efficiency, and scalability.",
} as const;

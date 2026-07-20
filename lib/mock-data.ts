import type {
  AboutPageContent,
  ContactPageContent,
  DonatePageContent,
  FoundationContent,
  FounderPageContent,
  GalleryItem,
  ImpactStats,
  LeadershipMember,
  Testimonial,
} from "./types";

/** Realistic foundation copy for SSR pages. */
export const foundationContent: FoundationContent = {
  vision:
    "Building a Nigeria where delight is a common heritage.",
  mandate:
    "To preach the gospel, serve the vulnerable, and empower communities with compassion, dignity, and hope.",
  aboutText:
    "Divine Gospel Delight Foundation is a premium humanitarian foundation registered in Nigeria, committed to high-impact interventions across Africa. Through sustainable health, education, and spiritual guidance, we walk alongside families as they discover hope, healing, and a brighter future.",
  heroHeadline: "Restoring Hope and Dignity to the Heart of Nigeria.",
  missionText:
    "We are an elite humanitarian collective dedicated to empowering underserved communities through sustainable health, education, and spiritual guidance. Every soul deserves a chance at delight.",
  establishedYear: "2024",
  mandateHeadline: "Driven by Faith, Guided by Compassion",
  mandateQuote:
    "Our mission transcends mere charity; it is a divine commitment to uplift the vulnerable and showcase the true spirit of African resilience through tangible impact.",
  visionHeadline: "Building a Nigeria where delight is a common heritage.",
  impactCallout: "Impact over Optics.",
  impactCalloutBody:
    "We believe in measurable, sustainable change that outlives our physical presence.",
};

/** About page editorial content and narrative sections. */
export const aboutPageContent: AboutPageContent = {
  label: "Our Heritage",
  headline: "Crafting a Legacy of",
  headlineAccent: "Hope & Excellence",
  headlineSuffix: "in Nigeria.",
  pillarsLabel: "Pillars of Impact",
  pillars: [
    "Founded in Lagos",
    "Faith-Driven Mission",
    "Community Excellence",
  ],
  intro:
    "Divine Gospel Delight Foundation stands as a beacon of luxury philanthropy, dedicated to restoring dignity and creating sustainable impact through refined humanitarian efforts.",
  metrics: [
    { value: "15,000+", label: "Lives Impacted" },
    { value: "50+", label: "Outreach Programs" },
    { value: "20+", label: "Communities Served" },
    { value: "2017", label: "Serving Since" },
  ],
  missionTitle: "Our Mission",
  missionBody:
    "To empower marginalized communities across Nigeria by providing access to elite-level healthcare, premium educational resources, and sustainable economic opportunities, all delivered with the grace and dignity they deserve.",
  visionTitle: "The Vision",
  visionBody:
    "We envision a Nigeria where humanitarian aid is synonymous with excellence, where every individual has the platform to transition from surviving to thriving within a sophisticated support ecosystem.",
  quote:
    "Our faith inspires every act of compassion and every life we transform.",
  journeyLabel: "Our Journey",
  journeyHeadline: "A Decade of Dedication",
  timeline: [
    {
      id: "mile-2012",
      year: "2012",
      title: "Foundation Established",
      description:
        "Founded in Lagos, DGDF began as a small initiative focused on providing immediate relief to families in need within local neighborhoods.",
    },
    {
      id: "mile-2015",
      year: "2015",
      title: "Community Outreach Expanded",
      description:
        "Recognizing the depth of systemic issues, we expanded our reach to rural communities across three different states.",
    },
    {
      id: "mile-2019",
      year: "2019",
      title: "Education Programs",
      description:
        "Launched our scholarship and vocational training framework, pairing high-level strategic planning with local needs.",
    },
    {
      id: "mile-today",
      year: "Today",
      title: "Excellence in Impact",
      description:
        "Today, we stand as a structured foundation with a proven ecosystem of support, serving thousands of families nationwide.",
    },
  ],
  leadershipLabel: "The Board",
  leadershipHeadline: "Our Leadership",
  ctaHeadline: "Be Part of the Legacy",
  ctaBody:
    "Join us in our mission to redefine Nigerian humanitarian efforts through the lens of excellence and dignity. Your support creates a ripple of change.",
  ctaPrimary: "Support Our Work",
  ctaSecondary: "Get in Touch",
};

/** Impact metrics displayed on the home page. */
export const impactStats: ImpactStats = {
  livesImpacted: 12000,
  outreaches: 45,
  volunteers: 150,
  successRate: 92,
};

/** Founder profile page content. */
export const founderPageContent: FounderPageContent = {
  label: "The Founder",
  name: "Dr. Adebayo Ogunlesi",
  role: "Founder & CEO",
  photo:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=1500&fit=crop",
  photoAlt: "Portrait of Dr. Adebayo Ogunlesi, Founder of Divine Gospel Delight Foundation",
  intro:
    "A visionary philanthropist whose faith, discipline, and devotion to community excellence shaped the foundation’s mission to restore hope and dignity across Nigeria.",
  articleLabel: "His Story",
  articleHeadline: "A life devoted to service and excellence",
  paragraphs: [
    "Dr. Adebayo Ogunlesi founded Divine Gospel Delight Foundation with a clear conviction: humanitarian work should be marked by excellence, dignity, and lasting impact—not spectacle. With more than two decades in strategic development and international relations, he has built institutions that serve families with the care and seriousness they deserve.",
    "Raised with a deep sense of faith and responsibility, he saw early how poverty and limited opportunity could steal delight from entire communities. That awareness became a calling. What began as neighborhood relief in Lagos grew into a structured foundation spanning health, education, and spiritual guidance across Nigeria.",
    "Under his leadership, DGDF has pursued a standard of delivery rarely associated with charity—precise planning, accountable stewardship, and programs designed to help people move from surviving to thriving. He believes every act of compassion should leave behind capacity, not dependency.",
    "Today, Dr. Ogunlesi continues to guide the foundation’s vision: a Nigeria where delight is a common heritage, and where the gospel’s hope is made tangible through service that honors the people it reaches.",
  ],
  quote:
    "Our mission transcends mere charity; it is a divine commitment to uplift the vulnerable and showcase the true spirit of African resilience through tangible impact.",
  quoteAttribution: "Dr. Adebayo Ogunlesi",
  ctaHeadline: "Continue the Work He Began",
  ctaBody:
    "Support the programs and communities shaped by this vision—your partnership helps restore hope with excellence and dignity.",
  ctaPrimary: "Support Our Work",
  ctaSecondary: "Back to About",
};

/** Leadership team profiles. */
export const leadership: LeadershipMember[] = [
  {
    id: "lead-1",
    name: "Dr. Adebayo Ogunlesi",
    role: "Founder & CEO",
    bio: "A visionary philanthropist with over 20 years of experience in strategic development and international relations.",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop",
    href: "/founder",
  },
  {
    id: "lead-2",
    name: "Chioma Nnaji",
    role: "Operations Director",
    bio: "Leading our ground-level execution with a focus on operational excellence and sustainable community impact.",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop",
  },
  {
    id: "lead-3",
    name: "Olusola Alake",
    role: "Board Chairman",
    bio: "Ensuring the highest standards of governance and strategic foresight across all foundation activities.",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=1000&fit=crop",
  },
  {
    id: "lead-4",
    name: "Zainab Bello",
    role: "Head of Impact",
    bio: "Dedicated to measuring and scaling our humanitarian efforts to reach the most vulnerable populations.",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop",
  },
];

/** Community testimonials. */
export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Mrs. Adesola Bello",
    role: "Community Beneficiary, Ogun State",
    quote:
      "The Foundation didn't just give us food; they gave my children a future through the scholarship program. Today, my daughter is the first in our village to attend university.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  },
  {
    id: "test-2",
    name: "Ibrahim Musa",
    role: "Volunteer Coordinator",
    quote:
      "Serving with Divine Gospel Delight Foundation showed me that the gospel is both proclaimed and practiced. Every outing is intentional and full of love.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: "test-3",
    name: "Blessing Okafor",
    role: "Beneficiary Parent",
    quote:
      "When my family had nowhere to turn, the foundation walked with us. Their medical outreach and discipleship changed our lives forever.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
];

/** Featured testimonial for the gallery page. */
export const galleryTestimonial: Testimonial = {
  id: "gal-test-1",
  name: "Sister Ngozi Adeyemi",
  role: "Community Leader, Lagos Outreach",
  quote:
    "The Divine Gospel Delight Foundation didn't just give us resources; they gave us hope. Our community has seen a transformation that only grace could bring.",
  avatar:
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
};

/** Gallery of outreach and ministry moments. */
export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=1000&fit=crop",
    caption: "Dignity in Care",
    date: "2024-11-12",
    category: "Healthcare Outreach",
    aspect: "portrait",
  },
  {
    id: "gal-2",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=800&fit=crop",
    caption: "The Future Unfolding",
    date: "2024-09-18",
    category: "Education",
    aspect: "square",
  },
  {
    id: "gal-3",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1060&fit=crop",
    caption: "Hearts Behind the Mission",
    date: "2024-08-04",
    category: "Volunteer Spotlight",
    aspect: "tall",
  },
  {
    id: "gal-4",
    imageUrl:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&h=600&fit=crop",
    caption: "A Table for Many",
    date: "2024-07-22",
    category: "Nutrition Program",
    aspect: "wide",
  },
  {
    id: "gal-5",
    imageUrl:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=1200&fit=crop",
    caption: "Knowledge Exchange",
    date: "2024-06-10",
    category: "Literacy Drive",
    aspect: "extraTall",
  },
  {
    id: "gal-6",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=800&fit=crop",
    caption: "Shared Joy",
    date: "2024-05-15",
    category: "Empowerment Hub",
    aspect: "square",
  },
  {
    id: "gal-7",
    imageUrl:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=1000&fit=crop",
    caption: "Hands of Hope",
    date: "2024-04-28",
    category: "Compassion",
    aspect: "portrait",
  },
  {
    id: "gal-8",
    imageUrl:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=800&fit=crop",
    caption: "Gathered in Faith",
    date: "2024-03-19",
    category: "Community",
    aspect: "square",
  },
  {
    id: "gal-9",
    imageUrl:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=1060&fit=crop",
    caption: "Citywide Mission",
    date: "2024-02-08",
    category: "Outreach",
    aspect: "tall",
  },
];

/** Donate page editorial content, impact channels, and transparency copy. */
export const donatePageContent: DonatePageContent = {
  heroLabel: "Empowerment through Giving",
  heroHeadline: "Your Generosity,",
  heroAccent: "Their Future.",
  heroBody:
    "At Divine Gospel Delight Foundation, every donation is a seed planted for sustainable change. Join our mission to provide dignity, education, and health to communities across Nigeria.",
  heroImageUrl:
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=1100&fit=crop",
  heroImageAlt:
    "Volunteer placing a textbook into the hands of a young student",
  impactTitle: "Where your money goes",
  impactItems: [
    {
      id: "nourishment",
      title: "Nourishment Programs",
      description:
        "Providing daily nutritious meals to underserved primary school children.",
      icon: "nourishment",
    },
    {
      id: "education",
      title: "Educational Grants",
      description:
        "Funding tuition, uniforms, and stationery for gifted students in rural zones.",
      icon: "education",
    },
    {
      id: "health",
      title: "Health Infrastructure",
      description:
        "Equipping community health centers with essential medical supplies.",
      icon: "health",
    },
  ],
  impactQuote:
    "The smallest act of kindness is worth more than the grandest intention.",
  transparencyLabel: "Transparency First",
  transparencyHeadline: "Trust is our foundation.",
  transparencyBody:
    "We pride ourselves on 100% financial transparency. 92% of all donations go directly to our field programs, ensuring your contribution makes the maximum possible impact.",
  transparencyImageUrl:
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000&h=800&fit=crop",
  transparencyImageAlt:
    "Community members sharing a communal meal during a foundation gathering",
  transparencyStats: [
    { value: "12k+", label: "Lives Impacted" },
    { value: "Nigeria", label: "Primary Focus" },
  ],
};

/** Contact page editorial content and office details. */
export const contactPageContent: ContactPageContent = {
  label: "Get in Touch",
  headline: "Connecting hearts to the mission of compassion.",
  body: "Whether you have a question about our programs, wish to partner with us, or simply want to share a word of encouragement, we are here to listen and respond with grace.",
  inquiryOptions: [
    "General Inquiry",
    "Donation Support",
    "Partnership Proposal",
    "Volunteer Opportunities",
  ],
  details: [
    {
      id: "sanctuary",
      icon: "location",
      title: "Our Sanctuary",
      lines: [
        "12 Prosperity Lane, Victoria Island Extension,",
        "Lagos, Nigeria",
      ],
    },
    {
      id: "email",
      icon: "mail",
      title: "Email Us",
      lines: [
        "info@dgdelightfound.org",
        "partnerships@dgdelightfound.org",
      ],
    },
    {
      id: "phone",
      icon: "phone",
      title: "Call Us",
      lines: ["+234 (0) 800 DIVINE GOSPEL", "+234 1 234 5678"],
    },
    {
      id: "hours",
      icon: "schedule",
      title: "Office Hours",
      lines: [
        "Monday – Friday: 9:00 AM – 5:00 PM",
        "Saturday: 10:00 AM – 2:00 PM",
      ],
    },
  ],
  quote: "Compassion is the divine language spoken by every heart.",
};

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

const MISSION =
  "To fulfill the social responsibility of our divine mandate through meeting the needs of the less privileged people of Nigerian society via providing them with humanitarian and empowerment support thereby restoring hope and dignity to them in our society.";

const VISION =
  "To become a humanitarian organization renowned for providing a platform where individuals irrespective of their backgrounds can transition from just existing to fulfilling life purpose.";

const OUR_STORY =
  "Divine Gospel Delight Foundation was founded as an offshoot of our divine mandate of propagating the Gospel through service for humanity. We started from meeting small needs of people in the neighborhood with focus on widows, orphans, teenage children, retirees etc. Our passion is growing into family enrichment programs for effective parenting and achieving sustainability in family lives. We are also progressing to becoming a foundation committed to people's health, education and spiritual enrichment across Nigeria and to other parts of the world.";

/** Realistic foundation copy for SSR pages. */
export const foundationContent: FoundationContent = {
  vision: VISION,
  mandate:
    "Propagating the Gospel through service for humanity — restoring hope and dignity to the less privileged.",
  aboutText: OUR_STORY,
  heroHeadline: "Restoring Hope and Dignity to Every Life",
  missionText:
    "We exist to meet the needs of the less privileged through humanitarian and empowerment support — a faith-filled calling to restore hope, dignity, and purpose across Nigerian communities.",
  establishedYear: "2024",
  mandateHeadline: "Our Mission",
  mandateQuote: MISSION,
  visionHeadline: VISION,
  impactCallout: "From Existing to Purpose",
  impactCalloutBody:
    "Serving widows, orphans, teenagers, retirees, and families — and growing into health, education, and spiritual enrichment across Nigeria and beyond.",
};

/** About page editorial content and narrative sections. */
export const aboutPageContent: AboutPageContent = {
  label: "Our Story",
  headline: "Propagating the Gospel",
  headlineAccent: "Through Service",
  headlineSuffix: "for Humanity",
  pillarsLabel: "Who We Serve",
  pillars: ["Widows & Orphans", "Families & Retirees", "Youth & Communities"],
  intro:
    "Divine Gospel Delight Foundation was founded as an offshoot of our divine mandate of propagating the Gospel through service for humanity.",
  metrics: [
    { value: "12k+", label: "Lives Impacted" },
    { value: "45+", label: "Outreaches" },
    { value: "150+", label: "Volunteers" },
    { value: "Nigeria", label: "Primary Focus" },
  ],
  missionTitle: "Our Mission",
  missionBody: MISSION,
  visionTitle: "Our Vision",
  visionBody: VISION,
  quote:
    "Restoring hope and dignity — helping people transition from just existing to fulfilling life purpose.",
  journeyLabel: "Our Journey",
  journeyHeadline: "Our Story",
  timeline: [
    {
      id: "mile-beginnings",
      year: "Beginnings",
      title: "Neighborhood Care",
      description:
        "We began by meeting small needs in the neighborhood — working with widows, orphans, teenage children, retirees, and others who needed compassion.",
    },
    {
      id: "mile-family",
      year: "Growing",
      title: "Family Enrichment",
      description:
        "Our passion is growing into family enrichment programmes for effective parenting and lasting sustainability in family lives.",
    },
    {
      id: "mile-expand",
      year: "Expanding",
      title: "Health, Education & Faith",
      description:
        "We are progressing as a foundation committed to people’s health, education, and spiritual enrichment across Nigeria.",
    },
    {
      id: "mile-today",
      year: "Today",
      title: "Hope Beyond Borders",
      description:
        "With grateful hearts, we continue this gospel-centered service in Nigeria and look toward other parts of the world.",
    },
  ],
  leadershipLabel: "Guided by Faith",
  leadershipHeadline: "Our Leadership",
  ctaHeadline: "Be Part of This Mandate",
  ctaBody:
    "Walk with us as we meet needs, empower families, and restore hope and dignity across Nigerian communities.",
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

/** Founder / Meet Our Leaders page content. */
export const founderPageContent: FounderPageContent = {
  label: "Our Leaders",
  name: "Rev'd Mrs Folake Ojo",
  role: "President / Chairperson",
  photo:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=1500&fit=crop",
  photoAlt:
    "Portrait of Rev'd Mrs Folake Ojo, President of Divine Gospel Delight Foundation",
  intro:
    "Meet the servants guiding Divine Gospel Delight Foundation — leading with faith, compassion, and a heart for the less privileged.",
  articleLabel: "Our Story",
  articleHeadline: "Propagating the Gospel through service for humanity",
  paragraphs: [
    "Divine Gospel Delight Foundation was founded as an offshoot of our divine mandate of propagating the Gospel through service for humanity.",
    "We started from meeting small needs of people in the neighborhood with focus on widows, orphans, teenage children, retirees etc. Our passion is growing into family enrichment programs for effective parenting and achieving sustainability in family lives.",
    "We are also progressing to becoming a foundation committed to people's health, education and spiritual enrichment across Nigeria and to other parts of the world.",
  ],
  quote: VISION,
  quoteAttribution: "Divine Gospel Delight Foundation",
  ctaHeadline: "Walk With Us in This Mandate",
  ctaBody:
    "Your partnership helps us restore hope, empower families, and point people toward purpose across Nigeria.",
  ctaPrimary: "Support Our Work",
  ctaSecondary: "Back to About",
};

/** Leadership team profiles. */
export const leadership: LeadershipMember[] = [
  {
    id: "lead-1",
    name: "Rev'd Mrs Folake Ojo",
    role: "President / Chairperson",
    bio: "Rev'd Mrs Folake Ojo serves as President and Chairperson of Divine Gospel Delight Foundation. With a heart for gospel-centered service, she guides the foundation’s work of restoring hope and dignity to the less privileged across Nigeria.",
    photo:
      "https://res.cloudinary.com/john-fixit/image/upload/v1785522353/dgdf/leadership/mcq3ewnedcqbuydkyr2p.jpg",
    href: "/founder",
  },
  {
    id: "lead-2",
    name: "Bolanle Ojo",
    role: "Secretary",
    bio: "Bolanle Ojo serves as Secretary of Divine Gospel Delight Foundation. He helps coordinate the foundation’s outreach and administrative work so widows, orphans, families, and communities can be served with care and excellence.",
    photo:
      "https://res.cloudinary.com/john-fixit/image/upload/v1785522335/dgdf/leadership/dfhkw8bfmcfaybdidf5z.jpg",
    href: "/founder",
  },
];

/** Community testimonials (homepage carousel shows up to 3). */
export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "A Grateful Mother",
    role: "Community Beneficiary",
    quote:
      "When we had nowhere to turn, the foundation met us with kindness. Their care restored our hope and reminded us that we are not forgotten.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  },
  {
    id: "test-2",
    name: "Volunteer Partner",
    role: "Outreach Volunteer",
    quote:
      "Serving with Divine Gospel Delight Foundation showed me that the gospel is lived out in practical love — every visit is intentional, warm, and full of dignity.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: "test-3",
    name: "A Family in Our Care",
    role: "Beneficiary Family",
    quote:
      "They walked with our household through a difficult season. The support we received helped us stand again with hope and faith.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
];

/** Featured testimonial for the gallery page. */
export const galleryTestimonial: Testimonial = {
  id: "gal-test-1",
  name: "Community Neighbor",
  role: "Outreach Beneficiary",
  quote:
    "Divine Gospel Delight Foundation didn’t just offer help — they offered hope. Our neighborhood felt seen, valued, and strengthened by their service.",
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
    category: "Humanitarian Care",
    aspect: "portrait",
  },
  {
    id: "gal-2",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=800&fit=crop",
    caption: "Growing in Purpose",
    date: "2024-09-18",
    category: "Education",
    aspect: "square",
  },
  {
    id: "gal-3",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1060&fit=crop",
    caption: "Hands of Compassion",
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
    category: "Family Support",
    aspect: "wide",
  },
  {
    id: "gal-5",
    imageUrl:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&h=1200&fit=crop",
    caption: "Learning Together",
    date: "2024-06-10",
    category: "Empowerment",
    aspect: "extraTall",
  },
  {
    id: "gal-6",
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=800&fit=crop",
    caption: "Shared Joy",
    date: "2024-05-15",
    category: "Community",
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
    category: "Spiritual Enrichment",
    aspect: "square",
  },
  {
    id: "gal-9",
    imageUrl:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=1060&fit=crop",
    caption: "Service in the City",
    date: "2024-02-08",
    category: "Outreach",
    aspect: "tall",
  },
];

/** Donate page editorial content, impact channels, and transparency copy. */
export const donatePageContent: DonatePageContent = {
  heroLabel: "Give with Purpose",
  heroHeadline: "Restore Hope.",
  heroAccent: "Uplift Dignity.",
  heroBody:
    "Your gift helps us meet the needs of widows, orphans, retirees, and families — providing humanitarian and empowerment support that restores hope across Nigeria.",
  heroImageUrl:
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=900&h=1100&fit=crop",
  heroImageAlt:
    "Volunteer placing a textbook into the hands of a young student",
  impactTitle: "Where your gift goes",
  impactItems: [
    {
      id: "nourishment",
      title: "Humanitarian Support",
      description:
        "Meeting practical needs of widows, orphans, retirees, and vulnerable households in our communities.",
      icon: "nourishment",
    },
    {
      id: "education",
      title: "Empowerment & Education",
      description:
        "Opening doors to learning and opportunity so people can move toward fulfilling life purpose.",
      icon: "education",
    },
    {
      id: "health",
      title: "Health & Family Care",
      description:
        "Supporting health and family enrichment for sustainable, dignified living.",
      icon: "health",
    },
  ],
  impactQuote:
    "Every act of compassion is a seed of hope planted in someone’s tomorrow.",
  transparencyLabel: "Stewardship",
  transparencyHeadline: "Trust is part of our calling.",
  transparencyBody:
    "We steward every gift with care so your contribution strengthens the communities we are called to serve.",
  transparencyImageUrl:
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000&h=800&fit=crop",
  transparencyImageAlt:
    "Community members sharing a communal meal during a foundation gathering",
  transparencyStats: [
    { value: "500+", label: "Lives Impacted" },
    { value: "Nigeria", label: "Primary Focus" },
  ],
};

/** Contact page editorial content and office details. */
export const contactPageContent: ContactPageContent = {
  label: "Get in Touch",
  headline: "We Would Love to Hear from You",
  body: "Whether you want to partner with us, volunteer, ask about our programmes, or share a word of encouragement — our team is ready to listen with grace.",
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
      title: "Our Location",
      lines: ["Lagos, Nigeria"],
    },
    {
      id: "email",
      icon: "mail",
      title: "Email Us",
      lines: ["divinegospeldelight.ministry@gmail.com"],
    },
    {
      id: "phone",
      icon: "phone",
      title: "Call Us",
      lines: ["President: 08037310730", "Secretary: 08033705759"],
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
  quote: "Compassion is the language of the Gospel lived out in service.",
};

export { MISSION, VISION, OUR_STORY };

import type { StaticImageData } from "next/image";
import healthConsultation from "@/public/images/health-outreach-consultation.jpg";
import healthDental from "@/public/images/health-outreach-dental.jpg";
import healthChildren from "@/public/images/health-outreach-children.jpg";
import ictTraining from "@/public/images/ict-training.jpg";
import hubTrainingHall from "@/public/images/ict-hub-training-hall.jpg";
import hubCbtPractice from "@/public/images/ict-hub-cbt-practice.jpg";
import hubStemProgramme from "@/public/images/ict-hub-stem-programme.jpg";
import chairmanPortrait from "@/public/images/chairman-edet-amana.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  caption: string;
  focus?: string;
};

export const photos = {
  consultation: {
    src: healthConsultation,
    alt: "A volunteer health worker in a stethoscope consults with an elderly woman at a community health outreach",
    caption: "Health outreach",
  },
  dental: {
    src: healthDental,
    alt: "A health worker in protective gear carries out a dental check-up at a community health outreach",
    caption: "Dental care at a health outreach",
  },
  children: {
    src: healthChildren,
    alt: "A Pro-Health International volunteer attends to two young children at a health outreach",
    caption: "Health outreach with Pro-Health International",
    focus: "center 30%",
  },
  ict: {
    src: ictTraining,
    alt: "Participants at computer workstations follow an instructor during an ICT training session",
    caption: "ICT training session",
  },
  hubTrainingHall: {
    src: hubTrainingHall,
    alt: "Young trainees at laptop workstations listen to an instructor in the EDAF ICT Hub training hall",
    caption: "A training session in the Hub's computer hall",
  },
  hubCbtPractice: {
    src: hubCbtPractice,
    alt: "A trainee types on a laptop at a workstation in the EDAF ICT Hub",
    caption: "Hands-on computer practice",
  },
  hubStemProgramme: {
    src: hubStemProgramme,
    alt: "Students hold certificates and school bags on stage at the STEM Future Assured Programme in Oron, 2023",
    caption: "STEM Future Assured Programme, Oron 2023",
    focus: "center 40%",
  },
} satisfies Record<string, Photo>;

export const gallery: Photo[] = [photos.ict, photos.children, photos.dental, photos.consultation];

export const site = {
  name: "Edet Amana Foundation",
  shortName: "EDAF",
  tagline: "...transforming lives!",
  description:
    "The Edet Amana Foundation is an independent Nigerian charity improving lives through education, healthcare, and empowerment.",
};

export type NavLink = { href: string; label: string; children?: { href: string; label: string }[] };

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "Who we are" },
      { href: "/about#chairman", label: "Our Chairman" },
      { href: "/about#vision", label: "Vision & mission" },
    ],
  },
  {
    href: "/projects",
    label: "Projects",
    children: [
      { href: "/projects", label: "All programmes" },
      { href: "/projects#scholarship", label: "Sir Edet Amana Scholarship" },
      { href: "/projects/education", label: "Education" },
      { href: "/projects/healthcare", label: "Healthcare" },
      { href: "/projects/community-development", label: "Community Development" },
    ],
  },
  {
    href: "/events",
    label: "Events",
    children: [
      { href: "/events", label: "All events" },
      { href: "/events/public-lecture", label: "Annual Public Lecture" },
      { href: "/events/christmas-carol", label: "Christmas Carol" },
    ],
  },
  { href: "/gallery", label: "Gallery" },
  { href: "/ict-hub", label: "ICT Hub" },
  { href: "/contact", label: "Contact" },
];

export const contact = {
  email: "info@edetamanafoundation.org.ng",
  phone: "+234 806 384 0685",
  phoneHref: "tel:+2348063840685",
  headOffice: {
    label: "Head Office",
    lines: [
      "Plot 315-B Akin Ogunlewe Street",
      "Off Ajose Adeogun, Victoria Island Annex",
      "G.P.O Box 4838, Marina, Lagos",
    ],
  },
  siteOffice: {
    label: "Site Office",
    lines: ["Eyetong Road, Oron", "Akwa Ibom State, Nigeria"],
  },
  invitation:
    "We'd love to hear from you! Let's work together to transform lives and empower communities.",
  socials: ["Facebook", "YouTube", "LinkedIn"],
};

export const founder = {
  name: "Sir Engr. Edet James Amana, OON",
  role: "Founder and Chairman, Amana Group of Companies; President, Edet Amana Foundation",
  photo: {
    src: chairmanPortrait,
    alt: "Portrait of Sir Engr. Edet James Amana, OON, in a red cap and white attire with coral beads",
    caption: "Sir Engr. Edet James Amana, OON",
  } satisfies Photo,
  summary:
    "Born on December 11, 1938 in Oyubia, Oron, Sir Edet Amana graduated with First Class Honours in Civil Engineering from Imperial College London, where he also earned a PhD in Structural Engineering in 1967. In 1972 he founded Amana Consortium Ltd, whose landmark projects include hospitals, schools, highways and bridges across Nigeria.",
  legacy:
    "The Edet Amana Foundation was inaugurated as part of the build-up to the celebration of his 80th birthday, with the long-term view to perpetuate his legacy.",
  highlights: [
    { value: "1938", label: "Born in Oyubia, Oron" },
    { value: "PhD", label: "Structural Engineering, Imperial College London" },
    { value: "1972", label: "Founded Amana Consortium Ltd" },
    { value: "2,000+", label: "Scholarships awarded in 50 years" },
  ],
  profile: [
    "Sir Engr. Edet James Amana, OON was born on December 11, 1938 in Oyubia, Oron, into the Royal family of Chief James Bidiak Amana and Madam Arit Amana. He passed his West African School Certificate in Grade 1 at Methodist College, Uzuakoli, and obtained his Higher School Certificate with distinction in all his subjects from King's College, Lagos. He graduated with First Class Honours in Civil Engineering at Imperial College of Science, Technology and Medicine, London, and obtained a PhD in Structural Engineering from the same university in 1967.",
    "After working with Flint and Neil Consulting Engineers, London (1963 – 1964) and Sir Bruce White, Wolf, Barry & Partners Consulting Engineers, London (1967 – 1969), he returned to Nigeria to work with Shell-BP in Warri, Port Harcourt and Lagos (1969 – 1972). He set up engineering practice as a consulting engineer in the name Amana Consortium Ltd in January 1972. The firm has undertaken several landmark projects in Nigeria, including the structural design and building consultation of several hospitals, schools, highways and bridges.",
  ],
  fellowships: [
    "Fellow, Nigerian Society of Engineers (FNSE), and registered by the Council for the Regulation of Engineering in Nigeria (COREN)",
    "Foundation Fellow, Nigerian Institution of Civil Engineers (FNICE)",
    "Foundation Fellow, Nigerian Institution of Structural Engineers (FNIStructE)",
    "Foundation Fellow, Nigerian Academy of Engineering (FAEng)",
    "Fellow, Nigerian Institute of Management (FNIM) and Institute of Directors (FIoD)",
    "Past President, Association for Consulting Engineering in Nigeria (2004 – 2005)",
    "Past President, Nigerian Academy of Engineering (2010 – 2012)",
    "Foundation Fellow and Trustee, Professional Excellence Foundation of Nigeria (PEFON)",
  ],
  landmarks: [
    "Presidential Committee on Strategic Plans for Engineering Development and Control in Nigeria.",
    "Director of the three-firm team that prepared the Transportation Master Plan for the Federal Capital Territory, Abuja (1980 – 1983), and designer of several highways in the FCT and other parts of the country.",
    "Member of the team appointed by the Nigerian Society of Engineers for the planning and design of the Second Niger Bridge between Asaba and Onitsha.",
    "Transport Sector Consultant for the Niger Delta Region Development Master Plan.",
    "Joint consultant (Amana Consortium with Etteh Aro and Partners) for the design of the road and bridge linking Oron to Calabar – East-West Road, Section V.",
  ],
};

export const vision =
  "To impact lives by adding value through health, knowledge, and empowerment.";

export const mission =
  "To raise the standard of living of people and communities in Nigeria through provision of assistance to the needy in education, healthcare services, economic empowerment and disaster relief.";

export const aboutSummary =
  "The Edet Amana Foundation is an independent Nigerian charity established in 2017 as the platform to coordinate and enhance the philanthropic interventions of Sir Engr. Edet James Amana, OON, the founder and Chairman of the Amana Group of Companies.";

export const aboutFull = [
  "The Edet Amana Foundation (EDAF) is an independent charity organization established in 2017 to coordinate and enhance the philanthropic interventions of Sir Edet James Amana, OON, the Founder and Chairman of the Amana Group of Companies.",
  "EDAF focuses on Education, Healthcare, and Economic Empowerment. It is governed by a Board of Trustees of very eminent Nigerians and has its headquarters in Victoria Island, Lagos, Nigeria.",
];

export const empoweringChange = {
  eyebrow: "Empowering Change",
  title: "Touching Hearts, Changing Lives",
  body: "At Edet Amana Foundation, we are dedicated to transforming lives and making a positive impact in our community. Through our various programs and initiatives, we strive to empower individuals and families in need, providing them with the support and resources they require to thrive. With a focus on education, healthcare, and social welfare, we work tirelessly to create a better future for all. Join us in our mission to spread hope and make a difference in the world.",
};

export const objectivesIntro =
  "Empowering communities through Education, Healthcare, Skill Acquisition, and Youth and Women empowerment programs. We provide Micro Loans to support entrepreneurship and sustainable development.";

export const objectives = [
  {
    title: "Education",
    body: "Offering educational opportunities to underprivileged children and adults, ensuring access to quality learning resources and promoting literacy.",
  },
  {
    title: "Healthcare",
    body: "Improving healthcare access by organizing medical camps, providing essential medicines, and supporting health awareness initiatives in remote areas.",
  },
  {
    title: "Empowerment",
    body: "Empowering youth and women through skill development workshops, leadership training, and entrepreneurship programs to foster self-reliance and independence.",
  },
];

export type Programme = {
  id: string;
  title: string;
  category: string;
  body?: string;
  featured?: boolean;
  image?: Photo;
  details?: DetailBlock[];
  gallery?: Photo[];
};

export type DetailBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; title: string; items: string[] };

export const programmes: Programme[] = [
  {
    id: "scholarship",
    title: "Sir Edet Amana Scholarship",
    category: "Education",
    featured: true,
    body: "The Sir Edet Amana Scholarship provides tuition support to deserving students pursuing their academic goals. Through this initiative, the Edet Amana Foundation seeks to reduce financial barriers to education and empower students to build brighter futures for themselves, their families and their communities.",
  },
  {
    id: "education",
    title: "Education",
    category: "Education",
    image: photos.ict,
    body: "The interest of the Edet Amana Foundation in the provision of qualitative education to Nigerians is borne out of the belief of its founder in the potency of education as an excellent tool for the empowerment of individuals and communities.",
    details: [
      {
        type: "paragraph",
        text: "The interest of the Edet Amana Foundation in the provision of qualitative education to Nigerians is borne out of the belief of its founder in the potency of education as an excellent tool for the empowerment of individuals and communities. Beginning with Oron Nation, Akwa Ibom State, our intervention in education will spread to other parts of Nigeria.",
      },
      {
        type: "paragraph",
        text: "The Edet Amana Foundation aims to partner with other charity organizations and foundations with similar objectives, working to reduce illiteracy and grow knowledge in our society. In this regard, Sir Edet Amana has awarded over 2,000 scholarships in the past 50 years to indigent but deserving students in secondary schools, technical colleges and universities, in some cases up to the doctoral level.",
      },
      {
        type: "list",
        title: "Our focus areas",
        items: [
          "The promotion of early childhood education.",
          "Award of scholarships and bursaries to indigent students at all levels of study and training.",
          "The promotion of quality education through increased access to learning facilities for youth and women.",
          "Provision of IT facilities and computer training for young people in rural areas, and all necessary support designed to enable individuals to generate a sustainable income and become self-sufficient.",
        ],
      },
      {
        type: "paragraph",
        text: "Sir Edet Amana regards education as the anchor that guarantees meaningful and sustained success in any sphere of human endeavour. He has established several academic foundations to encourage the growth of learning, particularly in science and technology.",
      },
      {
        type: "list",
        title: "Academic foundations and endowments",
        items: [
          "The Amana Science Foundation at the Federal Government Girls College, Calabar.",
          "The Amana Mathematics Prize in the University of Calabar.",
          "Engineer Edet Amana Medal and Premium for Engineering Design, NSE Uyo.",
          "Chief Bidiak Amana Professorial Chair in Early Childhood Education in the University of Uyo, an endowment sponsored by him and his siblings in memory of their late father.",
          "Endowment of the Law Library in the University of Calabar, in memory of his late mother, Madam Arit James Amana.",
          "Grand patron of the Royal Nursery School, Oron.",
          "Chief Bidiak Amana ICT Resource Centre, Oyubia, Oron.",
        ],
      },
      {
        type: "paragraph",
        text: "All these interventions have formally been brought under, and are currently coordinated and overseen by, the Edet Amana Foundation.",
      },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare",
    category: "Health",
    image: photos.children,
    body: "Since 2012, Sir Edet Amana has, in conjunction with Emmanuel Charitable Foundation and Pro Health International, organized Health Outreach and HIV/AIDS testing and awareness campaigns on an annual basis in the community of Oyubia, Oron, Akwa Ibom.",
    details: [
      {
        type: "paragraph",
        text: "Since 2012, Sir Edet Amana has, in conjunction with Emmanuel Charitable Foundation and Pro Health International, organized Health Outreach and HIV/AIDS testing and awareness campaigns on an annual basis in the community of Oyubia, Oron, Akwa Ibom.",
      },
      {
        type: "paragraph",
        text: "The outreach brings in the best medical personnel, including doctors, surgeons, ophthalmologists, dentists, nurses, pharmacists, laboratory technologists and other medical specialists from Nigeria and abroad, to diagnose, consult and treat the people of Oyubia and its neighbours. The health outreach has recorded over a thousand patients who came to have their vitals and medical conditions examined by professionals.",
      },
      {
        type: "list",
        title: "Services at the outreach",
        items: [
          "ELISA testing",
          "HIV consultation and awareness",
          "A dispensary",
          "Dental care",
          "An eye clinic, with consultation and surgery",
        ],
      },
      {
        type: "paragraph",
        text: "The Edet Amana Foundation aims to battle the prevailing ailments in society, such as malaria and the spread of HIV/AIDS, and to support the eradication of polio in the community. Extending this health intervention to benefit all Nigerians is the target of the Foundation's health portfolio.",
      },
    ],
    gallery: [photos.consultation, photos.dental],
  },
  {
    id: "community-development",
    title: "Community Development",
    category: "Community",
    body: "In 1970, upon his return from the United Kingdom, Sir Edet Amana put his passion for community development into the organization and management of the socio-cultural organization known as the Oyubia Community League.",
    details: [
      {
        type: "paragraph",
        text: "In 1970, upon his return from the United Kingdom, Sir Edet Amana put his passion for community development into the organization and management of the socio-cultural organization known as the Oyubia Community League. He served as its President for 30 years (1987 – 2017) and used that platform to transform Oyubia from a rural community into the modern centre of commerce it is today.",
      },
      {
        type: "paragraph",
        text: "Sir Edet Amana invested his resources and brought his professionalism to bear on the design and construction of major development projects in the village.",
      },
      {
        type: "list",
        title: "Key projects",
        items: [
          "An impressive Town Hall, which serves as a social centre for the promotion and sustenance of Oron culture as practised by the Oyubia people.",
          "A modern market, built and donated to the community and later expanded through his intervention, promoting commerce, ethnic affiliations and economic opportunities that have enriched the people.",
          "The ICT Resource Centre within the village primary school, bringing rural children the computer technology enjoyed by their peers in urban centres and preparing them with confidence for a promising future.",
          "The provision of electricity and pipe-borne water to the community.",
        ],
      },
      {
        type: "paragraph",
        text: "He has transformed Oyubia from a rural community into a semi-urban centre and attracted many small and medium-scale businesses into the community. Today, Oyubia ranks as one of the most enlightened communities in Akwa Ibom State.",
      },
    ],
  },
  {
    id: "micro-business-loan",
    title: "Micro Business Loan",
    category: "Economic Empowerment",
    body: "EDAF provides micro loans to support entrepreneurship and sustainable development, helping people start and grow small businesses in their communities.",
  },
  {
    id: "youth-women",
    title: "Youth & Women Empowerment",
    category: "Economic Empowerment",
    body: "Through skill development workshops, leadership training, and entrepreneurship programmes, EDAF empowers youth and women to build self-reliance and independence.",
  },
  {
    id: "tolerance-fair-play",
    title: "Tolerance and Fair Play",
    category: "Community",
  },
];

export function programmeHref(programme: Programme) {
  return programme.details ? `/projects/${programme.id}` : `/projects#${programme.id}`;
}

export const getInvolved = {
  title: "Get Involved",
  body: "Let's work together to transform lives and empower communities. Reach out to the Foundation to partner with us, support a programme, or learn how you can help.",
};

export type HubCourse = {
  title: string;
  summary: string;
  heading: string;
  points: string[];
  gains?: string[];
  idealFor?: string;
  outcome?: string;
};

export const ictHub = {
  name: "EDAF ICT Hub",
  headline: "Empowering Innovation, Driving Tech Excellence",
  tagline: "Bridging the technology gap…",
  summary:
    "The EDAF ICT Hub is a state-of-the-art facility for digital literacy, entrepreneurship, and innovation established by the Edet Amana Foundation.",
  sections: [
    { id: "about", label: "About" },
    { id: "facilities", label: "Facilities" },
    { id: "trainings", label: "Trainings" },
    { id: "nsq", label: "TVET–NSQ" },
    { id: "trainers", label: "Trainers" },
    { id: "partners", label: "Partners" },
    { id: "contact", label: "Contact" },
  ],
  about: [
    "Powered by the Edet Amana Foundation, the EDAF ICT Hub was created to bridge the technology gap for the Oro people and beyond. Our state-of-the-art facility provides training in digital literacy, entrepreneurship, and innovation, helping individuals and communities thrive in today's fast-changing world.",
    "At EDAF ICT Hub, we bring together ICT, vocational, and entrepreneurial training under one roof to empower people with skills for work, business, and self-reliance. We are not just a training centre – we are a community shaping the future.",
  ],
  highlights: [
    {
      title: "JAMB Accredited CBT Centre",
      body: "An accredited centre for Computer-Based Tests (CBT).",
    },
    {
      title: "NBTE Accredited TVET Skill Centre",
      body: "Accredited for Technical and Vocational Education and Training (TVET), including National Skills Qualification (NSQ) programmes.",
    },
    {
      title: "Modern Learning Facilities",
      body: "State-of-the-art facilities with comfortable classrooms and co-working spaces.",
    },
  ],
  facilities: [
    {
      title: "Conducive Learning & Working Environment",
      body: "Our state-of-the-art facilities and comfortable classrooms and co-working spaces are designed to enhance your focus and productivity.",
      icon: "Community",
    },
    {
      title: "Hands-On Learning",
      body: "Our training programmes are designed to be practical, helping you gain job-ready skills you can use immediately.",
      icon: "Education",
    },
  ],
  courses: [
    {
      title: "Basic ICT & CBT Training",
      summary: "Master the foundations of technology and excel in Computer-Based Tests (CBT) with ease.",
      heading: "Designed for beginners and students who want to",
      points: [
        "Gain confidence using a computer, from switching it on to mastering key operations.",
        "Learn typing, internet browsing, and email usage.",
        "Prepare for CBT exams with practical simulations and tips.",
      ],
      gains: [
        "A strong foundation in basic computer operations.",
        "Techniques for efficient typing and safe internet browsing.",
        "Hands-on CBT practice to boost your test confidence.",
        "Skills to navigate digital platforms with ease.",
      ],
    },
    {
      title: "No-code Website Design",
      summary: "Learn to create stunning, professional websites using tools like Wix and WordPress. No coding experience required.",
      heading: "Perfect for beginners who want to",
      points: [
        "Build websites for personal use or small businesses.",
        "Start a freelance web design career.",
        "Explore web development without learning complex programming languages.",
      ],
      gains: [
        "Step-by-step guidance to design beautiful, functional websites.",
        "Hands-on projects to create portfolio-worthy sites.",
        "Essential skills for website customization, SEO, and optimization.",
        "Confidence to manage and update your websites independently.",
      ],
    },
    {
      title: "E-Commerce and Dropshipping",
      summary: "Set up your online store and start selling with ease.",
      heading: "What you'll learn",
      points: [
        "Basics of e-commerce platforms.",
        "Finding profitable products and suppliers.",
        "Managing payments, shipping, and customer service.",
      ],
      idealFor: "Entrepreneurs and small business owners.",
      outcome: "A fully operational online store ready to generate income.",
    },
    {
      title: "Phone & Computer Repairs",
      summary: "Become the go-to tech expert by learning how to fix phones and computers like a pro.",
      heading: "Perfect for anyone who wants to",
      points: [
        "Start a lucrative career in device repairs.",
        "Save money by fixing their own gadgets.",
        "Understand the hardware and software that power phones and computers.",
      ],
      gains: [
        "Practical skills to troubleshoot and repair common phone and computer issues.",
        "Knowledge of hardware components, diagnostics, and replacements.",
        "Software repair techniques, including system updates and virus removal.",
        "A foundation to build a business or side hustle in device repair.",
      ],
    },
    {
      title: "Remote Jobs and Tools",
      summary: "Unlock the secrets to landing remote jobs and mastering the tools for success.",
      heading: "Designed for professionals, students, and freelancers who want to",
      points: [
        "Explore remote work opportunities in global markets.",
        "Master essential tools like Zoom, Slack, Google Workspace, and Trello.",
        "Learn to communicate effectively and manage tasks in remote teams.",
      ],
      gains: [
        "Insider tips to find and apply for remote job openings.",
        "Proficiency in tools used by remote workers worldwide.",
        "Time management and productivity strategies for remote success.",
        "Confidence to thrive in a remote work environment.",
      ],
    },
  ] satisfies HubCourse[],
  enrolment: {
    title: "Who can enrol in the trainings?",
    body: "Our trainings are open to students, graduates, entrepreneurs, professionals, and anyone who wants to upgrade their skills or start a career in ICT, business, or technical fields.",
  },
  nsq: {
    title: "TVET–NSQ skills training",
    intro:
      "NSQ means National Skills Qualification: a Nigerian system that focuses on what you can actually do, not only what you know in theory. Instead of long lectures, NSQ training is about hands-on practice, real projects, and showing that you can apply your skills in everyday life.",
    tracks: ["Computer Hardware Repairs & Maintenance", "Home Electrical Appliances Repairs"],
    facts: [
      { label: "Duration", value: "6 months" },
      { label: "Schedule", value: "Monday – Friday, 9am – 6pm" },
      { label: "Format", value: "Fully practical" },
      { label: "Certificate", value: "National Skills Qualification" },
    ],
    skills: [
      {
        title: "Computer Assembly and Servicing",
        body: "Put computers together from scratch, identify faulty parts, and keep desktops and laptops running smoothly.",
      },
      {
        title: "Operating System Installation and Troubleshooting",
        body: "From installing Windows to fixing system errors, set up and maintain the software side of computers.",
      },
      {
        title: "Printer and Peripheral Repairs",
        body: "Service and repair the printers, scanners, and other devices that offices and homes depend on.",
      },
      {
        title: "Small Appliance Repairs",
        body: "Repair and maintain fans, irons, kettles, blenders, and other household appliances safely and effectively.",
      },
      {
        title: "Large Appliance Servicing",
        body: "Troubleshoot and fix washing machines, refrigerators, and microwaves – a skill that is always in demand.",
      },
    ],
    why: [
      "Job-ready skills: employers can trust that an NSQ holder can actually perform the job.",
      "Entrepreneurship: start your own repair shop, freelance, or offer services in your community.",
      "National and global standard: NSQ is part of an international framework, so your skills can be recognised beyond Nigeria.",
      "Everyone can join: training starts from Level 1 for beginners and goes up step by step.",
    ],
  },
  trainers: {
    title: "Become a Trainer",
    body: "We're looking for experienced skills trainers and professionals to join our team and help train the next generation of digital workers.",
    whoCanApply: [
      "Experts in computer and phone repairs, web and app development, graphic design, AI, and more.",
      "Professionals with a passion for teaching and mentoring young people.",
      "Those who want to earn while sharing knowledge.",
    ],
    partnerQuestion: "Can organisations partner with EDAF ICT Hub?",
    partnerBody: "Yes. Organisations interested in partnering with the Hub on training, facilities, or programmes are welcome to reach out.",
  },
  partners: [
    "Ministry of Education",
    "Joint Admissions and Matriculation Board (JAMB)",
    "National Board for Technical Education (NBTE)",
  ],
  gallery: [photos.hubTrainingHall, photos.hubCbtPractice, photos.hubStemProgramme],
  contact: {
    addressLines: ["1 Edet Amana Crescent", "Oron, Akwa Ibom State", "Nigeria"],
    email: "info@edaficthub.com",
    mapHref: "https://www.google.com/maps/search/?api=1&query=1+Edet+Amana+Crescent+Oron+Akwa+Ibom+State+Nigeria",
    facebook: "https://www.facebook.com/edaficthub",
    topics: [
      "Training enrolment",
      "TVET–NSQ skills training",
      "CBT centre",
      "Become a trainer",
      "Partnership",
      "General enquiry",
    ],
  },
};

export type EventSeriesSlug = "public-lecture" | "christmas-carol";

export type EventSeries = {
  slug: EventSeriesSlug;
  title: string;
  shortTitle: string;
  summary: string;
  facts: { label: string; value: string }[];
  icon: string;
};

export const eventSeries: EventSeries[] = [
  {
    slug: "public-lecture",
    title: "Sir Edet Amana Annual Public Lecture",
    shortTitle: "Annual Public Lecture",
    summary:
      "An annual public lecture organised by the Edet Amana Foundation in partnership with the Nigerian Society of Engineers (NSE), Oron Branch.",
    facts: [
      { label: "Organised by", value: "Edet Amana Foundation" },
      { label: "In partnership with", value: "Nigerian Society of Engineers, Oron Branch" },
      { label: "Held", value: "Every year" },
    ],
    icon: "Award",
  },
  {
    slug: "christmas-carol",
    title: "Annual Christmas Carol at Oyubia",
    shortTitle: "Christmas Carol",
    summary:
      "An annual Christmas carol at Oyubia, where choirs from Christian denominations feature and compete for prizes.",
    facts: [
      { label: "Where", value: "Oyubia, Oron" },
      { label: "Who takes part", value: "Choirs from Christian denominations" },
      { label: "Prizes", value: "Awarded to the winning choirs" },
    ],
    icon: "Community",
  },
];

export function getEventSeries(slug: string) {
  return eventSeries.find((series) => series.slug === slug);
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  bio: string;
  skills: string[];
  certifications: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  timeline: string;
  description: string[];
  keyProjects: string[];
  logoText: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Grid Operations" | "Hotel Maintenance" | "Commercial & Kitchen" | "Safety & Custom";
  date: string;
  highlights: string[];
  imageUrl: string; // Dynamic CSS gradient or abstract SVG if not generated
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Control Panels" | "Distribution Boards" | "Hospitality Maintenance" | "Safety & Audits";
  description: string;
  imageUrl: string;
  specs: string[];
}

export interface PortfolioData {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  gallery: GalleryItem[];
}

export const defaultProfile: Profile = {
  name: "Jean Nepomuscene NIRERE",
  title: "Senior Electrical Infrastructure & Commercial Technician",
  location: "Kigali, Rwanda",
  phone: "+250 785 383 832",
  email: "jeannepomuscenenirere@gmail.com",
  bio: "Certified senior electrician with 8+ years of expertise. Specializes in medium-to-low voltage grid operations at REG, complex hospitality electrical systems at Onomo Hotel, and bespoke commercial/industrial automation at Azzurri and La Creola. Known for strict adherence to safety codes, high-efficiency grid wiring, and designing smart energy management systems.",
  skills: [
    "Medium & Low Voltage Distribution",
    "Substation & Transformer Maintenance",
    "Hospitality HVAC & Control Wiring",
    "Commercial Kitchen Electrical Systems",
    "Building Management Systems (BMS)",
    "Industrial Panel Wiring & PLC Programming",
    "Safety Inspection & Compliance Audits",
    "Emergency Generator & UPS Systems"
  ],
  certifications: [
    "REG Rwanda Electrical Installation License (Class A)",
    "Certified Energy Auditor (EAC Standard)",
    "Advanced Industrial Control Systems (IEC Standards)",
    "Occupational Safety & Health (OSHA) Certification"
  ]
};

export const defaultExperiences: Experience[] = [
  {
    id: "exp-1",
    company: "Rwanda Energy Group (REG)",
    role: "Grid Maintenance & Substation Technician",
    location: "Kigali, Rwanda",
    timeline: "2018 - 2021",
    description: [
      "Operated and maintained medium-voltage (30kV/11kV) substations and distribution transformers across Kigali district.",
      "Responded to emergency grid outages, successfully reducing average restoration times by 20% through swift diagnostics.",
      "Conducted standard testing on transformers, switchgear, and protective relays to ensure maximum grid uptime.",
      "Collaborated with safety engineers to implement local grid earthing and lightning protection upgrade programs."
    ],
    keyProjects: [
      "Nyabugogo Substation Switchgear Upgrade",
      "Gasabo District Power Quality Audit",
      "Overhead Grid Line Stabilization Project"
    ],
    logoText: "REG"
  },
  {
    id: "exp-2",
    company: "Onomo Hotel Kigali",
    role: "Lead Maintenance Electrician",
    location: "Kigali, Rwanda",
    timeline: "2021 - 2023",
    description: [
      "Directed electrical maintenance and automated climate/lighting controls for a 109-room luxury hotel.",
      "Managed the standby diesel generator (500kVA) and emergency UPS systems, securing 100% backup power reliability.",
      "Optimized hotel HVAC chiller panels and pool heating electrical systems, cutting hotel energy bills by 12%.",
      "Maintained smart card key door access controls, kitchen utility feeds, and outdoor high-mast safety lighting."
    ],
    keyProjects: [
      "Standby Generator synchronization panel project",
      "Smart HVAC chiller control refit",
      "Solar Water Heating backup wiring"
    ],
    logoText: "OH"
  },
  {
    id: "exp-3",
    company: "Azzurri Restaurant & Group",
    role: "Commercial Electrical Systems Specialist",
    location: "Kigali, Rwanda",
    timeline: "2023 - 2025",
    description: [
      "Designed and executed high-load power layouts for commercial Italian kitchen appliances (convection ovens, walk-in chillers).",
      "Programmed and installed customized dynamic ambient restaurant lighting systems controlled via tablet UI.",
      "Maintained heavy duty exhaust ventilation systems and three-phase power lines for all cold-storage and cooking facilities.",
      "Implemented comprehensive surge protection for sensitive electronic POS, network, and audio equipment."
    ],
    keyProjects: [
      "Commercial Kitchen 3-Phase Power Distribution",
      "Smart Ambient Lighting Zone Automation",
      "Walk-in Freezer Emergency Power Cutover"
    ],
    logoText: "AZ"
  },
  {
    id: "exp-4",
    company: "La Creola",
    role: "Consultant Commercial Electrician",
    location: "Kigali, Rwanda",
    timeline: "2025 - Present",
    description: [
      "Currently serving as chief electrical technician, performing full safety audits and panel upgrades.",
      "Redesigned the entire main distribution board (MDB) to balance multi-phase loads and prevent peak-time breaker trips.",
      "Installed energy-efficient LED light tracks and custom outdoor lighting to elevate customer dining experiences.",
      "Configured automated backup generator cut-off relays to ensure seamless transitions during grid fluctuations."
    ],
    keyProjects: [
      "Main Distribution Panel Overhaul",
      "Acoustic Live Stage Power Integration",
      "Emergency Generator Auto-Transfer Switch installation"
    ],
    logoText: "LC"
  }
];

export const defaultProjects: Project[] = [
  {
    id: "proj-1",
    title: "Nyabugogo Substation Switchgear Upgrade",
    description: "Led the rewiring and safety instrumentation for a major substation switchgear replacement under REG. This project increased local distribution capacity and modernized emergency trip relays.",
    category: "Grid Operations",
    date: "2020-11-14",
    highlights: [
      "Wired 30kV protective relays",
      "Verified breaker tripping speeds (<50ms)",
      "Aligned operations with REG utility codes"
    ],
    imageUrl: "grid"
  },
  {
    id: "proj-2",
    title: "Onomo Hotel Generator Sync Panel Integration",
    description: "Designed and configured a dual generator synchronization panel allowing seamless automatic transfer during grid outages, ensuring guests face zero power disruptions.",
    category: "Hotel Maintenance",
    date: "2022-08-05",
    highlights: [
      "Programmed ATS (Auto-Transfer Switch) controller",
      "Integrated 500kVA generator control unit",
      "Tested load-sharing curves under full occupancy"
    ],
    imageUrl: "hotel"
  },
  {
    id: "proj-3",
    title: "Azzurri Smart Lighting & Commercial Kitchen Power",
    description: "Installed a bespoke three-phase power grid for high-capacity pizza ovens and refrigeration units. Programmed wireless tablet-controlled smart lighting for dining areas.",
    category: "Commercial & Kitchen",
    date: "2024-03-20",
    highlights: [
      "Three-phase load balancing to prevent phase overload",
      "Low-voltage LED driver integration",
      "Dedicated surge protection zones for POS terminals"
    ],
    imageUrl: "kitchen"
  },
  {
    id: "proj-4",
    title: "La Creola Main Distribution Panel Rebuild",
    description: "Overhauled a legacy power distribution board. Solved frequent breaker tripping issues by implementing systematic phase balancing, introducing new safety breakers, and upgrading grounding.",
    category: "Safety & Custom",
    date: "2025-05-10",
    highlights: [
      "Replaced outdated fuses with MCB and RCD safety breakers",
      "Rerouted main feeder lines for clean layout",
      "Certified system safety with official electrical compliance audit"
    ],
    imageUrl: "safety"
  }
];

export const defaultGalleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "SBW-50KVA Automatic Voltage Regulator",
    category: "Control Panels",
    description: "Installation and calibration of high-capacity SBW-50KVA voltage compensation panel for stabilizing commercial multi-phase supply against grid fluctuations.",
    imageUrl: "/gallery/voltage-regulator.jpg",
    specs: ["50KVA Capacity", "Three-Phase Automatic", "Volt/Ammeter Gauges"]
  },
  {
    id: "gal-2",
    title: "Hospitality HVAC & Climate Control Unit",
    category: "Hospitality Maintenance",
    description: "On-site servicing, electrical coil check, and control wiring for luxury hotel air conditioning climate systems.",
    imageUrl: "/gallery/hvac-maintenance.jpg",
    specs: ["Split-System Servicing", "Precision Climate Wiring", "Safety Compliant"]
  },
  {
    id: "gal-3",
    title: "Industrial DIN-Rail Circuit Control Panel",
    category: "Distribution Boards",
    description: "Precision wiring of CHNT circuit breakers, automatic switch timers, and color-coded multi-phase power distribution lines.",
    imageUrl: "/gallery/circuit-breakers.jpg",
    specs: ["CHNT Modular Breakers", "IEC Standard Wiring", "Phase Isolation"]
  },
  {
    id: "gal-4",
    title: "Substation Ground Resistance Testing",
    category: "Safety & Audits",
    description: "Field measurements using digital earth resistance tester to verify low-resistance ground protection and lightning dissipation.",
    imageUrl: "/gallery/ground-testing.jpg",
    specs: ["Digital Resistance Tester", "OSHA Safety Compliant", "Substation Protection"]
  },
  {
    id: "gal-5",
    title: "250A Three-Phase Main Power Busbar Block",
    category: "Distribution Boards",
    description: "Heavy gauge power terminal connection block for Standby and Common power input switching with color-coded Phase A, B, C, and Neutral lugs.",
    imageUrl: "/gallery/three-phase-distribution.jpg",
    specs: ["250A Rating", "Standby/Common Cutover", "High-Torque Terminal Lugs"]
  }
];


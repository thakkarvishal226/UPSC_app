export type TopicStatus = "Not Started" | "In Progress" | "Completed" | "Revised";

export interface SyllabusTopic {
  id: string;
  title: string;
  subtopics?: SyllabusTopic[];
  status: TopicStatus;
  resources?: {
    title: string;
    url: string;
    type: "video" | "article" | "pdf";
  }[];
  lastRevised?: string; // ISO date string
  nextRevisionDate?: string; // ISO date string
  revisionCount?: number;
  masteryLevel?: 1 | 2 | 3 | 4 | 5; // 1-5 stars
}

export const INITIAL_SYLLABUS: SyllabusTopic[] = [
  {
    id: "gs1",
    title: "General Studies I",
    status: "Not Started",
    subtopics: [
      {
        id: "gs1-history",
        title: "History",
        status: "Not Started",
        subtopics: [
          {
            id: "gs1-history-ancient",
            title: "Ancient History",
            status: "Not Started",
            subtopics: [
              { id: "gs1-history-ancient-indus", title: "Indus Valley Civilization", status: "Not Started" },
              { id: "gs1-history-ancient-vedic", title: "Vedic Age", status: "Not Started" },
              { id: "gs1-history-ancient-buddhism", title: "Buddhism & Jainism", status: "Not Started" },
              { id: "gs1-history-ancient-maurya", title: "Mauryan Empire", status: "Not Started" },
              { id: "gs1-history-ancient-gupta", title: "Gupta Empire", status: "Not Started" },
            ]
          },
          {
            id: "gs1-history-medieval",
            title: "Medieval History",
            status: "Not Started",
            subtopics: [
              { id: "gs1-history-medieval-delhi", title: "Delhi Sultanate", status: "Not Started" },
              { id: "gs1-history-medieval-mughal", title: "Mughal Empire", status: "Not Started" },
              { id: "gs1-history-medieval-bhakti", title: "Bhakti & Sufi Movements", status: "Not Started" },
            ]
          },
          {
            id: "gs1-history-modern",
            title: "Modern History",
            status: "Not Started",
            subtopics: [
              { id: "gs1-history-modern-1857", title: "Revolt of 1857", status: "Not Started" },
              { id: "gs1-history-modern-inc", title: "Formation of INC", status: "Not Started" },
              { id: "gs1-history-modern-gandhi", title: "Gandhian Era", status: "Not Started" },
              { id: "gs1-history-modern-partition", title: "Partition & Independence", status: "Not Started" },
            ]
          },
          {
            id: "gs1-history-art",
            title: "Art & Culture",
            status: "Not Started",
            subtopics: [
              { id: "gs1-history-art-architecture", title: "Architecture", status: "Not Started" },
              { id: "gs1-history-art-sculpture", title: "Sculpture", status: "Not Started" },
              { id: "gs1-history-art-painting", title: "Painting", status: "Not Started" },
            ]
          }
        ]
      },
      {
        id: "gs1-geography",
        title: "Geography",
        status: "Not Started",
        subtopics: [
          { id: "gs1-geography-physical", title: "Physical Geography", status: "Not Started" },
          { id: "gs1-geography-human", title: "Human Geography", status: "Not Started" },
          { id: "gs1-geography-indian", title: "Indian Geography", status: "Not Started" },
        ]
      },
      {
        id: "gs1-society",
        title: "Indian Society",
        status: "Not Started",
        subtopics: [
          { id: "gs1-society-diversity", title: "Diversity of India", status: "Not Started" },
          { id: "gs1-society-women", title: "Role of Women", status: "Not Started" },
          { id: "gs1-society-poverty", title: "Poverty & Development", status: "Not Started" },
          { id: "gs1-society-urbanization", title: "Urbanization", status: "Not Started" },
          { id: "gs1-society-globalization", title: "Globalization", status: "Not Started" },
        ]
      }
    ]
  },
  {
    id: "gs2",
    title: "General Studies II",
    status: "Not Started",
    subtopics: [
      {
        id: "gs2-polity",
        title: "Polity & Constitution",
        status: "Not Started",
        subtopics: [
          { id: "gs2-polity-preamble", title: "Preamble", status: "Not Started" },
          { id: "gs2-polity-fr", title: "Fundamental Rights", status: "Not Started" },
          { id: "gs2-polity-dpsp", title: "DPSP", status: "Not Started" },
          { id: "gs2-polity-parliament", title: "Parliament", status: "Not Started" },
          { id: "gs2-polity-judiciary", title: "Judiciary", status: "Not Started" },
        ]
      },
      {
        id: "gs2-governance",
        title: "Governance",
        status: "Not Started",
        subtopics: [
          { id: "gs2-governance-policies", title: "Government Policies", status: "Not Started" },
          { id: "gs2-governance-ngo", title: "NGOs & SHGs", status: "Not Started" },
          { id: "gs2-governance-welfare", title: "Welfare Schemes", status: "Not Started" },
        ]
      },
      {
        id: "gs2-ir",
        title: "International Relations",
        status: "Not Started",
        subtopics: [
          { id: "gs2-ir-neighbors", title: "India & Neighbors", status: "Not Started" },
          { id: "gs2-ir-groupings", title: "Regional Groupings", status: "Not Started" },
          { id: "gs2-ir-institutions", title: "International Institutions", status: "Not Started" },
        ]
      }
    ]
  },
  {
    id: "gs3",
    title: "General Studies III",
    status: "Not Started",
    subtopics: [
      {
        id: "gs3-economy",
        title: "Economy",
        status: "Not Started",
        subtopics: [
          { id: "gs3-economy-planning", title: "Planning & Growth", status: "Not Started" },
          { id: "gs3-economy-budgeting", title: "Budgeting", status: "Not Started" },
          { id: "gs3-economy-agriculture", title: "Agriculture", status: "Not Started" },
          { id: "gs3-economy-industry", title: "Industry & Infrastructure", status: "Not Started" },
        ]
      },
      {
        id: "gs3-tech",
        title: "Science & Technology",
        status: "Not Started",
        subtopics: [
          { id: "gs3-tech-space", title: "Space Technology", status: "Not Started" },
          { id: "gs3-tech-bio", title: "Biotechnology", status: "Not Started" },
          { id: "gs3-tech-nano", title: "Nanotechnology", status: "Not Started" },
          { id: "gs3-tech-robotics", title: "Robotics & AI", status: "Not Started" },
        ]
      },
      {
        id: "gs3-environment",
        title: "Environment & Ecology",
        status: "Not Started",
        subtopics: [
          { id: "gs3-environment-biodiversity", title: "Biodiversity", status: "Not Started" },
          { id: "gs3-environment-climate", title: "Climate Change", status: "Not Started" },
          { id: "gs3-environment-pollution", title: "Pollution", status: "Not Started" },
        ]
      },
      {
        id: "gs3-security",
        title: "Internal Security",
        status: "Not Started",
        subtopics: [
          { id: "gs3-security-terrorism", title: "Terrorism & Extremism", status: "Not Started" },
          { id: "gs3-security-cyber", title: "Cyber Security", status: "Not Started" },
          { id: "gs3-security-border", title: "Border Management", status: "Not Started" },
        ]
      },
       {
        id: "gs3-disaster",
        title: "Disaster Management",
        status: "Not Started",
        subtopics: [
             { id: "gs3-disaster-types", title: "Types of Disasters", status: "Not Started" },
             { id: "gs3-disaster-management", title: "Disaster Management Framework", status: "Not Started" },
        ]
      }
    ]
  },
  {
    id: "gs4",
    title: "General Studies IV",
    status: "Not Started",
    subtopics: [
      {
        id: "gs4-ethics",
        title: "Ethics, Integrity & Aptitude",
        status: "Not Started",
        subtopics: [
          { id: "gs4-ethics-human", title: "Human Interface", status: "Not Started" },
          { id: "gs4-ethics-attitude", title: "Attitude", status: "Not Started" },
          { id: "gs4-ethics-aptitude", title: "Aptitude for Civil Services", status: "Not Started" },
          { id: "gs4-ethics-ei", title: "Emotional Intelligence", status: "Not Started" },
          { id: "gs4-ethics-moral", title: "Moral Thinkers", status: "Not Started" },
          { id: "gs4-ethics-probity", title: "Probity in Governance", status: "Not Started" },
          { id: "gs4-ethics-case", title: "Case Studies", status: "Not Started" },
        ]
      }
    ]
  }
];

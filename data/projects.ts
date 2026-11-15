import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "youbelong",
    title: "YOUBELONG",
    category: "Prototype",
    period: "2026 – Present",
    role: "Co-Founder",
    summary:
      "A campus community product connecting students with trusted info from clubs, faculty and businesses.",
    problem:
      "Students lacked a trusted source for campus events, while organisers lacked a channel to reach them.",
    approach: [
      "Interviewed and surveyed students, then spoke with faculty and local businesses.",
      "Chose an independent product over a university-run function to ship and prove demand first.",
      "Built an organiser dashboard with AI trained on past event designs.",
    ],
    outcome: ["£2,000 in seed funding", "Two accelerator awards", "10+ organisers committed before launch"],
  },
  {
    slug: "evzing",
    title: "EVZING",
    category: "Workflow",
    period: "2025 – Present",
    role: "Editor",
    summary: "A live industry news product covering China's electric vehicle market.",
    problem: "EV readers wanted sharp, data-led coverage of technology, policy and consumer demand.",
    approach: [
      "Launched EVZING and used analytics to see which stories held readers.",
      "Treated the site as a learning loop, adjusting coverage against traffic and engagement.",
    ],
    outcome: ["20+ data-driven reports", "Editorial decisions driven by reader data"],
  },
  {
    slug: "dormvibe",
    title: "DormVibe",
    category: "Prototype",
    period: "MiniMax Hackathon",
    role: "Team Lead (4)",
    summary: "A multimodal AI room-design tool linking every recommended item straight to its seller.",
    problem: "Students decorating rooms couldn't go from inspiration to purchase easily.",
    approach: [
      "Led a team of four to build a multimodal AI design tool.",
      "Linked every recommended item directly to its seller.",
    ],
    outcome: ["Most Promising Business Award"],
  },
  {
    slug: "logistic-regression",
    title: "LendingClub default",
    category: "Data",
    period: "2026",
    role: "Analyst",
    summary: "Which Lending Club loans are worth funding, once a probability becomes a bet.",
    problem:
      "An investor decides which accepted loans to fund. The outcome is a yes or no charge-off, so the model has to give a probability.",
    approach: [
      "Fit logistic regression from income, then add term, grade, and loan amount.",
      "Penalise a wider model and keep the one with the higher validation ROC-AUC.",
      "Turn that probability into a funding rule and read the profit on loans the model did not train on.",
    ],
    outcome: [
      "Validation ROC-AUC 0.697 for the spline LASSO, against 0.685 for logistic2.",
      "At cutoff 0.1625, validation profit is $4.27 per candidate.",
      "The LASSO’s top 700 loans return 24.59%.",
    ],
  },
];

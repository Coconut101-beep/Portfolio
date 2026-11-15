import type { Project } from "@/types/content";

/**
 * Hand-authored + Data-synced projects.
 * Educational entries sourced from Coconut101-beep/Data — real metrics only.
 * Run `npm run sync:data-projects` to refresh Data-backed fields (see docs/data-portfolio-project-workflow.md).
 */
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
    cardTone: "teal",
  },
  {
    slug: "logistic-regression",
    title: "Lending Club Defaults",
    category: "Educational",
    period: "2026",
    role: "Analyst",
    method: "Classification · Logistic regression",
    dataProjectId: "lending-club-defaults",
    summary:
      "Lending Club loans issued June 2007–December 2011, from an investor’s point of view: which loans are worth funding when the label is charge-off.",
    problem:
      "An investor choosing which loans to fund needs a probability of charge-off that stays between 0 and 1, then a funding rule that maximises expected profit — not accuracy against an always-paid baseline.",
    approach: [
      "Cleaned the course extract (skip prospectus row; drop missing interest rate) to 37,869 loans; mapped Charged Off / Fully Paid to a binary label (5,429 defaults, 14.34%).",
      "Fit logistic1 (income only) then logistic2 (income, term, grade, loan amount) as binomial GLMs; loan amount was not significant after the other terms (p = 0.226).",
      "Checked out-of-sample: 80/20 split AUC 0.6804 in-sample vs 0.6779 test; noise columns widened the gap, so the wider model is penalised.",
      "Chose a cubic-spline + L1 logistic pipeline by stratified 5-fold AUC on train only; compared models on a 60/20/20 validation split (seed 1111).",
      "Picked funding cutoffs and portfolios on validation profit / expected return — never on the held-out test outcomes for model choice.",
    ],
    outcome: [
      "logistic2 validation ROC-AUC 0.685; LASSO-with-splines 0.697 (bootstrap gain +0.006 to +0.019)",
      "Flat payoff rule (+$15 / −$75): validation cutoff 16.25%, $4.27 profit per candidate loan",
      "Top-700 by expected return (60% loss on default): logistic2 21.54% realised return; LASSO 24.59%",
      "Interactive walkthrough published in the Data repo (charts, cutoff bar, portfolio scrubber)",
    ],
    technical:
      "scikit-learn pipeline: cubic splines (5 knots) on numerics, one-hot categories, scaler, L1 logistic with C = 0.0215 (30 of 76 terms kept; CV AUC 0.6836). Issue date, purpose, state, zip, employer title and description left out of the kept model so assessment loans can be scored. K-means was considered and dropped. Notebook outputs dated 2 November 2026.",
    links: {
      repo: "https://github.com/Coconut101-beep/Data",
      notebook: "https://github.com/Coconut101-beep/Data/blob/main/notebooks/AM04_Project1_Chuni.ipynb",
      demo: "/projects/logistic-regression",
      writeup: "https://github.com/Coconut101-beep/Data/blob/main/docs/phase-0-audit.md",
      related: "https://github.com/Coconut101-beep/DataCrunch",
      primary: "demo",
    },
    sections: [
      {
        id: "label",
        heading: "The label",
        paragraphs: [
          "The file’s first row is a prospectus note, so the header is the second row. Loans with no interest rate are dropped. loan_status becomes the label: Charged Off is 1 and Fully Paid is 0. After cleaning: 37,869 loans issued June 2007 to December 2011; 5,429 charged off (14.34%).",
          "Default rises with grade (A 6.0% through G 32.2%) and with term (36 months 11.1%, 60 months 23.0%). Installment and loan amount correlate at 0.96; grade and interest rate overlap. Home ownership does not separate cleanly.",
        ],
      },
      {
        id: "why-logistic",
        heading: "Why logistic regression",
        paragraphs: [
          "The question is yes or no: will this loan be charged off. An investor needs a probability between 0 and 1. A straight line on income can give a negative probability once income is high enough, and it treats each extra dollar as the same reduction in risk. Logistic regression passes the score through a logit so the probability stays in range, and an extra dollar of income matters more at low incomes than at high ones.",
        ],
      },
      {
        id: "models",
        heading: "logistic1, then logistic2, then the model we kept",
        paragraphs: [
          "logistic1 is income only. logistic2 keeps income and adds term, grade and loan amount — facts known when the loan is offered. On the full cleaned sample, residual deviance falls from 31,005 (logistic1) to 29,286 (logistic2). Term, every grade, and income have p-values below 0.001; loan amount does not (p = 0.226).",
          "The kept model adds interest rate, installment, debt-to-income, delinquencies, employment length, home ownership, income verification and payment-to-income, with cubic splines and an L1 penalty. Validation ROC-AUC: logistic2 0.685 vs LASSO 0.697. Pairwise interactions did not raise cross-validated AUC and were left out.",
        ],
      },
      {
        id: "decision",
        heading: "Prediction and the investment",
        paragraphs: [
          "Under a flat +$15 / −$75 payoff, the validation profit peak is at a 16.25% cutoff (just under the break-even probability 15/90 ≈ 0.167). That rule funds 5,121 of 7,574 validation loans and makes $4.27 per candidate.",
          "When each loan keeps its own interest and a default loses 60% of principal, $1 in every validation loan returns 11.04%. Ranking by expected return and funding the top 700 yields 21.54% (logistic2) or 24.59% (LASSO). ROC-AUC treats every loan the same; the portfolio only buys the top of a ranking that mixes probability with promised return.",
        ],
      },
    ],
    cardTone: "coral",
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
    cardTone: "gold",
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
    cardTone: "green",
  },
];

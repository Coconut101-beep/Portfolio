import type { Book, BookshelfPageCopy } from "@/types/content";

export type OrbitBook = Book & {
  genres: string[];
  genre?: string;
  coverUrl?: string;
  description?: string;
  rating?: number;
  publicationYear?: number;
  readingStatus?: "unread" | "reading" | "completed";
  keyTakeaways?: string[];
};

export const orbitalLibraryCopy = {
  title: "3D Book Library",
  genreHeading: "Browse by genre",
  all: "All Books",
  uncategorized: "Uncategorized",
  filter: "Genres",
  previous: "Previous book",
  next: "Next book",
  hint: "Scroll or drag to browse",
  pauseRotation: "Pause rotation",
  resumeRotation: "Resume rotation",
  open: "Open book details",
  close: "Close",
  empty: "There are no books in this genre yet.",
  position: "{current} of {total}",
  notes: "Reading notes",
  takeaways: "Key takeaways",
  status: { unread: "Unread", reading: "Reading", completed: "Completed" },
};

export const bookshelfPage: BookshelfPageCopy = {
  eyebrow: "Bookshelf confessions",
  title: "Room for one more",
  subtitle: "Follow along for weekly reading picks.",
  shelfLead: "Notes from the shelf. Click a spine. Rows grow as books are added.",
  roomForOneMoreLabel: "Room for one more",
};

/** Spine colours stay fixed here (design-guide bookshelf palette). */
export const books: Book[] = [
  {
    id: "molecule-of-more",
    title: "The Molecule of More",
    authors: "Daniel Z. Lieberman & Michael E. Long",
    spineLabel: "Molecule of More",
    spineColor: "teal",
    stature: "tall",
    note: [
      "My second neuroscience book, and it's the one that really made me understand dopamine: what it drives, and what it costs.",
      "Desire dopamine works the way it does in addiction: you chase the high and get less and less buzz from it.",
      "What I'm taking away is that the chemicals driving my emotions also drive my decisions.",
    ],
    quote:
      "If we are able to enmingle dopamine with H&N, we can achieve harmony. All dopamine all the time is not the path to the best possible future.",
  },
  {
    id: "book-9780143037880",
    title: "LOREM: Penguin spine",
    authors: "LOREM Author",
    spineLabel: "Penguin LOREM",
    spineColor: "coral",
    stature: "regular",
    note: ["LOREM — replace with your note for ISBN 9780143037880."],
  },
  {
    id: "book-9780399562761",
    title: "LOREM: Riverhead spine",
    authors: "LOREM Author",
    spineLabel: "Riverhead",
    spineColor: "rose",
    stature: "short",
    note: ["LOREM — replace with your note for ISBN 9780399562761."],
  },
  {
    id: "book-9780451499066",
    title: "LOREM: Crown spine",
    authors: "LOREM Author",
    spineLabel: "Crown LOREM",
    spineColor: "gold",
    stature: "tall",
    note: ["LOREM — replace with your note for ISBN 9780451499066."],
  },
  {
    id: "book-9780593135204",
    title: "LOREM: Random House spine",
    authors: "LOREM Author",
    spineLabel: "Random House",
    spineColor: "green",
    stature: "regular",
    note: ["LOREM — replace with your note for ISBN 9780593135204."],
  },
  {
    id: "book-9781984819192",
    title: "LOREM: Dial Press spine",
    authors: "LOREM Author",
    spineLabel: "Dial Press",
    spineColor: "teal",
    stature: "short",
    note: ["LOREM — replace with your note for ISBN 9781984819192."],
  },
  {
    id: "book-9781984822178",
    title: "LOREM: Ballantine spine",
    authors: "LOREM Author",
    spineLabel: "Ballantine",
    spineColor: "coral",
    stature: "regular",
    note: ["LOREM — replace with your note for ISBN 9781984822178."],
  },
  {
    id: "lorem-essay-stack",
    title: "LOREM: Essays on the desk",
    authors: "LOREM Author",
    spineLabel: "Essays",
    spineColor: "rose",
    stature: "short",
    note: ["LOREM — another confession for the shelf."],
  },
  {
    id: "lorem-policy",
    title: "LOREM: Soft power notes",
    authors: "LOREM Author",
    spineLabel: "Soft Power",
    spineColor: "ink",
    stature: "tall",
    note: ["LOREM — policy / econ reading placeholder."],
  },
  {
    id: "lorem-fiction-1",
    title: "LOREM: Night train fiction",
    authors: "LOREM Author",
    spineLabel: "Night Train",
    spineColor: "gold",
    stature: "regular",
    note: ["LOREM — fiction placeholder."],
  },
  {
    id: "lorem-fiction-2",
    title: "LOREM: Harbour novel",
    authors: "LOREM Author",
    spineLabel: "Harbour",
    spineColor: "green",
    stature: "short",
    note: ["LOREM — fiction placeholder."],
  },
  {
    id: "lorem-tech",
    title: "LOREM: Systems & people",
    authors: "LOREM Author",
    spineLabel: "Systems",
    spineColor: "teal",
    stature: "tall",
    note: ["LOREM — tech / product reading placeholder."],
  },
  {
    id: "lorem-travel",
    title: "LOREM: Coast roads",
    authors: "LOREM Author",
    spineLabel: "Coast Roads",
    spineColor: "coral",
    stature: "regular",
    note: ["LOREM — travel placeholder."],
  },
  {
    id: "lorem-poetry",
    title: "LOREM: Thin poetry",
    authors: "LOREM Author",
    spineLabel: "Poetry",
    spineColor: "paper",
    stature: "short",
    note: ["LOREM — poetry placeholder."],
  },
];

type OrbitalBookEntry = Pick<OrbitBook, "title" | "authors"> & Partial<Omit<OrbitBook, "title" | "authors">> & {
  notes?: string | string[];
};

// Edit this list to choose what appears on the globe. Only title and authors are required.
// Put cover files in public/bookshelf/ and use a path such as /bookshelf/book-cover.jpg.
// Example entry:
// {
//   title: "Book title",
//   authors: "Author name",
//   notes: "Your reading notes",
//   coverUrl: "/bookshelf/book-cover.jpg",
//   genres: ["Fiction"],
// },
// Use an array of strings for multiple note paragraphs.
const orbitalBookEntries: OrbitalBookEntry[] = [
  {
    id: "molecule-of-more",
    title: "The Molecule of More",
    authors: "Daniel Z. Lieberman & Michael E. Long",
    genres: ["Neuroscience"],
    spineColor: "teal",
    notes: [
      "My second neuroscience book, and it's the one that really made me understand dopamine: what it drives, and what it costs.",
      "Desire dopamine works the way it does in addiction: you chase the high and get less and less buzz from it.",
      "What I'm taking away is that the chemicals driving my emotions also drive my decisions.",
    ],
    quote:
      "If we are able to enmingle dopamine with H&N, we can achieve harmony. All dopamine all the time is not the path to the best possible future.",
  },
  {
    id: "book-9780143037880",
    title: "LOREM: Penguin spine",
    authors: "LOREM Author",
    spineColor: "coral",
    notes: "LOREM — replace with your note for ISBN 9780143037880.",
  },
  {
    id: "book-9780399562761",
    title: "LOREM: Riverhead spine",
    authors: "LOREM Author",
    spineColor: "rose",
    notes: "LOREM — replace with your note for ISBN 9780399562761.",
  },
  {
    id: "book-9780451499066",
    title: "LOREM: Crown spine",
    authors: "LOREM Author",
    spineColor: "gold",
    notes: "LOREM — replace with your note for ISBN 9780451499066.",
  },
  {
    id: "book-9780593135204",
    title: "LOREM: Random House spine",
    authors: "LOREM Author",
    spineColor: "green",
    notes: "LOREM — replace with your note for ISBN 9780593135204.",
  },
  {
    id: "book-9781984819192",
    title: "LOREM: Dial Press spine",
    authors: "LOREM Author",
    spineColor: "teal",
    notes: "LOREM — replace with your note for ISBN 9781984819192.",
  },
  {
    id: "book-9781984822178",
    title: "LOREM: Ballantine spine",
    authors: "LOREM Author",
    spineColor: "coral",
    notes: "LOREM — replace with your note for ISBN 9781984822178.",
  },
  {
    id: "lorem-essay-stack",
    title: "LOREM: Essays on the desk",
    authors: "LOREM Author",
    genres: ["Essays"],
    spineColor: "rose",
    notes: "LOREM — another confession for the shelf.",
  },
  {
    id: "lorem-policy",
    title: "LOREM: Soft power notes",
    authors: "LOREM Author",
    genres: ["Politics"],
    spineColor: "ink",
    notes: "LOREM — policy / econ reading placeholder.",
  },
  {
    id: "lorem-fiction-1",
    title: "LOREM: Night train fiction",
    authors: "LOREM Author",
    genres: ["Fiction"],
    spineColor: "gold",
    notes: "LOREM — fiction placeholder.",
  },
  {
    id: "lorem-fiction-2",
    title: "LOREM: Harbour novel",
    authors: "LOREM Author",
    genres: ["Fiction"],
    spineColor: "green",
    notes: "LOREM — fiction placeholder.",
  },
  {
    id: "lorem-tech",
    title: "LOREM: Systems & people",
    authors: "LOREM Author",
    genres: ["Technology"],
    spineColor: "teal",
    notes: "LOREM — tech / product reading placeholder.",
  },
  {
    id: "lorem-travel",
    title: "LOREM: Coast roads",
    authors: "LOREM Author",
    genres: ["Travel"],
    spineColor: "coral",
    notes: "LOREM — travel placeholder.",
  },
  {
    id: "lorem-poetry",
    title: "LOREM: Thin poetry",
    authors: "LOREM Author",
    genres: ["Poetry"],
    spineColor: "paper",
    notes: "LOREM — poetry placeholder.",
  },
];

export const orbitalBooks: OrbitBook[] = orbitalBookEntries.map(({ notes, ...entry }) => ({
  ...entry,
  id: entry.id ?? JSON.stringify([entry.title.trim(), entry.authors.trim()]),
  spineLabel: entry.spineLabel ?? entry.title,
  spineColor: entry.spineColor ?? "teal",
  genres: entry.genres ?? (entry.genre ? [entry.genre] : []),
  note: typeof notes === "string" ? [notes] : notes ?? entry.note ?? [],
}));

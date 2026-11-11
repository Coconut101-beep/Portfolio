import type { Book } from "@/types/content";

export const books: Book[] = [
  {
    id: "molecule-of-more",
    title: "The Molecule of More",
    authors: "Daniel Z. Lieberman & Michael E. Long",
    spineLabel: "Molecule of More",
    spineColor: "ocean",
    note: [
      "My second neuroscience book, and it's the one that really made me understand dopamine: what it drives, and what it costs.",
      "Desire dopamine works the way it does in addiction: you chase the high and get less and less buzz from it.",
      "What I'm taking away is that the chemicals driving my emotions also drive my decisions.",
    ],
    quote:
      "If we are able to enmingle dopamine with H&N, we can achieve harmony. All dopamine all the time is not the path to the best possible future.",
  },
  {
    id: "lorem-shelf-2",
    title: "LOREM: Second shelf title",
    authors: "LOREM Author",
    spineLabel: "LOREM Two",
    spineColor: "rose",
    note: ["LOREM — placeholder book note. Replace with a real reading note."],
  },
  {
    id: "lorem-shelf-3",
    title: "LOREM: Third shelf title",
    authors: "LOREM Author",
    spineLabel: "LOREM Three",
    spineColor: "gold",
    note: ["LOREM — placeholder book note."],
  },
  {
    id: "lorem-shelf-4",
    title: "LOREM: Fourth shelf title",
    authors: "LOREM Author",
    spineLabel: "LOREM Four",
    spineColor: "mint",
    note: ["LOREM — placeholder book note."],
  },
  {
    id: "lorem-shelf-5",
    title: "Room for one more",
    authors: "Bookshelf confessions",
    spineLabel: "One more",
    spineColor: "sky",
    note: [
      "LOREM inspired by the bookshelf poster: room for one more, follow along for weekly reading picks.",
    ],
  },
];

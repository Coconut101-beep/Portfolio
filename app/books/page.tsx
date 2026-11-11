import { Bookshelf } from "@/components/bookshelf/Bookshelf";
import { Label } from "@/components/ui/Label";
import { getBooks } from "@/lib/content";

export const metadata = {
  title: "Bookshelf",
};

export default function BooksPage() {
  const books = getBooks();
  return (
    <div>
      <Label>Bookshelf confessions</Label>
      <h1 style={{ margin: "var(--space-3) 0 var(--space-5)", fontSize: "var(--text-4xl)" }}>
        Room for one more
      </h1>
      <Bookshelf
        books={books}
        lead="Notes from the shelf — click a spine. Hover, keyboard arrows, Enter, and Esc all work; on small screens the note becomes a bottom sheet."
      />
    </div>
  );
}

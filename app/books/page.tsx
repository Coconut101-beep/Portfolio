import { Bookshelf } from "@/components/bookshelf/Bookshelf";
import { OrbitalLibrary } from "@/components/bookshelf/OrbitalLibrary";
import { getBooks, getBookshelfPage } from "@/lib/content";

export const metadata = {
  title: "Bookshelf",
};

export default function BooksPage() {
  return (
    <>
      <Bookshelf books={getBooks()} copy={getBookshelfPage()} />
      <OrbitalLibrary />
    </>
  );
}

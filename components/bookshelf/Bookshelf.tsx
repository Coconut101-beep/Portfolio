"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { Book, BookshelfPageCopy } from "@/types/content";
import styles from "./bookshelf.module.css";

type Props = {
  books: Book[];
  copy: BookshelfPageCopy;
};

const PER_SHELF = 7;

function chunkBooks(books: Book[], size: number) {
  const rows: Book[][] = [];
  for (let i = 0; i < books.length; i += size) rows.push(books.slice(i, i + size));
  return rows.length ? rows : [[]];
}

export function Bookshelf({ books, copy }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = books.find((b) => b.id === activeId) ?? null;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const bookRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const rows = useMemo(() => chunkBooks(books, PER_SHELF), [books]);

  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    function onKey(e: globalThis.KeyboardEvent) {
      if (e.key === "Escape") setActiveId(null);
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active]);

  function close() {
    const id = activeId;
    setActiveId(null);
    if (id) bookRefs.current[id]?.focus();
  }

  function onBookKeyDown(e: KeyboardEvent<HTMLButtonElement>, flatIndex: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = books[(flatIndex + 1) % books.length];
      if (next) bookRefs.current[next.id]?.focus();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = books[(flatIndex - 1 + books.length) % books.length];
      if (prev) bookRefs.current[prev.id]?.focus();
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveId(books[flatIndex]?.id ?? null);
    }
  }

  return (
    <div className={styles.page}>
      <p className={styles.introSub}>{copy.eyebrow}</p>
      <h1 className={styles.introTitle}>{copy.title}</h1>
      <p className={styles.introSub}>{copy.subtitle}</p>
      <p className={styles.shelfLead}>{copy.shelfLead}</p>

      <div className={styles.art}>
        <img src="/bookshelf/reader.png" alt="" />
      </div>

      <div className={styles.unit}>
        {rows.map((row, rowIndex) => {
          const isLast = rowIndex === rows.length - 1;
          return (
            <div
              key={`shelf-${rowIndex}`}
              className={styles.shelf}
              role="toolbar"
              aria-label={`Bookshelf row ${rowIndex + 1}`}
            >
              {row.map((book) => {
                const flatIndex = books.findIndex((b) => b.id === book.id);
                return (
                  <button
                    key={book.id}
                    ref={(el) => {
                      bookRefs.current[book.id] = el;
                    }}
                    type="button"
                    className={styles.book}
                    data-color={book.spineColor}
                    data-stature={book.stature ?? "regular"}
                    aria-haspopup="dialog"
                    aria-expanded={activeId === book.id}
                    onClick={() => setActiveId(book.id)}
                    onKeyDown={(e) => onBookKeyDown(e, flatIndex)}
                  >
                    {book.spineLabel}
                  </button>
                );
              })}
              {isLast ? (
                <div className={styles.ghost} aria-hidden="true">
                  {copy.roomForOneMoreLabel}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {active ? (
        <>
          <button type="button" className={styles.backdrop} aria-label="Close book note" onClick={close} />
          <div className={styles.card} role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <button ref={closeRef} type="button" className={styles.close} onClick={close}>
              Close
            </button>
            <h2 id={titleId}>{active.title}</h2>
            <p className={styles.authors}>{active.authors}</p>
            {active.note.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {active.quote ? <p className={styles.quote}>“{active.quote}”</p> : null}
          </div>
        </>
      ) : null}
    </div>
  );
}

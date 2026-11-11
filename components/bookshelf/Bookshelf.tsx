"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Book } from "@/types/content";
import styles from "./bookshelf.module.css";

type Props = {
  books: Book[];
  lead: string;
};

export function Bookshelf({ books, lead }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = books.find((b) => b.id === activeId) ?? null;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const bookRefs = useRef<Record<string, HTMLButtonElement | null>>({});

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

  function onBookKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = books[(index + 1) % books.length];
      if (next) bookRefs.current[next.id]?.focus();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = books[(index - 1 + books.length) % books.length];
      if (prev) bookRefs.current[prev.id]?.focus();
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveId(books[index]?.id ?? null);
    }
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.lead}>{lead}</p>
      <div className={styles.shelf} role="toolbar" aria-label="Bookshelf">
        {books.map((book, index) => (
          <button
            key={book.id}
            ref={(el) => {
              bookRefs.current[book.id] = el;
            }}
            type="button"
            className={styles.book}
            data-color={book.spineColor}
            aria-haspopup="dialog"
            aria-expanded={activeId === book.id}
            onClick={() => setActiveId(book.id)}
            onKeyDown={(e) => onBookKeyDown(e, index)}
          >
            {book.spineLabel}
          </button>
        ))}
      </div>

      {active ? (
        <>
          <button type="button" className={styles.backdrop} aria-label="Close book note" onClick={close} />
          <div
            className={styles.card}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            <button ref={closeRef} type="button" className={styles.close} onClick={close}>
              Esc
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

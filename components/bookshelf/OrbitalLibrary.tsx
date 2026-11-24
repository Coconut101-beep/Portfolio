"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import { orbitalBooks, orbitalLibraryCopy as copy, type OrbitBook } from "@/data/books";
import { mountOrbit, type OrbitHit } from "./orbit-controller";
import styles from "./orbital-library.module.css";

type Genre = { name: string | null; count: number };

function genresOf(book: OrbitBook) {
  return book.genres.length ? book.genres : [copy.uncategorized];
}

function filterBooks(books: OrbitBook[], selectedGenres: string[]) {
  if (!selectedGenres.length) return books;
  return books.filter((book) => genresOf(book).some((genre) => selectedGenres.includes(genre)));
}

function toggleGenre(selectedGenres: string[], name: string | null) {
  if (name === null) return [];
  if (selectedGenres.includes(name)) return selectedGenres.filter((genre) => genre !== name);
  return [...selectedGenres, name];
}

function GenreRows({ genres, selectedGenres, onSelect }: {
  genres: Genre[];
  selectedGenres: string[];
  onSelect: (name: string | null) => void;
}) {
  return (
    <ul className={styles.genres}>
      {genres.map(({ name, count }) => (
        <li key={name ?? ""}>
          <button
            type="button"
            aria-pressed={name === null ? !selectedGenres.length : selectedGenres.includes(name)}
            onClick={() => onSelect(name)}
            className={styles.genre}
          >
            <span className={name === null ? styles.allIcon : styles.genreIcon} aria-hidden="true" />
            <span>{name ?? copy.all}</span>
            <span className={styles.count}>{count}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function LibraryDialog({ open, onClose, titleId, kind, children }: {
  open: boolean;
  onClose: () => void;
  titleId: string;
  kind: "filter" | "detail";
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current!;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className={styles.dialog}
      data-kind={kind}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.dialogBody}>
        <button type="button" onClick={onClose} className={styles.close}>{copy.close}</button>
        {children}
      </div>
    </dialog>
  );
}

function Cover({ book }: { book: OrbitBook }) {
  const [failedUrl, setFailedUrl] = useState<string>();
  if (book.coverUrl && failedUrl !== book.coverUrl) {
    return (
      <Image
        className={styles.coverImage}
        src={book.coverUrl}
        width={120}
        height={180}
        alt=""
        unoptimized
        onError={() => setFailedUrl(book.coverUrl)}
      />
    );
  }
  return (
    <div className={styles.cover} data-color={book.spineColor} aria-hidden="true">
      <span>{book.title}</span>
      <i />
      <small>{book.authors}</small>
    </div>
  );
}

export function OrbitalLibrary({ books = orbitalBooks }: { books?: OrbitBook[] }) {
  const headingId = useId();
  const desktopId = useId();
  const filterId = useId();
  const detailId = useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbitRef = useRef<ReturnType<typeof mountOrbit> | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [frontPosition, setFrontPosition] = useState({ index: 0, announce: true });
  const [hover, setHover] = useState<OrbitHit | null>(null);
  const [available, setAvailable] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailBook, setDetailBook] = useState<OrbitBook | null>(null);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [frontFocused, setFrontFocused] = useState(false);

  const genres = useMemo(() => {
    const counts = new Map<string, number>();
    for (const book of books) {
      for (const genre of new Set(genresOf(book))) {
        counts.set(genre, (counts.get(genre) ?? 0) + 1);
      }
    }
    const ordered: Genre[] = Array.from(counts, ([name, count]) => ({ name, count }));
    ordered.sort((a, b) => a.name!.localeCompare(b.name!));
    return [{ name: null, count: books.length }, ...ordered];
  }, [books]);
  const filtered = useMemo(() => filterBooks(books, selectedGenres), [books, selectedGenres]);
  const frontIndex = frontPosition.index;
  const front = filtered[frontIndex] ?? filtered[0];

  useEffect(() => {
    const orbit = mountOrbit(canvasRef.current!, books, {
      onFront: (index, automatic = false) => {
        setFrontPosition({ index, announce: !automatic });
      },
      onHover: setHover,
      onOpen: (book) => {
        setDetailBook(book);
        setDetailOpen(true);
      },
      onAvailability: setAvailable,
    });
    orbitRef.current = orbit;
    return () => {
      orbit.dispose();
      orbitRef.current = null;
    };
  }, [books]);

  const autoPaused = rotationPaused || filtersOpen || detailOpen || frontFocused;
  useEffect(() => {
    orbitRef.current?.setAutoPaused(autoPaused);
  }, [autoPaused, books]);

  useEffect(() => {
    if (!hover) return;
    function dismiss(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") orbitRef.current?.dismissPreview();
    }
    window.addEventListener("keydown", dismiss);
    return () => window.removeEventListener("keydown", dismiss);
  }, [hover]);

  function filter(name: string | null) {
    if (name === null && !selectedGenres.length) return;
    const selection = toggleGenre(selectedGenres, name);
    const next = filterBooks(books, selection);
    setSelectedGenres(selection);
    if (detailBook && !next.some((book) => book.id === detailBook.id)) {
      setDetailOpen(false);
      setDetailBook(null);
    }
    orbitRef.current?.setBooks(next);
  }

  function openDetails(book: OrbitBook) {
    orbitRef.current?.clearHover();
    setDetailBook(book);
    setDetailOpen(true);
  }

  function onCarouselKey(event: KeyboardEvent<HTMLDivElement>) {
    if (filtered.length < 2 || (event.key !== "ArrowLeft" && event.key !== "ArrowRight")) return;
    event.preventDefault();
    orbitRef.current?.step(event.key === "ArrowLeft" ? -1 : 1);
  }

  const position = copy.position.replace("{current}", String(frontIndex + 1)).replace("{total}", String(filtered.length));
  const previewStyle = hover ? {
    "--orbit-preview-x": (hover.x * 100 + (hover.x < 0.53 ? 11 : -46)) + "%",
    "--orbit-preview-y": (hover.y * 100 - 40) + "%",
  } as CSSProperties : undefined;

  return (
    <section className={styles.library} aria-labelledby={headingId}>
      <div className={styles.layout} data-orbit-layout="">
        <header className={styles.header}>
          <h2 id={headingId}>{copy.title}</h2>
          <button type="button" className={styles.filterButton} aria-haspopup="dialog" onClick={() => {
            orbitRef.current?.clearHover();
            setFiltersOpen(true);
          }}>
            {copy.filter}
            <span aria-hidden="true" className={styles.filterIcon} />
          </button>
        </header>

        <div className={styles.content}>
          <aside className={styles.sidebar} aria-labelledby={desktopId}>
            <h3 id={desktopId}>{copy.genreHeading}</h3>
            <GenreRows genres={genres} selectedGenres={selectedGenres} onSelect={filter} />
          </aside>

          <div className={styles.browse} onKeyDown={onCarouselKey}>
            <div className={styles.scene} data-available={available}>
              <div className={styles.floorShadow} aria-hidden="true" />
              <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
              {!available ? <div className={styles.flatSphere} aria-hidden="true" /> : null}
              {!available && front ? (
                <button type="button" className={styles.flatCover} onClick={() => openDetails(front)} aria-label={front.title + ". " + copy.open}>
                  <Cover key={front.id} book={front} />
                </button>
              ) : null}
              {!front ? <p className={styles.empty}>{copy.empty}</p> : null}
              {hover ? (
                <div className={styles.preview} style={previewStyle} aria-hidden="true">
                  <h3>{hover.book.title}</h3>
                  <p>{hover.book.authors} · {genresOf(hover.book).join(", ")}{hover.book.rating !== undefined ? " · " + hover.book.rating : ""}</p>
                  {hover.book.note[0] ? <p className={styles.previewNote}>{hover.book.note[0]}</p> : null}
                  <span>{copy.open}</span>
                </div>
              ) : null}
            </div>

            {front ? (
              <div className={styles.navigation}>
                <div className={styles.controls}>
                  <button type="button" className={styles.arrow} aria-label={copy.previous} disabled={filtered.length < 2} onClick={() => orbitRef.current?.step(-1)}>
                    <span className={styles.chevron} />
                  </button>
                  <button
                    type="button"
                    className={styles.frontBook}
                    aria-haspopup="dialog"
                    aria-label={front.title + ". " + copy.open}
                    onFocus={() => setFrontFocused(true)}
                    onBlur={() => setFrontFocused(false)}
                    onClick={() => openDetails(front)}
                  >
                    {front.title}
                  </button>
                  <button type="button" className={styles.arrow} aria-label={copy.next} disabled={filtered.length < 2} onClick={() => orbitRef.current?.step(1)}>
                    <span className={styles.chevron} />
                  </button>
                </div>
                <p className={styles.meta}>
                  {available && filtered.length > 1 ? <span>{copy.hint}</span> : null}
                  <span aria-live={frontPosition.announce ? "polite" : "off"}>
                    {position} · {selectedGenres.join(", ") || copy.all}
                  </span>
                  {available ? (
                    <button type="button" className={styles.rotationToggle} onClick={() => setRotationPaused(!rotationPaused)}>
                      {rotationPaused ? copy.resumeRotation : copy.pauseRotation}
                    </button>
                  ) : null}
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <LibraryDialog open={filtersOpen} titleId={filterId} kind="filter" onClose={() => setFiltersOpen(false)}>
          <h3 id={filterId}>{copy.genreHeading}</h3>
          <GenreRows genres={genres} selectedGenres={selectedGenres} onSelect={filter} />
        </LibraryDialog>
        <LibraryDialog open={detailOpen} titleId={detailId} kind="detail" onClose={() => setDetailOpen(false)}>
          {detailBook ? (
            <>
              <div className={styles.detailHeader}>
                <Cover key={detailBook.id} book={detailBook} />
                <div>
                  <h3 id={detailId}>{detailBook.title}</h3>
                  <p>{detailBook.authors}</p>
                  <p>{[genresOf(detailBook).join(", "), detailBook.publicationYear, detailBook.readingStatus && copy.status[detailBook.readingStatus], detailBook.rating].filter((value) => value !== undefined).join(" · ")}</p>
                </div>
              </div>
              {detailBook.description ? <p>{detailBook.description}</p> : null}
              {detailBook.note.length ? (
                <div className={styles.details}>
                  <h4>{copy.notes}</h4>
                  {detailBook.note.map((note, index) => <p key={index}>{note}</p>)}
                </div>
              ) : null}
              {detailBook.quote ? <blockquote>{detailBook.quote}</blockquote> : null}
              {detailBook.keyTakeaways?.length ? (
                <div className={styles.details}>
                  <h4>{copy.takeaways}</h4>
                  <ul>{detailBook.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}</ul>
                </div>
              ) : null}
            </>
          ) : null}
        </LibraryDialog>
      </div>
    </section>
  );
}

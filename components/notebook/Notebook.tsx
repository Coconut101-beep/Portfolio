"use client";

import { useEffect, useRef } from "react";

export function Notebook({ html }: { html: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;
    let cancelled = false;
    node.innerHTML = html;

    const notes = document.createElement("script");
    notes.src = "/lending-club/notes.js";
    notes.async = false;

    const data = document.createElement("script");
    data.src = "/lending-club/data.js";
    data.async = false;
    data.onload = () => {
      if (!cancelled) document.body.appendChild(notes);
    };
    document.body.appendChild(data);

    return () => {
      cancelled = true;
      data.remove();
      notes.remove();
      node.innerHTML = "";
    };
  }, [html]);

  return <div className="notebook" ref={root} />;
}

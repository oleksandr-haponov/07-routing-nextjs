"use client";

import { useEffect, useRef, useState } from "react";
import css from "./TagsMenu.module.css";

// Додаємо відсутні теги Meeting та Shopping (та залишаємо решту)
const TAGS = [
  "All",
  "Work",
  "Personal",
  "Todo",
  "Meeting",
  "Shopping",
] as const;

export default function TagsMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // NEW: замыкаем в функцию — будем вызывать при выборе опции
  const handleSelect = () => setOpen(false); // ← закрыть сразу после выбора

  useEffect(() => {
    if (!open) return;

    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={css.menuContainer} ref={rootRef}>
      <button
        type="button"
        className={css.menuButton}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList} role="menu" aria-label="Filter by tag">
          {TAGS.map((tag) => {
            const href =
              tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`;
            return (
              <li key={tag} className={css.menuItem} role="none">
                <a
                  className={css.menuLink}
                  role="menuitem"
                  href={href}
                  // NEW: мгновенно закрываем дропдаун при выборе
                  onPointerDown={handleSelect} // для мыши/тача — закрывает до навигации
                  onClick={handleSelect} // для клавиатуры (Enter/Space)
                >
                  {tag}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

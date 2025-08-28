import css from "./SidebarNotes.module.css";

const TAGS = ["All", "Work", "Personal", "Todo", "Meeting", "Shopping"];

export default function SidebarNotesDefault() {
  return (
    <nav aria-label="Notes filters">
      <ul className={css.menuList}>
        {TAGS.map((tag) => {
          const href =
            tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`;
          return (
            <li key={tag} className={css.menuItem}>
              <a href={href} className={css.menuLink}>
                {tag}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

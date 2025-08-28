"use client";

import Link from "next/link";
import type { Note } from "@/types/note";
import styles from "./NoteCard.module.css";

export interface NoteCardProps {
  note: Note;
  onDelete?: (id: string) => void; // только string
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <li className={styles.item}>
      <div className={styles.header}>
        <h3 className={styles.title}>{note.title}</h3>
      </div>

      <p className={styles.content}>{note.content}</p>

      <div className={styles.actions}>
        <Link className={styles.link} href={`/notes/${note.id}`}>
          View details
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(note.id)} // note.id уже string
            className={styles.delete}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}

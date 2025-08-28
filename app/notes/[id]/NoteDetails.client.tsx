"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import { formatDateUTC } from "@/lib/format";
import css from "../NoteDetails.module.css";

export default function NoteDetailsClient({ id }: { id: string }) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id), // id строка
    refetchOnMount: false,
    retry: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError)
    return <p>Could not fetch note details. {(error as Error).message}</p>;
  if (!note) return <p>Note not found.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <button className={css.backBtn} onClick={() => router.back()}>
          ← Back
        </button>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.tag} title={note.tag}>
            {note.tag}
          </span>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{formatDateUTC(note.createdAt)}</p>
      </div>
    </div>
  );
}

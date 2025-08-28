"use client";

import { useEffect, useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  fetchNotes,
  createNote,
  type PaginatedNotesResponse,
  type CreateNotePayload,
} from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./NotesPage.module.css";

export default function NotesClient({ tag }: { tag: string | null }) {
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [page, setPage] = useState(1);
  const [isCreateOpen, setCreateOpen] = useState(false);

  // debounce поиска
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQ(search.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading, error, isFetching } =
    useQuery<PaginatedNotesResponse>({
      queryKey: ["notes", { q: debouncedQ, page, tag: tag ?? "" }],
      queryFn: () => fetchNotes({ q: debouncedQ, page, tag: tag ?? undefined }),
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
    });

  // Мутация создания заметки для NoteForm
  const create = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      setCreateOpen(false);
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error)
    return <p>Could not fetch the list of notes. {(error as Error).message}</p>;

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <div style={{ flex: "1 1 520px", maxWidth: 520 }}>
          <SearchBox
            value={search}
            onChange={setSearch}
            placeholder="Search notes..."
          />
        </div>
        <button
          type="button"
          className={css.button}
          onClick={() => setCreateOpen(true)}
        >
          Create note
        </button>
      </div>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <>
          {/* удаление для HW-07 не требуется, поэтому просто список */}
          <NoteList notes={notes} />
          {totalPages > 1 && (
            <div className={css.paginationWrap}>
              <Pagination
                pageCount={totalPages}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
                isFetchingPage={isFetching}
              />
            </div>
          )}
        </>
      )}

      {/* модалка создания (HW-07 требует модалку в NotesClient) */}
      <Modal open={isCreateOpen} onClose={() => setCreateOpen(false)}>
        <NoteForm
          onSuccess={(payload) => create.mutate(payload)}
          onCancel={() => setCreateOpen(false)}
          isSubmitting={create.isPending}
          errorMsg={
            create.isError
              ? ((create.error as Error)?.message ?? "Failed to create note")
              : undefined
          }
        />
      </Modal>
    </div>
  );
}

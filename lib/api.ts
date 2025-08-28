import api from "./api/axios";
import type { Note } from "@/types/note";

export interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NotesQueryParams {
  q?: string;
  page?: number;
  tag?: string; // если выбран "All" — не передаём вовсе
}

export type CreateNotePayload = Pick<Note, "title" | "content" | "tag">;
export type UpdateNotePayload = Partial<
  Pick<Note, "title" | "content" | "tag">
>;

/** Список заметок (с пагинацией и фильтром по тегу) */
export async function fetchNotes(
  params: NotesQueryParams = {},
): Promise<PaginatedNotesResponse> {
  const { q, page, tag } = params;
  const qs: Record<string, string | number | undefined> = {
    q,
    page,
    ...(tag ? { tag } : {}),
  };
  const { data } = await api.get<PaginatedNotesResponse>("/notes", {
    params: qs,
  });
  return data;
}

/** Детали заметки */
export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

/** Создание заметки */
export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
}

/** Обновление заметки (PATCH, не PUT) */
export async function updateNote(
  id: string,
  patch: UpdateNotePayload,
): Promise<Note> {
  const { data } = await api.patch<Note>(`/notes/${id}`, patch);
  return data;
}

/** Удаление заметки — возвращаем удалённый объект */
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

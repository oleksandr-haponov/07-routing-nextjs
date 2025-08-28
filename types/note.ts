export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string; // <— добавили
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

import type { Note } from "@/types/note";

const now = Date.now();

export const notes: Note[] = [
  {
    id: "1",
    title: "Первая заметка",
    content: "Это пример заметки.",
    tag: "Todo",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(now - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "2",
    title: "Рабочая задача",
    content: "Подготовить отчёт по проекту.",
    tag: "Work",
    createdAt: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(now - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "3",
    title: "Идея",
    content: "Попробовать новый подход к кешированию.",
    tag: "Idea",
    createdAt: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(now - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "4",
    title: "Личное",
    content: "Купить продукты к выходным.",
    tag: "Personal",
    createdAt: new Date(now).toISOString(),
    updatedAt: new Date(now).toISOString(),
  },
  {
    id: "5",
    title: "Личное",
    content: "Купить бухло к выходным.",
    tag: "Personal",
    createdAt: new Date(now).toISOString(),
    updatedAt: new Date(now).toISOString(),
  },
];

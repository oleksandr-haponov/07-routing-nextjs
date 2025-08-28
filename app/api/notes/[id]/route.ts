import { NextRequest, NextResponse } from "next/server";
import { notes } from "@/lib/api/mockData";

type Note = (typeof notes)[number];
type PatchBody = Partial<Pick<Note, "title" | "content" | "tag">>;

const isValidId = (id: string) =>
  typeof id === "string" && id.trim().length > 0;

// GET /api/notes/[id]
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  // n.id может быть number, приводим к строке
  const note = notes.find((n) => String(n.id) === id);

  return note
    ? NextResponse.json(note)
    : NextResponse.json({ error: "Note not found" }, { status: 404 });
}

// PATCH /api/notes/[id]
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  const body = (await req.json()) as PatchBody;
  const idx = notes.findIndex((n) => String(n.id) === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  notes[idx] = {
    ...notes[idx],
    ...body,
    updatedAt: new Date().toISOString(),
  } as Note;

  return NextResponse.json(notes[idx]);
}

// DELETE /api/notes/[id]
export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!isValidId(id)) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  const idx = notes.findIndex((n) => String(n.id) === id);
  if (idx === -1) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }

  const [deleted] = notes.splice(idx, 1);
  return NextResponse.json(deleted);
}

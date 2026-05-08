import { type NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { deleteNote, getNoteById, updateNote } from "@/lib/notes";

const updateSchema = z.object({
  title: z.string().optional(),
  contentJson: z.record(z.string(), z.unknown()).optional(),
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const note = await getNoteById(session.user.id, id);
  if (!note) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(note);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const raw = await req.json().catch(() => ({}));
  const parsed = updateSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { title, contentJson } = parsed.data;
  const note = await updateNote(session.user.id, id, {
    title,
    contentJson: contentJson ? JSON.stringify(contentJson) : undefined,
  });
  if (!note) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(note);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const note = await getNoteById(session.user.id, id);
  if (!note) return Response.json({ error: "Not found" }, { status: 404 });
  await deleteNote(session.user.id, id);
  return new Response(null, { status: 204 });
}

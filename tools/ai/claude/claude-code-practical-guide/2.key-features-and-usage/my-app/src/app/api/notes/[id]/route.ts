import { type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { deleteNote, getNoteById, updateNote } from "@/lib/notes";

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
  const body = await req.json().catch(() => ({}));
  const note = await updateNote(session.user.id, id, {
    title: body.title,
    contentJson: body.contentJson ? JSON.stringify(body.contentJson) : undefined,
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

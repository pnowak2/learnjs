import { type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { createNote, getNotesByUser } from "@/lib/notes";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const notes = await getNotesByUser(session.user.id);
  return Response.json(
    notes.map(({ id, title, isPublic, updatedAt }) => ({ id, title, isPublic, updatedAt }))
  );
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const note = await createNote(session.user.id, {
    title: body.title,
    contentJson: body.contentJson ? JSON.stringify(body.contentJson) : undefined,
  });
  return Response.json(note, { status: 201 });
}

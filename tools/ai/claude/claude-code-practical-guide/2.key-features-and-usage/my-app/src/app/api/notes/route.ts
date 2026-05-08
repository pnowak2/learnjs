import { type NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { createNote, getNotesByUser } from "@/lib/notes";

const createSchema = z.object({
  title: z.string().optional(),
  contentJson: z.record(z.string(), z.unknown()).optional(),
});

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

  const raw = await req.json().catch(() => ({}));
  const parsed = createSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues }, { status: 400 });
  }

  const { title, contentJson } = parsed.data;
  const note = await createNote(session.user.id, {
    title,
    contentJson: contentJson ? JSON.stringify(contentJson) : undefined,
  });
  return Response.json(note, { status: 201 });
}

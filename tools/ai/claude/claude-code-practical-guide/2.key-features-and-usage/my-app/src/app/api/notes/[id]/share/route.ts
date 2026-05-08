import { type NextRequest } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { setNotePublic } from "@/lib/notes";

const shareSchema = z.object({
  isPublic: z.boolean(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const raw = await req.json().catch(() => ({}));
  const parsed = shareSchema.safeParse(raw);
  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues }, { status: 400 });
  }

  const note = await setNotePublic(session.user.id, id, parsed.data.isPublic);
  if (!note) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ id: note.id, isPublic: note.isPublic, publicSlug: note.publicSlug });
}

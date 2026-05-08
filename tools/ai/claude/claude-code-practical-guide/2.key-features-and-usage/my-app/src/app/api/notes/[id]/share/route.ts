import { type NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { setNotePublic } from "@/lib/notes";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { isPublic } = await req.json();
  const note = await setNotePublic(session.user.id, id, Boolean(isPublic));
  if (!note) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ id: note.id, isPublic: note.isPublic, publicSlug: note.publicSlug });
}

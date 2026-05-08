import { type NextRequest } from "next/server";
import { getNoteByPublicSlug } from "@/lib/notes";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const note = await getNoteByPublicSlug(slug);
  if (!note) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({
    title: note.title,
    contentJson: JSON.parse(note.contentJson),
  });
}

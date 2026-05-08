import { randomUUID } from "crypto";
import { get, query, run } from "./db";

export type Note = {
  id: string;
  userId: string;
  title: string;
  contentJson: string;
  isPublic: boolean;
  publicSlug: string | null;
  createdAt: string;
  updatedAt: string;
};

type NoteRow = {
  id: string;
  user_id: string;
  title: string;
  content_json: string;
  is_public: number;
  public_slug: string | null;
  created_at: string;
  updated_at: string;
};

const DEFAULT_CONTENT = JSON.stringify({ type: "doc", content: [] });

function toNote(row: NoteRow): Note {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    contentJson: row.content_json,
    isPublic: row.is_public === 1,
    publicSlug: row.public_slug,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createNote(
  userId: string,
  data: { title?: string; contentJson?: string } = {}
): Promise<Note> {
  const id = randomUUID();
  const title = data.title ?? "Untitled note";
  const contentJson = data.contentJson ?? DEFAULT_CONTENT;
  run(
    `INSERT INTO notes (id, user_id, title, content_json) VALUES (?, ?, ?, ?)`,
    [id, userId, title, contentJson]
  );
  const created = get<NoteRow>("SELECT * FROM notes WHERE id = ?", [id]);
  if (!created) throw new Error(`Note ${id} not found after insert`);
  return toNote(created);
}

export async function getNoteById(
  userId: string,
  noteId: string
): Promise<Note | null> {
  const row = get<NoteRow>(
    "SELECT * FROM notes WHERE id = ? AND user_id = ?",
    [noteId, userId]
  );
  return row ? toNote(row) : null;
}

export async function getNotesByUser(userId: string): Promise<Note[]> {
  return query<NoteRow>(
    "SELECT * FROM notes WHERE user_id = ? ORDER BY updated_at DESC",
    [userId]
  ).map(toNote);
}

export async function updateNote(
  userId: string,
  noteId: string,
  data: Partial<{ title: string; contentJson: string }>
): Promise<Note | null> {
  const existing = get<NoteRow>(
    "SELECT * FROM notes WHERE id = ? AND user_id = ?",
    [noteId, userId]
  );
  if (!existing) return null;

  run(
    `UPDATE notes
     SET title = ?, content_json = ?, updated_at = datetime('now')
     WHERE id = ? AND user_id = ?`,
    [
      data.title ?? existing.title,
      data.contentJson ?? existing.content_json,
      noteId,
      userId,
    ]
  );
  const updated = get<NoteRow>("SELECT * FROM notes WHERE id = ?", [noteId]);
  if (!updated) throw new Error(`Note ${noteId} not found after update`);
  return toNote(updated);
}

export async function deleteNote(userId: string, noteId: string): Promise<void> {
  run("DELETE FROM notes WHERE id = ? AND user_id = ?", [noteId, userId]);
}

export async function setNotePublic(
  userId: string,
  noteId: string,
  isPublic: boolean
): Promise<Note | null> {
  const existing = get<NoteRow>(
    "SELECT * FROM notes WHERE id = ? AND user_id = ?",
    [noteId, userId]
  );
  if (!existing) return null;

  if (isPublic) {
    const slug = existing.public_slug ?? randomUUID().replace(/-/g, "");
    run(
      `UPDATE notes SET is_public = 1, public_slug = ?, updated_at = datetime('now')
       WHERE id = ? AND user_id = ?`,
      [slug, noteId, userId]
    );
  } else {
    run(
      `UPDATE notes SET is_public = 0, public_slug = NULL, updated_at = datetime('now')
       WHERE id = ? AND user_id = ?`,
      [noteId, userId]
    );
  }
  const patched = get<NoteRow>("SELECT * FROM notes WHERE id = ?", [noteId]);
  if (!patched) throw new Error(`Note ${noteId} not found after update`);
  return toNote(patched);
}

export async function getNoteByPublicSlug(slug: string): Promise<Note | null> {
  const row = get<NoteRow>(
    "SELECT * FROM notes WHERE public_slug = ? AND is_public = 1",
    [slug]
  );
  return row ? toNote(row) : null;
}

# CLAUDE.md

We're building the app described in @SPEC.MD.
Treat that file for general architectural tasks or to double-check the exact database structure, tech stack or application architecture.

Keep your replies extremely concise and focus on conveying the key informations. No unecessary fluff, no long code snippets.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Whenever working with any third-party library or something similar, you MUST look up the official documentation to ensure that you're working with up-to-date information.
Use the DocsExplorer subagent for efficient documentation lookup.

@AGENTS.md

## Commands

```bash
bun run dev        # start dev server on http://localhost:3000
bun run build      # production build
bun run lint       # ESLint
```

Database setup (run once, or after schema changes):

```bash
npx auth@latest migrate    # apply better-auth tables to SQLite DB
```

## Architecture

A note-taking app: authenticated users create/edit/delete rich-text notes with TipTap; notes can be publicly shared via a slug URL.

**Runtime:** Bun. **DB:** SQLite at `data/app.db` via Bun's built-in SQLite client (no ORM — raw SQL). **Auth:** better-auth.

### Layers

- `lib/db.ts` — singleton Bun SQLite connection; exports `query<T>`, `get<T>`, `run` helpers
- `lib/notes.ts` — note repository functions (all queries scope to `user_id`)
- `app/api/notes/` — REST route handlers; all require auth except public read
- `app/api/public-notes/` — read-only public access by slug
- `src/components/` — NoteEditor (TipTap), NoteList, ShareToggle, DeleteNoteButton, PublicNoteViewer

### Routes

| Path | Access | Purpose |
|------|--------|---------|
| `/` | public | landing / auth CTA |
| `/dashboard` | auth | note list + create |
| `/notes/[id]` | auth | TipTap editor |
| `/p/[slug]` | public | read-only shared note |
| `/(auth)/login`, `/(auth)/register` | public | better-auth UI |

### Data model

better-auth manages `user`, `session`, `account`, `verification` tables — do not create these manually; use `npx auth@latest migrate`.

App-owned table:

```sql
CREATE TABLE notes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES user(id),
  title TEXT NOT NULL,
  content_json TEXT NOT NULL,   -- JSON.stringify(TipTap doc)
  is_public INTEGER NOT NULL DEFAULT 0,
  public_slug TEXT UNIQUE,      -- generated with nanoid(), 16+ chars
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

### TipTap

Content is always stored as `JSON.stringify(editor.getJSON())` and loaded back via `JSON.parse`. The editor uses `StarterKit` (headings H1–H3, bold, italic, bullet lists, HR) plus `Code` and `CodeBlock` extensions. Never use `dangerouslySetInnerHTML` with note content — render exclusively through TipTap's `EditorContent`.

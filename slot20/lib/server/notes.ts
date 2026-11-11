import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Note, NoteInput, NoteUpdate } from '@/types';

const FILE = path.join(process.cwd(), 'data', 'notes.json');

async function readAll(): Promise<Note[]> {
  const raw = await fs.readFile(FILE, 'utf8');
  const data: unknown = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error('Dữ liệu ghi chú không hợp lệ');
  return data as Note[];
}

async function writeAll(notes: Note[]): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(notes, null, 2), 'utf8');
}

export async function getNotes(): Promise<Note[]> {
  const notes = await readAll();
  return notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getNote(id: number): Promise<Note | null> {
  const notes = await readAll();
  return notes.find((note) => note.id === id) ?? null;
}

export async function createNote(input: NoteInput): Promise<Note> {
  const notes = await readAll();
  const nextId = notes.reduce((max, note) => Math.max(max, note.id), 0) + 1;
  const note: Note = { id: nextId, ...input, createdAt: new Date().toISOString() };
  notes.push(note);
  await writeAll(notes);
  return note;
}

export async function updateNote(id: number, data: NoteUpdate): Promise<Note | null> {
  const notes = await readAll();
  const index = notes.findIndex((note) => note.id === id);
  if (index === -1) return null;
  const updated = { ...notes[index], ...data };
  notes[index] = updated;
  await writeAll(notes);
  return updated;
}

export async function deleteNote(id: number): Promise<boolean> {
  const notes = await readAll();
  const filtered = notes.filter((note) => note.id !== id);
  if (filtered.length === notes.length) return false;
  await writeAll(filtered);
  return true;
}

'use client';

import { useState } from 'react';
import { getErrorMessage } from '@/lib/errors';
import { useDeleteNoteMutation, useUpdateNoteMutation } from '@/lib/features/notes/notesApi';
import type { Note } from '@/types';

type Props = { note: Note; color: string };

export default function NoteCard({ note, color }: Props) {
  const [updateNote, { isLoading: saving }] = useUpdateNoteMutation();
  const [deleteNote, { isLoading: deleting }] = useDeleteNoteMutation();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [error, setError] = useState<string | null>(null);

  function startEditing() {
    setTitle(note.title);
    setContent(note.content);
    setError(null);
    setEditing(true);
  }

  async function handleSave() {
    try {
      await updateNote({ id: note.id, title, content }).unwrap();
      setError(null);
      setEditing(false);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Xóa ghi chú "${note.title}"?`)) return;
    try {
      await deleteNote(note.id).unwrap();
      setError(null);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  if (editing) {
    return (
      <article className={`flex flex-col gap-2 rounded-xl p-4 shadow-md ring-2 ring-blue-500 ${color}`}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          maxLength={100}
          aria-label="Tiêu đề ghi chú"
          className="rounded bg-white/70 px-2 py-1 font-bold text-gray-800 focus:outline-none"
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={4}
          aria-label="Nội dung ghi chú"
          className="resize-none rounded bg-white/70 px-2 py-1 text-sm text-gray-800 focus:outline-none"
        />
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-2 text-sm">
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setTitle(note.title);
              setContent(note.content);
              setError(null);
            }}
            className="rounded px-3 py-1 text-gray-600 hover:bg-white/60"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={saving}
            className="rounded bg-blue-600 px-3 py-1 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Đang lưu...' : 'Lưu'}
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className={`group relative flex min-h-36 flex-col rounded-xl p-4 shadow-md transition hover:-translate-y-1 ${color}`}>
      <h2 className="break-words pr-14 font-bold text-gray-800">{note.title}</h2>
      <p className="mt-2 flex-1 whitespace-pre-wrap break-words text-sm text-gray-700">{note.content}</p>
      <time className="mt-4 text-xs text-gray-500" dateTime={note.createdAt}>
        {new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(note.createdAt))}
      </time>
      <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
        <button
          type="button"
          onClick={startEditing}
          className="rounded px-2 py-1 text-sm text-gray-700 hover:bg-white/60"
          aria-label={`Sửa ${note.title}`}
        >
          Sửa
        </button>
        <button
          type="button"
          onClick={() => void handleDelete()}
          disabled={deleting}
          className="rounded px-2 py-1 text-sm text-red-700 hover:bg-white/60 disabled:opacity-50"
          aria-label={`Xóa ${note.title}`}
        >
          {deleting ? '...' : 'Xóa'}
        </button>
      </div>
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
    </article>
  );
}

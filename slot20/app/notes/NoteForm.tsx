'use client';

import { useState, type FormEvent } from 'react';
import { getErrorMessage } from '@/lib/errors';
import { useAddNoteMutation } from '@/lib/features/notes/notesApi';

export default function NoteForm() {
  const [addNote, { isLoading }] = useAddNoteMutation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) {
      setError('Vui lòng nhập tiêu đề');
      return;
    }

    try {
      await addNote({ title: title.trim(), content: content.trim() }).unwrap();
      setTitle('');
      setContent('');
      setError(null);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  }

  const inputClass =
    'w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800';

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl bg-white p-5 shadow dark:bg-gray-900">
      <label className="sr-only" htmlFor="note-title">
        Tiêu đề
      </label>
      <input
        id="note-title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={100}
        placeholder="Tiêu đề"
        className={inputClass}
      />
      <label className="sr-only" htmlFor="note-content">
        Nội dung
      </label>
      <textarea
        id="note-content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={3}
        placeholder="Nội dung..."
        className={`${inputClass} resize-none`}
      />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Đang lưu...' : '+ Thêm ghi chú'}
      </button>
    </form>
  );
}

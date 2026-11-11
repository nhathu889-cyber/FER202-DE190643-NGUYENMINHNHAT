import { createNote, getNotes } from '@/lib/server/notes';
import type { NoteInput } from '@/types';

const delay = (milliseconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, milliseconds));

export async function GET() {
  return Response.json(await getNotes());
}

export async function POST(request: Request) {
  let body: Partial<NoteInput>;
  try {
    body = (await request.json()) as Partial<NoteInput>;
  } catch {
    return Response.json({ error: 'Dữ liệu JSON không hợp lệ' }, { status: 400 });
  }

  if (typeof body.title !== 'string' || typeof body.content !== 'string') {
    return Response.json({ error: 'Tiêu đề và nội dung phải là chuỗi' }, { status: 400 });
  }

  const title = body.title.trim();
  const content = body.content.trim();
  if (!title) return Response.json({ error: 'Tiêu đề không được để trống' }, { status: 400 });
  if (title.length > 100) return Response.json({ error: 'Tiêu đề tối đa 100 ký tự' }, { status: 400 });

  await delay(600);
  const note = await createNote({ title, content });
  return Response.json(note, { status: 201 });
}

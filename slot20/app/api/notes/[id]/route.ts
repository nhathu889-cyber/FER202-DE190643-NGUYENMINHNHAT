import { deleteNote, getNote, updateNote } from '@/lib/server/notes';
import type { NoteUpdate } from '@/types';

type Context = { params: Promise<{ id: string }> };

function parseId(value: string): number | null {
  const id = Number(value);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

export async function GET(_request: Request, { params }: Context) {
  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) return Response.json({ error: 'Mã ghi chú không hợp lệ' }, { status: 400 });
  const note = await getNote(id);
  if (!note) return Response.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
  return Response.json(note);
}

export async function PUT(request: Request, { params }: Context) {
  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) return Response.json({ error: 'Mã ghi chú không hợp lệ' }, { status: 400 });

  let body: NoteUpdate;
  try {
    body = (await request.json()) as NoteUpdate;
  } catch {
    return Response.json({ error: 'Dữ liệu JSON không hợp lệ' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return Response.json({ error: 'Dữ liệu cập nhật không hợp lệ' }, { status: 400 });
  }
  const keys = Object.keys(body);
  if (keys.length === 0 || keys.some((key) => key !== 'title' && key !== 'content')) {
    return Response.json({ error: 'Dữ liệu cập nhật không hợp lệ' }, { status: 400 });
  }
  if (body.title !== undefined && typeof body.title !== 'string') {
    return Response.json({ error: 'Tiêu đề phải là chuỗi' }, { status: 400 });
  }
  if (body.content !== undefined && typeof body.content !== 'string') {
    return Response.json({ error: 'Nội dung phải là chuỗi' }, { status: 400 });
  }

  const title = body.title?.trim();
  if (title !== undefined && !title) {
    return Response.json({ error: 'Tiêu đề không được để trống' }, { status: 400 });
  }
  if (title && title.length > 100) {
    return Response.json({ error: 'Tiêu đề tối đa 100 ký tự' }, { status: 400 });
  }

  const note = await updateNote(id, {
    ...(title !== undefined ? { title } : {}),
    ...(body.content !== undefined ? { content: body.content.trim() } : {}),
  });
  if (!note) return Response.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
  return Response.json(note);
}

export async function DELETE(_request: Request, { params }: Context) {
  const { id: rawId } = await params;
  const id = parseId(rawId);
  if (id === null) return Response.json({ error: 'Mã ghi chú không hợp lệ' }, { status: 400 });
  const deleted = await deleteNote(id);
  if (!deleted) return Response.json({ error: 'Không tìm thấy ghi chú' }, { status: 404 });
  return new Response(null, { status: 204 });
}

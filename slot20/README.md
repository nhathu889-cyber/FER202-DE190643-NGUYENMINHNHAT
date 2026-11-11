# Slot 20 — Next.js + Tailwind CSS + Redux Toolkit

Ứng dụng thực hành App Router, TypeScript, Tailwind CSS v4 và Redux Toolkit. Bao gồm:

- Counter, Todo có lọc/thống kê và giao diện sáng/tối được lưu trong localStorage.
- Danh sách sản phẩm lấy từ DummyJSON, trang chi tiết phía server và giỏ hàng Redux.
- CRUD ghi chú qua Route Handlers, lưu tại `data/notes.json` và client cache bằng RTK Query.

## Chạy ứng dụng

Yêu cầu Node.js 20 trở lên.

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000). Trước khi nộp bài, chạy:

```bash
npm run typecheck
npm run lint
npm run build
```

Ghi chú được lưu cục bộ trong `data/notes.json`; cơ chế lưu file này phù hợp cho bài tập local, không dùng cho môi trường serverless.

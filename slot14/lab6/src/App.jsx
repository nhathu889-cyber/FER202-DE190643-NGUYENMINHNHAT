

import { Navigate, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import AxiosDemo from './components/AxiosDemo';

import MainLayout from './components/layout/MainLayout';

import HttpRequestsPage from './pages/HttpRequestsPage';
import PostsPage from './pages/PostsPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from './pages/PostCreatePage';
import PostEditPage from './pages/PostEditPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Route index giữ trang Axios demo; các route CRUD dùng chung layout. */}
        <Route
          index
          element={
            <Container className="py-4">
              <h1 className="mb-4">Lab 6 - Axios Advanced</h1>
              <AxiosDemo />
            </Container>
          }
        />

        {/* Trang thực hành HTTP requests */}
        <Route path="http" element={<HttpRequestsPage />} />
        {/* Alias thân thiện cho URL /http-requests */}
        <Route path="http-requests" element={<HttpRequestsPage />} />

        <Route path="posts">
          <Route index element={<PostsPage />} />
          <Route path="create" element={<Navigate to="/posts/new" replace />} />
          <Route path="new" element={<PostCreatePage />} />
          <Route path=":id" element={<PostDetailPage />} />
          <Route path=":id/edit" element={<PostEditPage />} />
        </Route>

        {/* Chuyển đường dẫn cũ về trang chủ */}
        <Route
          path="home"
          element={<Navigate to="/" replace />}
        />

        {/* Trang không tồn tại */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;

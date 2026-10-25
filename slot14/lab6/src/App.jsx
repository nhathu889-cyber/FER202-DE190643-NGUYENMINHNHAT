
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
import RequestConfig from './components/RequestConfig';
import PostDetail from './components/PostDetail';

import PostForm from './components/common/PostForm';
import ToastMessage from './components/common/ToastMessage';

function App() {
  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success',
  });

  const handleFormSubmit = (post) => {
    console.log('Form data:', post);

    setToast({
      show: true,
      message: 'Dữ liệu hợp lệ! Đã kiểm tra Form thành công.',
      variant: 'success',
    });
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4">Lab 6 - Axios Advanced</h1>

      <hr />
      <AxiosDemo />

      <hr />
      <PostList />

      <hr />
      <PostForm onSubmit={handleFormSubmit} />

      <hr />
      <CreatePost />

      <hr />
      <UpdatePost />

      <hr />
      <PatchPost />

      <hr />
      <DeletePost />

      <hr />
      <RequestConfig />

      <hr />
      <PostDetail />

      <ToastMessage
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() =>
          setToast((current) => ({
            ...current,
            show: false,
          }))
        }
      />
    </Container>
  );
}

export default App;

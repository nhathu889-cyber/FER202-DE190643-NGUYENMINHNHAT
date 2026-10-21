
import Container from 'react-bootstrap/Container';

import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import PatchPost from './components/PatchPost';
import DeletePost from './components/DeletePost';
import RequestConfig from './components/RequestConfig';

function App() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">DemoAxios</h1>

      <hr />
      <AxiosDemo />

      <hr />
      <PostList />

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
    </Container>
  );
}

export default App;

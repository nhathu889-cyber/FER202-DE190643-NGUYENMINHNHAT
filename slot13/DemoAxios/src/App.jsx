
import Container from 'react-bootstrap/Container';

import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';

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
    </Container>
  );
}

export default App;


import Container from 'react-bootstrap/Container';
import AxiosDemo from './components/AxiosDemo';
import PostList from './components/PostList';

function App() {
  return (
    <Container className="py-4">
      <h1>DemoAxios</h1>
      <hr />
      <AxiosDemo />
      <hr />
      <PostList />
    </Container>
  );
}

export default App;

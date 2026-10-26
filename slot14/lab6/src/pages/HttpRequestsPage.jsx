
import { Container } from 'react-bootstrap';

import PostList from '../components/PostList';
import CreatePost from '../components/CreatePost';
import UpdatePost from '../components/UpdatePost';
import PatchPost from '../components/PatchPost';
import DeletePost from '../components/DeletePost';
import RequestConfig from '../components/RequestConfig';

export default function HttpRequestsPage() {
  return (
    <Container fluid>
      <h2 className="mb-4">HTTP Requests</h2>

      <section className="mb-5">
        <PostList />
      </section>

      <hr />

      <section className="mb-5">
        <CreatePost />
      </section>

      <hr />

      <section className="mb-5">
        <UpdatePost />
      </section>

      <hr />

      <section className="mb-5">
        <PatchPost />
      </section>

      <hr />

      <section className="mb-5">
        <DeletePost />
      </section>

      <hr />

      <section className="mb-5">
        <RequestConfig />
      </section>

    </Container>
  );
}

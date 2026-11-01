import { Route, Routes, useLocation } from 'react-router-dom';
import AppFooter from '../components/AppFooter';
import AppNavbar from '../components/AppNavbar';
import Login from '../pages/Login';
import RoomList from '../pages/RoomList';
import RoomDetail from '../pages/RoomDetail';
import AddRoom from '../pages/AddRoom';
import ManageRoomTypes from '../pages/ManageRoomTypes';
import RoomTypeDetail from '../pages/RoomTypeDetail';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login';

  return (
    <>
      {!hideLayout && <AppNavbar />}
      <main className="container py-4 page-shell">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<RoomList />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/rooms/new" element={<AddRoom />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/room-types" element={<ManageRoomTypes />} />
            <Route path="/room-types/:id" element={<RoomTypeDetail />} />
          </Route>
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!hideLayout && <AppFooter />}
    </>
  );
}

export default AppRoutes;

import { AuthProvider } from './context/AuthContext';
import { RoomProvider } from './context/RoomContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <RoomProvider>
        <AppRoutes />
      </RoomProvider>
    </AuthProvider>
  );
}

export default App;

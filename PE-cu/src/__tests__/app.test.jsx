import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../routes/AppRoutes';
import { AuthProvider } from '../context/AuthContext';

describe('App smoke test', () => {
  it('renders login page', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/login']}>
          <AppRoutes />
        </MemoryRouter>
      </AuthProvider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThan(0);
  });
});

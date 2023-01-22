import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../Header';

/**
 * test scenario
 *
 * - Header component
 *  - should show header with login link when user is null
 *  - should show header with logout button when user is not null
 */

describe('Header component test', () => {
  it('should show header with login link when user is null', () => {
    const { getByRole, queryByRole } = render(
      <BrowserRouter>
        <Header handleLogout={null} />
      </BrowserRouter>,
    );
    const loginLink = getByRole('link', { name: 'login' });
    expect(loginLink).toBeInTheDocument();
    expect(queryByRole('link', { name: 'logout' })).not.toBeInTheDocument();
  });

  it('should show header with logout button when user is not null', async () => {
    const onLogout = jest.fn();
    const mockUser = {
      id: 'user-1',
      name: 'user 1',
      email: 'test@test.com',
    };
    const { getByRole, queryByRole } = render(
      <BrowserRouter>
        <Header user={mockUser} onLogout={onLogout} />
      </BrowserRouter>,
    );
    expect(queryByRole('link', { name: 'login' })).not.toBeInTheDocument();
    const logoutBtn = getByRole('button', { name: 'logout' });
    expect(logoutBtn).toBeEnabled();
    await userEvent.click(logoutBtn);
    expect(onLogout).toHaveBeenCalledTimes(1);
  });
});

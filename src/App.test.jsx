import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: Router });
};

describe('App Component', () => {
  it('renders without crashing', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('To Do App')).toBeInTheDocument();
  });

  it('renders the main heading', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Welcome to Your To Do App!')).toBeInTheDocument();
  });

  it('renders the description paragraph', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Organize your tasks and stay productive/i)).toBeInTheDocument();
  });

  it('renders the TodoList component', () => {
    renderWithRouter(<App />);
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
  });
});

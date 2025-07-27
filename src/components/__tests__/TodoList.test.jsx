import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  it('renders the component with initial tasks', () => {
    render(<TodoList />);
    
    // Check if the input field and button are present
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
    
    // Check if initial tasks are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Deploy the app')).toBeInTheDocument();
  });

  it('adds a new task when the form is submitted', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const button = screen.getByRole('button', { name: /add task/i });
    
    // Add a new task
    await user.type(input, 'Test new task');
    await user.click(button);
    
    // Check if the new task is added
    expect(screen.getByText('Test new task')).toBeInTheDocument();
  });

  it('does not add empty tasks', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const initialTasks = screen.getAllByRole('listitem').length;
    const button = screen.getByRole('button', { name: /add task/i });
    
    // Try to add an empty task
    await user.click(button);
    
    // Check that no new task was added
    expect(screen.getAllByRole('listitem').length).toBe(initialTasks);
  });

  it('toggles task completion when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    const taskText = screen.getByText('Learn React');
    
    // Toggle the first task
    await user.click(checkbox);
    
    // Check if the task is marked as completed
    expect(checkbox).toBeChecked();
    expect(taskText).toHaveClass('completed');
    
    // Toggle back
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(taskText).not.toHaveClass('completed');
  });

  it('deletes a task when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const initialTasks = screen.getAllByRole('listitem').length;
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    
    // Delete the first task
    await user.click(deleteButtons[0]);
    
    // Check if the task was removed
    expect(screen.getAllByRole('listitem').length).toBe(initialTasks - 1);
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  it('adds a task when pressing Enter in the input field', async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    
    // Add a task by pressing Enter
    await user.type(input, 'New task with Enter{enter}');
    
    // Check if the new task is added
    expect(screen.getByText('New task with Enter')).toBeInTheDocument();
  });
});

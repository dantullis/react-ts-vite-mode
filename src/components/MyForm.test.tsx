import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MyForm from './MyForm';
import formReducer from '../store/slices/formSlice';

// Setup a store for the tests
const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

const mockOnSubmit = vi.fn(); // Using `vi.fn()` as Vitest uses the `vi` object
const mockOnReset = vi.fn();

describe('MyForm', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MyForm onReset={mockOnReset} onSubmit={mockOnSubmit} />
      </Provider>
    );
  });

  test('renders the form correctly', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test('enables the submit button when the form is valid', async () => {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /submit/i })
      ).not.toBeDisabled();
    });
  });

  test('shows validation errors when fields are invalid', async () => {
    fireEvent.input(screen.getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.blur(screen.getByLabelText(/email/i));

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  test('submits the form data correctly', async () => {
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Force re-render or wait for any asynchronous effects to complete
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /submit/i })
      ).not.toBeDisabled();
    });

    // Click submit
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check if the onSubmit has been called
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  test('resets the form correctly', async () => {
    // Trigger reset
    fireEvent.click(screen.getByRole('button', { name: /reset/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email/i)).toHaveValue('');
      expect(screen.getByLabelText(/password/i)).toHaveValue('');
    });
  });

  test('ensures all form inputs have associated labels', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';

const suggestions = ['React', 'React Native', 'Redux', 'Vue', 'Angular'];

vi.mock('./utils/debounce', () => ({
  debounce: (fn) => fn,
}));

describe('App', () => {
  test('renders the input', () => {
    render(<App placeholder={'Search...'} suggestions={suggestions} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('does not show the dropdown on mount', () => {
    render(<App placeholder={'Search...'} suggestions={suggestions} />);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('renders the placeholder text', () => {
    render(<App placeholder={'Search...'} suggestions={suggestions} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('shows matching suggestion after typing', async () => {
    const user = userEvent.setup();
    render(<App placeholder={'Search...'} suggestions={suggestions} />);

    await user.type(screen.getByRole('textbox'), 'rea');

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('React Native')).toBeInTheDocument();
    expect(screen.queryByText('Vue')).not.toBeInTheDocument();
  });

  test('does not show dropdown when input is whitespace', async () => {
    const user = userEvent.setup();
    render(<App placeholder={'Search...'} suggestions={suggestions} />);

    await user.type(screen.getByRole('textbox'), '   ');

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('does not show dropdown when no suggestions match', async () => {
    const user = userEvent.setup();
    render(<App placeholder={'Search...'} suggestions={suggestions} />);

    await user.type(screen.getByRole('textbox'), '$zoz&o');

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('closes the dropdown when an item is selected', async () => {
    const user = userEvent.setup();
    render(<App placeholder='Search...' suggestions={suggestions} />);

    await user.type(screen.getByRole('textbox'), 'rea');
    fireEvent.mouseDown(screen.getByText('React'));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test.skip('sets the input value to the selected item', async () => {
    const user = userEvent.setup();
    render(<App placeholder={'Search...'} suggestions={suggestions} />);

    await user.type(screen.getByRole('textbox'), 'rea');
    fireEvent.mouseDown(screen.getByText('React'));

    expect(screen.getByRole('textbox')).toHaveValue('React');
  });

  test('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <App placeholder={'Search...'} suggestions={suggestions} />
        <button>Outside</button>
      </div>,
    );

    await user.type(screen.getByRole('textbox'), 'rea');
    fireEvent.mouseDown(screen.getByText('Outside'));

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  test('keeps dropdown open when clicking inside', async () => {
    const user = userEvent.setup();
    render(<App placeholder={'Search...'} suggestions={suggestions} />);

    await user.type(screen.getByRole('textbox'), 'rea');
    fireEvent.mouseDown(screen.getByRole('textbox'));

    expect(screen.queryByRole('list')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from './App';

const suggestions = ['React', 'React Native', 'Redux', 'Vue', 'Angular'];

vi.mock('/utils/debounce', () => ({
    debounce: (fn) => fn,
}));

describe('App', () => {
    test('renders the input', () => {
        render(<App placeholder={'Search...'} suggestions={suggestions}/>);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    })

    test('does not show the dropdown on mount', () => {
        render(<App placeholder={'Search...'} suggestions={suggestions}/>);
        expect(screen.queryByRole('list')).not.toBeInTheDocument();
    })

    test('renders the placeholder text', () => {
        render(<App placeholder={'Search...'} suggestions={suggestions}/>);
        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    })
})


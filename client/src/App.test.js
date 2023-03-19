import { render, screen } from '@testing-library/react';
import App from './App';

test('renders application title', () => {
  render(<App />);
  const headingElement = screen.getByText(/Todos/i);
  expect(headingElement).toBeInTheDocument();
});

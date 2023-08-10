import { render, screen } from '@testing-library/react';
import App from './App';

test('WKND Sign in', () => {
  render(<App />);
  const linkElement = screen.getByText(/Sign in/i);
  expect(linkElement).toBeInTheDocument();
});

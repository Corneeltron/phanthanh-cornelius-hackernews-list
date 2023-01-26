import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders header', () => {
  render(<App />);
  const header = screen.getByRole('heading');
  expect(header).toBeInTheDocument();
});

test('renders body container', async () => {
  render(<App />);
  const body = screen.getByTestId('body');
  expect(body).toBeInTheDocument();
});


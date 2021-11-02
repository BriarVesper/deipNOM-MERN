import { render, screen } from '@testing-library/react';
import MainView from '../MainView';

test('renders title text', () => {
  render(<MainView />);
  const linkElement = screen.getByText(/deipnon/i);
  expect(linkElement).toBeInTheDocument();
});

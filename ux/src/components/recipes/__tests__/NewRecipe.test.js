import { render, screen } from '@testing-library/react';
import React from 'react';
import NewRecipe from '../NewRecipe';
import AppContext from '../../context';

test('renders title text', () => {
  render (
    <AppContext.Provider value={[], {}}>
      <NewRecipe/>;
    </AppContext.Provider>
  );  
  
  const linkElement = screen.getByText(/Add New Recipe/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders input and button', () => {
  render (
    <AppContext.Provider value={[], {}}>
      <NewRecipe/>;
    </AppContext.Provider>
  );

  const nameInput = screen.getByPlaceholderText('title');
  const addButton = screen.getByText(/Add Recipe/i);
  expect(nameInput).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});


import React from 'react';
import ShoppingList from '../shopping/ShoppingList';
import SelectedRecipes from '../shopping/SelectedRecipes';

import '../../style/Shopping.css';

const ShoppingPage = () => {
  return (
    <div id="shopping-page">
      <ShoppingList/>
      <SelectedRecipes/>
    </div>
  );
};

export default ShoppingPage;
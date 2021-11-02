import React, { useContext } from 'react';
import ListRecipeItem from './ListRecipeItem';
import { PageContext } from '../context';

const SelectedRecipes = () => {
  const { selectedRecipes } = useContext(PageContext);

  return (
    <div id="selected-recipe-list">
      <h3 className="header">Selected Recipes</h3>
      <hr/>
      <div className="list">
        {selectedRecipes.map((recipe, index) => <ListRecipeItem key={index} recipe={recipe} toRemove={index}/>)}
      </div>
    </div>
  );
};

export default SelectedRecipes;

import React, { useContext } from 'react';
import AppContext from '../context';
import Recipe from './Recipe';

const RecipeList = () => {
  const { recipes } = useContext(AppContext);
  return (
    <div id="recipe-list">
      <div className="recipe-list-header">
        <h3>Recipes</h3>
      </div>
      <div className="list">
        {recipes.map(recipe => 
          <Recipe 
            key={recipe._id} 
            recipe={recipe} 
          />)
        }
      </div>
    </div>
  );
};

export default RecipeList;
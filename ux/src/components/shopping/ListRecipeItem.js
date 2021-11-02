import React, { useContext } from 'react';
import { PageContext } from '../context';

const ListRecipeItem = ({ recipe, toRemove }) => {
  const { handleRemoveSelectedRecipe } = useContext(PageContext);

  const handleRemove = () => {
    handleRemoveSelectedRecipe(toRemove);
  }

  return (
    <div className="selected-recipe-item">
      <div>
        <button onClick={handleRemove} className="text-button-small">remove</button>
        {recipe.title}
      </div>
    </div>
  );
};

export default ListRecipeItem;
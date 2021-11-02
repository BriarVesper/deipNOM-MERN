import { useContext } from 'react';
import AppContext, { PageContext } from '../context';

import { FaPlus, FaTrashAlt, FaFeatherAlt } from "react-icons/fa";

const Recipe = ({ recipe }) => {
  const { dispatchRecipeEvent } = useContext(AppContext);
  const { handleSelectedRecipe } = useContext(PageContext);

  const handleRemoveRecipe = () => {
    dispatchRecipeEvent('REMOVE', { id: recipe._id });
  };

  const handleEditRecipe = () => {
    dispatchRecipeEvent('OPEN_EDIT', { id: recipe._id });
  };

  const handlePickRecipe = () => {
    handleSelectedRecipe(recipe);
  }

  return (
    <div className="recipe-item"
      style={{
        backgroundImage: "url(" + recipe.image + ")",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'        
      }}
    >
      <div className="header">
        <div className="title">{recipe.title}</div>
        <button className="select icon-button-small" onClick={handlePickRecipe}><FaPlus/></button>
      </div>
      <div className="middle">
        <small>{recipe.description}</small>
      </div>
      <div className="footer">
        <button onClick={handleRemoveRecipe} className="icon-button-small"><FaTrashAlt/></button>
        <button onClick={handleEditRecipe} className="icon-button-small"><FaFeatherAlt/></button>
      </div>
    </div>
  );
};

export default Recipe;
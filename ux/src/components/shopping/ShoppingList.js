import React, { useContext, useEffect, useState } from 'react';
import { PageContext } from '../context';
import { combine } from 'recipe-ingredient-parser-v3';

const ShoppingList = () => {
  const { selectedRecipes } = useContext(PageContext);
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    let ingArr = [];
    if (selectedRecipes.length !== 0) {
      let ingredientObj = selectedRecipes.map(recipe => {
        return recipe.ingredients;
      }).reduce((pre, cur) => {
        // Concat all the different recipe ingredient arrays into one big array
        return pre.concat(cur);
      }).map((ing) => {
        return ing;
      });
      let combinedIngredients = combine(ingredientObj);
      ingArr = combinedIngredients.map(ing => {
        return prettifyIngredient(ing);
      });
    }

    setIngredientList(ingArr);
    return;
  }, [selectedRecipes]);

  const prettifyIngredient = (ingObj) => {
    if (Object.keys(ingObj).length === 0) return;
    if (!ingObj.ingredient) return;
    let prettyString;

    if (ingObj.unit) {
      // 1 cup of flour
      prettyString = ingObj.maxQty === 1 ? 
        ingObj.maxQty + " " + ingObj.unit + " of " + ingObj.ingredient /*1 cup of flour*/ :
        ingObj.maxQty + " " + ingObj.unitPlural + " of " + ingObj.ingredient; /*4 cups of flour*/
    } else {
      // 1 carrot
      prettyString = ingObj.maxQty + " " + ingObj.ingredient;
    }
    return prettyString;
  }

  return (
    <div id="shopping-list">
      <h3 className="header">Shopping List</h3>
      <hr/>
      <div className="list">
        <ul>
          {ingredientList.map((ingredient, index) => ingredient && <li key={index}>{ingredient}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default ShoppingList;
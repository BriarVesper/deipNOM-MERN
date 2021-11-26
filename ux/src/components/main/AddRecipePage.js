import React, { useState, useEffect } from 'react';
import NewRecipe from '../recipes/NewRecipe';
import AppContext from '../context';
import delegate from '../recipes/delegate';

import '../../style/Recipe.css';

function AddRecipePage() {
  const [ recipes, setRecipes ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let fetchRecipes = await delegate.getAllRecipes();
      let recipeList = fetchRecipes.data || [];
      let parsedRecipeList = recipeList.map(recipe => ({ ...recipe, ingredients: JSON.parse(recipe.ingredients) }));
      setRecipes(parsedRecipeList);  
    }
    fetchData();
  }, []);

  const dispatchRecipeEvent = (type, data) => {
    switch (type) {
      case 'ADD':
        handleNewRecipe(data);
        return;
      default:
        return;
    }
  };

  const handleNewRecipe = async (data) => {
    let newRecipe = data.newRecipe;
    let thumbnail = data.thumbnail;
    if (!newRecipe.title || !newRecipe.title.trim()) return null;

    if (thumbnail) {
      let imageURL = await fetchImageURL(thumbnail);
      newRecipe.image = imageURL;
    }

    delegate.submit({
      recipe: newRecipe
    }, 
      (res) => {
        let savedRecipe = res.data;
        savedRecipe.ingredients = JSON.parse(savedRecipe.ingredients);
        setRecipes([ ...recipes, savedRecipe ]); 
        console.log(res);
      },
      (err) => { console.log(err); }
    );
  }

  const fetchImageURL = async (file) => {
    return delegate.uploadThumbnail(file);
  }

  return (
    <div id="recipe-page">
      <AppContext.Provider value={{ recipes, dispatchRecipeEvent }}>
        <NewRecipe />
      </AppContext.Provider>
    </div>
  );

}

export default AddRecipePage;
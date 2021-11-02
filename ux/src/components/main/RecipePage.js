import React, { useState, useEffect } from 'react';
import NewRecipe from '../recipes/NewRecipe';
import RecipeList from '../recipes/RecipeList';
import EditRecipeModal from '../recipes/Modal.EditRecipe';
import AppContext from '../context';
import delegate from '../recipes/delegate';

import '../../style/Recipe.css';

function RecipePage() {
  const [ recipes, setRecipes ] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState({});
  const handleSetIsOpen = () => setIsOpen(!isOpen);

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
      case 'REMOVE':
        handleDeleteRecipe(data);
        return;
      case 'OPEN_EDIT':
        handleOpenEditModal(data);
        return;
      case 'EDIT':
        handleEditRecipe(data);
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

  const handleDeleteRecipe = (data) => {
    delegate.remove(
      data.id, 
      (res) => { 
        let removedRecipe = res.data;
        setRecipes(recipes.filter(recipe => recipe._id !== removedRecipe._id));
       },
      (err) => { console.log(err); }
    );
  }

  const handleOpenEditModal = (data) => {
    let editRecipe = recipes.find(recipe => recipe._id === data.id)
    setRecipeToEdit(editRecipe);
    handleSetIsOpen(!isOpen);
  }

  const handleEditRecipe = (data) => {
    let updatedRecipe = data.updatedRecipe;

    delegate.edit({
      recipe: updatedRecipe
    }, 
      (res) => {
        let updatedRecipe = res.data;
        updatedRecipe.ingredients = JSON.parse(updatedRecipe.ingredients);
        let updatedList = updateRecipeListAfterEdit(updatedRecipe);
        setRecipes(updatedList); 
        console.log(res);
      },
      (err) => { console.log(err); }
    );
  }

  const updateRecipeListAfterEdit = (updatedRecipe) => {
    let updRecipeIndex = recipes.findIndex(recipe => recipe._id === updatedRecipe._id);
    let recipeCopy = [...recipes];
    recipeCopy[updRecipeIndex] = updatedRecipe;
    return recipeCopy;
  }

  return (
    <div id="recipe-page">
      <AppContext.Provider value={{ recipes, dispatchRecipeEvent }}>
        <EditRecipeModal isOpen={isOpen} handleSetIsOpen={handleSetIsOpen} recipeToEdit={recipeToEdit}/>
        <NewRecipe />
        <RecipeList />
      </AppContext.Provider>
    </div>
  );

}

export default RecipePage;
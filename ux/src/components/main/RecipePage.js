import React, { useState, useEffect } from 'react';
import RecipeList from '../recipes/RecipeList';
import delegate from '../recipes/delegate';
import AppContext from '../context';
import EditRecipeModal from '../recipes/Modal.EditRecipe';

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
      case 'OPEN_EDIT':
        handleOpenEditModal(data);
        return;
      case 'EDIT':
        handleEditRecipe(data);
        return;
      case 'REMOVE':
        handleDeleteRecipe(data);
        return;
      default:
        return;
    }
  };

  const handleOpenEditModal = (data) => {
    let editRecipe = recipes.find(recipe => recipe._id === data.id)
    setRecipeToEdit(editRecipe);
    handleSetIsOpen(!isOpen);
  }


  const handleEditRecipe = async (data) => {
    let updatedRecipe = data.updatedRecipe;
    let thumbnail = data.thumbnail;

    if (thumbnail) {
      let imageURL = await fetchImageURL(thumbnail);
      updatedRecipe.image = imageURL;
    }

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

  const updateRecipeListAfterEdit = (updatedRecipe) => {
    let updRecipeIndex = recipes.findIndex(recipe => recipe._id === updatedRecipe._id);
    let recipeCopy = [...recipes];
    recipeCopy[updRecipeIndex] = updatedRecipe;
    return recipeCopy;
  }

  const fetchImageURL = async (file) => {
    return delegate.uploadThumbnail(file);
  }

  return (
    <div id="top-recipe-list">
      <AppContext.Provider value={{ recipes, dispatchRecipeEvent }}>
        <EditRecipeModal isOpen={isOpen} handleSetIsOpen={handleSetIsOpen} recipeToEdit={recipeToEdit}/>
        <RecipeList />
      </AppContext.Provider>
    </div>
  );
}

export default RecipePage;
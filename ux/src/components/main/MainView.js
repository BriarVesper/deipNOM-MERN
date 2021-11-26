import React, { useState, useEffect } from 'react';
import FadeIn from 'react-fade-in';
import AddRecipePage from './AddRecipePage';
import RecipePage from './RecipePage';
import ShoppingPage from './ShoppingPage';
import PageTab from '../tab/PageTab';
import { PageContext } from '../context';
import '../../style/mainView.css';

function MainView() {
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedRecipes, setSelectedRecipes] = useState(JSON.parse(localStorage.getItem('selectedRecipes')) || []);

  const handlePageChange = (index) => {
    setSelectedPage(index);
  }

  const handleSelectedRecipe = (recipe) => {
    setSelectedRecipes([...selectedRecipes, recipe]);
  }

  const handleRemoveSelectedRecipe = (removeIdx) => {
    let arrToFilter = [...selectedRecipes];
    arrToFilter.splice(removeIdx, 1);
    setSelectedRecipes(arrToFilter);
  }

  useEffect(() => {
    let saveRecipes = JSON.stringify(selectedRecipes);
    localStorage.setItem('selectedRecipes', saveRecipes);
  }, [selectedRecipes]);

  return (
    <div className="main-container">
      <FadeIn transitionDuration={1000}>
        <div id="main-heading">
          deipNOM
        </div>
        {selectedPage === 0 && 
          <PageContext.Provider value={{handleSelectedRecipe }}>
            <AddRecipePage/>
          </PageContext.Provider>
        }
        {selectedPage === 1 && 
          <PageContext.Provider value={{handleSelectedRecipe }}>
            <RecipePage/>
          </PageContext.Provider>
        }
        {selectedPage === 2 && 
          <PageContext.Provider value={{ selectedRecipes, handleRemoveSelectedRecipe }}>
            <ShoppingPage/>
          </PageContext.Provider>
        }
      </FadeIn>
        <div id="main-footer">
          <PageContext.Provider value={{ selectedPage, handlePageChange }}>
            <PageTab/>
          </PageContext.Provider>
        </div>
    </div>
  );
}

export default MainView;

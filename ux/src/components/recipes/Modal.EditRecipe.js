import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';

import SmallInput from './subcom/SmallInput';
import BigInput from './subcom/BigInput';
import AppContext from '../context';

import { FaPlusCircle } from 'react-icons/fa';
import { parse } from 'recipe-ingredient-parser-v3';

import '../../style/Recipe.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '450px'
  },
};

Modal.setAppElement('#root');
function EditRecipeModal({ isOpen: parentIsOpen = false, handleSetIsOpen, recipeToEdit }) {
  const { dispatchRecipeEvent } = useContext(AppContext);
  let thumbnail;
  const [modalIsOpen, setIsOpen] = useState(parentIsOpen);
  useEffect(() => { setIsOpen(parentIsOpen); }, [parentIsOpen]);

  function afterOpenModal() {
    console.log(recipeToEdit);
    thumbnail.style.color = '#cb9eff';
  }

  function closeModal() {
    handleSetIsOpen(false);
  }

  const handleEditRecipe = () => {
    let ingredients = ing.length !== 0 ? JSON.stringify(parseIngredients(ing)) : JSON.stringify(recipeToEdit.ingredients);

    // Is there a better way to do this?
    // Only update the fields that have been modified, keep everything else as it was
    let updatedRecipe = {
      ...recipeToEdit,
      title: title || recipeToEdit.title,
      description: description || recipeToEdit.description,
      source: source || recipeToEdit.source,
      ingredients: ingredients,
      instructions: instructions || recipeToEdit.instructions,
    }

    dispatchRecipeEvent('EDIT', { updatedRecipe: updatedRecipe });
    closeModal();
  };

  const parseIngredients = (ing) => {
    if (!ing || ing.trim().length === 0) return [{}];

    let ingArr = ing.split(/[\n,]+/).map(item => item.trim());
    let parsedIngredients = ingArr.map(item => parse(item, 'eng'));
    return parsedIngredients;
  };

  const handleAddThumbnail = (e) => {
    console.log("TODO");
  }

  const [title, titleInput] = SmallInput({ placeholder: recipeToEdit.title || "title" });
  const [description, descriptionInput] = SmallInput({ placeholder: recipeToEdit.description || "description" });
  const [source, sourceInput] = SmallInput({ placeholder: recipeToEdit.source || "source" });
  const [ing, ingInput] = BigInput({ placeholder: "ingredients" });
  const [instructions, instructionsInput] = BigInput({ placeholder: recipeToEdit.instructions || "instructins" });

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Recipe"
      >
        <div id="add-recipe">
          <h3 className="add-recipe-header">Editing {recipeToEdit.title}</h3>
          <div className="add-recipe-top-container">
            <div className="add-recipe-thumbnail" ref={(_thumbnail) => (thumbnail = _thumbnail)} onClick={handleAddThumbnail}><FaPlusCircle/></div>
            <div className="small-inputs">
              {titleInput}
              {descriptionInput}
              {sourceInput}
            </div>
          </div>
          <div className="add-recipe-btm-container">
            {ingInput}
            {instructionsInput}
            <button onClick={handleEditRecipe}>Edit Recipe</button>
            <button className="cancel-button" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EditRecipeModal;
import React, { useContext } from 'react';
import { PageContext } from '../context';
import Tab from './Tab';

const PageTab = () => {
  const { selectedPage } = useContext(PageContext);

  return (
    <div id="page-tab">
      <Tab
        id="recipe-tab"
        name="Add Recipe"
        index="0"
        active={selectedPage === 0}
      />
      <Tab
        id="add-recipe-tab"
        name="Recipe List"
        index="1"
        active={selectedPage === 1}
      />
      <Tab
        id="shopping-tab"
        name="Shopping List"
        index="1"
        active={selectedPage === 2}
      />
    </div>
  );
};

export default PageTab;
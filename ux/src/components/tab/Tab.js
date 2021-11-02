import React, { useContext } from 'react';
import { PageContext } from '../context';

function Tab(props) {
  const { handlePageChange } = useContext(PageContext);

  function switchTab(e) {
    let target = e.target;
    if (!target.classList.contains('tab-container')) return;
    if (target.classList.contains('active')) return;

    let list = target.parentNode;
    let index = Array.prototype.indexOf.call(list.children, target);
    handlePageChange(index);
  }

  return (
    <div id={props.id} className={`tab-container ${props.active ? "active" : ""}`} onClick={switchTab}>
          {props.name}
    </div>
  );
}

export default Tab;
import React, { useState } from 'react';

function SmallInput({ placeholder }) {
  const [value, setValue] = useState("");
  const input = <div>
      <input
        className="add-recipe-input small-input"
        type="text" 
        value={value} 
        onChange={e => {setValue(e.target.value)}}
        placeholder={placeholder}
      />
    </div>

  return [value, input];
}

export default SmallInput;
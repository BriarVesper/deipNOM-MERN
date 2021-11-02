import React, { useState } from 'react';

function BigInput({ placeholder }) {
  const [value, setValue] = useState("");
  const input = <div>
      <textarea
        className="add-recipe-input big-input"
        type="text" 
        value={value} 
        onChange={e => {setValue(e.target.value)}}
        placeholder={placeholder}
      />
    </div>

  return [value, input];
}

export default BigInput;
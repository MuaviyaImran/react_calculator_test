import React, { useState } from "react";
const FormulaInput = ({ addTag, autocompleteSuggestions }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTag = (tag) => {
    addTag(tag);
    setInputValue("");
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type to add tags..."
      />
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          width: "400px",
          flexWrap: "wrap",
          paddingLeft: "0",
        }}
      >
        {inputValue !== ""
          ? autocompleteSuggestions
              .filter((suggestion) =>
                suggestion.name.toLowerCase().includes(inputValue.toLowerCase())
              )
              .map((suggestion) => (
                <li
                  style={{
                    border: "1px solid black",
                    padding: "4px",
                    margin: "4px",
                    cursor: "pointer",
                  }}
                  key={suggestion.id}
                  onClick={() => handleAddTag(suggestion)}
                >
                  {suggestion.name}
                </li>
              ))
          : null}
      </ul>
    </div>
  );
};
export default FormulaInput;

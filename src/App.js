import React, { useEffect, useState, useRef } from "react";
import { suggestionsArray } from "./data";
const Tag = (props) => <span className="tag" {...props} />;
const Delete = (props) => <button className="delete" {...props} />;

const TagsInput = ({ value, onChange }) => {
  const inputRef = useRef("");
  const [newTag, setNewTag] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [names, setNames] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [isFormula, setIsFormula] = useState(false);
  const fetchAutocompleteSuggestions = async () => {
    // await fetch(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    setSuggestions(suggestionsArray);
    // });
  };
  useEffect(() => {
    fetchAutocompleteSuggestions();
  }, []);
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  useEffect(() => {
    if (specialCharRegex.test(inputVal)) {
      const chatacters = inputVal.split("");
      chatacters.map((char) => {
        value.push(char);
        onChange([...value]);
        return;
      });
    }
    console.log(inputRef.current);
  }, [inputVal]);
  const handleChange = (e) => {
    if (e.target.value[0] === "(") {
      let newValue = e.target.value.slice(1, -1);
      e.target.value = newValue;
      setIsFormula(true);
    }
    const n = suggestions.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(n);
    if (n.length) {
      setShowDropdown(true);
      setNames(n);
    }
    setNewTag(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.value !== "") {
      let trimmedNewTag = newTag.trim();
      if (
        value.indexOf(trimmedNewTag) === -1 &&
        operands.includes(trimmedNewTag)
      ) {
        onChange([...value, trimmedNewTag]);
        setNewTag("");
        e.target.value = "";
        setShowDropdown(false);
      }
    }
    if (e.keyCode === 8 && value.length && e.target.value === "") {
      if (value.length > 1) {
        value.pop();
        onChange([...value]);
      } else onChange([]);
    }
  };
  const handleRemoveTag = (e) => {
    let tag = e.target.parentNode.textContent.trim();
    let index = value.indexOf(tag);
    onChange([...value.slice(0, index), ...value.slice(index + 1)]);
  };
  const operands = ["-", "(", "+", "-", "*", "^", "/", ")"];

  return (
    <div className={`tags-input`}>
      {value.map((tag, index) => {
        if (
          (tag === "(" || tag === ")") &&
          (value[index + 1] === ")" || value[index - 1] === "(")
        ) {
          // index = index + 1;
          // return <span>{index}</span>;
        } else {
          const obj = suggestions.find((item) => item.name === tag);

          return operands.includes(tag) ? (
            tag
          ) : (
            <Tag key={index}>
              {tag}
              {obj.category === "property" ? (
                <Delete onClick={handleRemoveTag} />
              ) : null}
            </Tag>
          );
        }
      })}
      <input
        type="text"
        ref={inputRef}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showDropdown && names.length ? (
        <ul className="dropdown-main">
          {names.map((suggestion, index) => {
            return (
              <li
                className="suggestion-list"
                onClick={() => {
                  if (isFormula) {
                    const valuePoped = value.pop();
                    value.push(suggestion.name);
                    value.push(valuePoped);
                    onChange([...value]);
                    inputRef.current.value = "";
                    setIsFormula(false);
                  } else if (suggestion.category === "formula") {
                    onChange([...value, suggestion.name]);
                    setNewTag("");
                    setShowDropdown(false);
                    setInputVal("()");
                    inputRef.current.value = "()";
                    console.log(inputRef.current.value);
                  } else {
                    onChange([...value, suggestion.name]);
                    inputRef.current.value = "";
                  }
                  setNewTag("");
                  setShowDropdown(false);

                  inputRef.current.focus();
                }}
                key={index + suggestion.name}
              >
                <span>{suggestion.name}</span>
                <span>{suggestion.category}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

const App = () => {
  const [tags, setTags] = useState([]);
  console.log(tags);
  return <TagsInput value={tags} onChange={setTags} />;
};
export default App;

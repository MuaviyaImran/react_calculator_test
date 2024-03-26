import React, { useEffect, useState, useRef } from "react";

const Tag = (props) => <span className="tag" {...props} />;
const Delete = (props) => <button className="delete" {...props} />;

const TagsInput = ({ value, onChange }) => {
  const inputRef = useRef("");
  const [newTag, setNewTag] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [names, setNames] = useState([]);

  const fetchAutocompleteSuggestions = async () => {
    await fetch(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSuggestions(data);
      });
  };

  useEffect(() => {
    fetchAutocompleteSuggestions();
  }, []);

  const handleChange = (e) => {
    const n = suggestions
      .map((item) => item.name)
      .filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );
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
      value.pop();
      onChange([...value]);
    }
  };
  const handleRemoveTag = (e) => {
    let tag = e.target.parentNode.textContent.trim();
    let index = value.indexOf(tag);
    onChange([...value.slice(0, index), ...value.slice(index + 1)]);
  };
  const operands = ["-", "(", "+", "-", "*", "^", "/", ")"];

  return (
    <div>
      <div className={`tags-input`}>
        {value.map((tag, index) =>
          operands.includes(tag) ? (
            tag
          ) : (
            <Tag key={index}>
              {tag}
              <Delete onClick={handleRemoveTag} />
            </Tag>
          )
        )}
        <input
          style={{ position: "relative" }}
          type="text"
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        {showDropdown ? (
          <ul
            style={{
              listStyle: "none",
              position: "absolute",
              flexWrap: "wrap",
              left: "0",
              margin: "0",
              padding: "0",
              top: "35px",
              display: "flex",
              flexDirection: "column",
              border: "1px solid grey",
              width: "610px",
            }}
          >
            {names.map((name, index) => {
              return (
                <li
                  className="suggestion-list"
                  onClick={() => {
                    onChange([...value, name]);
                    setNewTag("");
                    setShowDropdown(false);
                    inputRef.current.value = "";
                  }}
                  key={index + name}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

const App = () => {
  const [tags, setTags] = useState([]);
  console.log(tags);
  return <TagsInput value={tags} onChange={setTags} />;
};
export default App;

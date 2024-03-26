import React, { useState } from "react";
import { useQuery } from "react-query";
import { suggestions } from "./data";
import FormulaTags from "./FormulaTags";
import FormulaInput from "./FormulaInput";
const fetchAutocompleteSuggestions = async () => {
  return suggestions;
};

const App = () => {
  const [formulaTags, setFormulaTags] = useState([]);
  const {
    isLoading,
    error,
    data: autocompleteSuggestions,
  } = useQuery("autocompleteSuggestions", fetchAutocompleteSuggestions);

  const addTag = (tag) => {
    setFormulaTags([...formulaTags, tag]);
  };

  const deleteTag = (tagId) => {
    setFormulaTags(formulaTags.filter((tag) => tag.id !== tagId));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log(formulaTags);
  return (
    <div
      style={{
        marginTop: "200px",
        height: "100%",
        alignItems: "center",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <FormulaInput
          addTag={addTag}
          autocompleteSuggestions={autocompleteSuggestions}
        />
        <FormulaTags formulaTags={formulaTags} deleteTag={deleteTag} />
      </div>
    </div>
  );
};

export default App;

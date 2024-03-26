const FormulaTags = ({ formulaTags, deleteTag }) => {
  const handleDeleteTag = (tagId) => {
    deleteTag(tagId);
  };

  return (
    <div>
      {formulaTags.map((tag) => (
        <div
          key={tag.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            width: "fit-content",
            border: "1px solid black",
            padding: "2px",
          }}
        >
          <span>{tag.value}</span>
          <span onClick={() => handleDeleteTag(tag.id)}>x</span>
        </div>
      ))}
    </div>
  );
};
export default FormulaTags;

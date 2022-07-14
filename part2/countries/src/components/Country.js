const Country = ({ name, handleSubmit }) => {
  return (
    <div>
      <span>{name}</span>&nbsp;
      <input type='submit' value='show' onClick={() => handleSubmit(name)} />
    </div>
  );
};

export default Country;

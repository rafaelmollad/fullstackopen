const Person = ({ name, number, handleDelete }) => {
  return (
    <p>
      {name} {number} <button onClick={handleDelete}>delete</button>
    </p>
  );
};

export default Person;

const Filter = ({ handleFilter, newFilter }) => {
  return (
    <div>
      filter shown with <input onChange={handleFilter} value={newFilter} />
    </div>
  );
};

export default Filter;

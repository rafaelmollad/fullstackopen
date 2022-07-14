const Total = ({ parts }) => {
  const total = parts.reduce((acc, current) => acc + current.exercises, 0);
  return <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>;
};

export default Total;

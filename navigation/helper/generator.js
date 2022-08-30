const generateId = (first, second) => {
  if (first > second) return first + second;
  else return second + first;
}

export default generateId;

// if (first > second) return `${parseInt(first)} + ${parseInt(second)}`;
//   else return `${parseInt(second)} + ${parseInt(first)}`;
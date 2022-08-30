export const generateId = (first, second) =>
  first > second ? first + second : second + first;

// export default generateId;

// if (first > second) return `${parseInt(first)} + ${parseInt(second)}`;
//   else return `${parseInt(second)} + ${parseInt(first)}`;
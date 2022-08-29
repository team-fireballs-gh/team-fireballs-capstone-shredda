const generateId = (first, second) =>
  first > second ? first + second : second + first;

export default generateId;

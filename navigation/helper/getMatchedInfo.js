// this function takes in the array of "users" and it will also take the 'id' of the user who is logged in;
const getMatchedUserInfo = (users, userLoggedIn) => {
  const newUsers = { ...users };
  // delete the userLoggedIn
  delete newUsers[userLoggedIn];

  // destructure the 'id' and the 'user' from the flattened array;
  const [id, user] = Object.entries(newUsers).flat();

  return { id, ...user };
};

export default getMatchedUserInfo;

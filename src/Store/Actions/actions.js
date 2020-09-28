const setUser = (user) => {
  console.log("action from user reducer", user);
  return {
    type: "SET_USER",
    data: user,
  };
};

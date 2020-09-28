const reducer = (state = {}, action) => {
  console.log("auth reducer runs", action);
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.data,
        isLoggedIn: true,
      };
    }
    default:{
        return state
    }
     
  }
};
export default reducer
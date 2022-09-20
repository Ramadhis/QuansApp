import { GET_USER } from "../../actions/myAccountAction";
const initialState = {
  getUserResult: false,
  getUserLoading: false,
  getUserError: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      console.log("4. masuk reducer", action);
      return {
        ...state,
        getUserResult: action.payload.data,
        getUserLoading: action.payload.loading,
        getUserError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default users;

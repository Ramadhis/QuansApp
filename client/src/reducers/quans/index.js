import { GET_LIST_QUANS } from "../../actions/quansAction";
const initialState = {
  getListQuansResult: false,
  getListQuansLoading: false,
  getListQuansError: false,
};

const quans = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_QUANS:
      console.log("4. masuk reducer", action);
      return {
        ...state,
        getListQuansResult: action.payload.data,
        getListQuansLoading: action.payload.loading,
        getListQuansError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default quans;

import { GET_LIST_TAG } from "../../actions/tagAction";

const initialState = {
  getListTagResult: false,
  getListTagLoading: false,
  getListTagError: false,
};

const tag = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_TAG:
      console.log("4. masuk reducer", action);
      return {
        ...state,
        getListTagResult: action.payload.data,
        getListTagLoading: action.payload.loading,
        getListTagError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default tag;

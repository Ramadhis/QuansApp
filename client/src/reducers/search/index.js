import { GET_LIST_SEARCH } from "../../actions/searchAction";
const initialState = {
  getListSearchResult: false,
  getListSearchLoading: false,
  getListSearchError: false,
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_SEARCH:
      console.log("4. masuk reducer", action);
      return {
        ...state,
        getListSearchResult: action.payload.data,
        getListSearchLoading: action.payload.loading,
        getListSearchError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default search;

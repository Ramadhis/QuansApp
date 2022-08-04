import { GET_LIST_MYANSWER } from "../../actions/MyAnswerAction";

const initialState = {
  getListMyAnswerResult: false,
  getListMyAnswerLoading: false,
  getListMyAnswerError: false,
};

const myanswer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_MYANSWER:
      console.log("4. masuk reducer", action);
      return {
        ...state,
        getListMyAnswerResult: action.payload.data,
        getListMyAnswerLoading: action.payload.loading,
        getListMyAnswerError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default myanswer;

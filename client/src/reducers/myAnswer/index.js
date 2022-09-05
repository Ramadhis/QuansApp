import { GET_LIST_MYANSWER, DEL_MYANSWER, ADD_MYANSWER } from "../../actions/myAnswerAction";

const initialState = {
  getListMyAnswerResult: false,
  getListMyAnswerLoading: false,
  getListMyAnswerError: false,
  statusResponse: false,
};

const myAnswer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_MYANSWER:
      console.log("4. masuk reducer", action);
      return {
        ...state,
        getListMyAnswerResult: action.payload.data,
        getListMyAnswerLoading: action.payload.loading,
        getListMyAnswerError: action.payload.errorMessage,
      };
    case DEL_MYANSWER:
      return 1;
    case ADD_MYANSWER:
      return {
        ...state,
        getListMyAnswerLoading: action.payload.loading,
        statusResponse: action.payload.statusResponse,
      };
    default:
      return state;
  }
};

export default myAnswer;

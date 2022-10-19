import { GET_LIST_MYQUESTION } from "../../actions/myQuestionAction";

const initialState = {
  getListMyQuestionResult: false,
  getListMyQuestionLoading: false,
  getListMyQuestionError: false,
};

const myquestion = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_MYQUESTION:
      return {
        ...state,
        getListMyQuestionResult: action.payload.data,
        getListMyQuestionLoading: action.payload.loading,
        getListMyQuestionError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default myquestion;

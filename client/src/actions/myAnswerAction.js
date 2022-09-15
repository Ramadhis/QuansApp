import axios from "axios";

export const GET_LIST_MYANSWER = "GET_LIST_MYANSWER";
export const DEL_MYANSWER = "DEL_MYANSWER";
export const ADD_MYANSWER = "ADD_MYANSWER";
export const UPDATE_MYANSWER = "UPDATE_MYANSWER";

export const getListMyAnswer = (MyAnswer, idUser) => {
  console.log("2. masuk action");
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_MYANSWER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios
      .post(
        "http://localhost:5000/quans/myAnswer/",
        {
          s: `${MyAnswer}`,
          idUser: `${idUser}`,
        },
        { withCredentials: true }
      )
      .then((response) => {
        //berhasil
        console.log("3. berhasil", response);
        dispatch({
          type: GET_LIST_MYANSWER,
          payload: {
            loading: false,
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal
        console.log("3. gagal", error.message);
        dispatch({
          type: GET_LIST_MYANSWER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addMyAnswer = (id, idUser, answer) => {
  //get API
  return (dispatch) => {
    //loading
    dispatch({
      type: ADD_MYANSWER,
      payload: {
        loading: true,
        statusResponse: false,
      },
    });

    axios
      .post(
        "http://localhost:5000/quans/addAnswer/",
        {
          id_user: `${idUser}`,
          id_parent: `${id}`,
          answer: `${answer}`,
        },
        { withCredentials: true }
      )
      .then((response) => {
        //berhasil
        console.log("3. berhasil", response);
        dispatch({
          type: ADD_MYANSWER,
          payload: {
            loading: false,
            statusResponse: true,
          },
        });
      })
      .catch((error) => {
        //gagal
        console.log("3. gagal", error.message);
        dispatch({
          type: ADD_MYANSWER,
          payload: {
            loading: false,
            statusResponse: false,
          },
        });
      });
  };
};

export const delMyAnswer = (id) => {
  console.log("2. masuk action");
  return (dispatch) => {
    //loading
    dispatch({
      type: DEL_MYANSWER,
      payload: {
        loading: true,
        statusResponse: false,
      },
    });

    //get API
    axios
      .delete("http://localhost:5000/quans/deleteAnswer/", {
        data: {
          id_quans: `${id}`,
        },
      })
      .then((response) => {
        //berhasil
        console.log("3. berhasil", response);
        dispatch({
          type: DEL_MYANSWER,
          payload: {
            loading: false,
            statusResponse: true,
          },
        });
      })
      .catch((error) => {
        //gagal
        console.log("3. gagal", error.message);
        dispatch({
          type: DEL_MYANSWER,
          payload: {
            loading: false,
            statusResponse: false,
          },
        });
      });
  };
};

export const updateMyAnswerAction = (id, answer) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_MYANSWER,
      payload: {
        loading: true,
        statusResponse: false,
      },
    });

    //get API
    axios
      .put("http://localhost:5000/quans/editAnswer/", {
        id_quans: `${id}`,
        answer: `${answer}`,
      })
      .then((response) => {
        //berhasil
        console.log("3. berhasil", response);
        dispatch({
          type: UPDATE_MYANSWER,
          payload: {
            loading: false,
            statusResponse: true,
          },
        });
      })
      .catch((error) => {
        //gagal
        console.log("3. gagal", error.message);
        dispatch({
          type: UPDATE_MYANSWER,
          payload: {
            loading: false,
            statusResponse: false,
          },
        });
      });
  };
};

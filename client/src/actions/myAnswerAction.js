import axios from "axios";

export const GET_LIST_MYANSWER = "GET_LIST_MYANSWER";
export const DEL_MYANSWER = "DEL_MYANSWER";

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

export const delMyAnswer = (id, idUser) => {
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
        "http://localhost:5000/quans/deleteAnswer/",
        {
          id_user: `${idUser}`,
          id_quans: `${id}`,
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

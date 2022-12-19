import axios from "axios";
import { urlApi } from "../components/helpers/Helpers";
import axiosInstance from "../components/helpers/axiosInstance";
const BASE_URL = urlApi();
const axiosCreate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const GET_LIST_MYANSWER = "GET_LIST_MYANSWER";
export const DEL_MYANSWER = "DEL_MYANSWER";
export const ADD_MYANSWER = "ADD_MYANSWER";
export const UPDATE_MYANSWER = "UPDATE_MYANSWER";

export const getListMyAnswer = (MyAnswer, idUser, order) => {
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
    axiosInstance
      .post(
        "http://localhost:5000/quans/myAnswer/",
        {
          s: `${MyAnswer}`,
          idUser: `${idUser}`,
          order: `${order}`,
        },
        { withCredentials: true }
      )
      .then((response) => {
        //berhasil
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

    axiosInstance
      .post("/quans/addAnswer/", {
        id_user: `${idUser}`,
        id_parent: `${id}`,
        answer: `${answer}`,
      })
      .then((response) => {
        //berhasil

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
    axiosInstance
      .delete("/quans/deleteAnswer/", {
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
    axiosInstance
      .put("/quans/editAnswer/", {
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

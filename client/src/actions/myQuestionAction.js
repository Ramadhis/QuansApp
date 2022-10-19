import axios from "axios";
import axiosInstance from "../components/helpers/axiosInstance";
import { urlApi } from "../components/helpers/Helpers";
const BASE_URL = urlApi();

const axiosCreate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const GET_LIST_MYQUESTION = "GET_LIST_MYQUESTION";

export const getListMyQuestion = (MyQuestion, idUser, order) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_MYQUESTION,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // axiosCreate.interceptors.request.use(
    //   (config) => {
    //     const response = axiosCreate.get("/token/refreshToken");
    //     localStorage.setItem("authorization", JSON.stringify(response.data));
    //     return config;
    //   },
    //   (error) => {
    //     return Promise.reject;
    //   }
    // );

    //get API
    axiosInstance
      .post("/quans/myQuestion/", {
        s: `${MyQuestion}`,
        idUser: `${idUser}`,
        order: `${order}`,
      })
      .then((response) => {
        //berhasil

        dispatch({
          type: GET_LIST_MYQUESTION,
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
          type: GET_LIST_MYQUESTION,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const addMyQuestion = (idUser, quans) => {
  console.log("2. masuk action");
  return (dispatch) => {
    //get API
    axiosCreate
      .post("/quans/addQuestion/", {
        id_user: `${idUser}`,
        question: `${quans}`,
      })
      .then((response) => {
        //berhasil
        // dispatch({
        //   type: GET_LIST_MYQUESTION,
        //   payload: {
        //     loading: false,
        //     data: response.data,
        //     errorMessage: false,
        //   },
        // });
      })
      .catch((error) => {
        //gagal
        // dispatch({
        //   type: GET_LIST_MYQUESTION,
        //   payload: {
        //     loading: false,
        //     data: false,
        //     errorMessage: error.message,
        //   },
        // });
      });
  };
};

export const deleteMyQuestion = () => {};

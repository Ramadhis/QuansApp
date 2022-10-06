import axios from "axios";
import { urlApi } from "../components/helpers/Helpers";
const BASE_URL = urlApi();
const axiosCreate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const GET_LIST_MYQUESTION = "GET_LIST_MYQUESTION";

export const getListMyQuestion = (MyQuestion, idUser, order) => {
  console.log("2. masuk action");
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

    //get API
    axiosCreate
      .post("http://localhost:5000/quans/myQuestion/", {
        s: `${MyQuestion}`,
        idUser: `${idUser}`,
        order: `${order}`,
      })
      .then((response) => {
        //berhasil
        console.log("3. berhasil", response);
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
        console.log("3. gagal", error.message);
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
      .post("http://localhost:5000/quans/addQuestion/", {
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

import axios from "axios";
import { urlApi } from "../components/helpers/Helpers";
const BASE_URL = urlApi();
const axiosCreate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const GET_LIST_QUANS = "GET_LIST_QUANS";
export const LIKE_QUANS = "LIKE_QUANS";
export const GET_POPULAR_QUANS = "GET_POPULAR_QUANS";

export const getListQuans = (id, idUser) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_QUANS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    // axios({
    //   method: "GET",
    //   url: "http://localhost:5000/quans/showquans/?id=" + id,
    //   timeout: 120000,
    // })
    axiosCreate
      .post("/quans/showquans", {
        id: id,
        idUser: idUser,
      })
      .then((response) => {
        //berhasil
        dispatch({
          type: GET_LIST_QUANS,
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
          type: GET_LIST_QUANS,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const likeQuans = (id, idUser) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: LIKE_QUANS,
      payload: {
        loading: true,
        errorMessage: false,
      },
    });

    //get API
    axiosCreate
      .post("/like/add/", {
        id_user: idUser,
        id_quans: id,
      })
      .then((response) => {
        //berhasil
        dispatch({
          type: LIKE_QUANS,
          payload: {
            loading: false,
            errorMessage: false,
          },
        });
      })
      .catch((error) => {
        //gagal
        dispatch({
          type: LIKE_QUANS,
          payload: {
            loading: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const getPopularQuans = () => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_POPULAR_QUANS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    // axios({
    //   method: "GET",
    //   url: "http://localhost:5000/quans/showquans/?id=" + id,
    //   timeout: 120000,
    // })
    axiosCreate
      .get("/quans/popular")
      .then((response) => {
        //berhasil
        dispatch({
          type: GET_POPULAR_QUANS,
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
          type: GET_POPULAR_QUANS,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

import axios from "axios";
import { urlApi } from "../components/helpers/Helpers";
const BASE_URL = urlApi();
const axiosCreate = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export const GET_USER = "GET_USER";
export const UPDATE_USER = "UPDATE_USER";

export const getUsers = (id) => {
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axiosCreate({
      method: "GET",
      url: "http://localhost:5000/user/myAccount/?id=" + id,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil
        dispatch({
          type: GET_USER,
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
          type: GET_USER,
          payload: {
            loading: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

export const updateUsers = (fd) => {
  console.log("2. masuk action");
  return (dispatch) => {
    //loading
    dispatch({
      type: UPDATE_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axiosCreate
      .put(
        "/user/profile/",
        // {
        //   id: `${id}`,
        //   name: `${name}`,
        //   email: `${email}`,
        //   job: `${job}`,
        //   image: `${image}`,
        // },
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        //berhasil
        console.log("3. berhasil", response);
        //update local storage data
        let localUserData = JSON.parse(localStorage.getItem("us_da_prv"));
        let updateUserData = { ...localUserData, email: response.data.data[0].email, name: response.data.data[0].name };
        console.log(updateUserData);
        localStorage.setItem("us_da_prv", JSON.stringify(updateUserData));
        //end update local storage data
        dispatch({
          type: UPDATE_USER,
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
          type: UPDATE_USER,
          payload: {
            loading: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

import axios from "axios";

export const GET_USER = "GET_USER";

export const getUsers = (id) => {
  console.log("2. masuk action");
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
    axios({
      method: "GET",
      url: "http://localhost:5000/user/myAccount/?id=" + id,
      timeout: 120000,
    })
      .then((response) => {
        //berhasil
        console.log("3. berhasil", response);
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
        console.log("3. gagal", error.message);
        dispatch({
          type: GET_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

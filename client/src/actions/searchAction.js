import axios from "axios";

export const GET_LIST_SEARCH = "GET_LIST_SEARCH";

export const getListSearch = (search, idUser) => {
  console.log("2. masuk action");
  return (dispatch) => {
    //loading
    dispatch({
      type: GET_LIST_SEARCH,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    //get API
    axios
      .post("http://localhost:5000/quans/search/", {
        search: `${search}`,
        idUser: `${idUser ? idUser : 0}`,
      })
      .then((response) => {
        //berhasil
        console.log("3. berhasil", response);
        dispatch({
          type: GET_LIST_SEARCH,
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
          type: GET_LIST_SEARCH,
          payload: {
            loading: false,
            data: false,
            errorMessage: error.message,
          },
        });
      });
  };
};

import axios from "axios";

export const urlApi = () => {
  return "http://localhost:5000";
};
export const urlImage = () => {
  return "http://localhost:5000/uploads/";
};

export const loginCheck = () => {
  const idUser = JSON.parse(localStorage.getItem("us_da_prv"));
  const user = idUser ? idUser.iduser : null;
  return user;
};

export const axiosPrivate = () => {
  axios
    .create({
      withCredentials: true,
      baseURL: urlApi,
    })
    .interceptors.request.use(
      async (config) => {
        // const currentDate = new Date();
        // if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("/refreshToken");
        localStorage.setItem("authorization", JSON.stringify(response.data));
        //   config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        //   setToken(response.data.accessToken);
        //   const decoded = jwt_decode(response.data.accessToken);
        //   //console.log(decoded);
        //   setName(decoded.name);
        //   setExpire(decoded.exp);
        // }
        return config;
      },
      (error) => {
        return Promise.reject;
      }
    );
};

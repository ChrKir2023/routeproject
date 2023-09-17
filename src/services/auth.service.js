import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password,role) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
	role
  });
};

const changepassword = (username, email, password) => {
	console.log(" Web Service Within web service call! ");
  return axios.put(API_URL + "changepassword", {
    username,
    email,
    password
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  changepassword,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
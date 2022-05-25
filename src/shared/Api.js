import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "./Cookie";

import { history } from "../redux/configureStore";
import { useDispatch } from "react-redux";
import { logoutDB } from "../redux/modules/user";

import swal from "sweetalert";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

//요청 api에 두가지 토큰을 실어줌
api.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  config.headers.common["Authorization"] = `Bearer ${token}`;
  config.headers.common["reAuthorization"] = `Bearer ${refreshToken}`;

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const dispatch = useDispatch();

    const { config, response } = error;
    const originalRequest = config;

    if (response.data.token) {
      // access token이 재발급 된 상태,
      setCookie("accessToken", response.data.token, 168);
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      originalRequest.headers.Authorization = `Bearer ${response.data.token}`;

      return axios(originalRequest);
    }

    if (response.data.success === false) {
      if (
        response.data.message === "token에 문제가 있음(기한만료가 아닌 에러)"
      ) {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        localStorage.clear();

        swal({
          text: "로그인 후 이용해 주세요",
          closeOnClickOutside: false,
        }).then(function (result) {
          if (result) {
            history.push("/login");
          }
        });
        return;
      }

      if (response.data.message === "유저 정보 불러오기에 실패하였습니다.") {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        swal({
          text: "로그인 후 이용해 주세요",
          closeOnClickOutside: false,
        }).then(function (result) {
          if (result) {
            history.push("/login");
          }
        });
        return;
      } else {
        return swal(response.data.message);
      }
    }

    // else {
    //   console.log(response);
    //   deleteCookie("accessToken");
    //   deleteCookie("refreshToken");
    //   localStorage.removeItem("userId");
    //   localStorage.removeItem("nickname");
    //   localStorage.removeItem("profileUrl");
    //   swal("로그인 시간이 만료되었습니다.");
    //   console.log("리프레쉬토큰 만료");
    //   history.push("/login");
    // }

    return Promise.reject(error);
  }
);

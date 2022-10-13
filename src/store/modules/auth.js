import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "../actions/auth";
import { USER_REQUEST } from "../actions/user";
import axios from "axios";

const state = {
  token: localStorage.getItem("user-token") || "",
  IdUser: localStorage.getItem("user-id") || "",
  status: "",
  hasLoadedOnce: false,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      axios
        .post("Auth", user)
        .then((resp) => {
          if (resp.data.Success) {
            console.log("/Auth RESP", resp);
            localStorage.setItem("user-token", resp.data.Token);
            localStorage.setItem("user-id", resp.data.IdUser);
            axios.defaults.headers.common["Authorization"] = resp.data.Token;
            commit(AUTH_SUCCESS, resp);
            dispatch(USER_REQUEST, resp.data.IdUser);
            resolve(resp);
          } else {
            commit(AUTH_ERROR);
          }
        })
        .catch((err) => {
          console.log(
            "🚀 ~ file: auth.js ~ line 45 ~ returnnewPromise ~ err",
            err
          );
          commit(AUTH_ERROR, err);
          localStorage.removeItem("user-token");
          reject(err);
        });
    });
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise((resolve) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem("user-token");
      delete axios.defaults.headers.common["Authorization"];
      resolve();
    });
  },
};

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = "loading";
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.token = resp.data.Token;
    state.hasLoadedOnce = true;
  },
  [AUTH_ERROR]: (state) => {
    state.status = "error";
    console.log("🚀 ~ file: auth.js ~ line 71 ~ state.status", state.status);
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

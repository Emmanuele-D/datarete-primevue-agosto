import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from "../actions/user";
import { AUTH_LOGOUT } from "../actions/auth";
import auth from "./auth";
import axios from "axios";

const state = {
  status: "",
  user: {},
  loaded: false,
};

const getters = {
  loggedUser: (state) => state.user,
  user_loaded: (state) => state.loaded,
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    axios
      .get("Auth/Users/" + auth.state.IdUser)
      .then((resp) => {
        commit(USER_SUCCESS, resp.data);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  },
};

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = "loading";
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = "success";
    state.user = resp;
    state.loaded = true;
  },
  [USER_ERROR]: (state) => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: (state) => {
    state.user = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

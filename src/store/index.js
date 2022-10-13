import Vue from "vue";
import { createStore } from "vuex";
import config from "./modules/config";
import auth from "./modules/auth";
import user from "./modules/user";
import menu from "./modules/menu";
import crm from "./modules/crm";
export default createStore({
  modules: {
    config,
    auth,
    user,
    menu,
    crm,
  },
});

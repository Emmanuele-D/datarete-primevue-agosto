import { createApp } from "vue";
import App from "./App.vue";

import axios from "axios";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.put["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.baseURL = "https://posadas-core.datarete.cloud/api/";
//To load existing token with a refresh
const token = localStorage.getItem("user-token");
if (token) {
  axios.defaults.headers.common["Authorization"] = token;
}

import router from "./router";

import store from "./store";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/scss/style.scss";

import PrimeVueConfigurator from "./utils/PrimeVueConfigurator";
import ConfirmationService from "primevue/confirmationservice";

const app = createApp(App);
PrimeVueConfigurator.init(app);
app.use(router);
app.use(store);
app.use(ConfirmationService);

app.mount("#app");

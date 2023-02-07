import { createApp } from "vue";
import App from "./App.vue";
import StoreLayout from "./layouts/StoreLayout.vue";
import router from "./router";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "./assets/scss/app.scss";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faClose, faMoneyBills, faShoppingCart, faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faClose, faMoneyBills, faShoppingCart, faTrash, faPlus, faMinus);

createApp(App)
  .component("layout-store", StoreLayout)
  .component("fa", FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount("#app");

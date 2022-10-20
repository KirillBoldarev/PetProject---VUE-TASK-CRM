import { createStore } from "vuex";
import authenticate from "./modules/authenticate";
import users from "./modules/users";

export default createStore({
  modules: { authenticate, users },
});

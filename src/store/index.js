import { createStore } from "vuex";
import authenticate from "./modules/authenticate";

export default createStore({
  modules: { authenticate },
});

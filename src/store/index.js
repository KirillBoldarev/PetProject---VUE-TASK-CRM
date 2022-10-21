import { createStore } from "vuex";
import authentication from "./modules/authentication";
import users from "./modules/users";
import tasks from "./modules/tasks";

export default createStore({
  modules: { authentication, users, tasks },
});

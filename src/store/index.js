import { createStore } from "vuex";
import authentication from "./modules/authentication";
import users from "./modules/users";
import tasks from "./modules/tasks";
import relations from "./modules/relations";
import files from "./modules/files";

export default createStore({
  modules: {
    authentication,
    users,
    tasks,
    relations,
    files,
  },
});

import { createStore } from "vuex";
import authentication from "./modules/authentication";
import users from "./modules/users";
import tasks from "./modules/tasks";
import relations from "./modules/relations";
import inspectedTask from "./modules/inspectedTask";
import comments from "./modules/comments";

export default createStore({
  modules: {
    authentication,
    users,
    tasks,
    relations,
    inspectedTask,
    comments,
  },
});

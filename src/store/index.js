import { createStore } from "vuex";
import authentication from "./modules/authentication";
import users from "./modules/users";
import tasks from "./modules/tasks";
import inspectedTask from "./modules/inspectedTask";
import comments from "./modules/comments";
import device from "./modules/device";

export default createStore({
  modules: {
    authentication,
    users,
    tasks,
    inspectedTask,
    comments,
    device
  },
});

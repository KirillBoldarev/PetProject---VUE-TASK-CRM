import localbase from "@/js/libs/localbase";
import { toRaw } from "vue"; //функция извлекающая объект из прокси

export default {
  data() {
    return {
      /* subscribtionsForTasksMutations: null, */
      subscribtionsForActionsUponTasks: null,
    };
  },
  beforeMount() {
/*     this.subscribtionsForTasksMutations = this.$store.subscribe(
      (mutation, state) => {
        //Initialize
        if (mutation.type === "INITIALIZE_TASK_LIST") {
          this.taskList = this.$store.getters.GET_TASK_LIST;
        }
        //Create
        if (mutation.type === "CREATE_TASK") {
          localbase
            .collection("tasks")
            .add(mutation.payload)
            .catch((error) => console.log(error));
        }
        //Delete
        if (mutation.type === "DELETE_TASK") {
          localbase
            .collection("tasks")
            .doc({ id: mutation.payload.id })
            .delete()
            .catch((error) => console.log(error));
        }

        //Edit
        if (mutation.type === "EDIT_TASK") {
          this.taskList = this.taskList.map((task) => {
            return task.id === mutation.payload.id ? mutation.payload : task;
          });

          localbase
            .collection("tasks")
            .doc({ id: mutation.payload.id })
            .set(mutation.payload)
            .then((response) => {
              if (
                mutation.payload.id ===
                this.$store.getters.GET_INSPECTED_TASK.id
              ) {
                this.$store.commit("UPDATE_INSPECTED_TASK", mutation.payload);
              }
            })
            .catch((error) => console.log(error));
        }

        //Complete
        if (mutation.type === "COMPLETE_TASK") {
          let target = this.taskList.find(
            (task) => task.id === mutation.payload.id
          );
          localbase
            .collection("tasks")
            .doc({ id: target.id })
            .set(toRaw(target))
            .then((response) => {
              if (
                mutation.payload.id ===
                this.$store.getters.GET_INSPECTED_TASK.id
              ) {
                this.$store.commit(
                  "UPDATE_INSPECTED_TASK",
                  this.$store.getters.GET_TASK_LIST.find(
                    (task) => task.id === mutation.payload.id
                  )
                );
              }
            })
            .catch((error) => console.log(error));
        }
      }
    ); */

    this.subscribtionsForActionsUponTasks = this.tasksStore.$onAction(
      (action) => {
        //INITIALIZE
        if (action.name === "INITIALIZE_TASK_LIST") {
          action.after(() => {
            this.taskList = this.tasksStore.GET_TASK_LIST;
          });
        }

        //CREATE
        if (action.name === "CREATE_TASK") {
          localbase
            .collection("tasks")
            .add(action.args[0])
            .catch((error) => console.log(error));
        }

        //DELETE
        if (action.name === "DELETE_TASK") {
          localbase
            .collection("tasks")
            .doc({ id: action.args[0].id })
            .delete()
            .catch((error) => console.log(error));
        }

        //EDIT
        if (action.name === "EDIT_TASK") {
          this.taskList = this.taskList.map((task) => {
            return task.id === action.args[0].id ? action.args[0] : task;
          });
          localbase
            .collection("tasks")
            .doc({ id: action.args[0].id })
            .set(action.args[0])
            .then((response) => {
              if (
                this.inspectedTaskStore.GET_INSPECTED_TASK &&
                action.args[0].id ===
                  this.inspectedTaskStore.GET_INSPECTED_TASK.id
              ) {
                this.inspectedTaskStore.UPDATE_INSPECTED_TASK(action.args[0]);
              }
            })
            .catch((error) => console.log(error));
        }

        //COMPLETE
        if (action.name === "COMPLETE_TASK") {
          action.after(() => {
            let completedTask = this.tasksStore.GET_TASK_LIST.find(
              (task) => task.id === action.args[0].id
            );
            localbase
              .collection("tasks")
              .doc({ id: action.args[0].id })
              .set(toRaw(completedTask))
              .then((response) => {
                //COMPLETE_INSPECTED_TASK
                if (
                  this.inspectedTaskStore.GET_INSPECTED_TASK &&
                  action.args[0].id === this.inspectedTaskStore.GET_INSPECTED_TASK.id
                ) {
                  this.inspectedTaskStore.UPDATE_INSPECTED_TASK(completedTask);
                }
              })
              .catch((error) => console.log(error));
          });
        }
      }
    );
  },

  beforeUnmounted() {
    /* this.subscribtionsForTasksMutations = null; */
    this.subscribtionsForActionsUponTasks = null;
  },
};

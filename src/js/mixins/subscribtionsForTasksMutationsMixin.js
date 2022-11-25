import localbase from "@/js/localbase";
import { toRaw } from "vue"; //функция извлекающая объект из прокси

export default {
  data() {
    return {
      subscribtionsForTasksMutations: null,
    };
  },
  beforeMount() {
    this.subscribtionsForTasksMutations = this.$store.subscribe(
      (mutation, state) => {
        //Initialize
        if (mutation.type === "initializeTaskList") {
          this.taskList = this.$store.getters.getTaskList;
        }
        //Inspect
        if (mutation.type === "inspectTask") {
          this.inspectedTask = mutation.payload;
        }
        //ClearInspectedTask
        if (mutation.type === "clearInspectedTask") {
          this.inspectedTask = null;
        }
        //initializeInspectedTask
        if (mutation.type === "initializeInspectedTask") {
          this.inspectedTask = this.$store.getters.getInspectedTask;
        }
        //UpdateInspectedTask
        if (mutation.type === "updateInspectedTask") {
          this.inspectedTask = this.$store.getters.getInspectedTask;
        }
        //Create
        if (mutation.type === "createTask") {
          localbase
            .collection("tasks")
            .add(mutation.payload)
            .catch((error) => console.log(error));
        }
        //Delete
        if (mutation.type === "deleteTask") {
          localbase
            .collection("tasks")
            .doc({ id: mutation.payload.id })
            .delete()
            .catch((error) => console.log(error));
          localbase
            .collection("task-senders")
            .doc({ task: mutation.payload.id })
            .delete()
            .catch((error) => console.log(error));
          localbase
            .collection("task-executors")
            .doc({ task: mutation.payload.id })
            .delete()
            .catch((error) => console.log(error));
        }
        //Edit
        if (mutation.type === "editTask") {
          localbase
            .collection("tasks")
            .doc({ id: mutation.payload.id })
            .set(mutation.payload)
            .then((response) => {
              if (mutation.payload.id === this.$store.getters.getInspectedTask.id) {
                this.$store.commit("updateInspectedTask", mutation.payload);
              }
            })
            .catch((error) => console.log(error));
        }
        //Complete
        if (mutation.type === "completeTask") {
          let target = this.taskList.find(
            (task) => task.id === mutation.payload.id
          );
          localbase
            .collection("tasks")
            .doc({ id: target.id })
            .set(toRaw(target))
            .catch((error) => console.log(error));
        }

        //Bind
        if (mutation.type === "bindTask") {
          localbase
            .collection("task-senders")
            .add({
              task: mutation.payload.id,
              sender: mutation.payload.sender,
            })
            .catch((error) => console.log(error));
          localbase
            .collection("task-executors")
            .add({
              task: mutation.payload.id,
              executor: mutation.payload.executor,
            })
            .catch((error) => console.log(error));
        }
        //Rebind
        if (mutation.type === "rebindTask") {
          localbase
            .collection("task-senders")
            .doc({ task: mutation.payload.id })
            .update({
              task: mutation.payload.id,
              sender: mutation.payload.sender,
            })
            .catch((error) => console.log(error));
          localbase
            .collection("task-executors")
            .doc({ task: mutation.payload.id })
            .update({
              task: mutation.payload.id,
              executor: mutation.payload.executor,
            })
            .catch((error) => console.log(error));
        }
      }
    );
  },

  beforeUnmounted() {
    this.subscribtionsForTasksMutations = null;
  },
};

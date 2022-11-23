import localbase from "@/js/localbase";
import { toRaw } from "vue"; //функция извлекающая объект из прокси

export default {
  data() {
    return {
      subscribtionsForTasksMutations: null,
    };
  },
  mounted() {
    this.subscribtionsForTasksMutations = this.$store.subscribe(
      (mutation, state) => {
        //Initialize
        if (mutation.type === "initializeTaskList") {
          this.taskList = this.$store.getters.getTaskList;
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
            .catch((error) => console.log(error));
        }
        //Complete
        if (mutation.type === "completeTask") {
          let target = this.taskList.find(
            (task) => task.id === mutation.payload.id
          );
          console.log(target)
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
    this.$store.dispatch("initializeTaskListAction");
  },

  beforeUnmounted() {
    this.subscribtionsForTasksMutations = null;
  },
};

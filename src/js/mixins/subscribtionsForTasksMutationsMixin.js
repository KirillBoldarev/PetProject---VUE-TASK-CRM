import localbase from "@/js/localbase";

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
          localbase.collection("tasks").add(mutation.payload);
        }
        //Delete
        if (mutation.type === "deleteTask") {
          localbase
            .collection("tasks")
            .doc({ id: mutation.payload.id })
            .delete();
          localbase
            .collection("task-senders")
            .doc({ task: mutation.payload.id })
            .delete();
          localbase
            .collection("task-executors")
            .doc({ task: mutation.payload.id })
            .delete();
        }
        //Edit
        if (mutation.type === "editTask") {
          localbase
            .collection("tasks")
            .doc({ id: mutation.payload.id })
            .set(mutation.payload);
        }
        //Complete
        if (mutation.type === "completeTask") {
          localbase
            .collection("tasks")
            .doc({ id: mutation.payload.id })
            .update({
              isCompleted: mutation.payload.isCompleted,
            });
        }
        //Bind
        if (mutation.type === "bindTask") {
          localbase.collection("task-senders").add({
            task: mutation.payload.id,
            sender: mutation.payload.sender,
          });
          localbase.collection("task-executors").add({
            task: mutation.payload.id,
            executor: mutation.payload.executor,
          });
        }
        //Rebind
        if (mutation.type === "rebindTask") {
          localbase
            .collection("task-senders")
            .doc({ task: mutation.payload.id })
            .update({
              task: mutation.payload.id,
              sender: mutation.payload.sender,
            });
          localbase
            .collection("task-executors")
            .doc({ task: mutation.payload.id })
            .update({
              task: mutation.payload.id,
              executor: mutation.payload.executor,
            });
        }
      }
    );
    this.$store.dispatch("initializeTaskListAction");
  },

  beforeUnmounted() {
    this.subscribtionsForTasksMutations = null;
  },
};

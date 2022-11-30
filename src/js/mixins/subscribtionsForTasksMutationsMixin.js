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
        if (mutation.type === "INITIALIZE_TASK_LIST") {
          this.taskList = this.$store.getters.GET_TASK_LIST;
        }
        //Inspect
        if (mutation.type === "INSPECT_TASK") {
          this.inspectedTask = this.$store.getters.GET_INSPECTED_TASK;
        }
        //CLEAR_INSPECTED_TASK
        if (mutation.type === "CLEAR_INSPECTED_TASK") {
          this.inspectedTask = null;
        }
        //INITIALIZE_INSPECTED_TASK
        if (mutation.type === "INITIALIZE_INSPECTED_TASK") {
          this.inspectedTask = this.$store.getters.GET_INSPECTED_TASK;
        }
        //UPDATE_INSPECTED_TASK
        if (mutation.type === "UPDATE_INSPECTED_TASK") {
          this.inspectedTask = this.$store.getters.GET_INSPECTED_TASK;
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
    );
  },

  beforeUnmounted() {
    this.subscribtionsForTasksMutations = null;
  },
};

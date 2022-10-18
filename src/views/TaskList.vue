<template>
  <div class="title">User's tasks management</div>
  <div class="tasks">
    <div
      v-for="task in tasks"
      class="task"
      :class="{ completed: task.isCompleted === true }"
      :key="task.name"
    >
      <img
        v-if="task.isCompleted === true"
        @click="task.isCompleted = !task.isCompleted"
        class="icon--mini"
        src="@/icons/check-mark2.png"
        alt=""
      />
      <img
        v-if="task.isCompleted === false"
        @click="task.isCompleted = !task.isCompleted"
        class="icon--mini"
        src="@/icons/not-checked.png"
        alt=""
      />
      <div class="task__container">
        <div class="task__data">
          <span
            :class="{ lineThrougth: task.isCompleted === true }"
            class="task__data"
            >{{ task.name }}</span
          >
        </div>
        <img
          src="@/icons/trash-bin.png"
          class="icon"
          @click="this.tasks.splice(this.tasks.indexOf(task), 1)"
        />
      </div>
    </div>
  </div>
  <div class="container__add-task-box">
    <input
      name="newTask"
      type="text"
      placeholder="Название задачи"
      v-model="newTaskName"
      @keypress.ctrl.enter="addTask"
    />
    <img src="@/icons/check-mark.png" class="icon" @click="addTask" />
  </div>
</template>

<script>
export default {
  name: "componentTask",
  data() {
    return {
      newTaskName: "",
      tasks: [
        {
          id: "123",
          name: "Create ToDo task in VueJS",
          isCompleted: false,
        },
      ],
    };
  },
  methods: {
    addTask: function () {
      if (!this.newTaskName == "") {
        this.tasks.push({
          name: this.newTaskName,
          isCompleted: false,
          id: Math.random().toString(36).substring(2, 7),
        });
        this.newTaskName = "";
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss">
.task {
  display: flex;
  align-items: center;
  margin: 10px auto;
  width: 80%;
  border-radius: 30px;
  padding: 15px;
  background-color: rgba(255, 255, 255, 0.5);
  height: auto;

  &__container {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
    height: auto;
    align-items: center;
    gap: 30px;
  }

  &__data {
    display: flex;
    flex-direction: row;
    flex: 1 0 auto;
    align-items: center;
    gap: 30px;
    text-align: center;
    max-width: 90%;
  }
  & > span {
    padding-left: 10px;
  }
}



.icon {
  font-size: 34px;
  color: #fff;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  text-decoration: none;
  cursor: pointer;

  &--mini {
    width: 45px;
    height: 45px;
    cursor: pointer;
  }
}
</style>

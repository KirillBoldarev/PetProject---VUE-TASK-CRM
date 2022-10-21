<template>
  <!--   <div class="tasks">
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
        src="@/icons/check.png"
        alt=""
      />
      <img
        v-if="task.isCompleted === false"
        @click="task.isCompleted = !task.isCompleted"
        class="icon--mini"
        src="@/icons/notСheck.png"
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
          src="@/icons/trash.png"
          class="icon"
          @click="this.tasks.splice(this.tasks.indexOf(task), 1)"
        />
      </div>
    </div>
  </div> -->

  <div class="container">
    <h2>Управление личными задачами <add-task-button></add-task-button></h2>
    <div class="tasklist">
      <div class="tasklist__header">
        <div class="tasklist__header-item">Состояние</div>
        <div class="tasklist__header-item">Отправитель</div>
        <div class="tasklist__header-item">Описание задачи</div>
        <div class="tasklist__header-item">Действия</div>
      </div>
      <div v-for="task in tasks" :key="task.id" class="tasklist__record">
        <div class="tasklist__record-item">
          <img
            v-if="task.isCompleted === true"
            @click="completeTask(task)"
            class="icon--mini"
            src="@/icons/check.png"
            alt=""
          />
          <img
            v-if="task.isCompleted === false"
            @click="completeTask(task)"
            class="icon--mini"
            src="@/icons/notСheck.png"
            alt=""
          />
        </div>
        <div class="tasklist__record-item">
          {{ this.getSenderName(task.sender) }}
        </div>
        <div class="tasklist__record-item">{{ task.description }}</div>
        <div class="tasklist__record-item">
          <img class="icon" src="@/icons/plus.png" alt="" />
          <img class="icon" src="@/icons/redirect.png" alt="" />
          <img class="icon" src="@/icons/edit.png" alt="" />
          <img
            @click="deleteTask(task)"
            class="icon"
            src="@/icons/trash.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddTaskButton from "@/components/AddTaskButton.vue";

export default {
  name: "TaskList",

  components: {
    AddTaskButton,
  },

  data() {
    return {
      isModalOpen: false,
      tasks: [],
    };
  },

  created() {
    this.tasks = this.personalTasks;
  },

  methods: {
    getSenderName(senderId) {
      let sender = this.userList.find((user) => user.id === senderId);
      if (!sender) {
        return "Пользователь был удален";
      } else {
        let message = `${sender.firstName} ${sender.secondName}`;
        return message;
      }
    },

    deleteTask(item) {
      let filteredTasks = this.taskList.filter((task) => task.id !== item.id);
      localStorage.setItem("taskList", JSON.stringify(filteredTasks));
      this.$store.commit("updateTaskList");
    },

    completeTask(item) {
      let updatedTasks = this.taskList;
      updatedTasks.forEach((task) => {
        if (task.id === item.id) {
          item.isCompleted = !item.isCompleted;
          localStorage.setItem("taskList", JSON.stringify(updatedTasks));
          this.$store.commit("updateTaskList");
        }
      });
    },
  },

  computed: {
    userList() {
      return JSON.parse(localStorage.getItem("userList"));
    },
    taskList() {
      return this.$store.getters.getTaskList;
    },

    personalTasks() {
      if (!this.taskList) {
        return [];
      } else {
        let currentUserId = this.$store.getters.authenticatedUser.id;
        return this.taskList.filter((task) => task.executor === currentUserId);
      }
    },
  },

  watch: {
    taskList() {
      this.tasks = this.personalTasks;
    },
  },
};
</script>

<style lang="scss">
.tasklist {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__header {
    display: grid;
    grid-template-columns: 0.2fr 1fr 3fr 1fr;
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  &__header-item {
    border: 1px solid red;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px;
    min-height: 100%;
    gap: 10px;

    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:last-child {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

  &__record {
    display: grid;
    grid-template-columns: 0.2fr 1fr 3fr 1fr;
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  &__record-item {
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 5px;
    min-height: 100%;

    &:first-child {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    &:last-child {
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
    }
  }
}

.task {
  display: flex;
  align-items: center;
  margin: 10px auto;
  width: 80%;
  border-radius: 30px;
  padding: 10px;
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

.row {
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
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

<template>
  <div class="container">
    <div class="header">
      <h2>Управление личными задачами</h2>
      <add-task-button
        :taskList="taskList"
        :userList="userList"
        :target="this.$store.state.authentication.authenticatedUser"
      ></add-task-button>
    </div>
    <div class="tasklist">
      <div class="tasklist__header">
        <div class="tasklist__header-item">Состояние</div>
        <div class="tasklist__header-item">Отправитель</div>
        <div class="tasklist__header-item">Описание задачи</div>
        <div class="tasklist__header-item">Действия</div>
      </div>
      <div
        v-for="task in personalTasks"
        :key="task.id"
        class="tasklist__record"
      >
        <div class="tasklist__record-item">
          <complete-task-button
            :target="task"
            :taskList="taskList"
          ></complete-task-button>
        </div>
        <div class="tasklist__record-item">
          {{ this.getSenderName(task.sender) }}
        </div>
        <div class="tasklist__record-item">{{ task.description }}</div>
        <div class="tasklist__record-item">
          <div>
            <redirect-task-button
              :target="task"
              :userList="userList"
              :taskList="taskList"
            ></redirect-task-button>
          </div>
          <div>
            <edit-task-button
              :target="task"
              :userList="userList"
              :taskList="taskList"
            ></edit-task-button>
          </div>
          <div>
            <delete-task-button
              :target="task"
              :taskList="taskList"
            ></delete-task-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddTaskButton from "@/components/AddTaskButton.vue";
import DeleteTaskButton from "@/components/DeleteTaskButton.vue";
import CompleteTaskButton from "@/components/CompleteTaskButton.vue";
import EditTaskButton from "@/components/EditTaskButton.vue";
import RedirectTaskButton from "@/components/RedirectTaskButton.vue";

export default {
  name: "TaskList",

  components: {
    AddTaskButton,
    DeleteTaskButton,
    CompleteTaskButton,
    EditTaskButton,
    RedirectTaskButton,
  },

  props: {
    taskList: {
      type: Array,
      required: true,
    },
    userList: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
  },

  created() {},

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
  },

  computed: {
    personalTasks() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) => task.executor === this.$store.getters.authenticatedUser.id
        );
      }
    },
  },

  watch: {},
};
</script>

<style lang="scss">
.tasklist {
  display: flex;
  flex-direction: column;
  gap: 30px;

  &__header {
    display: grid;
    grid-template-columns: 85px 1fr 3fr 130px;
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
    grid-template-columns: 85px 1fr 3fr 130px;
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
    gap: 5px;

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
  width: 25px;
  height: 25px;
  text-decoration: none;
  cursor: pointer;

  &--mini {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>

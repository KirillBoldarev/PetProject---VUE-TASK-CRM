<template>
  <template v-for="page in pages" :key="page.name">
    <div class="flex-column center" v-if="this.currentPage === page.name">
      <h2 class="page__title">Управление задачами</h2>
      <div class="flex-column center">
        <tabs
          :tabs="pages"
          :selectedTab="currentPage"
          @changeTab="changePage"
        ></tabs>
        <div class="form">
          <label class="form__label"> Отображать завершенные:</label>
          <input
            v-model="completed"
            type="checkbox"
            name="completedTask"
            id="completedCheckbox"
          />
          <label class="form__label"> Поиск:</label>
          <input class="form__input" v-model="this.searchValue" type="text" />
          <label class="form__label"> Добавить задачу:</label>
          <button-with-modal-form
            :tooltip="'Добавить задачу'"
            :image="require('@/icons/plus.png')"
          >
            <template v-slot:formSlot="{ closeModal }">
              <add-task-form
                @close="closeModal"
                :taskList="taskList"
                :userList="userList"
                :target="this.$store.state.authentication.getAuth"
              ></add-task-form>
            </template>
          </button-with-modal-form>
        </div>
      </div>
      <div class="table">
        <div class="table__row table__row--5">
          <div class="table__column">Состояние</div>
          <div v-if="currentPage === 'personal'" class="table__column">
            Отправитель
          </div>
          <div v-if="currentPage === 'charged'" class="table__column">
            Исполнитель
          </div>
          <div class="table__column">Описание задачи</div>
          <div class="table__column">Действия</div>
        </div>

        <transition-group name="slide-fade">
          <div
            class="table__row table__row--5"
            v-for="task in this.filterSource(page.dataSource)"
            :key="task.id"
          >
            <div class="table__column">
              <complete-task-action :target="task"></complete-task-action>
            </div>
            <div v-if="currentPage === 'personal'" class="table__column">
              <span
                v-if="
                  this.getSender(task).firstName &&
                  this.getSender(task).secondName
                "
                >{{ this.getSender(task).firstName }}
                {{ this.getSender(task).secondName }}</span
              >
              <span v-else>{{ this.getSender(task).login }}</span>
            </div>

            <div v-if="currentPage === 'charged'" class="table__column">
              <span
                v-if="
                  this.getExecutor(task).firstName &&
                  this.getExecutor(task).secondName
                "
                >{{ this.getExecutor(task).firstName }}
                {{ this.getExecutor(task).secondName }}</span
              >
              <span v-else>{{ this.getExecutor(task).login }}</span>
            </div>
            <div
              class="table__column"
              style="cursor: pointer"
              @click="this.inspectTask(task)"
            >
              {{ task.title }}
            </div>
            <div class="table__column">
              <button-with-modal-form
                v-if="
                  task.isCompleted === false &&
                  this.getSender(task).id === this.$store.getters.getAuth.id
                "
                :image="require('@/icons/edit.png')"
                :tooltip="'Редактировать'"
              >
                <template #formSlot="{ closeModal }">
                  <edit-task-form
                    @close="closeModal"
                    :taskList="taskList"
                    :userList="userList"
                    :target="task"
                  ></edit-task-form>
                </template>
              </button-with-modal-form>

              <delete-task-action :target="task"></delete-task-action>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </template>
</template>

<script>
import DeleteTaskAction from "@/components/actions/DeleteTaskAction.vue";
import CompleteTaskAction from "@/components/actions/CompleteTaskAction.vue";
import Tabs from "@/components/Tabs.vue";
import ButtonWithModalForm from "@/components/ButtonWithModalForm.vue";
import AddTaskForm from "@/components/forms/AddTaskForm.vue";
import EditTaskForm from "@/components/forms/EditTaskForm.vue";

export default {
  name: "TaskList",

  components: {
    DeleteTaskAction,
    CompleteTaskAction,
    Tabs,
    ButtonWithModalForm,
    AddTaskForm,
    EditTaskForm,
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
    return {
      currentPage: "personal",
      searchValue: "",
      completed: true,
    };
  },
  computed: {
    pages() {
      return [
        {
          name: "personal",
          label: "Полученные",
          dataSource: this.personalTasks,
        },
        {
          name: "charged",
          label: "Отправленные",
          dataSource: this.chargedTasks,
        },
        {
          name: "all",
          label: "Все задачи",
          dataSource: this.taskList,
        },
      ];
    },

    chargedTasks() {
      if (!this.taskList) {
        return [];
      } else {
        let currentUserId = this.$store.getters.getAuth.id;
        let relations = this.$store.getters.TASK_SENDERS.filter(
          (item) => item.sender === currentUserId
        );

        let finallyFiltered = this.taskList.filter((task) =>
          relations.some((record) => record.task === task.id)
        );
        return finallyFiltered;
      }
    },

    personalTasks() {
      if (!this.taskList) {
        return [];
      } else {
        let currentUserId = this.$store.getters.getAuth.id;
        let relations = this.$store.getters.TASK_EXECUTORS.filter(
          (item) => item.executor === currentUserId
        );

        let finallyFiltered = this.taskList.filter((task) =>
          relations.some((record) => record.task === task.id)
        );
        return finallyFiltered;
      }
    },
  },

  methods: {
    inspectTask(task) {
      this.$store.commit("inspectTask", task);
      this.$router.push("/task");
    },
    getSender(task) {
      let senderId = this.$store.getters.TASK_SENDERS.find(
        (record) => record.task === task.id
      ).sender;
      let sender = this.userList.find((user) => user.id === senderId);
      return sender;
    },

    getExecutor(task) {
      let executorId = this.$store.getters.TASK_EXECUTORS.find(
        (record) => record.task === task.id
      ).executor;
      let executor = this.userList.find((user) => user.id === executorId);
      return executor;
    },

    //НЕ НРАВИТСЯ! ПЕРЕДЕЛАТЬ!
    filterSource(source) {
      if (!this.searchValue && this.completed === true) {
        return source;
      }
      if (!this.searchValue && this.completed === false) {
        return source.filter((item) => item.isCompleted === this.completed);
      }
      if (this.searchValue && this.completed === true) {
        return source.filter((item) =>
          item.title.toUpperCase().includes(this.searchValue.toUpperCase())
        );
      }
      if (this.searchValue && this.completed === false) {
        return source.filter(
          (item) =>
            item.title.toUpperCase().includes(this.searchValue.toUpperCase()) &&
            item.isCompleted === this.completed
        );
      }
    },

    changePage(tabName) {
      this.currentPage = tabName;
      this.searchValue = "";
    },
  },
};
</script>

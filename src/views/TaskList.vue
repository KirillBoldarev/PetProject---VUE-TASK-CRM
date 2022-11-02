<template>
  <div class="page">
    <div class="page__header">
      <h2 class="page__title">Управление задачами</h2>
      <add-task-button
        :taskList="taskList"
        :userList="userList"
        :target="this.$store.state.authentication.authenticatedUser"
      ></add-task-button>
    </div>

    <div class="page__navigation">
      <tabs
        :tabs="pages"
        :selectedTab="currentPage"
        @changeTab="changePage"
      ></tabs>
    </div>

    <div class="page__body" v-for="page in pages" :key="page.name">
      <template v-if="this.currentPage === page.name">
        <h3 class="page__title">{{ page.label }}</h3>
        <div class="page__row filter">
          <label class="filter__label"> Фильтровать по:</label>
          <select class="filter__select" v-model="searchParams" name="searchParams" id="searchParams">
            <option class="filter__option"
              v-for="value in this.$options.SEARCH_PARAMS_LIST"
              :key="value"
              :value="value.name"
            >
              {{ value.label }}
            </option>
          </select>
          <input class="filter__value" v-model="this.searchValue" type="text" />
        </div>

        <div class="table">
          <div class="table__row table__row--5">
            <div class="table__column">Состояние</div>
            <div class="table__column">Отправитель</div>
            <div class="table__column">Исполнитель</div>
            <div class="table__column">Описание задачи</div>
            <div class="table__column">Действия</div>
          </div>
          <div
            class="table__row table__row--5"
            v-for="task in this.filterSource(page.dataSource)"
            :key="task.id"
          >
            <div class="table__column">
              <complete-task-button :target="task"></complete-task-button>
            </div>
            <div class="table__column">
              {{ task.senderFullName }}
            </div>
            <div class="table__column">
              {{ task.executorFullName }}
            </div>
            <div class="table__column">{{ task.description }}</div>
            <div class="table__column">
              <div>
                <edit-task-button
                  :target="task"
                  :userList="userList"
                  :taskList="taskList"
                ></edit-task-button>
              </div>
              <div>
                <delete-task-button :target="task"></delete-task-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import AddTaskButton from "@/components/AddTaskButton.vue";
import DeleteTaskButton from "@/components/DeleteTaskButton.vue";
import CompleteTaskButton from "@/components/CompleteTaskButton.vue";
import EditTaskButton from "@/components/EditTaskButton.vue";
import Tabs from "@/components/Tabs.vue";

export default {
  name: "TaskList",

  components: {
    AddTaskButton,
    DeleteTaskButton,
    CompleteTaskButton,
    EditTaskButton,
    Tabs,
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
      searchParams: "description",
    };
  },
  computed: {
    pages() {
      return [
        {
          name: "personal",
          label: "Полученные задачи",
          dataSource: this.personalTasks,
        },
        { name: "charged", label: "Поручения", dataSource: this.chargedTasks },
        {
          name: "completedPersonal",
          label: "Выполненные задачи",
          dataSource: this.completedPersonalTasks,
        },
        {
          name: "completedCharged",
          label: "Исполненные поручения",
          dataSource: this.completedChargedTasks,
        },
      ];
    },
    personalTasks() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.executorId === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === false
        );
      }
    },
    chargedTasks() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.senderId === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === false
        );
      }
    },
    completedPersonalTasks() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.executorId === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === true
        );
      }
    },
    completedChargedTasks() {
      if (!this.taskList) {
        return [];
      } else {
        return this.taskList.filter(
          (task) =>
            task.senderId === this.$store.getters.authenticatedUser.id &&
            task.isCompleted === true
        );
      }
    },
  },

  SEARCH_PARAMS_LIST: [
    { name: "senderFullName", label: "Отправитель" },
    { name: "executorFullName", label: "Исполнитель" },
    { name: "description", label: "Описание" },
  ],

  methods: {
    filterSource(source) {
      if (!this.searchParams) {
        return source;
      }
      return source.filter((item) =>
        item[this.searchParams]
          .toUpperCase()
          .includes(this.searchValue.toUpperCase())
      );
    },

    changePage(tabName) {
      this.currentPage = tabName;
      this.searchValue = "";
    },
  },
};
</script>

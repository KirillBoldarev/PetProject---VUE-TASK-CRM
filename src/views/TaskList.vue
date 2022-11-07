<template>
  <div class="page">
    <div class="page__header">
      <h2 class="page__title">Управление задачами</h2>

      <button-with-modal-form :image="require('@/icons/plus.png')">
        <template #formSlot="{ closeModal }">
          <add-task-form
            @close="closeModal"
            :taskList="taskList"
            :userList="userList"
            :target="this.$store.state.authentication.authenticatedUser"
          ></add-task-form>
        </template>
      </button-with-modal-form>
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
          <select
            class="filter__select"
            v-model="searchParams"
            name="searchParams"
            id="searchParams"
          >
            <option
              class="filter__option"
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

          <transition-group name="slide-fade">
            <div
              class="table__row table__row--5"
              v-for="task in this.filterSource(page.dataSource)"
              :key="task.id"
            >
              <div class="table__column">
                <complete-task-action :target="task"></complete-task-action>
              </div>
              <div class="table__column">
                {{ task.senderFullName }}
              </div>
              <div class="table__column">
                {{ task.executorFullName }}
              </div>
              <div class="table__column">{{ task.description }}</div>
              <div class="table__column">
                <button-with-modal-form :image="require('@/icons/edit.png')">
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
      </template>
    </div>
  </div>
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

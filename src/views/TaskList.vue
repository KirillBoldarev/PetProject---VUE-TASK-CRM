<template>
  <div class="page">
    <template v-for="page in pages" :key="page.name">
      <div class="page__body" v-if="this.currentPage === page.name">
        <h2 class="page__title">Управление задачами</h2>
        <div class="page__toolbar">
          <tabs
            :tabs="pages"
            :selectedTab="currentPage"
            @changeTab="changePage"
          ></tabs>
          <div class="form">
            <label class="form__label"> Поиск:</label>
            <input class="form__input" v-model="this.searchValue" type="text" />

            <label class="form__label"> Добавить задачу:</label>
            <button-with-modal-form :image="require('@/icons/plus.png')">
              <template v-slot:formSlot="{ closeModal }">
                <add-task-form
                  @close="closeModal"
                  :taskList="taskList"
                  :userList="userList"
                  :target="this.$store.state.authentication.authenticatedUser"
                ></add-task-form>
              </template>
            </button-with-modal-form>
          </div>
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
                {{ this.getFullNameSender(task) }}
              </div>
              <div class="table__column">
                {{ this.getFullNameExecutor(task) }}
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
      </div>
    </template>
    
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
    };
  },
  computed: {
    pages() {
      return [
        {
          name: "personal",
          label: "Задачи",
          dataSource: this.personalTasks,
        },
        {
          name: "charged",
          label: "Поручения",
          dataSource: this.chargedTasks,
        },
      ];
    },

    chargedTasks() {
      if (!this.taskList) {
        return [];
      } else {
        let currentUserId = this.$store.getters.authenticatedUser.id;
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
        let currentUserId = this.$store.getters.authenticatedUser.id;
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
    getFullNameSender(task) {
      let senderId = this.$store.getters.TASK_SENDERS.find(
        (record) => record.task === task.id
      ).sender;
      let sender = this.userList.find((user) => user.id === senderId);
      return `${sender.firstName} ${sender.secondName}`;
    },
    getFullNameExecutor(task) {
      let executorId = this.$store.getters.TASK_EXECUTORS.find(
        (record) => record.task === task.id
      ).executor;
      let executor = this.userList.find((user) => user.id === executorId);
      return `${executor.firstName} ${executor.secondName}`;
    },

    filterSource(source) {
      if (!this.searchValue) {
        return source;
      }
      return source.filter((item) =>
        item.description.toUpperCase().includes(this.searchValue.toUpperCase())
      );
    },

    changePage(tabName) {
      this.currentPage = tabName;
      this.searchValue = "";
    },
  },
};
</script>

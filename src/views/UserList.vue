<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">Управление пользователями</h2>
      <div class="table">
        <div class="table__row table__row--6">
          <div class="table__column">Имя</div>
          <div class="table__column">Роль</div>
          <div class="table__column">Электронная почта</div>
          <div class="table__column">Телефон</div>
          <div class="table__column">Активные задачи</div>
          <div class="table__column">Действия</div>
        </div>
        <transition-group name="slide-fade">
          <div
            v-for="user in this.userList"
            :key="user.id"
            class="table__row table__row--6"
          >
            <div v-if="user.firstName" class="table__column">
              {{ user.firstName }} {{ user.secondName }}
            </div>
            <div v-if="!user.firstName" class="table__column">
              {{ user.login }}
            </div>
            <div class="table__column">
              <img
                v-if="user.role === 'Неавторизованный пользователь'"
                class="icon"
                src="@/icons/unauthorized.png"
                alt=""
              />
              <img
                v-if="user.role === 'Пользователь'"
                class="icon"
                src="@/icons/user.png"
                alt=""
              />
              <img
                v-if="user.role === 'Администратор'"
                class="icon"
                src="@/icons/admin.png"
                alt=""
              />
            </div>
            <div class="table__column">{{ user.email }}</div>
            <div class="table__column">{{ user.phone }}</div>
            <div class="table__column">
              {{ this.getActiveTasksNumber(user) }}
            </div>
            <div class="table__column">
              <button-with-modal-form
                :tooltip="'Назначить задачу'"
                :image="require('@/icons/plus.png')"
              >
                <template #formSlot="{ closeModal }">
                  <add-task-form
                    @close="closeModal"
                    :taskList="taskList"
                    :userList="userList"
                    :target="user"
                  ></add-task-form>
                </template>
              </button-with-modal-form>

              <button-with-modal-form
                :tooltip="'Редактировать'"
                v-if="this.$store.getters.getAuth.role === 'Администратор'"
                :image="require('@/icons/edit.png')"
              >
                <template #formSlot="{ closeModal }">
                  <edit-user-form
                    @close="closeModal"
                    :taskList="taskList"
                    :userList="userList"
                    :target="user"
                  ></edit-user-form>
                </template>
              </button-with-modal-form>
              <delete-user-action
                v-if="this.$store.getters.getAuth.role === 'Администратор'"
                :target="user"
              ></delete-user-action>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import DeleteUserAction from "@/components/actions/DeleteUserAction.vue";
import ButtonWithModalForm from "@/components/ButtonWithModalForm.vue";
import AddTaskForm from "@/components/forms/AddTaskForm.vue";
import EditUserForm from "@/components/forms/EditUserForm.vue";

export default {
  components: {
    DeleteUserAction,
    ButtonWithModalForm,
    AddTaskForm,
    EditUserForm,
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

  computed: {},

  methods: {
    getActiveTasksNumber(user) {
      let personalTasks = this.$store.getters.TASK_EXECUTORS.filter(
        (record) => record.executor === user.id
      );

      let filteredTasks = this.taskList.filter((task) =>
        personalTasks.some((record) => record.task === task.id)
      );

      let completedFilteredTasks = filteredTasks.filter(
        (task) => task.isCompleted === false
      );

      return completedFilteredTasks.length;
    },
  },

  watch: {},
};
</script>

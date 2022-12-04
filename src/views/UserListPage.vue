<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">Управление пользователями</h2>
      <div class="table">
        <div class="table__row table__row--userlist">
          <div class="table__column">Имя</div>
          <div class="table__column">Роль</div>
          <div class="table__column">Электронная почта</div>
          <div class="table__column">Телефон</div>
          <div class="table__column">Действия</div>
        </div>
        <transition-group name="slide-fade">
          <div
            v-for="user in userList"
            :key="user.id"
            class="table__row table__row--userlist"
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
                class="icon--mini"
                src="@/icons/unauthorized.png"
              />
              <img
                v-if="user.role === 'Пользователь'"
                class="icon--mini"
                src="@/icons/user.png"
              />
              <img
                v-if="user.role === 'Администратор'"
                class="icon--mini"
                src="@/icons/admin.png"
              />
            </div>
            <div class="table__column">{{ user.email }}</div>
            <div class="table__column">{{ user.phone }}</div>

            <div class="table__column">
              <button-with-modal-form
                :tooltip="'Назначить задачу'"
                :image="require('@/icons/plus.png')"
                :iconClass="'icon--mini'"
              >
                <template #formSlot="{ closeModal }">
                  <create-task-form
                    @close="closeModal"
                    :taskList="taskList"
                    :userList="userList"
                    :target="user"
                  ></create-task-form>
                </template>
              </button-with-modal-form>

              <button-with-modal-form
                :tooltip="'Редактировать'"
                v-if="this.$store.getters.GET_AUTH.role === 'Администратор'"
                :image="require('@/icons/edit.png')"
                :icon-class="'icon--mini'"
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
                v-if="this.$store.getters.GET_AUTH.role === 'Администратор'"
                :target="user"
                :iconClass="'icon--mini'"
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
import CreateTaskForm from "@/components/forms/CreateTaskForm.vue";
import EditUserForm from "@/components/forms/EditUserForm.vue";

export default {
  components: {
    DeleteUserAction,
    ButtonWithModalForm,
    CreateTaskForm,
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

  methods: {},

  watch: {},
};
</script>

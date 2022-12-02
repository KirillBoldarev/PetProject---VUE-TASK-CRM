<template>
  <div class="page">
    <div class="page__body">
      <h2 class="page__title">
        Профиль пользователя : {{ authenticated.login }}
        <span v-if="authenticated.firstName && authenticated.secondName">
          - {{ authenticated.firstName }} {{ authenticated.secondName }}</span
        >
      </h2>
      <div class="flex-row center">
        <img
          @click="editUserMode = !editUserMode"
          v-tooltip.bottom="'Редактировать профиль'"
          class="icon"
          src="@/icons/edit.png"
          alt=""
        />
        <img
          @click="showTaskMode = !showTaskMode"
          v-tooltip.bottom="'Показать/скрыть задачи'"
          class="icon"
          src="@/icons/task.png"
          alt=""
        />
      </div>

      <edit-user-form
        v-if="editUserMode"
        @edited="editUserMode = !editUserMode"
        :target="this.$store.getters.GET_AUTH"
        :userList="userList"
        :taskList="taskList"
      ></edit-user-form>
      <task-list
        v-if="showTaskMode"
        :taskList="taskList"
        :userList="userList"
      ></task-list>
    </div>
  </div>
</template>

<script>
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import confirmationDialogMixin from "@/js/mixins/confirmationDialogMixin";
import EditUserForm from "@/components/forms/EditUserForm.vue";
import TaskList from "@/components/tables/TaskList.vue";

export default {
  data() {
    return {
      editUserMode: false,
      showTaskMode: true,
      authenticated:{},
    };
  },

  components: {
    ConfirmDialog,
    EditUserForm,
    TaskList,
  },

  mixins: [confirmationDialogMixin],

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

  beforeCreate() {
    if (this.$store.getters.IS_AUTH === false) {
      this.$router.push("/");
    }
    this.authenticated = this.$store.getters.GET_AUTH;
  },

  methods: {},

  computed: {},
};
</script>

<template>
  <section id="addTaskForm" class="form__container">
    <form class="form__body" @submit.prevent="createCommentHandler">
      <h2 class="form__title">
        Добавить комментарий к задаче <br />
        "{{ target.title }}"
      </h2>
      <div class="flex-column center">
        <div class="flex-column center">
          <textarea
            class="form__textbox"
            @blur="v$.text.$touch"
            @keyup.ctrl.enter="createCommentHandler"
            v-model="text"
            name="comment"
            id="task"
            cols="35"
            rows="15"
          ></textarea>
          <transition>
            <small
              v-if="v$.text.$dirty && v$.text.required.$invalid"
              class="form__invalid"
              >Поле обязательно для заполнения
            </small>
          </transition>
        </div>
      </div>

      <div class="flex-column center">
        <button class="button" type="submit">Прокомментировать</button>
      </div>
    </form>
  </section>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import filterDate from "@/js/libs/filterDate";

export default {
  components: {},
  name: "AddTaskForm",
  props: {
    target: {
      type: Object,
      required: true,
    },
  },
  emits: ["close"],
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      task: this.target.id,
      sender: this.$store.getters.GET_AUTH,
      text: "",
    };
  },

  validations() {
    return {
      text: { required },
    };
  },
  methods: {
    createCommentHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      this.$store.commit("CREATE_COMMENT", this.newComment);
      this.$emit("close");
    },
  },

  computed: {
    newComment() {
      return {
        id: this.commentId,
        dateOfCreation: this.dateOfCreation,
        task: this.task,
        author: this.sender.id,
        text: this.text,
      };
    },
    commentId() {
      return Math.random().toString(36).substring(2, 9);
    },
    dateOfCreation() {
      let now = new Date();
      return filterDate(now, "datetime");
    },
  },
};
</script>

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
            id="task"
            v-model="formData.text"
            class="form__textbox"
            name="comment"
            cols="35"
            rows="15"
            @blur="v$.text.$touch"
            @keyup.ctrl.enter="createCommentHandler"
          />
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

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import filterDate from '@/js/composables/filterDate';
import { useAuthenticatedStore } from '@/stores/AuthenticatedStore';
import { useCommentsStore } from '@/stores/CommentsStore';
import { reactive, computed, onBeforeMount } from 'vue';

const authenticatedStore = useAuthenticatedStore();
const commentsStore = useCommentsStore();

const props = defineProps({
  target: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['close']);

const formData = reactive({
  text: '',
});
const rules = {
  text: { required },
};
const v$ = useVuelidate(rules, formData);

const dateOfCreation = computed(() => {
  return filterDate(new Date(), 'datetime');
});

const commentId = computed(() => {
  return Math.random().toString(36).substring(2, 9);
});
const newComment = computed(() => {
  return {
    id: commentId.value,
    dateOfCreation: dateOfCreation.value,
    task: props.target.id,
    author: authenticatedStore.AUTH.id,
    text: formData.text,
  };
});
onBeforeMount(() => {
  commentsStore.INITIALIZE_COMMENTS(props.target.id);
});

function createCommentHandler() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    console.log('валидация не пройдена');
    return;
  }
  console.log('валидация  пройдена');
  commentsStore.CREATE_COMMENT(newComment.value);
  emit('close');
}
</script>

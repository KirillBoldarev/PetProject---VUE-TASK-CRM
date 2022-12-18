<template>
  <div class="comment__container flex-column">
    <div class="comment__top">
      <div class="comment__title">
        <strong
          >{{ target.dateOfCreation }} от {{ getPersonById(target.author) }}
        </strong>
      </div>
      <button class="button--none" @click="deleteComment">
        <img class="icon" src="@/assets/icons/remove.png" alt="" />
      </button>
    </div>
    <div class="comment__body">
      {{ target.text }}
    </div>
  </div>
</template>

<script setup>
import { useCommentsStore } from '@/stores/CommentsStore';
import { getPersonById } from '@/js/composables/getPersonById';

const commentsStore = useCommentsStore();

const props = defineProps({
  target: {
    type: Object,
    required: true,
  },
});

function deleteComment() {
  commentsStore.DELETE_COMMENT(props.target);
}
</script>

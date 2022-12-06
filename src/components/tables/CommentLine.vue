<template>
  <div class="comment__container flex-column">
    <div class="comment__top">
      <div class="comment__title">
        <strong
          >{{ target.dateOfCreation }} от {{ getPerson(target.author) }}
        </strong>
      </div>
      <img
        @click="deleteComment"
        class="icon"
        src="@/icons/remove.png"
        alt=""
      />
    </div>
    <div class="comment__body">{{ target.text }}</div>
  </div>
</template>

<script>
import { useCommentsStore } from "@/store/CommentsStore";
import { mapStores } from "pinia";
import subscribtionsForCommentsMutationMixin from "@/js/mixins/subscribtionsForCommentsMutationMixin";


export default {
  mixins:[subscribtionsForCommentsMutationMixin],
  props: {
    target: {
      type: Object,
      required: false,
    },
    userList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapStores(useCommentsStore),
  },
  methods: {
    deleteComment() {
      this.commentsStore.DELETE_COMMENT(this.target);
    },
    getPerson(role) {
      let person = this.userList.find((user) => user.id === role);
      if (!person) {
        return "Пользователь удален";
      }
      if (!person.firstName || !person.secondName) {
        return `${person.login}`;
      }
      return `${person.firstName} ${person.secondName}`;
    },
  },
};
</script>

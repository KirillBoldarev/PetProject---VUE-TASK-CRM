import { defineStore } from 'pinia'
import localbase from '@/js/libs/localbase'

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    COMMENTS: null
  }),
  getters: {
    GET_COMMENTS (state) {
      return state.COMMENTS
    }
  },
  actions: {
    CREATE_COMMENT (payload) {
      this.COMMENTS.push(payload)
    },
    DELETE_COMMENT (payload) {
      let index
      this.COMMENTS.forEach((comment, idx) => {
        if (comment.id === payload.id) {
          index = idx
        }
      })
      this.COMMENTS.splice(index, 1)
    },
    EDIT_COMMENT (payload) {
      this.COMMENTS = this.COMMENTS.map((comment) => {
        return comment.id === payload.id ? payload : comment
      })
    },
    CLEAR_COMMENTS () {
      this.COMMENTS = null
    },
    async INITIALIZE_COMMENTS (taskId) {
      const commetsList = await localbase
        .collection('comments')
        .get()
        .catch((error) => console.log(error))
      this.COMMENTS = commetsList.filter((comment) => comment.task === taskId)
    }
  }
})

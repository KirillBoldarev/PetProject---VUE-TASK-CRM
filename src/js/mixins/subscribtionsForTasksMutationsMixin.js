import localbase from '@/js/libs/localbase'
import { toRaw } from 'vue' // функция извлекающая объект из прокси

export default {
  data () {
    return {

      subscribtionsForActionsUponTasks: null
    }
  },
  beforeMount () {
    this.subscribtionsForActionsUponTasks = this.tasksStore.$onAction(
      (action) => {
        // INITIALIZE
        if (action.name === 'INITIALIZE_TASK_LIST') {
          action.after(() => {
            this.taskList = this.tasksStore.GET_TASK_LIST
          })
        }

        // CREATE
        if (action.name === 'CREATE_TASK') {
          localbase
            .collection('tasks')
            .add(action.args[0])
            .catch((error) => console.log(error))
        }

        // DELETE
        if (action.name === 'DELETE_TASK') {
          localbase
            .collection('tasks')
            .doc({ id: action.args[0].id })
            .delete()
            .catch((error) => console.log(error))
        }

        // EDIT
        if (action.name === 'EDIT_TASK') {
          this.taskList = this.taskList.map((task) => {
            return task.id === action.args[0].id ? action.args[0] : task
          })
          localbase
            .collection('tasks')
            .doc({ id: action.args[0].id })
            .set(action.args[0])
            .then((response) => {
              if (
                this.inspectedTaskStore.GET_INSPECTED_TASK &&
                action.args[0].id ===
                  this.inspectedTaskStore.GET_INSPECTED_TASK.id
              ) {
                this.inspectedTaskStore.EDIT_INSPECTED_TASK(action.args[0])
              }
            })
            .catch((error) => console.log(error))
        }

        // COMPLETE
        if (action.name === 'COMPLETE_TASK') {
          action.after(() => {
            const completedTask = this.tasksStore.GET_TASK_LIST.find(
              (task) => task.id === action.args[0].id
            )
            localbase
              .collection('tasks')
              .doc({ id: action.args[0].id })
              .set(toRaw(completedTask))
              .then((response) => {
                // COMPLETE_INSPECTED_TASK
                if (
                  this.inspectedTaskStore.GET_INSPECTED_TASK &&
                  action.args[0].id === this.inspectedTaskStore.GET_INSPECTED_TASK.id
                ) {
                  this.inspectedTaskStore.EDIT_INSPECTED_TASK(completedTask)
                }
              })
              .catch((error) => console.log(error))
          })
        }
      }
    )
  },

  beforeUnmounted () {
    this.subscribtionsForActionsUponTasks = null
  }
}

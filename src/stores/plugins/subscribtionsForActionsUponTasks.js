import localbase from '@/js/libs/localbase'
import { toRaw } from 'vue'

export function subscribtionsForActionsUponTasks (context) {
  context.store.$onAction((action) => {
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
      localbase
        .collection('tasks')
        .doc({ id: action.args[0].id })
        .set(action.args[0])
        .catch((error) => console.log(error))
    }
    // COMPLETE
    if (action.name === 'COMPLETE_TASK') {
      const completedTask = action.store.GET_TASK_LIST.find(task => task.id === action.args[0].id)
      localbase
        .collection('tasks')
        .doc({ id: action.args[0].id })
        .set(toRaw(completedTask))
        .catch((error) => console.log(error))
    }
  })
}

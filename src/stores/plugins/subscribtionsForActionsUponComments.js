
import localbase from '@/js/libs/localbase'

export function subscribtionsForActionsUponComments (context) {
  context.store.$onAction((action) => {
    // CREATE
    if (action.name === 'CREATE_COMMENT') {
      localbase
        .collection('comments')
        .add(action.args[0])
        .catch((error) => console.log(error))
    }
    // DELETE
    if (action.name === 'DELETE_COMMENT') {
      localbase
        .collection('comments')
        .doc({ id: action.args[0].id })
        .delete()
        .catch((error) => console.log(error))
    }
  })
}

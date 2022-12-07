
import localbase from '@/js/libs/localbase'

export function subscribtionsForActionsUponUsers (context) {
  context.store.$onAction((action) => {
    // CREATE
    if (action.name === 'CREATE_USER') {
      localbase
        .collection('users')
        .add(action.args[0])
        .catch((error) => console.log(error))
    }
    // DELETE
    if (action.name === 'DELETE_USER') {
      localbase
        .collection('users')
        .doc({ id: action.args[0].id })
        .delete()
        .catch((error) => console.log(error))
    }
    // EDIT
    if (action.name === 'EDIT_USER') {
      localbase
        .collection('users')
        .doc({ id: action.args[0].id })
        .set(action.args[0])
        /* .then((result) => {
          this.userList = this.userList.map((user) => {
            return user.id === action.args[0].id ? action.args[0] : user
          })
          if (action.args[0].id === this.authenticatedStore.GET_AUTH.id) {
            this.authenticatedStore.INITIALIZE_AUTHENTICATED()
          }
        }) */
        .catch((error) => console.log(error))
    }
  })
}

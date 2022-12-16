import localbase from '@/js/libs/localbase';

export function subscribtionsForActionsUponUsers(context) {
  context.store.$onAction((action) => {
    // CREATE
    if (action.name === 'CREATE_USER') {
      console.log('Сработала подписка на кКРИЕЙТ ЮЗЕР');
      localbase
        .collection('users')
        .add(action.args[0])
        .catch((error) => console.log(error));
    }
    // DELETE
    if (action.name === 'DELETE_USER') {
      console.log('СРАБОТАЛА ПОДПИСКА НА ДЕЛЕТЕ ЮЗЕР');
      localbase
        .collection('users')
        .doc({ id: action.args[0].id })
        .delete()
        .catch((error) => console.log(error));
    }
    // EDIT
    if (action.name === 'EDIT_USER') {
      console.log('Сработала подписка на ЕДИТ ЮЗЕР');
      localbase
        .collection('users')
        .doc({ id: action.args[0].id })
        .set(action.args[0])
        .catch((error) => console.log(error));
    }
  });
}

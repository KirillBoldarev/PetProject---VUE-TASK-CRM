import localBase from '@/js/libs/localbase';

export function subscribtionsForActionsUponComments(context) {
  context.store.$onAction(action => {
    // CREATE
    if (action.name === 'CREATE_COMMENT') {
      localBase
        .collection('comments')
        .add(action.args[0])
        .catch(error => console.log(error));
    }
    // DELETE
    if (action.name === 'DELETE_COMMENT') {
      localBase
        .collection('comments')
        .doc({ id: action.args[0].id })
        .delete()
        .catch(error => console.log(error));
    }
  });
}

import { useUsersStore } from '@/stores/UsersStore';
const usersStore = useUsersStore();

export function getPersonById(id) {
  const person = usersStore.USER_LIST.find((user) => user.id === id);
  if (!person) {
    return 'Пользователь удален';
  }
  if (!person.fullName) {
    return `${person.login}`;
  }
  return person.fullName;
}

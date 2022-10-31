import { helpers } from "@vuelidate/validators";

export const isPhone = helpers.regex(
  /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/
);

export function isUniqueEmail() {
  return this.userList.some((user) => user.email === this.email);
}

export function isUniqueAuthenticatedEmail() {
  return this.userList.some(
    (user) =>
      user.email === this.email &&
      user.email !== this.$store.getters.authenticatedUser.email
  );
}
export function isUniqueTargetEmail() {
  return this.userList.some(
    (user) =>
      user.email === this.email &&
      user.email !== this.target.email
  );
}
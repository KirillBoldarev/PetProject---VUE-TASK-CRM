import { helpers } from "@vuelidate/validators";

export const isPhone = helpers.regex(
  /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/
);

/* export function isUniqueEmail(source, email, currentEmail) {
  if (!currentEmail) {
    console.log("current емейл НЕ существует");
    return source.some((user) => user.email === email);
  }
  if (currentEmail && email === currentEmail) {
    console.log("current емейл существует");
    console.log("currentEmail :", currentEmail);
    return true;
  }
} */

export function isUniqueEmail(source, email) {
  return source.some((user) => user.email === email);
}

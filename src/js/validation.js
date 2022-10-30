export function isPhone(value) {
  let regularPhone =
    /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  if (!regularPhone.test(value)) {
    return false;
  }
  return true;
}

export function isUniqueEmail(source, email) {
  return source.some((user) => user.email === email);
}

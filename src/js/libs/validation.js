import { helpers } from '@vuelidate/validators'

export const isPhone = helpers.regex(
  // eslint-disable-next-line no-useless-escape
  /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/
)

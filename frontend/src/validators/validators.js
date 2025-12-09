export const dateValidatorPattern = {
  required: 'Date is required',
  pattern: {
    value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    message: "Date must be in YYYY-MM-DD format. This is a glitch, please report to developer"
  }
}

export const linkValidatorPattern = {
  value: /^https?:\/\/.+\..+/,
  message: "Link must be in https://mylink.com format"
}

export const emailValidatorPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Invalid email address",
}
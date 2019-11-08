const validationProps = (error, errorMessage) => ({
  error,
  errorMessage,
})

export const isBlank = val => {
  const trimmedVal = val.trim()
  if (!trimmedVal && trimmedVal.length === 0) {
    return true
  }
  return false
}

export const validateName = value => {
  if (isBlank(value)) {
    return validationProps(true, 'Please enter your name')
  }
  if (value.length < 3) {
    return validationProps(true, 'Name should be atleast 3 characters')
  }
  return validationProps(false, '')
}

export const validateEmail = val => {
  /* eslint-disable */
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(String(val).toLowerCase())) return validationProps(false, '')
  return validationProps(true, 'Enter valid email address !')
  /* eslint-enable */
}

export const validatePassword = val => {
  // const re = /^(?=.*\d)(?=.*[a-z])$/;
  if (val.length < 8) return validationProps(true, 'Password must contain atleast 8 characters');
  // else if (!re.test(val)) return validationProps(true, 'Password must contain atleast 1 Character and 1 Number');
  return validationProps(false, '');
};

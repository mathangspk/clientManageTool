const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'password',
    'email',
    'phone'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Vui lòng không để trống'
    }
  })
  return errors
}
export default validate;

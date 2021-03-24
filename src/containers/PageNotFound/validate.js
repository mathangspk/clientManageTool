// const validate = (values) => {
//   const errors = {};
//   const { email } = values;
//   console.log(values);
//   if (!email) {
//     errors.email = 'Vui lòng nhập Email';
//   } else if (email.trim() !== null && email.length < 5) {
//     errors.email = 'Toi thieu 5 ky tu';
//   }
//   return errors;
// };
// export default validate;
const validate = values => {
  const errors = {}
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'password',
    'notes'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Vui lòng không để trống'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Sai cú pháp example@domain.com'
  }
  return errors
}
export default validate;
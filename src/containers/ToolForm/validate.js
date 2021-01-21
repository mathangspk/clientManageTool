const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'manufacturer',
    'quantity',
    'type'
  ]
  requiredFields.forEach(field => {
    if (values[field] === null || values[field] === '' ) {
      errors[field] = 'Vui lòng không để trống'
    }
  })
  if ( parseInt(values.quantity) === 0 ) {
    errors.quantity = 'Số lượng lớn hơn 0'
  }
  // if ( parseInt(values.price) < 1000  ) {
  //   errors.price = 'Giá > 1.000 vnđ'
  // }
  // if ( parseInt(values.cash) < 1000 ) {
  //   errors.cash = 'Thành tiên > 1.000vnđ'
  // }
  return errors
}
export default validate;

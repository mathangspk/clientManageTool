const validate = (values) => {
  const errors = {};
  const { title } = values;
  if (!title) {
    errors.title = 'Vui long nhap tieu de';
  } else if (title.trim() !== null && title.length < 5) {
    errors.title = 'Toi thieu 5 ky tu';
  }
  return errors;
};
export default validate;

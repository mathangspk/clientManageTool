import React from 'react';
import {
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return null;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};
const renderSelectField = ({
  classes,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl className={classes.formControl} error={touched && error}>
    <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      // inputProps={{
      //   name: 'age',
      //   id: 'age-native-simple',
      // }}
      //value={input.value} //lấy từ Initial của redux-form
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

renderSelectField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default withStyles(styles)(renderSelectField);

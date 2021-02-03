import React, { Component } from 'react';
import { withStyles, Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modal';
import * as CustomerActions from '../../actions/customerActions';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import styles from './style';
import renderTextField from '../../components/FormHelper/TextField';

class CustomerForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      admin: props.customerEditting ? (props.customerEditting.admin || false) : false,
      isEditPassword: props.customerEditting && props.customerEditting._id === props.user._id
    }
  }

  handleSubmitForm = (data) => {
    const { customerActionsCreator, customerEditting, user } = this.props;
    const { addCustomer, updateCustomer } = customerActionsCreator;
    const { name, email, phone, department, group, password } = data;
    const newCustomer = {
      name,
      email,
      password,
      phone,
      department: department || '',
      group: group || '',
      admin: this.state.admin || false
    }
    if (customerEditting) {
      if (customerEditting._id !== user._id) {
        delete newCustomer.password
      }
      updateCustomer(newCustomer);
    } else {
      addCustomer(newCustomer);
    }
  };
  resetPassword = () => {
    const { customerActionsCreator, customerEditting, user } = this.props;
    const { addCustomer, updateCustomer } = customerActionsCreator;
    const { name, email, phone, department, group } = customerEditting;
    const newCustomer = {
      name,
      email,
      password:"123456",
      phone,
      department: department || '',
      group: group || '',
      admin: this.state.admin || false
    }
    if (customerEditting) {
      updateCustomer(newCustomer);
    } else {
      addCustomer(newCustomer);
    }
  };

  handleAdmin = (e) => {
    this.setState({ admin: e.target.checked });
  }

  render() {
    const {
      classes,
      modalActionsCreator,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;
    const {
      isEditPassword
    } = this.state;
    const { hideModal } = modalActionsCreator;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              id="email"
              name="email"
              label="Email"
              type='text'
              InputProps={{
                readOnly: false,
              }}
              className={classes.TextField}
              margin="normal"
              component={renderTextField}
            ></Field>
          </Grid>
          <Grid item md={12}>
            <Field
              id="name"
              name="name"
              label="Tên người dùng"
              className={classes.TextField}
              margin="normal"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              id="phone"
              name="phone"
              label="Số điện thoại"
              className={classes.TextField}
              margin="normal"
              component={renderTextField}
            />
          </Grid>
          {
            this.props.customerEditting && !isEditPassword
            ?
            <>
            </>
            :
            <Grid item md={12}>
              <Field
                id="password"
                name="password"
                label="Mật khẩu"
                type='password'
                className={classes.TextField}
                margin="normal"
                component={renderTextField}
              ></Field>
            </Grid>
          }
          <Grid item md={12}>
            <Field
              id="department"
              name="department"
              label="Phân Xưởng"
              type='text'
              className={classes.TextField}
              margin="normal"
              component={renderTextField}
            ></Field>
          </Grid>
          <Grid item md={12}>
            <Field
              id="group"
              name="group"
              label="Tổ"
              type='text'
              className={classes.TextField}
              margin="normal"
              component={renderTextField}
            ></Field>
          </Grid>
          {
            isEditPassword
            ?
            <>
            </>
            :
            <Grid item md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.admin || false}
                    onChange={this.handleAdmin}
                    name="admin"
                    id="admin"
                    color="primary"
                  />
                }
                label="Admin"
              />
            </Grid>
          }
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Button onClick={()=>this.resetPassword()}>Reset PassWord</Button>
            <Button onClick={hideModal}>Hủy</Button>
            <Button disabled={invalid || submitting} type="submit">
              Lưu
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

CustomerForm.propTypes = {
  customerId: PropTypes.string,
  product: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    customerEditting: state.customers.customerEditting,
    initialValues: {
      email: state.customers.customerEditting ? state.customers.customerEditting.email : null,
      name: state.customers.customerEditting ? state.customers.customerEditting.name : null,
      password: state.customers.customerEditting ? '' : '123456',
      phone: state.customers.customerEditting ? state.customers.customerEditting.phone : null,
      department: state.customers.customerEditting ? state.customers.customerEditting.department : null,
      group: state.customers.customerEditting ? state.customers.customerEditting.group : null,
      admin: state.customers.customerEditting ? state.customers.customerEditting.admin : false,
    },
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    customerActionsCreator: bindActionCreators(CustomerActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const FORM_NAME = 'CUSTOMER_MANAGEMENT';
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});
export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm,
)(CustomerForm);

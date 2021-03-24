import React, { Component } from 'react';
import { withStyles, Typography, Button, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { compose, bindActionCreators } from 'redux';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import renderTextField from '../../components/FormHelper/TextField';
import validate from './validate';
import { withRouter } from 'react-router';

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msgError: ''
    }
  }

  handleSubmitForm = (user) => {
    const { authActionsCreator } = this.props;
    const { loginAction } = authActionsCreator;
    loginAction(user);
  }

  //@check login success adn error
  componentDidUpdate(nextprops) {
    const { msgError, isAuthenticated, history } = this.props;

    if (isAuthenticated !== nextprops.isAuthenticated) {
      if (isAuthenticated) {
        history.push('/admin/order');
      }
    }
    if (msgError !== nextprops.msgError) {
      this.setState({
        msgError
      })
    }
  }
  renderLoginFail = () => {
    const { msgError } = this.state;
    let xhtml = null;
    xhtml = msgError ? (<Alert variant="standard" severity="error">
      {msgError}
    </Alert>) : null
    return xhtml;
  }
  render() {
    const {
      classes,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.login}>
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(this.handleSubmitForm)}>
                <div>
                  <Typography variant="caption">
                    Đăng nhập để tiếp tục
                  </Typography>
                </div>
                <Grid container>
                  <Grid item xs={12}>
                    <Field
                      id="email"
                      name="email"
                      label="Email"
                      type="email"
                      margin="normal"
                      component={renderTextField}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      id="password"
                      label="Password"
                      type="password"
                      margin="normal"
                      name="password"
                      component={renderTextField}
                    ></Field>
                  </Grid>
                  <Grid
                    container item xs={12}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <div className={classes.alert}>
                      {this.renderLoginFail()}
                    </div>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Button disabled={invalid || submitting} type="submit">
                      ĐĂNG NHẬP
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
      </div >
    );
  }
}

LoginPage.propTypes = {

};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authActionsCreator: bindActionCreators(authActions, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    msgError: state.error.msg,
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const FORM_NAME = 'LOGIN_PAGE';
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});
export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm,
  withRouter,
)(LoginPage);

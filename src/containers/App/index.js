import React, { Component } from 'react';
import { withStyles, ThemeProvider } from '@material-ui/core';
import { BrowserRouter, Switch } from 'react-router-dom';
import styles from './style';
import { compose, bindActionCreators } from 'redux';
import theme from '../../commons/Theme';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoading from '../../components/GlobalLoading';
import ModalMain from '../../components/CModal';
import { ADMIN_ROUTES } from '../../constants';
import { ROUTES } from '../../constants';
import AdminLayoutRoute from '../../commons/Layout/AdminLayoutRoute';
import DefaultLayoutRoute from '../../commons/Layout/DefaultLayoutRoute';
import * as authActions from '../../actions/authActions';
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  componentDidMount() {
    const { authActionsCreator } = this.props;
    const { loadUser } = authActionsCreator;
    loadUser();
  }

  genPath = (r) => {
    let params = ''
    if (r && r.params && r.params.length > 0) {
      params = '/' + r.params.join('/')
    }
    return r.path + params
  }
  renderAdminRoutes() {
    let xhtml = null;
    xhtml = ADMIN_ROUTES.map((route) => {
      return (
        <AdminLayoutRoute
          key={this.genPath(route)}
          path={this.genPath(route)}
          component={route.component}
          iconSidebar = {route.iconSidebar}
          exact={route.exact}
          name={route.name}
          form={route.form}
          labelButtonAdd={route.labelButtonAdd}
          isHide={route.isHide}
          isExport={route.isExport}
        />
      );
    });
    return xhtml;
  }
  renderDefaultRoutes() {
    let xhtml = null;
    xhtml = ROUTES.map((route) => {
      return (
        <DefaultLayoutRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          name={route.name}
        />
      );
    });
    return xhtml;
  }
  render() {
    return (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ToastContainer />
          <ModalMain />
          <GlobalLoading />
          <Switch>
            {this.renderAdminRoutes()}
            {this.renderDefaultRoutes()}
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    );
  }
}

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
export default compose(
  withStyles(styles),
  withConnect,
)(App);

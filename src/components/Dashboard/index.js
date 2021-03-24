import React, { Component } from 'react';
import { withStyles, } from '@material-ui/core';
import styles from './styles';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as uiActions from '../../actions/ui';
import * as authActions from '../../actions/authActions';
import cn from 'classnames';


class Dashboard extends Component {

  handleToggleSidebar = (value) => {
    const { uiActionsCreator } = this.props;
    const { showSidebar, hideSidebar } = uiActionsCreator;
    if (value === true) {
      showSidebar();
    } else {
      hideSidebar();
    }
  }
  handleLogout = () => {
    const { authActionsCreator } = this.props;
    const { logout } = authActionsCreator;
    logout();// call action logout
  }

  render() {
    const { children, classes, name, showSidebar, form, labelButtonAdd, isHide, isExport } = this.props;
    return (
      <div className={classes.dashboard}>
        <Header
          name={name}
          showSidebar={showSidebar}
          onToggleSidebar={this.handleToggleSidebar}
          logout={this.handleLogout}
          form={form}
          labelButtonAdd={labelButtonAdd}
          isHide={isHide}
          isExport={isExport}
        />
        <div className={classes.wrapper}>
          <Sidebar 
          showSidebar={showSidebar}
          onToggleSidebar={this.handleToggleSidebar}
          iconSidebar
          />
          <div className={cn(classes.wrapperContent, {
            [classes.shiftLeft]: showSidebar === false,
          })}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    showSidebar: state.ui.showSidebar,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    uiActionsCreator: bindActionCreators(uiActions, dispatch),
    authActionsCreator: bindActionCreators(authActions, dispatch)
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withStyles(styles),
  withConnect,
)(Dashboard);

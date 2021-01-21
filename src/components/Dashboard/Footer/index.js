import React, { Component, Fragment } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect, } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles, Button, Fab } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import AddIcon from '@material-ui/icons/Add';

import * as modalActions from '../../../actions/modal';
import * as orderActions from '../../../actions/orderActions';
import * as customerActions from '../../../actions/customerActions';
import * as toolActions from '../../../actions/toolActions';

import styles from './styles';
import OrderForm from '../../../containers/OrderForm';
import CustomerForm from '../../../containers/CustomerForm';
import ToolForm from '../../../containers/ToolForm';

const menuId = 'primary-search-account-menu';
const mobileMenuId = 'primary-search-account-menu-mobile';

class Footer extends Component {
 
  render() {
    const { classes, } = this.props;
    return (
      <>
        {/* <Fragment>
              <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton>
            <Fab color="secondary" aria-label="add" className={classes.fabButton}>
              <AddIcon />
            </Fab>
            <div className={classes.grow} />
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton edge="end" color="inherit">
              <MoreIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        </Fragment> */}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withStyles(styles),
  withConnect,
  withRouter,
)(Footer);

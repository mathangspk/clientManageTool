import React, { Component } from 'react';
import { withStyles, } from '@material-ui/core';
import { connect } from 'react-redux';
import * as authActions from '../../actions/authActions';
import { compose, bindActionCreators } from 'redux';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
class PageNotFound extends Component {
 
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.login}>
          <Card>
            <CardContent>
              <h1>Page Not Found</h1>
            </CardContent>
          </Card>
        </div>
      </div >
    );
  }
}

PageNotFound.propTypes = {

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

export default compose(
  withStyles(styles),
  withConnect,
)(PageNotFound);

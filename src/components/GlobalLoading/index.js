import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import styles from './style';
import loadingIcon from '../../assets/images/loading.gif';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class GlobalLoading extends Component {
  render() {
    const { classes, showLoading } = this.props;
    let xhtml = null;
    if (showLoading) {
      xhtml = (
        <div className={classes.globalLoading}>
          <img src={loadingIcon} alt="loading" className={classes.icon} />
          Dang loading.....
        </div>
      );
    }
    return xhtml;
  }
}
GlobalLoading.propTypes = {
  classes: PropTypes.object,
  showLoadingL: PropTypes.bool,
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // dispatch1: () => {
    //   dispatch(actionCreator);
    // },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    showLoading: state.ui.showLoading,
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), withConnect)(GlobalLoading);

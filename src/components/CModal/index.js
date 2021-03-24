import React, { Component } from 'react';
import { withStyles, Modal, Grid, Dialog, DialogContent, Typography, IconButton, } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modal';
import CloseIcon from '@material-ui/icons/Clear';

class ModalMain extends Component {

  onClose = () => {
    console.log('close')
  }


  render() {
    const {
      open,
      onClose,
      classes,
      component,
      modalActionsCreator,
      title,
    } = this.props;
    const { hideModal } = modalActionsCreator;
    return (
      // <Modal open={open} onClose={onClose}>
      <Dialog className={classes.modal + (title === "Export Tool Type" ? " export-tool-type" : "")} aria-labelledby="form-dialog-title" open={open} onClose={onClose} md={12}>
        <div className={classes.header}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center">
            <span className={classes.title}>{title}</span>
            <CloseIcon className={classes.icon} onClick={hideModal} />
          </Grid>          
        </div>
        <DialogContent>
          {component}
        </DialogContent>
      </Dialog>
    );
  }
}

ModalMain.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  component: PropTypes.object,
  modalActionsCreator: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  title: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    open: state.modal.showModal,
    component: state.modal.component,
    title: state.modal.title,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(ModalMain);

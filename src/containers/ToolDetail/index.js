import React, { Component } from 'react';
import { withStyles, Grid, Button, } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modal';
import * as ToolActions from '../../actions/toolActions';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import styles from './style';
import renderTextField from '../../components/FormHelper/TextField';
import Alert from '@material-ui/lab/Alert';

class ToolForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msgError: ''
    }
  }
  //@check login success adn error
  componentDidUpdate(nextprops) {
    const { msgError, } = this.props;
    if (msgError !== nextprops.msgError) {
      this.setState({
        msgError
      })
    }
  }
  handleSubmitForm = (data) => {
    const { toolActionsCreator, toolEditting } = this.props;
    const { addTool, updateTool } = toolActionsCreator;
    const { toolId, title, description, price, } = data;
    const newTool = {
      toolId,
      title,
      description,
      price: parseInt(price),
    }

    if (toolEditting) {
      updateTool(newTool);
    } else {
      addTool(newTool);
    }
  };
  saveToolFail = () => {
    const { msgError } = this.state;
    console.log(msgError)
    let xhtml = null;
    xhtml = msgError ? (<Alert variant="standard" severity="error">
      {msgError}
    </Alert>) : null
    return xhtml;
  }
  render() {
    const {
      classes,
      modalActionsCreator,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;
    const { hideModal } = modalActionsCreator;
    return (
     <div>hien thi hinh anh san pham</div>
    );
  }
}

ToolForm.propTypes = {
  customerId: PropTypes.string,
  tool: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    toolEditting: state.tools.toolEditting,
    initialValues: {
      toolId: state.tools.toolEditting ? state.tools.toolEditting.toolId : null,
      title: state.tools.toolEditting
        ? state.tools.toolEditting.title
        : null,
      description: state.tools.toolEditting ? state.tools.toolEditting.description : null,
      price: state.tools.toolEditting ? state.tools.toolEditting.price : null,
    },
    msgError: state.error.msg,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    toolActionsCreator: bindActionCreators(ToolActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const FORM_NAME = 'PRODUCT_MANAGEMENT';
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});
export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm,
)(ToolForm);

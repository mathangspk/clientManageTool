import React, { Component } from 'react';
import { withStyles, Grid, Button, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modal';
import * as taskActions from '../../actions/task';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import styles from './style';
import renderTextField from '../../components/FormHelper/TextField';
import renderSelectField from '../../components/FormHelper/Select';

class TaskForm extends Component {
  handleSubmitForm = (data) => {
    const { taskActionsCreator, taskEditing } = this.props;
    const { addListTask, updateTask } = taskActionsCreator;
    const { title, description, status } = data;

    if (taskEditing && taskEditing.id) {
      updateTask(title, description, status);
    } else {
      addListTask(title, description);
    }
  };
  renderStatusSelection() {
    const { taskEditing, classes } = this.props;
    let xhtml;
    if (taskEditing) {
      xhtml = (
        <Field
          id="status"
          name="status"
          label="Trạng thái"
          className={classes.select}
          component={renderSelectField}
        >
          <MenuItem value={0}>Ready</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Complete</MenuItem>
        </Field>
      );
    }
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
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              id="name"
              name="name"
              label="Tên Công Cụ"
              className={classes.TextField}
              margin="normal"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              id="manufacturer"
              label="Hãng sản xuất"
              multiline
              rowsMax={4}
              className={classes.TextField}
              margin="normal"
              name="description"
              component={renderTextField}
            ></Field>
          </Grid>
          {this.renderStatusSelection()}
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
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

TaskForm.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  component: PropTypes.object,
  modalActionsCreator: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  taskActionsCreator: PropTypes.shape({
    addListTask: PropTypes.func,
    taskEditing: PropTypes.object,
  }),
  title: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    taskEditing: state.task.taskEditing,
    initialValues: {
      title: state.task.taskEditing ? state.task.taskEditing.title : null,
      description: state.task.taskEditing
        ? state.task.taskEditing.description
        : null,
      status: state.task.taskEditing ? state.task.taskEditing.status : null,
    },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    taskActionsCreator: bindActionCreators(taskActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const FORM_NAME = 'TASK_MANAGEMENT';
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});
export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm);

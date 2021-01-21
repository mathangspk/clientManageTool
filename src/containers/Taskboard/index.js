import React, { Component } from 'react';
import { withStyles, Button, Grid, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { STATUSES } from '../../constants';
import TaskList from '../../components/Tasks/TaskList';
import * as taskActions from '../../actions/task';
import * as modalActions from '../../actions/modal';
import * as orderActions from '../../actions/orderActions';
import * as customerActions from '../../actions/customerActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBox from '../../components/SearchBox';
import TaskForm from '../TaskForm';
import styles from './style';

class TaskBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }
  handleEditTask = (task) => {
    const { modalActionsCreator, taskActionsCreator } = this.props;
    const { setTaskEditing } = taskActionsCreator;
    setTaskEditing(task);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionsCreator;
    showModal();
    changeModalTitle('Sua cong viec');
    changeModalContent(<TaskForm />);
  };
  handleDeleteTask = (task) => {
    console.log(task);
    const { taskActionsCreator } = this.props;
    const { deleteTask } = taskActionsCreator;
    deleteTask(task.id);
  };
  showModalDeleteTask = (task) => {
    const { modalActionsCreator, classes } = this.props;
    const {
      showModal,
      hideModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionsCreator;
    showModal();
    changeModalTitle('Xoa cong viec');
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          Ban co muon xoa{' '}
          <span className={classes.modalConfirmTextBold}>{task.title}</span> ?
        </div>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Box ml={1}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: '20px' }}
              onClick={() => this.handleDeleteTask(task)}
            >
              Dong y
            </Button>
            <Button
              variant="contained"
              color="default"
              style={{ marginRight: '20px' }}
              onClick={hideModal}
            >
              Huy bo
            </Button>
          </Box>
        </Grid>
      </div>
    );
  };
  renderBoard() {
    var { orders } = this.props;
    if (typeof orders !== 'undefined') {
      let xhtml = null;
      xhtml = (
        <Grid container spacing={2}>
          {STATUSES.map((status, index) => {
            const taskFilter = orders.filter(
              (order) => order.status === status.label
            );
            return (
              <TaskList
                key={index}
                tasks={taskFilter}
                status={status.label}
                onClickEdit={this.handleEditTask}
                onClickDelete={this.showModalDeleteTask}
              />
            );
          })}
        </Grid>
      );
      return xhtml;
    }
  }

  handleFilter = (e) => {
    const { taskActionsCreator } = this.props;
    const { filterTask } = taskActionsCreator;
    const value = e.target.value;
    filterTask(value);
  };
  renderSearchBox() {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFilter} />;
    return xhtml;
  }
  toastTest = () => {
    toast('wow easy');
  };
  loadData = () => {
    const { taskActionsCreator } = this.props;
    const { fetchListTask } = taskActionsCreator;
    fetchListTask();
  };

  openForm = () => {
    const { modalActionsCreator, taskActionsCreator } = this.props;
    const { setTaskEditing } = taskActionsCreator;
    setTaskEditing(null);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionsCreator;                                             
    showModal();
    changeModalTitle('Thêm mới công việc');
    changeModalContent(<TaskForm />);
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  componentDidMount() {
    const { taskActionsCreator, orderActionsCreator, customerActionsCreator } = this.props;
    const { listAllOrders } = orderActionsCreator;
    const { listAllCustomers } = customerActionsCreator;
    const { fetchListTask } = taskActionsCreator;
    listAllOrders();
    listAllCustomers();
    fetchListTask();
  }
  render() {
    const { classes, user } = this.props;
    return (
      user && user.admin ?
        <Box m={2} className={classes.contentTaskboard}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: '20px' }}
            onClick={this.loadData}
          >
            <AddIcon />
            Load data
          </Button>
          <Button variant="contained" color="primary" onClick={this.openForm}>
            <AddIcon />
            Thêm mới công việc
          </Button>
          {this.renderSearchBox()}
          {this.renderBoard()}
        </Box>
      : <></>
    );
  }
}

TaskBoard.propTypes = {
  listTask: propTypes.array,
  modalActionsCreator: propTypes.shape({
    showModal: propTypes.func,
    hideModal: propTypes.func,
  }),
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    taskActionsCreator: bindActionCreators(taskActions, dispatch),
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    orderActionsCreator: bindActionCreators(orderActions, dispatch),
    customerActionsCreator: bindActionCreators(customerActions, dispatch),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    listTask: state.task.listTasks,
    showModalStatus: state.modal.showModal,
    orders: state.orders.orders,
    user: state.auth.user
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);

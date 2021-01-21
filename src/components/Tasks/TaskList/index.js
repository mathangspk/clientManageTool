import React, { Component } from 'react';
import { withStyles, Grid, Box } from '@material-ui/core';
import propTypes from 'prop-types';
import styles from './styles';
import TaskItem from '../TaskItems';

class TaskList extends Component {
  render() {
    const { classes, tasks, status, onClickEdit, onClickDelete } = this.props;
    return (
      <Grid item md={4} xs={12} key={status.value}>
        <Box mt={1} mb={1}>
          <div className={classes.status}>{status}</div>
        </Box>
        <div className={classes.wrapperListTask}>
          {tasks.map((task, index) => (
            <TaskItem
              key={index}
              tasks={task}
              status={status}
              onClickEdit={() => onClickEdit(task)}
              onClickDelete={() => {
                onClickDelete(task);
              }}
            />
          ))}
        </div>
      </Grid>
    );
  }
}

TaskList.propTypes = {
  classes: propTypes.object,
  tasks: propTypes.array,
  onClickEdit: propTypes.func,
  onClickDelete: propTypes.func,
};
export default withStyles(styles)(TaskList);

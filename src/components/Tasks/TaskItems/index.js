import React, { Component } from 'react';
import {
  withStyles,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Fab,
  Icon,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';
import moment from 'moment'

class TaskItem extends Component {
  render() {
    const { classes, tasks, status, onClickEdit, onClickDelete } = this.props;
    const { _id, WO, PCT, timeStart, timeStop, userId } = tasks;
    return (
      <Card key={_id} className={classes.card}>
        <CardContent >
          <Grid container justify="space-between">
            <Grid item md={12}>
              Work Order: {WO}
            </Grid>
            <Grid item md={12}>
              PCT: {PCT}
            </Grid>
            <Grid item md={12}>
              Người dùng: {userId ? userId.name : ''}
            </Grid>
          </Grid>
          <p>{ `${moment(timeStart).format('DD/MM/YYYY')} - ${moment(timeStart).format('DD/MM/YYYY')}`}</p>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Fab
            color="primary"
            aria-label="Edit"
            className={classes.fab}
            size="small"
            onClick={onClickEdit}
          >
            <Icon fontSize="small">visibility_icon</Icon>
          </Fab>
          {/* <Fab
            color="secondary"
            aria-label="Delete"
            className={classes.fab}
            size="small"
            onClick={onClickDelete}
          >
            <Icon fontSize="small">delete_icon</Icon>
          </Fab> */}
        </CardActions>
      </Card>
    );
  }
}
TaskItem.propTypes = {
  classes: PropTypes.object,
  tasks: PropTypes.object,
};

export default withStyles(styles)(TaskItem);

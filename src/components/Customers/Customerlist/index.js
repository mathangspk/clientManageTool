import React, { Component, Fragment } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { compose } from 'redux'
import { withStyles } from '@material-ui/core';
import styles from './styles';

class CustomerList extends Component {
  render() {
    const { classes, } = this.props;
    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellIndex}>#</TableCell>
                <TableCell align="right" className={classes.cell}>Tên khách hàng</TableCell>
                <TableCell align="right" className={classes.cell}>Email</TableCell>
                <TableCell align="right" className={classes.cell}>Phân Xưởng</TableCell>
                <TableCell align="right" className={classes.cell}>Tổ</TableCell>
                <TableCell align="right" className={classes.cell}>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.children}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }
}

export default compose(
  withStyles(styles))
  (CustomerList);

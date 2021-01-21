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

class ToolList extends Component {
  render() {
    const { classes, } = this.props;
    return (
      <Fragment>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className={classes.cell}>Tool ID</TableCell>
                <TableCell align="center" className={classes.cell}>Tên Công Cụ</TableCell>
                <TableCell align="center" className={classes.cellDescription}>Hãng</TableCell>
                <TableCell align="center" className={classes.cell}>Loại</TableCell>
                <TableCell align="center" className={classes.cell}>Số lượng</TableCell>
                <TableCell align="center" className={classes.cell}>Hành động</TableCell>
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
  (ToolList);

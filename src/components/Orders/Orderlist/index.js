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

class OrderList extends Component {
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
                <TableCell align="right" className={classes.cell}>Sản phẩm abc abc</TableCell>
                <TableCell align="right" className={classes.cell}>Số lượng</TableCell>
                <TableCell align="right" className={classes.cell}>Giá&nbsp;(VNĐ)</TableCell>
                <TableCell align="right" className={classes.cell}>Tổng tiền&nbsp;(VNĐ)</TableCell>
                <TableCell align="right" className={classes.cell}>Trạng thái</TableCell>
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
  (OrderList);

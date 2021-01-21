import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { filter } from 'lodash';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from './styles'
import { compose } from 'redux';
import { Fab } from '@material-ui/core';
class OrderItem extends Component {
    deleteOrder = (_id) => {
        if (confirm('Ban co chac xoa?')) { //eslint-disable-line
            this.props.deleteOrder(_id);
        }
    }
    getNameCustomerById = (_id) => {
        var { customers } = this.props;
        var nameCustomer = filter(customers, customer => {
            return customer._id.toString().indexOf(_id) !== -1;
        })
        var name = nameCustomer.map((name, index) => {
            return name.name
        })
        return (String(name))

    }
    render() {
        var { _id, customerId, quantity, price, cash, status } = this.props.order;
        var { index } = this.props;
        var nameCustomer = this.getNameCustomerById(customerId);
        var { classes, onClickDelete, onClickEdit, productName } = this.props;
        return (
            <Fragment>
                <TableRow key={_id}>
                    <TableCell className={classes.cellIndex}>{index + 1}</TableCell>
                    <TableCell align="right" className={classes.cell}><span className="bg-primary text-white rounded" />{nameCustomer}</TableCell>
                    <TableCell align="right" className={classes.cell}>{productName}</TableCell>
                    <TableCell align="right" className={classes.cell}>{quantity}</TableCell>
                    <TableCell align="right" className={classes.cell}>{price}</TableCell>
                    <TableCell align="right" className={classes.cell}>{cash}</TableCell>
                    <TableCell align="right" className={classes.cell}><span className="bg-success text-white rounded " />{status}</TableCell>
                    <TableCell align="right" className={classes.cell}>
                        <Fab
                            color="default"
                            aria-label="Delete"
                            className={classes.fab}
                            size="small"
                            onClick={onClickEdit}
                        >
                            <EditIcon color="primary" />
                        </Fab>

                         &nbsp;
                            <Fab
                            color="default"
                            aria-label="Delete"
                            className={classes.fab}
                            size="small"
                            onClick={onClickDelete}
                        >
                            <DeleteForeverIcon color="error" />
                        </Fab>

                        <Link to={`/orders/${_id}/edit`} className="btn btn-success"><i className="fas fa-info"></i></Link></TableCell>
                </TableRow>
            </Fragment>
        );
    }
}

export default compose(
    withStyles(styles))
    (OrderItem);
import React, { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from './styles'
import { compose } from 'redux';
import { Fab } from '@material-ui/core';
class CustomerItem extends Component {
    render() {
        var { _id, name, email, department, group } = this.props.customer;
        var { index } = this.props;
        var { classes, onClickDelete, onClickEdit } = this.props;
        return (
            <Fragment>
                <TableRow key={_id}>
                    <TableCell className={classes.cellIndex}>{index + 1}</TableCell>
                    <TableCell align="right" className={classes.cell}>{name}</TableCell>
                    <TableCell align="right" className={classes.cell}>{email}</TableCell>
                    <TableCell align="right" className={classes.cell}>{department}</TableCell>
                    <TableCell align="right" className={classes.cell}>{group}</TableCell>
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
                    </TableCell>
                </TableRow>
            </Fragment>
        );
    }
}

export default compose(
    withStyles(styles))
    (CustomerItem);
import React, { Component, Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from './styles'
import { compose } from 'redux';
import { Fab } from '@material-ui/core';
class ToolItem extends Component {

    render() {
        var { _id, toolId, name, manufacturer, quantity, type } = this.props.tool;
        var { classes, onClickDelete, onClickEdit, onClickRow } = this.props;
        return (
            <Fragment>
                <TableRow key={_id} hover onClick={onClickRow} className={classes.tableCell}>
                    <TableCell align="center" className={classes.cell}><span className="bg-primary text-white rounded" />{toolId}</TableCell>
                    <TableCell align="center" className={classes.cell}>{name}</TableCell>
                    <TableCell align="center" className={classes.cellDescription}>{manufacturer}</TableCell>
                    <TableCell align="center" className={classes.cell}>{type}</TableCell>
                    <TableCell align="center" className={classes.cell}>{quantity}</TableCell>
                    <TableCell align="center" className={classes.cellAction} >
                        <Fab
                            color="default"
                            aria-label="Delete"
                            className={classes.fab}
                            size='small'
                            onClick={onClickEdit}
                        >
                            <EditIcon color="primary" />
                        </Fab>

                         &nbsp;
                            <Fab
                            color="default"
                            aria-label="Delete"
                            className={classes.fab}
                            size='small'
                            onClick={onClickDelete}
                        >
                            <DeleteForeverIcon color="error" fontSize="small" />
                        </Fab>
                    </TableCell>
                </TableRow>
            </Fragment>
        );
    }
}

export default compose(
    withStyles(styles))
    (ToolItem);
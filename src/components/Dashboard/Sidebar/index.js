import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles, ListItemText, ListItemIcon } from '@material-ui/core';
import { ADMIN_ROUTES } from '../../../constants';
import { connect } from 'react-redux';
import { compose } from 'redux';

import cn from 'classnames';

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import styles from './styles';
class Sidebar extends Component {

    toggleDrawer = (value) => {
        const { onToggleSidebar } = this.props;
        if (onToggleSidebar) {
            onToggleSidebar(value);
        }
        console.log(value);
    }
    handleToggleSidebar = () => {
        const { showSidebar, onToggleSidebar } = this.props;
        if (onToggleSidebar) {
            onToggleSidebar(!showSidebar)
        }
    }
    renderList() {
        const { classes, user } = this.props;
        let xhtml = null;
        xhtml = (
            <div className={classes.list}>
                <List component="div" >
                    {ADMIN_ROUTES.filter(item => !item.isHide && (user && !user.admin ? !item.onlyAdmin : true)).map((item) => {
                        return (
                            <NavLink key={item.path} to={item.path} exact={item.exact} className={classes.menuLink} activeClassName={classes.menuLinkActive}>
                                <ListItem 
                                    key={item.name}
                                    className={classes.listItem}
                                    onClick={this.handleToggleSidebar}
                                    button>
                                    <ListItemIcon>{<item.iconSidebar/>}</ListItemIcon>
                                    <ListItemText>
                                        {item.name}
                                    </ListItemText>

                                </ListItem>
                            </NavLink>
                        )
                    })}
                </List>
            </div>
        )
        return xhtml;
    }
    render() {
        const { classes, showSidebar } = this.props;
        return (
            <Drawer
                // className={cn(classes.drawer, {
                //     [classes.drawerOpen]: showSidebar,
                //     [classes.drawerClose]: !showSidebar,
                // })}
                // variant="persistent"
                anchor="left"
                open={showSidebar}
                //onClick={this.handleToggleSidebar}
                onClose={this.handleToggleSidebar}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {this.renderList()}
            </Drawer>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth.user
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
    withStyles(styles),
    withConnect,
)(Sidebar);

import React, { Component } from 'react';
import { withStyles,  } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, } from 'redux';
import styles from './style';
import { Redirect } from "react-router-dom";
class AdminHomePage extends Component {
    renderAuthenticates = () => {
        const { isAuthenticated } = this.props;
        let xhtml = null;
        if (isAuthenticated) {
            xhtml = <div>is au then ti cated</div>;
        }
        return xhtml;
    }
    render() {
        return (
            <div>
                <Redirect to="/admin/order" />
                <h1>AdminHomePage</h1>
                {this.renderAuthenticates()}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
    withStyles(styles),
    withConnect,
)(AdminHomePage);
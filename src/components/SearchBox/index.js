import React, { Component } from 'react';
import { withStyles, TextField } from '@material-ui/core';
import styles from './styles';
import PropTypes from 'prop-types';
class SearchBox extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <form className={classes.container}>
        <TextField
          autoComplete="off"
          id="outlined-search"
          label="Tìm kiếm từ khóa..."
          type="search"
          variant="outlined"
          onChange={handleChange}
        />
      </form>
    );
  }
}
SearchBox.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SearchBox);

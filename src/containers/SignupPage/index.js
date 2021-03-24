import React, { Component } from 'react';
import { withStyles, Typography, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import styles from './style';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';

class SignupPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.signup}>
          <Card>
            <CardContent>
              <form>
                <div>
                  <Typography varianr="caption">
                    Dang ky tai khoan
                  </Typography>
                </div>
                <TextField
                  id="email"
                  label="email"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="name"
                  label="Ten nguoi dung"
                  className={classes.textField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="cpassword"
                  label="Confirm Password"
                  className={classes.textField}
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <FormControlLabel
                  control={<Checkbox value="agree" />} 
                  label="Dong y dieu khoan"
                  className = {classes.fullwidth} />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Sign Up
                </Button>
                <div>
                  <Link to="/login">
                    <Button>Da co tai khoan ?</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {

};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  };
};

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(SignupPage)
);

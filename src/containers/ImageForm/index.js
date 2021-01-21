import React, { Component, Fragment } from 'react';
import { withStyles, Grid, Button, Paper, } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modal';
import * as ProductActions from '../../actions/productActions';
import * as imageActions from '../../actions/imageActions';
import styles from './style';
import uploadPicture from '../../assets/images/Placeholder.jpg';
import {limitSizeImage} from '../../constants';
class ImageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listFile: [],
    }
  }
  //@check login success adn error
  onSubmit = (e) => {
    e.preventDefault() // Stop form submit
    const { imageActionsCreator } = this.props;
    const { uploadImages } = imageActionsCreator;
    if (this.state.listFile && this.state.listFile.length > 0) {
      var { listFile } = this.state;
      uploadImages(listFile);
      this.setState({
        listFile: null,
      })
    } else {
      alert('Vui long chon anh ...')
    }
  };
  onChange = (e) => {
    console.log('omchangr')
    console.log(limitSizeImage)
    const countFile = e.target.files.length;
    let arrayFile = [];
    let totalSize = 0;
    for (let i = 0; i < countFile; i++) {
      console.log(e.target.files[i])
      arrayFile.push(e.target.files[i])
      totalSize = totalSize + e.target.files[i].size;
      if (totalSize < limitSizeImage) {
        this.setState({
          listFile: [...this.state.listFile, arrayFile]
        })
      } else {
        console.log('asdsad')
        alert('Tổng dung lượng ảnh lớn hơn 10Mb, vui lòng chọn ảnh khác...');
        break;
      }
    }
  }
  render() {
    const {
      classes,
      modalActionsCreator,
    } = this.props;
    const { hideModal } = modalActionsCreator;
    return (
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Paper className={classes.paper} >
            <img src={uploadPicture} alt="upload" className={classes.picture}/>
            <form onSubmit={this.onSubmit}>
                <input
                  accept="image/*"
                  //className={classes.input}
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={this.onChange}
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="contained" component="span"
                  //className={classes.button}
                  >
                    Select Image</Button>
                </label>
                <Button
                  type="submit"
                  variant="contained"
                //className={classes.button}
                >
                  Upload
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
    );
  }
}

ImageForm.propTypes = {
  customerId: PropTypes.string,
  product: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    productActionsCreator: bindActionCreators(ProductActions, dispatch),
    imageActionsCreator: bindActionCreators(imageActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withStyles(styles),
  withConnect,
)(ImageForm);

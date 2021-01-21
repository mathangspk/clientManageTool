import React, { Component, Fragment } from 'react';
import { withStyles, Grid, Button, Paper, Menu, MenuItem, Typography, FormControl, InputLabel, Select } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { API_ENDPOINT } from '../../constants';
import * as modalActions from '../../actions/modal';
import * as ToolActions from '../../actions/toolActions';
import * as imageActions from '../../actions/imageActions';

import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import styles from './style';
import renderTextField from '../../components/FormHelper/TextField';
import Alert from '@material-ui/lab/Alert';
//  import DropzoneArea from '../../components/DropzoneArea';
 import DropzoneDialog from '../../components/DropzoneDialog';

const menuId = 'primary-search-account-menu';
class ToolForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msgError: '',
      anchorEl: null,
      imageSelected: '',
      statusSelected: props.toolEditting ? props.toolEditting.status : 1,
    }
  }
  //@check login success adn error
  componentDidUpdate(nextprops) {
    const { msgError, } = this.props;
    if (msgError !== nextprops.msgError) {
      this.setState({
        msgError
      })
    }
  }
  handleSubmitForm = (data) => {
    const { toolActionsCreator, toolEditting, images } = this.props;
    const { statusSelected } = this.state;
    const { addTool, updateTool } = toolActionsCreator;
    const { name, manufacturer, type } = data;
    const newTool = {
      name,
      manufacturer,
      quantity: 1,
      images,
      type,
      status: statusSelected || 1
    }
    if (toolEditting) {
      updateTool(newTool);
    } else {
      addTool(newTool);
    }
  };
  saveToolFail = () => {
    const { msgError } = this.state;
    let xhtml = null;
    xhtml = msgError ? (<Alert variant="standard" severity="error">
      {msgError}
    </Alert>) : null
    return xhtml;
  }
  renderToolImages = () => {
    let { images, classes} = this.props;
    let xhtml = null; 
    if (images.length > 0) {
      xhtml = images.map((image, index) => {
        return <Grid item key={image.filename} >
          <Paper>
            <img
              src={`${API_ENDPOINT}/api/upload/image/${image.filename}`}
              alt={image.name}
              className={classes.picture}
              data-filename={image.filename}
              onClick={this.onClickPicture}
            />
          </Paper>
        </Grid>
      })
    }
    return xhtml;
  };
  renderToolImagesNew = () => {
    let { images, classes} = this.props;
    let xhtml = null;
    if (images && images.length > 0) {
      xhtml = images.map((image, index) => {
        return <Grid item key={index} >
          <Paper>
            <img
              src={image.filename}
              alt={image.name}
              data-filename={image.name}
              className={classes.picture}
              onClick={this.onClickPicture}
            />
          </Paper>
        </Grid>
      })
    }
    return xhtml;
  };
  onClickPicture = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      filename: event.currentTarget.dataset.filename,
    });
  };
  cancelSelectImage = () => {
    this.setState({
      anchorEl: null,
    });
  };
  deleteImage = () => {
    const { imageActionsCreator } = this.props;
    const { deleteImage } = imageActionsCreator;
    const { filename } = this.state;
    deleteImage(filename);
    this.setState({
      anchorEl: null,
    });
  }
  renderDetailPicture = () => {
    const { anchorEl } = this.state;
    const isMenuOpen = Boolean(anchorEl);
    return (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        {/* <MenuItem onClick={this.deleteImage}>Xóa</MenuItem> */}
        <MenuItem onClick={this.deleteImage}>Hủy bỏ</MenuItem>
      </Menu>
    );
  };
  setValueStatus = (event) => {
    const { statusSelected } = this.state;
    if (statusSelected + '' === event.target.value + '') {
      return
    } else {
      this.setState({ statusSelected: event.target.value })
    }
  }
  render() {
    const {
      classes,
      modalActionsCreator,
      handleSubmit,
      invalid,
      submitting,
      toolEditting
    } = this.props;
    const { statusSelected } = this.state;
    const { hideModal } = modalActionsCreator;
    return (
      <Fragment>
        {this.renderDetailPicture()}
        <form onSubmit={handleSubmit(this.handleSubmitForm)}>
          <Grid container className={classes.form}>
            <Grid item container
              direction="row"
              justify="center"
              alignItems="center" >
              <div>{this.saveToolFail()}</div>
            </Grid>
            <Grid item md={12} xs={12}>
              <Field
                id="name"
                name="name"
                label="Tên công cụ"
                className={classes.TextField}
                margin="normal"
                component={renderTextField}
              ></Field>
            </Grid>
            <Grid item md={12} xs={12}>
              <Field
                id="manufacturer"
                name="manufacturer"
                label="Hãng sản xuất"
                className={classes.TextField}
                margin="normal"
                component={renderTextField}
              ></Field>
            </Grid>
            <Grid item md={12} xs={12}>
              <Field
                id="type"
                name="type"
                label="Loại"
                className={classes.TextField}
                margin="normal"
                component={renderTextField}
              ></Field>
            </Grid>
            {
              toolEditting ?
              <Grid item md={12} xs={12}>
                <FormControl fullWidth style={{'marginTop': '16px'}}>
                  <InputLabel htmlFor="status">Trạng thái</InputLabel>
                  <Select
                    fullWidth
                    native
                    value={statusSelected}
                    onChange={this.setValueStatus}
                    inputProps={{
                      name: 'status',
                      id: 'status',
                    }}
                  >
                    <option value="1">READY</option>
                    <option value="2">IN USE</option>
                    <option value="3">BAD</option>
                    <option value="4">LOST</option>
                  </Select>
                </FormControl>
              </Grid>
              : <></>
            }
            <Grid item md={12} xs={12} className={classes.showImage}>
              <Grid item>
                <Typography variant="h6" >Hình ảnh công cụ</Typography>
              </Grid>
              <Grid container spacing={3} className={classes.showImage} >
                {this.renderToolImages()}
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
            >
              {/* <DropzoneArea/> */}
              <DropzoneDialog />
              <Button onClick={hideModal}>Hủy</Button>
              <Button disabled={invalid || submitting} type="submit">
                Lưu
            </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

ToolForm.propTypes = {
  customerId: PropTypes.string,
  tool: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
  return {
    toolEditting: state.tools.toolEditting,
    initialValues: {
      name: state.tools.toolEditting
        ? state.tools.toolEditting.name
        : null,
      manufacturer: state.tools.toolEditting ? state.tools.toolEditting.manufacturer : null,
      type: state.tools.toolEditting ? state.tools.toolEditting.type : null,
      status: state.tools.toolEditting ? state.tools.toolEditting.status : null
    },
    msgError: state.error.msg,
    showModalStatus: state.modal.showModal,
    images: state.images.images,
    imagesInTool: state.tools.toolEditting ? state.tools.toolEditting.images: null,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    toolActionsCreator: bindActionCreators(ToolActions, dispatch),
    imageActionsCreator: bindActionCreators(imageActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const FORM_NAME = 'TOOL_MANAGEMENT';
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});
export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm,
)(ToolForm);

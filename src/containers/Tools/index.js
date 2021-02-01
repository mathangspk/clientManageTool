import React, { Component, Fragment, } from 'react';

import { connect } from 'react-redux';
import * as toolActions from '../../actions/toolActions';
import * as imageActions from '../../actions/imageActions';
import * as modalActions from '../../actions/modal';
import * as OrderActions from '../../actions/orderActions';
import { bindActionCreators, compose } from 'redux';
import ToolForm from '../ToolForm';
import { Grid, withStyles, Fab, TextField, FormControl, InputLabel, Select, GridList, GridListTile } from '@material-ui/core';
import styles from './style';
import { limitSizeImage } from '../../constants';
import { DeleteForever, Add, Edit, Remove } from '@material-ui/icons';
import DataTable from 'react-data-table-component';
import { API_ENDPOINT as URL } from '../../constants';
import { popupConfirm } from '../../actions/ui';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

class Tools extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listFile: [],
      filenameImageTool: [],
      largeImage: '',
      searchTerm: '',
      dataSelected: {},
      dataSearch: {
        name: '',
        manufacturer: '',
        type: '',
        userName: '',
        status: "all"
      },
      columnsGrid: [
        {
          name: 'Hành động', width: '120px',
          cell: (param) => {
            let data = JSON.parse(JSON.stringify(param))
            const { classes, user, order, match: { params } } = this.props;
            return <>
              {
                params.orderId ?
                  (order && user && order._id && !user.admin && user._id !== order.userId._id && order.status !== 'START' ?
                    <></>
                    :
                    <>
                      {
                        data.hasTool ?
                          <Fab
                            color="default"
                            aria-label="Xóa khỏi WO"
                            size='small'
                            onClick={() => {
                              this.onClickWorkOrder(data)
                            }}
                          >
                            <DeleteForever color="error" fontSize="small" />
                          </Fab>
                          : (
                            data.status === 1 ?
                              <Fab
                                color="default"
                                aria-label="Thêm vào WO"
                                size='small'
                                onClick={() => {
                                  this.onClickWorkOrder(data)
                                }}
                              >
                                <Add className={classes.colorSuccess} fontSize="small" />
                              </Fab>
                              : <></>
                          )
                      }
                    </>
                  )
                  :
                  <>
                    {
                      user && user.admin ?
                        <>
                          <Fab
                            color="default"
                            aria-label="Delete"
                            size='small'
                            onClick={() => {
                              this.onClickEdit(data)
                            }}
                          >
                            <Edit color="primary" />
                          </Fab>
                      &nbsp;&nbsp;
                          <Fab
                            color="default"
                            aria-label="Delete"
                            size='small'
                            onClick={() => {
                              this.onClickDelete(data)
                            }}
                          >
                            <DeleteForever color="error" fontSize="small" />
                          </Fab>
                      &nbsp;&nbsp;
                        </>
                        : <></>
                    }
                  </>
              }
            </>
          }
        },
        { selector: 'name', name: 'Tên công cụ', minWidth: '100px', maxWidth: '300px', sortable: true },
        {
          selector: 'status', name: 'Trạng thái', width: '150px', sortable: true, center: true,
          cell: (param) => {
            let status = 'READY'
            let className = 'ready'
            switch (param.status + "") {
              case "1":
                status = 'READY';
                className = 'ready';
                break;
              case "2":
                status = 'IN USE';
                className = 'in-use';
                break;
              case "3":
                status = 'BAD'
                className = 'bad';
                break;
              case "4":
                status = 'LOST';
                className = 'lost';
                break;
              default:
                status = 'READY'
                break;
            }
            return <div className={'lb-status color-' + className}>{status}</div>;
          }
        },
        { selector: 'manufacturer', name: 'Hãng', minWidth: '100px', maxWidth: '150px', sortable: true },
        { selector: 'type', name: 'Loại', minWidth: '100px', maxWidth: '150px', sortable: true, allowOverflow: false, wrap: false },
        { selector: 'woName', name: 'Work Order', width: '120px', sortable: true },
        { selector: 'userName', name: 'Người dùng', width: '200px', sortable: true },


      ]
    }
  }

  componentDidMount() {
    const { orderActionsCreator, toolActionCreator, match: { params } } = this.props;
    const { listAllTools } = toolActionCreator;
    const { getIdOrder } = orderActionsCreator;
    listAllTools();
    if (params.orderId) {
      getIdOrder(params.orderId)
    }
  }
  onClickDelete = (tool) => {
    let self = this
    popupConfirm({
      title: 'Delete',
      html: "Bạn muốn xóa Công cụ này?",
      ifOk: () => {
        const { toolActionCreator } = self.props;
        const { deleteTool } = toolActionCreator;
        deleteTool(tool)
      }
    })
  }
  onClickEdit = (tool) => {
    const { toolActionCreator, modalActionsCreator, imageActionsCreator } = this.props;
    const { setToolEditing } = toolActionCreator;
    const { uploadImagesSuccess } = imageActionsCreator;
    uploadImagesSuccess(tool.images);
    setToolEditing(tool);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionsCreator;
    showModal();
    changeModalTitle('Sửa công cụ');
    changeModalContent(<ToolForm />);
  }
  onClickWorkOrder = (tool) => {
    const { orderActionsCreator, toolActionCreator, order, user } = this.props;
    if (order && !user.admin && user._id !== order.userId._id) {
      window.location.href = '/admin/order'
      return
    }
    const { updateOrder } = orderActionsCreator;
    const { updateTool } = toolActionCreator;
    let newOrder = JSON.parse(JSON.stringify(order));
    let newTool = JSON.parse(JSON.stringify(tool));
    let lstTool = []
    if (newOrder.toolId && newOrder.toolId.length > 0) {
      lstTool = newOrder.toolId
      if (newOrder.toolId[0]._id) {
        lstTool = newOrder.toolId.map(i => i._id)
      }
    }
    let indexTool = lstTool.indexOf(tool._id);
    if (indexTool > -1) {
      lstTool.splice(indexTool, 1);
      newTool.status = 1;
      newTool.wo = "";
      newTool.hasTool = false;
    } else {
      lstTool.unshift(tool._id);
      newTool.status = 2;
      newTool.wo = newOrder.WO;
    }
    newOrder.toolId = lstTool
    newTool.woInfo = newOrder
    // updateOrder(newOrder);
    updateTool(newTool);
  }
  onClickRow = (tool) => {
    this.setState({
      filenameImageTool: tool.images
    })
  }
  onChange = (e) => {
    const countFile = e.target.files.length;
    let arrayFile = [];
    let totalSize = 0;
    for (let i = 0; i < countFile; i++) {
      arrayFile.push(e.target.files[i])
      totalSize = totalSize + e.target.files[i].size;
      if (totalSize < limitSizeImage) {
        this.setState({
          listFile: [...this.state.listFile, arrayFile]
        })
      } else {
        alert('Tổng dung lượng ảnh lớn hơn 10Mb, vui lòng chọn ảnh khác...');
        break;
      }
    }
  }
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
      alert('Vui lòng chọn ảnh ...')
    }
  }
  becomeLargeImage = (filename) => {
    this.setState({
      largeImage: filename,
    })
  }
  handleSearch = (event) => {

    const { toolActionCreator } = this.props;
    const { dataSearch } = this.state;
    const { searchToolsSuccess } = toolActionCreator;
    let search = {
      ...dataSearch,
      [event.target.name]: event.target.value
    }
    this.setState({ dataSearch: search });
    searchToolsSuccess([], search);
  }
  handleRowClicked = (data) => {
    let { dataSelected } = this.state;
    if (dataSelected._id === data._id) {
      dataSelected = {}
    } else {
      dataSelected = data
    }
    this.setState({ dataSelected });
  }
  getImage = (images) => {
    return images.map(img => ({
      original: `${URL}/api/upload/image/${img.filename}`,
      thumbnail: `${URL}/api/upload/image/${img.filename}`
    }))
  }
  render() {
    const { tools, classes } = this.props;
    const { columnsGrid, dataSearch, dataSelected } = this.state;
    return (
      <Fragment>
        <div className={classes.content}>
          <div className="box-search">
            <div className="lb-search">Search</div>
            <div className="field-search">
              <TextField
                fullWidth
                id="search_name"
                name="name"
                label="Công cụ"
                variant="filled"
                onInput={this.handleSearch}
              />
            </div>
            <div className="field-search">
              <TextField
                fullWidth
                id="search_manufacturer"
                name="manufacturer"
                label="Hãng"
                variant="filled"
                onInput={this.handleSearch}
              />
            </div>
            <div className="field-search">
              <TextField
                fullWidth
                id="search_type"
                name="type"
                label="Loại"
                variant="filled"
                onInput={this.handleSearch}
              />
            </div>
            <div className="field-search">
              <TextField
                fullWidth
                id="search_user"
                name="userName"
                label="Người dùng"
                variant="filled"
                onInput={this.handleSearch}
              />
            </div>
            <div className="field-search">
              <FormControl fullWidth variant="filled">
                <InputLabel htmlFor="status">Trạng thái</InputLabel>
                <Select
                  fullWidth
                  native
                  value={dataSearch.status}
                  onChange={this.handleSearch}
                  inputProps={{
                    name: 'status',
                    id: 'status',
                  }}
                >
                  <option value="all">Tất cả</option>
                  <option value="1">READY</option>
                  <option value="2">IN USE</option>
                  <option value="3">BAD</option>
                  <option value="4">LOST</option>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className={classes.boxGridTable}>
            <Grid className={classes.dataTable + (dataSelected._id ? ' change-width' : '')}>
              <DataTable
                noHeader={true}
                keyField={'_id'}
                columns={columnsGrid}
                data={this.generateTools(tools)}
                striped={true}
                pagination
                paginationPerPage={20}
                paginationRowsPerPageOptions={[10, 20, 50]}
                onRowClicked={this.handleRowClicked}
              />
            </Grid>
            <div className={'data-select' + (dataSelected._id ? '' : ' hide')}>
              <div>Tên công cụ: {dataSelected.name}</div>
              <div>Hãng: {dataSelected.manufacturer}</div>
              <div>Loại: {dataSelected.type}</div>
              <div>Hình ảnh:</div>
              {
                (dataSelected.images || []).length === 0 ? <></>
                  : <ImageGallery className="field-gallery" items={this.getImage(dataSelected.images)} />
              }
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    // eslint-disable-next-line no-useless-escape
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
  }
  generateTools = (tools) => {
    let { order, user } = this.props;
    const { dataSearch } = this.state;
    if (!user && !user._id) return []
    order.isAction = true
    if (order && order._id && !user.admin && (user._id !== order.userId._id || order.status !== 'START')) order.isAction = false;

    let _tools = JSON.parse(JSON.stringify(tools.filter(t =>
      this.removeVietnameseTones(t.name).toLowerCase().indexOf(dataSearch.name.toLowerCase()) > -1 &&
      this.removeVietnameseTones(t.manufacturer).toLowerCase().indexOf(dataSearch.manufacturer.toLowerCase()) > -1 &&
      this.removeVietnameseTones(t.type).toLowerCase().indexOf(dataSearch.type.toLowerCase()) > -1
    )));
    if (dataSearch.status && dataSearch.status !== 'all') {
      _tools = _tools.filter(t => {
        t.status = t.status || "1";
        return dataSearch.status === t.status + '';
      })
    }
    if (order && order.toolId && order.toolId.length > 0) {
      let lstIdTool = order.toolId
      if (order.toolId[0]._id) {
        lstIdTool = order.toolId.map(t => t._id)
      }
      _tools.filter(t => t.status).forEach(t => {
        t.hasTool = lstIdTool.indexOf(t._id) > -1;
      })
    }
    if (dataSearch.userName && dataSearch.status == '2') {
      console.log(dataSearch.userName)
      _tools = _tools.filter(t =>
        this.removeVietnameseTones(t.woInfo[0].userInfo.name).toLowerCase().indexOf(dataSearch.userName.toLowerCase()) > -1
      )
    }
    console.log(_tools);

    _tools.forEach(t => {
      if (t.woInfo && t.woInfo.length > 0) {
        let woInfo = t.woInfo.filter(wo => (wo.status !== "COMPLETE"));
        if (woInfo.length > 0 && t.status === 2) {
          let showInfo = t.woInfo.filter(wo => (wo.WO === t.wo));
          console.log(showInfo)
          if (showInfo.length > 0) {
            t.woName = showInfo[0].WO;
            t.userName = showInfo[0].userInfo.name
          }
        }
      }
    })

    return _tools;
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    tools: state.tools.tools || [],
    user: state.auth.user || {},
    order: state.orders.order || {}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toolActionCreator: bindActionCreators(toolActions, dispatch),
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
    imageActionsCreator: bindActionCreators(imageActions, dispatch),
    orderActionsCreator: bindActionCreators(OrderActions, dispatch)
  }
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withStyles(styles),
  withConnect,
)(Tools);
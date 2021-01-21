import React, { Component, Fragment, } from 'react';

import { connect } from 'react-redux';
import * as orderActions from '../../actions/orderActions';
import * as modalActions from '../../actions/modal';
import * as toolActions from '../../actions/toolActions';
import * as customerActions from '../../actions/customerActions';
import { bindActionCreators, compose } from 'redux';
import styles from './style';
import { Grid, withStyles, Fab, TextField, FormControl, Button } from '@material-ui/core';
import { Redirect } from "react-router-dom";
import { DeleteForever, ArrowBackIos, Edit } from '@material-ui/icons';
import DataTable from 'react-data-table-component';
import { API_ENDPOINT as URL } from '../../constants';
import OrderForm from '../OrderForm';
import moment from 'moment';
import { popupConfirm } from '../../actions/ui';
import ImageGallery from 'react-image-gallery';
import { Multiselect } from 'multiselect-react-dropdown';
import "react-image-gallery/styles/css/image-gallery.css";


class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showRightPanel: false,
      redirect: false,
      urlRedirect: '',
      currentIdTool: {},
      isChange: false,
      columnsGrid: [
        { selector: 'name', name: 'Tên công cụ', width: 'calc((100% - 100px) / 3)', sortable: true },
        { selector: 'manufacturer', name: 'Hãng', width: 'calc((100% - 100px) / 3)', sortable: true },
        { selector: 'type', name: 'Loại', width: 'calc((100% - 100px) / 3)', sortable: true },
        {
          name: 'Hành động', width: '100px',
          cell: (params) => {
            let { order } = this.props;
            if (!order.isAction) return <></>
            let data = JSON.parse(JSON.stringify(params))
            return <>
              <Fab
                color="default"
                aria-label="Remove"
                size='small'
                onClick={() => {
                  this.onClickRemoveTool(data)
                }}
              >
                <DeleteForever color="error" fontSize="small" />
              </Fab>
            </>
          }
        }
      ]
    }
  }
  componentDidMount() {
    const { orderActionCreator, customerActionCreator, match: { params } } = this.props;
    const { getIdOrder } = orderActionCreator;
    const { listAllCustomers } = customerActionCreator;
    getIdOrder(params.orderId);
    listAllCustomers();
  }
  onClickShowTool = (data) => {
    if (data._id === this.state.currentIdTool._id) {
      this.setState({ showRightPanel: false, currentIdTool: {} });
    } else {
      this.setState({ showRightPanel: true, currentIdTool: data })
    }
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.urlRedirect} />
    }
  }
  onClickAddTool = (urlRedirect) => {
    this.setState({
      redirect: true,
      urlRedirect
    })
  }
  onClickGotoList = (urlRedirect) => {
    this.setState({
      redirect: true,
      urlRedirect
    })
  }
  onClickRemoveTool = (data) => {
    let self = this
    popupConfirm({
      title: 'Delete',
      html: "Bạn muốn bỏ công cụ này?",
      ifOk: () => {
        const { orderActionCreator, toolActionCreator, order } = self.props;
        const { currentIdTool } = self.state;
        const { updateOrder } = orderActionCreator;
        const { updateTool } = toolActionCreator;
        const newOrder = JSON.parse(JSON.stringify(order));
        const newTool = JSON.parse(JSON.stringify(data));
        let indexTool = newOrder.toolId.indexOf(data._id);
        newOrder.toolId.splice(indexTool, 1);
        newTool.status = 1;
        if (currentIdTool._id === data._id) {
          self.setState({ currentIdTool: {} });
        }
        updateOrder(newOrder);
        updateTool(newTool);
      }
    })
  }
  onClickEdit = (data) => {
    const { orderActionCreator, modalActionsCreator } = this.props;
    const { setOrderEditing } = orderActionCreator;
    setOrderEditing(data);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionsCreator;
    showModal();
    changeModalTitle('Sửa Work Order');
    changeModalContent(<OrderForm />);
  }
  onClickVerify = (data) => {
    const { orderActionCreator, user } = this.props;
    const { updateOrder } = orderActionCreator;
    const newOrder = JSON.parse(JSON.stringify(data))
    switch (newOrder.status) {
      case 'START':
        if (user.admin) {
          newOrder.status = 'READY'
        } else {
          newOrder.status = 'READY'
        }
        break;
      case 'READY':
        if (user.admin) {
          newOrder.status = 'IN PROGRESS'
        }
        break;
      case 'IN PROGRESS':
        if (user.admin) {
          newOrder.status = 'COMPLETE'
        }
        break;
      case 'COMPLETE':
        break;
      default:
        break;
    }
    updateOrder(newOrder);
  };
  groupButtonActions = () => {
    const { order, user } = this.props
    if (!order.userId || order.toolId.length === 0) return <></>;
    switch (order.status) {
      case 'START':
        if (user._id !== order.userId._id) return <></>
        return <Button variant="contained" color="primary" onClick={() => { this.onClickVerify(order) }}>Gửi Duyệt</Button>;
      case 'READY':
        if (user.admin) {
          return <Button variant="contained" color="primary" onClick={() => { this.onClickVerify(order) }}>Duyệt</Button>;
        } else {
          return <></>;
        }
      case 'IN PROGRESS':
        if (user.admin) {
          return <Button variant="contained" color="primary" onClick={() => { this.onClickVerify(order) }}>Hoàn Thành</Button>;
        } else {
          return <></>;
        }
      case 'COMPLETE':
        return <></>;
      default:
        return <></>;
    }
  }
  renderStatusText = (status) => {
    const { user } = this.props
    if (!user) return '';
    switch (status) {
      case 'READY':
        return user.admin ? '' : ' - CHỜ DUYỆT'
      case 'IN PROGRESS':
        return user.admin ? '' : ' - ĐANG XỬ LÝ'
      default:
        return ''
    }
  }
  classAddTool = (order) => {
    const { user } = this.props
    if (!order.userId) return 'hide';
    if (!user.admin && (user._id !== order.userId._id || order.status !== 'START')) return 'hide';
    if (order.status === 'COMPLETE') return 'hide';
    return ''
  }
  getImage = (images) => {
    return images.map(img => ({
      original: `${URL}/api/upload/image/${img.filename}`,
      thumbnail: `${URL}/api/upload/image/${img.filename}`
    }))
  }
  addandremoveUserNV = (data) => {
    const { orderActionCreator, order } = this.props;
    const { updateOrder } = orderActionCreator;
    const newOrder = JSON.parse(JSON.stringify(order));
    newOrder.NV = data
    updateOrder(newOrder);
  }
  onChangeNote = (event) => {
    const { orderActionCreator, order } = this.props;
    const { updateOrderNote } = orderActionCreator;
    const newOrder = JSON.parse(JSON.stringify(order));
    newOrder.note = event.target.value;
    this.setState({ isChange: true });
    updateOrderNote(newOrder);
  }
  onBlurNote = (event) => {
    const { orderActionCreator, order } = this.props;
    const { isChange } = this.state;
    const newOrder = JSON.parse(JSON.stringify(order));
    if (isChange) {
      const { updateOrder } = orderActionCreator;
      newOrder.note = event.target.value;
      updateOrder(newOrder);
      this.setState({ isChange: false });
    }
  }
  render() {
    const { classes, order, user, customers } = this.props
    const { showRightPanel, columnsGrid, currentIdTool } = this.state
    return (
      <Fragment>
        <div className={classes.containerPanel}>
          {this.renderRedirect()}
          <div className={order._id ? '' : classes.maskLoading}>
          </div>
          <Grid className={(showRightPanel ? 'box-panel show-right-panel' : 'box-panel')}>
            <Grid className='left-panel'>
              <div className='block'>
                <div className='header-action'>
                  <div className='group'>
                    <Button variant="contained" color="primary" onClick={() => { this.onClickGotoList('/admin/order') }}>
                      <ArrowBackIos style={{ 'color': '#fff' }} fontSize="small" />&nbsp;Quay về danh sách
                    </Button>
                    &nbsp;
                    <Button className={order.userId && (user.admin || user._id === order.userId._id) ? '' : 'hide'} variant="contained" color="primary" onClick={() => { this.onClickEdit(order) }}>
                      <Edit style={{ 'color': '#fff' }} fontSize="small" />&nbsp;Chỉnh sửa
                    </Button>
                  </div>
                  <div className='group'>
                    <Button variant="contained" color="primary">
                      Trạng thái: {order.status}{this.renderStatusText(order.status)}
                    </Button>
                    &nbsp;
                    {this.groupButtonActions()}
                  </div>
                </div>
                {order.userId && user._id !== order.userId._id ? <div className='customer-field'>Người dùng: {order.userId ? order.userId.name : ''}</div> : ''}
                <div className='info-wo'>
                  <div className='col-wo-50'>
                    <FormControl className='field' fullWidth>
                      <TextField id="wo" value={order.WO} label="Work Order" InputProps={{ readOnly: true }} />
                    </FormControl>
                    <FormControl className='field' fullWidth>
                      <TextField id="pct" value={order.PCT} label="PCT" InputProps={{ readOnly: true }} />
                    </FormControl>
                  </div>
                  <div className='col-wo-50'>
                    <FormControl className='field' fullWidth>
                      <TextField id="date_start" value={moment(order.timeStart).format('DD/MM/YYYY')} label="Ngày bắt đầu" InputProps={{ readOnly: true }} />
                    </FormControl>
                    <FormControl className='field' fullWidth>
                      <TextField id="date_stop" value={moment(order.timeStop).format('DD/MM/YYYY')} label="Ngày kết thúc" InputProps={{ readOnly: true }} />
                    </FormControl>
                  </div>
                  <div className='col-wo-100'>
                    <FormControl className='field' fullWidth>
                      <TextField id="content" multiline value={order.content || ' '} label="Nội dung công tác" InputProps={{ readOnly: true }} />
                    </FormControl>
                  </div>
                  <div className='col-wo-100'>
                    <FormControl className='field' fullWidth>
                      <TextField id="note" multiline value={order.note || ''} label="Ghi chú" onBlur={this.onBlurNote} onChange={this.onChangeNote} InputProps={{ readOnly: this.classAddTool(order) === 'hide' }} />
                    </FormControl>
                  </div>
                </div>
                <Grid>
                  <Multiselect
                    options={(customers || []).filter(c => c._id !== user._id)}
                    selectedValues={order.NV}
                    onSelect={this.addandremoveUserNV}
                    onRemove={this.addandremoveUserNV}
                    displayValue="name"
                    placeholder={this.classAddTool(order) === 'hide' ? "" : "Nhân viên nhóm công tác"}
                    disable={this.classAddTool(order) === 'hide'}
                  />
                </Grid>
                <div className={classes.boxActions}>
                  <Button className={this.classAddTool(order)} variant="contained" color="primary" onClick={() => { this.onClickAddTool('/admin/tool/' + order._id) }}>
                    Thêm tool
                  </Button>
                </div>
                <Grid className={classes.dataTable}>
                  <DataTable
                    noHeader={true}
                    keyField={'_id'}
                    columns={columnsGrid}
                    data={this.genarateTools(order)}
                    striped={true}
                    pagination
                    paginationPerPage={20}
                    paginationRowsPerPageOptions={[10, 20, 50]}
                    onRowClicked={this.onClickShowTool}
                    noDataComponent='Chưa thêm công cụ'
                  />
                </Grid>
              </div>
            </Grid>
            <Grid className='right-panel'>
              <div className='block'>
                <div>Tên công cụ: {currentIdTool.name}</div>
                <div>Hãng: {currentIdTool.manufacturer}</div>
                <div>Loại: {currentIdTool.type}</div>
                <div>Hình ảnh:</div>
                {
                  (currentIdTool.images || []).length === 0 ? <></>
                  : <ImageGallery items={this.getImage(currentIdTool.images)} />
                }
              </div>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
  genarateTools = (order) => {
    const { user } = this.props;
    if (!user && !user._id) return [];
    order.isAction = true
    if (!user.admin && order.userId && (order.status !== 'START' || user._id !== order.userId._id)) order.isAction = false;
    if (order.status === 'COMPLETE') order.isAction = false;
    if (order && order.toolId && order.toolId.length > 0 && order.toolId[0]._id) {
      return order.toolId
    }
    return []
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    customers: state.customers.customers,
    orders: state.orders.orders,
    order: {
      WO: state.orders.order ? state.orders.order.WO : '',
      PCT: state.orders.order ? state.orders.order.PCT : '',
      date: state.orders.order ? state.orders.order.date : '',
      status: state.orders.order ? state.orders.order.status : '',
      timeStart: state.orders.order ? state.orders.order.timeStart : '',
      timeStop: state.orders.order ? state.orders.order.timeStop : '',
      toolId: state.orders.order ? state.orders.order.toolId : [],
      content: state.orders.order ? state.orders.order.content : '',
      userId: state.orders.order ? state.orders.order.userId : {},
      NV: state.orders.order ? state.orders.order.NV : [],
      note: state.orders.order ? state.orders.order.note : '',
      _id: state.orders.order ? state.orders.order._id : '',
      isAction: false
    },
    user: state.auth.user || {}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    customerActionCreator: bindActionCreators(customerActions, dispatch),
    toolActionCreator: bindActionCreators(toolActions, dispatch),
    orderActionCreator: bindActionCreators(orderActions, dispatch),
    modalActionsCreator: bindActionCreators(modalActions, dispatch)
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withStyles(styles),
  withConnect,
)(OrderDetail);
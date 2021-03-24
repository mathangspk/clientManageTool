import React, { Component, Fragment, } from 'react';

import { connect } from 'react-redux';
import * as orderActions from '../../actions/orderActions';
import * as modalActions from '../../actions/modal';
import * as customerActions from '../../actions/customerActions';
import { bindActionCreators, compose } from 'redux';
import styles from './style';
import OrderForm from '../OrderForm';
import { Grid, withStyles, Fab, TextField, FormControl, InputLabel, Select, MenuItem, Input } from '@material-ui/core';
import { DeleteForever, Edit, Visibility, Lock } from '@material-ui/icons';
import { Redirect } from "react-router-dom";
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { popupConfirm } from '../../actions/ui';

class Orders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        page: 1,
        rowPerPage: 20,
        rowPerPageOption: [10, 20, 50]
      },
      redirect: false,
      idRedirect: '',
      dataSearch: {
        WO: '',
        PCT: '',
        userId: [],
        status: 'ALL'
      },
      columnsGrid: [
        {
          name: '', width: '100px', center: true,
          cell: (params) => {
            let { user } = this.props;
            let data = JSON.parse(JSON.stringify(params));
            let checkUser = (user.admin || user._id === params.userId._id);
            

            //console.log(user)
            return <>
              <Fab
                color="default"
                aria-label="Xem Chi Tiết"
                size='small'
                onClick={() => {
                  this.onClickView(data._id)
                }}
              >
                <Visibility color="primary" />
              </Fab>
              {
                checkUser ?
                  <>
                    &nbsp;&nbsp;
                    <Fab
                      color="default"
                      aria-label="Sửa WO"
                      size='small'
                      onClick={() => {
                        this.onClickEdit(data)
                      }}
                    >
                      <Edit color="primary" />
                    </Fab>
                  &nbsp;&nbsp;

                    {/* <Fab
                    color="default"
                    aria-label="Xóa WO"
                    size='small'
                    onClick={() => {
                      this.onClickDelete(data)
                    }}
                    >
                    <DeleteForever color="error" fontSize="small" />
                  </Fab> */}
                  </> : <></>
              }
            </>
          }
        },
        { selector: 'WO', name: 'Work Order', width: '120px', sortable: true, center: true },
        { selector: 'PCT', name: 'PCT', width: '120px', sortable: true, center: true },
        { selector: 'userId.name', name: 'Tạo bởi', width: '180px', sortable: true },
        {
          selector: 'status', name: 'Trạng thái', width: '150px', sortable: true, center: true,
          cell: (param) => {
            let { user } = this.props;
            let checkPkt = (user.pkt);
            return <>
              <div className={'lb-status color-' + param.status.toLowerCase().split(' ').join('-')}>
                {param.status}
              </div>
              {/* { checkPkt && param.status === "COMPLETE" ? <>&nbsp; 
              <Fab
                color="default"
                aria-label="Đóng WO"
                size='small'
                onClick={() => {
                  this.onCloseWo(param)
                }}
              >
                <Lock color="primary" />
              </Fab> </> : <></>} */}
              </>
          }
        },
        { selector: 'location', name: 'Địa điểm công tác', width: '150px' },
        { selector: 'KKS', name: 'Hệ thống/KKS', width: '150px' },
        { selector: 'content', name: 'Nội dung công tác', width: '500px' },
        {
          selector: 'timeStart', name: 'Ngày bắt đầu', width: '130px', sortable: true, center: true,
          cell: (params) => moment(params.timeStart).format('DD/MM/YYYY')
        },
        {
          selector: 'timeStop', name: 'Ngày kết thúc', width: '130px', sortable: true, center: true,
          cell: (params) => moment(params.timeStop).format('DD/MM/YYYY')
        },

        { selector: 'userId.department', name: 'Phân xưởng', width: '150px', sortable: true },
      ]
    }
  }
  renderRedirect = () => {
    if (this.state.redirect && this.state.idRedirect) {
      let tool = '/admin/order-detail/' + this.state.idRedirect;
      return <Redirect to={tool} />
    }
  }
  componentDidMount() {
    const { orderActionCreator, customerActionCreator } = this.props;
    const { pagination, dataSearch } = this.state;
    const { searchOrder } = orderActionCreator;
    const { listAllCustomers } = customerActionCreator;
    let params = JSON.parse(JSON.stringify(dataSearch));
    params = {
      ...params,
      skip: (pagination.page - 1) * pagination.rowPerPage,
      limit: pagination.rowPerPage
    }
    searchOrder(params);
    listAllCustomers();
  }
  onClickDelete = (order) => {
    let { user } = this.props;
    const { dataSearch } = this.state;
    if (!user.admin && user._id !== order.userId._id) return;
    let self = this
    popupConfirm({
      title: 'Delete',
      html: "Bạn muốn xóa Work Order này?",
      ifOk: () => {
        const { orderActionCreator } = self.props;
        const { deleteOrder } = orderActionCreator;
        let params = JSON.parse(JSON.stringify(dataSearch))
        deleteOrder(order, params);
      }
    })
  }
  onClickView = (idRedirect) => {
    this.setState({
      redirect: true,
      idRedirect
    })
  };
  onCloseWo = (data) => {
    const { orderActionCreator, user } = this.props;
    const { updateOrder } = orderActionCreator;
    const newOrder = JSON.parse(JSON.stringify(data));
    switch (newOrder.status) {
      case 'COMPLETE':
        if (user.pkt) {
          newOrder.status = 'CLOSE'
        }
        break;
      default:
        break;
    }
    updateOrder(newOrder);
  };
  onClickEdit = (data) => {
    const { orderActionCreator, modalActionsCreator, user } = this.props;
    const { setOrderEditing } = orderActionCreator;
    if (!user.admin && user._id !== data.userId._id) return;
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
  handleSearch = (event) => {
    const { orderActionCreator } = this.props;
    const { pagination, dataSearch } = this.state;
    const { searchOrder } = orderActionCreator;
    let search = {
      ...dataSearch,
      skip: 0,
      limit: pagination.rowPerPage,
      [event.target.name]: event.target.value
    }
    this.setState({ dataSearch: search });
    searchOrder(search);
  }
  handleChangePage = (page, total) => {
    const { orderActionCreator } = this.props;
    const { pagination, dataSearch } = this.state;
    const { searchOrder } = orderActionCreator;
    pagination.page = page;
    this.setState({ pagination })
    let params = JSON.parse(JSON.stringify(dataSearch))
    params = {
      ...params,
      skip: (pagination.page - 1) * pagination.rowPerPage,
      limit: pagination.rowPerPage
    }
    this.setState({ dataSearch: params })
    searchOrder(params);
  }
  handleChangeRowsPerPage = (rowPerPage, total) => {
    const { orderActionCreator } = this.props;
    const { pagination, dataSearch } = this.state;
    const { searchOrder } = orderActionCreator;
    pagination.rowPerPage = rowPerPage;
    pagination.page = 1;
    this.setState({ pagination })
    let params = JSON.parse(JSON.stringify(dataSearch))
    params = {
      ...params,
      skip: (pagination.page - 1) * pagination.rowPerPage,
      limit: pagination.rowPerPage
    }
    this.setState({ dataSearch: params })
    searchOrder(params);
  }

  render() {
    const { orders, customers, ordersTotal, classes } = this.props;
    const { columnsGrid, pagination, dataSearch } = this.state;
    return (
      <Fragment>
        <div className={classes.content}>
          <div className="box-search">
            <div className="lb-search">Search</div>
            <div className="field-search">
              <TextField
                fullWidth
                id="search_WO"
                name="wo"
                label="Work Order"
                variant="filled"
                onInput={this.handleSearch}
              />
            </div>
            <div className="field-search">
              <TextField
                fullWidth
                id="search_pct"
                name="pct"
                label="PCT"
                variant="filled"
                onInput={this.handleSearch}
              />
            </div>
            <div className="field-search">
              <FormControl fullWidth className="multiple-select">
                <InputLabel className="lb-user" id="lb-user">Tạo bởi</InputLabel>
                <Select
                  labelId="lb-user"
                  id="user-id"
                  className="sl-user"
                  multiple
                  value={dataSearch.userId}
                  onChange={this.handleSearch}
                  inputProps={{
                    name: 'userId',
                    id: 'userId',
                  }}
                  input={<Input />}
                >
                  {customers && customers.map((c) => (
                    <MenuItem key={c._id} value={c._id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="field-search">
              <TextField
                fullWidth
                id="search_content"
                name="content"
                label="Nội dung công tác"
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
                  <option value="ALL">Tất cả</option>
                  <option value="START">START</option>
                  <option value="READY">READY</option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETE">COMPLETE</option>
                  <option value="CLOSE">CLOSE</option>
                </Select>
              </FormControl>
            </div>
          </div>
          <Grid className={classes.dataTable}>
            <DataTable
              noHeader={true}
              keyField={'_id'}
              columns={columnsGrid}
              data={this.genData(orders)}
              striped={true}
              pagination
              paginationServer
              paginationDefaultPage={pagination.page}
              paginationPerPage={pagination.rowPerPage}
              paginationRowsPerPageOptions={pagination.rowPerPageOption}
              paginationTotalRows={ordersTotal}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Grid>
          {this.renderRedirect()}
        </div>
      </Fragment>
    );
  }
  genData = (orders) => {
    let { user } = this.props;
    if (!user) return [];
    return orders.filter(order => order.userId)
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    customers: state.customers.customers,
    orders: state.orders.orders,
    ordersTotal: state.orders.total,
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    customerActionCreator: bindActionCreators(customerActions, dispatch),
    orderActionCreator: bindActionCreators(orderActions, dispatch),
    modalActionsCreator: bindActionCreators(modalActions, dispatch)
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withStyles(styles),
  withConnect,
)(Orders);
import React, { Component, Fragment, } from 'react';

import { connect } from 'react-redux';
import * as customerActions from '../../actions/customerActions';
import * as modalActions from '../../actions/modal';
import { bindActionCreators, compose } from 'redux';
import CustomerForm from '../CustomerForm';
import { withStyles, Fab, Grid, TextField, FormControl, InputLabel, Select } from '@material-ui/core';
import { DeleteForever, Edit } from '@material-ui/icons';
import DataTable from 'react-data-table-component';
import styles from './style';
import { popupConfirm } from '../../actions/ui';

class Customers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      rowPerPage: 20,
      dataSearch: {
        email: '',
        name: '',
        phone: '',
        department: '',
        group: '',
        permit: ''
      },
      columnsGrid: [
        {
          name: '#', width: '80px',
          cell: (params, index) => {
            return index + 1
          }
        },
        { selector: 'email', name: 'Email', minWidth: '200px', sortable: true },
        { selector: 'name', name: 'Tên người dùng', minWidth: '200px', sortable: true },
        {
          selector: 'phone', name: 'Số điện thoại', width: '150px', sortable: true,
          cell: (params) => params.phone ? '(+84) ' + params.phone : ''
        },
        { selector: 'department', name: 'Phân Xưởng', minWidth: '200px', sortable: true },
        { selector: 'group', name: 'Tổ', minWidth: '200px', sortable: true },
        {
          name: 'Hành động', width: '120px',
          cell: (params) => {
            let data = JSON.parse(JSON.stringify(params))
            return <>
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
              {/* <Fab
                color="default"
                aria-label="Delete"
                size='small'
                onClick={() => {
                  this.onClickDelete(data)
                }}
              >
                <DeleteForever color="error" fontSize="small" />
              </Fab> */}
            </>
          }
        }
      ]
    }
  }
  componentDidMount() {
    const { customerActionCreator } = this.props;
    const { listAllCustomers } = customerActionCreator;
    listAllCustomers();
  }
  onClickWorkOrder = (customer) => {
    const { customerActionCreator } = this.props;
    const { deleteCustomer } = customerActionCreator;
    deleteCustomer(customer);
  }
  onClickDelete = (customer) => {
    let self = this
    popupConfirm({
      title: 'Delete',
      html: "Bạn muốn xóa người dùng này?",
      ifOk: () => {
        const { customerActionCreator } = self.props;
        const { deleteCustomer } = customerActionCreator;
        deleteCustomer(customer);
      }
    })
  }
  onClickEdit = (customer) => {
    const { customerActionCreator, modalActionsCreator } = this.props;
    const { setCustomerEditing } = customerActionCreator;
    setCustomerEditing(customer);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionsCreator;
    showModal();
    changeModalTitle('Sửa thông tin người dùng');
    changeModalContent(<CustomerForm />);
  }
  handleChangePage = (page, total) => {
    // this.setState({ page });
  }
  handleChangeRowsPerPage = (perPage, total) => {
    // this.setState({ page });
  }

  handleSearch = (event) => {
    const { dataSearch } = this.state;
    let search = {
      ...dataSearch,
      [event.target.name]: event.target.value
    }
    this.setState({ dataSearch: search });
  }

  render() {
    const { customers, classes, user } = this.props;
    const { columnsGrid, rowPerPage, dataSearch } = this.state;
    return (
      <Fragment>
        <div className={classes.content}>
          {
            user && user.admin
              ?
              <>
                <div className="box-search">
                  <div className="lb-search">Search</div>
                  <div className="field-search">
                    <TextField
                      fullWidth
                      id="search_email"
                      name="email"
                      label="Email"
                      variant="filled"
                      onInput={this.handleSearch}
                    />
                  </div>
                  <div className="field-search">
                    <TextField
                      fullWidth
                      id="search_name"
                      name="name"
                      label="Tên người dùng"
                      variant="filled"
                      onInput={this.handleSearch}
                    />
                  </div>
                  <div className="field-search">
                    <TextField
                      fullWidth
                      id="search_phone"
                      name="phone"
                      label="Số điện thoại"
                      variant="filled"
                      onInput={this.handleSearch}
                    />
                  </div>
                  <div className="field-search">
                    <TextField
                      fullWidth
                      id="search_department"
                      name="department"
                      label="Phân xưởng"
                      variant="filled"
                      onInput={this.handleSearch}
                    />
                  </div>
                  <div className="field-search">
                    <TextField
                      fullWidth
                      id="search_group"
                      name="group"
                      label="Tổ"
                      variant="filled"
                      onInput={this.handleSearch}
                    />
                  </div>
                  <div className="field-search">
                    <FormControl fullWidth variant="filled">
                      <InputLabel htmlFor="permit">PHÂN QUYỀN</InputLabel>
                      <Select
                        fullWidth
                        native
                        value={dataSearch.permit}
                        onChange={this.handleSearch}
                        inputProps={{
                          name: 'permit',
                          id: 'permit',
                        }}
                      >
                        <option value={false}>USER</option>
                        <option value={true}>ADMIN</option>
                      </Select>
                    </FormControl>
                  </div>
                </div>
                <Grid className={classes.dataTable}>
                  <DataTable
                    noHeader={true}
                    keyField={'_id'}
                    columns={columnsGrid}
                    data={this.generateCustomers(customers.filter(c => (user ? c._id !== user._id : c._id)))}
                    striped={true}
                    pagination
                    paginationPerPage={rowPerPage}
                    paginationRowsPerPageOptions={[10, 20, 50]}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </Grid>
              </>
              :
              <>
              </>
          }
        </div>
      </Fragment>
    );
  }
  generateCustomers = (customers) => {
    const { dataSearch } = this.state;
    let _customers = []
    if (customers && customers.length > 0) {
      _customers = JSON.parse(JSON.stringify(customers.filter(t =>
        t.email.toLowerCase().indexOf(dataSearch.email.toLowerCase()) > -1 &&
        t.name.toLowerCase().indexOf(dataSearch.name.toLowerCase()) > -1 &&
        (t.phone + '').toLowerCase().indexOf((dataSearch.phone + '').toLowerCase()) > -1 &&
        t.department.toLowerCase().indexOf(dataSearch.department.toLowerCase()) > -1 &&
        t.group.toLowerCase().indexOf(dataSearch.group.toLowerCase()) > -1 &&
        String(t.admin).indexOf(dataSearch.permit) > -1
      )));
    }
    return _customers;
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    customers: state.customers.customers,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    customerActionCreator: bindActionCreators(customerActions, dispatch),
    modalActionsCreator: bindActionCreators(modalActions, dispatch)
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withStyles(styles),
  withConnect,
)(Customers);
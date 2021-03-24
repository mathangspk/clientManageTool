import React, { Component } from 'react';
import { withStyles, Grid, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modal';
import { reduxForm } from 'redux-form';
import validate from './validate';
import styles from './style';
import { DateRange } from 'react-date-range';
import { getWithToken } from '../../commons/utils/apiCaller';
import { getToken } from '../../apis/auth';
import XLSX from 'xlsx';
import moment from 'moment';
import _ from 'lodash';
import { vi } from 'date-fns/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

class ExportToolForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      range: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    }
  }

  handleSubmitForm = async (data) => {
    const { user, modalActionsCreator } = this.props;
    if (user && user.admin) {
      let { range: { startDate, endDate } } = this.state;
      startDate = moment(startDate)._d.toJSON();
      endDate = moment(endDate)._d.toJSON();
      let params = { startDate, endDate }
      let token = await getToken();
      getWithToken('api/orders/collect-tools', token, { params }).then(res => {
        console.log(res);
        if (res.data.Status.StatusCode === 200) {
          let data = JSON.parse(JSON.stringify(res.data.Data.Row.filter(order => order.status === 'COMPLETE' || order.status === 'CLOSE')))
          let lstTool = _.flattenDeep(data.map(row => row.toolId));
          // let lstTypeTool = _.uniq(lstTool.map(tool => tool.type));
          let lstTypeTool = _.uniq(lstTool.map(tool => tool.name));
          let dataTable = [
            ['REPORT TOOL','',''],
            ['','',''],
            ['From', moment(startDate).format('DD/MM/YYYY'), ''],
            ['To', moment(endDate).format('DD/MM/YYYY'), ''],
            ['','',''],
            ['STT', 'Tên công cụ dụng cụ', 'Số lần mượn']
          ]
          for (let i = 0; i < lstTypeTool.length; i++) {
            let tmp = [
              i + 1,
              lstTypeTool[i],
              // lstTool.filter(tool => tool.type === lstTypeTool[i]).length
              lstTool.filter(tool => tool.name === lstTypeTool[i]).length
            ]
            dataTable.push(tmp)
          }
          console.log(dataTable);
          const wb = XLSX.utils.book_new();
          const wsAll = XLSX.utils.aoa_to_sheet(dataTable);
          let cols = []
          for (let i = 0; i < dataTable[0].length; i++) {
            cols.push({ wch: 15 });
          }
          wsAll['!cols'] = cols
          XLSX.utils.book_append_sheet(wb, wsAll, 'Report Tool');
          let name = `ReportTool_${moment().format('YYYYMMDDHHmmss')}.xlsx`;
          XLSX.writeFile(wb, name);
          modalActionsCreator.hideModal();
        }
      }).catch(err => { return err.response });
    }
  };
  setDateRange = (range) => {
    this.setState({ range: range[0] });
  }
  setOpen = () => {
  }
  render() {
    const {
      classes,
      modalActionsCreator,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;
    let { range } = this.state;
    const { hideModal } = modalActionsCreator;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <DateRange
              className={classes.dateRange}
              locale={vi}
              editableDateInputs={true}
              onChange={item => this.setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={[range]}
            />
          </Grid>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
            style={{ marginTop: "10px" }}
          >
            <Button onClick={hideModal}>Hủy</Button>
            <Button disabled={invalid || submitting} type="submit">
              Xuất
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    modalActionsCreator: bindActionCreators(modalActions, dispatch),
  };
};
const withConnect = connect(mapStateToProps, mapDispatchToProps);
const FORM_NAME = 'EXPORT_TOOL_TYPE_MANAGEMENT';
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});
export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm,
)(ExportToolForm);

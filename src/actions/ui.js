import * as uiTypes from '../constants/ui';
import Swal from 'sweetalert2';

export const showLoading = () => ({ type: uiTypes.SHOW_LOADING });
export const hideLoading = () => ({ type: uiTypes.HIDE_LOADING });
export const showSidebar = () => ({ type: uiTypes.SHOW_SIDEBAR });
export const hideSidebar = () => ({ type: uiTypes.HIDE_SIDEBAR });

export const popupConfirm = ({title = '', html = '', ifOk = () => {}, ifCancel = () => {}}) => {
    let fnOK = ifOk;
    let fnCancel = ifCancel;
    Swal.fire({
        title,
        html,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
    }).then((result) => {
        result.isConfirmed ? fnOK() : fnCancel();
    })
};
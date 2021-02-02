import AdminHomePage from '../containers/AdminHomePage';
import Taskboard from '../containers/Taskboard';
import LoginPage from '../containers/LoginPage';
import SignupPage from '../containers/SignupPage';
import PageNotFound from '../containers/PageNotFound';
import Orders from '../containers/Orders';
import OrderDetail from '../containers/OrderDetail';
import Tools from '../containers/Tools';
import Customers from '../containers/Customers';
import OrderForm from '../containers/OrderForm';
import ToolForm from '../containers/ToolForm';
import CustomerForm from '../containers/CustomerForm';
import BallotIcon from '@material-ui/icons/Ballot';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PagesIcon from '@material-ui/icons/Pages';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FaceIcon from '@material-ui/icons/Face';
//export const API_ENDPOINT = 'https://api.yensaochampa.icu';
//export const API_ENDPOINT = 'http://localhost:4000';
export const API_ENDPOINT = 'http://128.199.82.173:4000';

export const STATUSES = [
  {
    value: 0,
    label: 'READY',
  },
  {
    value: 1,
    label: 'IN PROGRESS',
  },
  {
    value: 2,
    label: 'COMPLETE',
  },
];

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATED: 202,
};

export const ADMIN_ROUTES = [
  // {
  //   path: '/admin/task-board',
  //   name: 'Quản lý công việc',
  //   exact: true,
  //   component: Taskboard,
  //   form: null,
  //   onlyAdmin: true,
  //   iconSidebar : BallotIcon,
  // },
  {
    path: '/admin',
    name: 'Trang quản trị',
    exact: true,
    component: AdminHomePage,
    form: null,
    onlyAdmin: false,
    iconSidebar : SupervisorAccountIcon,
    isHide: true
  },
  {
    path: '/',
    name: 'Trang chủ',
    exact: true,
    component: AdminHomePage,
    form: null,
    onlyAdmin: false,
    iconSidebar : PagesIcon,
    isHide: true
  },
  {
    path: '/admin/order',
    params: [":orderId?"],
    name: 'Quản lý Work Order',
    exact: false,
    component: Orders,
    form: OrderForm,
    onlyAdmin: false,
    labelButtonAdd: 'WORK ORDER',
    iconSidebar : ChromeReaderModeIcon,
    isExport: true
  },
  {
    path: '/admin/order-detail',
    params: [":orderId"],
    name: 'Chi tiết Work Order',
    exact: false,
    component: OrderDetail,
    form: OrderForm,
    onlyAdmin: false,
    iconSidebar : ChromeReaderModeIcon,
    isHide: true
  },
  {
    path: '/admin/tool',
    params: [":orderId?"],
    name: 'Quản lý dụng cụ',
    exact: false,
    component: Tools,
    form: ToolForm,
    onlyAdmin: false,
    labelButtonAdd: 'CÔNG CỤ',
    iconSidebar : DateRangeIcon,
    isExport: true
  },
  {
    path: '/admin/customer',
    name: 'Quản lý người dùng',
    exact: false,
    component: Customers,
    form: CustomerForm,
    onlyAdmin: true,
    labelButtonAdd: 'NGƯỜI DÙNG',
    iconSidebar : FaceIcon,
  },
];

export const ROUTES = [
  {
    name: 'Dang nhap',
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    name: 'Dang ky',
    path: '/signup',
    exact: true,
    component: SignupPage,
  },
  {
    name: 'Page Not Found',
    path: '',
    exact: false,
    component: PageNotFound,
  }
]

export const limitSizeImage = 10000000;
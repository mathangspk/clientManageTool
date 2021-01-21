import { green } from '@material-ui/core/colors';
import {
  minWidthCellAction,
  fontSizeForDownSm,
  fontSizeForUpLg,
  fontSizeForUpMd,

} from '../../../constants/style';
const styles = (theme) => ({
  tableCell: {
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.secondary.main,
    },
    [theme.breakpoints.up('md')]: {
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('lg')]: {
      backgroundColor: green[500],
    },
  },
  cell: {
    [theme.breakpoints.down('sm')]: {
      fontSize: fontSizeForDownSm,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: fontSizeForUpMd,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: fontSizeForUpLg,
    },
  },
  cellDescription: {
    [theme.breakpoints.down('sm')]: {
      fontSize: fontSizeForDownSm,
      display:'none',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: fontSizeForUpMd,
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: fontSizeForUpLg,
      
    },
  },
  cellAction: {
    minWidth: minWidthCellAction,
    [theme.breakpoints.down('sm')]: {
      fontSize: 10,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '5pt',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: 10,
    },
  }
});

export default styles;

import {
    minWidthCellAction,
    fontSizeForDownSm,
    fontSizeForUpLg,
    fontSizeForUpMd
} from '../../../constants/style';
const styles = (theme) => ({
    container: {
        maxHeight: '300px',
    },
    table: {
        minWidth: "300px",
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

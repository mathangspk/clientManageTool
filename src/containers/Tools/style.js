const style = (theme) => ({
  content: {
    marginTop: '65px',
    maxHeight: '60vh',
    '& .box-search': {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginBottom: '10px',
      '& .lb-search': {
        width: '100px',
        fontSize: '1rem',
      },
      '& .field-search': {
        width: 'calc((100% - 100px) / 3)',
        maxWidth: '300px',
        paddingRight: '15px'
      }
    }
  },
  background: {
    backgroundColor: theme.palette.primary.main,
    padding: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    textAlign: 'center',
    flex: '1 0 auto',
  },
  alert: {
    display: 'flex',
    margin: '10px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login: {
    maxWidth: '600px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  test: {
    minHeight: '40vh'
  },
  showImageProduct: {
    width: '50vw',
    height: '50vh',

  },
  showImageProduct1: {
    height: '100%',
  },
  boxImage: {
    display: 'block',
    marginTop: '20px',
    height: '100vw*0.5',
    width: '100%',
    maxWidth: '600px',
    
  },

  largeImage: {
    display: 'flex',
    direction: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '60%',
    width: '100%',
  },
  imgLarge: {
    //width: '100%',
    height: '30vh',
  },
  smallImage: {
    display: 'flex',
    //direction: 'row',
    //justifyContent:"center",
    height: '40%',
    width: '100%',
    padding: '10px',
    overflowY: 'scroll',
  },

  itemSmallImage: {
    //display: 'inline',
    //width: '100px',
    height: '15vh',
    //minWidth: '30%',
    //height: '50%'
  },
  imgSmall:{
    height:'100%',
  },
  showDetail: {
    width: '50vw',
    //position:'fixed',
    top: 50,
    right: 0,
    bottom: 'auto',
    minHeight: '50vh',
  },

  showTable: {
    width: '100%'
  },
  
  widthIcon: {
    width: '50px'
  },
  
  widthInput: {
    width: 'calc(100% - 50px)'
  },

  width100per: {
    width: '100%'
  },
  dataTable: {
    width: '100%',
    transition: 'width 1s ease-in-out',
    border: '1px solid rgba(0,0,0,.12)',
    '&.change-width': {
      width: '50%',
    },
    '& .rdt_Table': {
      '& .rdt_TableHead': {
        width: '100%',
        borderTop: '1px solid rgba(0,0,0,.12)',
        '& .rdt_TableCol': {
          borderLeft: '1px solid rgba(0,0,0,.12)',
          '&:last-child': {
            borderRight: '1px solid rgba(0,0,0,.12)'
          }
        }
      },
      '& .rdt_TableBody': {
        borderTop: '1px solid rgba(0,0,0,.12)',
        height: 'calc(100vh - 270px)',
        overflowY: 'overlay !important',
        '& .rdt_TableCell': {
          borderLeft: '1px solid rgba(0,0,0,.12)',
          '&:last-child': {
            borderRight: '1px solid rgba(0,0,0,.12)'
          }
        },
        '& .rdt_TableRow:last-child': {
          borderBottom: '1px solid rgba(0,0,0,.12)'
        }
      }
    },
    '& .lb-status': {
      width: '90px',
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      padding: '5px',
      borderRadius: '4px',
      '&.color-ready': {
        backgroundColor: '#3949ab'
      },
      '&.color-in-use': {
        backgroundColor: '#28a745'
      },
      '&.color-bad': {
        backgroundColor: '#dc3545'
      },
      '&.color-lost': {
        backgroundColor: '#343a40'
      }
    }
  },
  colorSuccess: {
    color: '#28a745'
  },
  boxGridTable: {
    display: 'flex',
    '& .data-select': {
      width: '50%',
      fontSize: '1rem',
      transition: 'width 1s ease-in-out',
      border: '1px solid rgba(0,0,0,.12)',
      padding: '15px',
      background: '#fff',
      '&.hide': {
        display: 'none',
        width: '0%'
      },
      '& .image-gallery': {
        height: 'calc(100vh - 260px)',
        '& .image-gallery-image': {
          height: 'calc(100vh - 460px)'
        }
      }
    }
  }
});
export default style;

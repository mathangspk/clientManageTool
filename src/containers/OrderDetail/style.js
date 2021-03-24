const style = (theme) => ({
  containerPanel: {
    marginTop: '65px',
    '& .hide' : {
      display: 'none !important'
    },
    '& .box-panel': {
      display: 'flex',
      '& .block': {
        padding: '15px',
        background: '#fff',
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        height: '100%',
        fontSize: '1rem',
        '& .info-wo': {
          display: 'flex',
          flexWrap: 'wrap',
          margin: '0 -15px',
          '& .col-wo-50': {
            width: '50%',
            padding: '0 15px'
          },
          '& .col-wo-100': {
            width: '100%',
            padding: '0 15px'
          }
        },
        '& .image-gallery': {
          '& .image-gallery-image': {
            height: 'calc(100vh - 280px)'
          }
        }
      },
      '& .customer-field': {
        fontSize: '1rem',
        marginTop: '10px'
      },
      '& .header-action': {
        display: 'flex',
        justifyContent: 'space-between'
      },
      '& .left-panel': {
        width: '50%',
        marginLeft: '25%',
        transition: 'all 1s ease-in-out',
        '& .field': {
          margin: '10px 0'
        }
      },
      '& .right-panel': {
        width: '50%',
        display: 'none',
      },
      '&.show-right-panel': {
        '& .left-panel': {
          marginLeft: '0',
          paddingRight: '10px'
        },
        '& .right-panel': {
          display: 'block',
          paddingLeft: '10px'
        }
      }
    }
  },
  dataTable: {
    '& .rdt_Table': {
      '& .rdt_TableHead': {
        borderTop: '1px solid rgba(0,0,0,.12)',
        '& .rdt_TableCol': {
          borderLeft: '1px solid rgba(0,0,0,.12)',
          '&:last-child': {
            borderRight: '1px solid rgba(0,0,0,.12)'
          }
        }
      },
      '& .rdt_TableBody': {
        height: 'calc(100vh - 590px)',
        borderTop: '1px solid rgba(0,0,0,.12)',
        overflowY: 'overlay !important',
        minHeight: '200px',
        '& .rdt_TableCell': {
          borderLeft: '1px solid rgba(0,0,0,.12)',
          '&:last-child': {
            borderRight: '1px solid rgba(0,0,0,.12)'
          }
        },
        '& .rdt_TableRow:last-child': {
          borderBottom: '1px solid rgba(0,0,0,.12)'
        }
      },
    
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
    },
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  },
  boxActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '10px 0'
  },
  maskLoading: {
    position: 'fixed',
    width: '100%',
    height: 'calc(100% - 64px)',
    top: '0',
    left: '0',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1
  }
});
export default style;
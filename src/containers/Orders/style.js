const style = (theme) => ({
  content: {
    marginTop: '65px',
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
        width: 'calc((100% - 100px) / 5)',
        maxWidth: '300px',
        paddingRight: '15px',
        '& .multiple-select': {
          backgroundColor: '#e7e7e7',
          '& .lb-user': {
            top: '-5px',
            paddingLeft: '12px',
            '&.Mui-focused, &.MuiFormLabel-filled': {
              top: '10px'
            }
          },
          '& .lb-user + .sl-user': {
            marginTop: '24px'
          },
          '& .sl-user .MuiSelect-selectMenu': {
            paddingLeft: '12px'
          },
          '& .sl-user.Mui-focused .MuiSelect-selectMenu': {
            backgroundColor: '#e7e7e7',
            paddingLeft: '12px'
          }
        }
      }
    }
  },
  dataTable: {
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
        height: 'calc(100vh - 255px)',
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
      width: '100px',
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      padding: '5px',
      borderRadius: '4px',
      '&.color-start': {
        backgroundColor: '#6c757d'
      },
      '&.color-ready': {
        backgroundColor: '#3949ab'
      },
      '&.color-in-progress': {
        backgroundColor: '#ffc107'
      },
      '&.color-complete': {
        backgroundColor: '#28a745'
      }
    }
  },
});
export default style;
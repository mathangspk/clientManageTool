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
  }
});
export default style;
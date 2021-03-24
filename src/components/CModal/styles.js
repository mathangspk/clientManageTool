const styles = (theme) => ({
    modal: {     
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      position: "absolute",
      zIndex: -2,
      '&.export-tool-type .MuiDialog-paperWidthSm': {
        maxWidth: "750px"
      }
    },
    TextField: {
      width: '100%',
    },
    header: {
      backgroundColor: theme.color.primary,
      color: theme.color.textColor,
      padding: theme.spacing(2),
    },
    title: {
      color: theme.color.textColor,
      fontWeight: 700,
      textTransform: 'capitalize',
      fontFamily: 'Roboto'
    },
    content: {
      padding: theme.spacing(2),
    },
  });
  
  export default styles;
  
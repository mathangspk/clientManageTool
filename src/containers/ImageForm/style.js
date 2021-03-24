const styles = (theme) => ({
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
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
  select: {
    width: "100%",
  },
  picture: {
    maxWidth:"100%",
    maxHeight: 300,
  },
  paper: {
    textAlign: "center",
  }
});

export default styles;

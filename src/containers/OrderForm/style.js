const styles = (theme) => ({
  modal: {
    //top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //position: 'absolute',
    position: 'fixed',
    width: 500,
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
  heading: {
    witdth: '100%',
  },
  textField: {
    width: "100%",
  },
  TextFieldCustomer: {
    width: "100%",
    margin: "16px 0 8px"
  },
  alert: {
    display: 'flex',
    margin: '10px',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
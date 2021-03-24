const style = (theme) => ({
 background:{
   backgroundColor: theme.palette.primary.main,
   padding:40,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent:'center',
   minHeight: '100vh',
   textAlign: 'center',
   flex: '1 0 auto',
 },
 alert: {
  display: 'flex',
   margin: '10px',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent:'center',
 },
 login : {
   maxWidth: '600px',
 }
});
export default style;

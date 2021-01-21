const styles = (theme) => ({
    drawerPaper: {
      width: 240,
      maxWidth:240, 
      zIndex: 10,
      height: '100vh',
      position: "relative",
    },
    menuLink: {
      textDecoration: 'none',
      color: theme.color.menuLink,
    },
    menuLinkActive: {
      "&>div": {
        backgroundColor: theme.color.defaultTextColor,
        color: '#fff',
        '& .MuiListItemIcon-root': {
          color: '#fff',
        }
      }
    },
   
  });
  
  export default styles;
  
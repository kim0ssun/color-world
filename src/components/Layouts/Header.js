import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Fab} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'white',
    textDecoration: 'none'
  },
}));

export default props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
 

  useEffect(() => {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null)
      }
    });
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu" className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Link to={"/"} className={classes.title}>Home</Link>
          <Typography variant="h6" className={classes.title}>
            작  품
          </Typography>
          {currentUser && <Typography>{`${currentUser.id} 님 안녕하세요.`}</Typography>}
          <Fab color="secondary" variant="extended" size="small">견적문의</Fab>
        </Toolbar>
      </AppBar>
    </div>
  );

}
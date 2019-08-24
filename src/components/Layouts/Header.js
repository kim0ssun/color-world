import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Fab, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import ContactMailIcon from '@material-ui/icons/ContactMail';

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
  fab : {
    position: 'fixed',
    right: 10,
    bottom: 20
  }
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
          
          <Typography variant="h6" className={classes.title}>
            Color World
          </Typography>
          
          {currentUser 
            ? <Typography>{`${currentUser.id} 님 안녕하세요.`}</Typography>
            : <Button color="inherit">Login</Button>
          }
          <Fab color="secondary" variant="round" size="medium" className={classes.fab}><ContactMailIcon /></Fab>
        </Toolbar>
      </AppBar>
    </div>
  );

}
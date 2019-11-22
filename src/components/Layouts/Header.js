import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, Fab, Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router';
import firebase from '../Firebase';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import List from '@material-ui/core/List';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { logicalExpression } from '@babel/types';

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
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      
    }
  },
  fab : {
    position: 'fixed',
    right: 10,
    bottom: 20
  },
  home: {
    
  }
}));

export default props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  let history = useHistory();
 

  useEffect(() => {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null)
      }
    });
  }, []);

  const handleClick = (e) => {
    history.push("/contact")
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" onClick={ () => setOpen(true)} color="inherit" aria-label="menu" className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" className={classes.title} onClick={ () => history.push('/') } >
            Color World
          </Typography>
          <Fab 
            color="secondary" 
            variant="round" 
            size="medium" 
            className={classes.fab}
            onClick={handleClick}
            >
              <ContactMailIcon />
          </Fab>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <Box onClick={() => setOpen(false)} style={{width: 180}} >
          <Box p={0} m={1} style={{
            backgroundImage: `url("images/logo.jpg")`,
            backgroundSize: '150px 100px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundOrigin: 'content-box',
            height: 100,
          }} >
          </Box>
          <Divider />
          <List>
            {['Home', 'About', 'Gallery', '견적문의'].map((item, index) => {
              
              return (
                <ListItem button key={index} style={{textAlign: 'center',}}>
                  <ListItemText>{item}</ListItemText>
                </ListItem>
              )
            })}
          </List>
          <Divider />
        </Box>
      </SwipeableDrawer>
    </div>
  );

}
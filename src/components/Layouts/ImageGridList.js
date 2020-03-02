import React, { useState, useRef } from 'react';
import ReactTestUtils from "react-dom/test-utils";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import GridListTile from '@material-ui/core/GridListTile';
import { Dialog, DialogContent, DialogActions } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100vw',
  },
  slide: {
    padding: 0,
    width: '100vw',
    height: '50vh',
    overflow: 'hidden',
  },
  arrow: {
    textShadow: '6px 6px 2px #000',
    fontSize: 40,
    color: 'white',
    '&:hover': {
      color: 'blue',
    }
  }
}));

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

export default function ImageGridList({ galleryData }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState(0);
  const [dialogsmall, setDialogsmall] = useState('');
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const dialogRef = useRef(null);

  const handleDialog = (id, small) => {
    setDialogId(id);
    setDialogsmall(small);
    setOpen(true);
  }

  const handleOnclose = () => {
    setOpen(false);
  }

  const slideRenderer = ({ key, index }) => {
    if (index < 0) index = galleryData.length + index;
    if (index > galleryData.length - 1) index = index - galleryData.length;
    console.log('galleryData id:  ', galleryData[index].id);
    console.log(' initial index: ' + index);
    console.log('mode(index, 200) => ' + mod(index, 200));
    console.log('length: ' + galleryData.length)

    return (
      <div style={{
        minHeight: `${matches ? "60vh" : "40vh"}`,
        minWidth: `${matches ? "35vw" : "70vw"}`,
        backgroundImage: `url("${galleryData[index % galleryData.length].small}")`,
        backgroundSize: '100%',
        backgroundPosition: "center",
        backgroundRepeat: 'no-repeat',
        marginLeft: 'auto',
        marginRight: 'auto',

      }} key={key}
      >
      </div>
    )
  }

  const handleChangeIndex = (index) => {
    setDialogId(index);
  }

  return (
    <div className={classes.root} >
      <GridList cellHeight={matches ? 200 : 100} className={classes.gridList} cols={matches ? 5 : 4}>
        {galleryData.map(({ id, thumb, small }) => (
          <GridListTile key={id} cols={1} >
            <img src={thumb} alt={''} onClick={() => handleDialog(id, small)} />
          </GridListTile>
        ))}
      </GridList>
      <Dialog
        ref={dialogRef}
        open={open}
        fullScreen={false}
        onClose={handleOnclose}
      >
        <DialogContent >
          <VirtualizeSwipeableViews
            index={dialogId}
            onChangeIndex={handleChangeIndex}
            slideRenderer={slideRenderer}
          >
          </VirtualizeSwipeableViews>
        </DialogContent>
        <DialogActions >
          <Hidden only={['xs']} >
            <ArrowBackIos className={classes.arrow}
              style={{ position: 'absolute', top: 'calc(50% - 20px)', left: 35, backgroundColor: 'transparent' }}
              onClick={() => setDialogId(dialogId - 1)}
            />
            <ArrowForwardIos
              className={classes.arrow}
              style={{ position: 'absolute', top: 'calc(50% - 20px)', right: 25, backgroundColor: 'transparent' }}
              onClick={() => setDialogId(dialogId + 1)}
            />
          </Hidden>
        </DialogActions>
      </Dialog>
    </div>
  );
}

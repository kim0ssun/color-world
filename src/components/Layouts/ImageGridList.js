import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Dialog, DialogContent } from '@material-ui/core';
import  SwipeableViews from 'react-swipeable-views';
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
  }
}));

const VirtualizeSwipeableViews = bindKeyboard(virtualize(SwipeableViews));


export default function ImageGridList({galleryData}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState(0);
  const [dialogsmall, setDialogsmall] = useState('');
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  const handleDialog = (id, small) => {
    setDialogId(id);
    setDialogsmall(small);
    setOpen(true);
  }

  const handleOnclose = () => {
    setOpen(false);
  }

  const slideRenderer = ({ index, key}) => {
    if (index < 0) index = galleryData.length + index;
    console.log( ' initial index: '+index);
    console.log( 'mode(index, 100) => ' + mod(index, 100));
    console.log('length: '+ galleryData.length)

    return (
      <div style={{
        height: `${ matches ? "60vh" : "40vh" }`,
        width: `${ matches ? "60vw" : "80vw"}`,
        backgroundImage: `url("${galleryData[index % galleryData.length].small}")`,
        backgroundSize: '100% 100%',
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
    <div className={classes.root}>
      <GridList cellHeight={matches ? 150 : 100 } className={classes.gridList} cols={ matches ? 5 : 4 }>
        {galleryData.map( ({ id, thumb, small }) => (
          <GridListTile key={id} cols={1}>
            <img src={thumb} alt={''} onClick={() => handleDialog(id, small)} />
          </GridListTile>
        ))}
      </GridList>
      <Dialog 
        open={open}
        fullScreen={false}
        onClose={handleOnclose}
      >
        <DialogContent>
          <VirtualizeSwipeableViews 
            index={dialogId}
            onChangeIndex={handleChangeIndex}
            slideRenderer={slideRenderer}
          >
          </VirtualizeSwipeableViews>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Dialog, DialogContent } from '@material-ui/core';
import  SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

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
  const [open, setOpen] = useState(false);
  const [dialogId, setDialogId] = useState(0);
  const [dialogsmall, setDialogsmall] = useState('');
  const classes = useStyles();

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
    // const data = galleryData.find((item) => {
      
    //   return item.id === index
    // });
    // console.log('data: '+data)
    return (
      <div className={classes.slide} key={key}> 
        <img src={galleryData[index % galleryData.length].small} alt="" style={{maxWidth: '100vw'}}/>
      </div>
    )
  }

  const handleChangeIndex = (index) => {
    setDialogId(index);
  }

  return (
    <div className={classes.root}>
      <GridList cellHeight={100} className={classes.gridList} cols={3}>
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

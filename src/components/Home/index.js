import React, { useState, useEffect, Fragment } from 'react'
import firebase from '../Firebase';
import ImageGallery  from 'react-image-gallery';
import { Box } from '@material-ui/core'
import "react-image-gallery/styles/css/image-gallery.css"

export default props => {
  const [data, setData] = useState([]);
  const images = [
    {
      original: 'https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=1000&h=500'
    },
    {
      original: 'https://images.unsplash.com/photo-1544572571-ab94fd872ce4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=1000&h=500'
    },
    {
      original: 'https://images.unsplash.com/reserve/bnW1TuTV2YGcoh1HyWNQ_IMG_0207.JPG?ixlib=rb-1.2.1&fit=crop&w=1000&h=500'
    },
  ]

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('works')
      .onSnapshot(snapshot => {
        setData(snapshot.docs);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{position: 'relative'}}>
      <ImageGallery showThumbnails={false} items={images} autoPlay={true} slideInterval={4000} />
    
      <Box style={{position: 'relative'}}>
        <ul style={{position: ''}}>
          {data && data.map(doc => {
            const { id, title, url, description, categories } = doc.data(); 

            return (
              <li key={id}>
                {`${title}/${description}`}
              </li>
            )
          })}
        </ul>

      </Box>
    </div>  
  );
}
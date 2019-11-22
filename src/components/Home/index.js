import React from 'react'
import ImageGallery  from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"

export default props => {
  const images = [
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fsingle%2F13.JPG?alt=media&token=97e5f20e-7f9a-46db-a81b-e55a9693e2a7'
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fsingle%2F4.JPG?alt=media&token=db286324-e5b7-4e6e-bd39-c034eb3586c3'
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fsingle%2F1.JPG?alt=media&token=2041ac23-22b6-46fe-a18c-c27a378d070f'
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fmultiple%2FIMG_1981.JPG?alt=media&token=313689c1-8ea1-4981-9143-8f26db3f864c'
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fmultiple%2FIMG_9236.JPG?alt=media&token=d5ef6a70-d8aa-4983-86fa-e6dc63b86a7b'
    }
  ]

  return (
    <div style={{position: 'relative'}}>
      <ImageGallery showThumbnails={false} items={images} autoPlay={true} slideInterval={4000} />
    </div>  
  );
}
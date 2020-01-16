import React from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import  Box from "@material-ui/core/Box"

const styles = {
  originalClass: {
    height: 300,
    width: "80%"
  },
};

export default props => {
  const images = [
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide1.JPG?alt=media&token=5bc3262b-e59f-4e8c-bc35-9e91d324b864',
      originalTitle: "media"
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide2.JPG?alt=media&token=0350b04d-913c-4ae9-bfa7-138ebaa50bc8',
      
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide3.JPG?alt=media&token=9458059e-6b4b-4c06-9c7f-9b2da79e0163',
      
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide4.JPG?alt=media&token=2ff5f99e-809f-4ad1-bcee-0023a9c09b72',
      
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide5.JPG?alt=media&token=afd89cb6-f80a-4fe3-abcb-7cef76903b32',
      
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide6.JPG?alt=media&token=d4ea3485-af8a-43ab-8118-e0a30f8ce2f1',
      
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide7.JPG?alt=media&token=ccf06871-d323-4972-bea0-71780c35ba7e',
    }

  ]

  return (
    <Box 
      mx={'auto'} 
      width={{xs: '100%'}} 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      style={{ backgroundColor: `rgba(100, 100, 100, 0.2)`, backgroundRepeat: 'no-repeat',}}
    >
      <ImageGallery showThumbnails={false} items={images} autoPlay={true} slideInterval={4000} />
    </Box>
  );
}
import React from 'react'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import Box from "@material-ui/core/Box"

const styles = {
  originalClass: {
    height: 300,
    width: "80%"
  },
};

export default props => {
  const images = [
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide_13.png?alt=media&token=c01a04fd-dd90-46a9-aec0-123ce7febdf5',
      originalTitle: "media"
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide_6.png?alt=media&token=e450b71d-0420-44e3-ae85-7cbca5df9b63',

    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide_IMG_1028.png?alt=media&token=26e86107-7b88-4dac-aec4-6990a0c55f64',

    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide_IMG_1569.png?alt=media&token=bab2c35c-9b58-453a-be91-0d65b37f6277',

    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide_IMG_2071.png?alt=media&token=ff5f9b6f-242a-4db6-9471-95033c7dfc07',

    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide_IMG_8911.png?alt=media&token=4d0c0f13-350d-4aaf-a23e-2f880818853e',

    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide_IMG_9852.png?alt=media&token=28c97815-168c-4e7a-ae1c-0eae6b85a125',
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide_MG_8320.png?alt=media&token=341fa35a-d531-4868-b6c2-548f1dcffda8',
    },
    {
      original: 'https://firebasestorage.googleapis.com/v0/b/color-world-a8c15.appspot.com/o/images%2Fslides%2Fslide_mouse01.png?alt=media&token=b3ed94fe-0d39-4d57-88e1-c4ed18adc7a4',
    }

  ]

  return (
    <Box
      mx={'auto'}
      width={{ xs: '100%' }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ backgroundColor: `rgba(100, 100, 100, 0.2)`, backgroundRepeat: 'no-repeat', }}
    >
      <ImageGallery showThumbnails={false} items={images} autoPlay={true} slideInterval={4000} />
    </Box>
  );
}
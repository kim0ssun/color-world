import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Work from './Work';
import Contact from './Contact';
import Form from './Form';
import Reply from './Reply';
import { Header, Footer, CenteredTabs } from './Layouts';
import firebase from './Firebase';

// const storageRef = firebase.storage();
const db = firebase.firestore();

function App() {
  const [galleryData, setGalleryData] = useState([]);
  const [flag, setFlag] = useState(false);

  // galleryData 형식: { id: index, thumb: url, small: url }
  useEffect(() => {

    const unsubscribe = db.collection(`products`).doc('details').get()
    .then( doc => {
      let { images } = doc.data();

      /*  업데이트시 데이터 입력
      const data = {
          images: tmpData,
          title: '상품이미지',
          total: tmpData.length,
          update: new Date().toLocaleDateString(),
      }
      db.collection('products').doc('details').set(data)
      .then(res => console.log(`products set : ${res}`))
      */
     
      const modifiedImages = images.map( (data, index) =>  {
        return {
          ...data, id: index
        }
      });

      setGalleryData(modifiedImages);
        
    }, err => { console.log(err) })

    return () => unsubscribe();
  }, []);

  return (
    <Fragment>

      <BrowserRouter>
        <Header />

        <Switch>
          <Route exact path="/" render={() => {
            setFlag(false);
            return (
              <Home />
            )
          }} />
          <Route path="/about" render={() => {
            setFlag(true);
            return (
              <About />
            )
          }} />
          <Route path="/work" render={() => {
            setFlag(false);
            return (
              <Work />
            )
          }} />
          <Route path="/contact" render={() => {
            setFlag(true);
            return (
              <Contact />
            )
          }} />
          <Route path="/form" render={() => {
            setFlag(true);
            return (
              <Form />
            )
          }} />
          <Route path="/reply/:id/:password" render={() => {
            setFlag(true);
            return (
              <Reply />
            )
          }} />
          <Route path="/" render={() => {
            setFlag(false);
            return (
              <Home />
            )
          }} />
        </Switch>
        {!flag ? <CenteredTabs galleryData={galleryData} /> : null}
        <Footer />
      </BrowserRouter>

    </Fragment>
  );
}

export default App;

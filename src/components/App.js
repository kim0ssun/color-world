import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Work from './Work';
import Contact from './Contact';
import Form from './Form';
import Reply from './Reply';
import { Header, Footer, CenteredTabs } from './Layouts';
import axios from 'axios';
import firebase from './Firebase';

const storageRef = firebase.storage().ref();

function App() {
  const [galleryData, setGalleryData] = useState([]);
  const [flag, setFlag] = useState(false);

  // galleryData 형식: { id: index, thumb: url, small: url }

  useEffect(()=> {
    // Create a reference under which you want to list
    var listRef = storageRef.child('images/showcase');

    // Find all the prefixes and items.
    listRef.listAll().then(function(res) {
      res.prefixes.forEach(function(folderRef) {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
        console.log('prefixes => ', folderRef);
      });
      res.items.forEach(function(itemRef) {
      // All the items under listRef.
      console.log('items => ', itemRef.location.path_);
      });
    }).catch(function(error) {
      // Uh-oh, an error occurred!
      console.log('storage error: ', error);
    });
    axios.get('https://api.unsplash.com/photos?client_id=1ec565e2ee2f41446d4e3b2e881136cf5337c9cfd65debc28ad8e171d7c3a5ed&&query=airpods&per_page=100')
      .then( ({ data}) => {
        const galleryData = data.reduce( (data, { urls }, index) => {
          return [...data, { ...urls, id: index } ]
        }, [] );
        console.log(galleryData)
        setGalleryData(galleryData);
      })
      .catch( err => console.log(err))
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
            setFlag(false);
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
        </Switch>
        { !flag ? <CenteredTabs galleryData={galleryData} /> : null}
        <Footer />
      </BrowserRouter>

    </Fragment>
  );
}

export default App;

import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Work from './Work';
import { Header, Footer, CenteredTabs } from './Layouts';
import axios from 'axios';

function App() {
  const [galleryData, setGalleryData] = useState([]);

  useEffect(()=> {
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
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/work" component={Work} />
        </Switch>
        <CenteredTabs galleryData={galleryData} />
        <Footer />
      </BrowserRouter>

    </Fragment>
  );
}

export default App;

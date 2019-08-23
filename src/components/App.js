import React, { Fragment } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Work from './Work';
import { Header, Footer, CenteredTabs } from './Layouts';


function App() {
  return (
    <Fragment>
      
      <BrowserRouter>
        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/work" component={Work} />
        </Switch>
        <CenteredTabs />
        <Footer />
      </BrowserRouter>

    </Fragment>
  );
}

export default App;

import React from 'react';
//router
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Header from '../elements/Header/Header';
import HomeContainer from '../../containers/HomeContainer';
import Movie from '../Movie/Movie';
import NotFound from '../elements/NotFound/NotFound';

// Functional Component
const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment> 
        <Header />
        <Switch>
          <Route path="/" component={HomeContainer} exact />
          <Route path="/:movieId" component={Movie} exact />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App;
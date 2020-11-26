import React from 'react';
import Container from '@material-ui/core/Container';
import Header from './layout/Header'
import ClienteA from './components/client-a/index'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const styles = {
  paddingTop: 0
}

const App = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="xl" style={styles}>
        <Router>
          <Switch>
            <Route exact path="/">
              <br/>  
              <ClienteA />
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  )
}

export default App;

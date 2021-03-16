import './App.scss';
import React from 'react'
import {Container} from 'react-bootstrap'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'

import ApolloProvider from './pages/ApolloProvider'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {

  

  return (

    <ApolloProvider>

    <BrowserRouter>

      <Container className="pt-5">

      <Switch>




        <Route path="/register" component={Register} />


        <Route path="/login" component={Login} />


        <Route exac path="/" component={Home} />



      </Switch>
          
      </Container>

    </BrowserRouter>
     

    </ApolloProvider>
    

  );
}

export default App;

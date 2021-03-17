import './App.scss';
import React from 'react'
import {Container} from 'react-bootstrap'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import {AuthReducerProvider} from './context/auth'
import ApolloProvider from './pages/ApolloProvider'
import DynamicRoute from './util/DynamicRoute'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {

  

  return (

    <ApolloProvider>

    <AuthReducerProvider>
    <BrowserRouter>

      <Container className="pt-5">

      <Switch>




      <DynamicRoute exact path="/" component={Home} authenticated />
      <DynamicRoute path="/register" component={Register} guest />
      <DynamicRoute path="/login" component={Login} guest />



      </Switch>
          
      </Container>

    </BrowserRouter>
    </AuthReducerProvider>
    </ApolloProvider>
    

  );
}

export default App;

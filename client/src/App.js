import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AuthRoute from "./utils/AuthRoute";

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { Container } from "semantic-ui-react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from './components/MenuBar';
import { AuthProvider } from "./context/auth";
import SinglePost from "./pages/SinglePost";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route exact path='/posts/:postId' component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
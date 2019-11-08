/* eslint-disable react/no-multi-comp */
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/Home';
import MainComponent from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/user/dashboard" component={MainComponent} />
    </BrowserRouter>
  );
}

export default App;

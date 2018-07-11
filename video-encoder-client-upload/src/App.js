import React, { Component } from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';

import { history } from "./history";
import Home from './pages/home';
import Header from './components/header';
import Videos from './pages/videos';
import ItemVideo from './pages/item-video';

import './App.css';

class App extends Component {
  render() {
    return (
        <div className={'samba-app-layout'}>
            <Header />
            <Router history={history}>
                <Switch>
                    <Route path={'/'} exact ={true} component={ Home } />
                    <Route path={'/videos'} component={ Videos } />
                    <Route path={'/videos/:id'} component={ ItemVideo } />
                </Switch>
            </Router>
        </div>
    );
  }
}

export default App;

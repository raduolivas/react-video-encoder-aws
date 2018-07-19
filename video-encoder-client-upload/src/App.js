import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { history } from "./history";
import Home from './pages/home';
import VideoPlayer from './components/player';

import './App.css';

const App =() => {
   return (
        <div className={'encoder-app-layout'}>
            <Router history={history}>
                <Switch>
                    <Route exact path={'/'} component={ Home } />
                    <Route exact path={'/video/:id'} component={ VideoPlayer } />
                </Switch>
            </Router>
        </div>
    );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import GameBoard from './components/gameBoard';
import AuthenticationView from './components/authentication';
import four_oh_four from './components/_404';

function App() {
  return (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/">
                    <AuthenticationView mode="app" />
                </Route>
                <Route path="/login">
                    <AuthenticationView mode="login" />
                </Route>
                <Route path="/signup">
                    <AuthenticationView mode="signup" />
                </Route>
                <Route path="/callback">
                    <AuthenticationView mode="callback" />
                </Route>
                <Route exact path="/auth" component={ AuthenticationView } />
                <Route exact path="/play" component={ GameBoard } />
                <Route exact component={ four_oh_four } />
            </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;

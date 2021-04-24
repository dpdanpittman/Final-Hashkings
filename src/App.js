import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

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
                    <Route exact path="/auth" component={AuthenticationView} />
                    <ShopGuardRoute exact path="/play" component={GameBoard} />
                    <Route exact component={four_oh_four} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

const ShopGuardRoute = ({ component: Component, ...props }) => (

    < Route
        {...props}
        render={routeProps => {

            const item = localStorage.getItem("username");
            // Do all your conditional tests here
            return item !== null ? (
                <Component {...routeProps} />
            ) : (
                <Redirect to="/login" />
            );

        }}
    />
);

export default App;

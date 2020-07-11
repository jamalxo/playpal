"use strict";

import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {MovieDetailView} from './views/MovieDetailView';
import {MovieFormView} from './views/MovieFormView';
import UserService from "./services/UserService";
import ProfileView from "./views/ProfileView/ProfileView";
import HomePageView from "./views/HomePageView/HomePageView";
import SignInSide from "./components/SignInSide/SignInSide";
import SignUp from "./components/UserSignUp/SignUp";
import {OfferFormView} from "./views/OfferFormView";

import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "./theme";
import {PendingRequestsView} from "./views/PendingRequestsView";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'PlayPal',
            routes: [
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<HomePageView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }} , path: '/', exact: true},
                { component: MovieDetailView , path: '/show/:id'},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<MovieFormView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }} , path: '/edit/:id'},
                { render: (props) => {
                    if(UserService.isAuthenticated()) {
                        return (<MovieFormView {... props} />)
                    }
                    else {
                        return (<Redirect to={'/login'}/>)
                    }}, path: '/add',},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<OfferFormView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }}, path: '/offer/create',},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<OfferFormView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }}, path: '/offer/:id',},
                // { component: UserLoginView, path: '/login'},
                // { component: UserSignupView, path: '/register'},
                // { component: ProfileListView, path: '/users'},
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<PendingRequestsView />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }}, path: '/requests/pending',},

                { component: SignInSide, path: '/login'},
                { component: SignUp, path: '/register'},
                { component: ProfileView, path: '/user/:id'}
                ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <MuiThemeProvider theme={theme}>
                <div>
                    <Router>
                        <Switch>
                            {this.state.routes.map((route, i) => (<Route key={i} {...route}/>))}
                        </Switch>
                    </Router>
                </div>
            </MuiThemeProvider>

        );
    }
}


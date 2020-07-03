"use strict";

import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {MovieListView} from './views/MovieListView';
import {MovieDetailView} from './views/MovieDetailView';
import {MovieFormView} from './views/MovieFormView';
import {CreateOfferView} from "./views/CreateOfferView"
import {UserLoginView} from "./views/UserLoginView/UserLoginView";
import {UserSignupView} from "./views/UserSignupView/UserSignupView";

import UserService from "./services/UserService";
import {ProfileListView} from "./views/ProfileListView/ProfileListView";
import {ProfileView} from "./views/ProfileView/ProfileView";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'PlayPal',
            routes: [
                { component: MovieListView , path: '/', exact: true},
                { component: MovieDetailView , path: '/show/:id'},
                { component: CreateOfferView, path: '/create/'},
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
                { component: UserLoginView, path: '/login'},
                { component: UserSignupView, path: '/register'},
                { component: ProfileListView, path: '/users'},
                { component: ProfileView, path: '/user/:id'},
            ]
        };
    }

    componentDidMount(){
        document.title = this.state.title;
    }

    render() {
        return(
            <div>
                <Router>
                    <Switch>
                        {this.state.routes.map((route, i) => (<Route key={i} {...route}/>) )}
                    </Switch>
                </Router>
            </div>
        );
    }
}


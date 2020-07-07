"use strict";

import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {MovieDetailView} from './views/MovieDetailView';
import {MovieFormView} from './views/MovieFormView';
// import {CreateOfferView} from "./views/CreateOfferView"

import UserService from "./services/UserService";
import {ProfileView} from "./views/ProfileView/ProfileView";
import HomePageView from "./views/HomePageView/HomePageView";
import SignInSide from "./components/SignInSide/SignInSide";
import SignUp from "./components/UserSignUp/SignUp";
import OfferForm from "./components/Offer/OfferForm";
import {OfferFormView} from "./views/OfferFormView";


export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: 'PlayPal',
            routes: [
                { component: HomePageView, path: '/', exact: true},
                { component: MovieDetailView , path: '/show/:id'},
                // { component: CreateOfferView, path: '/create/'},
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
                // { component: UserLoginView, path: '/login'},
                // { component: UserSignupView, path: '/register'},
                // { component: ProfileListView, path: '/users'},
                { component: SignInSide, path: '/login'},
                { component: SignUp, path: '/register'},
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


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
import OffersView from "./views/OffersView/OffersView";
import {ProfileListView} from "./views/ProfileListView/ProfileListView";


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
                { render: (props) => {
                        if(UserService.isAuthenticated()) {
                            return (<OffersView {... props} />)
                        }
                        else {
                            return (<Redirect to={'/login'}/>)
                        }} , path: '/offers', exact: true},
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
                        }}, path: '/offer/edit/:id',},
                { component: ProfileListView, path: '/users'},
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


"use strict";

import React from 'react';

import UserSignup from '../../components/UserSignup/UserSignup';

import UserService from '../../services/UserService';
import axios from 'axios';

export class UserSignupView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async signup(user) {
        try {
            //let ret = await UserService.register(user);
            let ret = axios.post("http://localhost:3000/auth/register", user, {}).then( res => { console.log(res.statusText)})
            this.props.history.push('/');
        } catch(err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }

    render() {
        return (
            <UserSignup onSubmit={(user) => this.signup(user)} error={this.state.error}></UserSignup>
        );
    }
}

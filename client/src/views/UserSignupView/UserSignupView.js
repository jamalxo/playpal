"use strict";

import React from 'react';

import UserSignup from '../../components/UserSignup/UserSignup';

import UserService from '../../services/UserService';


export class UserSignupView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    async signup(user) {
        try {
            console.log(user.usertype)
            console.log(user.email)
            let ret = await UserService.register(user);
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

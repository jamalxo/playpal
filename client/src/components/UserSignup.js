"use strict";

import React from 'react';
import { Card, Button, TextField } from 'react-md';
import { withRouter } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';


const style = { maxWidth: 500 };


class UserSignup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username : '',
            password : '',
            email: '',
            usertype: 'professional',
            firstname: '',
            lastname: '',
        };

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeInput(evt) {
        const value = evt.target.value;
        setState({
            [evt.target.name]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();

        let user = {state};

        this.props.onSubmit(user);
    }

    render() {
        return (
            <Page>
                <Card style={style} className="md-block-centered">
                    <form className="md-grid" onSubmit={this.handleSubmit} onReset={() => this.props.history.goBack()}>
                        <TextField
                            label="Email"
                            id="emailField"
                            type="text"
                            name="email"
                            className="md-row"
                            required={true}
                            value={this.state.email}
                            onChange={this.handleChangeInput}
                            errorText="e-mail is required"/>

                        <TextField
                            label="Username"
                            id="UsernameField"
                            name="username"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.username}
                            onChange={this.handleChangeInput}
                            errorText="Username is required"/>
                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            name="password"
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={this.handleChangeInput}
                            errorText="Password is required"/>
                        <TextField
                            label="FirstName"
                            id="FirstNameField"
                            type="text"
                            name="firstname"
                            className="md-row"
                            required={true}
                            value={this.state.firstname}
                            onChange={this.handleChangeInput}
                            errorText="First name is required"/>
                        <TextField
                            label="LastName"
                            id="LastNameField"
                            type="text"
                            name="lastname"
                            className="md-row"
                            required={true}
                            value={this.state.lastname}
                            onChange={this.handleChangeInput}
                            errorText="Last name is required"/>

                        <select value={this.state.usertype} onChange={this.handleChange} name="usertype">
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                        </select>
                        <Button id="submit" type="submit"
                                disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' || this.state.email == undefined || this.state.email == '' ? true : false}
                                raised primary className="md-cell md-cell--2">Register</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
            </Page>
        );
    }
};

export default withRouter(UserSignup);
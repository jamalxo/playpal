"use strict";

import React from 'react';
import { Card, Button, TextField } from 'react-md';
import { withRouter } from 'react-router-dom';

import { AlertMessage } from './AlertMessage';
import Page from './Page';
import {makeStyles} from "@material-ui/core/styles";


const style = {
    maxWidth: 500,
};

const useStyles = makeStyles((theme) => ({
    buttonSubmit: {
        backgroundColor: theme.palette.primary.lighter,
        color: theme.palette.primary.contrastText
    }
}));

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
            description: '',
        };

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeInput(target, value) {
        console.log(target)
        console.log(value)
        this.setState({
            [target]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();

        let user = this.state;

        this.props.onSubmit(user);
    }

    render() {
        const {classes} = this.props;

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
                            onChange={(inp) => this.handleChangeInput('email', inp)}
                            errorText="e-mail is required"/>

                        <TextField
                            label="Username"
                            id="UsernameField"
                            name="username"
                            type="text"
                            className="md-row"
                            required={true}
                            value={this.state.username}
                            onChange={(inp) => this.handleChangeInput('username', inp)}
                            errorText="Username is required"/>
                        <TextField
                            label="Password"
                            id="PasswordField"
                            type="password"
                            name="password"
                            className="md-row"
                            required={true}
                            value={this.state.password}
                            onChange={(inp) => this.handleChangeInput('password', inp)}
                            errorText="Password is required"/>
                        <TextField
                            label="FirstName"
                            id="FirstNameField"
                            type="text"
                            name="firstname"
                            className="md-row"
                            required={true}
                            value={this.state.firstname}
                            onChange={(inp) => this.handleChangeInput('firstname', inp)}
                            errorText="First name is required"/>
                        <TextField
                            label="LastName"
                            id="LastNameField"
                            type="text"
                            name="lastname"
                            className="md-row"
                            required={true}
                            value={this.state.lastname}
                            onChange={(inp) => this.handleChangeInput('lastname', inp)}
                            errorText="Last name is required"/>
                        <TextField
                            label="Description"
                            id="DescriptionField"
                            name="description"
                            type="text"
                            className="md-row"
                            required={true}
                            multiline
                            rows={4}
                            value={this.state.description}
                            onChange={(inp) => this.handleChangeInput('description', inp)}
                            errorText="Username is required"/>

                        <select value={this.state.usertype} onChange={(inp) => this.handleChangeInput('usertype', inp.target.value)} name="usertype">
                            <option value="professional">Professional</option>
                            <option value="casual">Casual</option>
                        </select>
                        dddd
                        <Button id="submit" type="submit"
                                disabled={this.state.username == undefined || this.state.username == '' || this.state.password == undefined || this.state.password == '' || this.state.email == undefined || this.state.email == '' ? true : false}
                                raised primary className={classes.buttonSubmit}>Register</Button>
                        <Button id="reset" type="reset" raised secondary className="md-cell md-cell--2">Dismiss</Button>
                        <AlertMessage className="md-row md-full-width" >{this.props.error ? `${this.props.error}` : ''}</AlertMessage>
                    </form>
                </Card>
            </Page>
        );
    }
};

export default withRouter(UserSignup);

"use strict";

import React from 'react';
import { Toolbar } from 'react-md';
import { withRouter } from 'react-router-dom'
import Primarybar from './PrimarySearchAppBar'
import AppHeader from './AppHeader'

import KebabMenu from './KebabMenu';


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Primarybar></Primarybar>
                <AppHeader></AppHeader>
            </div>
        );
    }
};

export default withRouter(Header);
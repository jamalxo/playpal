"use strict";

import React from 'react';
import { Toolbar } from 'react-md';
import { withRouter } from 'react-router-dom'
import Button from './Button'
import Primarybar from './PrimarySearchAppBar'

import KebabMenu from './KebabMenu';


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Primarybar></Primarybar>
            </div>
        );
    }
};

export default withRouter(Header);
"use strict";

import React from 'react';
import { Toolbar, Button } from 'react-md';
import { withRouter } from 'react-router-dom'
import {PrimarySearchAppBar} from './PrimarySearchAppBar'

import KebabMenu from './KebabMenu';


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>test
                <PrimarySearchAppBar></PrimarySearchAppBar>
            </div>
        );
    }
};

export default withRouter(Header);
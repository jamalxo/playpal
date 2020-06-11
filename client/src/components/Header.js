"use strict";

import React from 'react';
import { Toolbar, Button } from 'react-md';
import { withRouter } from 'react-router-dom'
//import {Button} from './Button'

import KebabMenu from './KebabMenu';


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>test</div>
        );
    }
};

export default withRouter(Header);
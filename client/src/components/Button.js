"use strict";

import React from 'react';
import Styled from 'styled-components';
import Button from '@material-ui/core/Button';


class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button variant="contained" color="primary" component="span">
            Upload
            </Button>
        );
    }
}

export const Button;
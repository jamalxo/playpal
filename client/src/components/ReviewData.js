"use strict";

import React from 'react';

import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import ProfileCard from "./ProfileCard";
import Page from "./Page";
import TextField from "@material-ui/core/TextField";
import {Button} from "react-md";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export class ReviewData extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <Card>
                <CardContent>
                    <div>
                        {this.state.review.rating}
                        {this.state.review.review}
                    </div>
                </CardContent>
            </Card>
        );
    }
}

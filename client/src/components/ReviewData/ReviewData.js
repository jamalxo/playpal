"use strict";

import React from 'react';

import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import ProfileCard from "../ProfileCard";
import Page from "../Page";
import TextField from "@material-ui/core/TextField";
import {Button} from "react-md";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styles from './ReviewData.css';

export class ReviewData extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div class="data">
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant={"h5"} style={{paddingLeft: '15px', paddingTop: '10px'}} >
                                Your Review
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Rating
                                value={this.state.review.rating}
                                size={"large"}
                                disabled
                                style={{paddingTop: '10px'}}
                            />
                        </Grid>
                        <Grid item xs={12} style={{padding: '10px'}}>
                            <TextField
                                id="outlined-basic"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                                fullWidth
                                multiline={true}
                                rows={3}
                                value={this.state.review.review}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            </div>
        );
    }
}

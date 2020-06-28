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

export class ReviewField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            review: ''
        }

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeInput(target, value) {
        this.setState({
            [target]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();

        let review = this.state;
        this.props.onSubmit(review);


        this.setState({
            rating: 0,
            review: ''
        });
    }

    render() {
        return (
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
                                value={this.state.rating}
                                size={"large"}
                                onChange={(event, newValue) => {
                                    this.setState( {rating: newValue});
                                }}
                                style={{paddingTop: '10px'}}
                            />
                        </Grid>
                        <Grid item xs={12} style={{padding: '10px'}}>
                            <TextField
                                id="outlined-basic"
                                label="Write your Review..."
                                variant="outlined"
                                fullWidth
                                multiline={true}
                                rows={3}
                                value={this.state.review}
                                onChange={(inp) => this.handleChangeInput('review', inp.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} align={"right"} style={{padding: '10px'}}>
                            <Button
                                id="submit"
                                type="submit"
                                onClick={this.handleSubmit}
                                disabled={this.state.review == undefined || this.state.review == ''}
                                raised
                                primary
                                className="md-cell md-cell--2"
                                style={{borderRadius: 25}}
                            > Submit </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

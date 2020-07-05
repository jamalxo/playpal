"use strict";

import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from '@material-ui/core/Avatar';
import "./ReviewData.css";


export class ReviewData extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let date = new Date(this.props.review.createdAt);
        return (
            <div className="card">
                <Card>
                    <Grid container wrap alignItems="center">
                        <Grid item xs={2}>
                            <CardContent>
                                <Avatar
                                    className="profilePic"
                                    alt={this.props.review.postedBy.username}
                                    title={this.props.review.postedBy.username}
                                    src={this.props.review.postedBy.profileImage}
                                > {this.props.review.postedBy.username.charAt(0)}
                                </Avatar>
                            </CardContent>
                        </Grid>
                        <Grid item xs={4}>
                            <CardContent>
                                <div>
                                    <Typography variant="h5">
                                        {this.props.review.postedBy.username}
                                    </Typography>
                                    <Typography variant="body1">
                                        {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
                                    </Typography>
                                </div>
                            </CardContent>
                        </Grid>
                        <Grid item xs={6}>
                            <CardContent align="right">
                                <Rating name="read-only" value={this.props.review.rating} readOnly size="large"/>
                            </CardContent>
                        </Grid>
                        <Grid item xs={12}>
                            <CardContent>
                                <Typography variant="body1">
                                    {this.props.review.text}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        );
    }
}

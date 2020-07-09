"use strict";

import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from '@material-ui/core/Avatar';
import "./ReviewData.css";
import {withStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = (theme) => ({
    root: {
        background: theme.palette.cardColor,
    },
    profilePicture: {
        width: 50,
        height: 50,
        backgroundColor: theme.palette.primary.light
    },
    profilePicturePosition: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        paddingLeft: 15
    }
});

class ReviewData extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        let date = new Date(this.props.review.createdAt);
        return (
            <Card className={classes.root}>
                <Grid container wrap alignItems="center">
                    <Grid item xs={2} className={classes.profilePicturePosition}>
                        <CardContent>
                            <Avatar
                                className={classes.profilePicture}
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
                    <Grid item xs={12} className={classes.text}>
                        <CardContent>
                            <Typography variant="body1">
                                {this.props.review.text}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(useStyles)(ReviewData);

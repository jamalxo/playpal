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
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import UserService from "../../services/UserService";

const useStyles = (theme) => ({
    root: {
        background: theme.palette.primary.lighter,
    },
    profilePicture: {
        width: 50,
        height: 50,
        backgroundColor: theme.palette.primary.light
    },
    profilePicturePosition: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    passedTime: {
        color: theme.palette.text.grey,
        fontSize: 15
    },
    reviewPadding: {
        paddingLeft: 15
    },
    text: {
        fontSize: 20,
        paddingTop: 10
    }
});


class ReviewData extends React.Component {

    constructor(props) {
        super(props);
    }

    displayPassedTime() {
        const {classes} = this.props;
        let date = new Date(this.props.review.createdAt);
        let now = new Date();
        let passedSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        let passedMinutes = Math.floor(passedSeconds / 60);
        let passedHours = Math.floor(passedMinutes / 60);
        let passedDays = Math.floor(passedHours / 24);
        let passedWeeks = Math.floor(passedDays / 7);
        let passedMonths = Math.floor(passedWeeks / 4);
        let passedYears = Math.floor(passedMonths / 12);
        if (passedYears > 0) {
            if (passedYears === 1) {
                return (<Typography variant="body1" className={classes.passedTime}>
                    1 year ago
                </Typography>);
            } else {
                return (<Typography variant="body1" className={classes.passedTime}>
                    {passedYears} years ago
                </Typography>);
            }
        } else if (passedMonths > 0) {
            if (passedMonths === 1) {
                return (<Typography variant="body1" className={classes.passedTime}>
                    1 month ago
                </Typography>);
            } else {
                return (<Typography variant="body1" className={classes.passedTime}>
                    {passedMonths} months ago
                </Typography>);
            }
        } else if (passedWeeks > 0) {
            if (passedWeeks === 1) {
                return (<Typography variant="body1" className={classes.passedTime}>
                    1 week ago
                </Typography>);
            } else {
                return (<Typography variant="body1" className={classes.passedTime}>
                    {passedWeeks} weeks ago
                </Typography>);
            }
        } else if (passedDays > 0) {
            if (passedDays === 1) {
                return (<Typography variant="body1" className={classes.passedTime}>
                    1 day ago
                </Typography>);
            } else {
                return (<Typography variant="body1" className={classes.passedTime}>
                    {passedDays} days ago
                </Typography>);
            }
        } else if (passedHours > 0) {
            if (passedHours === 1) {
                return (<Typography variant="body1" className={classes.passedTime}>
                    1 hour ago
                </Typography>);
            } else {
                return (<Typography variant="body1" className={classes.passedTime}>
                    {passedHours} hours ago
                </Typography>);
            }
        } else if (passedMinutes > 0) {
            if (passedMinutes === 1) {
                return (<Typography variant="body1" className={classes.passedTime}>
                    1 minute ago
                </Typography>);
            } else {
                return (<Typography variant="body1" className={classes.passedTime}>
                    {passedMinutes} minutes ago
                </Typography>);
            }
        } else {
            if (passedSeconds === 1) {
                return (<Typography variant="body1" className={classes.passedTime}>
                    1 second ago
                </Typography>);
            } else {
                return (<Typography variant="body1" className={classes.passedTime}>
                    {passedSeconds} seconds ago
                </Typography>);
            }

        }
    }

    showIcons() {
        let me = UserService.getCurrentUser();

        if (this.props.review.postedBy._id === me.id) {
            return (<Tooltip title="Delete Review">
                <IconButton aria-label="delete" onClick={() => this.props.onDelete(this.props.review)}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>);
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.root}>
                <Grid container alignItems="center">
                    <Grid item xs={9} className={[classes.profilePicturePosition, classes.reviewPadding]}>
                        <CardContent>
                            <Avatar
                                className={classes.profilePicture}
                                alt={this.props.review.postedBy.username}
                                title={this.props.review.postedBy.username}
                                src={this.props.review.postedBy.profileImage}
                            > {this.props.review.postedBy.username.charAt(0)}
                            </Avatar>
                        </CardContent>
                        <CardContent>
                            <div>
                                <Typography variant="h4" color={"inherit"}>
                                    {this.props.review.postedBy.username}
                                </Typography>
                                {this.displayPassedTime()}
                                <Typography variant="body1" color={"inherit"} className={classes.text}>
                                    {this.props.review.text}
                                </Typography>
                            </div>
                        </CardContent>
                    </Grid>
                    <Grid item xs={3}>
                        <CardContent align="right">
                            <Rating name="read-only" value={this.props.review.rating} readOnly size="large"/>
                            {this.showIcons()}
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(useStyles)(ReviewData);

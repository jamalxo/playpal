"use strict";

import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import UserService from "../../services/UserService";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    },
    submitEditReviewButton: {
        backgroundColor: theme.palette.primary.lightest,
        color: theme.palette.primary.contrastText,
        borderRadius: 25,
        marginRight: 10
    },
    cancelEditReviewButton: {
        backgroundColor: theme.palette.primary.lightest,
        color: theme.palette.primary.contrastText,
        borderRadius: 25
    },
    fullWidth: {
        width: '100%'
    }
});


class ReviewData extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: this.props.review.rating,
            text: this.props.review.text,
            editMode: false,
            errorFlag: false,
            errorText: ''
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
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
            return (
                <div>
                    <Tooltip title="Edit Review">
                        <IconButton aria-label="edit" onClick={() => this.setState({editMode: true})}>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Review">
                        <IconButton aria-label="delete" onClick={() => this.props.onDelete(this.props.review)}>
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            );
        }
    }

    showButtons(classes) {
        if (this.state.editMode) {
            return (
                <div>
                    <Button
                        variant="contained"
                        onClick={this.handleSubmit}
                        className={classes.submitEditReviewButton}
                    > Save </Button>
                    <Button
                        variant="contained"
                        onClick={this.handleCancel}
                        className={classes.cancelEditReviewButton}
                    > Cancel </Button>
                </div>
            );
        }
    }

    displayText(classes) {
        if (this.state.editMode) {
            return (
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    multiline={true}
                    rows={3}
                    value={this.state.text}
                    helperText={this.state.errorText}
                    onChange={(inp) => this.handleChangeInput('text', inp.target.value)}
                />
            );
        } else {
            return (
                <Typography variant="body1" color={"inherit"} className={classes.text}>
                    {this.state.text}
                </Typography>
            );
        }
    }

    handleCancel() {
        this.setState({
            rating: this.props.review.rating,
            text: this.props.review.text,
            editMode: false,
            errorFlag: false,
            errorText: '',
        })
    }

    validateInput(target, value) {
        if (target === 'text') {
            // review should not be over 300 characters
            if (value.length > 300) {
                this.state.errorFlag = true;
            }
        }
    }

    handleChangeInput(target, value) {
        this.validateInput(target, value);
        if (!this.state.errorFlag) {
            this.setState({
                [target]: value
            });
        }
        this.state.errorFlag = false;
    }

    validateInputBeforeSubmit() {
        if (this.state.text.length === 0) {
            this.setState({
                errorFlag: true,
                errorText: 'Review can not be empty'
            })
        }
    }

    handleSubmit(event) {
        try {
            event.preventDefault();
            this.validateInputBeforeSubmit();
            if (!this.state.errorFlag) {
                let updatedReview = {
                    _id: this.props.review._id,
                    ratedUser: this.props.ratedUser,
                    postedBy: this.props.review.postedBy._id,
                    rating: this.state.rating,
                    text: this.state.text
                }
                this.props.onUpdate(updatedReview);
            }
            this.state.errorFlag = false;
        } catch (err) {
            console.error(err);
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.root}>
                <Grid container alignItems="center">
                    <Grid item xs={9} className={classes.profilePicturePosition + ' ' + classes.reviewPadding}>
                        <CardContent>
                            <Avatar
                                className={classes.profilePicture}
                                alt={this.props.review.postedBy.username}
                                title={this.props.review.postedBy.username}
                                src={this.props.review.postedBy.profileImage}
                            > {this.props.review.postedBy.username.charAt(0)}
                            </Avatar>
                        </CardContent>
                        <CardContent className={classes.fullWidth}>
                            <div>
                                <Typography variant="h4" color={"inherit"}>
                                    {this.props.review.postedBy.username}
                                </Typography>
                                {this.displayPassedTime()}
                                {this.displayText(classes)}
                            </div>
                        </CardContent>
                    </Grid>
                    <Grid item xs={3}>
                        <CardContent align="right">
                            <Rating name="read-only"
                                    value={this.state.rating}
                                    readOnly={!this.state.editMode}
                                    size="large"
                                    onChange={(event, newValue) => {
                                        this.setState({rating: newValue});
                                    }}
                            />
                            {this.showIcons()}
                            {this.showButtons(classes)}
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(useStyles)(ReviewData);

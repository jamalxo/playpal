"use strict";

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import {withStyles} from '@material-ui/core/styles';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import CardActionArea from "@material-ui/core/CardActionArea";
import Tooltip from "@material-ui/core/Tooltip";
import Verified from "../../resources/ProfileIcons/verified_gamer.png";

const useStyles = (theme) => ({
    root: {
        background: theme.palette.primary.lighter,
        flexGrow: 1,
    },
    description: {
        height: '100%'
    },
    imageStyle: {
        height: 30,
        width: 30,
    },
    profileCard: {
        width: 280,
        height: 425
    },
    profilePicture: {
        width: 150,
        height: 150
    },
    reviewRating: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    fontAverage: {
        fontSize: "medium"
    }
});

class ProfileCard extends React.Component {

    constructor(props) {
        super(props);
    }

    getAvg() {
        const ratings = this.props.profile.reviews;
        var sum = 0;
        for (var i = 0; i < ratings.length; i++) {
            sum += parseInt(ratings[i].rating, 10);
        }
        const avg = (sum / ratings.length) || 0;
        return avg;
    }

    printDescription() {
        if (this.props.profile.description == null) {
            return 'No description available.';
        } else if (this.props.profile.description.length > 60) {
            return this.props.profile.description.substring(0, 60) + " ...";
        } else {
            return this.props.profile.description;
        }
    }

    displayVerifiedIcon() {
        const {classes} = this.props;
        if (this.props.profile.usertype === "professional") {
            return (
                <Tooltip title="Professional Gamer" aria-label="pro">
                    <img src={Verified} alt="Logo" className={classes.imageStyle}/>
                </Tooltip>
            );
        } else {
            return '';
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Card classes={{root: classes.root}} className={classes.profileCard} key={this.props.key}>
                    <CardActionArea className={classes.description}>
                        <CardContent align="center">
                            <Avatar
                                className={classes.profilePicture}
                                alt={this.props.profile.username}
                                title={this.props.profile.username}
                                src={this.props.profile.profileImage}/>
                            <Typography variant="h2" component="h2" color="textPrimary">
                                {this.props.profile.username}
                                {this.displayVerifiedIcon()}
                            </Typography>
                        </CardContent>
                        <Divider variant="middle"/>
                        <CardContent align="center">
                            <Typography variant="body1" component="h2" color="textPrimary">
                                <div className={classes.reviewRating}>
                                    <Rating name="read-only" value={this.getAvg()} readOnly size="large"/>
                                    <span className={classes.fontAverage}>
                                    {this.getAvg().toFixed(1)}
                                </span>
                                </div>
                            </Typography>
                            <Typography variant="h5" color="textPrimary">
                                {this.props.profile.reviews.length} Reviews
                            </Typography>
                        </CardContent>
                        <Divider variant="middle"/>
                        <CardContent align="center">
                            <Typography variant="h6" color="textPrimary">
                                About
                            </Typography>
                            <Typography variant="body1" color="textPrimary" component="p">
                                {this.printDescription()}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(useStyles)(ProfileCard);


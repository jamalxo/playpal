"use strict";

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import {withStyles} from '@material-ui/core/styles';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import Tooltip from "@material-ui/core/Tooltip";
import './ProfileBio.css';
import Grid from "@material-ui/core/Grid";
import Verified from "../../resources/verified_gamer.png";

const useStyles = (theme) => ({
    root: {
        background: theme.palette.cardColor
    },
    star: {
        height: 60,
        width: 60
    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontSize: 16
    },
    picture: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    about: {
        fontSize: 16
    },
    imageStyle: {
        height: 40,
        width: 40,
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
            sum += parseInt(ratings[i].rating, 10); //don't forget to add the base
        }
        const avg = (sum / ratings.length) || 0;
        return avg;
    }

    printDescription() {
        if (this.props.profile.description == null) {
            return 'No description available.';
        } else if (this.props.profile.description.length > 300) {
            return this.props.profile.description.substring(0, 300) + " ...";
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
                <Card key={this.props.key} className={classes.root}>
                    <CardContent align="left">
                        <Grid container spacing={2}>
                            <Grid item xs={4} className={classes.picture}>
                                <Avatar
                                    className="profilePicture"
                                    alt={this.props.profile.username}
                                    title={this.props.profile.username}
                                    src={this.props.profile.profileImage}/>
                            </Grid>
                            <Divider orientation="vertical" flexItem/>
                            <Grid item xs={7}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h2" component="h2">
                                            {this.props.profile.username}
                                            {this.displayVerifiedIcon()}
                                        </Typography>
                                        <div className={classes.container}>
                                            <Rating name="read-only" value={this.getAvg()} readOnly className="rating"/>
                                            <span>
                                                {this.getAvg().toFixed(2)}
                                            </span>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div>
                                            <Typography variant="h5">
                                                About
                                            </Typography>
                                            <span className={classes.about}>
                                                {this.printDescription()}
                                            </span>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(useStyles)(ProfileCard);


"use strict";

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import './ProfileCard.css';
import Divider from "@material-ui/core/Divider";
import {withStyles} from '@material-ui/core/styles';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import CardActionArea from "@material-ui/core/CardActionArea";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = (theme) => ({
    root: {
        background: 'linear-gradient(45deg, rgba(200,138,255,0.9878151944371498) 0%, rgba(255,97,97,0.154) 100%)',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    description: {
        height: '100%'
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
        } else if (this.props.profile.description.length > 60) {
            return this.props.profile.description.substring(0, 60) + " ...";
        } else {
            return this.props.profile.description;
        }
    }

    displayVerifiedIcon() {
        if (this.props.profile.usertype === "professional") {
            return (
                <Tooltip title="Professional Gamer" aria-label="pro">
                    <VerifiedUserIcon fontSize="small" className="verifiedIcon"/>
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
                <Card classes={{root: classes.root}} className="profileCard" key={this.props.key}>
                    <CardActionArea className={classes.description}>
                        <CardContent align="center">
                            <Avatar
                                className="profilePicture"
                                alt={this.props.profile.username}
                                title={this.props.profile.username}
                                src={this.props.profile.profileImage}/>
                            <Typography variant="h2" component="h2">
                                {this.props.profile.username}
                                {this.displayVerifiedIcon()}
                            </Typography>
                        </CardContent>
                        <Divider variant="middle"/>
                        <CardContent align="center">
                            <Typography variant="body1" component="h2">
                                <div className="reviewRating">
                                    <Rating name="read-only" value={this.getAvg()} readOnly size="large"/>
                                    <span className="fontAverage">
                                    {this.getAvg().toFixed(2)}
                                </span>
                                </div>
                            </Typography>
                            <Typography variant="h5">
                                {this.props.profile.reviews.length} Reviews
                            </Typography>
                        </CardContent>
                        <Divider variant="middle"/>
                        <CardContent align="center">
                            <Typography variant="h6">
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


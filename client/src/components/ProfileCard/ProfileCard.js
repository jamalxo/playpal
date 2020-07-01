"use strict";

import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import Truncate from 'react-truncate';
import Avatar from '@material-ui/core/Avatar';
import './ProfileCard.css';
import Divider from "@material-ui/core/Divider";
import { withStyles } from '@material-ui/core/styles';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const styles = {
    root: {
        backgroundColor: '#eedfef'
    }
};

class ProfileCard extends React.Component {

    constructor(props) {
        super(props);
    }

    getAvg() {
        const ratings = this.props.profile.reviews;
        var sum = 0;
        for( var i = 0; i < ratings.length; i++ ){
             sum += parseInt( ratings[i].rating, 10 ); //don't forget to add the base
        }
        const avg = (sum / ratings.length) || 0;
        return avg;
    }

/*
<Truncate lines={2} ellipsis={"..."}> {this.props.profile.description == null? 'No Synopsis available' : `${this.props.profile.description}`}</Truncate>

*/
    render() {
        const { classes } = this.props;
        return (
            <Card classes={{root: classes.root }} className="profileCard" key={this.props.key}>
                <CardContent align="center">
                    <Avatar
                        className="profilePicture"
                        alt={this.props.profile.username}
                        title={this.props.profile.username}
                        src="http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg"/>
                    <Typography variant="h2" component="h2">
                        {this.props.profile.username}
                        {this.props.profile.usertype === "professional" ? <VerifiedUserIcon fontSize="small"/> : '' }
                    </Typography>
                </CardContent>
                <Divider variant="middle" />
                <CardContent align="center">
                    <Typography variant="body1" component="h2">
                        <Rating name="read-only" value={this.getAvg()} readOnly size="large"/>
                        {this.getAvg().toFixed(2)}
                    </Typography>
                    <Typography variant="h5">
                        {this.props.profile.reviews.length} Reviews
                    </Typography>
                </CardContent>
                <Divider variant="middle" />
                <CardContent align="center">
                    <Typography variant="h6">
                        About
                    </Typography>
                    <Typography variant="body1" color="textPrimary" component="p">
                        {this.props.profile.description == null? 'No description available.' : `${this.props.profile.description}`}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}
export default withStyles(styles)(ProfileCard);

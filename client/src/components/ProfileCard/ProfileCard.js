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
import './ProfileCard.css';

export default class ProfileCard extends React.Component {

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

    render() {
        return (
            <Card className="profileCard" key={this.props.key}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Con templative Reptile"
                        height="140"
                        image="http://resizing.flixster.com/AeDB8hgaGed_TMCcIF1P_gubGwA=/54x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/27/63/11276344_ori.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent align="center">
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.profile.username}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.profile.firstname} {this.props.profile.lastname}
                        </Typography>
                        <div> {this.getAvg().toFixed(2)} </div>
                        <Rating name="read-only" value={this.getAvg()} readOnly />
                    </CardContent>
                    <CardContent align="left">
                        <Typography variant="body2" color="textSecondary" component="p">
                            <Truncate lines={2} ellipsis={"..."}> {this.props.profile.description == null? 'No Synopsis available' : `${this.props.profile.description}`}</Truncate>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

"use strict";

import React from 'react';
import Grid from '@material-ui/core/Grid';

import ProfileCard from "../ProfileCard/ProfileCard";
import {Link} from "react-router-dom";
import './ProfileList.css';

export default class ProfileList extends React.Component {

    constructor(props) {
        super(props);
    }

    getAvg(profile) {
        const ratings = profile.reviews;
        var sum = 0;
        for (var i = 0; i < ratings.length; i++) {
            sum += parseInt(ratings[i].rating, 10);
        }
        const avg = (sum / ratings.length) || 0;
        return avg;
    }

    render() {
        return (
            <Grid container justify="center">
                {this.props.data.sort((a, b) => this.getAvg(b) - this.getAvg(a)).slice(0, 8).map((profile, i) => (
                    <Grid key={i} item className="profileList">
                        <Link className="linkDecoration" to={`/user/${profile._id}`}>
                            <ProfileCard key={i} profile={profile}/>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

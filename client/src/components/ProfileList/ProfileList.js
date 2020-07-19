"use strict";

import React from 'react';
import Grid from '@material-ui/core/Grid';

import ProfileCard from "../ProfileCard/ProfileCard";
import {Link} from "react-router-dom";
import './ProfileList.css';
import Badge from "@material-ui/core/Badge";
import GoldMedal from "../../resources/Medals/gold-medal.png";
import SilverMedal from "../../resources/Medals/silver-medal.png";
import BronzeMedal from "../../resources/Medals/bronze-medal.png";
import {withStyles} from "@material-ui/core/styles";

const useStyles = (theme) => ({
    gold: {
        height: 100,
        width: 100,
        marginRight: 50,
        marginTop: 50
    },
    silver: {
        height: 85,
        width: 85,
        marginRight: 42.5,
        marginTop: 42.5
    },
    bronze: {
        height: 70,
        width: 70,
        marginRight: 35,
        marginTop: 35
    }
});

class ProfileList extends React.Component {

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

    displayProfilesWithBadges(profile, i) {
        const {classes} = this.props;
        if (i === 0) {
            return (<Badge badgeContent={<img src={GoldMedal} alt="Gold" className={classes.gold}/>}>
                <ProfileCard key={i} profile={profile}/>
            </Badge>);
        } else if (i === 1) {
            return (<Badge badgeContent={<img src={SilverMedal} alt="Silver" className={classes.silver}/>}>
                <ProfileCard key={i} profile={profile}/>
            </Badge>);
        } else if (i === 2) {
            return (<Badge badgeContent={<img src={BronzeMedal} alt="Bronze" className={classes.bronze}/>}>
                <ProfileCard key={i} profile={profile}/>
            </Badge>);
        } else {
            return (<ProfileCard key={i} profile={profile}/>);
        }

    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container justify="center" spacing={2}>
                {this.props.data.sort((a, b) => this.getAvg(b) - this.getAvg(a)).slice(0, 8).map((profile, i) => (
                    <Grid key={i} item className="profileList">
                        <Link className="linkDecoration" to={`/user/${profile._id}`}>
                            {this.displayProfilesWithBadges(profile, i)}
                        </Link>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default withStyles(useStyles)(ProfileList);

"use strict";

import React from 'react';

import ProfileService from '../services/ProfileService';
import ProfileCard from "../components/ProfileCard";
import Page from '../components/Page';
import Grid from "@material-ui/core/Grid";
import {ReviewField} from "../components/ReviewField";
import UserSignup from "../components/UserSignup";
import UserService from "../services/UserService";
import ReviewService from "../services/ReviewService";

const gridElement = {
    padding: '30px',
    //display: 'flex'
};

export class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        (async () => {
            try {
                let user = await ProfileService.getProfile(id);
                console.log(user);
                this.setState({
                    user: user,
                    loading: false
                });
            } catch(err) {
                console.error(err);
            }
        })();
    }

    async createReview(review) {
        try {
            let reviewWithId = {
                ratedUser: this.state.user._id,
                rating: review.rating,
                review: review.review
            }

            let ret = await ReviewService.createReview(reviewWithId);

        } catch(err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }

    render() {

        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <Page>
                <Grid container style={gridElement}>
                    <Grid item xs={4} align={"center"}>
                        <ProfileCard profile={this.state.user} />
                    </Grid>
                    <Grid item xs={4}>
                        <ReviewField onSubmit={(review) => this.createReview(review)} error={this.state.error} />
                    </Grid>
                </Grid>
            </Page>
        );
    }
}

//export default withStyles(useStyles)(ProfileView)

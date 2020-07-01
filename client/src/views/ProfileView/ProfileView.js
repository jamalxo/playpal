"use strict";

import React from 'react';
import ProfileService from '../../services/ProfileService';
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Page from '../../components/Page/Page';
import Grid from "@material-ui/core/Grid";
import {ReviewField} from "../../components/ReviewField/ReviewField";
import ReviewService from "../../services/ReviewService";
import {ReviewData} from "../../components/ReviewData/ReviewData";
import './ProfileView.css'
import UserService from "../../services/UserService";

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
                this.setState({
                    user: user,
                    loading: false
                });
            } catch(err) {
                console.error(err);
            }
        })();
    }

    waitForNewReview() {
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        (async () => {
            try {
                let user = await ProfileService.getProfile(id);
                this.setState({
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
                postedBy: UserService.getCurrentUser().id,
                rating: review.rating,
                text: review.text
            };
            console.log(reviewWithId);
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
                <Grid container className="grid">
                    <Grid item xs={4} align={"right"} className="profileCard">
                        <ProfileCard profile={this.state.user} />
                    </Grid>
                    <Grid item xs={4} >
                        <ReviewField
                            onSubmit={(review) => {
                                this.createReview(review);
                                this.waitForNewReview();
                            }}
                            error={this.state.error}
                        />
                        {this.state.user.reviews.map((review, i) => <ReviewData key={i} review={review}/>)}
                    </Grid>
                </Grid>
            </Page>
        );
    }
}


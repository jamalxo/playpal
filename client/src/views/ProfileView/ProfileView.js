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
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import OfferService from "../../services/OfferService";
import OfferList from "../../components/Offer/OfferList";

export class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataOffers: []
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
            } catch (err) {
                console.error(err);
            }
        })();


        // (async () => {
        //     try {
        //         let data = await OfferService.getOffers();
        //         this.setState({
        //             dataOffers: [...data],
        //             loading: false
        //         });
        //     } catch (err) {
        //         console.error(err);
        //     }
        // })();
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


        } catch (err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }

    render() {

        if (this.state.loading) {
            return (<CircularProgress/>);
        }

        return (
            <Page>
                <Container maxWidth="lg">
                    <Grid container className="grid">
                        <Grid item xs={12} align={"right"}>
                            {/*<ProfileCard profile={this.state.user}/>*/}
                            <ProfileBio profile={this.state.user} />
                        </Grid>
                        <Grid item xs={12} align={"right"}>
                            <OfferList dataOffers={this.state.dataOffers}/>
                        </Grid>
                        <Grid item xs={6}>
                            <ReviewField
                                onSubmit={(review) => {
                                    this.createReview(review);
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 100);
                                }}
                                error={this.state.error}
                            />
                            {this.state.user.reviews.map((review, i) => <ReviewData key={i} review={review}/>)}
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        );
    }
}


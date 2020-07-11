"use strict";

import React from 'react';
import ProfileService from '../../services/ProfileService';
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Page from '../../components/Page/Page';
import Grid from "@material-ui/core/Grid";
import ReviewField from "../../components/ReviewField/ReviewField";
import ReviewService from "../../services/ReviewService";
import ReviewData from "../../components/ReviewData/ReviewData";
import AvailabilityBox from "../../components/AvailabilityBox/AvailabilityBox";
import ServerBox from "../../components/ServerBox/ServerBox";
import './ProfileView.css'
import UserService from "../../services/UserService";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import OfferService from "../../services/OfferService";
import OfferList from "../../components/Offer/OfferList";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RateReviewIcon from '@material-ui/icons/RateReview';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import {theme} from "../../theme";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import OfferCard from "../../components/OfferCard/OfferCard";

const useStyles = (theme) => ({
    tab: {
        padding: 0
    },
    grid: {
        paddingTop: 75
    },
    spaceBetweenTabs: {
        paddingBottom: 15
    },
    commentHeader: {
        color: theme.palette.common.white,
        paddingBottom: 15,
        paddingTop: 15
    },
    reviewGrid: {
        paddingBottom: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        alignSelf: "stretch"
    },
});

class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataOffers: [],
            currentTab: "1"
        };

        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    handleChangeInput(target, value) {
        this.setState({
            [target]: value
        });
    }


    componentWillMount() {
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        (async () => {
            try {
                let user = await ProfileService.getProfile(id);
                let data = await OfferService.getOffers();
                this.setState({
                    dataOffers: [...data],
                    user: user,
                    loading: false
                });
            } catch (err) {
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
            let ret = await ReviewService.createReview(reviewWithId);


        } catch (err) {
            console.error(err);
            this.setState({
                error: err
            });
        }
    }

    render() {
        const {classes} = this.props;
        if (this.state.loading) {
            return (<CircularProgress/>);
        }

        return (
            <Page>
                <Container maxWidth="lg" className={classes.grid}>
                    <Grid container spacing={2} className={classes.reviewGrid}>
                        <Grid item xs={6}>
                            <ProfileBio profile={this.state.user}/>
                        </Grid>
                        <Grid item xs={3} className={classes.reviewGrid}>
                            <AvailabilityBox profile={this.state.user}></AvailabilityBox>
                        </Grid>
                        <Grid item xs={3} className={classes.reviewGrid}>
                            <ServerBox profile={this.state.user}></ServerBox>
                        </Grid>
                    </Grid>
                    <TabContext value={this.state.currentTab}>
                        <Grid container className={classes.spaceBetweenTabs}>
                            <Grid item xs={12}>
                                <Tabs
                                    value={this.state.currentTab}
                                    onChange={(e, newValue) => (this.handleChangeInput('currentTab', newValue))}
                                    variant="fullWidth"
                                    indicatorColor="secondary"
                                    textColor="secondary"
                                    className={classes.spaceBetweenTabs}
                                >
                                    <Tab icon={<LocalOfferIcon style={{color: 'white'}}/>} label="OFFERS"
                                         style={{color: 'white'}} value={"1"}/>
                                    <Tab icon={<RateReviewIcon style={{color: 'white'}}/>} label="REVIEWS"
                                         style={{color: 'white'}} value={"2"}/>
                                </Tabs>
                                <TabPanel value={"1"} classes={{root: classes.tab}}>
                                    <Typography variant="h4"
                                                className={classes.commentHeader}>My Offers</Typography>
                                    <Grid container spacing={2}>
                                        {this.state.user.offers.map((offer, i) =>
                                            <Grid item xs={3} key={i}>
                                                <OfferCard key={i} price={offer.price} game={offer.game} profile={offer.owner}/>
                                            </Grid>)}
                                    </Grid>
                                </TabPanel>
                                <TabPanel value={"2"} classes={{root: classes.tab}}>
                                    <Typography variant="h4"
                                                className={classes.commentHeader}>{this.state.user.reviews.length} Reviews</Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
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
                                                </Grid>
                                                <Grid item xs={6}>
                                                </Grid>
                                                {this.state.user.reviews.map((review, i) =>
                                                    <Grid item xs={6} key={i}>
                                                        <ReviewData key={i} review={review}/>
                                                    </Grid>)}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                            </Grid>
                        </Grid>
                    </TabContext>
                </Container>
            </Page>
        );
    }
}

export default withStyles(useStyles)(ProfileView);

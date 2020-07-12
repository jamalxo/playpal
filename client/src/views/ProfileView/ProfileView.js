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
import Loading from "../../components/Loading";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";

const useStyles = (theme) => ({
    grid: {
        paddingTop: 75
    },
    paddingBelow: {
        paddingBottom: 15
    },
    commentHeader: {
        paddingTop: 20,
        paddingLeft: 10
    },
    offerHeader: {
        paddingTop: 20,
    },
    reviewGrid: {
        paddingBottom: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        alignSelf: "stretch"
    },
    elementPadding: {
        padding: 10
    },
    offerContainer: {
        display: "flex",
    },
    offerElement: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

class ProfileView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            dataOffers: [],
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
            return (<Loading/>);
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
                    <Paper>
                        <Grid container className={classes.paddingBelow}>
                            <Grid item xs={4}>
                                <Grid container className={classes.offerContainer}>
                                    <Grid item xs={12} className={classes.offerElement}>
                                        <Typography variant="h4"
                                                    className={classes.offerHeader}
                                                    color={"inherit"}>My Offers</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={[classes.elementPadding, classes.offerElement]}>
                                        <OfferList dataOffers={this.state.user.offers}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h4"
                                                    className={classes.commentHeader}
                                                    color={"inherit"}>{this.state.user.reviews.length} Reviews</Typography>
                                    </Grid>
                                    <Grid item xs={12} className={classes.elementPadding}>
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
                                    {this.state.user.reviews.map((review, i) =>
                                        <Grid item xs={12} key={i} className={classes.elementPadding}>
                                            <ReviewData key={i} review={review}/>
                                        </Grid>)}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Page>
        );
    }
}

export default withStyles(useStyles)(ProfileView);

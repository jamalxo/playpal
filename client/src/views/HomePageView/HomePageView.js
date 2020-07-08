"use strict";

import React from 'react';
import ProfileService from '../../services/ProfileService';
import Page from '../../components/Page/Page';
import Grid from "@material-ui/core/Grid";
import {Link, withRouter} from "react-router-dom";
import ProfileList from "../../components/ProfileList/ProfileList";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import './HomePageView.css'
import OfferService from "../../services/OfferService";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import OfferCard from "../../components/Offer/OfferCard";
import OfferList from "../../components/Offer/OfferList";

import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../../theme";
import Team from "../../resources/team.svg";
import Order from "../../resources/product.svg";
import Search from "../../resources/search.svg";
import Time from "../../resources/stopwatch.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const useStyles = (theme) => ({
    container: {
        paddingTop: '100px',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        borderRadius: '1%'
    },
    centerContent: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    welcomeFont: {
        color: theme.palette.primary.contrastText,
        fontWeight: '400'
    },
    welcomeSubheaderFont: {
        color: theme.palette.primary.contrastText,
        fontWeight: '300'
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50%',
    },
    button: {
        margin: '15px'
    },
    headerFont: {
        fontWeight: '450',
        color: theme.palette.primary.contrastText,
        paddingTop: '50px'
    },
    imageStyle: {
        width: 100,
        height: 100
    },
});

class HomePageView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            dataOffers: []
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        ProfileService.getProfiles().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

        OfferService.getOffers().then((data) => {
            this.setState({
                dataOffers: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        const {classes} = this.props;
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <Page>
                <Container maxWidth="lg">
                    <Grid container spacing={4} classes={{root: classes.container}} direction="row"
                          justify="center"
                          alignItems="center">
                        <Grid item xs={12} className={classes.image}/>

                        {/*INTRO*/}
                            <Grid item xs={3} >
                                <img src={Search} alt="Logo" className={classes.imageStyle}/>
                                <Typography variant="h5" className={classes.headerFont}>
                                    SEARCH FOR OFFER
                                </Typography>
                                <FontAwesomeIcon icon="coffee"/>
                            </Grid>
                        <Grid item xs={3}>
                                <img src={Order} alt="Logo" className={classes.imageStyle}/>
                                <Typography variant="h5" className={classes.headerFont}>
                                    ORDER AN OFFER
                                </Typography>
                            </Grid>
                            <Grid item xs={3} >
                                <img src={Time} alt="Logo" className={classes.imageStyle}/>
                                <Typography variant="h5" className={classes.headerFont}>
                                    WAIT FOR RESPONSE
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <img src={Team} alt="Logo" className={classes.imageStyle}/>
                                <Typography variant="h5" className={classes.headerFont}>
                                    PLAY TOGETHER!
                                </Typography>
                            </Grid>
                        {/*INTRO*/}

                        <Grid item xs={4}>
                            <Typography variant="h3" className={classes.headerFont}>
                                Best Play-Pals
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ProfileList data={this.state.data}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h3" className={classes.headerFont}>
                                Checkout The Offers For These Games!
                            </Typography>
                            <OfferList dataOffers={this.state.dataOffers}/>
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        );
    }
}

export default withStyles(useStyles)(HomePageView);

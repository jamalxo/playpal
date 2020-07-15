"use strict";

import React from 'react';
import ProfileService from '../../services/ProfileService';
import Page from '../../components/Page/Page';
import Grid from "@material-ui/core/Grid";
import ProfileList from "../../components/ProfileList/ProfileList";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";
import './HomePageView.css'
import OfferService from "../../services/OfferService";
import OfferList from "../../components/Offer/OfferList";
import Search from "../../resources/suche.svg";
import Order from "../../resources/einkaufswagen.svg";
import Match from "../../resources/herz-new.svg";
import Trophy from "../../resources/trophaee.svg";
import New from "../../resources/neu.svg";
import Like from "../../resources/like.svg";
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from '../../theme';
import Loading from "../../components/Loading";

const useStyles = (theme) => ({
    container: {
        paddingTop: '150px',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        borderRadius: '1%',
        paddingBottom: 200,
        paddingTop: 200
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
    headerPlayPal: {
        fontWeight: '450',
        color: theme.palette.primary.contrastText,
        alignSelf: 'center'
    },
    headerPlayPalDiv: {
        display: 'flex',
        padding: 20
    },
    headerInfo: {
        fontWeight: '450',
        color: theme.palette.primary.contrastText
    },
    imageStyle: {
        width: 100,
        height: 100,
        paddingBottom: 30
    },
    imageIcon: {
        width: 50,
        height: 50,
        paddingRight: 10
    },
    paper: {
        backgroundColor: theme.palette.primary.light,
        marginTop: 50,
        padding: 20,
        marginBottom: 50
    },
    loading: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
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
            return (<Loading/>);
        }

        return (
            <MuiThemeProvider theme={theme}>

            <Page>
                <Container maxWidth="lg">
                    <Grid container spacing={10} classes={{root: classes.container}} direction="row"
                          justify="center"
                          alignItems="center">
                        <Grid item xs={12} className={classes.image}/>

                        {/*INTRO*/}
                        <Grid item xs={3} container direction="column" spacing={2} justify="center"
                              alignItems="center">
                            <img src={Search} alt="Logo" className={classes.imageStyle}/>
                            <Typography variant="h5" className={classes.headerInfo}>
                                SEARCH FOR OFFERS
                            </Typography>
                            <Typography variant="subtitle1" className={classes.headerInfo}>
                                Search through over 1000+ offers
                            </Typography>
                        </Grid>
                        <Grid item xs={3} container direction="column" spacing={2} justify="center"
                              alignItems="center">
                            <img src={Order} alt="Logo" className={classes.imageStyle}/>
                            <Typography variant="h5" className={classes.headerInfo}>
                                CHOOSE ONE OF THEM
                            </Typography>
                            <Typography variant="subtitle1" className={classes.headerInfo}>
                                Decide on your favourite person to play with
                            </Typography>
                        </Grid>
                        <Grid item xs={3} container direction="column" spacing={2} justify="center"
                              alignItems="center">
                            <img src={Like} alt="Logo" className={classes.imageStyle}/>
                            <Typography variant="h5" className={classes.headerInfo}>
                                WAIT FOR ACCEPT
                            </Typography>
                            <Typography variant="subtitle1" className={classes.headerInfo}>
                                Professional Players still have to accept you request to play with them
                            </Typography>
                        </Grid>
                        <Grid item xs={3} container direction="column" spacing={2} justify="center"
                              alignItems="center">
                            <img src={Match} alt="Logo" className={classes.imageStyle}/>
                            <Typography variant="h5" className={classes.headerInfo}>
                                PLAY TOGETHER!
                            </Typography>
                            <Typography variant="subtitle1" className={classes.headerInfo}>
                                Enjoy and leave a review if you liked them
                            </Typography>
                        </Grid>
                        {/*INTRO*/}

                        <Paper elevation={3} className={classes.paper}>
                            <Grid  xs={12}  container
                                  direction="column"
                                  justify="center"
                                  alignItems="center">
                                <div className={classes.headerPlayPalDiv}>
                                    <img src={Trophy} alt="Logo" className={classes.imageIcon}/>
                                    <Typography variant="h4" className={classes.headerPlayPal} align="center">
                                        Best Play-Pals
                                    </Typography>
                                </div>

                            </Grid>
                            <Grid item xs={12}>
                                <ProfileList data={this.state.data}/>
                            </Grid>
                        </Paper>

                        <Paper elevation={3} className={classes.paper}>
                            <Grid xs={12}  container
                                  direction="column"
                                  justify="center"
                                  alignItems="center">
                                <div className={classes.headerPlayPalDiv}>
                                    <img src={New} alt="Logo" className={classes.imageIcon}/>
                                    <Typography variant="h4" className={classes.headerPlayPal} align="center">
                                        Checkout The Latest Offers!
                                    </Typography>
                                </div>
                                <OfferList dataOffers={this.state.dataOffers}/>
                            </Grid>
                        </Paper>

                    </Grid>
                </Container>
            </Page>
            </MuiThemeProvider>

        );
    }
}

export default withStyles(useStyles)(HomePageView);

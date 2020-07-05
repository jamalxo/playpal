"use strict";

import React from 'react';
import ProfileService from '../../services/ProfileService';
import Page from '../../components/Page/Page';
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import ProfileList from "../../components/ProfileList/ProfileList";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import './HomePageView.css'

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
        color: '#9c27b0',
        fontWeight: '400'
    },
    welcomeSubheaderFont: {
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
        color: '#2f2e49',
        paddingTop: '50px'
    },
});

class HomePageView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: []
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
    }

    render() {
        const {classes} = this.props;
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <Page>
                <Container maxWidth="lg">
                    <Grid container spacing={4} classes={{root: classes.container}}>
                        <Grid item xs={7} className={classes.image}/>
                        <Grid item xs={5}>
                            <div className={classes.centerContent}>
                                <Typography variant="h1" className={classes.welcomeFont}>
                                    PlayPal
                                </Typography>
                            </div>
                            <div className={classes.centerContent}>
                                <Typography variant="h4" className={classes.welcomeSubheaderFont}>
                                    Meet And Play With Other Gamers
                                </Typography>
                            </div>
                            <div className={classes.buttonsContainer}>
                                <Link to={`/login`}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}> Login
                                    </Button>
                                </Link>
                                <Link to={`/register`}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        className={classes.button}> Register
                                    </Button>
                                </Link>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h3" className={classes.headerFont}>
                                Best Play-Pals
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ProfileList data={this.state.data}/>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h3" className={classes.headerFont}>
                                Checkout The Offers For These Games!
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Page>
        );
    }
}

export default withStyles(useStyles)(HomePageView);

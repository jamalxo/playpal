"use strict";

import React from 'react';

import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {theme} from "../../theme";
import OfferForm from "../../components/Offer/OfferForm";
import {withRouter} from "react-router-dom";
import OfferList from "../../components/Offer/OfferList";
import Grid from "@material-ui/core/Grid";
import OfferService from "../../services/OfferService";
import OfferCard from "../../components/Offer/OfferCard";
import Page from "../../components/Page/Page";
import New from "../../resources/neu.svg";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import ProfileList from "../../components/ProfileList/ProfileList";
import ProfileService from "../../services/ProfileService";
import UserService from "../../services/UserService";

const useStyles = (theme) => ({
    container: {
        paddingTop: '150px',
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
    imageIcon: {
        width: 50,
        height: 50,
        paddingRight: 10
    },
    paper: {
        backgroundColor: theme.palette.primary.dark,
        marginTop: 50,
        padding: 20,
        marginBottom: 50
    },
    createButton:{
        padding: 30
    }
});

class OffersView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            loading: true,
            dataOffers: []
        });

        let id = UserService.getCurrentUser().id;

        console.log(id);

        (async () => {
            try {
                let user = await ProfileService.getProfile(id);
                this.setState({
                    dataOffers: [...user.offers],
                    user: user,
                    loading: false
                });
            } catch (err) {
                console.error(err);
            }
        })();

    }

    render() {
        const {classes} = this.props;

        // THIS IS IMPORTANT
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Grid container spacing={10} classes={{root: classes.container}} direction="row"
                          justify="center"
                          alignItems="center" xs={12}>
                    <Paper elevation={3} className={classes.paper}>
                        <Grid xs={9}  container
                              direction="column"
                              justify="center"
                              alignItems="center">
                            <div className={classes.headerPlayPalDiv}>
                                <img src={New} alt="Logo" className={classes.imageIcon}/>
                                <Typography variant="h4" className={classes.headerPlayPal} align="center">
                                    Your Offers!
                                </Typography>
                            </div>
                        </Grid>
                        <Grid container xs={12}
                              direction="column"
                              justify="center"
                              alignItems="flex-end" className={classes.createButton}>
                            <Button variant="contained" color="primary" onClick={() => this.props.history.push('/offer/create')}>
                                Create new offer
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            {this.state.dataOffers.length !== 0 ?
                                <OfferList dataOffers={this.state.dataOffers}/> :
                                <h1>No offers</h1>
                            }
                        </Grid>
                    </Paper>
                    </Grid>
                    <Page></Page>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(useStyles)(OffersView);





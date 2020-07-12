"use strict";

import React from 'react';

import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {theme} from "../../theme";
import OfferList from "../../components/Offer/OfferList";
import Grid from "@material-ui/core/Grid";
import Page from "../../components/Page/Page";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper/Paper";
import Button from "@material-ui/core/Button";
import ProfileService from "../../services/ProfileService";
import UserService from "../../services/UserService";
import Pencil from "../../resources/pencil.svg";
import Divider from '@material-ui/core/Divider';
import Loading from "../../components/Loading";


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
        backgroundColor: theme.palette.primary.light,
        marginTop: 50,
        padding: 20,
        marginBottom: 50,
        width: "75%",
    },
    createButton: {
        padding: 30
    },
    imageStyle: {
        width: 50,
        height: 50,
        marginRight: 10
    },
    divider: {
        margin: theme.spacing(2, 0),
        backgroundColor: theme.palette.primary.contrastText
    },
    buttonCreate: {
        backgroundColor: theme.palette.primary.lighter,
        color: theme.palette.primary.contrastText
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
            return (<Loading/>);
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Grid container spacing={10} classes={{root: classes.container}} direction="row"
                          justify="center"
                          alignItems="center">
                        <Paper elevation={3} className={classes.paper}>
                            <Grid container direction="row" justify="center" alignItems="center">
                                <Grid xs={6} container item direction="row" justify="flex-start" alignItems="center">
                                    <div className={classes.headerPlayPalDiv}>
                                        <img src={Pencil} alt="Logo" className={classes.imageStyle}/>
                                        <Typography variant="h4" className={classes.headerPlayPal} align="center">
                                            Manage Offers!
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid container item direction="row" justify="flex-end" alignItems="center" xs={6}
                                      className={classes.createButton}>
                                    <Button variant="contained" className={classes.buttonCreate}
                                            onClick={() => this.props.history.push('/offer/create')}>
                                        Create new offer
                                    </Button>
                                </Grid>
                            </Grid>

                            <Divider className={classes.divider}/>

                            {this.state.dataOffers.length !== 0 ?
                                <Grid container item direction="column" justify="flex-start" alignItems="flex-start"
                                      xs={12}>
                                    <OfferList dataOffers={this.state.dataOffers}/>
                                </Grid> :
                                <Grid item xs={12}>
                                    <Typography variant="h4" className={classes.headerPlayPal} align="center">
                                        No Offers yet...
                                    </Typography>
                                </Grid>
                            }
                        </Paper>
                    </Grid>
                    <Page></Page>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(useStyles)(OffersView);





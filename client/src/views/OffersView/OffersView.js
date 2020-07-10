"use strict";

import React from 'react';

import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {theme} from "../../theme";
import OfferForm from "../../components/Offer/OfferForm";
import {withRouter} from "react-router-dom";
import OfferList from "../../components/Offer/OfferList";
import Grid from "@material-ui/core/Grid";
import OfferService from "../../services/OfferService";

export class OffersView extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            loading: true,
            dataOffers: []
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
        // THIS IS IMPORTANT
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <OfferForm open={false}/>
                </div>
            </MuiThemeProvider>
        );
    }
}




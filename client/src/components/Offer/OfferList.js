import React from "react";
import Grid from "@material-ui/core/Grid";
import OfferCard from "../OfferCard/OfferCard";
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from '../../theme';

export default function OfferList(props) {
    return (
        <MuiThemeProvider theme={theme}>
            <Grid container spacing={2} justify="center">
                {props.dataOffers.map((item, index) => (
                    <Grid key={index} item>
                        <OfferCard offer={item} edit={props.edit}/>
                    </Grid>
                ))}
            </Grid>
        </MuiThemeProvider>
    )
}

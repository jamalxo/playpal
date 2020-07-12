import React from 'react';
import UserService from "../services/UserService";
import Page from "../components/Page/Page";
import {PendingRequest} from "../components/PendingRequest/PendingRequest";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import OfferCard from "../components/OfferCard/OfferCard";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../theme";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Box from "@material-ui/core/Box";

const useStyles = (theme) => ({
    container: {
        marginTop: '150px',
    },
    headerPlayPal: {
        fontWeight: '450',
        color: theme.palette.primary.contrastText,
        alignSelf: 'center',
        marginLeft:'25px',
    },
    headerAccept: {
        fontWeight: '450',
        color: theme.palette.primary.contrastText,
        alignSelf: 'center'
    },


})
export function PendingRequestsView() {

    const requests = UserService.getCurrentUser().pendingRequests
    const test = [
        {requestingPlayer: "5edb984f34c7ee3ba785d0a5", game:"LoL", info: "I would like to play this tuesday"},
        {requestingPlayer: "5f01c25ed6e0f768a582d22b", game: "CS:GO",  info: "I would like to play this tuesday"},
        {requestingPlayer: "5f00ce545696f14503afdc63", game: "DotA 2", info: "I would like to play this tuesday"},
        {requestingPlayer: "5edb984f34c7ee3ba785d0a5", game:"LoL", info: "I would like to play this tuesday"},
        {requestingPlayer: "5f01c25ed6e0f768a582d22b", game: "CS:GO", info: "I would like to play this tuesday"},
        {requestingPlayer: "5f00ce545696f14503afdc63", game: "DotA 2", info: "I would like to play this tuesday"},
        {requestingPlayer: "5edb984f34c7ee3ba785d0a5", game:"LoL", info: "I would like to play this tuesday"},
        {requestingPlayer: "5f01c25ed6e0f768a582d22b", game: "CS:GO", info: "I would like to play this tuesday"},
        {requestingPlayer: "5f00ce545696f14503afdc63", game: "DotA 2", info: "I would like to play this tuesday"},

    ]
    const classes = useStyles(theme)
    return(
        <Page>

            <MuiThemeProvider theme={theme}>
<div style={{marginTop:'150px'}}>
            <Grid
                container
                direction="column"
                  justify="center"
                  alignItems="center"
            >
                <Typography variant="h4" className={classes.headerPlayPal} align="center">
                    PENDING REQUESTS
                </Typography>
                <div style={{width: '1000px'}}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <Box ml={1}>
                    <Typography variant="h5" className={classes.headerPlayPal} align="center">
                        Player
                    </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box ml={8}>

                        <Typography variant="h5" className={classes.headerPlayPal} align="center">
                            Game
                        </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" className={classes.headerAccept} align="center">
                            Accept/Decline
                        </Typography>
                    </Grid>
                </Grid>
                </div>
                <Grid  item className="PendingOfferList">
            {
                test.map((item, index) => <PendingRequest request={item} index={index}/>)
            }
                    </Grid>
            </Grid>
</div>
            </MuiThemeProvider>
        </Page>
    )
}
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

const useStyles = (theme) => ({
    container: {
        marginTop: '150px',
    },
})
export function PendingRequestsView() {

    const requests = UserService.getCurrentUser().pendingRequests
    const test = [
        {requestingPlayer: "5edb984f34c7ee3ba785d0a5", game:"LoL"},
        {requestingPlayer: "5f01c25ed6e0f768a582d22b", game: "CS:GO"},
        {requestingPlayer: "5f00ce545696f14503afdc63", game: "DotA 2"},
        {requestingPlayer: "5edb984f34c7ee3ba785d0a5", game:"LoL"},
        {requestingPlayer: "5f01c25ed6e0f768a582d22b", game: "CS:GO"},
        {requestingPlayer: "5f00ce545696f14503afdc63", game: "DotA 2"},
        {requestingPlayer: "5edb984f34c7ee3ba785d0a5", game:"LoL"},
        {requestingPlayer: "5f01c25ed6e0f768a582d22b", game: "CS:GO"},
        {requestingPlayer: "5f00ce545696f14503afdc63", game: "DotA 2"},

    ]
    const classes = useStyles()
    return(
        <Page>

            <MuiThemeProvider theme={theme}>
<div style={{marginTop:'100px'}}>
            <Grid
                container
                direction="column"
                  justify="center"
                  alignItems="center"
                spacing={10}
            >
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
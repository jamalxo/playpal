import React, {useEffect, useState} from 'react';
import UserService from "../services/UserService";
import Page from "../components/Page/Page";
import {PendingRequest} from "../components/PendingRequest/PendingRequest";
import Grid from "@material-ui/core/Grid";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../theme";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ProfileService from "../services/ProfileService";
import RequestService from "../services/RequestService";

const useStyles = (theme) => ({
    container: {
        paddingTop: '150px',
    },
    headerPlayPal: {
        // fontWeight: '450',
        // color: theme.palette.primary.contrastText,
        // alignSelf: 'center',
        // marginLeft: '25px',
    },
    headerAccept: {
        fontWeight: '450',
        color: theme.palette.primary.contrastText,
        alignSelf: 'center'
    },


})

export function PendingRequestsView() {
    const user = UserService.getCurrentUser()
    const [requests, setRequests] = useState([])
    const [playertype, setPlayertype] = useState("casual")
    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual

        const fetchdata = async () => {
            const userprof = await ProfileService.getProfile(user.id)
            setPlayertype(userprof.usertype)
            const newrequests = userprof.usertype ==="professional" ? userprof.pendingRequests : userprof.createdRequests
            const newRequestsFetched = []
            for(let i = 0; i < newrequests.length; i++)
            {
                let temp = await RequestService.getRequest(newrequests[i])
                newRequestsFetched.push(temp)
            }
            setRequests(newRequestsFetched)
        }
        fetchdata()
        }, []);

    const classes = useStyles(theme);
    return (
        <Page>
            <MuiThemeProvider theme={theme}>
                <div style={{paddingTop: '100px', backgroundColor:theme.palette.primary.dark}}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="h4" classes={classes.headerPlayPal} align="center" color="textPrimary">
                            PENDING REQUESTS
                        </Typography>
                        <Grid item className="PendingOfferList">
                            {

                                requests.map((item, index) => <PendingRequest request={item} index={index} playertype={playertype} key={index}/>)
                            }
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        </Page>
    )
}

import React, {useEffect, useState} from 'react';
import {theme} from "../../theme";
import Page from "../../components/Page/Page";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {UpcomingGame} from "../../components/UpcomingGame/UpcomingGame";
import UserService from "../../services/UserService";
import ProfileService from "../../services/ProfileService";
import RequestService from "../../services/RequestService";

export function UpcomingGamesView() {
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
    const user = UserService.getCurrentUser();

    const [games, setGames] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            const profile = await ProfileService.getProfile(user.id)
            const gameIds = profile.upcomingGames
            const newRequestsFetched = []
            for (let i = 0; i < gameIds.length; i++) {
                let temp = await RequestService.getRequest(gameIds[i])
                newRequestsFetched.push(temp)
            }
            setGames(newRequestsFetched)
        }

        fetchdata()
    }, [])

    const classes = useStyles(theme)
    return (
        <Page>
            <MuiThemeProvider theme={theme}>
                <div style={{paddingTop: '100px', backgroundColor: theme.palette.primary.dark}}>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Typography variant="h4" classes={classes.headerPlayPal} align="center" color="textPrimary">
                            UPCOMING GAMES
                        </Typography>
                        <Grid item className="PendingOfferList">
                            {
                                games.map((item, index) => <UpcomingGame game={item} index={index} key={index}/>)
                            }
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        </Page>
    )

}

import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {theme} from "../../theme";
import UserService from "../../services/UserService";
import ProfileService from "../../services/ProfileService";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import {getGameIcon} from "../../services/IconService";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import ListItem from "@material-ui/core/ListItem";
import InfoIcon from "@material-ui/icons/Info";
import ClearIcon from "@material-ui/icons/Clear";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import RequestService from "../../services/RequestService";
import Discord from "../../resources/discord.png"
const useStyles = makeStyles((theme) => ({
    root: {
        width: '1300px',
        height: '70px',
        //maxWidth: 360,
        backgroundColor: theme.palette.primary.light,
        margin: '2px',
        flexGrow: 1
    },
    imageStyle: {
        width: 30,
        height: 30,
        marginRight: '10px',
        marginLeft: '10px'


    },
    description: {
        fontWeight: '450',
        color: theme.palette.primary.contrastText,
        //alignSelf: 'center',
        //marginLeft: '25px',
    },
    button: {
        backgroundColor: theme.palette.primary.lightest,
        color: theme.palette.primary.contrastText,
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },




}));
export function UpcomingGame(props) {
    const classes = useStyles(theme)

    const request = props.game
    const [requestProfile, setRequestProfile] = useState({})
    const [infoDialogOpen, setInfoDialogOpen] = useState(false)
    const [finishDialogOpen, setFinishDialogOpen] = useState(false)
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
    const playertype = UserService.getCurrentUser().playertype
    useEffect(() => {    // Update the profile value on mount
        const fetchdata = async () => {
            var newprof
            if (playertype === "casual") {
                newprof = await ProfileService.getProfile(request.offeringPlayer)
            }
            else
            {
                newprof = await ProfileService.getProfile(request.requestingPlayer)
            }

            setRequestProfile(newprof)
        }
        fetchdata()

    }, []);
    return (
        <MuiThemeProvider theme={theme}>
            <Box borderRadius="50%">
                <ListItem classes={{root: classes.root}} key={props.key}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Typography variant="h6" className={classes.description} align="center" color="textPrimary">
                            You have an upcoming game of
                        </Typography>
                        <CardMedia src={getGameIcon(request.game)} component="img"
                                   className={classes.imageStyle}/>
                        <Typography variant="h6" className={classes.description} align="center" color="textPrimary">

                            {request.game} with
                        </Typography>
                        <Box ml={1} mr={1}>
                        <Avatar
                            alt={requestProfile.username}
                            title={requestProfile.username}
                            src={requestProfile.profileImage}
                            className={classes.small}
                        />
                        </Box>
                        <Typography variant="h6" className={classes.description} align="center" color="textPrimary">

                            {requestProfile.username}
                        </Typography>

                    </Grid>                    <Grid container
                          direction="row"
                          alignItems="center"
                          justify="flex-end"
                    >
                        <Grid item>
                            <IconButton edge="end" aria-label="info" onClick={() => setInfoDialogOpen(true)}>
                                <InfoIcon style={{ color: "white" }}/>
                            </IconButton>
                            <IconButton edge="end" aria-label="accept">
                                <CheckIcon style={{ color: "white" }} onClick={() => setFinishDialogOpen(true)}/></IconButton>
                            <IconButton edge="end" aria-label="accept">
                                <ClearIcon style={{ color: "white" }} onClick={() => setCancelDialogOpen(true)} /></IconButton>
                        </Grid>
                    </Grid>
                    <Dialog
                        open={infoDialogOpen}
                        onClose={() => setInfoDialogOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" style={{color:theme.palette.primary.contrastText}}>{"Additional information"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                {request.message}                            </DialogContentText>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >                            <CardMedia src={Discord} component="img"
                                       className={classes.imageStyle}/>
                            <Typography variant="h6" className={classes.description} align="center" color="textPrimary">

                                {request.discordTag}
                            </Typography>
                            </Grid>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setInfoDialogOpen(false)} color="primary" autoFocus className={classes.button}>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                    open={finishDialogOpen}
                    onClose={() => setFinishDialogOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{color:theme.palette.primary.contrastText}}>{"Finish Game"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Did you finish the game?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() =>{
                            RequestService.finishRequest(request._id)
                            setFinishDialogOpen(false)}} color="primary" autoFocus
                                className={classes.button}>
                            Yes
                        </Button>

                        <Button onClick={() => setFinishDialogOpen(false)} color="primary" autoFocus className={classes.button}>

                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
                    <Dialog
                        open={cancelDialogOpen}
                        onClose={() => setCancelDialogOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" color="textPrimary" >{"Cancel Game"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to cancel this game?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() =>{
                                RequestService.cancelGame(request._id,"declined")
                                setCancelDialogOpen(false)}} color="primary" autoFocus
                                    className={classes.button}>

                                Yes
                            </Button>

                            <Button onClick={() => setCancelDialogOpen(false)} color="primary" autoFocus
                                    className={classes.button}>

                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>



                </ListItem>
            </Box>
        </MuiThemeProvider>
    )
}

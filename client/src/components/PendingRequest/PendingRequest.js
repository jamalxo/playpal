import React, {useEffect, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import ProfileService from "../../services/ProfileService";
import CheckIcon from '@material-ui/icons/Check';
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/core/styles";
import {theme} from "../../theme";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import {getGameIcon} from "../../services/IconService";
import InfoIcon from '@material-ui/icons/Info';
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import OfferService from "../../services/OfferService";
import UserService from "../../services/UserService";
import Typography from "@material-ui/core/Typography";
import RequestService from "../../services/RequestService";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '1200px',
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

export function PendingRequest(props) {
    const classes = useStyles(theme)

    const request = props.request
    const [requestProfile, setRequestProfile] = useState({})
    const [infoDialogOpen, setInfoDialogOpen] = useState(false)
    const [acceptDialogOpen, setAcceptDialogOpen] = useState(false)
    const [declineDialogOpen, setDeclineDialogOpen] = useState(false)

    const playertype = props.playertype
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

    const AcceptIcon = playertype==="professional" ? <IconButton edge="end" aria-label="accept">
        <CheckIcon style={{ color: "white" }} onClick={() => setAcceptDialogOpen(true)}/>
    </IconButton>:""


    const RequestText = playertype==="professional"? (<Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
        ><Box ml={1} mr={1}>
            <Avatar
                alt={requestProfile.username}
                title={requestProfile.username}
                src={requestProfile.profileImage}
                className={classes.small}
            />
        </Box>
        <Typography variant="h6" className={classes.description} align="center" color="textPrimary">

            {requestProfile.username} requests to play
        </Typography>
    <CardMedia src={getGameIcon(request.game)} component="img"
               className={classes.imageStyle}/>
    <Typography variant="h6" className={classes.description} align="center" color="textPrimary">

        {request.game} for ${request.price}
    </Typography></Grid>):
        (<Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            xs={12}
        >
                <Typography variant="h6" className={classes.description} align="center" color="textPrimary">

               You request to play {request.game}
            </Typography>
                <CardMedia src={getGameIcon(request.game)} component="img"
                           className={classes.imageStyle}/>
            <Typography variant="h6" className={classes.description} align="center" color="textPrimary">

            for ${request.price} with
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
</Grid>
)

    const DeclineDialog = playertype==="professional"?(                    <Dialog
            open={declineDialogOpen}
            onClose={() => setDeclineDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" style={{color:theme.palette.primary.contrastText}}>{"Decline Request"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to decline this request?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() =>{
                    RequestService.answerRequest(request._id,"declined")
                    setTimeout(function(){props.fetchdata();},100)

                    setDeclineDialogOpen(false)}} color="primary" autoFocus
                        className={classes.button}>
                    Yes
                </Button>

                <Button onClick={() => setDeclineDialogOpen(false)} color="primary" autoFocus
                        className={classes.button}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    ):(                    <Dialog
            open={declineDialogOpen}
            onClose={() => setDeclineDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" style={{color:theme.palette.primary.contrastText}}>{"Cancel Request"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to cancel this request?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    RequestService.answerRequest(request._id, "cancelled");
                    setTimeout(function(){props.fetchdata();},100)
                    setDeclineDialogOpen(false)
                }}  autoFocus
                        className={classes.button}>

                    Yes
                </Button>

                <Button onClick={() =>
                    setDeclineDialogOpen(false)} color="primary" autoFocus
                        className={classes.button}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )



    return (
        <MuiThemeProvider theme={theme}>
            <Box borderRadius="50%">
                <ListItem classes={{root: classes.root}} key={props.key}>
                        {RequestText}
                            <Grid container
                                  direction="row"
                                  alignItems="center"
                                  justify="flex-end"
                            >
                        <Grid item>
                            <IconButton edge="end" aria-label="info" onClick={() =>{setInfoDialogOpen(true)}}>
                                <InfoIcon style={{ color: "white" }}/>
                            </IconButton>
                            {AcceptIcon}
                            <IconButton edge="end" aria-label="decline">
                                <ClearIcon style={{ color: "white" }} onClick={() =>setDeclineDialogOpen(true)}/>
                            </IconButton>

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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setInfoDialogOpen(false)} color="primary" autoFocus
                                    className={classes.button}>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                        open={acceptDialogOpen}
                        onClose={() => setAcceptDialogOpen(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" style={{color:theme.palette.primary.contrastText}}>{"Accept Request"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to accept this request?                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {
                                RequestService.answerRequest(request._id, "accepted");
                                setTimeout(function(){props.fetchdata();},100)
                                setAcceptDialogOpen(false)
                            }} color="primary" autoFocus
                                    className={classes.button}>
                                Yes
                            </Button>

                            <Button onClick={() => setDeclineDialogOpen(false)} color="primary" autoFocus
                                    className={classes.button}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {DeclineDialog}
                </ListItem>
            </Box>
        </MuiThemeProvider>
    )
}

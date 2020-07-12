import React, {useEffect, useState} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ProfileService from "../../services/ProfileService";
import CheckIcon from '@material-ui/icons/Check';
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ClearIcon from '@material-ui/icons/Clear';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";
import {getGameIcon} from "../../services/IconService";
import InfoIcon from '@material-ui/icons/Info';
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '1000px',
        height: '70px',
        //maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        margin: '2px',
        flexGrow: 1
    },
    imageStyle: {
        width: 30,
        height: 30,
        marginRight: '10px'

    },


}));

export function PendingRequest(props) {
    const classes = useStyles()

    const request = props.request
    const [requestProfile, setRequestProfile] = useState({})
    const [dialogOpen, setDialogOpen] = useState(false)

    useEffect(() => {    // Update the profile value on mount
        const fetchdata = async () => {
            const newprof = await ProfileService.getProfile(request.requestingPlayer)
            setRequestProfile(newprof)
        }
        fetchdata()

    }, []);

    return (
        <Box borderRadius="50%">
            <ListItem classes={{root: classes.root}} key={props.key} button>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-end"
                >
                    <Grid item>
                        <Grid container
                              direction="row"
                              alignItems="center"
                              justify="center"
                              spacing={1}

                        >
                            <Grid item>
                                <Box ml={1}>
                                    <Avatar
                                        className="profilePicture"
                                        alt={requestProfile.username}
                                        title={requestProfile.username}
                                        src={requestProfile.profileImage}
                                        className={classes.small}

                                    />
                                </Box>
                            </Grid>
                            <Grid item>
                                {requestProfile.username}
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container
                              direction="row"
                              alignItems="center"
                              justify="center"


                        >
                            <CardMedia src={getGameIcon(request.game)} component="img" className={classes.imageStyle}/>

                            {request.game}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton edge="end" aria-label="info" onClick={()=> setDialogOpen(true)}>
                            <InfoIcon/>
                        </IconButton>

                        <IconButton edge="end" aria-label="delete">
                            <CheckIcon/>
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
                            <ClearIcon/>
                        </IconButton>

                    </Grid>
                </Grid>
                <Dialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Additional Request information"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {request.info}                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

            </ListItem>
        </Box>
    )
}

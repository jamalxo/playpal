import React, {useEffect, useState} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RequestService from "../../services/RequestService";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.primary.lightest,
        color: theme.palette.primary.contrastText,
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },

}));
export default function BookingDialog(props){

    const handleBooking = async () => {
        let res = await RequestService.createRequest(props.offer._id)
        console.log(res)
        props.handleClose()
    }
    const classes = useStyles(theme);

    return (
        <MuiThemeProvider theme={theme}>

        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" color="primary">Book</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To confirm your booking, please enter your discord tag here. The professional Player will get your request and message you.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Discord Name"
                    type="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} className={classes.button}
                >
                    Cancel
                </Button>
                <Button onClick={handleBooking}
                className={classes.button}
                >
                    Book
                </Button>
            </DialogActions>
        </Dialog>
        </MuiThemeProvider>
    )
}

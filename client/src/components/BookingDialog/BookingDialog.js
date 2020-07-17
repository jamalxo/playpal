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
import Checkout from "./Checkout";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.primary.lightest,
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(1),

    },
    dialogPaper: {
        minHeight: '40vh',
        maxHeight: '40vh',
    },

}));
export default function BookingDialog(props){

    const classes = useStyles(theme);

    return (
        <MuiThemeProvider theme={theme}>

        <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth
        >
<Checkout handleClose={props.handleClose} offer={props.offer} profile={props.profile}/>
{/*<DialogActions>*/}
{/*                <Button onClick={props.handleClose} className={classes.button}*/}
{/*                >*/}
{/*                    Cancel*/}
{/*                </Button>*/}
{/*                <Button onClick={handleBooking}*/}
{/*                className={classes.button}*/}
{/*                >*/}
{/*                    Book*/}
{/*                </Button>*/}
{/*            </DialogActions>*/}
        </Dialog>
        </MuiThemeProvider>
    )
}

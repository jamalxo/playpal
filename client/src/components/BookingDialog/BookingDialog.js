import React, {useEffect, useState} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RequestService from "../../services/RequestService";

export default function BookingDialog(props){

    const handleBooking = async () => {
        let res = await RequestService.createRequest(props.offer._id)
        console.log(res)
        props.handleClose()
    }

    return (
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
                <Button onClick={props.handleClose} color="textPrimary">
                    Cancel
                </Button>
                <Button onClick={handleBooking} color="textPrimary">
                    Book
                </Button>
            </DialogActions>
        </Dialog>
    )
}

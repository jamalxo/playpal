import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Page from "../Page/Page";
import Input from "@material-ui/core/Input";
import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {theme} from '../../theme';
import {withRouter} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const style = {maxWidth: 500};

//todo: load from backend
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const games = ['DotA 2', 'CS:GO', 'LoL', 'Overwatch'];

const server = ['EU', 'NA', 'SEA', 'RU'];


class OfferForm extends React.Component {

    constructor(props) {
        super(props);

        this.setState({
            open: false,
        });

        if (this.props.offer != undefined) {
            this.state = {
                price: props.offer.price,
                game: props.offer.game,
                server: props.offer.server,
                startTime: props.offer.startTime,
                endTime: props.offer.endTime,
                days: props.offer.days,
                availability : props.offer.availability,
            };
        } else {
            this.state = {
                price: 0,
                game: '',
                server: '',
                startTime: new Date('2014-08-18T21:00:00'),
                endTime: new Date('2014-08-18T21:00:00'),
                days: [],
                availability : [{
                    day: '',
                    startTime: new Date('2014-08-18T21:00:00'),
                    endTime: new Date('2014-08-18T21:00:00'),
                }],
            };
        }

        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeGame = this.handleChangeGame.bind(this);
        this.handleChangeServer = this.handleChangeServer.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
        this.handleChangeDays = this.handleChangeDays.bind(this);

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePrice(value) {
        this.setState(Object.assign({}, this.state, {price: value}));
    }

    handleChangeGame(value) {
        this.setState(Object.assign({}, this.state, {game: value.target.value}));
    }

    handleChangeServer(value) {
        this.setState(Object.assign({}, this.state, {server: value.target.value}));
    }

    handleChangeStartTime(value) {
        this.setState(Object.assign({}, this.state, {startTime: value}));
    }

    handleChangeEndTime(value) {
        this.setState(Object.assign({}, this.state, {endTime: value}));
    }

    handleClickOpen(event) {
        this.setState({
            open: true
        });
    };

    handleClose(event) {
        this.setState({
            open: false,
            availability: event.target.value
        });
    };

    handleChangeDays(value) {
        this.setState(() => ({
            days: value.target.value
        }));
    }

    handleSubmit(event) {
        event.preventDefault();

        let offer = this.props.offer;
        if (offer == undefined) {
            offer = {};
        }

        offer.price = this.state.price;
        offer.game = this.state.game;
        offer.server = this.state.server;
        offer.startTime = this.state.startTime;
        offer.endTime = this.state.endTime;
        offer.days = this.state.days;

        this.props.onSubmit(offer);
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Page>
                    <Typography variant="h6" gutterBottom color={'primary'}>
                        Create Offer
                    </Typography>
                    <Grid container spacing={3}>
                        {/*todo: add icon*/}
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-mutiple-name-label">Game</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-name-label"
                                        id="demo-mutiple-name"
                                        value={this.state.game}
                                        onChange={this.handleChangeGame}
                                        input={<Input/>}
                                        MenuProps={MenuProps}
                                    >
                                        {games.map((game) => (
                                            <MenuItem key={game} value={game}>
                                                {game}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-mutiple-name-label">Server</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-name-label"
                                        id="demo-mutiple-name"
                                        value={this.state.server}
                                        onChange={this.handleChangeServer}
                                        input={<Input/>}
                                        MenuProps={MenuProps}
                                    >
                                        {server.map((server) => (
                                            <MenuItem key={server} value={server}>
                                                {server}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        <div>
                            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                                Add Time
                            </Button>
                            <Dialog open={this.state.open} onClose={this.handleClose}
                                    aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">Add</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        test
                                    </DialogContentText>
                                    <Grid item xs={12} sm={6}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="demo-mutiple-name-label">Available Days</InputLabel>
                                            <Select
                                                labelId="demo-mutiple-name-label"
                                                id="demo-mutiple-name"
                                                multiple
                                                value={this.state.days}
                                                onChange={this.handleChangeDays}
                                                input={<Input/>}
                                                MenuProps={MenuProps}
                                            >
                                                {days.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        {name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid item xs={12} sm={6}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="time-picker"
                                                label="Time picker"
                                                value={this.state.startTime}
                                                onChange={this.handleChangeStartTime}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid item xs={12} sm={6}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="time-picker"
                                                label="Time picker"
                                                value={this.state.endTime}
                                                onChange={this.handleChangeEndTime}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleClose} color="primary">
                                        Subscribe
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Grid>
                </Page>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(useStyles)(OfferForm));

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
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Moment from "react-moment";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Divider from "@material-ui/core/Divider";

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
        backgroundColor: theme.palette.primary.light
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
    addButton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    grid: {
        marginTop: 50
    },
    divider: {
        backgroundColor: theme.palette.primary.contrastText
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

function generate(array) {
    return array.map((value) =>
        <ListItem key={value.day}>
            <ListItemText
                primary={value.day}
                secondary={moment(value.startTime, value.endTime)}
            />
            {/*todo: am and pm*/}
        </ListItem>,
    );
}

function moment(date, dateEnd) {
    return (
        <div>
            <Moment format="HH:mm">
                {date}
            </Moment>
            -
            <Moment format="hh:mm">
                {dateEnd}
            </Moment>

        </div>

    )
}

//todo: load from backend
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const games = ['DotA 2', 'CS:GO', 'LoL', 'Overwatch'];

const server = ['EU', 'NA', 'SEA', 'RU'];


class OfferForm extends React.Component {

    constructor(props) {
        super(props);

        let editMode = false;

        if (this.props.history.location.pathname.includes('edit')) {
            editMode = true;
        }

        this.state = {
            open: false,
        };

        let date = new Date();
        date.setHours(0, 0, 0, 0);

        if (this.props.offer !== undefined) {
            this.state = {
                price: props.offer.price,
                game: props.offer.game,
                server: props.offer.server,
                days: props.offer.days,
                day: props.offer.day,
                availability: props.offer.availability,
                editMode: editMode
            };
        } else {
            this.state = {
                price: 0,
                game: '',
                server: '',
                days: [],
                day: '',
                availability: [],
                editMode: editMode
            };
        }

        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeGame = this.handleChangeGame.bind(this);
        this.handleChangeServer = this.handleChangeServer.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
        this.handleChangeDays = this.handleChangeDays.bind(this);
        this.handleChangeDayAvailable = this.handleChangeDayAvailable.bind(this);

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAvailability = this.handleChangeAvailability.bind(this);
        this.deleteAllAval = this.deleteAllAval.bind(this);
    }

    handleChangePrice(e, value) {
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

    handleChangeDayAvailable(value) {
        this.setState(Object.assign({}, this.state, {day: value.target.value}));
    }

    handleClickOpen(event) {
        this.setState({
            open: true
        });
    };

    handleClose() {
        let date = new Date();
        date.setHours(0, 0, 0, 0);

        this.setState({
            open: false,
            day: '',
            startTime: date,
            endTime: date,
        });
    };

    handleChangeDays(value) {
        this.setState(() => ({
            days: value.target.value
        }));
    }

    handleChangeAvailability(event) {
        let time = {
            day: this.state.day,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
        };

        this.setState(prevState => ({
            availability: [...prevState.availability, time]
        }));

        this.handleClose();
    }

    // todo: make inidivdual delete work
    deleteAllAval() {
        this.setState(prevState => ({
            availability: []
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
        offer.availability = this.state.availability;
        this.props.onSubmit(offer);
        this.props.history.push('/offers')
    }

    render() {
        const {classes} = this.props;
        const avalShow = this.state.availability.length != 0;
        const avalList = this.state.availability;

        return (
            <MuiThemeProvider theme={theme}>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      className={classes.grid}>
                    <Page>
                        <main className={classes.layout}>
                            <Paper className={classes.paper}>
                                <Typography component="h1" variant="h4" align="center">
                                    {!this.state.editMode ?
                                        <Typography variant="h3" color="textPrimary">Create Offer</Typography> :
                                        <Typography variant="h3" color="textPrimary">Edit Offer</Typography>}
                                </Typography>

                                <Divider className={classes.divider} variant="middle"/>

                                <Grid container spacing={3} direction="column" justify="center" alignItems="center">
                                    {/*todo: add icon*/}
                                    <Grid item xs={6} sm={3}>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel color="textPrimary">Game</InputLabel>
                                            <Select
                                                value={this.state.game}
                                                onChange={this.handleChangeGame}
                                                input={<Input/>}
                                                color="primary"
                                            >
                                                {games.map((game) => (
                                                    <MenuItem key={game} value={game} color="textPrimary">
                                                        {game}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
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
                                    <Grid container spacing={3} direction="column" justify="center" alignItems="center">

                                        <Grid item xs={6} sm={3}>
                                            <CurrencyTextField
                                                label="Amount"
                                                variant="standard"
                                                value={this.state.price}
                                                currencySymbol="$"
                                                minimumValue="0"
                                                outputFormat="string"
                                                decialCharacter="."
                                                digitGroupSeparator=","
                                                onChange={this.handleChangePrice}
                                                style={{paddingLeft: '10px'}}
                                            />
                                        </Grid>
                                    </Grid>

                                    <div>
                                        <Grid container spacing={3} direction="column" justify="center"
                                              alignItems="center">
                                            <Button className={classes.addButton} variant="outlined" color="primary"
                                                    onClick={this.handleClickOpen}>
                                                Add Time
                                            </Button>
                                            <Dialog open={this.state.open || false} onClose={this.handleClose}
                                                    aria-labelledby="form-dialog-title">
                                                <DialogTitle id="form-dialog-title">Add</DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText>
                                                        Please add the day and time you are available in.
                                                    </DialogContentText>
                                                    <Grid item xs={12} sm={6} direction="column" justify="center"
                                                          alignItems="center">
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel id="demo-mutiple-name-label">Available
                                                                Days</InputLabel>
                                                            <Select
                                                                labelId="demo-mutiple-name-label"
                                                                id="demo-mutiple-name"
                                                                value={this.state.day}
                                                                onChange={this.handleChangeDayAvailable}
                                                                input={<Input/>}
                                                                MenuProps={MenuProps}
                                                            >
                                                                {days.map((day) => (
                                                                    <MenuItem key={day} value={day}>
                                                                        {day}
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
                                                                label="From"
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
                                                                label="To"
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
                                                    <Button onClick={this.handleChangeAvailability} color="primary">
                                                        Add
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Grid>
                                    </div>
                                    {/*dont show if no elements in availability*/}
                                    {avalShow ? <Grid item xs={6} sm={3}>
                                        <Typography component="h1" variant="h6" align="center">
                                            Availabilities
                                        </Typography>
                                        <div className={classes.demo}>
                                            <List dense={true}>
                                                {generate(
                                                    avalList
                                                )}
                                            </List>
                                        </div>
                                        {/*todo: styling button*/}
                                        <Button className={classes.addButton} variant="outlined" color="primary"
                                                onClick={this.deleteAllAval}>
                                            Delete All Times
                                        </Button>
                                    </Grid> : null}
                                </Grid>
                                <div className={classes.buttons}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleSubmit}
                                        className={classes.button}
                                    >
                                        {!this.state.editMode ? <div>Create</div> : <div>Update</div>}
                                    </Button>
                                </div>
                            </Paper>
                        </main>
                    </Page>
                </Grid>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(useStyles)(OfferForm));

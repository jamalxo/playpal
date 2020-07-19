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

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import GameGrid from "./GameGrid";

import PublicIcon from '@material-ui/icons/Public';
import FormHelperText from '@material-ui/core/FormHelperText';
import Loading from "../Loading/Loading";


function getSteps() {
    return ['Choose game', 'Complete Information'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return `You can only choose one game per created offer.`;
        case 1:
            return `Fill out some more information about your offer.`;
        default:
            return 'Unknown step';
    }
}

const useStyles = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        paddingTop: 100,
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
        marginLeft: 28,
    },
    alignGrid: {
        marginLeft: 35,
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
    buttonCreate: {
        backgroundColor: theme.palette.primary.lighter,
        color: theme.palette.primary.contrastText,
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    divider: {
        backgroundColor: theme.palette.primary.contrastText
    },
    select: {
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        }
    },
    icon: {
        fill: theme.palette.primary.contrastText,
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    serverInput: {
        alignItems: "center !important"
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    }
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

const games = ['DotA 2', 'CS:GO', 'LoL', 'Overwatch', 'Valorant', 'PUBG', 'CoD', 'WoW', 'HotS'];

const server = ['EU West', 'EU Central', 'EU East', 'CIS', 'North America', 'South America', 'South East Asia', 'Russia', 'China'];

const steps = getSteps();

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
                editMode: editMode,
                activeStep: 0
            };
        } else {
            this.state = {
                price: 0,
                game: '',
                server: '',
                days: [],
                day: '',
                availability: [],
                editMode: editMode,
                activeStep: 0
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

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleReset = this.handleReset.bind(this);

        this.eventGameChangeHandler = this.eventGameChangeHandler.bind(this);

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

    handleNext(event) {
        this.setState(Object.assign({}, this.state, {activeStep: this.state.activeStep + 1}));
        if (this.state.activeStep === 1) {
            this.handleSubmit(event);
        }
    };

    handleBack() {
        this.setState(Object.assign({}, this.state, {activeStep: this.state.activeStep - 1}));
    };

    handleReset() {
        this.setState(Object.assign({}, this.state, {activeStep: 0}));
    };

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

    eventGameChangeHandler(data) {
        if (data.selected === true) {
            this.setState(prevState => ({
                game: data.name
            }));
        }
    }

    render() {
        const {classes} = this.props;
        const avalShow = this.state.availability.length !== 0;
        const avalList = this.state.availability;
        if (this.state.loading) {
            return (<Loading/>);
        }

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.grid}>
                    <Page>
                        <div className={classes.root}>
                            <Paper>
                                {!this.state.editMode ?
                                    <Typography align="center" variant="h3" color="textPrimary">Create
                                        Offer</Typography> :
                                    <Typography align="center" variant="h3" color="textPrimary">Edit Offer</Typography>}
                            </Paper>
                            <Stepper activeStep={this.state.activeStep} orientation="vertical">
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                        <StepContent>
                                            <Typography color="textPrimary">{getStepContent(index)}</Typography>
                                            {this.state.activeStep === 0 ?
                                                <div>
                                                    <GameGrid onGameChange={this.eventGameChangeHandler}
                                                              game={this.state.game}/>
                                                </div> :
                                                <div>
                                                    <Grid container spacing={3} direction="column" justify="center"
                                                          alignItems="center">
                                                        <Grid item xs={7} sm={3}>
                                                            <CurrencyTextField
                                                                label="Amount"
                                                                variant="standard"
                                                                value={this.state.price}
                                                                currencySymbol="$"
                                                                minimumValue="0"
                                                                maximumValue="1000"
                                                                outputFormat="string"
                                                                decialCharacter="."
                                                                digitGroupSeparator=","
                                                                onChange={this.handleChangePrice}
                                                                className={classes.alignGrid}/>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            }

                                            <div className={classes.actionsContainer}>
                                                <div>
                                                    <Button
                                                        disabled={this.state.activeStep === 0}
                                                        onClick={this.handleBack}
                                                        className={classes.buttonCreate}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.handleNext}
                                                        className={classes.buttonCreate}
                                                    >
                                                        {this.state.activeStep === steps.length - 1 ?
                                                            <div>
                                                                {!this.state.editMode ? <div>Create</div> :
                                                                    <div>Update</div>}
                                                            </div>
                                                            : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                    </Page>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(useStyles)(OfferForm));

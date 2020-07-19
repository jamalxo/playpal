import React from 'react';
import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {theme} from '../../theme';
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";

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
        // [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        //     width: 'auto',
        //     marginLeft: 'auto',
        //     marginRight: 'auto',
        // },
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
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.primary.lighter,
        color: theme.palette.primary.contrastText
    },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

class Day extends React.Component {

    constructor(props) {
        super(props);

        let startTime = new Date(2020, 0, 1, 18, 0);
        let endTime = new Date(2020, 0, 1, 23, 0);

        if (this.props.aval.startTime !== undefined && this.props.aval.endTime !== undefined) {
            this.state = {
                startTime: this.props.aval.startTime,
                endTime: this.props.aval.endTime,
                away: this.props.aval.away,
                day: this.props.aval.day
            };
        } else {
            this.state = {
                startTime: startTime,
                endTime: endTime,
                away: false,
                day: this.props.aval.day
            };
        }

        this.handleAway = this.handleAway.bind(this);
        this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
        this.handleChangeEndTime = this.handleChangeEndTime.bind(this);
    }

    handleChangeStartTime(event) {
        this.setState({
            startTime: event
        }, function() { this.sendToTime() })
    }

    handleChangeEndTime(event) {
        this.setState({
            endTime: event
        }, function() { this.sendToTime() })
    }

    handleAway(event) {
        this.setState({
            away: event.target.checked
        }, function() { this.sendToTime() })
    }

    sendToTime() {
        let aval = {
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            away: this.state.away,
            day: this.state.day
        };
        this.props.onAvalChange(aval);
    }

    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Grid item container direction="row" alignItems="center" justify="center">
                        <Grid item xs={3}>
                            <Typography color="textPrimary">{this.state.day}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            {this.state.day === 'Monday' ?
                                <FormLabel component="legend">Available</FormLabel>
                                :
                                null
                            }
                            <Checkbox onChange={(e) => this.handleAway(e)} checked={this.state.away}/>
                        </Grid>
                        {this.state.away ?
                                <Grid item xs={3}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            : null
                        }
                        {this.state.away ?
                            <Grid item xs={3}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                </MuiPickersUtilsProvider>
                            </Grid>
                            : null
                        }
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(useStyles)(Day));

import React from 'react';
import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {theme} from '../../theme';
import {withRouter} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';

import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Moment from "react-moment";
import Loading from "../Loading";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Day from "./Day";


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
    }
});

class Times extends React.Component {

    constructor(props) {
        super(props);

        let editMode = false;

        if (this.props.history.location.pathname.includes('edit')) {
            editMode = true;
        }

        this.state = {
            open: false,
        };

        console.log(props);

        if (this.props.aval.length !== 0) {
            this.state = {
                availability: this.props.aval
            };
        } else {
            this.state = {
                availability: [{}, {}, {}, {}, {}, {}, {}]
            };
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleChangeAvailability = this.handleChangeAvailability.bind(this);

        this.handleAval = this.handleAval.bind(this);

        console.log(this.state);

    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.aval !== this.props.aval) {
            console.log(previousProps)
        } else {
            console.log(this.props)
            console.log(previousProps)
        }
        console.log(this.state);

        if (this.props.aval.length !== 0) {
            this.state = {
                availability: this.props.aval
            };
        } else {
            this.state = {
                availability: [{}, {}, {}, {}, {}, {}, {}]
            };
        }

    }

    handleClickOpen(event) {
        this.setState({
            open: true
        });
    };

    handleClose() {
        this.setState({
            open: false,
        });
    };

    handleChangeAvailability(aval) {
        this.handleClose();
        this.props.onTimesChange(this.state.availability);
    }

    handleAval(aval) {
        if(aval.day === "Monday") {
            let avalTemp = this.state.availability;
            avalTemp[0] = aval;

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if(aval.day === "Tuesday") {
            let avalTemp = this.state.availability;
            avalTemp[1] = aval;

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if(aval.day === "Wednesday") {
            let avalTemp = this.state.availability;
            avalTemp[2] = aval;

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if(aval.day === "Thursday") {
            let avalTemp = this.state.availability;
            avalTemp[3] = aval;

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if(aval.day === "Friday") {
            let avalTemp = this.state.availability;
            avalTemp[4] = aval;

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if(aval.day === "Saturday") {
            let avalTemp = this.state.availability;
            avalTemp[5] = aval;

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if(aval.day === "Sunday") {
            let avalTemp = this.state.availability;
            avalTemp[6] = aval;

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else {
            console.log("error in times aval");
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div>
                    <Button className={classes.addButton} variant="outlined"
                            color="primary"
                            onClick={this.handleClickOpen}>
                        Weekly Times
                    </Button>
                    <Dialog open={this.state.open || false}
                            onClose={this.handleClose}
                            maxWidth="md"
                            fullWidth>
                        <DialogTitle
                            id="form-dialog-title">Add</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please add the times you are available in a week
                            </DialogContentText>
                            <Day aval={{day: "Monday", startTime: this.state.availability[0].startTime, endTime: this.state.availability[0].startTime, away: this.state.availability[0].away}} onAvalChange={this.handleAval}/>
                            <Day aval={{day: "Tuesday", startTime: this.state.availability[1].startTime, endTime: this.state.availability[1].startTime, away: this.state.availability[1].away}} onAvalChange={this.handleAval}/>
                            <Day aval={{day: "Wednesday", startTime: this.state.availability[2].startTime, endTime: this.state.availability[2].startTime, away: this.state.availability[2].away}} onAvalChange={this.handleAval}/>
                            <Day aval={{day: "Thursday", startTime: this.state.availability[3].startTime, endTime: this.state.availability[3].startTime, away: this.state.availability[3].away}} onAvalChange={this.handleAval}/>
                            <Day aval={{day: "Friday", startTime: this.state.availability[4].startTime, endTime: this.state.availability[4].startTime, away: this.state.availability[4].away}} onAvalChange={this.handleAval}/>
                            <Day aval={{day: "Saturday", startTime: this.state.availability[5].startTime, endTime: this.state.availability[5].startTime, away: this.state.availability[5].away}} onAvalChange={this.handleAval}/>
                            <Day aval={{day: "Sunday", startTime: this.state.availability[6].startTime, endTime: this.state.availability[6].startTime, away: this.state.availability[6].away}} onAvalChange={this.handleAval}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose}
                                    color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.handleChangeAvailability}
                                    color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(useStyles)(Times));

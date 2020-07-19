import React from 'react';
import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {theme} from '../../theme';
import {withRouter} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Day from "./Day";
import Availability from "../../resources/ProfileIcons/availability.png";
import Tooltip from "@material-ui/core/Tooltip";
import UserService from "../../services/UserService";

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
    imageStyle: {
        height: 50,
        width: 50,
    },
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
            errorFlag: false,
        };

        let avalArray = [...this.props.aval];
        for (var i = 0; i < 7; i++) {
            let avalEntry = {
                startTime: avalArray[i].startTime,
                endTime: avalArray[i].endTime,
                away: avalArray[i].away,
                day: avalArray[i].day,
            }
            avalArray[i] = avalEntry;
        }
        avalArray = avalArray.map((aval, i) => aval.startTime !== undefined ? aval : {});

        if (this.props.aval.length !== 0) {
            this.state = {
                availability: avalArray
            };
        } else {
            this.state = {
                availability: [{}, {}, {}, {}, {}, {}, {}]
            };
        }

        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCloseAndReset = this.handleCloseAndReset.bind(this);

        this.handleChangeAvailability = this.handleChangeAvailability.bind(this);

        this.handleAval = this.handleAval.bind(this);
        this.validateInputBeforeSubmit = this.validateInputBeforeSubmit.bind(this);

    }

    // componentDidUpdate(previousProps, previousState) {
    //     if (previousProps.aval !== this.props.aval) {
    //         console.log(previousProps)
    //     } else {
    //         console.log(this.props)
    //         console.log(previousProps)
    //     }
    //     console.log(this.state);
    //
    //     if (this.props.aval.length !== 0) {
    //         this.state = {
    //             availability: this.props.aval
    //         };
    //     } else {
    //         this.state = {
    //             availability: [{}, {}, {}, {}, {}, {}, {}]
    //         };
    //     }
    // }

    validateInputBeforeSubmit() {
        // startTime must be before endTime
        this.state.errorFlag = false;
        for (var i = 0; i < 7; i++) {
            if (this.state.availability[i].startTime >= this.state.availability[i].endTime) {
                this.state.errorFlag = true;
            }
        }
        if (this.state.errorFlag) {
            this.setState({
                errorFlag: true
            });
        } else {
            this.setState({
                errorFlag: false
            });
        }
    }

    handleClickOpen(event) {
        if (UserService.getCurrentUser().id === this.props.user) {
            this.setState({
                open: true
            });
        }
    };

    handleClose() {
        this.setState({
            open: false,
        });
    };

    handleCloseAndReset() {
        this.setState({
            open: false,
            availability: [...this.props.aval]
        });
    };

    handleChangeAvailability() {
        this.handleClose();
        this.props.onTimesChange(this.state.availability);
    }

    handleAval(aval) {
        if (aval.day === "Monday") {
            let avalTemp = this.state.availability;

            if (aval.away) {
                avalTemp[0] = aval;
            } else {
                avalTemp[0] = {};
            }

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if (aval.day === "Tuesday") {
            let avalTemp = this.state.availability;

            if (aval.away) {
                avalTemp[1] = aval;
            } else {
                avalTemp[1] = {};
            }

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if (aval.day === "Wednesday") {
            let avalTemp = this.state.availability;

            if (aval.away) {
                avalTemp[2] = aval;
            } else {
                avalTemp[2] = {};
            }

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if (aval.day === "Thursday") {
            let avalTemp = this.state.availability;

            if (aval.away) {
                avalTemp[3] = aval;
            } else {
                avalTemp[3] = {};
            }

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if (aval.day === "Friday") {
            let avalTemp = this.state.availability;

            if (aval.away) {
                avalTemp[4] = aval;
            } else {
                avalTemp[4] = {};
            }

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if (aval.day === "Saturday") {
            let avalTemp = this.state.availability;

            if (aval.away) {
                avalTemp[5] = aval;
            } else {
                avalTemp[5] = {};
            }

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else if (aval.day === "Sunday") {
            let avalTemp = this.state.availability;

            if (aval.away) {
                avalTemp[6] = aval;
            } else {
                avalTemp[6] = {};
            }

            this.setState(prevState => ({
                availability: avalTemp
            }));
        } else {
            console.log("error in times aval");
        }
        this.validateInputBeforeSubmit();
    }

    displayIcon(classes) {
        if (UserService.getCurrentUser().id === this.props.user) {
            return (
                <Tooltip title="Edit Availability" aria-label="pro" onClick={this.handleClickOpen}>
                    <img src={Availability} alt="Logo" className={classes.imageStyle}/>
                </Tooltip>
            );
        } else {
            return (
                <img src={Availability} alt="Logo" className={classes.imageStyle}/>
            );
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.imageStyle}>
                    {this.displayIcon(classes)}
                </div>
                <div>
                    <Dialog open={this.state.open || false}
                            onClose={this.handleCloseAndReset}
                            maxWidth="md"
                            fullWidth>
                        <DialogTitle
                            id="form-dialog-title">Change Availability</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please add the times you are available in a week
                            </DialogContentText>
                            <Day aval={{
                                day: "Monday",
                                startTime: this.state.availability[0].startTime,
                                endTime: this.state.availability[0].endTime,
                                away: this.state.availability[0].away
                            }} onAvalChange={this.handleAval}/>
                            <Day aval={{
                                day: "Tuesday",
                                startTime: this.state.availability[1].startTime,
                                endTime: this.state.availability[1].endTime,
                                away: this.state.availability[1].away
                            }} onAvalChange={this.handleAval}/>
                            <Day aval={{
                                day: "Wednesday",
                                startTime: this.state.availability[2].startTime,
                                endTime: this.state.availability[2].endTime,
                                away: this.state.availability[2].away
                            }} onAvalChange={this.handleAval}/>
                            <Day aval={{
                                day: "Thursday",
                                startTime: this.state.availability[3].startTime,
                                endTime: this.state.availability[3].endTime,
                                away: this.state.availability[3].away
                            }} onAvalChange={this.handleAval}/>
                            <Day aval={{
                                day: "Friday",
                                startTime: this.state.availability[4].startTime,
                                endTime: this.state.availability[4].endTime,
                                away: this.state.availability[4].away
                            }} onAvalChange={this.handleAval}/>
                            <Day aval={{
                                day: "Saturday",
                                startTime: this.state.availability[5].startTime,
                                endTime: this.state.availability[5].endTime,
                                away: this.state.availability[5].away
                            }} onAvalChange={this.handleAval}/>
                            <Day aval={{
                                day: "Sunday",
                                startTime: this.state.availability[6].startTime,
                                endTime: this.state.availability[6].endTime,
                                away: this.state.availability[6].away
                            }} onAvalChange={this.handleAval}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseAndReset}
                                    className={classes.submit}
                            >
                                Cancel
                            </Button>
                            <Button onClick={this.handleChangeAvailability}
                                    className={classes.submit}
                                    disabled={this.state.errorFlag}
                            >
                                Change
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>

            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(useStyles)(Times));

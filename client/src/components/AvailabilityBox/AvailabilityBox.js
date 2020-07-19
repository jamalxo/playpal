"use strict";

import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import UserService from "../../services/UserService";
import Times from "../AvailabilityBox/Times";


const useStyles = (theme) => ({
    root: {
        background: theme.palette.primary.light,
        display: "flex",
        width: '100%',
        height: '100%',
    },
    imageStyle: {
        height: 50,
        width: 50,
    },
    availabilityBox: {
        display: "flex",
    },
    contentBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
        padding: 5
    },
    times: {
        paddingLeft: 30,
        paddingTop: 20,
        paddingBottom: 20
    },
    divider: {
        backgroundColor: theme.palette.primary.contrastText
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.primary.lighter,
        color: theme.palette.primary.contrastText
    },
});

class AvailabilityBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            availability: this.props.profile.availability
        }
        this.timesChange = this.timesChange.bind(this);
    }

    displayAvailability() {
        let avalArray = this.state.availability.filter(e => e.startTime !== undefined);
        if (avalArray.length === 0) {
            return (<Typography variant="body1" color={"inherit"}>No Availability Set!</Typography>);
        } else {
            return (
                avalArray.map((aval, i) => <Typography variant="body1"
                                                       color={'inherit'} key={i}>{this.displayTime(aval)}</Typography>)
            );
        }
    }

    displayTime(aval) {
        if (aval.startTime !== undefined && aval.endTime !== undefined) {
            let start = new Date(aval.startTime);
            let end = new Date(aval.endTime);
            return (
                <span>{aval.day}: {start.getHours()}:{start.getMinutes() < 10 ? '0' + start.getMinutes() : start.getMinutes()} - {end.getHours()}:{end.getMinutes() < 10 ? '0' + end.getMinutes() : end.getMinutes()}</span>);
        } else {
            return null;
        }
    }

    async timesChange(aval) {
        console.log(aval);
        let avalArray = aval;
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
        console.log(avalArray);
        let id = this.props.profile._id;
        this.setState({
            loading: true
        });
        try {
            let ret = await UserService.updateAvailability(id, aval);
            console.log(ret);
            this.state.availability = ret;
            this.setState({
                loading: false
            });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Card key={this.props.key} className={classes.root}>
                    <Grid container className={classes.availabilityBox}>
                        <Grid item xs={12}>
                            <div className={classes.contentBox}>
                                <Times onTimesChange={this.timesChange} aval={this.state.availability}
                                       user={this.props.profile._id}/>
                            </div>
                            <div className={classes.contentBox}>
                                <Typography variant="h4" color={'inherit'}>Availability</Typography>
                            </div>
                            <Divider orientation="horizontal" variant="fullWidth" className={classes.divider}/>
                            <div className={classes.times}>
                                {this.displayAvailability()}
                            </div>
                        </Grid>

                    </Grid>
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(useStyles)(AvailabilityBox);


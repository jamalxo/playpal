"use strict";

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import Availability from "../../resources/availability.png";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";


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
        paddingTop: 20
    }
});

class AvailabilityBox extends React.Component {

    constructor(props) {
        super(props);
    }

    displayAvailability() {
        return (
            this.props.profile.availability.map((aval, i) => <Typography variant="body1" color={'inherit'}>{this.displayTime(aval)}</Typography>)
        );
    }

    displayTime(aval) {
        if (aval.startTime !== undefined && aval.endTime !== undefined) {
            let start = new Date(aval.startTime);
            let end = new Date(aval.endTime);
            return (<span>{aval.day}: {start.getHours() - 1}:{start.getMinutes()<10 ? '0'+start.getMinutes(): start.getMinutes()}  - {end.getHours() - 1}:{end.getMinutes()<10 ? '0'+end.getMinutes(): end.getMinutes()}</span>);
        } else {
            return null;
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
                                <img src={Availability} alt="Logo" className={classes.imageStyle}/>
                            </div>
                            <div className={classes.contentBox}>
                                <Typography variant="h4" color={'inherit'}>Availability</Typography>
                            </div>
                            <Divider orientation="horizontal" variant="fullWidth"/>
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


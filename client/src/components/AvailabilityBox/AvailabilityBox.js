"use strict";

import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";


const useStyles = (theme) => ({
    root: {
        background: theme.palette.cardColor,
        display: "flex",
        width: '100%',
        height: '50%',
    },
});

class AvailabilityBox extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Card key={this.props.key} className={classes.root}>
                    <CardContent align="left">
                        <div>
                            <Typography variant="h4">Availability</Typography>
                            <Typography variant="body2">Friday: 18:00 - 20:00</Typography>
                            <Typography variant="body2">Saturday: 18:00 - 20:00</Typography>
                            <Typography variant="body2">Sunday: 18:00 - 20:00</Typography>
                        </div>
                    </CardContent>
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(useStyles)(AvailabilityBox);


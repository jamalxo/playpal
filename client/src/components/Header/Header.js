"use strict";

import React from 'react';
import {Button} from 'react-md';
import {withRouter} from 'react-router-dom'
import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import KebabMenu from '../KebabMenu';
import Toolbar2 from "@material-ui/core/Toolbar/Toolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from '@material-ui/core/Typography';
import {theme} from '../../theme';

const useStyles = (theme) => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});


class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar2>

                            <Typography variant="h6" className={classes.title}>
                                PlayPal
                            </Typography>

                            <Button onClick={() => this.props.history.push('/')} icon>home</Button>
                            <KebabMenu id="toolbar-colored-kebab-menu"/>
                        </Toolbar2>
                    </AppBar>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(useStyles)(Header));

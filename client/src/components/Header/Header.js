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
import SideBar from "../Sidebar/SideBar";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = (theme) => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        flexGrow: 1,
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
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

                    <AppBar position="fixed"
                            className={clsx(classes.appBar, {
                                [classes.appBarShift]: this.props.sideBarOpen,
                            })}

                    >
                        <Toolbar2>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={() => this.props.toggleDrawer(true)}
                                edge="start"
                                className={clsx(classes.menuButton, this.props.sideBarOpen && classes.hide)}
                            >
                                <MenuIcon style={{color:'black'}} />
                            </IconButton>
                            <Typography variant="h6" className={classes.title} >
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

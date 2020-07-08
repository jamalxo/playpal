"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'
import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import KebabMenu from '../KebabMenu';
import Toolbar2 from "@material-ui/core/Toolbar/Toolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Typography from '@material-ui/core/Typography';
import {theme} from '../../theme';
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Banner from '../../resources/console.svg';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import InputBase from "@material-ui/core/InputBase"; // Tell webpack this JS file uses this image
import SearchIcon from '@material-ui/icons/Search';
import {fade} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from '@material-ui/icons/Notifications';




const drawerWidth = 240;

const useStyles = (theme) => ({
    grow: {
        flexGrow: 1,
    },
    image: {
        backgroundImage: 'url("../../resources/joystick.svg")'
    },
    imageStyle: {
        width: 50,
        height: 50,
        paddingRight: 10
    },
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
    logo: {
        width: 150,
        display: "inherit",
        alignItems: "center"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    tab: {
        color: theme.palette.secondary
    },
});


class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };

        this.handleChange = this.handleChange.bind(this);

    }


    handleChange(event, newValue) {
        this.setState({
            open: newValue
        });
    };

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
                            <div className={classes.logo} >
                                <img src={Banner} alt="Logo" className={classes.imageStyle}/>
                                <Typography variant="h6" className={classes.title} color={'inherit'}>
                                    PlayPal
                                </Typography>
                            </div>

                            <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="secondary"
                                textColor="secondary"
                                centered
                            >
                                <Tab label="Home"
                                     onClick={() => this.props.history.push('/')} />
                                <Tab label="Browse"
                                     />
                                <Tab label="Third Tab"
                                     />
                            </Tabs>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                                <IconButton aria-label="show 17 new notifications" color="inherit">
                                    <Badge badgeContent={17} color="secondary">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <KebabMenu id="toolbar-colored-kebab-menu"/>
                            </div>
                        </Toolbar2>
                    </AppBar>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(useStyles)(Header));

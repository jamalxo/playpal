"use strict";

import React from 'react';
import {withRouter} from 'react-router-dom'
import {ThemeProvider as MuiThemeProvider, withStyles} from '@material-ui/core/styles';
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
import AccountCircle from '@material-ui/icons/AccountCircle';

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import UserService from "../../services/UserService";
import Loading from "../Loading";


const drawerWidth = 240;

const useStyles = (theme) => ({
    grow: {
        flexGrow: 1,
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
        color: theme.palette.primary.contrastText
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
        height: '100%',
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
        alignItems: "center",
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    tab: {
        color: theme.palette.secondary
    },
    tabs: {
        color: theme.palette.primary.contrastText
    }
});

class Header extends React.Component {

    constructor(props) {
        super(props);

        let path = this.props.history.location.pathname;

        let currentTab = undefined;

        //add more when more tabs
        if (path === '/offers') {
            currentTab = 1
        } else if (path === '/') {
            currentTab = 0
        } else {
            currentTab = false
        }


        this.state = {
            loading: false,
            value: currentTab,
            anchorEl: null,
            isMenuOpen: false,
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };


        this.handleChange = this.handleChange.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
    }


    handleChange(event, value) {
        this.setState(Object.assign({}, this.state, {value: value}));
    };

    handleMenuOpen(event) {
        this.setState({
            anchorEl: event.currentTarget,
            isMenuOpen: true
        });
    }

    handleMenuClose(event) {
        this.setState({
            anchorEl: event.currentTarget,
            isMenuOpen: false
        });
    }

    logout() {
        UserService.logout();
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        };
        if(this.props.location.pathname !== '/') {
            this.props.history.push('/');
        }
        else {
            window.location.reload();
        }
    }

    getUserId() {
        return UserService.getCurrentUser().id;
    }

    render() {
        const {classes} = this.props;
        if (this.state.loading) {
            return (<Loading/>);
        }

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
                                aria-label="open drawer"
                                onClick={() => this.props.toggleDrawer(true)}
                                edge="start"
                                className={clsx(classes.menuButton, this.props.sideBarOpen && classes.hide)}
                            >
                                <MenuIcon/>
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
                                centered
                                className={classes.tabs}
                            >
                                <Tab label="Home"
                                     onClick={() => this.props.history.push('/')} />
                                <Tab label="Offers"
                                     onClick={() => this.props.history.push('/offers')} />
                            </Tabs>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…" //todo: FIX THIS
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
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    // aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={this.handleMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={this.state.isMenuOpen}
                                    onClose={this.handleMenuClose}
                                >
                                    {
                                        this.state.user ?
                                            <div >
                                                <MenuItem
                                                    onClick={() => this.props.history.push('/user/' + this.getUserId())}>Profile</MenuItem>
                                                <MenuItem
                                                    onClick={() => this.logout()}>Logout</MenuItem>
                                            </div>
                                        : <MenuItem onClick={() => this.props.history.push('/login')}/>
                                    }
                                </Menu>
                            </div>
                        </Toolbar2>
                    </AppBar>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(withStyles(useStyles)(Header));

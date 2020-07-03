import React from 'react';
import { ListItem, ListItemText} from "react-md";
import Drawer from '@material-ui/core/Drawer';

import List from "react-md/lib/Lists";
import {Button} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {withRouter} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
const drawerWidth = 240;
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const useStyles = (theme) => ({
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        float: 'left',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        //theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
     content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    profileSection:
        {
            display: 'flex',
            paddingTop: '10px',
            paddingBottom: '10px',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',

        },
    Avatar:
        {
            marginBottom: '10px'
        },
    Username:
        {
            marginBottom: '10px'
        }

});


const NAV_ITEMS = [
    <ListItem primaryText="Create offer" component={Link} to='/'/>,
    <ListItem primaryText="My offers" component={Link} to='/'/>,
    <ListItem primaryText="Reviews" component={Link} to='/'/>,
    <ListItem primaryText="History" component={Link} to='/'/>,
    <ListItem primaryText="Settings" component={Link} to='/'/>,
    <ListItem primaryText="Logout" component={Link} to='/'/>,

]

const GAME_LIST = [
    {title: "DotA 2", url:"dota2"},
    {title: "League of Legends", url:"league"},
    {title: "Minecraft", url:"minecraft"},
    {title: "Overwatch", url:"overwatch"},
    {title: "Fortnite", url:"fortnite"},
    {title: "Osu!", url:"osu"},
]

class SideBar extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            open: true,
            toggleDrawer: props.toggleDrawer,
        }
    }
    render() {
        const { classes } = this.props;

        return <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={this.props.open}
            classes={{
                paper: classes.drawerPaper,
            }}

        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={() => this.props.toggleDrawer(false)}>
                    <ChevronLeftIcon />
                </IconButton>

            </div>
            <Divider/>
            <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={GAME_LIST.map((option) => option.title)}
                renderInput={(params) => (
                    <TextField {...params} label="Choose a Game" margin="normal" variant="outlined" />
                )}
                onChange={(e, value, reason) =>{ if(reason==="select-option")
                {
                    let el = GAME_LIST.find( element => element.title === value)
                    this.props.history.push("/game/"+el.url)
                }

                }}

            />

            {/*<Link to='/'>*/}
            {/*<div className={classes.profileSection}>*/}
            {/*<div className={classes.Avatar} >*/}
            {/*<Avatar/>*/}
            {/*</div>*/}
            {/*<div className={classes.Username}>*/}
            {/*UserName*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</Link>*/}
            {/*<Divider/>*/}
            {/*<List>*/}
            {/*    {NAV_ITEMS}*/}
            {/*</List>*/}
            <List>
                {GAME_LIST.map((option) => <ListItem primaryText={option.title} component={Link} to={"/game/"+ option.url } />)}
            </List>
        </Drawer>
    }

}
export default withRouter(withStyles(useStyles)(SideBar))

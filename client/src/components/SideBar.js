import React from 'react';
import { ListItem, ListItemText} from "react-md";
import Drawer from '@material-ui/core/Drawer';

import List from "react-md/lib/Lists";
import {Button} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

const NAV_ITEMS = [
    <ListItem primaryText="Create offer"/>,
    <ListItem primaryText="My offers"/>,
    <ListItem primaryText="History"/>,
    <ListItem primaryText="Settings"/>,
    <ListItem primaryText="Logout"/>,
    <ListItem primaryText="Reviews"/>,

]
export class SideBar extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            open: true,
            toggleDrawer: props.toggleDrawer
        }
    }
    render() {
        return <Drawer
            variant="persistent"
            anchor="left"
            open={this.props.open}
        >
            <Button variant="contained" onClick={() => this.props.toggleDrawer(false)}>Return</Button>
            <Divider/>
            <List>
                {NAV_ITEMS}
            </List>
        </Drawer>
    }

}

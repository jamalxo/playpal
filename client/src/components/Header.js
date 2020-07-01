"use strict";

import React from 'react';
import { Toolbar, Button } from 'react-md';
import { withRouter } from 'react-router-dom'

import KebabMenu from './KebabMenu';
import {SideBar} from './SideBar'

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                sideBarOpen: false
            }
        this.toggleSideBar = this.toggleSideBar.bind(this)

    }
    toggleSideBar(boo){
        this.setState(
            {sideBarOpen:boo}
        )
    }


    render() {
        return (
            <div>
                <SideBar open={this.state.sideBarOpen} toggleDrawer={this.toggleSideBar}></SideBar>

                <Toolbar
                colored
                nav={<Button onClick={() => this.toggleSideBar(true)} icon>home</Button>}
                title={this.props.title}
                actions={<KebabMenu id="toolbar-colored-kebab-menu" />}>
            </Toolbar>

            </div>
        );
    }
};

export default withRouter(Header);
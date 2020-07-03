"use strict";

import React from 'react';

import Header from '../Header/Header';
import {Footer} from '../Footer';
import SideBar from "../Sidebar/SideBar";

import "./Page.css"


export default class Page extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            sideBarOpen: false

        }
        this.toggleSideBar = this.toggleSideBar.bind(this)


    }

    componentDidMount(){
       this.setState({
           title: document.title
       });
    }
    toggleSideBar(boo){
        this.setState(
            {sideBarOpen:boo}
        )
    }

    render() {
        return (

            <section>
                <div id="wrapper">
                    <div>
                        <Header title={this.state.title} toggleDrawer={this.toggleSideBar} sideBarOpen={this.state.sideBarOpen}/>
                        {this.props.children}
                        <Footer />
                    </div>
                    <div>
                        <SideBar open={this.state.sideBarOpen} toggleDrawer={this.toggleSideBar}></SideBar>
                    </div>

                </div>

            </section>
        );
    }
}

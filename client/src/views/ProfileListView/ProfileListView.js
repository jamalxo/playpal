"use strict";

import React from 'react';

import {ProfileList} from '../../components/ProfileList/ProfileList';
import ProfileService from '../../services/ProfileService';
import Page from "../../components/Page/Page";
import Loading from "../../components/Loading";

export class ProfileListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: []
        };
    }

    componentWillMount(){
        this.setState({
            loading: true
        });

        ProfileService.getAllProfiles().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<Loading/>);
        }

        return (
            <Page>
                <ProfileList data={this.state.data}/>
            </Page>
        );
    }
}

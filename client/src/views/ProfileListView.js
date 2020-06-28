"use strict";

import React from 'react';

import { ProfileList } from '../components/ProfileList';
import ProfileService from '../services/ProfileService';

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

        ProfileService.getProfiles().then((data) => {
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
            return (<h2>Loading...</h2>);
        }

        return (
            <ProfileList data={this.state.data}/>
        );
    }
}

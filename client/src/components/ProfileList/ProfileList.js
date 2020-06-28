"use strict";

import React from 'react';
import Grid from '@material-ui/core/Grid';

import Page from '../Page/Page'
import ProfileCard from "../ProfileCard/ProfileCard";

export const ProfileList = ({data}) => (
    <Page>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {data.map((profile, i) => (
                        <Grid key={i} item>
                            <ProfileCard key={i} profile={profile} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    </Page>
);



"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Page from './Page'
import ProfileCard from "./ProfileCard";

const dataTableStyle = {
    'marginBottom': '36px'
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));


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



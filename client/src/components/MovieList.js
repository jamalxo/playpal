"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { MovieListRow } from './MovieListRow';
import Page from './Page'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

const dataTableStyle = {
  'marginBottom': '36px'
};

export const MovieList = ({data, onDelete}) => (
    <Page>
        <DataTable plain style={dataTableStyle}>
            <TableHeader>
                <TableRow>
                    <TableColumn></TableColumn>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Remove</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((movie, i) => <MovieListRow key={i} movie={movie} onDelete={(id) => onDelete(id)} />)}
            </TableBody>
        </DataTable>
    </Page>
);


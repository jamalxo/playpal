"use strict";

import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import Grid from "@material-ui/core/Grid";
import Server from "../../resources/ProfileIcons/game-server.png";
import Divider from "@material-ui/core/Divider";
import UserService from "../../services/UserService";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


const useStyles = (theme) => ({
    root: {
        background: theme.palette.primary.light,
        display: "flex",
        width: '100%',
        height: '100%'
    },
    imageStyle: {
        height: 50,
        width: 50,
    },
    serverBox: {
        display: "flex",
    },
    contentBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: '100%',
        padding: 5
    },
    times: {
        paddingLeft: 30,
        paddingTop: 20,
        paddingBottom: 20
    },
    divider: {
        backgroundColor: theme.palette.primary.contrastText
    },
    serverForm: {
        marginLeft: 20,
        marginTop: 20,
        minWidth: 100,
    }
});

class ServerBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            server: this.props.profile.server
        }

        this.handleEditMode = this.handleEditMode.bind(this);
        this.changeServer = this.changeServer.bind(this);
    }

    handleEditMode() {
        this.setState({
            editMode: true,
        });
    }

    displayIcon(classes) {
        if (UserService.getCurrentUser().id === this.props.profile._id) {
            return (
                <Tooltip title="Edit Server" aria-label="pro" onClick={this.handleEditMode}>
                    <img src={Server} alt="Logo" className={classes.imageStyle}/>
                </Tooltip>
            );
        } else {
            return (
                <img src={Server} alt="Logo" className={classes.imageStyle}/>
            );
        }
    }

    displayServer(classes) {
        if (this.state.editMode) {
            return (
                <FormControl variant="outlined" className={classes.serverForm}>
                    <InputLabel>Server</InputLabel>
                    <Select
                        value={this.state.server}
                        onChange={(inp) => this.changeServer(inp.target.value)}
                    >
                        <MenuItem value={'Europe'}>Europe</MenuItem>
                        <MenuItem value={'USA'}>USA</MenuItem>
                        <MenuItem value={'Asia'}>Asia</MenuItem>
                        <MenuItem value={'Russia'}>Russia</MenuItem>
                        <MenuItem value={'Australia'}>Australia</MenuItem>
                        <MenuItem value={'South Africa'}>South Africa</MenuItem>
                        <MenuItem value={'South America'}>South America</MenuItem>
                    </Select>
                </FormControl>
            );
        } else {
            if (this.state.server === undefined) {
                return (
                    <div className={classes.times}>
                        <Typography variant="body1" color={'inherit'}>No Server Set!</Typography>
                    </div>
                );
            } else {
                return (
                    <div className={classes.times}>
                        <Typography variant="body1" color={'inherit'}>{this.state.server}</Typography>
                    </div>
                );
            }
        }
    }

    async changeServer(server) {
        let id = this.props.profile._id;
        let serverJSON = {
            server: server
        }
        try {
            let ret = await UserService.updateServer(id, serverJSON);
            this.state.server = ret;
            this.setState({
                editMode: false
            })
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <MuiThemeProvider theme={theme}>
                <Card key={this.props.key} className={classes.root}>
                    <Grid container className={classes.serverBox}>
                        <Grid item xs={12}>
                            <div className={classes.contentBox}>
                                {this.displayIcon(classes)}
                            </div>
                            <div className={classes.contentBox}>
                                <Typography variant="h4" color={'inherit'}>Server</Typography>
                            </div>
                            <Divider orientation="horizontal" variant="fullWidth" className={classes.divider}/>
                            {this.displayServer(classes)}
                        </Grid>

                    </Grid>
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(useStyles)(ServerBox);


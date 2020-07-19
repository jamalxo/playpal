import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import dota from "../../resources/GameGrid/dota2.jpg";
import csgo from "../../resources/GameGrid/csgo.jpg";
import lol from "../../resources/GameGrid/lol.jpg";
import overwatch from "../../resources/GameGrid/overwatch.jpg";
import valorant from "../../resources/GameGrid/valorant.jpg";
import pubg from "../../resources/GameGrid/pubg.jpg";
import cod from "../../resources/GameGrid/cod.jpeg";
import wow from "../../resources/GameGrid/wow.jpg";
import hots from "../../resources/GameGrid/hots.jpg";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.primary.lighter,
    },
    imageStyle: {
        width: "350px !important",
        height: "175px !important",
    },
    imageStyleSelected: {
        width: "350px !important",
        height: "175px !important",
        border: "5px solid #90caf9",
    },
    grid: {
        padding: 40
    }
}));

let games = [
    {name: "DotA 2", selected: false},
    {name: "CS:GO", selected: false},
    {name: "LoL", selected: false},
    {name: "Overwatch", selected: false},
    {name: "Valorant", selected: false},
    {name: "PUBG", selected: false},
    {name: "CoD", selected: false},
    {name: "WoW", selected: false},
    {name: "HotS", selected: false}
];

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

export default function GameGrid(props) {
    const classes = useStyles();
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        games = games.map(game => {
            return {name: game.name, selected: false};
        });

        if (props.game !== undefined) {
            setGamesArray(props.game);
        }
    }, []);

    const setGamesArray = (game) => {
        games = games.map(gameArray => {
            if (gameArray.name === game) {
                return {name: game, selected: true};
            } else {
                return gameArray;
            }
        });
        forceUpdate();
    };

    const handleSelect = (val) => {
        if (games[val].selected === true) {
            games[val].selected = false;
        } else {
            games = games.map(game => {
                return {name: game.name, selected: false};
            });
            games[val].selected = true;

        }
        props.onGameChange(games[val]);

        forceUpdate();
    };

    function Game(game) {
        game = game.game;
        if (game.name === "DotA 2") {
            return (
                <React.Fragment>
                    <div onClick={() => {
                        handleSelect(0);
                    }}>
                        <img src={dota} alt="Logo"
                             className={`${game.selected ? classes.imageStyleSelected : classes.imageStyle}`}/>
                    </div>
                </React.Fragment>
            );
        } else if (game.name === "CS:GO") {
            return (
                <React.Fragment>
                    <div onClick={() => {
                        handleSelect(1);
                    }}>
                        <img src={csgo} alt="Logo"
                             className={`${game.selected ? classes.imageStyleSelected : classes.imageStyle}`}/>
                    </div>
                </React.Fragment>
            );
        } else if (game.name === "LoL") {
            return (
                <React.Fragment>
                    <div onClick={() => {
                        handleSelect(2);
                    }}>
                        <img src={lol} alt="Logo"
                             className={`${game.selected ? classes.imageStyleSelected : classes.imageStyle}`}/>
                    </div>
                </React.Fragment>
            );
        } else if (game.name === "Overwatch") {
            return (
                <React.Fragment>
                    <div onClick={() => {
                        handleSelect(3);
                    }}>
                        <img src={overwatch} alt="Logo"
                             className={`${game.selected ? classes.imageStyleSelected : classes.imageStyle}`}/>
                    </div>
                </React.Fragment>
            );
        } else if (game.name === "Valorant") {
            return (
                <React.Fragment>
                    <div onClick={() => {
                        handleSelect(4);
                    }}>
                        <img src={valorant} alt="Logo"
                             className={`${game.selected ? classes.imageStyleSelected : classes.imageStyle}`}/>
                    </div>
                </React.Fragment>
            );
        } else if (game.name === "PUBG") {
            return (
                <React.Fragment>
                    <div onClick={() => {
                        handleSelect(5);
                    }}>
                        <img src={pubg} alt="Logo"
                             className={`${game.selected ? classes.imageStyleSelected : classes.imageStyle}`}/>
                    </div>
                </React.Fragment>
            );
        } else if (game.name === "CoD") {
            return (
                <React.Fragment>
                    <div onClick={() => {
                        handleSelect(6);
                    }}>
                        <img src={cod} alt="Logo"
                             className={`${game.selected ? classes.imageStyleSelected : classes.imageStyle}`}/>
                    </div>
                </React.Fragment>
            );
        } else if (game.name === "WoW") {
            return (
                <React.Fragment>
                    <div onClick={() => {
                        handleSelect(7);
                    }}>
                        <img src={wow} alt="Logo"
                             className={`${game.selected ? classes.imageStyleSelected : classes.imageStyle}`}/>
                    </div>
                </React.Fragment>
            );
        } else if (game.name === "HotS") {
            return (
                <React.Fragment>
                    <div onClick={() => {
                        handleSelect(8);
                    }}>
                        <img src={hots} alt="Logo"
                             className={`${game.selected ? classes.imageStyleSelected : classes.imageStyle}`}/>
                    </div>
                </React.Fragment>
            );
        } else {
            console.log("error in gamegrid game");
            return (
                <div>{game}</div>
            )
        }
    }

    function FormRow(variant) {
        variant = variant.variant.type;
        if (variant === 0) {
            return (
                <React.Fragment>
                    <Grid item xs={4} container alignItems="center" justify="center">
                        <Game game={games[0]}/>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" justify="center">
                        <Game game={games[1]}/>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" justify="center">
                        <Game game={games[2]}/>
                    </Grid>
                </React.Fragment>
            );
        } else if (variant === 1) {
            return (
                <React.Fragment>
                    <Grid item xs={4} container alignItems="center" justify="center">
                        <Game game={games[3]}/>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" justify="center">
                        <Game game={games[4]}/>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" justify="center">
                        <Game game={games[5]}/>
                    </Grid>
                </React.Fragment>
            );
        } else if (variant === 2) {
            return (
                <React.Fragment>
                    <Grid item xs={4} container alignItems="center" justify="center">
                        <Game game={games[6]}/>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" justify="center">
                        <Game game={games[7]}/>
                    </Grid>
                    <Grid item xs={4} container alignItems="center" justify="center">
                        <Game game={games[8]}/>
                    </Grid>
                </React.Fragment>
            );
        } else {
            console.log("error in gamegrid form row");
            return (
                <div>{variant}</div>
            )
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={10} className={classes.grid}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow variant={{type: 0}}/>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow variant={{type: 1}}/>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow variant={{type: 2}}/>
                </Grid>
            </Grid>
        </div>
    );
}

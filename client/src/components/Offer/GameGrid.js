import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import dota from "../../resources/game_grid/dota2.jpg";
import csgo from "../../resources/game_grid/csgo.jpg";
import lol from "../../resources/game_grid/lol.jpg";

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
        width: "250px !important",
        height: "125px !important",
    },
    imageStyleSelected: {
        width: "250px !important",
        height: "125px !important",
        border: "2px solid #90caf9",
    },
    grid: {
        padding: 40
    }
}));

let games = [
    {name: "DotA 2", selected: false},
    {name: "CS:GO", selected: false},
    {name: "LoL", selected: false}
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
        console.log(game);
        games = games.map(gameArray => {
            if (gameArray.name === game) {
                return {name: game, selected: true};
            } else {
                return gameArray;
            }
        });
        console.log(games);
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
        } else {
            console.log(game);
            console.log("error in gamegrid")
            return (
                <div>{game}</div>
            )
        }
    }

    function FormRow() {
        return (
            <React.Fragment>
                <Grid item xs={4}>
                    <Game game={games[0]}/>
                </Grid>
                <Grid item xs={4}>
                    <Game game={games[1]}/>
                </Grid>
                <Grid item xs={4}>
                    <Game game={games[2]}/>
                </Grid>
            </React.Fragment>
        );
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1} className={classes.grid}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow/>
                </Grid>
            </Grid>
        </div>
    );
}

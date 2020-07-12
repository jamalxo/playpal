import React, {useState} from 'react';
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
    {name: "dota", selected: false},
    {name: "csgo", selected: false},
    {name: "lol", selected: false}
];

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

export default function GameGrid(props) {
    const classes = useStyles();
    const forceUpdate = useForceUpdate();

    let counter = 20;

    const handleSelect = (val) => {
        if (games[val].selected === true) {
            games[val].selected = false;
        } else {
            games = games.map(game => {
                return {name: game.name, selected: false};
            });
            games[val].selected = true;

        }
        forceUpdate();
    };

    function Game(game) {
        game = game.game;
        if (game.name === "dota") {
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
        } else if (game.name === "csgo") {
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
        } else if (game.name === "lol") {
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
            console.log("error in gamegrid")
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

"use strict";

import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {Button} from "react-md";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./ReviewField.css";
import {withStyles} from "@material-ui/core/styles";

const useStyles = (theme) => ({
    root: {
        background: theme.palette.primary.lighter,
    },
    reviewTitle: {
        paddingLeft: 15
    },
    reviewTextField: {
        padding: 5
    }
});

class ReviewField extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 0,
            text: ''
        };

        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChangeInput(target, value) {
        this.setState({
            [target]: value
        });
    }


    handleSubmit(event) {
        event.preventDefault();

        let review = this.state;
        this.props.onSubmit(review);


        this.setState({
            rating: 0,
            text: ''
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Grid container alignItems="center">
                        <Grid item xs={3}>
                            <Typography variant={"h5"} className={classes.reviewTitle} color={"inherit"}>
                                Your Review
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Rating
                                name={"review"}
                                value={this.state.rating}
                                size={"large"}
                                onChange={(event, newValue) => {
                                    this.setState( {rating: newValue});
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} className={classes.reviewTextField}>
                            <TextField
                                id="outlined-basic"
                                label="Write your Review..."
                                variant="outlined"
                                fullWidth
                                multiline={true}
                                rows={3}
                                value={this.state.text}
                                onChange={(inp) => this.handleChangeInput('text', inp.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} align={"right"}>
                            <Button
                                id="submit"
                                type="submit"
                                onClick={this.handleSubmit}
                                disabled={this.state.text == undefined || this.state.text == ''}
                                raised
                                primary
                                className="md-cell md-cell--2"
                                style={{borderRadius: 25}}
                            > Submit </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}
export default withStyles(useStyles)(ReviewField);

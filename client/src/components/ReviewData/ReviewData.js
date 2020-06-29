"use strict";

import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./ReviewData.css";


export class ReviewData extends React.Component {

    constructor(props) {
        super(props);
        this.state = props;
    }

    render() {
        return (
            <div className="data">
                <Card>

                </Card>
            </div>
        );
    }
}
/*

                    <CardContent>
                        <Grid container>
                            <Grid item xs={3}>
                                <Typography variant={"h5"} className="reviewTitle">
                                    Your Review
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Rating
                                    value={this.state.review.rating}
                                    size={"large"}
                                    disabled
                                    className="rating"
                                />
                            </Grid>
                            <Grid item xs={12} className="grid">
                                <TextField
                                    id="outlined-basic"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="filled"
                                    fullWidth
                                    multiline={true}
                                    rows={3}
                                    value={this.state.review.review}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
 */

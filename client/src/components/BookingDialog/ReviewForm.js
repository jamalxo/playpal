import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";


export default function ReviewForm(props){
    return (
        <React.Fragment>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
            >

            <Typography variant="h6" gutterBottom>
                Order summary
            </Typography>
            </Grid>
            <div style={{margin:20}}>
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        <Typography variant="h6" gutterBottom>
                            Game of {props.offer.game} with {props.profile.username}
                        </Typography>

                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="flex-end"
                        alignItems="flex-end"
                    >
                        <Typography variant="h6" gutterBottom>
                            ${props.offer.price}
                        </Typography>

                    </Grid>
            <Typography variant="h6" gutterBottom>
                Total
            </Typography>
            <Grid
                container
                direction="column"
                justify="flex-end"
                alignItems="flex-end"
            >
                <Typography variant="h6" gutterBottom>
                    ${props.offer.price}
                </Typography>

            </Grid>
            </div>

        </React.Fragment>
    )
}

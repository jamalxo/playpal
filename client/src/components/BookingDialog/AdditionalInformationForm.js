import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";


export default function AdditionalInformationForm(props){

    const handleChangeDiscordTag = (event) =>{
        props.setDiscordTag(event.target.value)
    }
    const handleChangeMessage = (event) =>{
        props.setMessage(event.target.value)
    }

    return (    <React.Fragment>

        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Typography variant="h6" gutterBottom >
                Additional Information
            </Typography>

                <TextField
                    required
                    id="discordName"
                    name="discordName"
                    label="Discord Name"
                    style={{width:400}}
                    autoComplete="given-name"
                    value={props.discordTag}
                    onChange={handleChangeDiscordTag}
                />
                <TextField
                    id="message"
                    name="message"
                    label="Message to the Pro"
                    style={{width:400}}
                    value={props.message}
                    onChange={handleChangeMessage}
                    rows={4}
                    multiline
                    autoComplete="given-name"
                />
        </Grid>
    </React.Fragment>)
}
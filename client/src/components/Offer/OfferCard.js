import React, {useEffect, useState} from 'react';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import {makeStyles} from "@material-ui/core/styles";
import UserService from "../../services/UserService";
import ProfileService from "../../services/ProfileService";

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'theme.palette.primary.dark',
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    description: {
        height: '100%'
    }
}));


export default function OfferCard(props){
    const classes = useStyles();
    const [profile, setProfile] = useState({});
    const [ProfileCard, setProfileCard] = useState(<div>Loading</div>);

    useEffect(() => {    // Update the profile value on mount
           async function getProfile(){
               return await ProfileService.getProfile(props.owner)
               }
           setProfile(getProfile())
           setProfileCard(
               <div>
           <Avatar
               className="profilePicture"
               alt={profile.username}
               title={profile.username}
               src={profile.profileImage}/>
           <Typography variant="h2" component="h2">
               {profile.username}
           </Typography>
               </div>
           )

    },[]);

    return (
        <MuiThemeProvider theme={theme}>
            <Card classes={{root: classes.root}} className="profileCard" key={props.key}>
                <CardActionArea className={classes.description}>
                    <CardContent align="center">
                        {ProfileCard}
                    </CardContent>
                    <Divider variant="middle"/>
                    <CardContent align="center">
                        <Typography variant="h5">
                            {props.price} $
                        </Typography>
                    </CardContent>
                    <Divider variant="middle"/>
                    <CardContent align="center">
                        <Typography variant="h6">
                            Game
                        </Typography>
                        <Typography variant="body1" color="textPrimary" component="p">
                            {props.game}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </MuiThemeProvider>
    );

}

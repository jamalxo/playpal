import React, {useEffect, useState} from 'react';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import ProfileService from "../../services/ProfileService";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import './OfferCard.css';
import LoL from '../../resources/games/lol.png'
import Dota from '../../resources/games/dota2.png'
import CSGO from '../../resources/games/csgo.png'
import Search from "../../resources/suche.svg";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookingDialog from "../BookingDialog/BookingDialog";
import RequestService from "../../services/RequestService";
import {getGameIcon} from "../../services/IconService";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'theme.palette.primary.lighter',
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    description: {
        height: '100%'
    },
    bookButton: {
        paddingRight: '10px'
    },
    bookPrice: {
        paddingLeft: '10px'
    },
    imageStyle: {
        width: 40,
        height: 40,
        marginRight: '10px'

    },
    avatar: {
        width: 100,
        height: 100,
    },
    link: {
        margin: 10,
        marginTop: 10
    },
    card: {
        backgroundColor: theme.palette.primary.lighter,
        flexGrow: 1,
        width: "280px",
        height: "350px",
    },
    divider: {
        backgroundColor: theme.palette.primary.contrastText
    },
}));


export default function OfferCard(props){
    const classes = useStyles();
    const [profile, setProfile] = useState({})
    const [dialogOpen, setDialog] = useState(false)
    useEffect( () => {    // Update the profile value on mount
        const fetchdata = async () =>
        {
            const newprof = await ProfileService.getProfile(props.offer.owner)
            setProfile(newprof)
        }

        fetchdata()

    }, []);

    const displayVerifiedIcon = () => {
        if (profile.usertype === "professional") {
            return (
                <Tooltip title="Professional Gamer" aria-label="pro">
                    <VerifiedUserIcon fontSize="small" className="verifiedIcon"/>
                </Tooltip>

            );
        } else {
            return '';
        }
    };
    const handleClose = () => {
        setDialog(false)
    }
    const BookOrEditButton = (props.offer.owner === UserService.getCurrentUser().id) ?

            <Link className={classes.link}  to={`/offer/edit/${props.id}`}>
                <Button color="primary">
                    Edit
                </Button>
                </Link>
                : <Button color="secondary" onClick={() => {
            setDialog(true);
        }}>
            Book
        </Button>



    return (
        <MuiThemeProvider theme={theme}>
            <Card classes={{root: classes.card}} className="OfferCard" key={props.key}>
                <CardActionArea className={classes.description}>
                    <CardContent align="center">
                        <Link className="linkDecoration" to={`/user/${profile._id}`}>
                            <Avatar className="profilePicture"
                                    alt={profile.username}
                                    title={profile.username}
                                    src={profile.profileImage}/>
                        </Link>
                        <Typography variant="h5" component="h5" color={'inherit'}>
                            {profile.username}
                            {displayVerifiedIcon()}
                        </Typography>
                    </CardContent>

                    <Divider className={classes.divider} variant="middle"/>

                    <CardContent align="center">
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                                <CardMedia src={getGameIcon(props.offer.game)} component="img" className={classes.imageStyle}/>
                                <Typography variant="h4" component="h4">
                                    {props.offer.game}
                                </Typography>
                        </Grid>
                    </CardContent>

                    <Divider className={classes.divider} variant="middle"/>

                    <CardActions disableSpacing>
                        <Grid container direction="column" justify="flex-start" alignItems="flex-start"
                              className={classes.bookPrice}>
                            <Typography variant="h4" color="textPrimary">
                                ${props.offer.price}
                            </Typography>
                        </Grid>
                        <Grid className={classes.bookButton}
                              container
                              direction="column"
                              justify="flex-end"
                              alignItems="flex-end">
                            {BookOrEditButton}
                        </Grid>
                    </CardActions>
                </CardActionArea>
            </Card>
            <BookingDialog open={dialogOpen} handleClose={handleClose} offer={props.offer} profile={profile}/>
        </MuiThemeProvider>
    );

}
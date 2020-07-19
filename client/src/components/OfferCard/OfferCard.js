import React, {useEffect, useState} from 'react';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import ProfileService from "../../services/ProfileService";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Tooltip from "@material-ui/core/Tooltip";
import BookingDialog from "../BookingDialog/BookingDialog";
import {getGameIcon} from "../../services/IconService";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import Verified from "../../resources/ProfileIcons/verified_gamer.png";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OfferService from "../../services/OfferService";

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'theme.palette.primary.lighter',
        flexGrow: 1,
    },
    offerCard: {
        width: 280,
        height: 350
    },
    title: {
        flexGrow: 1,
    },
    description: {
        paddingTop: 15
    },
    bookButton: {
        paddingRight: '10px'
    },
    bookPrice: {
        paddingLeft: '10px'
    },
    verified:
        {
            width: 20,
            height: 20,
            marginLeft: 5
        },
    imageStyle: {
        width: 40,
        height: 40,
        marginRight: '10px'

    },
    game: {
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
    button: {
        backgroundColor: theme.palette.primary.lightest,
        color: theme.palette.primary.contrastText,
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    linkDecoration: {
        textDecoration: "none"
    },
    profilePicture: {
        width: 50,
        height: 50,
        backgroundColor: theme.palette.primary.light
    },
    perGame: {
        paddingLeft: 5,
    },
    dollar: {
        color: "#fcad3a"
    },
    deleteIcon: {
        cursor: "pointer"
    }
}));

function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

function refreshPage() {
    window.location.reload(false);
}

export default function OfferCard(props) {
    const classes = useStyles(theme);
    const [profile, setProfile] = useState({})
    const [dialogOpen, setDialog] = useState(false)
    const forceUpdate = useForceUpdate();
    useEffect(() => {    // Update the profile value on mount
        const fetchdata = async () => {

            const newprof = await ProfileService.getProfile(props.offer.owner)
            setProfile(newprof)
        }

        fetchdata()

    }, []);

    const displayVerifiedIcon = () => {
        return (
            <Tooltip title="Professional Gamer" aria-label="pro">
                <img src={Verified} alt="Logo" className={classes.verified}/>
            </Tooltip>
        );

    };

    const deleteOffer = async () => {
        const deleteOffer = await OfferService.deleteOffer(props.offer._id);
        refreshPage();
    }

    const handleClose = () => {
        setDialog(false)
    }
    const BookOrEditButton = (props.offer.owner === UserService.getCurrentUser().id) ?

        <Link className={classes.link} to={`/offer/edit/${props.offer._id}`}>
            <Button className={classes.button} color="primary" variant="contained">
                Edit
            </Button>
        </Link>
        : <Button color="secondary" className={classes.button} onClick={() => {
            setDialog(true);
        }}>
            Book
        </Button>

    const DeleteButton = (props.offer.owner === UserService.getCurrentUser().id) ?

        <DeleteOutlineIcon onClick={deleteOffer} className={classes.deleteIcon}/>
        : null


    return (
        <MuiThemeProvider theme={theme}>
            <Card classes={{root: classes.card}} className={classes.offerCard} key={props.key}>
                <div className={classes.description}>

                    <CardContent align="center">
                        <CardMedia src={getGameIcon(props.offer.game)} component="img"
                                   className={classes.game}
                        />
                        <Typography variant="h4" component="h4" color="textPrimary">
                            {props.offer.game}
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

                            <Link className={classes.linkDecoration} to={`/user/${profile._id}`}>
                                <Avatar className={classes.profilePicture}
                                        alt={profile.username}
                                        title={profile.username}
                                        src={profile.profileImage}
                                        className={classes.imageStyle}/>
                            </Link>
                            <Typography variant="h4" component="h5" color="textPrimary">
                                {profile.username}
                                {displayVerifiedIcon()}
                            </Typography>
                        </Grid>
                    </CardContent>

                    <Divider className={classes.divider} variant="middle"/>

                    <CardActions disableSpacing>
                        <Grid container direction="row" justify="flex-start" alignItems="flex-end"
                              className={classes.bookPrice}>
                            <Typography variant="h4" color="textPrimary" className={classes.dollar}>
                                ${props.offer.price}
                            </Typography>
                            <Typography variant="subtitle1" color="textPrimary" className={classes.perGame}>
                                /Game
                            </Typography>
                        </Grid>
                        <Grid className={classes.bookButton}
                              container
                              direction="row"
                              justify="center"
                              alignItems="center">
                            {DeleteButton}
                            {BookOrEditButton}
                        </Grid>
                    </CardActions>
                </div>
            </Card>
            <BookingDialog open={dialogOpen} handleClose={handleClose} offer={props.offer} profile={profile}/>
        </MuiThemeProvider>
    );

}

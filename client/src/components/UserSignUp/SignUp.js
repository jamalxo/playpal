import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import UserService from "../../services/UserService";
import Banner from "../../resources/console.svg";
import Paper from "@material-ui/core/Paper";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                PlayPal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: theme.palette.primary.lighter,
        color: theme.palette.primary.contrastText
    },
    imageStyle: {
        width: 50,
        height: 50
    },
    paperBackground: {
        padding: 30,
        width: "75%"
    },
    grid: {
        paddingTop: theme.spacing(8),
    }
}));

export default function SignUp(props) {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        description: '',
        usertype: '',
        profileImage: '',
    })
    const history = props.history

    const handleChangeInput = (target, value) => {
        setFormState({
            ...formState,
            [target]: value
        });

    }
    const signup = async (e) => {
        try {
            e.preventDefault()
            console.log("works")
            const user = new FormData();
            user.append('username', formState.username);
            user.append('password', formState.password);
            user.append('email', formState.email);
            user.append('usertype', formState.usertype);
            user.append('firstname', formState.firstname);
            user.append('lastname', formState.lastname);
            user.append('description', formState.description);
            user.append('profileImage', formState.profileImage);
            console.log(Array.from(user.values()))

            let ret = await UserService.register(user);
            console.log(ret)

            setTimeout(function () {
                history.push('/')
            }, 100);
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <MuiThemeProvider theme={theme}>
            {/*<Container component="main" maxWidth="xl">*/}
            <Grid container item alignItems="center" justify="center" className={classes.grid}>
                <CssBaseline/>
                <Paper className={classes.paperBackground}>
                    <div className={classes.paper}>
                        <img src={Banner} alt="Logo" className={classes.imageStyle}/>
                        <Typography component="h1" variant="h5">
                            Sign up to PlayPal
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={signup}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstname"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={(inp) => handleChangeInput('firstname', inp.target.value)}
                                        value={formState.firstname}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastname"
                                        autoComplete="lname"
                                        onChange={(inp) => handleChangeInput('lastname', inp.target.value)}
                                        value={formState.lastname}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={(inp) => handleChangeInput('username', inp.target.value)}
                                        value={formState.username}

                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(inp) => handleChangeInput('email', inp.target.value)}
                                        value={formState.email}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={(inp) => handleChangeInput('password', inp.target.value)}
                                        value={formState.password}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="Description"
                                        id="DescriptionField"
                                        name="description"
                                        type="text"
                                        className="md-row"
                                        required={false}
                                        multiline
                                        fullWidth
                                        rows={4}
                                        onChange={(inp) => handleChangeInput('description', inp.target.value)}
                                        value={formState.description}

                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Playertype</FormLabel>
                                        <RadioGroup aria-label="usertype" name="usertype" required
                                                    onChange={(inp) => handleChangeInput('usertype', inp.target.value)}
                                                    value={formState.usertype}
                                        >
                                            <FormControlLabel value="professional" control={<Radio/>}
                                                              label="Professional Player"/>
                                            <FormControlLabel value="casual" control={<Radio/>} label="Casual Player"/>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>

                                    <div style={{paddingLeft: '10px'}}>
                                        <div style={{paddingRight: '10px'}}>
                                            Profile Picture:
                                        </div>
                                        <input type="file" name="profileImage" accept=".png, .jpg, .jpeg"
                                               onChange={(inp) => handleChangeInput('profileImage', inp.target.files[0])}/>
                                    </div>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/#/login" variant="body2" color="textPrimary">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                <Box mt={5}>
                    <Copyright/>
                </Box>
                </Paper>
            </Grid>
            {/*</Container>*/}
        </MuiThemeProvider>
    );
}

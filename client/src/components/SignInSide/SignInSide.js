import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import UserService from "../../services/UserService";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import Banner from "../../resources/console.svg";

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
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
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
}))

export default function SignInSide(props) {
    const classes = useStyles();
    const [formState, setFormState] = useState({
        username: '',
        password: '',
        errorFlag: false,
        errorTextUsername: '',
    })

    const history = props.history

    const handleChangeInput = (target, value) => {
        validateInput(target, value);
        if (!formState.errorFlag) {
            setFormState({
                ...formState,
                [target]: value
            });
        }
        formState.errorFlag = false;
    }

    const validateInput = (target, value) => {
        if (target === 'username') {
            // username must begin with a letter, but can contain numbers afterwards
            // username can not be longer than 10 chars
            var usernameRegex = /^([A-Za-z][A-Za-z0-9]*)*$/;
            if (value.length > 10 || !usernameRegex.test(value)) {
                formState.errorFlag = true;
            }
        }
    }

    const validateInputBeforeSubmit = () => {
        let errorTextUsername = '';
        if (formState.username.length < 3) {
            formState.errorFlag = true;
            errorTextUsername = 'Username must at least be 3 characters long!'
        }
        if (formState.errorFlag) {
            setFormState({
                ...formState,
                errorTextUsername: errorTextUsername
            });
        }
    }


    const login = async (e) => {
        try {
            e.preventDefault()
            validateInputBeforeSubmit();
            if (!formState.errorFlag) {
                let ret = await UserService.login(formState.username, formState.password)
                setTimeout(function () {
                    history.push('/')
                }, 100);
            }
            formState.errorFlag = false;
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <MuiThemeProvider theme={theme}>

            <Grid container component="main" className={classes.root}>
                <CssBaseline/>
                <Grid item xs={false} sm={4} md={7} className={classes.image}/>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <img src={Banner} alt="Logo" className={classes.imageStyle}/>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={login}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={formState.username}
                                onChange={(inp) => handleChangeInput('username', inp.target.value)}
                                helperText={formState.errorTextUsername}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={formState.password}
                                onChange={(inp) => handleChangeInput('password', inp.target.value)}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={formState.username === '' || formState.password === ''}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2" color="textPrimary">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/#/register" variant="body2" color="textPrimary">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright/>
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
}

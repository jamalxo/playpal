import {createMuiTheme} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";


export const theme = createMuiTheme({
    type: 'dark',
    typography: {
        color: grey[50],
    },
    palette: {
        text: {
            primary: grey[50],
            secondary: grey[50],
        },
        primary: {
            main: '#303030',
            dark: grey[900],
            light: grey[800],
            lighter: grey[700],
            lightest: grey[600],
            contrastText: grey[50],
            textColor: grey[50],
            white: grey[50]
        },
        secondary: {
            main: blue[200],
            light: blue[200],
            contrastText: blue[200],
            textColor: blue[200],
            color: blue[200],
        },
        third: {
            main: 'white',
            light: grey[800],
            contrastText: grey[50],
        },
        indicatorColor: blue[500],
        cardColor: grey[400]
    },
    overrides: {
        MuiList: {
            root: {
                backgroundColor: grey[800],
            },
        },
        MuiPaper: {
            root: {
                backgroundColor: grey[800],
            },
        },
        MuiSelect: {
            root: {
                '&:before': {
                    borderColor: 'white',
                    borderBottom: '1px solid white'

                },
                '&:after': {
                    borderColor: 'white',
                    borderBottom: '1px solid white'

                }
            }
        },
        MuiInput: {
            // root: {
                underline: {
                    '&:before': {
                        borderBottom: '1px solid white'
                    },
                    '&:after': {
                        borderBottom: `2px solid #90caf9`
                    },
                    '&:hover:not($disabled):not($focused):not($error):before': {
                        borderBottom: `2px solid #90caf9`
                    }
                }
            // }
        },
        MuiInputLabel: { // Name of the component ⚛️ / style sheet
            root: { // Name of the rule
                color: 'white',
                "&$focused": { // increase the specificity for the pseudo class
                    color: blue[200]
                }
            }
        }
    }
});

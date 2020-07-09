import {createMuiTheme, hexToRgb} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";


export const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[700],
            dark: grey[800],
            light: grey[400],
            contrastText: grey[50],
            white: purple[50],
        },
        secondary: {
            main: '#90caf9',
            light: purple[50],
            // dark: will be calculated from palette.secondary.main,
            contrastText: purple[50],
            textColor: purple[50]
        },
        third: {
            main: 'white',
            light: purple[800],
            // dark: will be calculated from palette.secondary.main,
            contrastText: purple[50],
        },
        indicatorColor: blue[500],
        cardColor: grey[400]
    },
});

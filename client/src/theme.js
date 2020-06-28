import {createMuiTheme} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";

export const theme = createMuiTheme({
    palette: {
        primary: {
            light: purple[100],
            main: purple[500],
            dark: purple[900],
            contrastText: purple[50],
        },
        secondary: {
            light: purple[100],
            main: purple[500],
            dark: purple[900],
            contrastText: purple[50],
        },
    }
});

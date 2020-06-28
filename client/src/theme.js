import {createMuiTheme} from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: '#f44336',
        },
    },
});

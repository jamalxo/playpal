import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {withStyles} from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = (theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
});

class GlobalError extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.open !== undefined) {
            this.state = {
                open: this.props.open,
                vertical: 'top',
                horizontal: 'right',
                error: false
            };
        } else {
            this.state = {
                open: true,
                vertical: 'top',
                horizontal: 'right',
                error: false
            };
        }

        this.handleClose = this.handleClose.bind(this);

    }

    handleClose() {
        this.setState(() => ({
            open: false
        }));
    }

    render() {
        const {classes} = this.props;

        const show = this.state.open;

        return (
            <div className={classes.root}>
                <Snackbar open={show} autoHideDuration={6000} onClose={this.handleClose} anchorOrigin={{
                    vertical: this.state.vertical, horizontal: this.state.horizontal
                }}>
                    <Alert onClose={this.handleClose} severity="success">
                        This is a success message!
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default withStyles(useStyles)(GlobalError);


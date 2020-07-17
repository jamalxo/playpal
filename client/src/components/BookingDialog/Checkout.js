import AdditionalInformationForm from "./AdditionalInformationForm";
import PaymentForm from "./PaymentForm";
import ReviewForm from "./ReviewForm";
import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {ThemeProvider as MuiThemeProvider} from "@material-ui/styles";
import {theme} from "../../theme";
import Grid from "@material-ui/core/Grid";
import RequestService from "../../services/RequestService";

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.primary.lightest,
        color: theme.palette.primary.contrastText,
        margin: theme.spacing(1),
    },

}));
const steps = ['Additional Information', 'Payment details', 'Review your order'];
export default function Checkout(props) {
    const classes = useStyles(theme);
    const [activeStep, setActiveStep] = React.useState(0);
    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };
    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AdditionalInformationForm />;
            case 1:
                return <PaymentForm />;
            case 2:
                return <ReviewForm offer={props.offer} profile={props.profile}/>;
            default:
                throw new Error('Unknown step');
        }
    }
    const handleBooking = async () => {
        let res = await RequestService.createRequest(props.offer._id)
        handleNext()
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    return(
        <MuiThemeProvider theme={theme}>

        <Paper>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
        <Stepper activeStep={activeStep} >
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    <React.Fragment>
        {activeStep === steps.length ? (
            <React.Fragment>
                <div style={{margin:20}}>
                <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                    {props.profile.username} has been notified and will contact you soon.
                </Typography>
                </div>
                <Grid container alignItems="center"   justify="flex-end">
                    <Button onClick={props.handleClose} className={classes.button}>
                        OK
                    </Button>

                </Grid>
            </React.Fragment>
    ):(
            <React.Fragment>
                {getStepContent(activeStep)}
                <Grid container alignItems="center"   justify="flex-end">
                    {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                            Back
                        </Button>
                    )}
                    {activeStep == 0 && (
                        <Button onClick={props.handleClose} className={classes.button}>
                            Cancel
                        </Button>
                    )}
                    {activeStep === steps.length - 1 ?
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBooking}
                                className={classes.button}
                            >
                                Place Order
                            </Button>
                        :
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            className={classes.button}
                        >
                            Next
                        </Button>


                    }
                </Grid>
            </React.Fragment>
        )}</React.Fragment>
    </Paper>
        </MuiThemeProvider>)
}
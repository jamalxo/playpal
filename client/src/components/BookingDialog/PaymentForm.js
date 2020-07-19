import React from 'react';
import Grid from "@material-ui/core/Grid";
import {PayPalButton} from "react-paypal-button-v2";

export default function PaymentForm() {
    const [selectedValue, setSelectedValue] = React.useState('a');
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (<React.Fragment>
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >

            <PayPalButton
                amount="0.01"
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                            orderID: data.orderID
                        })
                    });
                }}
            />
        </Grid></React.Fragment>);
}

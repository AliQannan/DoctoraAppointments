import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalPayment() {
  return (
    <PayPalScriptProvider options={{ "client-id": "ATd74Zsu6WIE7LmIOFbQcL9pAbRteT_b1Gz762anVSoV8ivLpx5ji6OuA8ViZle0uoF49sbdOKfq79AM" }}>
      <div>
        <h2>Pay with PayPal</h2>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "100.00",  // Replace with the actual amount
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert("Payment successful: " + details.payer.name.given_name);
            });
          }}
          onError={(err) => {
            console.error("Error: ", err);
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;

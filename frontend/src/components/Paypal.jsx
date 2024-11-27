import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useParams } from "react-router-dom";

function PayPalPayment() {
  const { fees } = useParams();

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ATd74Zsu6WIE7LmIOFbQcL9pAbRteT_b1Gz762anVSoV8ivLpx5ji6OuA8ViZle0uoF49sbdOKfq79AM",
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            <span className="text-blue-500">Pay with</span> PayPal
          </h2>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: fees, // Replace with the actual amount
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
          <p className="text-sm text-gray-600 mt-4 text-center">
            Secure payment powered by <span className="font-semibold">PayPal</span>.
          </p>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}

export default PayPalPayment;

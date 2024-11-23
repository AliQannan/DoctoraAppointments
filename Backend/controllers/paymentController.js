import paypal from "@paypal/checkout-server-sdk";

// Create PayPal environment
const environment = new paypal.core.SandboxEnvironment("ATd74Zsu6WIE7LmIOFbQcL9pAbRteT_b1Gz762anVSoV8ivLpx5ji6OuA8ViZle0uoF49sbdOKfq79AM", "EAtCSm5k1HkioDehaz1jv20mHX7smYRtZIBRSi0bUGVQuNKJRDReITqxH1dGrsNfCSLrBUaY-M01blHx");
const client = new paypal.core.PayPalHttpClient(environment);

const paymentPaypal = async( req ,res)=>{
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '100.00'
          }
        }
      ]
    });
  
    try {
      const order = await client.execute(request);
      res.json({ id: order.result.id });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating order');
    }
}
export {paymentPaypal}  ;

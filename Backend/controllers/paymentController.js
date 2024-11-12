// import paypal from '@paypal/checkout-server-sdk';
// import appointmentModel from '../models/appointmentModel';

// // Initialize PayPal
// // const paypalEnvironment = new paypal.core.SandboxEnvironment(
// //     process.env.PAYPAL_CLIENT_ID,
// //     process.env.PAYPAL_SECRET
// // );
// // const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);

// const paymentPayPal = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;
//         const appointmentData = await appointmentModel.findById(appointmentId);

//         if (!appointmentData || appointmentData.cancelled) {
//             return res.json({ success: false, message: "Appointment cancelled or not found" });
//         }

//         // Set the payment amount in PayPal's expected format
//         const amount = (appointmentData.amount).toFixed(2);

//         // Create PayPal order
//         const request = new paypal.orders.OrdersCreateRequest();
//         request.prefer("return=representation");
//         request.requestBody({
//             intent: "CAPTURE",
//             purchase_units: [{
//                 amount: {
//                     currency_code: process.env.CURRENCY,
//                     value: amount
//                 }
//             }]
//         });

//         // Execute PayPal order creation
//         const order = await paypalClient.execute(request);
//         res.json({ success: true, order: order.result });

//     } catch (err) {
//         res.json({ success: false, message: err.message });
//     }
// };

// export { paymentPayPal };

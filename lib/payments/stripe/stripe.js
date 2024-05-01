require('dotenv').config();

const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function createPayment(amount) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });

  return paymentIntent;
}

async function createCheckoutSession() {
  
}

module.exports = {
  createPayment,
}
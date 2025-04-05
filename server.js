require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Initialize Stripe

const app = express();

// Enable CORS for requests from your frontend origin
// TODO: In production, restrict the origin to your actual frontend URL
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Simple route for testing the server
app.get('/', (req, res) => {
  res.send('Yoovee Store Backend is running!');
});

// Endpoint for creating payment intents
app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Amount should be in cents

  // Basic validation
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).send({ error: 'Invalid amount provided.' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Use the amount from the request body
      currency: 'aud', // Change currency if needed
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

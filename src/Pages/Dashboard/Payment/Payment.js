import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutFrom from "./CheckoutFrom";
import { useLocation } from "react-router-dom";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const Payment = () => {
  const location = useLocation();
  const price = parseFloat(location.state.data.price).toFixed(2);
  const classes = location.state.data;
  return (
    <div>
      <h1 className="font-bold text-2xl my-3">Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutFrom price={price} classes={classes} />
      </Elements>
    </div>
  );
};

export default Payment;

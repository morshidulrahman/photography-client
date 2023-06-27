import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from "../../../Providers/AuthProviders";
import Swal from "sweetalert2";
const CheckoutFrom = ({ price, classes }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, seterror] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [processing, setprocessing] = useState(false);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      seterror(error.message);
    } else {
      seterror("");
    }
    setprocessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.name || "unknown",
            email: user?.email || "unknown",
          },
        },
      });
    if (confirmError) {
      seterror(confirmError.message);
    }
    setprocessing(false);

    if (paymentIntent.status === "succeeded") {
      const payments = {
        email: user?.email,
        price,
        date: new Date(),
        status: "success",
        transactionId: paymentIntent.id,
        classid: classes._id,
        selectedclassId: classes.selectedClassesid,
        className: classes.name,
        availableSeats: classes.availableSeats,
        numberOfStudents: classes.numberOfStudents,
      };
      axiosSecure.post("/payments", payments).then((res) => {
        if (res.data.result.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your payment has been successful",
          });
        }
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="pl-5 ">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="bg-gray-800 text-white px-4 py-2 rounded-md my-5 dark:bg-blue-500 "
        >
          Pay
        </button>
      </form>
      {error && <h1 className="text-red-500 py-5">{error}</h1>}
    </>
  );
};

export default CheckoutFrom;

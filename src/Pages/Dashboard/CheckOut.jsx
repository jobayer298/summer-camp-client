import React, { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const CheckOut = ({  cartData }) => {
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
  console.log(10, cartData);
  const { _id, email, classID, className, image, instructorName, price, seat ,totalEnrolled} =
    cartData || {}
    console.log(price);
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionID, setTransactionID] = useState("");
  const [axiosSecure] = useAxiosSecure();


  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    console.log(card);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }
    console.log(paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      // const transactionID = paymentIntent.id
      setTransactionID(paymentIntent.id);

      const payment = {
        email: user?.email,
        transactionID: paymentIntent.id,
        email,
        classID,
        cartID: _id,
        className,
        image,
        instructorName,
        price,
        seat,
        totalEnrolled,
      };
      axiosSecure("/payment", payment).then((res) => {
        console.log(res.data);
        if (res.data.result.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "payment successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };
  return (
    <div className="grid place-items-center">
      <h2 className="text-4xl font-medium mb-9 border-b-4 border-indigo-500">
        Payment Process
      </h2>
      <form className="w-2/3 shadow-lg p-5" onSubmit={handleSubmit}>
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
          className="btn btn-secondary btn-xs mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {transactionID && (
        <p className="text-green-600">
          Payment successful with transactionID : {transactionID}
        </p>
      )}
    </div>
  );
};

export default CheckOut;

import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { messageTeacher } from "../services";

export default function StripeCheckoutForm({ clientSecret, paymentId, teacherId, message, onSuccess }) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement }
        });

        if (error) {
            alert(error.message);
        } else if (paymentIntent.status === "succeeded") {
            if (message?.trim()) {
                await messageTeacher(teacherId, message);
            }
            alert("Payment successful!");
            onSuccess();
        }
        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={processing}>
                {processing ? "Processing..." : "Pay & Send Message"}
            </button>
        </form>
    );
}

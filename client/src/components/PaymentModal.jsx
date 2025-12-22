import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import { payForLesson } from "../services";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentModal({ show, onClose, lesson, teacherId }) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState("");

    const initializePayment = async () => {
        setLoading(true);
        try {
            const paymentData = await payForLesson(lesson.id, { amount: lesson.price });
            setClientSecret(paymentData.client_secret);
        } catch (err) {
            console.error(err);
            alert("Failed to initialize payment.");
            onClose();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onClose}
            onShow={initializePayment}
        >
            <Modal.Header closeButton>
                <Modal.Title>Pay & Message Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Lesson:</strong> {new Date(lesson.date_time).toLocaleString()}</p>
                <p><strong>Price:</strong> ${lesson.price}</p>
                <Form.Group className="mb-3">
                    <Form.Label>Message to Teacher (optional)</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </Form.Group>

                {clientSecret && (
                    <Elements stripe={stripePromise}>
                        <StripeCheckoutForm
                            clientSecret={clientSecret}
                            paymentId={lesson.paymentId}
                            teacherId={teacherId}
                            message={message}
                            onSuccess={onClose}
                        />
                    </Elements>
                )}

                {loading && <p>Loading payment form...</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

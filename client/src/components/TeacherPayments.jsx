import React, { useEffect, useState } from "react";
import { getTeacherPayments } from "../services";
import { Card } from "react-bootstrap";

export default function TeacherPayments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const data = await getTeacherPayments();
                setPayments(data);
            } catch (err) {
                console.error("Failed to load payments", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    if (loading) return <p>Loading payments...</p>;

    return (
        <div className="mt-4">
            <h3>My Payments</h3>

            {payments.length === 0 ? (
                <p>No payments yet.</p>
            ) : (
                payments.map(payment => (
                    <Card key={payment.id} className="mb-2 p-2">
                        <p><strong>Student:</strong> {payment.student_name}</p>
                        <p><strong>Amount:</strong> ${payment.amount}</p>
                        <p><strong>Lesson Date:</strong> {new Date(payment.lesson_date).toLocaleString()}</p>
                        <p><strong>Status:</strong> {payment.status}</p>
                    </Card>
                ))
            )}
        </div>
    );
}

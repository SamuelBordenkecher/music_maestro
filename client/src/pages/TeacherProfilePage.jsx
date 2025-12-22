import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { getTeacherByID, getTeacherLessons, payForLesson, messageTeacher } from "../services";
import { Card, Button, Modal, Form } from "react-bootstrap";

export default function TeacherProfilePage() {
    const { id } = useParams(); // teacher id from URL
    const { user } = useOutletContext();
    const [teacher, setTeacher] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [message, setMessage] = useState("");
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTeacherByID(id);
                setTeacher(data);

                // Fetch lessons using the new teacher_id path
                const teacherLessons = await getTeacherLessons(id);
                setLessons(teacherLessons);
            } catch (err) {
                console.error(err);
                setError("Teacher not found or failed to load lessons.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleOpenPayment = (lesson) => {
        setSelectedLesson(lesson);
        setMessage(""); // clear previous message
        setShowPaymentModal(true);
    };

    const handleClosePayment = () => {
        setShowPaymentModal(false);
        setSelectedLesson(null);
    };

    const handlePayAndMessage = async () => {
        if (!selectedLesson) return;
        setPaying(true);
        try {
            // Pay for the lesson
            await payForLesson(selectedLesson.id, { amount: selectedLesson.price });

            // Send optional message
            if (message.trim()) {
                await messageTeacher(teacher.id, message);
            }

            alert("Payment successful and message sent!");
            setShowPaymentModal(false);
        } catch (err) {
            console.error("Payment or message failed:", err);
            alert("Something went wrong. Check console.");
        } finally {
            setPaying(false);
        }
    };

    if (loading) return <div>Loading Teacher Profile...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <Link to="/">← Back to Home</Link>
            <h2>{teacher.user.first_name} {teacher.user.last_name}</h2>
            <p><strong>Email:</strong> {teacher.user.email}</p>
            {teacher.distance_miles !== null && <p>Distance: {teacher.distance_miles} miles away</p>}
            <p>{teacher.bio}</p>
            {teacher.instruments.length > 0 && <p>Instruments: {teacher.instruments.map(i => i.name).join(", ")}</p>}
            {teacher.default_rate && <p>Rate: ${teacher.default_rate}/hour</p>}

            <hr />
            <h3>Available Lessons</h3>
            {lessons.length === 0 ? (
                <p>No lessons available.</p>
            ) : (
                lessons.map((lesson) => (
                    <Card key={lesson.id} className="mb-2 p-2">
                        <p><strong>Date:</strong> {new Date(lesson.date_time).toLocaleString()}</p>
                        <p><strong>Duration:</strong> {lesson.duration_minutes} minutes</p>
                        <p><strong>Price:</strong> ${lesson.price}</p>
                        <p><strong>Location:</strong> {lesson.location_type}</p>
                        <p><strong>Status:</strong> {lesson.status}</p>

                        {user?.is_student && lesson.status === "pending" && (
                            <Button onClick={() => handleOpenPayment(lesson)}>Pay & Message Teacher</Button>
                        )}
                    </Card>
                ))
            )}

            {/* Payment Modal */}
            <Modal show={showPaymentModal} onHide={handleClosePayment}>
                <Modal.Header closeButton>
                    <Modal.Title>Pay & Message Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedLesson && (
                        <div>
                            <p><strong>Lesson:</strong> {new Date(selectedLesson.date_time).toLocaleString()}</p>
                            <p><strong>Price:</strong> ${selectedLesson.price}</p>
                            <Form.Group className="mb-3">
                                <Form.Label>Message to Teacher (optional)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePayment}>Cancel</Button>
                    <Button variant="primary" onClick={handlePayAndMessage} disabled={paying}>
                        {paying ? "Processing..." : "Pay & Send Message"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

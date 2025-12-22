import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { getTeacherByID, getTeacherLessons } from "../services";
import { Card, Button } from "react-bootstrap";
import PaymentModal from "../components/PaymentModal";

export default function TeacherProfilePage() {
    const { id } = useParams(); // teacher id from URL
    const { user } = useOutletContext();
    const [teacher, setTeacher] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTeacherByID(id);
                setTeacher(data);

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
        setShowPaymentModal(true);
    };

    const handleClosePayment = () => {
        setShowPaymentModal(false);
        setSelectedLesson(null);
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
            {showPaymentModal && selectedLesson && (
                <PaymentModal
                    show={showPaymentModal}
                    onClose={handleClosePayment}
                    lesson={selectedLesson}
                    teacherId={teacher.id}
                />
            )}
        </div>
    );
}

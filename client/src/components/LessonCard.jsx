import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { createLesson, deleteLesson } from "../services";

export default function LessonCard({ teacherId, lessons, setLessons }) {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        date_time: "",
        duration_minutes: 60,
        price: 50.0,
        location_type: "teacher"
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newLesson = await createLesson(formData);
            setLessons(prev => [...prev, newLesson]);
            setFormData({
                date_time: "",
                duration_minutes: 60,
                price: 50.0,
                location_type: "teacher"
            });
            setShowForm(false);
        } catch (err) {
            console.error("Failed to create lesson:", err);
            alert("Failed to create lesson. Check console.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (lessonId) => {
        if (!window.confirm("Are you sure you want to delete this lesson?")) return;
        try {
            await deleteLesson(lessonId);
            setLessons(prev => prev.filter(l => l.id !== lessonId));
        } catch (err) {
            console.error("Failed to delete lesson:", err);
            alert("Failed to delete lesson.");
        }
    };

    return (
        <div>
            <Button onClick={() => setShowForm(prev => !prev)}>
                {showForm ? "Cancel" : "Create New Lesson"}
            </Button>

            {showForm && (
                <Card className="mt-3 p-3">
                    <Form onSubmit={handleCreate}>
                        <Form.Group className="mb-2">
                            <Form.Label>Date & Time</Form.Label>
                            <Form.Control 
                                type="datetime-local" 
                                name="date_time" 
                                value={formData.date_time} 
                                onChange={handleChange} 
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Duration (minutes)</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="duration_minutes" 
                                value={formData.duration_minutes} 
                                onChange={handleChange} 
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Price ($)</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="price" 
                                value={formData.price} 
                                onChange={handleChange} 
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Location Type</Form.Label>
                            <Form.Select name="location_type" value={formData.location_type} onChange={handleChange}>
                                <option value="teacher">Teacher's location</option>
                                <option value="student">Student's location</option>
                                <option value="remote">Remote</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Lesson"}
                        </Button>
                    </Form>
                </Card>
            )}

            <div className="mt-4">
                {lessons.length === 0 ? (
                    <p>No lessons yet.</p>
                ) : (
                    lessons.map(lesson => (
                        <Card key={lesson.id} className="mb-2 p-2">
                            <p><strong>Date:</strong> {new Date(lesson.date_time).toLocaleString()}</p>
                            <p><strong>Duration:</strong> {lesson.duration_minutes} minutes</p>
                            <p><strong>Price:</strong> ${lesson.price}</p>
                            <p><strong>Location:</strong> {lesson.location_type}</p>
                            <p><strong>Status:</strong> {lesson.status}</p> 
                            {lesson.payment ? (
                                <p> 
                                    Payment: <strong>{lesson.payment.status}</strong> (${lesson.payment.amount}) </p> 
                            ) : ( <p> Payment: Not Paid </p> )
                            }
                            <Button variant="danger" size="sm" onClick={() => handleDelete(lesson.id)}>Delete</Button>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

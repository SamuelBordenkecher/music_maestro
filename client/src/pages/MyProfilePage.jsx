import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { 
    updateTeacherProfile, 
    updateStudentProfile, 
    deleteUser,
    getAllInstruments
} from "../services";

export default function MyProfilePage() {
    const { user } = useOutletContext();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({});
    const [saving, setSaving] = useState(false);
    const [instrumentsOptions, setInstrumentsOptions] = useState([]);

    useEffect(() => {
        const fetchInstruments = async () => {
            try {
                const data = await getAllInstruments();
                setInstrumentsOptions(data);
            } catch (err) {
                console.error("Failed to fetch instruments", err);
            }
        };
        fetchInstruments();
    }, []);

    if (!user) return <div>Please log in.</div>;

    const startEdit = () => {
        setFormData({ ...user });
        setEditMode(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked, options } = e.target;
        if (type === "select-multiple") {
            const selected = Array.from(options).filter(o => o.selected).map(o => parseInt(o.value));
            setFormData(prev => ({ ...prev, [name]: selected }));
        } else {
            setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (user.is_teacher) {
                await updateTeacherProfile({
                    bio: formData.bio,
                    default_rate: formData.default_rate,
                    instruments: formData.instruments || []
                });
            } else {
                await updateStudentProfile({
                    bio: formData.bio,
                    instruments: formData.instruments || [],
                    is_child: formData.is_child,
                    proficiency_level: formData.proficiency_level,
                    learning_goals: formData.learning_goals
                });
            }

            setEditMode(false);
        } catch (err) {
            console.error("Error updating profile:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
        try {
            await deleteUser();
            localStorage.removeItem("user");
            window.location.href = "/auth";
        } catch (err) {
            console.error("Failed to delete account:", err);
            alert("Failed to delete account.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>My Profile</h2>

            {/* User Info (read-only) */}
            <div className="mb-4">
                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
                <p><strong>Zip Code:</strong> {user.zip_code}</p>
                <p><strong>City:</strong> {user.city}</p>
                <p><strong>State:</strong> {user.state}</p>
            </div>

            {/* Profile Edit / Display */}
            {editMode ? (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Bio</Form.Label>
                        <Form.Control as="textarea" rows={3} name="bio" value={formData.bio || ""} onChange={handleChange}/>
                    </Form.Group>

                    {user.is_teacher && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Default Rate</Form.Label>
                                <Form.Control type="number" name="default_rate" value={formData.default_rate || ""} onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Instruments</Form.Label>
                                <Form.Control 
                                    as="select" 
                                    name="instruments" 
                                    multiple 
                                    value={formData.instruments || []} 
                                    onChange={handleChange}
                                >
                                    {instrumentsOptions.map(instr => (
                                        <option key={instr.id} value={instr.id}>
                                            {instr.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </>
                    )}

                    {!user.is_teacher && (
                        <>
                            <Form.Check type="checkbox" label="Child Account" name="is_child" checked={formData.is_child || false} onChange={handleChange}/>
                            <Form.Group className="mb-3">
                                <Form.Label>Proficiency Level</Form.Label>
                                <Form.Select name="proficiency_level" value={formData.proficiency_level || ""} onChange={handleChange}>
                                    <option value="">Select...</option>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Learning Goals</Form.Label>
                                <Form.Control as="textarea" rows={3} name="learning_goals" value={formData.learning_goals || ""} onChange={handleChange}/>
                            </Form.Group>
                        </>
                    )}

                    <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>{" "}
                    <Button variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>{" "}
                    <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
                </Form>
            ) : (
                <div>
                    {user.is_teacher && <p><strong>Rate:</strong> ${user.default_rate}/hour</p>}
                    {user.instruments?.length > 0 && <p><strong>Instruments:</strong> {user.instruments.map(i => i.name).join(", ")}</p>}
                    {!user.is_teacher && <p><strong>Proficiency Level:</strong> {user.proficiency_level || "N/A"}</p>}
                    {!user.is_teacher && <p><strong>Learning Goals:</strong> {user.learning_goals}</p>}

                    <Button onClick={() => setEditMode(true)}>Edit Profile</Button>{" "}
                    <Button variant="danger" onClick={handleDelete}>Delete Account</Button>
                </div>
            )}
        </div>
    );
}

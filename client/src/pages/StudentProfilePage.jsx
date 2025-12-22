import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { getStudentByID } from "../services";


export default function StudentProfilePage() {
    const { id } = useParams();
    const { user } = useOutletContext();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await getStudentByID(id);
                setStudent(data);
            } catch (err) {
                console.error(err);
                setError("Student not found.");
            } finally {
                setLoading(false);
            }
        };
        fetchStudent();
    }, [id]);

    if (loading) return <div>Loading Student Profile</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <Link to="/">← Back to Home</Link>
            <h2>
                {student.user.first_name} {student.user.last_name}
            </h2>
            <p><strong>Email:</strong> {student.user.email}</p>
            {student.distance_miles !== null && user && (
                <p>Distance: {student.distance_miles} miles away</p>
            )}
            <p>Bio: {student.bio || "No bio available."}</p>
            <p>Instruments: {student.instruments.length > 0 ? student.instruments.map(i => i.name).join(", ") : "None listed"}</p>
            {student.proficiency_level && <p>Proficiency: {student.proficiency_level}</p>}
        </div>
    );

}

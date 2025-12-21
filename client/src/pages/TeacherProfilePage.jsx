import React, { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { getTeacherByID } from "../services";


export default function TeacherProfilePage() {
    const { id } = useParams();
    const { user } = useOutletContext();
    const [teacher, setTeacher] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const data = await getTeacherByID(id);
                setTeacher(data);
            } catch (err) {
                console.error(err);
                setError("Teacher not found.");
            } finally {
                setLoading(false);
            }
        };
        fetchTeacher();
    }, [id]);

    if (loading) return <div>Loading Teacher Profile</div>;
    if (error) return <div>{error}</div>

    return (
    <div>
      <Link to="/">← Back to Home</Link>
      <h2>
        {teacher.user.first_name} {teacher.user.last_name}
      </h2>
      {teacher.distance_miles !== null && user && (
        <p>Distance: {teacher.distance_miles} miles away</p>
      )}
      <p>{teacher.bio}</p>
      {teacher.instruments.length > 0 && (
        <p>Instruments: {teacher.instruments.map(i => i.name).join(", ")}</p>
      )}
      {teacher.default_rate && <p>Rate: ${teacher.default_rate}/hour</p>}
    </div>
  );
}
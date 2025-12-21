import React, { useState, useEffect } from "react";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { getAllTeachers } from "../services";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { user } = useOutletContext();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getAllTeachers();
        setTeachers(data);
        setLoading(false)
      } catch (err) {
        console.log("Failed to fetch Teachers");
      }
    };
    fetchTeachers();
  }, []);

  if (loading) return <div> Loading Teachers </div>;
  if (!teachers.length) return <div>No teachers found.</div>;

  return (
  <div>
    <h2>Teachers</h2>
      <ol>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <Link to={`/teachers/${teacher.id}`}>
              {teacher.user.first_name} {teacher.user.last_name}
              {teacher.distance_miles !== null && user && (
                <span> — {teacher.distance_miles} miles away</span>
              )}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";


export default function MyProfilePage() {
    const { user } = useOutletContext();

    if (!user) {
        return <div>Please log in or sign up to view your profile.</div>
    }

    return (
        <div>
            <h2>My Profile</h2>
            <p>
                <strong>Name:</strong> {user.first_name} {user.last_name}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Role:</strong> {user.is_teacher ? "Teacher" : "Student"}
            </p>
            {user.zip_code && (
                <p>
                    <strong>Zip Code:</strong> {user.zip_code}
                </p>
            )}
            {user.city && user.state && (
                <p>
                    <strong>Location:</strong> {user.city}, {user.state}
                </p>
            )}
            {user.date_of_birth && (
                <p>
                    <strong>Age:</strong> {user.age} years
                </p>
            )}
            {user.profile_image && (
                <img
                    src={user.profile_image}
                    alt="Profile"
                    style={{ width: "150px", borderRadius: "8px" }}
                />
            )}
        </div>     
    )
}
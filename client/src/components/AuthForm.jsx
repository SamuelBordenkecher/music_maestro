import { useEffect, useState } from "react";
import { useOutletContext, Navigate, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { logIn, signUp } from "../services";

function AuthForm() {
    const { setUser } = useOutletContext();
    const navigate = useNavigate();

    const [isSignup, setIsSignup] = useState(false);
    const [role, setRole] = useState(null);

    const [email, setEmail] = useState("");
    const [password, Setpassword] = useState("");
    
    
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [zipCode, setZipCode] = useState("");


    const handleAuth = async(e) => {
        e.preventDefault();
        try {
        if (isSignup) {
            if (!role) {
            alert("Please select Teacher or Student");
            return;
            }

            const payload = {
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            zip_code: zipCode,
            is_teacher: role === "teacher",
            is_student: role === "student",
            };

            const respUser = await signUp(payload);
            setUser(respUser);
        } else {
            const respUser = await logIn({ email, password });
            setUser(respUser);
        }
        navigate("/myprofile");
        } catch (err) {
            console.log(err);
            alert("Authentication failed")
        }
    };





  return (
    <Form onSubmit={handleAuth}>
      {/* EMAIL */}
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      {/* PASSWORD */}
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>

      {/* SIGNUP FIELDS */}
      {isSignup && (
        <>
          {/* FIRST NAME */}
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          {/* LAST NAME */}
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          {/* ROLE */}
          <Form.Group className="mb-3">
            <Form.Label>Account Type</Form.Label>
            <Form.Check
              type="radio"
              label="Teacher"
              name="role"
              checked={role === "teacher"}
              onChange={() => setRole("teacher")}
            />
            <Form.Check
              type="radio"
              label="Student"
              name="role"
              checked={role === "student"}
              onChange={() => setRole("student")}
            />
          </Form.Group>

          {/* ZIP CODE */}
          <Form.Group className="mb-3">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </Form.Group>
        </>
      )}

      {/* TOGGLE */}
      <Form.Group className="mb-3">
        <Form.Check
          type="switch"
          label={isSignup ? "I already have an account" : "I don't have an account"}
          checked={isSignup}
          onChange={(e) => {
            setIsSignup(e.target.checked);
            setRole(null);
          }}
        />
      </Form.Group>

      <Button type="submit">
        {isSignup ? "Sign Up" : "Log In"}
      </Button>
    </Form>
  );
}

export default AuthForm;

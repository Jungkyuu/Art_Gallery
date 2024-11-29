import { useState } from "react";
import { registerUser } from "../lib/authenticate";
import { useRouter } from "next/router";
import { Card, Form, Button } from "react-bootstrap";

export default function Register() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await registerUser(userName, password, password2);
            router.push("/login");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <h2>Register</h2>
                    Register for an account:
                </Card.Body>
            </Card>
            <br />
            {error && (
                <Card bg="danger" text="white" className="mb-3">
                    <Card.Body>
                        <strong>Error:</strong> {error}
                    </Card.Body>
                </Card>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control
                        type="text"
                        id="userName"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        id="password2"
                        name="password2"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </Form.Group>
                <br />
                <Button variant="primary" className="pull-right" type="submit">
                    Register
                </Button>
            </Form>
        </>
    );
}

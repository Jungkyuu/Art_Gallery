import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { authenticateUser } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../store";

export default function Login() {
  const [credentials, setCredentials] = useState({ user: "", password: "" });
  const [warning, setWarning] = useState("");
  const router = useRouter();
  const [, setUser] = useAtom(userAtom);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await authenticateUser(
        credentials.user,
        credentials.password
      );
      await setUser(token);
      router.push("/favourites");
    } catch (error) {
      setWarning(error.message);
    }
  };

  return (
    <>
      <Card bg="light">
        <Card.Body>
          <h2>Welcome to log in</h2>
          <p>Enter your login information below please</p>
        </Card.Body>
      </Card>

      <br />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="user">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="user"
            value={credentials.user}
            onChange={handleInputChange}
            placeholder="Enter your username"
          />
        </Form.Group>

        <br />

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
          />
        </Form.Group>

        {warning && (
          <>
            <br />
            <Alert variant="danger">{warning}</Alert>
          </>
        )}

        <br />
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </>
  );
}

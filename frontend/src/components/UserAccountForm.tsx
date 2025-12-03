import { useState } from "react";
import { registerUserAccount, loginUserAccount } from "../api";

export default function UserAccountForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<string>("");

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Registering...");
    try {
      const res = await registerUserAccount({
        username,
        password,
        firstName,
        lastName,
      });
      setStatus(res.message || "Registered successfully");
    } catch (err: any) {
      setStatus(err.message || "Registration failed");
    }
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Logging in...");
    try {
      const res = await loginUserAccount({ username, password });
      setStatus(res.message || "Login successful");
    } catch (err: any) {
      setStatus(err.message || "Login failed");
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
      <h2>User Account</h2>
      <form onSubmit={onRegister} style={{ display: "grid", gap: 8 }}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Register</button>
          <button type="button" onClick={onLogin}>
            Login
          </button>
        </div>
      </form>
      {status && <p style={{ marginTop: 8 }}>{status}</p>}
      <p style={{ fontSize: 12, color: "#666" }}>
        A user account is required to create an appointment.
      </p>
    </div>
  );
}

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (res.ok) {
        // Store token in localStorage
        localStorage.setItem("token", json.token);
        alert("Login successful!");
        router.push("/");
      } else {
        alert(json.error);
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input 
          name="email" 
          type="email" 
          placeholder="Email" 
          onChange={handleChange} 
          required 
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        /><br />
        <input 
          name="password" 
          type="password" 
          placeholder="Password" 
          onChange={handleChange} 
          required 
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        /><br />

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Do not have an account? <Link href="/register">Register here</Link>
      </p>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    setLoading(true);

    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log("Response:", res.data);

    // ✅ Store token + role + name
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);
    localStorage.setItem("name", res.data.name);

    // ✅ Role-based redirect
    if (res.data.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/dashboard"); // you can later create /member-dashboard
    }

  } catch (err) {
    console.error(err);

    const message =
      err.response?.data?.msg ||
      err.response?.data?.message ||
      "Login failed";

    alert(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </div>
  );
}
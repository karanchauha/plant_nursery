// import React, { useState } from "react";
// import API from "../api/api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post("/auth/login", form);
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));
//       navigate("/");
//       window.location.reload();
//     } catch (err) {
//       alert(err?.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded">
//       <h2 className="text-lg font-semibold mb-3">Login</h2>
//       <form onSubmit={submit} className="space-y-3">
//         <input
//           className="w-full p-2 border rounded"
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />
//         <input
//           type="password"
//           className="w-full p-2 border rounded"
//           placeholder="Password"
//           value={form.password}
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />
//         <button className="bg-green-700 text-white px-4 py-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Success alert
      alert("Login successful!");

      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded">
      <h2 className="text-lg font-semibold mb-3">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full p-2 border rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="w-full p-2 border rounded"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-green-700 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

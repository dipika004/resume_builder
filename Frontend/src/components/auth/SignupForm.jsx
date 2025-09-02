import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


export default function Signup() {
const [form, setForm] = useState({ name: "", email: "", password: "" });
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const { signup } = useAuth();
const navigate = useNavigate();


const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


const onSubmit = async (e) => {
e.preventDefault();
setError("");
setLoading(true);
try {
await signup(form);
navigate("/dashboard", { replace: true });
} catch (err) {
setError(err?.response?.data?.message || "Could not create account");
} finally {
setLoading(false);
}
};


return (
<div className="mx-auto max-w-md">
<h2 className="text-2xl font-bold mb-2">Create your account</h2>
<p className="text-sm text-gray-600 mb-6">Start building your resume today.</p>


<form onSubmit={onSubmit} className="space-y-4 bg-white p-6 rounded-2xl border">
<div>
<label className="block text-sm mb-1">Full name</label>
<input
name="name"
value={form.name}
onChange={onChange}
className="w-full rounded-xl border px-3 py-2"
placeholder="Your name"
required
/>
</div>
<div>
<label className="block text-sm mb-1">Email</label>
<input
type="email"
name="email"
value={form.email}
onChange={onChange}
className="w-full rounded-xl border px-3 py-2"
placeholder="you@example.com"
required
/>
</div>
<div>
<label className="block text-sm mb-1">Password</label>
<input
type="password"
name="password"
value={form.password}
onChange={onChange}
className="w-full rounded-xl border px-3 py-2"
placeholder="Minimum 6 characters"
minLength={6}
required
/>
</div>
{error && <p className="text-sm text-red-600">{error}</p>}
<button
type="submit"
disabled={loading}
className="w-full rounded-xl bg-gray-900 text-white py-2 disabled:opacity-60"
>
{loading ? "Creating..." : "Create account"}
</button>
</form>


<p className="text-sm mt-4">
Already have an account? <Link to="/login" className="underline">Login</Link>
</p>
</div>
);
}
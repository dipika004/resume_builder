// src/pages/Login.jsx
import React from "react";
import LoginForm from "../components/auth/LoginForm";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}

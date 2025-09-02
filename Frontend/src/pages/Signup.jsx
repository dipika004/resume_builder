// src/pages/Signup.jsx
import React from "react";
import SignupForm from "../components/auth/SignupForm";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;

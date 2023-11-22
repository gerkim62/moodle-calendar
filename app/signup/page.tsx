"use client";
import Input from '@/components/Input';
import React, { useState } from 'react';

interface SignUpForm {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your logic to handle form submission here, e.g., sending data to server
    console.log(formData); // Temporary: Log form data to the console
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 max-w-[90%]">
      <div className="mb-4">
        <Input
          label="Full Name"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          
        />
      </div>
      <div className="mb-4">
        <Input
          label="Username"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        
        />
      </div>
      <div className="mb-4">
        <Input
          label="Password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
       
        />
      </div>
      <div className="mb-6">
        <Input
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;

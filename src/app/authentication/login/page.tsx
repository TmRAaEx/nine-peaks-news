"use client";
import ISignUserIn from "@/interfaces/ISignUserIn";
import { authClient } from "@/lib/ApiClient";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState<ISignUserIn>({
      email: "",
      password: "",
    });  
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      try {
        const response = await authClient.post<any>("/login", formData);
    
        if (response.error) {
          setError(response.error);
        } else {
          console.log(response.data);
        }
        } catch (err: any) {
          setError(err.message || "Login failed");
      }
  };


  return (
        <>
          <form onSubmit={handleSubmit}>
            <p>{error}</p>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign in!</button>
          </form>
        </>
  );
}
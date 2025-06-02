"use client";
import ISignUserIn from "@/interfaces/ISignUserIn";
import { authClient } from "@/lib/ApiClient";
import { FormEvent, useState } from "react";

export default function Login() {
    const [formData, setFormData] = useState<ISignUserIn>({
      email: "",
      password: "",
    });  
    const [error, setError] = useState<string | null>(null);
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const response = await authClient.get<any>("/login", formData)
      
    if (response.error) {
      setError(response.error);
    }

    console.log(response.data);
  };
  return (
  <>
  <form onSubmit={handleSubmit}>
    <label htmlFor="email">email</label>
    <input type="email" name="email"  />
    <label htmlFor="password">password</label>
    <input type="password" name="password"/>
    <button role="submit">Sign in!</button>  
  </form>
  </>);
}

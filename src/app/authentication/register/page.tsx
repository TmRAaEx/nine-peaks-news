"use client";

import IRegisterData from "@/interfaces/IRegisterFormData";
import { ChangeEvent, FormEvent, useState } from "react";
import { authClient } from "@/lib/ApiClient";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState<IRegisterData>({
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    //TODO remove any
    const response = await authClient.post<any>("/register", formData);

    if (response.error) {
      setError(response.error);
      return;
    }

    router.push("/upgrade")
   
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <p>{error}</p>
        <label htmlFor="userName">username</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="username"
          required
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          required
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
          required
        />
        <label htmlFor="confirm_password">confirm password</label>
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder="confirm password"
          required
        />
        <button role="submit">Register</button>
      </form>
    </>
  );
}

"use client";

import IRegisterData from "@/interfaces/IRegisterFormData";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState<IRegisterData>({
    userName: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();


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
        <label htmlFor="userName">username</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="username"
        />

        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
        />
        <label htmlFor="password">email</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
        />
        <label htmlFor="confirm_password">email</label>
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder="confirm password"
        />
        <button role="submit">Register</button>
      </form>
    </>
  );
}

"use client";

import IRegisterData from "@/interfaces/IRegisterFormData";
import { ChangeEvent, FormEvent, useState } from "react";
import { authClient } from "@/lib/ApiClient";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/components/shared/buttons/Secondarybutton";
import IRegisterApiResponse from "@/interfaces/IRegisterApiResponse";

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

    const response = await authClient.post<IRegisterApiResponse>(
      "/register",
      formData
    );
    if (response.error) {
      setError(response.error);
      return;
    }

    router.push("/upgrade");
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
      <form onSubmit={handleSubmit} className="form">
        <p>{error}</p>
        <h1 className="text-4xl">Sign up</h1>
        <label htmlFor="userName" className="label">
          Username
        </label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          placeholder="username"
          className="input"
          required
        />

        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          className="input"
          required
        />
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
          className="input"
          required
        />
        <label htmlFor="confirm_password" className="label">
          Confirm password
        </label>
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          placeholder="confirm password"
          className="input"
          required
        />
        <div className="text-center space-y-2">
          <label className="inline-flex items-start gap-2 text-sm md:text-base font-medium">
            <input
              type="checkbox"
              name="gdpr_consent"
              required
              className="mt-1 accent-blue-600 w-4 h-4"
            />
            <span>
              I consent to the processing of my data in accordance with the
              <br className="hidden sm:block" />
              <a
                href="./privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium"
              >
                GDPR Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>

        <SecondaryButton>Register</SecondaryButton>
      </form>
    </>
  );
}

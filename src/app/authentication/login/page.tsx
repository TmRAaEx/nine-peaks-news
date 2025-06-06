"use client";
import SecondaryButton from "@/components/shared/buttons/Secondarybutton";
import useSession from "@/hooks/useSession";
import ISignUserIn from "@/interfaces/ISignUserIn";
import { authClient } from "@/lib/ApiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Login() {
  const { session, loading } = useSession();
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
  const router = useRouter();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await authClient.post<any>("/login", formData);

      if (response.error) {
        setError(response.error);
      } else {
        console.log(response.data);
        router.push("/myaccount");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };
  useEffect(() => {
    if (session && !loading) {
      router.push("/myaccount");
    }
  }, [session, loading, router]);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <p>{error}</p>
        <h1 className="text-4xl mb-4">Sign in</h1>

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

        <SecondaryButton>Sign in</SecondaryButton>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            href="/authentication/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </form>
    </>
  );
}

"use client";
import SecondaryButton from "@/components/shared/buttons/Secondarybutton";
import useSession from "@/hooks/useSession";
import ISignUserIn from "@/interfaces/ISignUserIn";
import { authClient } from "@/lib/ApiClient";
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
        router.push("../profile");
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
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              required
            />
            <label htmlFor="password"  className="label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              required
            />
            <SecondaryButton>Sign in</SecondaryButton>
          </form>
        </>
  );
}

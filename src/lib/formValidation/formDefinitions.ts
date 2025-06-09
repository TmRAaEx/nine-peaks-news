import { z } from "zod";

export const SignupFormSchema = z
  .object({
    userName: z
      .string()
      .min(2, { message: "Username must be atleaste 2 characters long!" })
      .trim(),

    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z.string().min(8, { message: "Be at least 8 characters long" }),
    //here we can add .regex() for more secure passwords i.e force number or special char
    confirm_password: z.string(),
    gdpr_consent: z.literal("on", {
      message: "Must consent to gdpr to register",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type SignupFormState =
  | {
      errors?: {
        userName?: string[];
        email?: string[];
        password?: string[];
        confirm_password?: string[];
        gdpr_consent?: string[];
      };
      message?: string;
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string({ message: "Please enter a password" }),
});

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

"use server";

import { SignUserIn } from "@/lib/Authentication";
import { LoginFormSchema, LoginFormState } from "@/lib/formDefinitions";
import { createSession } from "@/lib/Session";


export default async function LoginAction(
  state: LoginFormState,
  formData: FormData
) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;
  const res = await SignUserIn({ email, password });

  if ("error" in res) {
    return { error: res.error};
  }

  await createSession(res.user._id);

  return {}
}

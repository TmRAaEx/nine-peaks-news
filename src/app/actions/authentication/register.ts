"use server";

import { SignupFormSchema, SignupFormState } from "@/lib/formValidation/formDefinitions";
import { RegisterUser } from "@/lib/Authentication";
import { createSession } from "@/lib/session/Session";

export default async function RegisterAction(
  state: SignupFormState,
  formData: FormData
) {
  const validatedFields = SignupFormSchema.safeParse({
    userName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
    gdpr_consent: formData.get("gdpr_consent"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { userName, email, password } = validatedFields.data;
  const user = await RegisterUser({ userName, email, password });

  if (user.error) {
    return { error: user.error };
  }

  await createSession(user.id);

  return {};
}

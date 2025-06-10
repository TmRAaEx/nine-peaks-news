"use server";

import { revalidatePath } from "next/cache";
import ICreateArticle from "@/interfaces/ICreateArticle";
import apiClient from "@/lib/ApiClient"; // assuming this is your server-side API client

export async function createArticle(formData: FormData) {
  const payload: ICreateArticle = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    header_img: formData.get("header_img") as string,
    content: formData.get("content") as string,
    images: formData.getAll("images") as string[],
    sub_titles: formData.getAll("sub_titles") as string[],
    sub_content: formData.getAll("sub_content") as string[],
    required_tier: formData.get("required_tier") as string,
    authur: formData.get("authur") as string,
    date: new Date(),
  };

  const response = await apiClient.post<any>("/create-article", payload);

  if (response.error) {
    return { error: response.error };
  }

  revalidatePath("/dashboard"); // optional redirect-related cache invalidation
  return { success: true };
}

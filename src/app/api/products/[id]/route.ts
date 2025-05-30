// app/api/[slug]/route.ts
import Params from "@/types/Params";
import { NextResponse } from "next/server";

export async function GET(request: Request, {params}: Params) {
  const { id } = await params;
  // Fetch or generate data based on slug
  const data = { message: `Data for slug: ${id}` };

  return NextResponse.json(data);
}

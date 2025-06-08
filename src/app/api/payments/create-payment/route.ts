// /api/payments/create-payment/route.ts

import CreatePayment from "@/lib/payments/handlers/CreatePayment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user_id, tier_id } = await req.json();

    console.log("userid: ",user_id);
    

    if (!user_id) {
        console.log("[Payment create API]: Missing user_id");
        
      return NextResponse.json(
        { success: false, error: "Missing user_id" },
        { status: 400 }
      );
    }

    const result = await CreatePayment(user_id, tier_id); 

    return NextResponse.json({ success: true, payment: result });
  } catch (err) {
    console.error("[CreatePayment API error]:", err);
    return NextResponse.json(
      { success: false, 
        error: "Internal server error" },
      { status: 500 }
    );
  }
}

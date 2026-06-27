import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const referralCode = String(body.referralCode || "").trim().toUpperCase();

    if (!referralCode) {
      return NextResponse.json(
        { valid: false, error: "Referral code is required" },
        { status: 400 }
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
        },
      }
    );

    const { data, error } = await supabaseAdmin
      .from("profiles")
      .select("id, email, referral_code")
      .eq("referral_code", referralCode)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { valid: false, error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json({
        valid: false,
        message: "Invalid referral code.",
      });
    }

    return NextResponse.json({
      valid: true,
      referralCode: data.referral_code,
    });
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = body.password;

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
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
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const referralCodes = [
      ...new Set(
        (data || [])
          .map((booking: any) => booking.referral_code_used)
          .filter(Boolean)
      ),
    ];

    let referrerMap: Record<string, string> = {};

    if (referralCodes.length > 0) {
      const { data: referrers } = await supabaseAdmin
        .from("profiles")
        .select("email, referral_code")
        .in("referral_code", referralCodes);

      referrerMap = Object.fromEntries(
        (referrers || []).map((referrer: any) => [
          referrer.referral_code,
          referrer.email,
        ])
      );
    }

    const bookingsWithReferrer = (data || []).map((booking: any) => ({
      ...booking,
      referrer_email: booking.referral_code_used
        ? referrerMap[booking.referral_code_used] || null
        : null,
    }));

    return NextResponse.json({
      bookings: bookingsWithReferrer,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
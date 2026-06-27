import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, bookingId, status } = body;

    if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: "Booking ID and status are required" },
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

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .update({
        trip_status: status,
      })
      .eq("id", bookingId)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let referralReward = null;

    if (status === "completed" && booking.referral_code_used) {
      const referralCode = String(booking.referral_code_used).trim().toUpperCase();

      const { data: referrer } = await supabaseAdmin
        .from("profiles")
        .select("id, email, phone, referral_code")
        .eq("referral_code", referralCode)
        .maybeSingle();

      if (referrer) {
        const { data: existingUsage } = await supabaseAdmin
          .from("referral_usages")
          .select("id")
          .eq("referred_booking_id", bookingId)
          .maybeSingle();

        if (!existingUsage) {
          await supabaseAdmin.from("referral_usages").insert({
            referral_code: referralCode,
            referrer_user_id: referrer.id,
            referred_booking_id: bookingId,
            referred_customer_name: booking.name || null,
            referred_customer_phone: booking.phone || null,
            referred_customer_email: booking.customer_email || null,
            reward_amount: 100,
            rides_remaining: 2,
            reward_given: true,
          });

          await supabaseAdmin.from("referral_rewards").insert({
            user_id: referrer.id,
            reward_amount: 100,
            rides_remaining: 2,
            reward_reason: "Referral reward after referred customer completed ride",
            status: "active",
            source_booking_id: bookingId,
            referral_code: referralCode,
          });

          referralReward = {
            referrerEmail: referrer.email,
            referrerPhone: referrer.phone,
            referralCode,
            rewardAmount: 100,
            ridesRemaining: 2,
          };
        }
      }
    }

    return NextResponse.json({
      booking,
      referralReward,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
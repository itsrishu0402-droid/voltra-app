import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function addSixMonths(dateString: string) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setMonth(date.getMonth() + 6);
  return date;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const referralCode = String(body.referralCode || "").trim().toUpperCase();
    const customerEmail = String(body.customerEmail || "").trim().toLowerCase();
    const pickupDate = String(body.pickupDate || "").trim();

    if (!referralCode) {
      return NextResponse.json(
        { valid: false, error: "Referral code is required" },
        { status: 400 }
      );
    }

    if (!customerEmail) {
      return NextResponse.json(
        { valid: false, error: "Customer email is required" },
        { status: 400 }
      );
    }

    if (!pickupDate) {
      return NextResponse.json(
        {
          valid: false,
          message: "Please select pickup date before verifying referral code.",
        },
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

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("id, email, referral_code")
      .eq("referral_code", referralCode)
      .maybeSingle();

    if (profileError) {
      return NextResponse.json(
        { valid: false, error: profileError.message },
        { status: 500 }
      );
    }

    if (!profile) {
      return NextResponse.json({
        valid: false,
        message: "Invalid referral code.",
      });
    }

    const { data: previousBookings, error: previousError } =
      await supabaseAdmin
        .from("bookings")
        .select("id, pickup_date, created_at")
        .eq("customer_email", customerEmail)
        .eq("referral_code_used", referralCode)
        .eq("discount_applied", 50)
        .order("pickup_date", { ascending: true });

    if (previousError) {
      return NextResponse.json(
        { valid: false, error: previousError.message },
        { status: 500 }
      );
    }

    const usedCount = previousBookings?.length || 0;
    const maxAllowed = 2;

    if (usedCount > 0) {
      const firstBooking = previousBookings![0];
      const firstTravelDate =
        firstBooking.pickup_date || firstBooking.created_at?.split("T")[0];

      const expiryDate = addSixMonths(firstTravelDate);
      const selectedTravelDate = new Date(`${pickupDate}T00:00:00`);

      if (selectedTravelDate > expiryDate) {
        return NextResponse.json({
          valid: false,
          expired: true,
          usedCount,
          remainingRides: 0,
          message: `This referral discount expired on ${formatDate(
            expiryDate
          )}.`,
        });
      }
    }

    if (usedCount >= maxAllowed) {
      return NextResponse.json({
        valid: false,
        usedCount,
        remainingRides: 0,
        message:
          "This referral discount has already been used 2 times by this account.",
      });
    }

    const remainingRides = maxAllowed - usedCount;

    return NextResponse.json({
      valid: true,
      referralCode: profile.referral_code,
      usedCount,
      remainingRides,
      discountAmount: 50,
      message:
        remainingRides === 2
          ? "Congratulations! You get ₹50 off on each of your next 2 rides."
          : "You still have ₹50 off on your next 1 ride with this referral code.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
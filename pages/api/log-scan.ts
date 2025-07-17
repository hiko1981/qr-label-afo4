import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "../../lib/send-email";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { token, lat, lon, language, has_location } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Missing token" });
    }

    // Indsæt i log
    const { error: insertError } = await supabase.from("scan_logs").insert([
      { token, lat, lon, language, has_location }
    ]);

    if (insertError) {
      return res.status(500).json({ error: "Failed to insert log", details: insertError.message });
    }

    // Find ejer
    const { data, error: selectError } = await supabase
      .from("labels")
      .select("owner_email")
      .eq("token", token)
      .single();

    if (selectError) {
      return res.status(500).json({ error: "Failed to find owner", details: selectError.message });
    }

    if (data?.owner_email) {
      await sendEmail({
        to: [data.owner_email],
        subject: "Din QR-label blev scannet",
        text: `Din QR-label (${token}) blev scannet.\nSprog: ${language}\nLokation: ${lat}, ${lon}`
      });
    }

    return res.status(200).json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}

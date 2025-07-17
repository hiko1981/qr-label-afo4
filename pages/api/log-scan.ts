import type { NextApiRequest, NextApiResponse } from "next"; 
import { createClient } from "@supabase/supabase-js"; 
import { sendEmail } from "@/lib/send-email"; 
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!); 
export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
 if (req.method !== "POST") return res.status(405).end(); 
 const { token, lat, lon, language, has_location } = req.body; 
 const log = await supabase.from("scan_logs").insert([{ 
^ token, lat, lon, language, has_location 
 }]); 
 const { data } = await supabase.from("labels").select("owner_email").eq("token", token).single(); 
 await sendEmail({ 
^ to: [to, process.env.GMAIL_USER!], 
^ subject: "QR-label scannet", 
^ text: `Token: ${token}\nLokation: ${lat}, ${lon}\nTid: ${new Date().toISOString()}` 
 }); 
 res.status(200).json({ ok: true }); 
} 

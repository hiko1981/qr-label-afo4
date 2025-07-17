import { createClient } from "@supabase/supabase-js"; 
import { createQRBuffer } from "../lib/qr"; 
import { generatePDFBuffer } from "../lib/pdf"; 
import { translateToAllLanguages } from "../lib/deepl"; 
import { uploadToSupabase } from "../lib/supabase-upload"; 
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!); 
async function run() { 
 const token = Math.random().toString(36).substring(2, 10); 
 const originalText = "Jeg er Martins bog. Jeg er muligvis blevet væk fra min ejer."; 
 const translations = await translateToAllLanguages(originalText); 
 const email = "test@example.com"; 
 await supabase.from("labels").insert([{ 
^ token, text_original: originalText, translated_texts: translations, owner_email: email 
 }]); 
 const qr = await createQRBuffer(url); 
 const pdf = await generatePDFBuffer(originalText, qr); 
 await uploadToSupabase(`labels/${token}.pdf`, Buffer.from(pdf), "application/pdf"); 
 console.log("✅ Test label oprettet:", token); 
} 
run(); 

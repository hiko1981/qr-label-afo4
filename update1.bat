@echo off
setlocal

echo [1/4] Skifter til projektmappe...
cd /d "%~dp0"

echo [2/4] Skriver nyeste version af create-labels.ts...
> scripts\create-labels.ts (
echo import { createQRBuffer } from "@/lib/qr";
echo import { generatePDFBuffer } from "@/lib/pdf";
echo import { uploadToSupabase } from "@/lib/supabase-upload";
echo import { sendEmail } from "@/lib/send-email";
echo import { translateToAllLanguages } from "@/lib/translate-all";
echo import { createClient } from "@supabase/supabase-js";
echo
echo const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
echo
echo export async function createLabels(params: {
echo   name: string;
echo   object: string;
echo   relation: string;
echo   count: number;
echo   email: string;
echo }) {
echo   const { name, object, relation, count, email } = params;
echo   const labels = [];
echo
echo   for (let i = 0; i ^< count; i++) {
echo     const token = crypto.randomUUID();
echo     const original_text = `Hej, jeg er %name%s %object%. %relation% er på vej.`.replace("%name%", name).replace("%object%", object).replace("%relation%", relation);
echo     const translated_texts = await translateToAllLanguages(original_text);
echo     const { data, error } = await supabase.from("labels").insert([{ token, original_text, translated_texts, is_active: true, admin_email: email, created_at: new Date().toISOString() }]);
echo     if (error) throw error;
echo     const qrBuffer = await createQRBuffer(token);
echo     const pdfBuffer = await generatePDFBuffer(token, qrBuffer);
echo     const pdfUrl = await uploadToSupabase(token + ".pdf", pdfBuffer);
echo     labels.push({ token, url: pdfUrl });
echo   }
echo
echo   await sendEmail(email, labels);
echo }
)

echo [3/4] Skriver nyeste version af test-create-label.ts...
> scripts\test-create-label.ts (
echo import { createClient } from "@supabase/supabase-js";
echo
echo const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
echo
echo export async function createLabel(token: string) {
echo   const { data, error } = await supabase
echo     .from("labels")
echo     .insert([
echo       {
echo         token,
echo         original_text: "Jeg er en QR-label",
echo         translated_texts: {},
echo         created_at: new Date().toISOString(),
echo         is_active: true,
echo         admin_email: null
echo       },
echo     ]);
echo   console.log("data:", data, "error:", error);
echo }
)

echo [4/4] Sikrer at create-labels API findes...
mkdir pages\api 2>nul
> pages\api\create-labels.ts (
echo import { NextApiRequest, NextApiResponse } from "next";
echo import { createLabels } from "@/scripts/create-labels";
echo
echo export default async function handler(req: NextApiRequest, res: NextApiResponse) {
echo   if (req.method !== "POST") return res.status(405).end();
echo   try {
echo     await createLabels(req.body);
echo     res.status(200).json({ success: true });
echo   } catch (err) {
echo     console.error(err);
echo     res.status(500).json({ error: "Intern fejl" });
echo   }
echo }
)

echo.
echo ✅ Alle filer er opdateret til seneste version.
pause

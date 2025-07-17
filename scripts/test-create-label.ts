import { createClient } from "@supabase/supabase-js";

type LabelRow = {
  token: string;
  original_text: string;
  translated_texts: Record<string, string>;
  created_at: string;
  is_active: boolean;
  admin_email: string | null;
};

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createLabel(token: string) {
  const { data, error } = await supabase
    .from("labels")
    .insert<LabelRow>([
      {
        token,
        original_text: "Jeg er en QR-label",
        translated_texts: {},
        created_at: new Date().toISOString(),
        is_active: true,
        admin_email: null,
      },
    ]);

  if (error) {
    console.error("Error inserting label:", error.message);
  } else {
    console.log("Label created:", data);
  }
}

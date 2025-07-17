// types/index.ts

export type LabelRow = {
  token: string;
  original_text: string;
  translated_texts: { [lang: string]: string };
  created_at: string;
  is_active: boolean;
  admin_email: string | null;
};

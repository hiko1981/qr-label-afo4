import { createClient } from "@supabase/supabase-js"; 
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!); 
export async function uploadToSupabase(path: string, file: Buffer, contentType: string) { 
 const { data, error } = await supabase.storage.from("files").upload(path, file, { contentType, upsert: true }); 
 if (error) throw new Error(error.message); 
 return data; 
} 

import { useEffect, useState } from "react"; 
import { createClient } from "@supabase/supabase-js"; 
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!); 
export default function AdminPage() { 
 useEffect(() =
^ (async () =
^^ const { data: labelData } = await supabase.from("labels").select("*"); 
^^ const { data: scanData } = await supabase.from("scan_logs").select("token"); 
^^ const grouped = scanData?.reduce((acc, cur) =
^^ setScans(grouped); 
^ })(); 
 }, []); 
 return ( 

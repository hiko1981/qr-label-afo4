// pages/admin.tsx
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export default function AdminPage() {
  const [labels, setLabels] = useState<any[]>([]);
  const [scans, setScans] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data: labelData } = await supabase.from("labels").select("*");
      const { data: scanData } = await supabase.from("scan_logs").select("token, created_at");
      setLabels(labelData || []);
      setScans(scanData || []);
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="font-semibold mt-4">QR Labels</h2>
      <ul className="mb-6">
        {labels.map((label, i) => (
          <li key={i}>
            <code>{label.token}</code> – {label.name} {label.object} ({label.owner})
          </li>
        ))}
      </ul>

      <h2 className="font-semibold mt-4">Scan Logs</h2>
      <ul>
        {scans.map((scan, i) => (
          <li key={i}>
            Token: <code>{scan.token}</code>, Tidspunkt: {scan.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}

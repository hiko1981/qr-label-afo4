import { GetServerSideProps } from "next";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.params?.token as string;
  const { data } = await supabase.from("flows").select("*").eq("token", token).single();
  if (!data) return { notFound: true };
  const lang = context.req.headers["accept-language"]?.split(",")[0]?.split("-")[0] ?? "da";
  const text = data.translated_texts?.[lang] || data.translated_texts?.["da"] || data.text_original;
  return { props: { token, text, lang } };
};

export default function ViewPage({ token, text, lang }: { token: string; text: string; lang: string }) {
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!asked && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            fetch("/api/log-scan", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token,
                lat: pos.coords.latitude,
                lon: pos.coords.longitude,
                language: lang,
                has_location: true,
              }),
            });
          },
          () => {
            fetch("/api/log-scan", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token, language: lang, has_location: false }),
            });
          }
        );
        setAsked(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [asked]);

  return (
    <div style={{ padding: "2rem", fontSize: "1.25rem" }}>
      <p>{text}</p>
    </div>
  );
}

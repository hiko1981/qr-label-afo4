export async function translateToAllLanguages(text: string): Promise<{ [key: string]: string }> {
  const langs = [
    "da", "en", "fr", "de", "es", "it", "nl", "pt", "sv", "no", "fi", "pl",
    "cs", "sk", "sl", "et", "lt", "lv", "hu", "ro", "bg", "el", "ru", "uk",
    "ja", "zh", "tr", "ko", "id"
  ];

  const translations: { [key: string]: string } = {};

  for (const lang of langs) {
    const res = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
      body: `text=${encodeURIComponent(text)}&target_lang=${lang.toUpperCase()}`,
    });

    const data = await res.json();
    translations[lang] = data.translations?.[0]?.text ?? text;
  }

  return translations;
}

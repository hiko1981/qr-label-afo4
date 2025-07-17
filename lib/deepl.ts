 const langs = ["da", "en", "fr", "de", "es", "it", "nl", "pt", "sv", "no", "fi", "pl", "cs", "sk", "sl", "et", "lt", "lv", "hu", "ro", "bg", "el", "ru", "uk", "ja", "zh", "tr", "ko", "id"]; 
 for (const lang of langs) { 
^ const res = await fetch("https://api-free.deepl.com/v2/translate", { 
^^ method: "POST", 
^^ headers: { 
^^ "Content-Type": "application/x-www-form-urlencoded", 
^^ "Authorization": "DeepL-Auth-Key " + process.env.DEEPL_API_KEY 
^^ }, 
^^ body: new URLSearchParams({ text, target_lang: lang.toUpperCase() }).toString() 
^ }); 
^ const data = await res.json(); 
 } 
 return result; 
} 

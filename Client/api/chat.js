export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { message, history = [] } = req.body;

  const systemPrompt = `You are RetroRead's AI reading assistant. RetroRead lets users
read ebooks, exchange or buy/sell physical books, and earn KOINS rewards for reading
streaks. Recommend books, answer reading questions, keep replies short and friendly.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            ...history,
            { role: "user", parts: [{ text: message }] },
          ],
        }),
      }
    );
    const data = await response.json();
    console.log("Gemini raw response:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("Gemini API error:", data.error.message);
      return res.status(200).json({ reply: `AI error: ${data.error.message}` });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a reply.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Request failed:", err);
    res.status(500).json({ error: "AI request failed" });
  }
}
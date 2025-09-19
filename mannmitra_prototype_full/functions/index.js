const functions = require("firebase-functions");
const fetch = require("node-fetch");
const { HELPLINES, CRISIS_KEYWORDS } = require("./config");

exports.chat = functions.https.onRequest(async (req, res) => {
  const { message } = JSON.parse(req.body);

  const isCrisis = CRISIS_KEYWORDS.some((k) =>
    message.toLowerCase().includes(k)
  );

  if (isCrisis) {
    return res.json({
      reply:
        "⚠️ It sounds like you’re in deep distress. You are not alone. Please reach out immediately:\n" +
        HELPLINES.map((h) => \`\${h.name}: \${h.number}\`).join("\n") +
        "\nIf urgent, call 112 (India Emergency).",
    });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: \`Bearer \${process.env.OPENAI_KEY}\`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

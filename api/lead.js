export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ ok: false, error: 'Message is required' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'Telegram not configured' });
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: parseInt(chatId),
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await resp.json();
    if (data.ok) {
      return res.json({ ok: true });
    } else {
      return res.status(500).json({ ok: false, error: data.description });
    }
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}

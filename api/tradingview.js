export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  // 🛡️ توکن امنیتی (خودت مقدارشو تعیین کن)
  const SECRET = process.env.WEBHOOK_SECRET;

  // دریافت داده از تریدینگ‌ویو
  const body = req.body;
  const auth = req.headers['x-webhook-token'] || body.secret;

  if (auth !== SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // نمونه داده: { action: "buy", symbol: "BTCUSDT", amount: 0.01 }
  const { action, symbol, amount } = body;

  // ✅ اینجا می‌تونی به CoinEx API وصل بشی (نمونه)
  const COINEX_API_KEY = process.env.COINEX_API_KEY;
  const COINEX_SECRET = process.env.COINEX_SECRET;

  try {
    // برای تست، فقط لاگ می‌گیریم
    console.log(Received signal: ${action} ${symbol} ${amount});
    // در آینده: فراخوانی CoinEx API برای ایجاد سفارش واقعی

    return res.status(200).json({ status: 'ok', message: Signal received: ${action} ${symbol} });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
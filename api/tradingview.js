export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const SECRET = process.env.WEBHOOK_SECRET;
  const body = req.body;
  const auth = req.headers['x-webhook-token'] || body.secret;

  if (auth !== SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { action, symbol, amount } = body;

  try {
    console.log(Received signal: ${action} ${symbol} ${amount});
    return res.status(200).json({ status: 'ok', message: Signal received: ${action} ${symbol} });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

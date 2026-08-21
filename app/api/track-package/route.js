// Poli Pino Pinas — Track Package
// Looks up an order in IdoSell by its reference number and returns a friendly status.

const IDOSELL_DOMAIN = 'shop52751-1.yourtechnicaldomain.com';
const IDOSELL_API_BASE = `https://${IDOSELL_DOMAIN}/api/admin/v8`;
const ALLOWED_ORIGIN = `https://${IDOSELL_DOMAIN}`;

// Maps IdoSell's internal status codes to friendly labels shown to customers.
const STATUS_LABELS = {
  new: 'Order received',
  payment_waiting: 'Awaiting payment',
  delivery_waiting: 'Awaiting delivery',
  on_order: 'In progress',
  packed: 'Being packed',
  ready: 'Ready for shipment',
  finished: 'Delivered',
  finished_ext: 'Delivered',
  suspended: 'On hold',
  canceled: 'Canceled',
  lost: 'Lost',
  false: 'Invalid order',
  joined: 'Merged with another order',
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

// IdoSell answers with an HTML error page (not JSON) when the API key is
// wrong or the shop domain is off, so parse defensively -- otherwise the
// raw "Unexpected token '<'" surfaces instead of something diagnosable.
async function readJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `IdoSell returned a non-JSON response (HTTP ${res.status}). Check IDOSELL_API_KEY and the shop domain.`
    );
  }
}

export async function GET(request) {
  try {
    const ref = new URL(request.url).searchParams.get('ref')?.trim();
    if (!ref) return json({ ok: false, error: 'Missing ref.' }, 400);

    const res = await fetch(`${IDOSELL_API_BASE}/orders/orders/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.IDOSELL_API_KEY,
      },
      body: JSON.stringify({ params: { ordersIds: [ref] } }),
    });

    const data = await readJson(res);
    const match = data?.Results?.[0];

    if (!res.ok) return json({ ok: false, error: 'IdoSell lookup failed.' }, 502);
    if (!match) return json({ ok: true, found: false }, 200);

    const rawStatus = match.orderDetails?.orderStatus;
    return json(
      {
        ok: true,
        found: true,
        reference: match.orderId,
        status: STATUS_LABELS[rawStatus] || rawStatus || 'Unknown',
      },
      200
    );
  } catch (err) {
    return json({ ok: false, error: 'Server error: ' + err.message }, 500);
  }
}

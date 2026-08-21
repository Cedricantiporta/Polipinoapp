// Poli Pino Pinas — Submit Package
// Receives a "Send a Package" form submission and creates a real Order in IdoSell.
// The IdoSell API key lives ONLY here (as a Vercel environment variable) — it is
// never sent to the browser, so it's safe from anyone viewing the page source.

const IDOSELL_DOMAIN = 'shop52751-1.yourtechnicaldomain.com';
const IDOSELL_API_BASE = `https://${IDOSELL_DOMAIN}/api/admin/v8`;
const SHIPPING_PRODUCT_ID = 144; // "Balikbayan Box Shipping (internal, do not sell)"
const ALLOWED_ORIGIN = `https://${IDOSELL_DOMAIN}`;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

export async function POST(request) {
  try {
    const body = await request.json();
    const { recipient = {}, sender = {}, boxes = [] } = body;

    if (!recipient.firstName || !recipient.lastName || !recipient.phone1 || !recipient.street) {
      return json({ ok: false, error: 'Missing recipient details.' }, 400);
    }
    if (!sender.firstName || !sender.lastName || !sender.phone1) {
      return json({ ok: false, error: 'Missing sender details.' }, 400);
    }

    const boxCount = Math.max(boxes.length, 1);

    // Fold the box/item contents into a readable note stored on the order,
    // since IdoSell order line items don't have custom "contents" fields.
    const contentsNote = boxes
      .map((box, i) => {
        const lines = (box.items || []).map(
          (it) => `  - ${it.name || '(unnamed)'} x${it.qty || 1} (${it.condition || 'New'}, $${it.price || 0})`
        );
        return `Box ${i + 1}:\n${lines.join('\n')}`;
      })
      .join('\n\n');

    const orderPayload = {
      params: {
        orders: [
          {
            orderType: 'retail',
            clientWithoutAccount: 'y', // guest order, no IdoSell customer account needed
            clientWithoutAccountData: {
              clientFirstName: sender.firstName,
              clientLastName: sender.lastName,
              clientStreet: sender.address || '',
              clientZipCode: '',
              clientCity: '',
              clientCountry: '',
              clientEmail: sender.email || '',
              clientPhone1: sender.phone1,
            },
            clientDeliveryAddress: {
              clientDeliveryAddressFirstName: recipient.firstName,
              clientDeliveryAddressLastName: recipient.lastName,
              clientDeliveryAddressStreet: recipient.street,
              clientDeliveryAddressZipCode: recipient.zip || '',
              clientDeliveryAddressCity: recipient.city || '',
              clientDeliveryAddressCountry: 'PH',
              clientDeliveryAddressAdditional: [recipient.barangay, recipient.province, recipient.region]
                .filter(Boolean)
                .join(', '),
              clientDeliveryAddressPhone: recipient.phone1,
            },
            clientNoteToOrder: `Poli Pino Pinas — Send a Package (web form)\n\n${contentsNote}`.slice(0, 2000),
            products: [{ productId: SHIPPING_PRODUCT_ID, productQuantity: boxCount }],
          },
        ],
      },
    };

    const res = await fetch(`${IDOSELL_API_BASE}/orders/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.IDOSELL_API_KEY,
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await readJson(res);
    const result = data?.results?.ordersResults?.[0];

    if (!res.ok || !result || result.faultCode) {
      return json({ ok: false, error: result?.faultString || 'IdoSell rejected the order.' }, 502);
    }

    return json({ ok: true, reference: result.orderId, serial: result.orderSerialNumber }, 200);
  } catch (err) {
    return json({ ok: false, error: 'Server error: ' + err.message }, 500);
  }
}

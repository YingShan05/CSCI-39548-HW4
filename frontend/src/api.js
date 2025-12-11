export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5001';

async function handleRes(res) {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }
  return res.json().catch(()=>null);
}

export async function fetchMenu() {
  const res = await fetch(`${API_BASE}/api/menu`);
  return handleRes(res);
}

export async function getCart(sessionId) {
  const res = await fetch(`${API_BASE}/api/cart?sessionId=${sessionId}`);
  return handleRes(res);
}

export async function saveCart(cart) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(cart)
  });
  return handleRes(res);
}

export async function placeOrder(order) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(order)
  });
  return handleRes(res);
}

export async function submitContact(contact) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(contact)
  });
  return handleRes(res);
}

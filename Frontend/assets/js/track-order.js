document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('track-order-form');
  const messageEl = document.getElementById('track-order-message');
  const resultsEl = document.getElementById('track-order-results');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('track-email').value.trim();
    messageEl.textContent = 'Searching...';
    resultsEl.innerHTML = '';

    // NOTE: assumes supabase.js exposes a shared client as `supabaseClient`.
    // If your supabase.js exports it under a different name, swap it below.
    const { data: customer, error: customerError } = await supabaseClient
      .from('customers')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (customerError || !customer) {
      messageEl.textContent = "We couldn't find any orders for that email.";
      return;
    }

    const { data: orders, error: ordersError } = await supabaseClient
      .from('orders')
      .select('total, status, payment_method, created_at')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false });

    if (ordersError || !orders || orders.length === 0) {
      messageEl.textContent = "We couldn't find any orders for that email.";
      return;
    }

    messageEl.textContent = `Found ${orders.length} order(s):`;
    resultsEl.innerHTML = orders.map(order => `
      <div class="order-card">
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Total:</strong> R${order.total}</p>
        <p><strong>Payment method:</strong> ${order.payment_method}</p>
        <p><strong>Date:</strong> ${new Date(order.created_at).toLocaleDateString()}</p>
      </div>
    `).join('');
  });
});

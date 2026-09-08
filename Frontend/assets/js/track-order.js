document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('track-order-form');
  const messageEl = document.getElementById('track-order-message');
  const resultsEl = document.getElementById('track-order-results');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const identifier = document.getElementById('track-identifier').value.trim();
    messageEl.textContent = 'Searching...';
    resultsEl.innerHTML = '';

    const { data: orders, error } = await supabaseClient.rpc('track_order', { identifier });

    if (error || !orders || orders.length === 0) {
      messageEl.textContent = "We couldn't find any orders for that email or phone number.";
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

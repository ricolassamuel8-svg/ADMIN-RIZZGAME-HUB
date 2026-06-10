const ordersContainer =
document.getElementById("orders-container");

database.ref("orders").on("value", (snapshot) => {

    const data = snapshot.val();

    if (!data) {
        ordersContainer.innerHTML = `
        <div class="order-card">
            Belum ada pesanan masuk.
        </div>
        `;
        return;
    }

    let html = "";

    Object.entries(data)
        .reverse()
        .forEach(([key, order]) => {

        html += `
        <div class="order-card">

            <h3>${order.orderCode}</h3>

            <p><b>Game:</b> ${order.game}</p>

            <p><b>User ID:</b> ${order.user}</p>

            <p><b>Nominal:</b> ${order.nominal}</p>

            <p><b>Pembayaran:</b> ${order.payment}</p>

            <p><b>Total:</b>
            Rp ${Number(order.total).toLocaleString("id-ID")}
            </p>

            <p class="status">
            ${order.status}
            </p>

            <button
                onclick="updateStatus('${key}','Selesai')">
                Selesai
            </button>

            <button
                onclick="updateStatus('${key}','Diproses')">
                Diproses
            </button>

        </div>
        `;
    });

    ordersContainer.innerHTML = html;
});

function updateStatus(orderId, status) {

    database.ref("orders/" + orderId).update({
        status: selesai
    });

}
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
            <button
    onclick="deleteOrder('${key}')">
    🗑 Hapus
</button>

        </div>
        `;
    });

    ordersContainer.innerHTML = html;
});

function updateStatus(orderId, status) {

    database.ref("orders/" + orderId).update({
        status: status
    });

}
function searchOrder() {

    const code =
    document.getElementById("orderCode")
    .value
    .trim();

    database.ref("orders/" + code)
    .once("value")
    .then((snapshot) => {

        const order = snapshot.val();

        if (!order) {

            document.getElementById("result").innerHTML =
            "<p>Pesanan tidak ditemukan.</p>";

            return;
        }

        document.getElementById("result").innerHTML = `
        <div class="order-card">

            <h3>${order.orderCode}</h3>

            <p><b>Game:</b> ${order.game}</p>
            <p><b>User:</b> ${order.user}</p>
            <p><b>Nominal:</b> ${order.nominal}</p>
            <p><b>Status:</b> ${order.status}</p>

            <button onclick="updateStatus('${code}','Diproses')">
                Diproses
            </button>

            <button onclick="updateStatus('${code}','Selesai')">
                Selesai
            </button>

        </div>
        `;
    });

}
function deleteOrder(orderId) {

    if (!confirm("Yakin ingin menghapus pesanan ini?")) {
        return;
    }

    database.ref("orders/" + orderId)
    .remove()
    .then(() => {
        alert("Pesanan berhasil dihapus");
    })
    .catch((error) => {
        alert("Error: " + error.message);
        console.error(error);
    });

}
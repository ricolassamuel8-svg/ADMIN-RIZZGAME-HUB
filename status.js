function checkOrder() {

    const code =
    document.getElementById("orderCode")
    .value
    .trim();

    const result =
    document.getElementById("result");

    if (!code) {

        result.innerHTML =
        "<p>Masukkan kode pesanan.</p>";

        return;
    }

    database
    .ref("orders/" + code)
    .once("value")

    .then((snapshot) => {

        const order =
        snapshot.val();

        if (!order) {

            result.innerHTML = `
                <div class="card">
                    <h3>Pesanan tidak ditemukan</h3>
                </div>
            `;

            return;
        }

        result.innerHTML = `
            <div class="card">

                <h3>${order.orderCode}</h3>

                <p>
                    <b>Game:</b>
                    ${order.game}
                </p>

                <p>
                    <b>User:</b>
                    ${order.user}
                </p>

                <p>
                    <b>Nominal:</b>
                    ${order.nominal}
                </p>

                <p>
                    <b>Pembayaran:</b>
                    ${order.payment}
                </p>

                <p>
                    <b>Total:</b>
                    Rp ${Number(order.total)
                    .toLocaleString("id-ID")}
                </p>

                <p class="status">
                    Status:
                    ${order.status}
                </p>

            </div>
        `;
    });
}
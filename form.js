/* =========================================================
   TOPUPCODE - FORM PAGE
   Production Ready
========================================================= */

/* =========================================================
   PRODUCT DATA
========================================================= */

const productData = {
    ROBLOX: {
        image: "assets/roblox.png",
        currency: "Robux",
        products: [
            { amount: 80, price: 15000 },
            { amount: 160, price: 29000 },
            { amount: 400, price: 69000, bestSeller: true },
            { amount: 800, price: 135000 },
            { amount: 1700, price: 269000 },
            { amount: 4500, price: 679000 }
        ]
    },

    FREEFIRE: {
        image: "assets/ff.jpeg",
        currency: "Diamond",
        products: [
            { amount: 70, price: 10000 },
            { amount: 140, price: 19000 },
            { amount: 355, price: 47000, bestSeller: true },
            { amount: 720, price: 95000 },
            { amount: 1450, price: 189000 },
            { amount: 3640, price: 469000 }
        ]
    },

    "MOBILE LEGEND": {
        image: "assets/ml.png.jpg",
        currency: "Diamond",
        products: [
            { amount: 86, price: 20000 },
            { amount: 172, price: 39000 },
            { amount: 429, price: 95000, bestSeller: true },
            { amount: 878, price: 189000 },
            { amount: 2195, price: 469000 },
            { amount: 5532, price: 1169000 }
        ]
    }
};

/* =========================================================
   STATE
========================================================= */

let selectedGame = "";
let selectedNominal = null;
let selectedPayment = null;
let orderCode = "";

/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializePage();
});

/* =========================================================
   PAGE INITIALIZATION
========================================================= */

function initializePage() {
    loadSelectedGame();
    generateOrderCode();
    initializePaymentSelection();
    initializeUserInputListener();
    initializeFormSubmit();
    updateSummary();
}

/* =========================================================
   LOAD GAME
========================================================= */

function loadSelectedGame() {
    const game = localStorage.getItem("selectedGame");

    if (!game || !productData[game]) {
        selectedGame = "ROBLOX";
    } else {
        selectedGame = game;
    }

    renderGameInfo();
    renderNominals();
}

/* =========================================================
   GAME INFO
========================================================= */

function renderGameInfo() {
    const gameTitle = document.getElementById("selected-game-title");
    const gameImage = document.getElementById("game-banner-image");
    const gameNote = document.getElementById("game-note");

    const gameData = productData[selectedGame];

    if (gameTitle) {
        gameTitle.textContent = selectedGame;
    }

    if (gameImage) {
        gameImage.src = gameData.image;
        gameImage.alt = selectedGame;
    }

    if (gameNote) {
        if (selectedGame === "ROBLOX") {
            gameNote.textContent =
                "Masukkan Username Roblox yang valid.";
        } else {
            gameNote.textContent =
                "Masukkan User ID akun game Anda.";
        }
    }
}

/* =========================================================
   RENDER NOMINALS
========================================================= */

function renderNominals() {
    const grid = document.getElementById("nominal-grid");

    if (!grid) return;

    grid.innerHTML = "";

    const gameData = productData[selectedGame];

    gameData.products.forEach((item) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "nominal-card";

        if (item.bestSeller) {
            button.classList.add("best-seller");
        }

        button.dataset.amount = item.amount;
        button.dataset.price = item.price;

        button.innerHTML = `
            <strong>${item.amount} ${gameData.currency}</strong>
            <br>
            <span>${formatRupiah(item.price)}</span>
        `;

        button.addEventListener("click", () => {
            document
                .querySelectorAll(".nominal-card")
                .forEach(card =>
                    card.classList.remove("selected")
                );

            button.classList.add("selected");

            selectedNominal = {
                amount: item.amount,
                price: item.price,
                currency: gameData.currency
            };

            updateSummary();
        });

        grid.appendChild(button);
    });
}

/* =========================================================
   PAYMENT
========================================================= */

function initializePaymentSelection() {
    const paymentCards =
        document.querySelectorAll(".payment-card");

    paymentCards.forEach((card) => {
        card.addEventListener("click", () => {

            paymentCards.forEach(item =>
                item.classList.remove("selected")
            );

            card.classList.add("selected");

            selectedPayment =
                card.dataset.payment || "";

            updateSummary();
        });
    });
}

/* =========================================================
   USER INPUT
========================================================= */

function initializeUserInputListener() {
    const userInput =
        document.getElementById("user-input");

    if (!userInput) return;

    userInput.addEventListener("input", () => {
        updateSummary();
    });
}

/* =========================================================
   ORDER CODE
========================================================= */

function generateOrderCode() {
    const randomNumber =
        Math.floor(10000 + Math.random() * 90000);

    const randomLetters =
        Array.from({ length: 4 }, () =>
            String.fromCharCode(
                65 + Math.floor(Math.random() * 26)
            )
        ).join("");

    orderCode =
        `XQLTP${randomNumber}${randomLetters}`;

    const orderCodeElement =
        document.getElementById("order-code");

    if (orderCodeElement) {
        orderCodeElement.textContent = orderCode;
    }
}

/* =========================================================
   SUMMARY
========================================================= */

function updateSummary() {
    const gameElement =
        document.getElementById("summary-game");

    const userElement =
        document.getElementById("summary-user");

    const nominalElement =
        document.getElementById("summary-nominal");

    const paymentElement =
        document.getElementById("summary-payment");

    const totalElement =
        document.getElementById("summary-total");

    const userInput =
        document.getElementById("user-input");

    if (gameElement) {
        gameElement.textContent = selectedGame;
    }

    if (userElement) {
        userElement.textContent =
            userInput?.value.trim() || "-";
    }

    if (nominalElement) {
        nominalElement.textContent =
            selectedNominal
                ? `${selectedNominal.amount} ${selectedNominal.currency}`
                : "-";
    }

    if (paymentElement) {
        paymentElement.textContent =
            selectedPayment || "-";
    }

    if (totalElement) {
        totalElement.textContent =
            selectedNominal
                ? formatRupiah(selectedNominal.price)
                : "Rp0";
    }
}

/* =========================================================
   FORM SUBMIT
========================================================= */

function initializeFormSubmit() {
    const form =
        document.getElementById("topup-form");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const userInput =
            document.getElementById("user-input");

        const username =
            userInput?.value.trim() || "";

        if (!username) {
            showToast("Masukkan User ID terlebih dahulu.");
            return;
        }

        if (!selectedNominal) {
            showToast("Pilih nominal terlebih dahulu.");
            return;
        }

        if (!selectedPayment) {
            showToast("Pilih metode pembayaran.");
            return;
        }

        sendWhatsApp(username);
    });
}

/* =========================================================
   WHATSAPP
========================================================= */

function sendWhatsApp(username) {

    const message = `
Halo Admin TopUpCode

Saya ingin melakukan topup.

━━━━━━━━━━━━━━
KODE PESANAN
${orderCode}

GAME
${selectedGame}

USER ID / USERNAME
${username}

NOMINAL
${selectedNominal.amount} ${selectedNominal.currency}

METODE PEMBAYARAN
${selectedPayment}

TOTAL
${formatRupiah(selectedNominal.price)}
━━━━━━━━━━━━━━

Mohon diproses.
Terima kasih.
`;

    const phoneNumber = "6282386775387";

    const whatsappURL =
`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

database.ref("orders/" + orderCode).set({
    orderCode,
    game: selectedGame,
    user: username,
    nominal: `${selectedNominal.amount} ${selectedNominal.currency}`,
    payment: selectedPayment,
    total: selectedNominal.price,
    status: "Pending",
    createdAt: Date.now()
});

window.location.href = whatsappURL;
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
    const container =
        document.getElementById("toast-container");

    if (!container) return;

    const toast =
        document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";

        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 2500);
}

/* =========================================================
   FORMAT RUPIAH
========================================================= */

function formatRupiah(value) {
    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(value);
}
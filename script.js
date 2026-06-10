/* =========================================================
   TOPUPCODE - MAIN SCRIPT
   Production Ready
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeLoadingScreen();
    initializeGameCards();
});

/* =========================================================
   LOADING SCREEN
========================================================= */

function initializeLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");

    if (!loadingScreen) return;

    window.addEventListener("load", () => {
        setTimeout(() => {
            loadingScreen.style.transition =
                "opacity 0.6s ease, visibility 0.6s ease";

            loadingScreen.style.opacity = "0";
            loadingScreen.style.visibility = "hidden";

            setTimeout(() => {
                loadingScreen.remove();
            }, 650);
        }, 600);
    });
}

/* =========================================================
   GAME CARD EVENTS
========================================================= */

function initializeGameCards() {
    const gameCards = document.querySelectorAll(".game-card");

    if (!gameCards.length) return;

    restoreActiveGame(gameCards);

    gameCards.forEach((card) => {
        const link = card.querySelector(".game-card-link");

        if (!link) return;

        link.addEventListener("click", (event) => {
            event.preventDefault();

            const gameName = card.dataset.game;

            if (!gameName) return;

            setActiveCard(gameCards, link);

            saveSelectedGame(gameName);

            showToast(`${gameName} dipilih`);

            redirectWithFade("form.html");
        });
    });
}

/* =========================================================
   ACTIVE STATE
========================================================= */

function setActiveCard(cards, activeLink) {
    cards.forEach((card) => {
        const link = card.querySelector(".game-card-link");

        if (link) {
            link.classList.remove("active");
        }
    });

    activeLink.classList.add("active");
}

function restoreActiveGame(cards) {
    const selectedGame = localStorage.getItem("selectedGame");

    if (!selectedGame) return;

    cards.forEach((card) => {
        const gameName = card.dataset.game;
        const link = card.querySelector(".game-card-link");

        if (!link) return;

        if (gameName === selectedGame) {
            link.classList.add("active");
        }
    });
}

/* =========================================================
   LOCAL STORAGE
========================================================= */

function saveSelectedGame(gameName) {
    try {
        localStorage.setItem("selectedGame", gameName);
    } catch (error) {
        return;
    }
}

/* =========================================================
   TOAST
========================================================= */

function showToast(message) {
    const container = document.getElementById("toast-container");

    if (!container) return;

    const toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
    });

    setTimeout(() => {
        toast.style.transition =
            "opacity 0.35s ease, transform 0.35s ease";

        toast.style.opacity = "0";
        toast.style.transform = "translateY(12px)";

        setTimeout(() => {
            toast.remove();
        }, 350);
    }, 2200);
}

/* =========================================================
   PAGE TRANSITION
========================================================= */

function redirectWithFade(url) {
    if (!url) return;

    document.body.style.transition =
        "opacity 0.4s ease, transform 0.4s ease";

    document.body.style.opacity = "0";
    document.body.style.transform = "scale(0.985)";

    setTimeout(() => {
        window.location.href = url;
    }, 400);
}
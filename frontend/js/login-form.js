document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById("loader");
    const content = document.getElementById("main-content");

    window.addEventListener("load", () => {
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
        setTimeout(() => {
            loader.remove();
            content.style.display = "block";
        }, 300); 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('takeawayName')) {
        window.location.href = "/";
    }
});

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("username").value.trim();
    if (name) {
        localStorage.setItem("takeawayName", name);
        window.location.href = "/";
    }
});

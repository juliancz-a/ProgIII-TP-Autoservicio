import { setLoader } from "./utils/uiHelpers.js";

setLoader()

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

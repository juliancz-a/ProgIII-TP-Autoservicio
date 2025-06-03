document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("username").value.trim();
    if (name) {
        localStorage.setItem("takeawayName", name);
        window.location.href = "./index.html";
    }
});
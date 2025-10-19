document.addEventListener("DOMContentLoaded", () => {
    const signupCard = document.getElementById("signupCard");
    const closeBtn = document.getElementById("closeBtn");
    const togglePassword = document.getElementById("toggleSignupPassword");
    const passwordInput = document.getElementById("signupPassword");

    // Smooth fade-in animation
    setTimeout(() => {
        signupCard.classList.remove("opacity-0", "translate-y-8");
    }, 100);

    // Close button redirect (go back or to login)
    closeBtn.addEventListener("click", () => {
        window.location.href = "login.html"; // or history.back()
    });

    // Toggle password show/hide
    togglePassword.addEventListener("click", () => {
        const isHidden = passwordInput.type === "password";
        passwordInput.type = isHidden ? "text" : "password";

        togglePassword.innerHTML = isHidden
            ? `<i class="fa-solid fa-eye-slash"></i>`
            : `<i class="fa-solid fa-eye"></i>`;
    });
});

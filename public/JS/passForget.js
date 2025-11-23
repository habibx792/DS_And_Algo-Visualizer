document.addEventListener("DOMContentLoaded", () => {
    const resetCard = document.getElementById("resetCard");
    const closeBtn = document.getElementById("closeBtn");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const toggleNewPassword = document.getElementById("toggleNewPassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const resetForm = document.getElementById("resetForm");
    const matchMessage = document.getElementById("matchMessage");

    setTimeout(() => {
        resetCard.classList.remove("opacity-0", "translate-y-8");
        resetCard.classList.add("opacity-100", "translate-y-0");
    }, 100);

    const setupToggle = (btn, input) => {
        const icon = btn.querySelector("i");
        btn.addEventListener("click", () => {
            const isHidden = input.type === "password";
            input.type = isHidden ? "text" : "password";
            icon.classList.toggle("fa-eye");
            icon.classList.toggle("fa-eye-slash");
        });
    };

    setupToggle(toggleNewPassword, newPassword);
    setupToggle(toggleConfirmPassword, confirmPassword);

    let passwordsMatch = false;
    confirmPassword.addEventListener("input", () => {
        if (confirmPassword.value === "") {
            matchMessage.textContent = "";
            confirmPassword.classList.remove("border-green-400", "border-red-400");
            passwordsMatch = false;
            return;
        }
        if (confirmPassword.value === newPassword.value) {
            matchMessage.textContent = " Passwords match";
            matchMessage.className = "text-green-400 text-sm mt-1";
            confirmPassword.classList.add("border-green-400");
            confirmPassword.classList.remove("border-red-400");
            passwordsMatch = true;
        } else {
            matchMessage.textContent = "Passwords do not match";
            matchMessage.className = "text-red-400 text-sm mt-1";
            confirmPassword.classList.add("border-red-400");
            confirmPassword.classList.remove("border-green-400");
            passwordsMatch = false;
        }
    });

    closeBtn.addEventListener("click", () => {
        resetCard.style.transition = "all 0.5s ease";
        resetCard.style.opacity = "0";
        resetCard.style.transform = "translateY(-40px)";
        setTimeout(() => (window.location.href = "login.html"), 500);
    });

    resetForm.addEventListener("submit", e => {
        e.preventDefault();

        const newPass = newPassword.value.trim();
        const confirmPass = confirmPassword.value.trim();
        const email = localStorage.getItem("resetPending");
        const user = JSON.parse(localStorage.getItem("dsaUser"));

        if (!passwordsMatch) {
            alert("Passwords do not match. Please try again.");
            return;
        }
        if (!email || !user || user.email.toLowerCase() !== email.toLowerCase()) {
            alert("No reset request found. Please try again.");
            return (window.location.href = "login.html");
        }
        if (newPass.length < 4) {
            alert("Password must be at least 4 characters long.");
            return;
        }

        user.password = newPass;
        localStorage.setItem("dsaUser", JSON.stringify(user));
        localStorage.removeItem("resetPending");

        alert("Password reset successful! You can now log in.");
        window.location.href = "login.html";
    });
});

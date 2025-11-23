document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("dsaLoggedIn") === "true") {
    window.location.href = "test.html";
  }

  const loginForm = document.getElementById("loginForm");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const toggleIcon = togglePasswordBtn.querySelector("i");
  const closeBtn = document.getElementById("closeBtn");
  const loginCard = document.getElementById("loginCard");
  const forgotPasswordBtn = document.getElementById("forgotPassword");

  togglePasswordBtn.addEventListener("click", () => {
    const isHidden = loginPassword.type === "password";
    loginPassword.type = isHidden ? "text" : "password";
    toggleIcon.classList.toggle("fa-eye");
    toggleIcon.classList.toggle("fa-eye-slash");
  });

  loginForm.addEventListener("submit", e => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("dsaUser"));
    if (!user) {
      alert("No account found. Please sign up first.");
      window.location.href = "signup.html";
      return;
    }

    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value.trim();

    if (user.email.toLowerCase() === email && user.password === password) {
      localStorage.setItem("dsaLoggedIn", "true");
      alert(`Welcome back, ${user.name}!`);
      window.location.href = "test.html";
    } else {
      alert("Invalid credentials. Try again.");
    }
  });

  closeBtn.addEventListener("click", () => {
    loginCard.style.transition = "all 0.5s ease";
    loginCard.style.opacity = "0";
    loginCard.style.transform = "translateX(100%)";
    setTimeout(() => {
      window.location.href = "signup.html";
    }, 500);
  });

  forgotPasswordBtn.addEventListener("click", () => {
    const email = loginEmail.value.trim().toLowerCase();
    if (email) localStorage.setItem("resetPending", email);
    window.location.href = "passforget.html";
  });
});

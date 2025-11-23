document.addEventListener("DOMContentLoaded", () => {
  const signupCard = document.getElementById("signupCard");
  const closeBtn = document.getElementById("closeBtn");
  const togglePassword = document.getElementById("toggleSignupPassword");
  const passwordInput = document.getElementById("signupPassword");
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  // Smooth fade-in animation
  setTimeout(() => {
    signupCard.classList.remove("opacity-0", "translate-y-8");
  }, 100);

  // Close button redirect (go back or to login)
  closeBtn.addEventListener("click", () => {
    window.location.href = "test.html"; // or history.back()
  });

  // Password strength meter
  passwordInput.addEventListener("input", () => {
    const val = passwordInput.value;
    let strength = 0;

    if (val.length >= 6) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    switch (strength) {
      case 0:
        strengthBar.style.width = "0%";
        strengthBar.style.backgroundColor = "transparent";
        strengthText.textContent = "Password Strength:";
        break;
      case 1:
        strengthBar.style.width = "25%";
        strengthBar.style.backgroundColor = "#ff4d4f";
        strengthText.textContent = "Password Strength: Weak";
        break;
      case 2:
        strengthBar.style.width = "50%";
        strengthBar.style.backgroundColor = "#facc15";
        strengthText.textContent = "Password Strength: Fair";
        break;
      case 3:
        strengthBar.style.width = "75%";
        strengthBar.style.backgroundColor = "#60a5fa";
        strengthText.textContent = "Password Strength: Good";
        break;
      case 4:
        strengthBar.style.width = "100%";
        strengthBar.style.backgroundColor = "#4ade80";
        strengthText.textContent = "Password Strength: Strong";
        break;
    }
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

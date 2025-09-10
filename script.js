const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const showPasswordChk = document.getElementById('showPassword');
const loginBtn = document.getElementById('loginBtn');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const generalError = document.getElementById('generalError');

// Hardcoded credentials
const HARDCODED_USER = "user@example.com";
const HARDCODED_PASS = "Password123";

let loginAttempts = 0;
const MAX_ATTEMPTS = 3;

// Email Validation regex
function validateEmail(email) {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
}

// Real-time validation
usernameInput.addEventListener('input', () => {
  if (!validateEmail(usernameInput.value)) {
    usernameError.textContent = "Enter a valid email address.";
  } else {
    usernameError.textContent = "";
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
  } else {
    passwordError.textContent = "";
  }
});

// Show/hide password
showPasswordChk.addEventListener('change', function() {
  passwordInput.type = this.checked ? "text" : "password";
});

// Form submission
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  generalError.textContent = "";

  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  let valid = true;

  if (!validateEmail(username)) {
    usernameError.textContent = "Enter a valid email address.";
    valid = false;
  }
  if (password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    valid = false;
  }
  if (!valid) return;

  loginBtn.disabled = true; // disable button

  if (username === HARDCODED_USER && password === HARDCODED_PASS) {
    window.location.href = "success.html";
  } else {
    loginAttempts++;
    generalError.textContent = "Invalid credentials. Try again.";
    loginBtn.disabled = false;
    if (loginAttempts >= MAX_ATTEMPTS) {
      generalError.textContent = "Too many failed attempts. Please try later.";
      loginBtn.disabled = true;
    }
  }
});

/**
 * Autenticação apenas para fluxo de UI (front estático — não é segurança real).
 */
const DEMO_USERNAME = "demo";
const DEMO_PASSWORD = "demo123";

const STORAGE_SESSION = "calc_auth_session";
const STORAGE_REMEMBER = "calc_auth_remember";
const STORAGE_USERS = "calc_registered_users";

const loginView = document.getElementById("login-view");
const registerView = document.getElementById("register-view");
const calculatorRoot = document.getElementById("app-calculator");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const loginError = document.getElementById("login-error");
const registerError = document.getElementById("register-error");
const inputLoginUser = document.getElementById("login-username");
const inputLoginPass = document.getElementById("login-password");
const inputRemember = document.getElementById("login-remember");
const togglePasswordLogin = document.getElementById("toggle-password-login");
const linkRecover = document.getElementById("link-recover");
const linkToRegister = document.getElementById("link-to-register");
const linkToLogin = document.getElementById("link-to-login");
const btnLogout = document.getElementById("btn-logout");
const modalRecover = document.getElementById("modal-recover");
const modalRecoverClose = document.getElementById("modal-recover-close");
const togglePasswordRegister = document.getElementById("toggle-password-register");

function readRegisteredUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_USERS);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRegisteredUsers(users) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
}

function credentialsMatch(username, password) {
  if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
    return true;
  }
  return readRegisteredUsers().some(
    (entry) =>
      entry &&
      typeof entry.username === "string" &&
      typeof entry.password === "string" &&
      entry.username === username &&
      entry.password === password,
  );
}

function isLoggedInPersisted() {
  if (sessionStorage.getItem(STORAGE_SESSION) === "1") {
    return true;
  }
  return localStorage.getItem(STORAGE_REMEMBER) === "1";
}

function persistSession(remember) {
  sessionStorage.setItem(STORAGE_SESSION, "1");
  if (remember) {
    localStorage.setItem(STORAGE_REMEMBER, "1");
  } else {
    localStorage.removeItem(STORAGE_REMEMBER);
  }
}

function clearSession() {
  sessionStorage.removeItem(STORAGE_SESSION);
  localStorage.removeItem(STORAGE_REMEMBER);
}

function setView(view) {
  const showLogin = view === "login";
  const showRegister = view === "register";
  const showCalc = view === "calculator";

  if (loginView) {
    loginView.classList.toggle("is-hidden", !showLogin);
    loginView.setAttribute("aria-hidden", showLogin ? "false" : "true");
  }
  if (registerView) {
    registerView.classList.toggle("is-hidden", !showRegister);
    registerView.setAttribute("aria-hidden", showRegister ? "false" : "true");
  }
  if (calculatorRoot) {
    calculatorRoot.classList.toggle("is-hidden", !showCalc);
    calculatorRoot.setAttribute("aria-hidden", showCalc ? "false" : "true");
  }
}

function showLoginError(message) {
  if (loginError) {
    loginError.textContent = message;
  }
}

function showRegisterError(message) {
  if (registerError) {
    registerError.textContent = message;
  }
}

function openRecoverModal() {
  if (!modalRecover) {
    return;
  }
  modalRecover.classList.remove("is-hidden");
  modalRecover.setAttribute("aria-hidden", "false");
  modalRecoverClose?.focus();
}

function closeRecoverModal() {
  if (!modalRecover) {
    return;
  }
  modalRecover.classList.add("is-hidden");
  modalRecover.setAttribute("aria-hidden", "true");
  linkRecover?.focus();
}

function enterApp() {
  setView("calculator");
  if (typeof bindCalculatorUI === "function") {
    bindCalculatorUI();
  }
}

function leaveApp() {
  if (typeof unbindCalculatorUI === "function") {
    unbindCalculatorUI();
  }
  clearSession();
  setView("login");
  if (loginForm) {
    loginForm.reset();
  }
  showLoginError("");
}

function tryLogin(username, password, remember) {
  if (!username || !password) {
    showLoginError("Preencha usuário e senha.");
    return;
  }
  if (!credentialsMatch(username, password)) {
    showLoginError("Usuário ou senha incorretos.");
    return;
  }
  showLoginError("");
  persistSession(remember);
  enterApp();
}

function tryRegister(username, password, passwordConfirm) {
  if (!username || !password) {
    showRegisterError("Preencha usuário e senha.");
    return;
  }
  if (password !== passwordConfirm) {
    showRegisterError("As senhas não coincidem.");
    return;
  }
  if (username.length < 2) {
    showRegisterError("Usuário deve ter pelo menos 2 caracteres.");
    return;
  }
  if (password.length < 4) {
    showRegisterError("Senha deve ter pelo menos 4 caracteres.");
    return;
  }
  const users = readRegisteredUsers();
  const taken =
    username === DEMO_USERNAME ||
    users.some((u) => u && u.username === username);
  if (taken) {
    showRegisterError("Este usuário já existe.");
    return;
  }
  users.push({ username, password });
  saveRegisteredUsers(users);
  showRegisterError("");
  registerForm?.reset();
  setView("login");
  if (inputLoginUser) {
    inputLoginUser.value = username;
  }
}

function togglePasswordVisibility(input, toggler) {
  if (!input || !toggler) {
    return;
  }
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";
  toggler.setAttribute(
    "aria-pressed",
    isHidden ? "true" : "false",
  );
  toggler.textContent = isHidden ? "Ocultar" : "Mostrar";
}

function initAuth() {
  if (isLoggedInPersisted()) {
    enterApp();
  } else {
    setView("login");
  }

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = inputLoginUser?.value.trim() ?? "";
    const password = inputLoginPass?.value ?? "";
    const remember = Boolean(inputRemember?.checked);
    tryLogin(username, password, remember);
  });

  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username =
      document.getElementById("register-username")?.value.trim() ?? "";
    const password =
      document.getElementById("register-password")?.value ?? "";
    const passwordConfirm =
      document.getElementById("register-password-confirm")?.value ?? "";
    tryRegister(username, password, passwordConfirm);
  });

  linkRecover?.addEventListener("click", (e) => {
    e.preventDefault();
    openRecoverModal();
  });

  modalRecoverClose?.addEventListener("click", () => {
    closeRecoverModal();
  });

  modalRecover?.addEventListener("click", (e) => {
    if (e.target === modalRecover) {
      closeRecoverModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalRecover && !modalRecover.classList.contains("is-hidden")) {
      closeRecoverModal();
    }
  });

  linkToRegister?.addEventListener("click", (e) => {
    e.preventDefault();
    showLoginError("");
    setView("register");
  });

  linkToLogin?.addEventListener("click", (e) => {
    e.preventDefault();
    showRegisterError("");
    setView("login");
  });

  btnLogout?.addEventListener("click", () => {
    leaveApp();
  });

  togglePasswordLogin?.addEventListener("click", () => {
    togglePasswordVisibility(inputLoginPass, togglePasswordLogin);
  });

  const regPass = document.getElementById("register-password");
  const regPassConfirm = document.getElementById("register-password-confirm");
  togglePasswordRegister?.addEventListener("click", () => {
    const showText = regPass?.type === "password";
    if (regPass) {
      regPass.type = showText ? "text" : "password";
    }
    if (regPassConfirm) {
      regPassConfirm.type = showText ? "text" : "password";
    }
    togglePasswordRegister.setAttribute(
      "aria-pressed",
      showText ? "true" : "false",
    );
    togglePasswordRegister.textContent = showText ? "Ocultar" : "Mostrar";
  });
}

initAuth();

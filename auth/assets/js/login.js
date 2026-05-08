(function () {
  "use strict";

  const body = document.body;
  const apiBase = (body.dataset.apiBase || "http://localhost:3001").replace(/\/$/, "");

  const msgEl = document.getElementById("msg");
  const tabLogin = document.getElementById("tab-login");
  const tabRegister = document.getElementById("tab-register");
  const panelLogin = document.getElementById("panel-login");
  const panelRegister = document.getElementById("panel-register");
  const formLogin = document.getElementById("form-login");
  const formRegister = document.getElementById("form-register");

  function showMessage(text, isSuccess) {
    msgEl.hidden = false;
    msgEl.textContent = text;
    msgEl.classList.toggle("is-success", Boolean(isSuccess));
  }

  function clearMessage() {
    msgEl.hidden = true;
    msgEl.textContent = "";
    msgEl.classList.remove("is-success");
  }

  function setActiveTab(isRegister) {
    tabLogin.classList.toggle("is-active", !isRegister);
    tabRegister.classList.toggle("is-active", isRegister);
    tabLogin.setAttribute("aria-selected", String(!isRegister));
    tabRegister.setAttribute("aria-selected", String(isRegister));

    panelLogin.classList.toggle("is-hidden", isRegister);
    panelRegister.classList.toggle("is-hidden", !isRegister);
    panelLogin.hidden = isRegister;
    panelRegister.hidden = !isRegister;
    clearMessage();
  }

  tabLogin.addEventListener("click", function () {
    setActiveTab(false);
  });

  tabRegister.addEventListener("click", function () {
    setActiveTab(true);
  });

  async function postJson(path, payload) {
    const res = await fetch(apiBase + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(function () {
      return {};
    });
    if (!res.ok) {
      const err = new Error(data.error || "Falha na requisição");
      err.status = res.status;
      throw err;
    }
    return data;
  }

  formLogin.addEventListener("submit", function (ev) {
    ev.preventDefault();
    clearMessage();
    const fd = new FormData(formLogin);
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    const btn = formLogin.querySelector('button[type="submit"]');
    btn.disabled = true;

    postJson("/api/auth/login", { email: email, password: password })
      .then(function (data) {
        if (data.token) {
          window.localStorage.setItem("token", data.token);
        }
        showMessage("Login realizado. Redirecionando…", true);
        window.setTimeout(function () {
          window.location.href = "../index.html";
        }, 400);
      })
      .catch(function (err) {
        showMessage(err.message || "Não foi possível entrar.");
      })
      .finally(function () {
        btn.disabled = false;
      });
  });

  formRegister.addEventListener("submit", function (ev) {
    ev.preventDefault();
    clearMessage();
    const fd = new FormData(formRegister);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "");

    const btn = formRegister.querySelector('button[type="submit"]');
    btn.disabled = true;

    postJson("/api/auth/register", {
      name: name,
      email: email,
      password: password,
    })
      .then(function (data) {
        if (data.token) {
          window.localStorage.setItem("token", data.token);
        }
        showMessage("Conta criada. Redirecionando…", true);
        window.setTimeout(function () {
          window.location.href = "../index.html";
        }, 400);
      })
      .catch(function (err) {
        showMessage(err.message || "Não foi possível cadastrar.");
      })
      .finally(function () {
        btn.disabled = false;
      });
  });
})();

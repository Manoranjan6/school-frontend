document.addEventListener("DOMContentLoaded", () => {

  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const eye = document.getElementById("eye");
  const msg = document.getElementById("msg");

  // 👁 Toggle password
  eye.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      eye.textContent = "🙈";
    } else {
      password.type = "password";
      eye.textContent = "👁";
    }
  });

});

// 🔥 LOGIN FUNCTION (GLOBAL)
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  console.log("Login clicked"); // DEBUG

  if (!username || !password) {
    msg.innerText = "⚠️ Please fill all fields";
    return;
  }

  try {
    const res = await fetch("https://school-backend-yk3x.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "admin.html";
    } else {
      msg.innerText = "❌ Invalid username or password";
    }

  } catch (err) {
    console.error(err);
    msg.innerText = "⚠️ Server error";
  }
}
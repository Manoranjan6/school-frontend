document.addEventListener("DOMContentLoaded", () => {

  const password = document.getElementById("password");
  const eye = document.getElementById("eye");

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

// 🔥 LOGIN FUNCTION
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

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

    console.log("Status:", res.status);
    console.log("Response:", data);

    if (res.ok) {
      localStorage.setItem("token", data.token);
      msg.innerText = "✅ Login successful";

      setTimeout(() => {
        window.location.href = "admin.html";
      }, 1000);

    } else {
      msg.innerText = "❌ " + data.message;
    }

  } catch (err) {
    console.error("Fetch Error:", err);
    msg.innerText = "⚠️ Server error";
  }
}
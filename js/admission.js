const form = document.getElementById("admissionForm");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const studentName = document.getElementById("studentName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  // 🔴 STRONG VALIDATION
  if (studentName.length < 3) {
    showError("Name must be at least 3 characters");
    return;
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    showError("Enter valid 10-digit mobile number");
    return;
  }

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    showError("Invalid email format");
    return;
  }

  const data = {
    studentName,
    classSeeking: document.getElementById("classSeeking").value,
    dob: document.getElementById("dob").value,
    parentName: document.getElementById("parentName").value,
    phone,
    email,
    presentSchool: document.getElementById("presentSchool").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("https://school-backend-yk3x.onrender.com/api/admissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
      showError(result.message || "Submission failed");
      return;
    }

    showSuccess("✅ Submitted Successfully");
    form.reset();

  } catch (err) {
    showError("Server error. Try again later.");
  }
});

function showError(msg) {
  statusMsg.style.color = "red";
  statusMsg.innerText = msg;
}

function showSuccess(msg) {
  statusMsg.style.color = "lightgreen";
  statusMsg.innerText = msg;
}
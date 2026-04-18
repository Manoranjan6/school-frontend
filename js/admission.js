const form = document.getElementById("admissionForm");
const successMsg = document.getElementById("successMsg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phone = document.getElementById("phone").value;

  // 🔴 VALIDATION (YOU DIDN’T DO THIS BEFORE)
  if (phone.length !== 10) {
    alert("Enter valid 10-digit mobile number");
    return;
  }

  const data = {
    studentName: document.getElementById("studentName").value,
    classSeeking: document.getElementById("classSeeking").value,
    dob: document.getElementById("dob").value,
    parentName: document.getElementById("parentName").value,
    phone,
    email: document.getElementById("email").value,
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

    successMsg.style.display = "block";
    form.reset();

  } catch (err) {
    alert("Error submitting form");
  }
});
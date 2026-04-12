document.getElementById("admissionForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
  studentName: document.getElementById("name").value,
  classSeeking: document.getElementById("class").value,
  dob: document.getElementById("dob").value,
  parentName: document.getElementById("parent").value,
  phone: document.getElementById("phone").value,
  email: document.getElementById("email").value,
  presentSchool: document.getElementById("school").value,
  message: document.getElementById("message").value
};

  try {
    const res = await fetch("https://school-backend-yk3x.onrender.com/api/admission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    document.getElementById("responseMsg").innerText = "✅ Submitted Successfully";
    document.getElementById("admissionForm").reset();

  } catch (err) {
    document.getElementById("responseMsg").innerText = "❌ Error submitting form";
  }
});
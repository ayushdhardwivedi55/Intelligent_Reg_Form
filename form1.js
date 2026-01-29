// // ================= STEPS =================
// const steps = document.querySelectorAll(".step");
// const nextBtns = document.querySelectorAll(".next-btn");
// const prevBtns = document.querySelectorAll(".prev-btn");
// const form = document.getElementById("registrationForm");
// const formMessage = document.getElementById("formMessage");

// let currentStep = 0;

// // ================= DATA =================
// const disposableDomains = ["tempmail.com", "10minutemail.com", "mailinator.com"];

// const statesByCountry = {
//   IN: [
//     "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi",
//     "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
//     "Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu",
//     "Telangana","Uttar Pradesh","Uttarakhand","West Bengal"
//   ],
//   US: ["California", "Texas", "New York"],
//   UK: ["England", "Scotland", "Wales"]
// };

// const citiesByState = {
//   "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket"],
//   "Uttar Pradesh": ["Lucknow", "Noida", "Kanpur", "Varanasi"],
//   "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
//   "Karnataka": ["Bengaluru", "Mysuru", "Mangalore", "Hubli"],
//   "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"]
// };

// const countrySelect = document.getElementById("country");
// const stateSelect = document.getElementById("state");
// const citySelect = document.getElementById("city");

// // ================= STEP DISPLAY =================
// function showStep(stepIndex) {
//   steps.forEach((step, index) => {
//     step.classList.toggle("active", index === stepIndex);
//   });
// }
// showStep(currentStep);

// // ================= FORM MESSAGE =================
// function showFormMessage(message, type) {
//   formMessage.textContent = message;
//   formMessage.className = `form-message ${type}`;
// }

// function clearFormMessage() {
//   formMessage.textContent = "";
//   formMessage.className = "form-message";
// }

// // ================= DROPDOWNS =================
// countrySelect.addEventListener("change", () => {
//   stateSelect.innerHTML = '<option value="">Select State</option>';
//   citySelect.innerHTML = '<option value="">Select City</option>';

//   const country = countrySelect.value;
//   if (statesByCountry[country]) {
//     statesByCountry[country].forEach(state => {
//       const opt = document.createElement("option");
//       opt.value = state;
//       opt.textContent = state;
//       stateSelect.appendChild(opt);
//     });
//   }
// });

// stateSelect.addEventListener("change", () => {
//   citySelect.innerHTML = '<option value="">Select City</option>';
//   const state = stateSelect.value;

//   if (citiesByState[state]) {
//     citiesByState[state].forEach(city => {
//       const opt = document.createElement("option");
//       opt.value = city;
//       opt.textContent = city;
//       citySelect.appendChild(opt);
//     });
//   }
// });

// // ================= ERROR HANDLING =================
// function showError(input, message) {
//   input.classList.add("error");
//   const errorEl = input.closest(".form-group")?.querySelector(".error-text");
//   if (errorEl) errorEl.textContent = message;
// }

// function clearError(input) {
//   input.classList.remove("error");
//   const errorEl = input.closest(".form-group")?.querySelector(".error-text");
//   if (errorEl) errorEl.textContent = "";
// }

// // ================= VALIDATION (ONLY REQUIRED FIELDS) =================
// function validateStep(stepIndex) {
//   let valid = true;

//   const requiredFields = [
//     "firstName",
//     "lastName",
//     "email",
//     "phone",
//     "gender"
//   ];

//   requiredFields.forEach(id => {
//     const input = document.getElementById(id);
//     if (input && steps[stepIndex].contains(input)) {
//       if (!input.value.trim()) {
//         showError(input, "This field is required");
//         valid = false;
//       } else {
//         clearError(input);
//       }
//     }
//   });

//   // Email validation
//   const email = document.getElementById("email");
//   if (email && email.value) {
//     const domain = email.value.split("@")[1];
//     if (!email.value.includes("@") || disposableDomains.includes(domain)) {
//       showError(email, "Invalid or disposable email not allowed");
//       valid = false;
//     }
//   }

//   // Phone validation
//   const phone = document.getElementById("phone");
//   if (phone && phone.value && !/^\d{10}$/.test(phone.value)) {
//     showError(phone, "Phone number must be 10 digits");
//     valid = false;
//   }

//   if (nextBtns[stepIndex]) {
//     nextBtns[stepIndex].disabled = !valid;
//   }

//   return valid;
// }

// // ================= NAVIGATION =================
// nextBtns.forEach(btn => {
//   btn.addEventListener("click", () => {
//     clearFormMessage();
//     if (validateStep(currentStep)) {
//       currentStep++;
//       showStep(currentStep);
//     } else {
//       showFormMessage("❌ Please fill required fields.", "error");
//     }
//   });
// });

// prevBtns.forEach(btn => {
//   btn.addEventListener("click", () => {
//     currentStep--;
//     showStep(currentStep);
//     clearFormMessage();
//   });
// });

// // ================= REAL-TIME =================
// document.querySelectorAll("input, select, textarea").forEach(el => {
//   el.addEventListener("input", () => validateStep(currentStep));
//   el.addEventListener("change", () => validateStep(currentStep));
// });

// // ================= PASSWORD STRENGTH =================
// function checkPasswordStrength(password) {
//   let strength = 0;
//   if (password.length >= 8) strength++;
//   if (/[A-Z]/.test(password)) strength++;
//   if (/[a-z]/.test(password)) strength++;
//   if (/[0-9]/.test(password)) strength++;
//   if (/[^A-Za-z0-9]/.test(password)) strength++;

//   if (strength <= 2) return "weak";
//   if (strength <= 4) return "medium";
//   return "strong";
// }

// // ================= SUBMIT =================
// form.addEventListener("submit", function (e) {
//   e.preventDefault();
//   clearFormMessage();

//   const password = document.getElementById("password").value;
//   const confirmPassword = document.getElementById("confirmPassword").value;
//   const terms = document.getElementById("terms");

//   if (password && checkPasswordStrength(password) !== "strong") {
//     showFormMessage("❌ Password must be strong.", "error");
//     return;
//   }

//   if (password && password !== confirmPassword) {
//     showFormMessage("❌ Passwords do not match.", "error");
//     return;
//   }

//   if (!terms.checked) {
//     showFormMessage("❌ Please accept Terms & Conditions.", "error");
//     return;
//   }

//   showFormMessage("✅ Registration Successful!", "success");
//   form.reset();
//   currentStep = 0;
//   showStep(currentStep);
// });




// ================= ELEMENTS =================
const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const form = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");
const submitBtn = document.querySelector(".submit-btn");

let currentStep = 0;

// ================= DATA =================
const disposableDomains = ["tempmail.com", "10minutemail.com", "mailinator.com"];

// ================= STEP DISPLAY =================
function showStep(stepIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === stepIndex);
  });
}
showStep(currentStep);

// ================= FORM MESSAGE =================
function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.className = "form-message";
}

// ================= ERROR HANDLING =================
function showError(input, message) {
  input.classList.add("error");
  const errorEl = input.closest(".form-group")?.querySelector(".error-text");
  if (errorEl) errorEl.textContent = message;
}

function clearError(input) {
  input.classList.remove("error");
  const errorEl = input.closest(".form-group")?.querySelector(".error-text");
  if (errorEl) errorEl.textContent = "";
}

// ================= REQUIRED FIELD VALIDATION =================
function validateStep(stepIndex) {
  let valid = true;

  const requiredFields = ["firstName", "lastName", "email", "phone", "gender"];

  requiredFields.forEach(id => {
    const el = document.getElementById(id);
    if (el && steps[stepIndex].contains(el)) {
      if (!el.value.trim()) {
        showError(el, "This field is required");
        valid = false;
      } else {
        clearError(el);
      }
    }
  });

  // Email check
  const email = document.getElementById("email");
  if (email && email.value) {
    const domain = email.value.split("@")[1];
    if (!email.value.includes("@") || disposableDomains.includes(domain)) {
      showError(email, "Invalid or disposable email");
      valid = false;
    }
  }

  // Phone check
  const phone = document.getElementById("phone");
  if (phone && phone.value && !/^\d{10}$/.test(phone.value)) {
    showError(phone, "Phone must be 10 digits");
    valid = false;
  }

  if (nextBtns[stepIndex]) {
    nextBtns[stepIndex].disabled = !valid;
  }

  return valid;
}

// ================= NAVIGATION =================
nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    clearFormMessage();
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    } else {
      showFormMessage("❌ Please fill required fields.", "error");
    }
  });
});

prevBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentStep--;
    showStep(currentStep);
    clearFormMessage();
  });
});

// ================= PASSWORD STRENGTH =================
function checkPasswordStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 2) return "weak";
  if (strength <= 4) return "medium";
  return "strong";
}

// ================= PASSWORD UI =================
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const strengthBar = document.querySelector(".strength-fill");
const strengthPercent = document.querySelector(".strength-percent");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const strength = checkPasswordStrength(password);
  const errorEl = passwordInput
    .closest(".form-group")
    .querySelector(".error-text");

  // Reset when empty
  if (!password) {
    errorEl.textContent = "";
    strengthBar.style.width = "0%";
    strengthPercent.textContent = "";
    updateSubmitState();
    return;
  }

  if (strength === "weak") {
    errorEl.textContent = "Password Strength: Weak";
    errorEl.style.color = "red";
    strengthBar.style.width = "33%";
    strengthBar.style.background = "red";
    strengthPercent.textContent = "33%";
    strengthPercent.style.color = "red";
  } 
  else if (strength === "medium") {
    errorEl.textContent = "Password Strength: Medium";
    errorEl.style.color = "orange";
    strengthBar.style.width = "66%";
    strengthBar.style.background = "orange";
    strengthPercent.textContent = "66%";
    strengthPercent.style.color = "orange";
  } 
  else {
    errorEl.textContent = "Password Strength: Strong";
    errorEl.style.color = "green";
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
    strengthPercent.textContent = "100%";
    strengthPercent.style.color = "green";
  }

  updateSubmitState();
});

// ================= CONFIRM PASSWORD =================
confirmPasswordInput.addEventListener("input", () => {
  const errorEl = confirmPasswordInput
    .closest(".form-group")
    .querySelector(".error-text");

  if (!confirmPasswordInput.value) {
    errorEl.textContent = "";
    updateSubmitState();
    return;
  }

  if (confirmPasswordInput.value !== passwordInput.value) {
    errorEl.textContent = "Passwords do not match";
    errorEl.style.color = "red";
  } else {
    errorEl.textContent = "Passwords match ✔";
    errorEl.style.color = "green";
  }

  updateSubmitState();
});

// ================= SUBMIT ENABLE/DISABLE =================
function updateSubmitState() {
  let valid = true;

  const requiredIds = ["firstName", "lastName", "email", "phone", "gender"];
  requiredIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) valid = false;
  });

  const email = document.getElementById("email").value;
  if (!email.includes("@")) valid = false;

  const phone = document.getElementById("phone").value;
  if (!/^\d{10}$/.test(phone)) valid = false;

  const password = passwordInput.value;
  if (password && checkPasswordStrength(password) !== "strong") valid = false;

  if (!document.getElementById("terms").checked) valid = false;

  submitBtn.disabled = !valid;
}

// ================= REAL-TIME =================
document.querySelectorAll("input, select, textarea").forEach(el => {
  el.addEventListener("input", () => {
    validateStep(currentStep);
    updateSubmitState();
  });
  el.addEventListener("change", () => {
    validateStep(currentStep);
    updateSubmitState();
  });
});

// ================= INITIAL STATE =================
submitBtn.disabled = true;

// ================= SUBMIT =================
form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearFormMessage();

  showFormMessage("✅ Registration Successful!", "success");
   alert(
    "Registration Successful!\n\nYour profile has been submitted successfully."
  );
  form.reset();
  currentStep = 0;
  showStep(currentStep);
  submitBtn.disabled = true;
});


const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
const form = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");
const submitBtn = document.querySelector(".submit-btn");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const allowedDomains = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "yahoo.in",
  "icloud.com",
  "live.com",
  "msn.com",
  "protonmail.com",
  "rediffmail.com"
];

const progressFill = document.getElementById("progressFill");
const stepCount = document.getElementById("stepCount");

let currentStep = 0;

const disposableDomains = ["tempmail.com", "10minutemail.com", "mailinator.com"];
const statesByCountry = {
  IN: [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
    "Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu",
    "Telangana","Uttar Pradesh","Uttarakhand","West Bengal"
  ],
  US: ["California", "Texas", "New York"],
  UK: ["England", "Scotland", "Wales"]
};

const citiesByState = {
  // -------- INDIA --------
  "Andhra Pradesh": ["Visakhapatnam","Vijayawada","Guntur","Nellore","Kurnool","Rajahmundry"],
  "Arunachal Pradesh": ["Itanagar","Naharlagun","Tawang","Ziro","Pasighat"],
  "Assam": ["Guwahati","Silchar","Dibrugarh","Jorhat","Tezpur","Nagaon"],
  "Bihar": ["Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga","Purnia"],
  "Chhattisgarh": ["Raipur","Bilaspur","Durg","Bhilai","Korba","Jagdalpur"],
  "Delhi": ["New Delhi","Dwarka","Rohini","Saket","Karol Bagh","Lajpat Nagar"],
  "Goa": ["Panaji","Margao","Vasco da Gama","Mapusa","Ponda"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar"],
  "Haryana": ["Gurugram","Faridabad","Panipat","Ambala","Hisar","Karnal"],
  "Himachal Pradesh": ["Shimla","Manali","Dharamshala","Solan","Mandi","Kullu"],
  "Jharkhand": ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Hazaribagh"],
  "Karnataka": ["Bengaluru","Mysuru","Mangalore","Hubli","Belagavi","Shivamogga"],
  "Kerala": ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Alappuzha"],
  "Madhya Pradesh": ["Bhopal","Indore","Jabalpur","Gwalior","Ujjain","Sagar"],
  "Maharashtra": ["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Kolhapur"],
  "Odisha": ["Bhubaneswar","Cuttack","Rourkela","Sambalpur","Puri","Balasore"],
  "Punjab": ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali"],
  "Rajasthan": ["Jaipur","Jodhpur","Udaipur","Kota","Bikaner","Ajmer"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Salem","Tiruchirappalli","Erode"],
  "Telangana": ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Mahbubnagar"],
  "Uttar Pradesh": ["Lucknow","Noida","Kanpur","Varanasi","Agra","Prayagraj"],
  "Uttarakhand": ["Dehradun","Haridwar","Rishikesh","Nainital","Haldwani"],
  "West Bengal": ["Kolkata","Howrah","Durgapur","Siliguri","Asansol","Bardhaman"],

  // -------- USA --------
  "California": ["Los Angeles","San Francisco","San Diego","San Jose","Sacramento"],
  "Texas": ["Houston","Dallas","Austin","San Antonio","Fort Worth"],
  "New York": ["New York City","Buffalo","Rochester","Albany","Syracuse"],

  // -------- UK --------
  "England": ["London","Manchester","Birmingham","Leeds","Liverpool","Bristol"],
  "Scotland": ["Edinburgh","Glasgow","Aberdeen","Dundee","Inverness"],
  "Wales": ["Cardiff","Swansea","Newport","Wrexham","Bangor"]
};
const countrySelect = document.getElementById("country");
const stateSelect = document.getElementById("state");
const citySelect = document.getElementById("city");

function showStep(stepIndex) {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === stepIndex);
  });

  const totalSteps = steps.length;
  const percent = ((stepIndex + 1) / totalSteps) * 100;

  if (progressFill) progressFill.style.width = percent + "%";
  if (stepCount) stepCount.textContent = stepIndex + 1;
}
showStep(currentStep);

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.className = `form-message ${type}`;
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.className = "form-message";
}

countrySelect.addEventListener("change", () => {
  stateSelect.innerHTML = '<option value="">Select State</option>';
  citySelect.innerHTML = '<option value="">Select City</option>';

  const country = countrySelect.value;
  if (statesByCountry[country]) {
    statesByCountry[country].forEach(state => {
      const opt = document.createElement("option");
      opt.value = state;
      opt.textContent = state;
      stateSelect.appendChild(opt);
    });
  }
});

stateSelect.addEventListener("change", () => {
  citySelect.innerHTML = '<option value="">Select City</option>';
  const state = stateSelect.value;

  if (citiesByState[state]) {
    citiesByState[state].forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      opt.textContent = city;
      citySelect.appendChild(opt);
    });
  }
});

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

const email = document.getElementById("email");

if (email && email.value.trim()) {
  const emailValue = email.value.trim().toLowerCase();
  const domain = emailValue.split("@")[1];

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(emailValue)) {
    showError(email, "Invalid email format (example: name@gmail.com)");
    valid = false;
  } 
  else if (disposableDomains.includes(domain)) {
    showError(email, "Disposable emails are not allowed");
    valid = false;
  } 
  else if (!allowedDomains.includes(domain)) {
    showError(email, "Please use a valid email provider");
    valid = false;
  } 
  else {
    clearError(email);
  }
}

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

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const strengthBar = document.querySelector(".strength-fill");
const strengthPercent = document.querySelector(".strength-percent");

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const strength = checkPasswordStrength(password);
  const errorEl = passwordInput.closest(".form-group").querySelector(".error-text");

  if (!password) {
    errorEl.textContent = "";
    strengthBar.style.width = "0%";
    strengthPercent.textContent = "";
    updateSubmitState();
    return;
  }

  if (strength === "weak") {
    errorEl.textContent = "Password Strength: Weak";
    strengthBar.style.width = "33%";
    strengthBar.style.background = "red";
    strengthPercent.textContent = "33%";
  } else if (strength === "medium") {
    errorEl.textContent = "Password Strength: Medium";
    strengthBar.style.width = "66%";
    strengthBar.style.background = "orange";
    strengthPercent.textContent = "66%";
  } else {
    errorEl.textContent = "Password Strength: Strong";
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
    strengthPercent.textContent = "100%";
  }

  updateSubmitState();
});

confirmPasswordInput.addEventListener("input", () => {
  const errorEl = confirmPasswordInput.closest(".form-group").querySelector(".error-text");

  if (!confirmPasswordInput.value) {
    errorEl.textContent = "";
    updateSubmitState();
    return;
  }

  if (confirmPasswordInput.value !== passwordInput.value) {
    errorEl.textContent = "Passwords do not match";
  } else {
    errorEl.textContent = "Passwords match ✔";
  }

  updateSubmitState();
});

function updateSubmitState() {
  let valid = true;

  ["firstName", "lastName", "email", "phone", "gender"].forEach(id => {
    const el = document.getElementById(id);
    if (!el || !el.value.trim()) valid = false;
  });

  if (!document.getElementById("terms").checked) valid = false;

  if (!passwordInput.value.trim()) valid = false;

  if (passwordInput.value !== confirmPasswordInput.value) valid = false;

  submitBtn.disabled = !valid;
}

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

submitBtn.disabled = true;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearFormMessage();

  showFormMessage(
    "✅ Registration Successful! Your profile has been submitted successfully.",
    "success"
  );
   alert(
    "Registration Successful!\n\nYour profile has been submitted successfully."
  );

  form.reset();
  currentStep = 0;
  showStep(currentStep);
  submitBtn.disabled = true;
});

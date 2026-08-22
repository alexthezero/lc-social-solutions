const PREVIEW_PASSWORD_HASH = "a337f882bb914cecf772439a0c118d3e50893b76bddd02f13d0b9fe3c6ec446c";
const PREVIEW_SESSION_KEY = "lc-social-solutions-preview";

const accessGate = document.getElementById("accessGate");
const accessForm = document.getElementById("accessForm");
const passwordInput = document.getElementById("previewPassword");
const gateStatus = document.getElementById("gateStatus");
const togglePassword = document.getElementById("togglePassword");

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function unlockPreview(immediate = false) {
  document.body.classList.remove("locked");

  if (!accessGate) return;

  if (immediate) {
    accessGate.remove();
    return;
  }

  gateStatus.textContent = "Access granted.";
  gateStatus.className = "gate-status success";
  accessGate.classList.add("is-leaving");
  window.setTimeout(() => accessGate.remove(), 420);
}

if (sessionStorage.getItem(PREVIEW_SESSION_KEY) === "unlocked") {
  unlockPreview(true);
}

accessForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = accessForm.querySelector('button[type="submit"]');
  const suppliedPassword = passwordInput.value.trim();

  submitButton.disabled = true;
  gateStatus.textContent = "Checking access…";
  gateStatus.className = "gate-status";

  try {
    const suppliedHash = await sha256(suppliedPassword);

    if (suppliedHash !== PREVIEW_PASSWORD_HASH) {
      throw new Error("Incorrect password");
    }

    sessionStorage.setItem(PREVIEW_SESSION_KEY, "unlocked");
    unlockPreview();
  } catch (error) {
    gateStatus.textContent = "That password is not correct. Please try again.";
    gateStatus.className = "gate-status error";
    passwordInput.select();
    window.setTimeout(() => {
      submitButton.disabled = false;
    }, 500);
  }
});

togglePassword?.addEventListener("click", () => {
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text";
  togglePassword.textContent = isVisible ? "Show" : "Hide";
  togglePassword.setAttribute("aria-label", isVisible ? "Show password" : "Hide password");
  passwordInput.focus();
});

const lockPreview = document.getElementById("lockPreview");
lockPreview?.addEventListener("click", () => {
  sessionStorage.removeItem(PREVIEW_SESSION_KEY);
  location.reload();
});

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function closeNavigation() {
  navLinks?.classList.remove("active");
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

document.addEventListener("click", (event) => {
  if (!navLinks?.classList.contains("active")) return;
  if (navLinks.contains(event.target) || navToggle?.contains(event.target)) return;
  closeNavigation();
});

const serviceSelect = document.getElementById("serviceSelect");
document.querySelectorAll(".package-choice").forEach((choice) => {
  choice.addEventListener("click", () => {
    if (serviceSelect && choice.dataset.package) {
      serviceSelect.value = choice.dataset.package;
    }
  });
});

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = String(data.get("name") || "there").trim();
  const service = String(data.get("service") || "social media support").trim();

  formStatus.textContent = `Preview complete — ${name}, this request would be routed as an inquiry for ${service} once the live form is connected.`;
  formStatus.classList.add("success");
});

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

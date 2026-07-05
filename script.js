const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const packageButtons = document.querySelectorAll(".package-btn");
const serviceSelect = document.getElementById("service");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

packageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedPackage = button.dataset.package;

    if (serviceSelect && selectedPackage) {
      serviceSelect.value = selectedPackage;
    }

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "A potential client";
    const business = formData.get("business") || "their business";
    const service = formData.get("service") || "social media support";
    const message = formData.get("message") || "No extra details added yet.";

    formNote.innerHTML = `
      <strong>Sample inquiry created:</strong><br>
      ${name} from ${business} is interested in <strong>${service}</strong>.<br>
      Message: ${message}<br><br>
      When you add a real business email, this form can be connected to Formspree, Netlify Forms, EmailJS, or a custom backend.
    `;

    contactForm.reset();
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealOnScroll.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px",
  }
);

revealElements.forEach((element) => revealOnScroll.observe(element));

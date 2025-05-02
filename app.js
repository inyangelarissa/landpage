
 // Mobile Menu Toggle
function toggleMenu() {
    const menu = document.getElementById("mobileMenu");
    const icon = document.getElementById("menu-icon");
  
    const isVisible = menu.style.display === "flex";
  
    menu.style.display = isVisible ? "none" : "flex";
    icon.src = isVisible ? "menu.svg" : "x.svg";
  }
  
  // Highlight active page in nav links (desktop & mobile)
  document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-link, .mobile-link");
    const currentPath = window.location.pathname;
  
    links.forEach(link => {
      const linkPath = new URL(link.href, window.location.origin).pathname;
      if (linkPath === currentPath) {
        link.classList.add("active");
      }
    });
  
    // Make other buttons show feedback if needed
    const actionButtons = document.querySelectorAll(".btn, .donate-btn, button");
  
    actionButtons.forEach(button => {
      button.addEventListener("click", event => {
        // Optional: prevent default for anchor buttons
        if (button.tagName.toLowerCase() === "a") {
          const href = button.getAttribute("href");
          if (href === "#" || href === "") {
            event.preventDefault();
            alert("This button is not linked yet.");
          }
        }
  
        // Example feedback for Subscribe button
        if (button.textContent.trim().toLowerCase().includes("subscribe")) {
          event.preventDefault();
          const emailInput = document.querySelector('input[type="email"]');
          if (emailInput && emailInput.value.trim() !== "") {
            alert("Thank you for subscribing with: " + emailInput.value);
            emailInput.value = "";
          } else {
            alert("Please enter a valid email address.");
          }
        }
      });
    });
  });
  function scrollCarousel(direction) {
    const track = document.getElementById("partnersCarousel");
    const scrollAmount = 180; // Adjust based on item width + gap
    track.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth"
    });
  }
  
  // Optional: Auto-scroll
  setInterval(() => {
    scrollCarousel(1);
  }, 5000);
     
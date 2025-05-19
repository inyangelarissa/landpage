// Donate page specific JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Add hover-circle spans to nav links if they don't already have them
  const navLinks = document.querySelectorAll(".nav-links a:not(.donate)")
  navLinks.forEach((link) => {
    if (!link.querySelector(".hover-circle")) {
      const hoverCircle = document.createElement("span")
      hoverCircle.className = "hover-circle"
      link.appendChild(hoverCircle)
    }
  })

  // Initialize AOS animation library
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    })
  }

  // Enhanced hero section shadow effect
  const heroSection = document.querySelector(".donate-hero-section")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const opacity = Math.min(0.8, 0.3 + scrollPosition / 1000)

      const heroShadowOverlay = document.querySelector(".donate-hero-section .hero-shadow-overlay")
      if (heroShadowOverlay) {
        heroShadowOverlay.style.boxShadow = `inset 0 -50px ${100 + scrollPosition / 5}px rgba(0, 0, 0, ${opacity})`
      }
    })
  }

  // Enhanced animations for cards
  const cards = document.querySelectorAll(".card-hover-effect")
  if (cards.length) {
    cards.forEach((card) => {
      card.addEventListener("mousemove", handleCardTilt)
      card.addEventListener("mouseleave", resetCardTilt)
    })
  }

  // Function to handle card tilt effect
  function handleCardTilt(e) {
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`
  }

  // Function to reset card tilt
  function resetCardTilt() {
    this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"

    // Add a small delay before allowing the hover effect to take over again
    setTimeout(() => {
      this.style.transition = "transform 0.5s ease, box-shadow 0.5s ease"
    }, 100)
  }

  // Custom amount toggle
  const customAmountRadio = document.querySelector('input[name="amount"][value="custom"]')
  const customAmountContainer = document.getElementById("custom-amount-container")

  if (customAmountRadio && customAmountContainer) {
    // Show/hide custom amount field based on radio selection
    document.querySelectorAll('input[name="amount"]').forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.value === "custom") {
          customAmountContainer.style.display = "block"
          document.getElementById("custom-amount").focus()
        } else {
          customAmountContainer.style.display = "none"
        }
      })
    })
  }

  // Payment method selection
  const paymentMethods = document.querySelectorAll('input[name="payment-method"]')
  const momoPayment = document.getElementById("momo-payment")
  const cardPayment = document.getElementById("card-payment")
  const bankPayment = document.getElementById("bank-payment")

  if (paymentMethods.length && momoPayment && cardPayment && bankPayment) {
    paymentMethods.forEach((method) => {
      method.addEventListener("change", function () {
        // Hide all payment details
        momoPayment.classList.add("hidden")
        cardPayment.classList.add("hidden")
        bankPayment.classList.add("hidden")

        // Show selected payment details
        if (this.value === "momo") {
          momoPayment.classList.remove("hidden")
        } else if (this.value === "card") {
          cardPayment.classList.remove("hidden")
        } else if (this.value === "bank") {
          bankPayment.classList.remove("hidden")
        }
      })
    })
  }

  // Flutterwave payment modal
  const flutterwaveBtn = document.querySelector(".flutterwave-btn")
  const paymentModal = document.getElementById("flutterwave-modal")
  const modalClose = document.querySelector(".modal-close")
  const modalAmount = document.getElementById("modal-amount")

  if (flutterwaveBtn && paymentModal && modalClose) {
    flutterwaveBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Get donation amount
      let amount = ""
      const selectedAmount = document.querySelector('input[name="amount"]:checked')

      if (selectedAmount) {
        if (selectedAmount.value === "custom") {
          amount = document.getElementById("custom-amount").value || "100"
        } else {
          amount = selectedAmount.value
        }
      } else {
        amount = "100"
      }

      // Update modal amount
      if (modalAmount) {
        modalAmount.textContent = `$${amount}.00`
      }

      // Show modal
      paymentModal.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling
    })

    // Close modal when clicking close button
    modalClose.addEventListener("click", () => {
      paymentModal.classList.remove("active")
      document.body.style.overflow = "" // Re-enable scrolling
    })

    // Close modal when clicking outside
    paymentModal.addEventListener("click", (e) => {
      if (e.target === paymentModal) {
        paymentModal.classList.remove("active")
        document.body.style.overflow = "" // Re-enable scrolling
      }
    })
  }

  // Payment tabs in modal
  const paymentTabs = document.querySelectorAll(".payment-tab")
  const paymentTabContents = document.querySelectorAll(".payment-tab-content")

  if (paymentTabs.length && paymentTabContents.length) {
    paymentTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        // Remove active class from all tabs and contents
        paymentTabs.forEach((t) => t.classList.remove("active"))
        paymentTabContents.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked tab
        this.classList.add("active")

        // Show corresponding content
        const tabId = this.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
      })
    })
  }

  // Donation form submission
  const donationForm = document.getElementById("donation-form")
  if (donationForm) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get donation amount
      let amount = ""
      const selectedAmount = document.querySelector('input[name="amount"]:checked')

      if (selectedAmount) {
        if (selectedAmount.value === "custom") {
          amount = document.getElementById("custom-amount").value
        } else {
          amount = selectedAmount.value
        }
      }

      // Get other form values
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value

      // Simple validation
      if (!amount || !firstName || !lastName || !email) {
        alert("Please fill in all required fields.")
        return
      }

      // Show Flutterwave modal
      if (paymentModal) {
        // Update modal amount
        if (modalAmount) {
          modalAmount.textContent = `$${amount}.00`
        }

        // Show modal
        paymentModal.classList.add("active")
        document.body.style.overflow = "hidden" // Prevent scrolling
      }
    })
  }

  // Animated counter for impact numbers
  function startCountAnimation() {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      // Only animate if counter is visible and hasn't been animated yet
      if (isElementInViewport(counter) && !counter.classList.contains("counted")) {
        const target = Number.parseInt(counter.getAttribute("data-count"))
        const duration = 2000 // 2 seconds
        const step = Math.ceil(target / (duration / 20)) // Update every 20ms
        let current = 0

        const timer = setInterval(() => {
          current += step
          if (current >= target) {
            current = target
            clearInterval(timer)
            counter.classList.add("counted")
          }
          counter.textContent = current
        }, 20)
      }
    })
  }

  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Start counting when scrolling
  window.addEventListener("scroll", () => {
    startCountAnimation()
  })

  // Initial count animation
  startCountAnimation()

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Add CSS for payment overlay and modal
  const paymentStyle = document.createElement("style")
  paymentStyle.textContent = `
    .payment-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    
    .payment-modal {
      background: white;
      width: 90%;
      max-width: 500px;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .payment-header {
      background: linear-gradient(135deg, #4285f4 0%, #6366f1 100%);
      color: white;
      padding: 1.5rem;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .payment-header h3 {
      margin: 0;
      font-size: 1.5rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .payment-close {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 1.5rem;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.3s ease;
    }
    
    .payment-close:hover {
      background: rgba(255, 255, 255, 0.3);
    }
    
    .payment-body {
      padding: 2rem;
    }
    
    .payment-amount {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .amount-value {
      font-size: 1.5rem;
      color: var(--primary);
    }
    
    .card-logos {
      display: flex;
      gap: 1rem;
      margin-bottom: 1.5rem;
      justify-content: center;
    }
    
    .card-logo {
      width: 50px;
      height: 30px;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    
    .card-logo.visa {
      background-image: url('https://cdn.jsdelivr.net/gh/stephenhutchings/microns/svg/visa.svg');
    }
    
    .card-logo.mastercard {
      background-image: url('https://cdn.jsdelivr.net/gh/stephenhutchings/microns/svg/mastercard.svg');
    }
    
    .card-logo.amex {
      background-image: url('https://cdn.jsdelivr.net/gh/stephenhutchings/microns/svg/amex.svg');
    }
    
    .card-logo.discover {
      background-image: url('https://cdn.jsdelivr.net/gh/stephenhutchings/microns/svg/discover.svg');
    }
    
    .payment-note {
      margin-top: 1.5rem;
      padding: 1rem;
      background: rgba(59, 130, 246, 0.05);
      border-radius: 8px;
      font-size: 0.9rem;
    }
    
    .payment-note i {
      color: var(--primary);
      margin-right: 0.5rem;
    }
    
    .payment-footer {
      padding: 1.5rem 2rem;
      background: #f9fafb;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .payment-btn {
      width: 100%;
      padding: 1rem;
      font-size: 1.1rem;
    }
    
    .payment-secured {
      text-align: center;
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #6b7280;
    }
    
    .payment-secured i {
      margin-right: 0.5rem;
    }
    
    .payment-success {
      padding: 3rem 2rem;
      text-align: center;
    }
    
    .success-icon {
      font-size: 4rem;
      color: #10b981;
      margin-bottom: 1.5rem;
      animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .provider-options {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .provider-option {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .provider-option:hover {
      background: rgba(59, 130, 246, 0.05);
    }
    
    .provider-option input[type="radio"] {
      margin: 0;
    }
    
    .provider-logo {
      font-weight: 600;
    }
    
    .provider-logo.mtn {
      color: #ffcc00;
    }
    
    .provider-logo.airtel {
      color: #ff0000;
    }
    
    .provider-logo.tigo {
      color: #0066cc;
    }
    
    .alert {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      background: white;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      z-index: 1000;
      animation: alertSlideIn 0.3s ease;
      max-width: 400px;
    }
    
    @keyframes alertSlideIn {
      from {
        opacity: 0;
        transform: translateX(50px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .alert-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .alert.alert-error {
      border-left: 4px solid #ef4444;
    }
    
    .alert.alert-error i {
      color: #ef4444;
    }
    
    .alert.alert-info {
      border-left: 4px solid #3b82f6;
    }
    
    .alert.alert-info i {
      color: #3b82f6;
    }
    
    .alert-close {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: #6b7280;
      padding: 0;
    }
  `
  document.head.appendChild(paymentStyle)
})

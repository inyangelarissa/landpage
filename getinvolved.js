// Get Involved page specific JavaScript

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

  // Initialize tab functionality
  const tabs = document.querySelectorAll(".tab")
  const tabContents = document.querySelectorAll(".tab-content")

  // Function to switch tabs
  window.switchTab = (tabId) => {
    // Remove active class from all tabs and tab contents
    tabs.forEach((tab) => tab.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to selected tab and tab content
    document.querySelector(`.tab[onclick*="${tabId}"]`).classList.add("active")
    document.getElementById(tabId).classList.add("active")

    // Add animation to the active tab content
    const activeContent = document.getElementById(tabId)
    activeContent.style.animation = "none"
    setTimeout(() => {
      activeContent.style.animation = "fadeIn 0.5s ease-in-out"
    }, 10)

    // Start counting animation for stats in the active tab
    startCountAnimation()
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

  // Enhanced hero section shadow effect
  const heroSection = document.querySelector(".getinvolved-hero-section")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const opacity = Math.min(0.8, 0.3 + scrollPosition / 1000)

      const heroShadowOverlay = document.querySelector(".getinvolved-hero-section .hero-shadow-overlay")
      if (heroShadowOverlay) {
        heroShadowOverlay.style.boxShadow = `inset 0 -50px ${100 + scrollPosition / 5}px rgba(0, 0, 0, ${opacity})`
      }
    })
  }

  // Add staggered animation to cards
  const addStaggeredAnimation = (elements, baseDelay = 100) => {
    if (elements.length) {
      elements.forEach((el, index) => {
        if (el.hasAttribute("data-aos")) {
          el.setAttribute("data-aos-delay", baseDelay * (index + 1))
        }
      })
    }
  }

  // Apply staggered animations
  addStaggeredAnimation(document.querySelectorAll(".way-card"))
  addStaggeredAnimation(document.querySelectorAll(".partnership-card"))

  // Add hover effect to tabs
  tabs.forEach((tab) => {
    tab.addEventListener("mouseenter", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateY(-5px)"
      }
    })

    tab.addEventListener("mouseleave", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateY(0)"
      }
    })
  })

  // Form validation and submission
  const donationForm = document.getElementById("donation-form")
  if (donationForm) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple validation
      const amount = document.getElementById("donation-amount").value
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value

      if (!amount || !firstName || !lastName || !email) {
        alert("Please fill in all required fields.")
        return
      }

      // Show success message
      donationForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle success-icon"></i>
          <h3>Thank You for Your Donation!</h3>
          <p>Your contribution of $${amount} will help us make a difference in students' lives.</p>
          <p>A confirmation email has been sent to ${email}.</p>
        </div>
      `
    })
  }

  const volunteerForm = document.getElementById("volunteer-form")
  if (volunteerForm) {
    volunteerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show success message
      volunteerForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle success-icon"></i>
          <h3>Thank You for Volunteering!</h3>
          <p>We've received your application and will contact you soon.</p>
        </div>
      `
    })
  }

  const mentorForm = document.getElementById("mentor-form")
  if (mentorForm) {
    mentorForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show success message
      mentorForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle success-icon"></i>
          <h3>Thank You for Becoming a Mentor!</h3>
          <p>We've received your application and will contact you soon to discuss next steps.</p>
        </div>
      `
    })
  }

  // Animated counter for impact numbers
  function startCountAnimation() {
    const counters = document.querySelectorAll(".impact-number, .stat-number")

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
        // If it's a tab, activate it
        if (targetId.includes("tab")) {
          window.switchTab(targetId)
        }

        // Scroll to element
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        })
      }
    })
  })

  // Form input animations
  const formInputs = document.querySelectorAll("input, select, textarea")
  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("input-focused")
    })

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("input-focused")
      }
    })
  })

  // Add CSS for the success message
  const style = document.createElement("style")
  style.textContent = `
    .success-message {
      text-align: center;
      padding: 2rem;
      animation: fadeIn 0.5s ease-in-out;
    }
    
    .success-icon {
      font-size: 3rem;
      color: #10b981;
      margin-bottom: 1rem;
    }
    
    .input-focused label {
      color: var(--primary);
      transform: translateY(-5px);
      transition: all 0.3s ease;
    }
  `
  document.head.appendChild(style)

  // Interactive donation amount selector
  const donationAmount = document.getElementById("donation-amount")
  if (donationAmount) {
    const amountOptions = [25, 50, 100, 250, 500]
    const amountSelector = document.createElement("div")
    amountSelector.className = "amount-selector"

    amountOptions.forEach((amount) => {
      const option = document.createElement("button")
      option.type = "button"
      option.className = "amount-option"
      option.textContent = `$${amount}`
      option.addEventListener("click", function () {
        donationAmount.value = amount

        // Remove active class from all options
        document.querySelectorAll(".amount-option").forEach((opt) => {
          opt.classList.remove("active")
        })

        // Add active class to selected option
        this.classList.add("active")
      })

      amountSelector.appendChild(option)
    })

    // Insert amount selector before donation amount input
    donationAmount.parentElement.insertBefore(amountSelector, donationAmount)

    // Add CSS for amount selector
    const amountStyle = document.createElement("style")
    amountStyle.textContent = `
      .amount-selector {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      
      .amount-option {
        padding: 0.5rem 1rem;
        border: 1px solid rgba(59, 130, 246, 0.3);
        background: white;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .amount-option:hover {
        background: rgba(59, 130, 246, 0.1);
      }
      
      .amount-option.active {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
      }
    `
    document.head.appendChild(amountStyle)
  }
})

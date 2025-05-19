// Contact page specific JavaScript

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
  } else {
    console.warn("AOS is not defined. Make sure AOS library is included.")
  }

  // Enhanced hero section shadow effect
  const heroSection = document.querySelector(".contact-hero-section")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const opacity = Math.min(0.8, 0.3 + scrollPosition / 1000)

      const heroShadowOverlay = document.querySelector(".contact-hero-section .hero-shadow-overlay")
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

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-item")
  if (faqItems.length) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
          }
        })

        // Toggle current item
        item.classList.toggle("active")

        // Change icon
        const icon = item.querySelector(".faq-toggle i")
        if (item.classList.contains("active")) {
          icon.classList.remove("fa-plus")
          icon.classList.add("fa-minus")
        } else {
          icon.classList.remove("fa-minus")
          icon.classList.add("fa-plus")
        }
      })
    })
  }

  // Form validation and submission
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simple validation
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      if (!firstName || !lastName || !email || !subject || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Show success message
      contactForm.innerHTML = `
        <div class="success-message">
          <i class="fas fa-check-circle success-icon"></i>
          <h3>Thank You for Your Message!</h3>
          <p>We've received your inquiry and will get back to you shortly.</p>
          <p>A confirmation email has been sent to ${email}.</p>
        </div>
      `
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll(".scroll-to").forEach((anchor) => {
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

  // Add CSS for the input focus effect
  const style = document.createElement("style")
  style.textContent = `
    .input-focused label {
      color: var(--primary);
      transform: translateY(-5px);
      transition: all 0.3s ease;
    }
  `
  document.head.appendChild(style)

  // Interactive map hover effect
  const mapContainer = document.querySelector(".map-container")
  if (mapContainer) {
    mapContainer.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.02)"
      this.style.boxShadow = "0 30px 60px rgba(0, 0, 0, 0.15)"
    })

    mapContainer.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)"
      this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.1)"
    })
  }

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY
    const heroContent = document.querySelector(".hero-content")

    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`
    }
  })

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".contact-hero-section h1")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500)
  }

  // Add floating animation to info cards
  const infoCards = document.querySelectorAll(".info-card")
  if (infoCards.length) {
    infoCards.forEach((card, index) => {
      card.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`
    })

    // Add CSS for floating animation
    const floatStyle = document.createElement("style")
    floatStyle.textContent = `
      @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }
    `
    document.head.appendChild(floatStyle)
  }

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left
      const y = e.clientY - e.target.getBoundingClientRect().top

      const ripple = document.createElement("span")
      ripple.className = "ripple"
      ripple.style.left = `${x}px`
      ripple.style.top = `${y}px`

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })

  // Add CSS for ripple effect
  const rippleStyle = document.createElement("style")
  rippleStyle.textContent = `
    .btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(rippleStyle)
})

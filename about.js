// Initialize AOS animation library
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
})

// About page specific JavaScript

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

  // Enhanced animations for mission and vision cards
  const missionCard = document.querySelector(".mission-card")
  const visionCard = document.querySelector(".vision-card")

  if (missionCard && visionCard) {
    // Add subtle hover animations
    ;[missionCard, visionCard].forEach((card) => {
      card.addEventListener("mousemove", handleCardTilt)
      card.addEventListener("mouseleave", resetCardTilt)
    })
  }

  // Enhanced animations for value cards
  const valueCards = document.querySelectorAll(".value-card")
  if (valueCards.length) {
    valueCards.forEach((card, index) => {
      // Add staggered animation delay
      if (card.querySelector("[data-aos]")) {
        card.querySelector("[data-aos]").setAttribute("data-aos-delay", 100 * (index + 1))
      }

      // Add hover effect
      card.addEventListener("mousemove", handleCardTilt)
      card.addEventListener("mouseleave", resetCardTilt)
    })
  }

  // Enhanced animations for team cards
  const teamCards = document.querySelectorAll(".team-card")
  if (teamCards.length) {
    teamCards.forEach((card, index) => {
      // Add staggered animation delay
      if (card.querySelector("[data-aos]")) {
        card.querySelector("[data-aos]").setAttribute("data-aos-delay", 100 * (index + 1))
      }

      // Add hover effect
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
  const heroSection = document.querySelector(".about-hero-section")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const opacity = Math.min(0.8, 0.3 + scrollPosition / 1000)

      const heroShadowOverlay = document.querySelector(".about-hero-section .hero-shadow-overlay")
      if (heroShadowOverlay) {
        heroShadowOverlay.style.boxShadow = `inset 0 -50px ${100 + scrollPosition / 5}px rgba(0, 0, 0, ${opacity})`
      }
    })
  }

  // Parallax effect for mission and vision cards
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY

    if (missionCard && visionCard) {
      const missionOffset = scrollPosition * 0.05
      const visionOffset = scrollPosition * 0.03

      missionCard.style.transform = `translateY(${-missionOffset}px)`
      visionCard.style.transform = `translateY(${-visionOffset}px)`
    }
  })
})

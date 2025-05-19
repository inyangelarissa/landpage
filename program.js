// Program page specific JavaScript
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

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("visible")
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Tab switching functionality
  window.switchTab = (tabId) => {
    // Hide all tab contents
    const tabContents = document.querySelectorAll(".tab-content")
    tabContents.forEach((content) => {
      content.classList.remove("active")
    })

    // Show the selected tab content
    const selectedTab = document.getElementById(tabId)
    if (selectedTab) {
      selectedTab.classList.add("active")
    }

    // Update active tab styling
    const tabs = document.querySelectorAll(".tab")
    tabs.forEach((tab) => {
      tab.classList.remove("active")
    })

    // Find the clicked tab and make it active
    const clickedTab = document.querySelector(`.tab[onclick="switchTab('${tabId}')"]`)
    if (clickedTab) {
      clickedTab.classList.add("active")
    }
  }

  // Enhanced animations for program cards
  const programCards = document.querySelectorAll(".program-card")
  if (programCards.length) {
    programCards.forEach((card) => {
      // Add hover effect
      card.addEventListener("mousemove", handleCardTilt)
      card.addEventListener("mouseleave", resetCardTilt)
    })
  }

  // Enhanced animations for event cards
  const eventCards = document.querySelectorAll(".event-card")
  if (eventCards.length) {
    eventCards.forEach((card) => {
      // Add hover effect
      card.addEventListener("mousemove", handleCardTilt)
      card.addEventListener("mouseleave", resetCardTilt)
    })
  }

  // Enhanced animations for story cards
  const storyCards = document.querySelectorAll(".story-card")
  if (storyCards.length) {
    storyCards.forEach((card) => {
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
  const heroSection = document.querySelector(".programs-hero-section")
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const opacity = Math.min(0.8, 0.3 + scrollPosition / 1000)

      const heroShadowOverlay = document.querySelector(".programs-hero-section .hero-shadow-overlay")
      if (heroShadowOverlay) {
        heroShadowOverlay.style.boxShadow = `inset 0 -50px ${100 + scrollPosition / 5}px rgba(0, 0, 0, ${opacity})`
      }
    })
  }
})

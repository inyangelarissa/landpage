// Initialize AOS animation library
document.addEventListener("DOMContentLoaded", () => {
  // Check if AOS is defined before initializing
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    })
  } else {
    console.warn("AOS is not defined. Make sure it is properly imported or included.")
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("visible")
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })

  // Partners carousel
  const carouselTrack = document.getElementById("partnersCarousel")
  const leftBtn = document.querySelector(".carousel-btn.left")
  const rightBtn = document.querySelector(".carousel-btn.right")

  if (carouselTrack && leftBtn && rightBtn) {
    leftBtn.addEventListener("click", () => {
      carouselTrack.scrollBy({ left: -300, behavior: "smooth" })
    })

    rightBtn.addEventListener("click", () => {
      carouselTrack.scrollBy({ left: 300, behavior: "smooth" })
    })
  }

  // Create modal popups for all "Learn More" buttons
  setupModals()
})

// Function to set up modal popups
function setupModals() {
  // Create modal overlay
  const modalOverlay = document.createElement("div")
  modalOverlay.className = "modal-overlay"
  document.body.appendChild(modalOverlay)

  // Create modal content
  const modal = document.createElement("div")
  modal.className = "modal"
  modal.innerHTML = `
    <button class="modal-close" aria-label="Close modal">&times;</button>
    <div class="modal-header">
      <h3>Program Details</h3>
    </div>
    <div class="modal-body">
      <p>Loading content...</p>
    </div>
    <div class="modal-footer">
      <button class="btn primary">Learn More</button>
    </div>
  `
  modalOverlay.appendChild(modal)

  // Close modal when clicking overlay or close button
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal()
    }
  })

  const closeBtn = modal.querySelector(".modal-close")
  closeBtn.addEventListener("click", closeModal)

  // Set up all "Learn More" buttons
  const learnMoreButtons = document.querySelectorAll(".btn-outline-blue, .tertiary")

  learnMoreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      // Get content based on button
      const modalContent = getModalContent(button)

      // Update modal content
      modal.querySelector(".modal-header h3").textContent = modalContent.title
      modal.querySelector(".modal-body").innerHTML = modalContent.body

      // Update footer button link if needed
      const footerBtn = modal.querySelector(".modal-footer .btn")
      if (modalContent.link) {
        footerBtn.addEventListener("click", () => {
          window.location.href = modalContent.link
        })
      }

      // Open modal
      openModal()
    })
  })

  function openModal() {
    modalOverlay.classList.add("active")
    document.body.style.overflow = "hidden" // Prevent scrolling
  }

  function closeModal() {
    modalOverlay.classList.remove("active")
    document.body.style.overflow = "" // Re-enable scrolling
  }

  function getModalContent(button) {
    // Default content
    let content = {
      title: "Program Information",
      body: "<p>Detailed information about this program will be available soon.</p>",
      link: null,
    }

    // Check button text or href to determine content
    const buttonText = button.textContent.trim()
    const buttonHref = button.getAttribute("href")

    if (buttonHref && buttonHref.includes("about.html")) {
      content = {
        title: "About Student Initiative",
        body: `
          <p>Student Initiative is a non-profit organization dedicated to empowering students through mentorship, skills development, and comprehensive support.</p>
          <p>Our mission is to bridge the gap between education and real-world success by providing students with the tools, connections, and opportunities they need to thrive.</p>
          <p>Founded in 2018, we have helped over 5,000 students achieve their academic and career goals through our various programs and initiatives.</p>
          <h4>Our Core Values</h4>
          <ul>
            <li>Inclusivity and accessibility for all students</li>
            <li>Excellence in education and mentorship</li>
            <li>Community engagement and collaboration</li>
            <li>Innovation in learning approaches</li>
          </ul>
        `,
        link: "about.html",
      }
    } else if (buttonHref && buttonHref.includes("skills")) {
      content = {
        title: "Skills Development Program",
        body: `
          <p>Our Skills Development Program is designed to equip students with practical, real-world skills that complement their academic education.</p>
          <p>Through workshops, hands-on training sessions, and project-based learning, students develop competencies in:</p>
          <ul>
            <li>Technology and digital literacy</li>
            <li>Communication and presentation</li>
            <li>Leadership and teamwork</li>
            <li>Critical thinking and problem-solving</li>
            <li>Financial literacy</li>
          </ul>
          <p>Programs run throughout the year with flexible scheduling to accommodate student needs.</p>
        `,
        link: "program.html#skills",
      }
    } else if (buttonHref && buttonHref.includes("mentorship")) {
      content = {
        title: "Mentorship Program",
        body: `
          <p>Our Mentorship Program connects students with experienced professionals who provide guidance, support, and insights from their industry experience.</p>
          <p>Benefits of our mentorship program include:</p>
          <ul>
            <li>One-on-one guidance from industry professionals</li>
            <li>Career path exploration and planning</li>
            <li>Networking opportunities</li>
            <li>Personal development and confidence building</li>
            <li>Academic and professional advice</li>
          </ul>
          <p>Mentors and mentees are carefully matched based on interests, goals, and compatibility.</p>
        `,
        link: "program.html#mentorship",
      }
    } else if (buttonHref && buttonHref.includes("support")) {
      content = {
        title: "Inclusive Support Program",
        body: `
          <p>Our Inclusive Support Program is dedicated to ensuring that all students, regardless of background or circumstances, have access to quality education and opportunities.</p>
          <p>We provide specialized support for:</p>
          <ul>
            <li>Students with disabilities</li>
            <li>Young parents continuing their education</li>
            <li>First-generation college students</li>
            <li>Students from low-income backgrounds</li>
            <li>International and ESL students</li>
          </ul>
          <p>Support includes accommodations, resources, counseling, and tailored programming to address specific needs.</p>
        `,
        link: "program.html#support",
      }
    } else if (buttonHref && buttonHref.includes("career")) {
      content = {
        title: "Career Workshop",
        body: `
          <p>Our Career Workshop is a comprehensive event designed to prepare students for successful job searches and career advancement.</p>
          <p>Workshop components include:</p>
          <ul>
            <li>Resume and cover letter writing</li>
            <li>Interview preparation and practice</li>
            <li>Professional networking skills</li>
            <li>Personal branding and online presence</li>
            <li>Job search strategies</li>
          </ul>
          <p><strong>Date:</strong> June 15<br><strong>Location:</strong> Main Campus<br><strong>Duration:</strong> 9:00 AM - 4:00 PM</p>
        `,
        link: "events.html#career",
      }
    } else if (buttonHref && buttonHref.includes("coding")) {
      content = {
        title: "Coding Bootcamp",
        body: `
          <p>Our Coding Bootcamp is an intensive, hands-on program designed to introduce students to programming fundamentals and build practical coding skills.</p>
          <p>Bootcamp features:</p>
          <ul>
            <li>Introduction to multiple programming languages</li>
            <li>Web development fundamentals</li>
            <li>Project-based learning</li>
            <li>Mentorship from industry professionals</li>
            <li>Collaborative coding challenges</li>
          </ul>
          <p><strong>Dates:</strong> July 3-5<br><strong>Location:</strong> Tech Hub<br><strong>Prerequisites:</strong> None - beginners welcome!</p>
        `,
        link: "events.html#coding",
      }
    } else if (buttonHref && buttonHref.includes("meetup")) {
      content = {
        title: "Community Meetup",
        body: `
          <p>Our Community Meetup is a casual networking event that brings together students, alumni, mentors, and industry professionals.</p>
          <p>Event highlights:</p>
          <ul>
            <li>Networking opportunities</li>
            <li>Lightning talks from successful alumni</li>
            <li>Q&A sessions with mentors</li>
            <li>Information about upcoming programs</li>
            <li>Refreshments and social activities</li>
          </ul>
          <p><strong>Date:</strong> July 20<br><strong>Location:</strong> Center Grounds<br><strong>Time:</strong> 5:00 PM - 8:00 PM</p>
        `,
        link: "events.html#meetup",
      }
    }

    return content
  }
}

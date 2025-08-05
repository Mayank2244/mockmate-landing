// Mobile menu toggle
document.getElementById("mobileMenuBtn").addEventListener("click", () => {
  const navLinks = document.querySelector(".nav-links")
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex"
})

// FAQ toggle functionality
function toggleFaq(element) {
  const faqItem = element.parentElement
  const faqAnswer = faqItem.querySelector(".faq-answer")

  // Close all other FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    if (item !== faqItem) {
      item.classList.remove("active")
      item.querySelector(".faq-answer").classList.remove("active")
    }
  })

  // Toggle current FAQ item
  faqItem.classList.toggle("active")
  faqAnswer.classList.toggle("active")
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.9)"
  }
})

// Add animation on scroll for feature cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe feature cards for animation
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".feature-card, .testimonial-card, .pricing-card")
  cards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(card)
  })
})

// Button click handlers
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Add ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Add ripple effect CSS
const style = document.createElement("style")
style.textContent = `
    button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Form validation (if you add forms later)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Add loading states for buttons
function addLoadingState(button, text = "Loading...") {
  const originalText = button.innerHTML
  button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${text}`
  button.disabled = true

  return function removeLoadingState() {
    button.innerHTML = originalText
    button.disabled = false
  }
}

// Example usage for CTA buttons
document.querySelectorAll(".btn-primary, .btn-white").forEach((button) => {
  button.addEventListener("click", function () {
    const removeLoading = addLoadingState(this, "Processing...")

    // Simulate API call
    setTimeout(() => {
      removeLoading()
      // Handle success/error states here
    }, 2000)
  })
})

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Uncomment to enable typing effect on hero subtitle
// document.addEventListener('DOMContentLoaded', function() {
//     const subtitle = document.querySelector('.hero-subtitle');
//     typeWriter(subtitle, 'Ace Your Interview. Perfect Your Resume.', 50);
// });

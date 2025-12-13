document.addEventListener("DOMContentLoaded", () => {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fadeIn")
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el)
  })

  {/* // Form submission handler
  const contactForm = document.querySelector("form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for your message! I will get back to you soon.")
      contactForm.reset()
    })
  } */}
})

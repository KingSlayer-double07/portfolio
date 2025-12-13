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

  // Form submission handler — gather form values, dispatch event and optionally call sendNotification
  const contactForm = document.querySelector('#contact-form')
  function getContactFormValues(form) {
    const data = new FormData(form)
    // Convert FormData entries to a plain object
    return Object.fromEntries(data.entries())
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const values = getContactFormValues(contactForm)
      // Log / return values
      console.log('Contact form values:', values)

      // Dispatch a `formSubmitted` custom event with the collected values
      window.dispatchEvent(new CustomEvent('formSubmitted', { detail: values }))

      // Try calling sendNotification if it's available (from submission-created.ts)
      if (typeof sendNotification === 'function') {
        try {
          sendNotification(`New message from ${values.name || 'Guest'}`, 'success')
        } catch (err) {
          console.warn('sendNotification threw an error', err)
        }
      } else {
        // Fallback: simple alert for environments without sendNotification
        alert('Thanks! We received your message.')
      }

      contactForm.reset()
    })
  }
})

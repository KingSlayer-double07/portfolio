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

  // Form submission handler — validate, gather form values, and submit to Netlify
  const contactForm = document.querySelector('#contact-form')
  const submitBtn = document.querySelector('#submit-btn')
  const formStatus = document.querySelector('#form-status')
  
  function getContactFormValues(form) {
    const data = new FormData(form)
    // Convert FormData entries to a plain object
    return Object.fromEntries(data.entries())
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function showFormStatus(message, type) {
    formStatus.textContent = message
    formStatus.className = `block text-sm mt-2 ${type === 'success' ? 'text-green-400' : 'text-red-400'}`
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        formStatus.className = 'hidden'
      }, 5000)
    }
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      
      // Validate form using native HTML5 validation
      if (!contactForm.checkValidity()) {
        showFormStatus('Please fill in all required fields correctly.', 'error')
        contactForm.reportValidity()
        return
      }

      const values = getContactFormValues(contactForm)
      
      // Additional email validation
      if (!validateEmail(values.email)) {
        document.querySelector('#email-error').classList.remove('hidden')
        showFormStatus('Please enter a valid email address.', 'error')
        return
      }

      // Validate message length
      if (values.message.trim().length < 10) {
        document.querySelector('#message-error').classList.remove('hidden')
        showFormStatus('Message must be at least 10 characters.', 'error')
        return
      }

      // Disable submit button and show loading state
      submitBtn.disabled = true
      submitBtn.setAttribute('aria-busy', 'true')
      submitBtn.textContent = 'Sending...'
      showFormStatus('', 'info')

      try {
        // Submit form data to Netlify
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            'form-name': contactForm.getAttribute('name'),
            ...values
          }).toString()
        })

        if (response.ok) {
          console.log('Form submitted successfully:', values)
          showFormStatus('✓ Thanks! Your message has been sent. I\'ll get back to you soon!', 'success')
          contactForm.reset()
          
          // Dispatch custom event for any listeners
          window.dispatchEvent(new CustomEvent('formSubmitted', { detail: values }))
        } else if (response.status >= 400 && response.status < 500) {
          throw new Error('Invalid form submission. Please check your input.')
        } else if (response.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else {
          throw new Error('Form submission failed')
        }
      } catch (err) {
        console.error('Form submission error:', err)
        
        // Provide specific error messages
        let errorMsg = '✗ Error sending message. '
        if (err.message.includes('Invalid form')) {
          errorMsg += 'Please check your input and try again.'
        } else if (err.message.includes('Server error')) {
          errorMsg += 'The server is temporarily unavailable. Please try again later.'
        } else if (err instanceof TypeError) {
          errorMsg += 'Network error. Please check your connection and try again.'
        } else {
          errorMsg += 'Please try again or email me directly at favourakande1@gmail.com'
        }
        showFormStatus(errorMsg, 'error')
      } finally {
        // Re-enable submit button
        submitBtn.disabled = false
        submitBtn.setAttribute('aria-busy', 'false')
        submitBtn.textContent = 'Send Message'
      }
    })

    // Clear error messages when user starts typing
    const formInputs = contactForm.querySelectorAll('input, textarea, select')
    formInputs.forEach(input => {
      input.addEventListener('input', () => {
        const errorId = input.getAttribute('aria-describedby')
        if (errorId) {
          const errorEl = document.querySelector(`#${errorId}`)
          if (errorEl) errorEl.classList.add('hidden')
        }
      })
    })
  }
})

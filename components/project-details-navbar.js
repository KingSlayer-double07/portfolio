class ProjectDetailsNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `
            <style>
                nav {
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(5px);
                    padding: 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    position: fixed;
                    width: 100%;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .logo {
                    color: white;
                    font-weight: bold;
                    font-size: 1.5rem;
                    background: linear-gradient(90deg, #8b5cf6, #ec4899);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    padding-right: 30px;
                }
                
                .nav-links a {
                    color: #e5e7eb;
                    text-decoration: none;
                    font-weight: 500;
                    position: relative;
                    transition: color 0.3s ease;
                }
                
                .nav-links a:hover {
                    color: #a78bfa;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -4px;
                    left: 0;
                    background-color: #8b5cf6;
                    transition: width 0.3s ease;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }

                .nav-links a[aria-current="page"]::after {
                    width: 100%;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                }

                svg {
                    width: 24px;
                    height: 24px;
                    stroke: currentColor;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    fill: none;
                }
                
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    .nav-links {
                        position: fixed;
                        top: 80px;
                        left: 0;
                        width: 100%;
                        background: rgba(17, 24, 39, 0.95);
                        flex-direction: column;
                        padding: 2rem;
                        gap: 1.5rem;
                        transform: translateY(-150%);
                        transition: transform 0.3s ease;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    
                    .nav-links.active {
                        transform: translateY(0);
                    }
                }
            </style>
            
            <nav>
                <a href="index.html" class="logo">Back to home page</a>
                
                <button class="mobile-menu-btn" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">
                    <svg viewBox="0 0 24 24">
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                        <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                </button>
                
                <ul class="nav-links" id="nav-links">
                    <li><a class="nav__link" href="index.html#about">01. About</a></li>
                    <li><a class="nav__link" href="index.html#projects">02. Projects</a></li>
                    <li><a class="nav__link" href="index.html#contact">03. Contact</a></li>
                </ul>
            </nav>

        `

    // Initialize mobile menu functionality
    this.initMobileMenu()
  }

  initMobileMenu() {
    const menuBtn = this.shadowRoot.querySelector(".mobile-menu-btn")
    const navLinks = this.shadowRoot.querySelector(".nav-links")

    menuBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("active")
      menuBtn.setAttribute("aria-expanded", isOpen)
    })

    // Close menu when clicking on a link (for mobile)
    this.shadowRoot.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active")
        menuBtn.setAttribute("aria-expanded", false)
      })
    })
  }

}

customElements.define("project-details-navbar", ProjectDetailsNavbar)

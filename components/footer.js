class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `
            <style>
                footer {
                    background: rgba(17, 24, 39, 0.8);
                    backdrop-filter: blur(10px);
                    color: #9ca3af;
                    padding: 3rem 1.5rem;
                    text-align: center;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 2rem;
                }
                
                .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-bottom: 1.5rem;
                }
                
                .footer-links a {
                    color: #d1d5db;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                
                .footer-links a:hover {
                    color: #8b5cf6;
                }
                
                .social-icons {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .social-icons a {
                    color: #d1d5db;
                    transition: all 0.3s ease;
                }
                
                .social-icons a:hover {
                    color: #8b5cf6;
                    transform: translateY(-3px);
                }
                
                .copyright {
                    font-size: 0.875rem;
                }
            </style>
            
            <footer>
                <div class="footer-content">
                    <div class="footer-links">
                        <a href="#about">About</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
                    </div>
                    
                    <div class="social-icons">
                        <a href="#" aria-label="GitHub"><i data-feather="github"></i></a>
                        <a href="#" aria-label="Twitter"><i data-feather="twitter"></i></a>
                        <a href="#" aria-label="LinkedIn"><i data-feather="linkedin"></i></a>
                        <a href="#" aria-label="Instagram"><i data-feather="instagram"></i></a>
                    </div>
                    
                    <p class="copyright">&copy; ${new Date().getFullYear()} Favour Akande. All rights reserved.</p>
                </div>
            </footer>
        `
  }
}

customElements.define("custom-footer", CustomFooter)

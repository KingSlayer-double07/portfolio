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
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .social-icons svg {
                    width: 20px;
                    height: 20px;
                    stroke: currentColor;
                    stroke-width: 2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    fill: none;
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
                        <a href="https://github.com/KingSlayer-double07" aria-label="GitHub">
                            <svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg>
                        </a>
                        <a href="https://x.com/favourdslayer" aria-label="Twitter">
                            <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0323 3z"></path></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/favourakande/" aria-label="LinkedIn">
                            <svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram">
                            <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="currentColor"></path><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle></svg>
                        </a>
                    </div>
                    
                    <p class="copyright">&copy; ${new Date().getFullYear()} Favour Akande. All rights reserved.</p>
                </div>
            </footer>
        `
  }
}

customElements.define("custom-footer", CustomFooter)

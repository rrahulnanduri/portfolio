/**
 * Simple Page Transition System
 * Handles smooth transitions between homepage and sector pages
 */
class SimplePageTransitions {
    constructor() {
        this.isTransitioning = false;
        this.transitionDuration = 400;
        
        this.init();
    }

    init() {
        console.log('SimplePageTransitions: Starting initialization...');
        
        // Add transition overlay to body
        this.createTransitionOverlay();
        console.log('SimplePageTransitions: Overlay created');
        
        // Setup event listeners
        this.setupEventListeners();
        console.log('SimplePageTransitions: Event listeners setup');
        
        console.log('SimplePageTransitions initialized successfully');
    }

    createTransitionOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'pageTransitionOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, #6bc1e0 0%, #6bcde0 100%);
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transform: translateX(-100%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        document.body.appendChild(overlay);
        this.overlay = overlay;
    }

    setupEventListeners() {
        console.log('SimplePageTransitions: Setting up event listeners...');
        
        // Handle project card clicks
        const projectCards = document.querySelectorAll('.project-card');
        console.log('SimplePageTransitions: Found', projectCards.length, 'project cards');
        
        projectCards.forEach((card, index) => {
            console.log('SimplePageTransitions: Adding listener to card', index, card);
            card.addEventListener('click', (e) => {
                console.log('SimplePageTransitions: Card clicked!', e);
                e.preventDefault();
                const href = card.getAttribute('href');
                console.log('SimplePageTransitions: Card href:', href);
                
                // Handle both #sector and sector.html formats
                if (href) {
                    let sectorId;
                    if (href.startsWith('#')) {
                        sectorId = href.substring(1);
                    } else if (href.endsWith('.html')) {
                        sectorId = href.replace('.html', '');
                    }
                    
                    if (sectorId) {
                        console.log('SimplePageTransitions: Navigating to sector:', sectorId);
                        this.navigateToSector(sectorId);
                    }
                }
            });
        });

        // Handle back button clicks
        const backButtons = document.querySelectorAll('.back-button a');
        backButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateBack();
            });
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.handlePopState(e);
        });
    }

    async navigateToSector(sectorId) {
        console.log('SimplePageTransitions: navigateToSector called with:', sectorId);
        console.log('SimplePageTransitions: isTransitioning:', this.isTransitioning);
        
        if (this.isTransitioning) {
            console.log('SimplePageTransitions: Already transitioning, ignoring');
            return;
        }
        
        this.isTransitioning = true;
        console.log('SimplePageTransitions: Starting transition...');
        
        try {
            // Show overlay
            console.log('SimplePageTransitions: Showing overlay...');
            await this.showOverlay();
            console.log('SimplePageTransitions: Overlay shown, navigating...');
            
            // Navigate to sector page
            const sectorUrl = `${sectorId}.html`;
            console.log('SimplePageTransitions: Navigating to:', sectorUrl);
            window.location.href = sectorUrl;
            
        } catch (error) {
            console.error('SimplePageTransitions: Navigation error:', error);
            this.hideOverlay();
            this.isTransitioning = false;
        }
    }

    async navigateBack() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        try {
            // Show overlay
            await this.showOverlay();
            
            // Navigate back to homepage
            window.location.href = 'index.html';
            
        } catch (error) {
            console.error('Navigation error:', error);
            this.hideOverlay();
            this.isTransitioning = false;
        }
    }

    showOverlay() {
        console.log('SimplePageTransitions: showOverlay called');
        console.log('SimplePageTransitions: overlay element:', this.overlay);
        
        return new Promise((resolve) => {
            console.log('SimplePageTransitions: Setting overlay styles...');
            this.overlay.style.visibility = 'visible';
            this.overlay.style.opacity = '1';
            this.overlay.style.transform = 'translateX(0)';
            
            console.log('SimplePageTransitions: Overlay styles set, waiting for transition...');
            setTimeout(() => {
                console.log('SimplePageTransitions: Overlay transition complete');
                resolve();
            }, this.transitionDuration);
        });
    }

    hideOverlay() {
        this.overlay.style.opacity = '0';
        this.overlay.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            this.overlay.style.visibility = 'hidden';
        }, this.transitionDuration);
    }

    handlePopState(event) {
        // Handle browser back/forward navigation
        if (event.state) {
            // State exists, handle accordingly
            console.log('Popstate with state:', event.state);
        } else {
            // No state, reload page
            window.location.reload();
        }
    }
}

// Make SimplePageTransitions available globally
window.SimplePageTransitions = SimplePageTransitions;

// Auto-initialize only on sector pages (not homepage)
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const isHomepage = !currentPage || currentPage === 'index.html' || currentPage === '';
    
    console.log('SimplePageTransitions: Current page:', currentPage, 'Is homepage:', isHomepage);
    
    if (!isHomepage) {
        console.log('SimplePageTransitions: Skipping auto-initialization on sector page');
    }
});

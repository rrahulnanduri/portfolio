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
        // Add transition overlay to body
        this.createTransitionOverlay();
        
        // Setup event listeners
        this.setupEventListeners();
        
        console.log('SimplePageTransitions initialized');
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
        // Handle project card clicks
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                const href = card.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const sectorId = href.substring(1);
                    this.navigateToSector(sectorId);
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
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        try {
            // Show overlay
            await this.showOverlay();
            
            // Navigate to sector page
            const sectorUrl = `${sectorId}.html`;
            window.location.href = sectorUrl;
            
        } catch (error) {
            console.error('Navigation error:', error);
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
        return new Promise((resolve) => {
            this.overlay.style.visibility = 'visible';
            this.overlay.style.opacity = '1';
            this.overlay.style.transform = 'translateX(0)';
            
            setTimeout(() => {
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.pageTransitions = new SimplePageTransitions();
});

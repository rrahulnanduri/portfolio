/**
 * ProximitySidebar - Sophisticated animated sidebar with proximity detection
 * Supports mouse, touch, and keyboard interactions with accessibility features
 */
class ProximitySidebar {
    constructor(sidebarId, options = {}) {
        // Configuration options
        this.options = {
            detectionWidth: options.detectionWidth || 60,
            animationDuration: options.animationDuration || 350,
            hideDelay: options.hideDelay || 200, // Much faster auto-hide
            enableKeyboard: options.enableKeyboard !== false,
            enableTouch: options.enableTouch !== false,
            debounceInterval: options.debounceInterval || 16, // ~60fps
            ...options
        };

        // DOM elements
        this.sidebar = document.getElementById(sidebarId);
        this.detectionZone = document.getElementById('detectionZone');
        this.peekButton = document.getElementById('peekButton');
        
        if (!this.sidebar) {
            console.error('ProximitySidebar: Sidebar element not found');
            return;
        }

        // State management
        this.state = {
            isVisible: false,
            isHovered: false,
            isAnimating: false,
            hideTimer: null,
            lastMousePosition: { x: 0, y: 0 },
            touchStartX: 0,
            isTouch: false
        };

        // Performance optimization
        this.rafId = null;
        this.lastUpdate = 0;

        // Bind methods
        this.handleMouseMove = this.debounce(this.handleMouseMove.bind(this), this.options.debounceInterval);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleSidebarMouseEnter = this.handleSidebarMouseEnter.bind(this);
        this.handleSidebarMouseLeave = this.handleSidebarMouseLeave.bind(this);
        this.handleKeyboard = this.handleKeyboard.bind(this);
        this.handleResize = this.debounce(this.handleResize.bind(this), 250);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.handlePeekButtonClick = this.handlePeekButtonClick.bind(this);
        this.handlePeekButtonHover = this.handlePeekButtonHover.bind(this);

        // Initialize
        this.init();
    }

    /**
     * Initialize the sidebar system
     */
    init() {
        this.setupEventListeners();
        this.setupAccessibility();
        this.updateDetectionZone();
        
        // Feature detection
        this.supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.supportsPassive = this.detectPassiveEventSupport();
        
        console.log('ProximitySidebar initialized');
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        const passiveOptions = this.supportsPassive ? { passive: true } : false;

        // Mouse events
        document.addEventListener('mousemove', this.handleMouseMove, passiveOptions);
        document.addEventListener('mouseleave', this.handleMouseLeave);
        
        // Sidebar hover events
        this.sidebar.addEventListener('mouseenter', this.handleSidebarMouseEnter);
        this.sidebar.addEventListener('mouseleave', this.handleSidebarMouseLeave);

        // Keyboard events
        if (this.options.enableKeyboard) {
            document.addEventListener('keydown', this.handleKeyboard);
        }

        // Touch events for mobile
        if (this.options.enableTouch && this.supportsTouch) {
            document.addEventListener('touchstart', this.handleTouchStart, passiveOptions);
            document.addEventListener('touchmove', this.handleTouchMove, passiveOptions);
            document.addEventListener('touchend', this.handleTouchEnd, passiveOptions);
        }

        // Peek button events
        if (this.peekButton) {
            this.peekButton.addEventListener('click', this.handlePeekButtonClick);
            this.peekButton.addEventListener('mouseenter', this.handlePeekButtonHover);
        }

        // Window events
        window.addEventListener('resize', this.handleResize, passiveOptions);
        window.addEventListener('orientationchange', this.handleResize, passiveOptions);

        // Visibility API for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.state.isVisible) {
                this.hideSidebar();
            }
        });
    }

    /**
     * Setup accessibility features
     */
    setupAccessibility() {
        // Make focusable elements properly tabbable when sidebar is visible
        const focusableElements = this.sidebar.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        this.focusableElements = Array.from(focusableElements);
        
        // Initially disable tab navigation
        this.setTabNavigation(false);
    }

    /**
     * Update detection zone size based on current options
     */
    updateDetectionZone() {
        if (this.detectionZone) {
            this.detectionZone.style.width = `${this.options.detectionWidth}px`;
        }
    }

    /**
     * Handle mouse movement for proximity detection
     */
    handleMouseMove(event) {
        if (this.state.isTouch) return;

        const now = performance.now();
        if (now - this.lastUpdate < this.options.debounceInterval) return;
        
        this.lastUpdate = now;
        
        const { clientX: x, clientY: y } = event;
        this.state.lastMousePosition = { x, y };

        // Check if cursor is in detection zone
        if (x <= this.options.detectionWidth && !this.state.isVisible) {
            this.showSidebar();
        } else if (x > this.options.detectionWidth && this.state.isVisible && !this.state.isHovered) {
            this.scheduleHide();
        }
    }

    /**
     * Handle mouse leaving the document
     */
    handleMouseLeave() {
        if (this.state.isVisible && !this.state.isHovered) {
            this.scheduleHide();
        }
    }

    /**
     * Handle mouse entering sidebar area
     */
    handleSidebarMouseEnter() {
        this.state.isHovered = true;
        this.clearHideTimer();
    }

    /**
     * Handle mouse leaving sidebar area
     */
    handleSidebarMouseLeave() {
        this.state.isHovered = false;
        if (this.state.isVisible) {
            this.scheduleHide();
        }
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboard(event) {
        // Alt + S to toggle sidebar
        if (event.altKey && event.key.toLowerCase() === 's') {
            event.preventDefault();
            this.toggleSidebar();
            return;
        }

        // Escape to hide sidebar
        if (event.key === 'Escape' && this.state.isVisible) {
            event.preventDefault();
            this.hideSidebar();
            return;
        }

        // Tab navigation within sidebar
        if (event.key === 'Tab' && this.state.isVisible) {
            this.handleTabNavigation(event);
        }
    }

    /**
     * Handle tab navigation within sidebar
     */
    handleTabNavigation(event) {
        const firstElement = this.focusableElements[0];
        const lastElement = this.focusableElements[this.focusableElements.length - 1];

        if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    /**
     * Handle touch start events
     */
    handleTouchStart(event) {
        if (event.touches.length !== 1) return;
        
        const touch = event.touches[0];
        this.state.touchStartX = touch.clientX;
        this.state.isTouch = true;
    }

    /**
     * Handle touch move events
     */
    handleTouchMove(event) {
        if (event.touches.length !== 1 || !this.state.isTouch) return;
        
        const touch = event.touches[0];
        const deltaX = touch.clientX - this.state.touchStartX;

        // Swipe from left edge to show sidebar
        if (this.state.touchStartX <= this.options.detectionWidth && deltaX > 50) {
            this.showSidebar();
        }
        
        // Swipe left on visible sidebar to hide it
        if (this.state.isVisible && deltaX < -50) {
            this.hideSidebar();
        }
    }

    /**
     * Handle touch end events
     */
    handleTouchEnd() {
        this.state.isTouch = false;
    }

    /**
     * Handle window resize events
     */
    handleResize() {
        this.updateDetectionZone();
        
        // Hide sidebar on orientation change for better UX
        if (this.state.isVisible) {
            this.hideSidebar();
        }
    }

    /**
     * Handle peek button click
     */
    handlePeekButtonClick(event) {
        event.preventDefault();
        this.toggleSidebar();
    }

    /**
     * Handle peek button hover
     */
    handlePeekButtonHover() {
        // Show sidebar on hover with a small delay
        if (!this.state.isVisible) {
            setTimeout(() => {
                if (!this.state.isVisible) {
                    this.showSidebar();
                }
            }, 300);
        }
    }


    /**
     * Show the sidebar with animation
     */
    showSidebar() {
        if (this.state.isVisible || this.state.isAnimating) return;

        this.state.isAnimating = true;
        this.clearHideTimer();

        // Update ARIA attributes
        this.sidebar.setAttribute('aria-hidden', 'false');
        
        // Add visible class for CSS transition
        this.sidebar.classList.add('visible');
        
        // Enable tab navigation
        this.setTabNavigation(true);

        // Animation complete handler
        setTimeout(() => {
            this.state.isVisible = true;
            this.state.isAnimating = false;
            
            // Focus first element for keyboard users
            if (document.activeElement === document.body) {
                this.focusableElements[0]?.focus();
            }
            
            this.dispatchCustomEvent('sidebarShown');
        }, this.options.animationDuration);
    }

    /**
     * Hide the sidebar with animation
     */
    hideSidebar() {
        if (!this.state.isVisible || this.state.isAnimating) return;

        this.state.isAnimating = true;
        this.clearHideTimer();

        // Update ARIA attributes
        this.sidebar.setAttribute('aria-hidden', 'true');
        
        // Remove visible class for CSS transition
        this.sidebar.classList.remove('visible');
        
        // Disable tab navigation
        this.setTabNavigation(false);

        // Animation complete handler
        setTimeout(() => {
            this.state.isVisible = false;
            this.state.isAnimating = false;
            this.state.isHovered = false;
            
            this.dispatchCustomEvent('sidebarHidden');
        }, this.options.animationDuration);
    }

    /**
     * Toggle sidebar visibility
     */
    toggleSidebar() {
        if (this.state.isVisible) {
            this.hideSidebar();
        } else {
            this.showSidebar();
        }
    }

    /**
     * Schedule hiding the sidebar after delay
     */
    scheduleHide() {
        this.clearHideTimer();
        this.state.hideTimer = setTimeout(() => {
            this.hideSidebar();
        }, this.options.hideDelay);
    }

    /**
     * Clear the hide timer
     */
    clearHideTimer() {
        if (this.state.hideTimer) {
            clearTimeout(this.state.hideTimer);
            this.state.hideTimer = null;
        }
    }

    /**
     * Enable/disable tab navigation for sidebar elements
     */
    setTabNavigation(enabled) {
        this.focusableElements.forEach(element => {
            element.setAttribute('tabindex', enabled ? '0' : '-1');
        });
    }

    /**
     * Dispatch custom events for integration
     */
    dispatchCustomEvent(eventName) {
        const event = new CustomEvent(eventName, {
            detail: { sidebar: this.sidebar, state: this.state }
        });
        document.dispatchEvent(event);
    }

    /**
     * Debounce function for performance optimization
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Detect passive event listener support
     */
    detectPassiveEventSupport() {
        let supportsPassive = false;
        try {
            const opts = Object.defineProperty({}, 'passive', {
                get() {
                    supportsPassive = true;
                    return true;
                }
            });
            window.addEventListener('test', null, opts);
            window.removeEventListener('test', null, opts);
        } catch (e) {
            supportsPassive = false;
        }
        return supportsPassive;
    }

    /**
     * Clean up event listeners and timers
     */
    destroy() {
        // Remove all event listeners
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('mouseleave', this.handleMouseLeave);
        document.removeEventListener('keydown', this.handleKeyboard);
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('orientationchange', this.handleResize);
        
        if (this.supportsTouch) {
            document.removeEventListener('touchstart', this.handleTouchStart);
            document.removeEventListener('touchmove', this.handleTouchMove);
            document.removeEventListener('touchend', this.handleTouchEnd);
        }

        // Clear timers
        this.clearHideTimer();
        
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        console.log('ProximitySidebar destroyed');
    }

    /**
     * Update configuration options
     */
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.updateDetectionZone();
    }

    /**
     * Get current sidebar state
     */
    getState() {
        return { ...this.state };
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProximitySidebar;
}

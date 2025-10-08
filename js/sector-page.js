/**
 * SECTOR PAGE RENDERER
 * 
 * This script handles the dynamic rendering of sector pages
 * using the standardized sector properties system.
 */

class SectorPage {
    constructor() {
        this.sectorProperties = window.SectorProperties;
    }

    /**
     * Initialize a sector page with the given sector ID
     * @param {string} sectorId - The sector identifier
     */
    init(sectorId) {
        const sectorData = this.sectorProperties.getDetailPageData(sectorId);
        
        if (!sectorData) {
            console.error(`Sector '${sectorId}' not found`);
            this.showError();
            return;
        }

        this.renderSectorPage(sectorData);
    }

    /**
     * Render the complete sector page
     * @param {Object} sectorData - Complete sector data
     */
    renderSectorPage(sectorData) {
        this.updatePageTitle(sectorData);
        this.renderSectorHeader(sectorData);
        this.renderProjectOverview(sectorData);
        this.renderChallengesSolutions(sectorData);
        this.renderResults(sectorData);
        this.renderGallery(sectorData);
    }

    /**
     * Update page title and meta information
     * @param {Object} sectorData - Sector data
     */
    updatePageTitle(sectorData) {
        document.title = `${sectorData.title} - Rahul Nanduri Portfolio`;
        
        // Update meta description if needed
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', sectorData.description);
        }
    }

    /**
     * Render the sector header section
     * @param {Object} sectorData - Sector data
     */
    renderSectorHeader(sectorData) {
        // Update sector mockup
        const mockupContainer = document.getElementById('sectorMockup');
        if (mockupContainer) {
            mockupContainer.innerHTML = this.createMockupHTML(sectorData);
        }

        // Update sector info
        this.updateElement('sectorCategory', sectorData.category);
        this.updateElement('sectorYear', sectorData.year);
        this.updateElement('sectorStatus', sectorData.status);
        this.updateElement('sectorTitle', sectorData.title);
        this.updateElement('sectorSubtitle', sectorData.subtitle);
        this.updateElement('sectorDescription', sectorData.description);

        // Update tags
        const tagsContainer = document.getElementById('sectorTags');
        if (tagsContainer) {
            tagsContainer.innerHTML = sectorData.tags
                .map(tag => `<span class="sector-tag">${tag}</span>`)
                .join('');
        }
    }

    /**
     * Create mockup HTML based on sector data
     * @param {Object} sectorData - Sector data
     * @returns {string} HTML string for mockup
     */
    createMockupHTML(sectorData) {
        const mockupType = sectorData.mockupType;
        
        switch (mockupType) {
            case 'browser':
                return this.createBrowserMockup(sectorData);
            case 'app':
                return this.createAppMockup(sectorData);
            case 'mobile':
                return this.createMobileMockup(sectorData);
            case 'image':
                return this.createImageMockup(sectorData);
            default:
                return this.createCustomMockup(sectorData);
        }
    }

    /**
     * Create browser mockup HTML
     * @param {Object} sectorData - Sector data
     * @returns {string} HTML string
     */
    createBrowserMockup(sectorData) {
        return `
            <div class="mockup-browser">
                <div class="browser-header">
                    <div class="browser-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="browser-content">
                    <h3>${sectorData.title}</h3>
                    <p>${sectorData.subtitle}</p>
                </div>
            </div>
        `;
    }

    /**
     * Create app mockup HTML
     * @param {Object} sectorData - Sector data
     * @returns {string} HTML string
     */
    createAppMockup(sectorData) {
        return `
            <div class="mockup-app">
                <div class="app-header">
                    <div class="app-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="app-content">
                    <h3 style="color: white; margin-bottom: 20px;">${sectorData.title}</h3>
                    <button style="background: #4a5568; color: white; padding: 12px 24px; border: none; border-radius: 8px; font-size: 1rem;">
                        ${sectorData.subtitle}
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Create mobile mockup HTML
     * @param {Object} sectorData - Sector data
     * @returns {string} HTML string
     */
    createMobileMockup(sectorData) {
        return `
            <div class="mockup-mobile">
                <div class="mobile-screen">
                    <div class="mobile-content">
                        <h4>${sectorData.title}</h4>
                        <p>${sectorData.subtitle}</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Create image mockup HTML
     * @param {Object} sectorData - Sector data
     * @returns {string} HTML string
     */
    createImageMockup(sectorData) {
        const imagePath = sectorData.thumbnailImage || 'images/placeholder.svg';
        return `
            <div class="mockup-image">
                <img src="${imagePath}" 
                     alt="${sectorData.title} - Thumbnail" 
                     class="thumbnail-image"
                     onerror="this.style.background='#f8f9fa'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='<span style=color:#999;>Image not found</span>';">
            </div>
        `;
    }

    /**
     * Create custom mockup HTML
     * @param {Object} sectorData - Sector data
     * @returns {string} HTML string
     */
    createCustomMockup(sectorData) {
        return `
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #F24405, #F28705); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; text-align: center;">
                <div>
                    <h3 style="margin-bottom: 10px; font-size: 1.5rem;">${sectorData.title}</h3>
                    <p style="opacity: 0.9;">${sectorData.subtitle}</p>
                </div>
            </div>
        `;
    }

    /**
     * Render project overview section
     * @param {Object} sectorData - Sector data
     */
    renderProjectOverview(sectorData) {
        this.updateElement('projectDuration', sectorData.duration);
        this.updateElement('projectTeam', sectorData.team);

        // Update technologies
        const techContainer = document.getElementById('projectTechnologies');
        if (techContainer) {
            techContainer.innerHTML = sectorData.technologies
                .map(tech => `<span class="tech-tag">${tech}</span>`)
                .join('');
        }

        // Update links
        const linksContainer = document.getElementById('projectLinks');
        if (linksContainer) {
            const linksHTML = Object.entries(sectorData.links)
                .filter(([key, url]) => url && url !== '#')
                .map(([key, url]) => {
                    const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
                    return `<a href="${url}" class="project-link" target="_blank">${label}</a>`;
                })
                .join('');
            
            linksContainer.innerHTML = linksHTML || '<p style="color: #999;">No links available</p>';
        }
    }

    /**
     * Render challenges and solutions section
     * @param {Object} sectorData - Sector data
     */
    renderChallengesSolutions(sectorData) {
        // Update challenges
        const challengesContainer = document.getElementById('projectChallenges');
        if (challengesContainer) {
            challengesContainer.innerHTML = sectorData.challenges
                .map(challenge => `<li>${challenge}</li>`)
                .join('');
        }

        // Update solutions
        const solutionsContainer = document.getElementById('projectSolutions');
        if (solutionsContainer) {
            solutionsContainer.innerHTML = sectorData.solutions
                .map(solution => `<li>${solution}</li>`)
                .join('');
        }
    }

    /**
     * Render results section
     * @param {Object} sectorData - Sector data
     */
    renderResults(sectorData) {
        const resultsContainer = document.getElementById('projectResults');
        if (resultsContainer) {
            resultsContainer.innerHTML = sectorData.results
                .map(result => `<li>${result}</li>`)
                .join('');
        }
    }

    /**
     * Render gallery section
     * @param {Object} sectorData - Sector data
     */
    renderGallery(sectorData) {
        const galleryContainer = document.getElementById('projectGallery');
        if (galleryContainer && sectorData.gallery) {
            galleryContainer.innerHTML = sectorData.gallery
                .map(image => `
                    <div class="gallery-item">
                        <img src="images/${image}" alt="${sectorData.title} - Gallery Image" class="gallery-image" onerror="this.style.background='#f8f9fa'; this.style.display='flex'; this.style.alignItems='center'; this.style.justifyContent='center'; this.innerHTML='<span style=color:#999;>Image not found</span>';">
                    </div>
                `)
                .join('');
        }
    }

    /**
     * Update a DOM element with new content
     * @param {string} elementId - Element ID
     * @param {string} content - New content
     */
    updateElement(elementId, content) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = content;
        }
    }

    /**
     * Show error message when sector is not found
     */
    showError() {
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center;">
                <div>
                    <h1 style="color: #F24405; margin-bottom: 20px;">Sector Not Found</h1>
                    <p style="color: #333; margin-bottom: 30px;">The requested sector could not be found.</p>
                    <a href="index.html" style="background: #F24405; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px;">Back to Portfolio</a>
                </div>
            </div>
        `;
    }
}

// Create global instance
window.SectorPage = new SectorPage();

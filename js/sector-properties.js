/**
 * SECTOR PROPERTIES SYSTEM
 * 
 * This system standardizes all sector data and ensures consistent
 * structure across the entire portfolio.
 */

class SectorProperties {
    constructor() {
        this.sectors = new Map();
        this.initializeSectors();
    }

    /**
     * Define all sector properties with standardized structure
     */
    initializeSectors() {
        // LayerLens Sector
        this.sectors.set('layerlens', {
            id: 'layerlens',
            title: 'LayerLens',
            subtitle: 'Design System & Navigation Tool',
            description: 'Introduces two features that simplify navigation and reduce cognitive load in complex, collaborative files.',
            tags: ['UX/UI Design', 'UX Research', 'Design Systems'],
            category: 'Design Tools',
            sectorImage: 'layerlens-mockup', // CSS class for styling
            mockupType: 'image', // app, browser, mobile, custom, image
            thumbnailImage: 'images/layerlens-thumbnail.svg', // Path to thumbnail image
            status: 'Completed',
            year: '2024',
            duration: '3 months',
            team: 'Solo Project',
            technologies: ['Figma', 'React', 'CSS3', 'JavaScript'],
            challenges: [
                'Reducing cognitive load in complex file structures',
                'Creating intuitive layer navigation',
                'Maintaining design consistency across teams'
            ],
            solutions: [
                'Implemented hierarchical layer organization',
                'Created visual layer indicators',
                'Developed collaborative workflow improvements'
            ],
            results: [
                '40% reduction in file navigation time',
                'Improved team collaboration efficiency',
                'Enhanced design system adoption'
            ],
            links: {
                live: '#',
                github: '#',
                caseStudy: '#'
            },
            gallery: [
                'layerlens-1.jpg',
                'layerlens-2.jpg',
                'layerlens-3.jpg'
            ]
        });

        // Hudson Wilder Sector
        this.sectors.set('hudson-wilder', {
            id: 'hudson-wilder',
            title: 'Hudson Wilder',
            subtitle: 'E-commerce Platform',
            description: 'Brought a luxury glassware brand to life through immersive e-commerce design and seamless user experience.',
            tags: ['E-commerce', 'Visual Design', 'Brand Identity'],
            category: 'E-commerce',
            sectorImage: 'hudson-wilder-mockup',
            mockupType: 'browser',
            status: 'Live',
            year: '2024',
            duration: '4 months',
            team: 'Design Lead',
            technologies: ['Shopify', 'Liquid', 'CSS3', 'JavaScript', 'Figma'],
            challenges: [
                'Creating luxury brand experience online',
                'Optimizing product showcase for glassware',
                'Implementing seamless checkout flow'
            ],
            solutions: [
                'Designed immersive product galleries',
                'Created elegant product detail pages',
                'Optimized mobile shopping experience'
            ],
            results: [
                '25% increase in conversion rate',
                '60% improvement in mobile usability',
                'Enhanced brand perception'
            ],
            links: {
                live: 'https://hudsonwilder.com',
                github: '#',
                caseStudy: '#'
            },
            gallery: [
                'hudson-1.jpg',
                'hudson-2.jpg',
                'hudson-3.jpg'
            ]
        });

        // Neptune Studio Sector
        this.sectors.set('neptune-studio', {
            id: 'neptune-studio',
            title: 'Neptune Studio',
            subtitle: 'Music Production Platform',
            description: 'Brought a music studio\'s creative vision to life through immersive web design and interactive audio experiences.',
            tags: ['Music', 'Visual Design', 'Interactive Design'],
            category: 'Creative Platforms',
            sectorImage: 'neptune-studio-mockup',
            mockupType: 'app',
            status: 'In Development',
            year: '2024',
            duration: '6 months',
            team: 'Lead Designer',
            technologies: ['React', 'Web Audio API', 'Three.js', 'CSS3'],
            challenges: [
                'Creating immersive audio-visual experience',
                'Integrating real-time audio controls',
                'Designing for creative professionals'
            ],
            solutions: [
                'Developed interactive audio interface',
                'Created 3D visualizations',
                'Implemented responsive design system'
            ],
            results: [
                'Enhanced creative workflow',
                'Improved user engagement',
                'Streamlined music production process'
            ],
            links: {
                live: '#',
                github: '#',
                caseStudy: '#'
            },
            gallery: [
                'neptune-1.jpg',
                'neptune-2.jpg',
                'neptune-3.jpg'
            ]
        });

        // Eco A.I.D Sector
        this.sectors.set('eco-aid', {
            id: 'eco-aid',
            title: 'Eco A.I.D',
            subtitle: 'Sustainable AI Framework',
            description: 'Developed a comprehensive framework for sustainable AI implementation in enterprise environments.',
            tags: ['AI/ML', 'Sustainability', 'Enterprise', 'UX Research'],
            category: 'AI & Sustainability',
            sectorImage: 'eco-aid-mockup',
            mockupType: 'app',
            status: 'Research Phase',
            year: '2024',
            duration: '8 months',
            team: 'Research Lead',
            technologies: ['Python', 'TensorFlow', 'React', 'D3.js'],
            challenges: [
                'Measuring AI environmental impact',
                'Creating actionable sustainability guidelines',
                'Balancing performance with efficiency'
            ],
            solutions: [
                'Developed carbon footprint tracking',
                'Created optimization algorithms',
                'Built comprehensive reporting dashboard'
            ],
            results: [
                '30% reduction in AI energy consumption',
                'Comprehensive sustainability metrics',
                'Industry adoption of framework'
            ],
            links: {
                live: '#',
                github: '#',
                caseStudy: '#'
            },
            gallery: [
                'eco-1.jpg',
                'eco-2.jpg',
                'eco-3.jpg'
            ]
        });
    }

    /**
     * Get sector properties by ID
     * @param {string} sectorId - The sector identifier
     * @returns {Object|null} Sector properties or null if not found
     */
    getSector(sectorId) {
        return this.sectors.get(sectorId) || null;
    }

    /**
     * Get all sectors
     * @returns {Array} Array of all sector objects
     */
    getAllSectors() {
        return Array.from(this.sectors.values());
    }

    /**
     * Get sectors by category
     * @param {string} category - The category to filter by
     * @returns {Array} Array of sectors in the category
     */
    getSectorsByCategory(category) {
        return this.getAllSectors().filter(sector => sector.category === category);
    }

    /**
     * Get sectors by tag
     * @param {string} tag - The tag to filter by
     * @returns {Array} Array of sectors with the tag
     */
    getSectorsByTag(tag) {
        return this.getAllSectors().filter(sector => sector.tags.includes(tag));
    }

    /**
     * Add a new sector
     * @param {string} sectorId - Unique identifier
     * @param {Object} properties - Sector properties object
     */
    addSector(sectorId, properties) {
        // Validate required properties
        const required = ['title', 'subtitle', 'description', 'tags', 'category', 'sectorImage', 'mockupType'];
        const missing = required.filter(prop => !properties[prop]);
        
        if (missing.length > 0) {
            throw new Error(`Missing required properties: ${missing.join(', ')}`);
        }

        this.sectors.set(sectorId, {
            id: sectorId,
            ...properties
        });
    }

    /**
     * Update sector properties
     * @param {string} sectorId - The sector identifier
     * @param {Object} updates - Properties to update
     */
    updateSector(sectorId, updates) {
        const sector = this.sectors.get(sectorId);
        if (!sector) {
            throw new Error(`Sector '${sectorId}' not found`);
        }

        this.sectors.set(sectorId, {
            ...sector,
            ...updates
        });
    }

    /**
     * Get sector properties for homepage display
     * @param {string} sectorId - The sector identifier
     * @returns {Object} Simplified properties for homepage
     */
    getHomepageData(sectorId) {
        const sector = this.getSector(sectorId);
        if (!sector) return null;

        return {
            id: sector.id,
            title: sector.title,
            subtitle: sector.subtitle,
            description: sector.description,
            tags: sector.tags,
            sectorImage: sector.sectorImage,
            mockupType: sector.mockupType,
            category: sector.category
        };
    }

    /**
     * Get sector properties for detail page display
     * @param {string} sectorId - The sector identifier
     * @returns {Object} Complete properties for detail page
     */
    getDetailPageData(sectorId) {
        return this.getSector(sectorId);
    }

    /**
     * Get all available categories
     * @returns {Array} Array of unique categories
     */
    getCategories() {
        const categories = new Set();
        this.getAllSectors().forEach(sector => {
            categories.add(sector.category);
        });
        return Array.from(categories);
    }

    /**
     * Get all available tags
     * @returns {Array} Array of unique tags
     */
    getTags() {
        const tags = new Set();
        this.getAllSectors().forEach(sector => {
            sector.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }
}

// Create global instance
window.SectorProperties = new SectorProperties();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SectorProperties;
}

# Portfolio Website - Rahul Nanduri

## 🎯 Project Overview
A modern, interactive portfolio website showcasing design and development projects. Built with vanilla HTML, CSS, and JavaScript for optimal performance and maintainability.

## 🏗️ Architecture

### Core Components
- **Homepage** (`index.html`) - Main portfolio landing page with interactive dot grid
- **Sector Pages** - Individual project detail pages with standardized layout
- **Navigation System** - Proximity-based sidebar navigation
- **Color System** - Standardized blue theme with CSS variables

### File Structure
```
portfolio/
├── index.html                 # Main homepage
├── layerlens.html            # LayerLens project page
├── hudson-wilder.html        # Hudson Wilder project page
├── neptune-studio.html       # Neptune Studio project page
├── eco-aid.html             # Eco Aid project page
├── sector-page-template.html # Template for new project pages
├── css/
│   ├── styles.css           # Main stylesheet with color system
│   ├── sidebar-navigation.css # Sidebar and button styles
│   └── sector-pages.css     # Sector page specific styles
├── js/
│   ├── sector-properties.js # Project data management
│   ├── sector-page.js       # Dynamic page rendering
│   └── sidebar-navigation.js # Interactive navigation
├── images/                  # Project thumbnails and assets
└── SECTOR_GUIDELINES.md    # Development guidelines
```

## 🎨 Design System

### Color Palette
```css
:root {
    --primary-color: #6bc1e0;      /* Light Blue */
    --secondary-color: #366170;     /* Dark Blue-Gray */
    --accent-color: #6bcde0;        /* Light Blue Variant */
    --background-color: #F2F0E4;    /* Light Background */
    --text-primary: #1a1a1a;        /* Dark Text */
    --text-secondary: #333333;     /* Medium Gray Text */
    --text-light: #ffffff;         /* White Text */
}
```

### Typography
- **Primary**: VT323 (Monospace)
- **Secondary**: Inter (Sans-serif)
- **Code**: JetBrains Mono

## 🚀 Development

### Local Development
```bash
# Start local server
python3 -m http.server 8000

# Access at http://localhost:8000
```

### Deployment
- **Platform**: GitHub Pages
- **URL**: https://rrahulnanduri.github.io/portfolio/
- **Auto-deploy**: Push to main branch

## 📝 Adding New Projects

1. **Add project data** to `js/sector-properties.js`
2. **Create HTML file** using `sector-page-template.html`
3. **Add thumbnail image** to `images/` folder
4. **Update navigation** in sidebar system

See `SECTOR_GUIDELINES.md` for detailed instructions.

## 🔧 Key Features

### Interactive Elements
- **Dot Grid Background** - Cursor-responsive animation
- **Proximity Sidebar** - Auto-hide navigation system
- **Smooth Animations** - CSS transitions and transforms
- **Responsive Design** - Mobile-first approach

### Performance
- **Vanilla JavaScript** - No external dependencies
- **Optimized CSS** - Minimal file size
- **Lazy Loading** - Efficient resource management
- **Cache Busting** - Version-controlled assets

## 🤖 AI Development Notes

This codebase is optimized for AI-assisted development:

- **Standardized Structure** - Consistent file organization
- **Comprehensive Comments** - Detailed code documentation
- **Modular Design** - Separated concerns for easy modification
- **CSS Variables** - Centralized styling system
- **Clear Naming** - Descriptive class and function names

### Key Files for AI Understanding
1. `js/sector-properties.js` - Central data management
2. `css/styles.css` - Main styling system
3. `js/sidebar-navigation.js` - Interactive components
4. `SECTOR_GUIDELINES.md` - Development patterns

## 📊 Project Status
- ✅ Homepage with interactive background
- ✅ Standardized project pages
- ✅ Navigation system
- ✅ Color system implementation
- ✅ Responsive design
- ✅ Performance optimization

## 🔄 Maintenance
- **Color Changes**: Update CSS variables in `:root`
- **New Projects**: Follow sector guidelines
- **Styling**: Use existing CSS classes
- **Functionality**: Extend existing JavaScript modules

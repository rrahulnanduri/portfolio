# Sector Standardization Guidelines

## 🎯 Core Principles

Every sector in the portfolio must follow these standardized rules to ensure consistency, visual harmony, and professional presentation.

## 📐 Structure Requirements

### Two-Part Division
- **Top Half (Mockup)**: 200px height, showcases project interface
- **Bottom Half (Info)**: Orange background (#F24405), white text, project details

### Dimensions
- **Minimum Height**: 400px total
- **Maximum Width**: 100% of container
- **Border Radius**: 12px
- **Shadow**: `0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)`

## 🎨 Visual Standards

### Color System
- **Background**: White card with orange bottom half
- **Orange**: `#F24405` (solid, no transparency)
- **Text**: Pure white (`white`) on orange background
- **Tags**: Semi-transparent white background with white text

### Typography
- **Title**: 1.2rem, font-weight 600, white
- **Description**: 0.9rem, line-height 1.5, white
- **Tags**: 0.8rem, font-weight 500, white

## 🧩 Mockup Components

### 1. Browser Window (`.mockup-browser`)
**Use for**: Web applications, websites, web tools
```html
<div class="mockup-browser">
    <div class="browser-header">
        <div class="browser-dots">
            <span></span><span></span><span></span>
        </div>
    </div>
    <div class="browser-content">
        <!-- Your content -->
    </div>
</div>
```

### 2. App Window (`.mockup-app`)
**Use for**: Desktop applications, mobile apps, software interfaces
```html
<div class="mockup-app">
    <div class="app-header">
        <div class="app-dots">
            <span></span><span></span><span></span>
        </div>
    </div>
    <div class="app-content">
        <!-- Your content -->
    </div>
</div>
```

### 3. Mobile Mockup (`.mockup-mobile`)
**Use for**: Mobile-first applications, app interfaces
```html
<div class="mockup-mobile">
    <div class="mobile-screen">
        <div class="mobile-content">
            <!-- Your content -->
        </div>
    </div>
</div>
```

## 📝 Content Guidelines

### Project Title
- **Length**: 1-3 words maximum
- **Style**: Clear, descriptive, memorable
- **Examples**: "LayerLens", "Eco A.I.D", "Neptune Studio"

### Project Description
- **Length**: 1-2 sentences
- **Focus**: Value proposition, key benefit
- **Tone**: Professional, concise
- **Examples**: 
  - "Introduces two features that simplify navigation and reduce cognitive load in complex, collaborative files."
  - "Brought a music studio's creative vision to life through immersive web design."

### Tags
- **Quantity**: 2-4 tags maximum
- **Categories**: Use standardized list below
- **Style**: Concise, relevant, professional

### Standardized Tag Categories
- UX/UI Design
- UX Research
- Visual Design
- Frontend Development
- Backend Development
- Mobile Development
- Data Analysis
- Product Strategy
- Brand Identity
- User Testing
- Web Development
- Interface Design

## 🔧 Implementation Process

### Step 1: Choose Mockup Type
Select the appropriate mockup component based on your project type.

### Step 2: Create Mockup Content
- Keep content simple and focused
- Show key features or interface elements
- Use appropriate colors for the mockup type
- Avoid cluttering the 200px height limit

### Step 3: Write Project Info
- Craft a compelling title (1-3 words)
- Write a clear description (1-2 sentences)
- Select 2-4 relevant tags

### Step 4: Apply Standardized Classes
- Use `.project-card` for the container
- Use `.project-mockup` for the top half
- Use `.project-info` for the bottom half
- Use `.project-title`, `.project-description`, `.project-tags` for content

## ✅ Quality Checklist

Before publishing a new sector, verify:

- [ ] Two-part structure (mockup + info)
- [ ] Orange bottom half with white text
- [ ] Appropriate mockup component used
- [ ] Title is 1-3 words
- [ ] Description is 1-2 sentences
- [ ] 2-4 relevant tags selected
- [ ] All text is white on orange background
- [ ] Mockup content is simple and focused
- [ ] Responsive behavior maintained
- [ ] No custom color overrides

## 🚫 Common Mistakes to Avoid

- **Don't** use custom colors that break the orange/white system
- **Don't** make mockup content too complex or cluttered
- **Don't** write descriptions longer than 2 sentences
- **Don't** use more than 4 tags
- **Don't** override the standardized CSS classes
- **Don't** make the card height less than 400px
- **Don't** use dark text on the orange background

## 📚 Reference Examples

### LayerLens
- **Mockup**: App window with layer hierarchy
- **Title**: "LayerLens"
- **Description**: "Introduces two features that simplify navigation and reduce cognitive load in complex, collaborative files."
- **Tags**: "UX/UI Design", "UX Research"

### Neptune Studio
- **Mockup**: App window with music interface
- **Title**: "Neptune Studio"
- **Description**: "Brought a music studio's creative vision to life through immersive web design."
- **Tags**: "Visual Design"

### Eco A.I.D
- **Mockup**: App window with policy buttons
- **Title**: "Eco A.I.D"
- **Description**: "Sustainable AI Framework"
- **Tags**: "UX/UI Design", "UX Research"

## 🔄 Maintenance

- Review all sectors quarterly for consistency
- Update tag categories as needed
- Ensure responsive behavior across devices
- Test color contrast and accessibility
- Validate HTML structure compliance

---

**Remember**: Consistency is key. Every sector should feel like part of the same portfolio while showcasing unique project value.

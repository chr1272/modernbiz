

# Project Specification: ModernBiz One-Page Site

## 1. Technical Stack
- **Framework:** React (Vite-based)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion (for smooth section transitions and hover effects)
- **Navigation:** Smooth-scroll anchor links

## 2. Visual Identity (Based on Mockup)
- **Primary Color:** Bright Blue (`#2563EB`)
- **Backgrounds:** Pure White (`#FFFFFF`) for hero/contact, and very light Gray/Blue (`#F8FAFC`) for section backgrounds.
- **Typography:** Sans-serif (Inter or System UI), bold weights for headings.
- **Corner Radius:** Large rounded corners (`rounded-2xl` or `16px`) for cards and buttons.
- **Shadows:** Very subtle, soft shadows for the header and cards.

## 3. Component Specifications

### 3.1 Floating Header
- **Layout:** Centered floating bar with a slight blur (backdrop-filter).
- **Logo:** "MODERNBIZ" in bold dark blue.
- **Nav:** Links (Home, Services, Documents, About, Contact). 
- **Style:** Small blue underline or pill-shape for the active section.

### 3.2 Hero Section (ID: #home)
- **Layout:** Two-column flex/grid.
- **Left Side:** Large H1 "Innovative Solutions for Modern Business", blue "Get Started" button with rounded corners.
- **Right Side:** Large abstract geometric graphic (use an SVG or a themed blue composition).

### 3.3 Services Section (ID: #services)
- **Background:** Light gray-blue (`bg-slate-50`).
- **Layout:** 3x2 Grid (6 cards total).
- **Card Style:** White background, thin border, icon at top-left, bold title, short description.
- **Items:** Consulting, Cloud Services, Analytics, Cybersecurity, Cloud Services (repeat), Cooperation.

### 3.4 Documents Section (ID: #documents)
- **Layout:** Clean vertical stack.
- **Row Style:** Icon on the left, filename in the middle, and a solid blue "Download" button on the far right.
- **Interaction:** Rows should have a subtle hover highlight.

### 3.5 About Us Section (ID: #about)
- **Layout:** A single large "card" container with a split 50/50 layout.
- **Left Side:** Blue-tinted background with the heading "About Us" and the mission statement.
- **Right Side:** High-quality image of a modern, sunlit office space.
- **Styling:** The image and text block should share a single rounded-2xl container.

### 3.6 Contact Section (ID: #contact)
- **Header:** Centered "Contact" title.
- **Form Layout:** 
    - Row 1: Name (Input), Email (Input).
    - Row 2: Message (Textarea).
    - Row 3: Full-width blue "Send" button.
- **Style:** Minimalist inputs with light gray borders.

---

## 4. Implementation Instructions for AI
1. **Setup:** Initialize a Vite + React + Tailwind project.
2. **Icons:** Use `lucide-react` for the Service icons (Shield, Cloud, BarChart, etc.) and Document icons.
3. **Smooth Scroll:** Implement `scroll-behavior: smooth` in the global CSS.
4. **Responsiveness:** Ensure that on mobile, the 2-column layouts (Hero and About) stack vertically, and the Services grid changes to 1 column.
5. **Assets:** For the Hero abstract image and the Office image, use high-quality Unsplash placeholders (e.g., `https://images.unsplash.com/...`).

---

### How to use this with VS Code AI (Cursor/Copilot):
1. Create the file `specs.md` with the content above.
2. In your AI Chat, type:
> "Please build the `App.jsx` and `index.css` for a React website based exactly on the layout and styles described in `specs.md`. Use the provided mockup image as the visual reference for spacing and padding. Ensure the floating header is functional."
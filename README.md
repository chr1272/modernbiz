# ModernBiz One-Page Website

A modern, responsive business website built with React, Tailwind CSS, and Framer Motion.

---

## 🚀 Quick Start (Development)

**Requirements:** Node.js 18+

```bash
npm install
npm run dev
```

Opens at http://localhost:5173/

---

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist/` folder with static files.

---

## 📤 Sharing the Project

### Option 1: Share Source Code

1. Delete the `node_modules` folder (saves space)
2. Zip the entire project folder
3. Send the zip

**Recipient runs:**
```bash
npm install
npm run dev
```

---

### Option 2: Share Built Website (dist folder)

1. Run `npm run build`
2. Zip only the `dist/` folder
3. Send the zip

**Recipient runs (choose one):**

With Python:
```bash
cd dist
python -m http.server 8000
# Open http://localhost:8000
```

With Node.js:
```bash
npx serve dist
# Open http://localhost:3000
```

Or upload `dist/` to any web host (Netlify, Vercel, GitHub Pages).

---

## 🛠 Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Lucide React** (icons)

---

## 📁 Project Structure

```
├── src/
│   ├── App.jsx       # All components
│   ├── main.jsx      # React entry
│   └── index.css     # Global styles
├── dist/             # Production build
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

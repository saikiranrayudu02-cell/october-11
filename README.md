# Personal Portfolio Website

A clean, modern, responsive, and lightweight portfolio website built simply with pure HTML5, CSS3, and JavaScript — no heavy frameworks or build steps required.

## 🌟 Highlights & Features
- **Clean Architecture**: Only 3 core files (`index.html`, `style.css`, `script.js`).
- **Dark / Light Theme**: Instant toggle with state preserved via `localStorage`.
- **Modern Aesthetics**: Curated color palette, sleek glassmorphism, subtle glowing background orbs, and smooth transitions.
- **Responsive Layout**: Designed for mobile phones, tablets, laptops, and ultra-wide screens.
- **Interactive Project Filters**: Easily filter featured works by category (*All, Full-Stack, Frontend, Tools*).
- **Interactive Contact Form**: Client-side validation with instant visual feedback and toast notifications.
- **1-Click Copy Email**: Quick button allowing visitors to copy your email to their clipboard.
- **Scrollspy Navigation**: Automatically highlights active navbar links as visitors scroll.

---

## 🚀 How to Run Locally

### Option 1: Direct Browser Launch
Simply double click or open [`index.html`](file:///Users/maggi/basic-site/index.html) in any web browser (Chrome, Safari, Firefox, Edge).

### Option 2: Using Python HTTP Server (Built-in)
Run the following in the terminal from this folder:
```bash
python3 -m http.server 3000
```
Then visit: [http://localhost:3000](http://localhost:3000)

### Option 3: Using Node / npx
```bash
npx serve .
```

---

## ✏️ How to Customize for Yourself

1. **Your Name & Bio**:
   - Open [`index.html`](file:///Users/maggi/basic-site/index.html).
   - Search for `Alex Morgan` and replace it with your own name.
   - Update the hero tagline, bio in the `<section id="about">`, and statistics.

2. **Your Tech Stack**:
   - In `<section id="skills">`, customize the category titles and tech tags (e.g. React, Python, AWS, Figma).

3. **Your Projects**:
   - In `<section id="projects">`, edit the project cards with your real project names, descriptions, tags, and links to live demos or GitHub repositories.

4. **Your Socials & Contact**:
   - In `<section id="contact">`, update the email address and your GitHub / LinkedIn / Twitter links.

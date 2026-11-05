# Aya Mohy — AI Engineer & Data Scientist Personal Portfolio Website

A modern, premium, visually impressive personal portfolio website for **Aya Mohy**, positioning her as an **AI Engineer | Data Scientist | Machine Learning**.

Built exclusively with **HTML5, CSS3, and Vanilla JavaScript** (Zero frameworks or heavy external libraries).

---

## 🌟 Key Features

1. **Futuristic AI Aesthetic**:
   - Neural network constellation canvas background with interactive particle physics and mouse attraction.
   - Elegant dark/light mode toggle adapting all primary, secondary, accent, and card surface tokens.
   - Glassmorphism surfaces, glowing neon borders, ambient cursor glow (desktop only), and 3D card tilt micro-interactions.

2. **Accurate Positioning & Specialties**:
   - Main Title: **AI Engineer & Data Scientist**
   - Rotating Subtitle: Cycles through *AI Engineer*, *Machine Learning Enthusiast*, *Data Scientist*, and *Deep Learning Developer*.
   - Professional narrative highlighting engineering rigor from the Faculty of Engineering (Information and Computer Engineering), supported by prior frontend development experience, transitioning into applied AI.

3. **Complete 10-Section Single-Page Layout**:
   1. **Home / Hero**: High-impact split hero with personal photo frame, rotating titles, CTAs, and floating telemetry badges (`ROC-AUC: 0.9111`, `CNN Vision Model`).
   2. **About Me**: Professional journey narrative, "What I Can Do" capabilities checklist, and an interactive End-to-End AI Engineering Workflow graphic.
   3. **Education**: Faculty of Engineering, Department of Information and Computer Engineering, Bachelor's in Engineering (B.Sc.), timeline card, and academic illustration.
   4. **Experience**: Dual-track timeline highlighting NTI AI for Business Diploma and professional Frontend Development foundation.
   5. **Skills**: Categorized competencies (Programming & Data, Machine Learning, Deep Learning, Development & Tools) with interactive skill cards (no fake percentages).
   6. **Projects** (Highest Priority):
      - **Customer Churn Prediction**: Machine Learning, Scikit-learn, ROC-AUC: 0.9111, with dedicated dark analytics dashboard graphic.
      - **Car Damage Detection**: Deep Learning / Computer Vision, 7-class CNN model (Bumper Dent, Bumper Scratch, Door Dent, Door Scratch, Glass Shatter, Head Lamp, Tail Lamp) with Streamlit UI mockup.
      - **Interactive Project Deep Dive Modal**: Inspects dataset challenges, pipeline architecture, metrics, and code links on click.
   7. **Feedback**: Modern testimonial cards with editable placeholders.
   8. **Services**: 4 distinct service cards (Machine Learning Solutions, Data Analysis, Deep Learning & Computer Vision, AI-Powered Applications).
   9. **Achievements**: Vertical honors stack including NTI diploma milestone, high ROC-AUC milestone, multi-class CNN recognition, and customizable placeholders.
   10. **Get in Touch**: Direct contact channels, editable placeholders, and an interactive contact form with real-time validation and confirmation toast.

4. **Performance & Accessibility**:
   - Zero framework dependencies for blistering fast load times.
   - Full keyboard navigation and accessible skip links.
   - Respects `prefers-reduced-motion: reduce`.
   - Floating back-to-top button with circular SVG scroll progress indicator.

---

## 📁 Directory Structure

```text
portfolio/
│
├── index.html                           # Main HTML5 semantic document
├── README.md                            # Documentation and customization guide
│
├── css/
│   ├── style.css                        # Complete design system & responsive rules
│   └── animations.css                   # Keyframes, transitions, and reveal classes
│
├── js/
│   ├── script.js                        # Theme toggle, navigation, modal, form validation
│   ├── particles.js                     # Neural network canvas animation
│   └── projects-data.js                 # Technical deep dive content for project modals
│
└── assets/
    ├── images/
    │   ├── profile-avatar.svg           # AI engineer profile avatar / placeholder
    │   ├── project-churn.svg            # Churn prediction ROC-AUC analytics dashboard visual
    │   ├── project-car-damage.svg       # Car damage detection computer vision CNN visual
    │   ├── about-ai-pipeline.svg        # End-to-end AI engineering workflow diagram
    │   ├── education-academic.svg       # Faculty of Engineering academic graphic
    │   ├── experience-workspace.svg     # Experience progression visual
    │   ├── achievements-badge.svg       # Honors and awards badge visual
    │   └── contact-communication.svg    # Neural communication channels visual
    └── icons/                           # Category icons and vector assets
```

---

## 🎨 Theme Palette

### Dark Mode
- **Primary**: `#9FA0FF`
- **Secondary**: `#D5E8E6`
- **Accent**: `#FF7171`
- **Background**: Deep Navy / `#090D16`
- **Cards**: Dark Surface / `#131B2E`

### Light Mode
- **Primary**: `#4D8DBA`
- **Secondary**: `#086288`
- **Accent**: `#2A93D5` / `#97D7FF`
- **Background**: Clean White / Light Blue `#F5F9FC`
- **Cards**: Pure White `#FFFFFF`

---

## ⚙️ How to Customize

### 1. Adding Your Personal Photo
Drop your personal photo (e.g. `profile.jpg` or `profile.png`) into `assets/images/` and update line 188 in `index.html`:
```html
<img
  id="personalProfilePhoto"
  src="assets/images/profile.jpg"
  alt="Aya Mohy — AI Engineer & Data Scientist"
  class="profile-img"
/>
```
*(If the file is not found, it automatically falls back to the custom vector avatar).*

### 2. Updating Social & Project Links
Search for `https://github.com/ayamohy` and `https://linkedin.com` in `index.html` and `js/projects-data.js` to link your personal profiles and GitHub repositories.

### 3. Connecting the Contact Form
In `index.html`, you can connect the form to any backend API or email service such as Formspree:
```html
<form id="contactForm" action="https://formspree.io/f/your-form-id" method="POST">
```

---

## 🚀 Deployment

Because the website is built with pure static files (HTML, CSS, JS):
- **GitHub Pages**: Push this repository to GitHub and enable GitHub Pages in Settings → Pages.
- **Vercel / Netlify**: Simply drag and drop the folder or connect your Git repository.

<!-- website link -->
https://ayamohy1.github.io/Portfolio/

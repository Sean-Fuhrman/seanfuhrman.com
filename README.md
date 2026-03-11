# seanfuhrman.com

Personal portfolio website for Sean Fuhrman, built with vanilla HTML, CSS, and JavaScript.

## Features

- **Single-Page Application** with client-side routing (`window.history.pushState`)
- **Projects Carousel** showcasing personal and academic projects with a 3D card carousel
- **Blog** with markdown-rendered posts (via zero-md) and comment support (Utterances)
- **Contact Form** powered by Formspree
- **Responsive Design** optimized for desktop, tablet, and mobile
- **Web Components** using Shadow DOM for encapsulated project cards

## Tech Stack

- Pure HTML/CSS/JavaScript (no frameworks or build tools)
- Web Components with Shadow DOM
- CSS Grid and Flexbox for layout
- CSS custom properties for theming
- Touch/swipe gesture support for mobile carousel navigation

## Project Structure

```
├── index.html        # All page templates (SPA)
├── main.js           # Routing, components, and interaction logic
├── global.css        # All styles including responsive breakpoints
├── assets/           # Images, videos, and SVG backgrounds
├── blog-posts/       # Markdown blog content
└── Resume.pdf        # Resume
```

## Running Locally

Open `index.html` in a browser, or serve with any static file server:

```bash
npx serve .
# or
python3 -m http.server
```

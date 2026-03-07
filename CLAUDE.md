# CLAUDE.md

## Project Overview

Personal portfolio website at seanfuhrman.com. Vanilla HTML/CSS/JS single-page application with no build tools or frameworks.

## Architecture

- **index.html**: Contains all page content inside `<template>` elements (`#home-tpl`, `#projects-tpl`, `#contact-tpl`, `#blog-tpl`, `#blog-post-tpl`). Templates are cloned into `<main>` by the router.
- **main.js**: All JavaScript logic — SPA router, Web Components (`projects-item` using Shadow DOM), carousel/slider logic, animations, and touch handlers.
- **global.css**: All styles. Uses CSS custom properties for theming. Key breakpoints: 600px (homepage mobile), 750px (projects mobile).

## Key Patterns

- **Routing**: `window.history.pushState` based. Routes defined in `main.js` with `openHome()`, `openProjects()`, `openContact()`, `openBlog()`, `openBlogPost()` functions.
- **Projects Carousel**: 3D card carousel with 5 visible positions (`.position1` through `.position5`). Cards are absolutely positioned within `#slider` and animated via CSS transforms. On mobile, only the active card (`.position3`) is visible.
- **Web Components**: `<projects-item>` custom element with Shadow DOM. Accepts `header`, `details`, `img`, `github`, and `src`/`src2` attributes. Styles are encapsulated in the shadow root.
- **Touch/Swipe**: Touch events on `#slider` for mobile carousel navigation (50px threshold).

## CSS Variables

```
--projects-background-color: #001220
--projects-item-background-color: black
--projects-text-color: white
--projects-highlight-color: #47e37b
```

## Responsive Breakpoints

- `max-width: 600px` — Homepage mobile (hamburger nav)
- `max-width: 750px` — Projects mobile (single-card view, wider cards at 85% width)
- `min-width: 750px` — Desktop (3-column grid, 5-card carousel)

## Assets

- `/assets/` — Project images (.webp, .png, .gif), videos (.webm, .mp4), and SVG wave backgrounds
- `/blog-posts/` — Markdown files rendered by zero-md

## No Build Step

Serve directly with any static file server. No npm, no bundler, no transpilation.

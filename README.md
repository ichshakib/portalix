<div align="center">

<img src="public/logo.svg" alt="Portalix Logo" width="80" height="80" />

# Portalix

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-lightgrey.svg?logo=express)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/Templates-EJS-orange.svg)](https://ejs.co/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**A high-performance, minimalist directory and open API platform for curated streaming services, anime, manga, live sports, and media applications.**

[Explore Directory](#overview) • [API Endpoints](#api-reference) • [Submit Site](#site-submissions) • [Contributing](CONTRIBUTING.md)

</div>

---

## ⚡ Overview

**Portalix** is an open-source, ultra-fast web directory designed to index and organize verified streaming platforms and media tools across the web. Built with Node.js, TypeScript, Express, and EJS, Portalix focuses on minimalism, speed, and privacy—delivering instant search, category filtering, and client-side bookmarking with zero bloat.

### 🌟 Key Features

- **76+ Verified Resources**: Hand-curated across 6 primary entertainment and utility categories.
- **⚡ Ultra-Fast Search**: Real-time fuzzy filtering by site name, domain, category, and tags (`/` shortcut).
- **🔒 Privacy-First & Lightweight**: Zero invasive tracking scripts, zero bloat, and offline-safe local storage for bookmarks.
- **🎨 Minimalist Dark Mode**: Clean monochrome aesthetic using Lucide vector icons and custom slim scrollbars.
- **📑 Full EJS Templating**: Server-side rendered pages with modular component partials.
- **🔌 Open REST API**: Direct programmatic JSON endpoints (`/api/sites`, `/health`, `/api/info`).

---

## 📂 Curated Categories

| Category | Icon | Count | Description |
| :--- | :---: | :---: | :--- |
| **Movies & Shows** | `film` | 28 | Free movie streaming hubs, web series, and HD cinema portals |
| **Anime** | `tv` | 15 | Subbed & dubbed anime streaming platforms and aggregators |
| **Manga** | `book-open` | 7 | Online manga readers, scanlations, manhwa, and webtoons |
| **Live TV & Sports** | `trophy` | 7 | Live sports streams, football, cricket, PPV events, and IPTV |
| **Paid Platforms** | `credit-card` | 13 | Official subscription services and OTT platforms (Netflix, HBO Max, etc.) |
| **Apps & Tools** | `layout-grid` | 6 | Mobile streaming APKs, media managers, and client tools |

---

## 🛠️ Project Structure

```text
portalix/
├── public/                 # Static assets (favicons, stylesheets, scripts)
├── src/
│   ├── data/
│   │   └── sites.json      # Single source of truth for directory listings
│   └── index.ts            # Express server & API routes
├── views/
│   ├── index.ejs           # Homepage layout & interactive directory
│   ├── about.ejs           # Project info & principles page
│   ├── submit.ejs          # Site suggestion & submission portal
│   └── partials/
│       ├── header.ejs      # Header navigation & search partial
│       ├── footer.ejs      # Multi-column detailed footer partial
│       └── card.ejs        # Reusable site card component
├── package.json            # Dependencies and scripts
├── tsconfig.json           # Strict TypeScript configuration
├── CODE_OF_CONDUCT.md      # Contributor code of conduct
├── CONTRIBUTING.md         # Contribution guidelines
└── README.md               # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or later
- **npm**: `v9.0.0` or later

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ichshakib/portalix.git
   cd portalix
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run in development mode (with auto-reload on file changes):**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Start production server:**
   ```bash
   npm start
   ```

The application will be running at `http://localhost:3000`.

---

## 📡 API Reference

Portalix exposes lightweight REST API endpoints for developers:

### 1. Get All Sites Directory
```http
GET /api/sites
```
**Response (`200 OK`):**
```json
[
  {
    "id": "ms2tednwv7muc",
    "name": "PANTYFLIX",
    "url": "https://pantyflix.org/",
    "domain": "pantyflix.org",
    "category": "Movies & Shows",
    "regions": ["Global"],
    "tags": ["trusted"],
    "isTrusted": true,
    "isNew": false,
    "isFeatured": false,
    "description": "",
    "addedAt": 1785131827629,
    "order": 1,
    "faviconUrl": "/logos/pantyflix_org.png"
  }
]
```

### 2. System Health
```http
GET /health
```
**Response (`200 OK`):**
```json
{
  "status": "healthy",
  "uptime": 128.45,
  "timestamp": "2026-08-31T14:30:00.000Z"
}
```

### 3. Application Metadata
```http
GET /api/info
```
**Response (`200 OK`):**
```json
{
  "name": "portalix",
  "version": "1.0.0",
  "description": "Portalix Media & Streaming Directory",
  "status": "active",
  "environment": "development"
}
```

---

## 📬 Site Submissions

Want to suggest a new streaming portal, manga reader, or media tool?

- **Submit via Web UI**: Visit the `/submit` page to fill out the suggestion form.
- **Direct Email**: Send site details (Name, URL, Category, Region, Description) to **[ichshakib@gmail.com](mailto:ichshakib@gmail.com?subject=Portalix%20Site%20Submission)**.
- **Pull Request**: Add the entry directly to `src/data/sites.json` and open a PR following our [Contributing Guidelines](CONTRIBUTING.md).

---

## 🤝 Contributing

Contributions, feature ideas, and site additions are welcome! Please check our:
- [Contributing Guide](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

---

## 📄 Disclaimer

Portalix operates strictly as an indexing service and informational directory. We do not host, store, stream, or broadcast any media or copyrighted files on our servers. All links point to external third-party services.

---

## 📜 License

This project is open-source and licensed under the [MIT License](LICENSE).
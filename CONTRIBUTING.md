# Contributing to Portalix

Thank you for your interest in contributing to **Portalix**! We welcome contributions of all kinds—whether you are adding new curated websites, fixing bugs, proposing new features, or improving documentation.

---

## 📜 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please report any unacceptable behavior to **[ichshakib@gmail.com](mailto:ichshakib@gmail.com)**.

---

## 🛠️ Ways to Contribute

1. [Suggesting or Adding New Resources](#-adding-new-resources-to-sitesjson)
2. [Reporting Bugs](#-reporting-bugs)
3. [Suggesting Enhancements](#-suggesting-enhancements)
4. [Contributing Code](#-contributing-code)

---

## 🌐 Adding New Resources to `sites.json`

The primary data directory is located in [`src/data/sites.json`](src/data/sites.json).

### Entry Format

When adding a new site, append an object following this schema:

```json
{
  "id": "unique-alphanumeric-id",
  "name": "Site Name",
  "url": "https://example.com/",
  "domain": "example.com",
  "category": "Movies & Shows",
  "regions": ["Global"],
  "tags": ["trusted"],
  "isTrusted": true,
  "isNew": true,
  "isFeatured": false,
  "description": "Brief description of the service and standout features.",
  "addedAt": 1787844000000,
  "order": 28
}
```

### Valid Categories
- `Movies & Shows`
- `Anime`
- `Manga`
- `Live TV & Sports`
- `Paid`
- `Apps`

### Criteria for Inclusion
- **Operational Uptime**: The website must be actively online and working.
- **Safety**: No malware, phishing, deceptive download lockers, or crypto-miners.
- **Quality**: Functional media player or clean reader experience.

---

## 🐛 Reporting Bugs

If you find a broken link, UI glitch, or server bug:
1. Check existing [Issues](https://github.com/ichshakib/portalix/issues) to avoid duplicates.
2. Open a new issue with a clear title and description.
3. Include relevant details: browser version, operating system, and steps to reproduce.

---

## 💡 Suggesting Enhancements

Feature requests are welcome! When opening an issue or proposing a change:
- Explain the problem you are solving.
- Describe the proposed solution and how it benefits Portalix users.
- Keep in mind our focus on **minimalism, speed, and clean dark-mode aesthetics**.

---

## 💻 Contributing Code

### Local Development Setup

1. **Fork the repository** on GitHub.
2. **Clone your fork locally:**
   ```bash
   git clone https://github.com/<your-username>/portalix.git
   cd portalix
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Verify the build passes:**
   ```bash
   npm run build
   ```

### Coding Standards
- **TypeScript**: Strict type checking is enabled. Avoid `any` types wherever possible.
- **Minimalism**: Maintain a distraction-free, neutral dark aesthetic. Avoid unnecessary heavy dependencies or flashy effects.
- **Icons**: Use [Lucide Icons](https://lucide.dev/) or inline SVGs. Do not use emoji for UI elements.
- **EJS Views**: Keep components modular inside `views/partials/`.

### Pull Request Process

1. Create a descriptive branch:
   ```bash
   git checkout -b feat/add-new-sites
   ```
2. Commit your changes with clear messages:
   ```bash
   git commit -m "feat: add 5 new verified anime streaming sources"
   ```
3. Push to your fork:
   ```bash
   git push origin feat/add-new-sites
   ```
4. Open a **Pull Request** against the `main` branch of `ichshakib/portalix`.
5. Describe your changes clearly in the PR template.

---

## 📬 Questions & Contact

For any questions, reach out directly at **[ichshakib@gmail.com](mailto:ichshakib@gmail.com)** or open a discussion on GitHub.

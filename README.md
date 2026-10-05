# 🌙 Lunabelle

> A dreamy, feminine meditation and self-care web app — private by design.

Lunabelle is a **vanilla HTML/CSS/JavaScript** wellness interface designed to work directly in the browser without a backend or account.

## ✨ Features

- 🧘 Meditation library with categories and favorites
- 🎧 Browser-generated ambient audio using the Web Audio API
- 🌬 Guided breathing exercises
- 💭 Mantras and daily affirmations
- 🌷 Mood check-in
- 📖 Private journal stored locally
- 📊 Meditation progress and streak tracking
- 🌙 Sleep mode
- ♿ Reduced-motion support
- 🔒 Local data storage, export and full wipe
- 📱 Responsive layout
- ⌨️ Keyboard support for the meditation player

## 🗂️ Project structure

```text
lunabelle/
├── index.html              # Application markup
├── css/
│   └── styles.css          # Design system, layout and responsive styles
├── js/
│   └── app.js              # Application state, UI logic, audio and storage
├── tests/
│   └── smoke.test.js       # Static architecture/smoke checks
├── .gitignore
├── package.json
└── README.md
```

The original project was a single `index.html`. It has been separated into clear layers so the codebase is easier to maintain, test and extend.

## 🧱 Architecture

### HTML
`index.html` contains the semantic page structure and accessible controls.

### CSS
`css/styles.css` contains:

- Design tokens
- Global styles
- Components
- Meditation scenes
- Player styles
- Responsive rules
- Accessibility/reduced-motion rules

### JavaScript
`js/app.js` contains:

- Static application data
- Local storage abstraction
- Utility functions
- Audio engine
- Player state
- View navigation
- Meditation rendering
- Favorites
- Mantras/affirmations
- Mood tracking
- Breathing engine
- Journal
- Progress/settings
- Data export/wipe
- Application initialization

## 🔒 Privacy model

Lunabelle is intentionally client-side.

User data is stored under the `lunabelle.*` namespace in `localStorage`. The application does not require an account or backend to operate.

Stored information includes:

- Journal entries
- Mood selections
- Meditation progress
- Favorites
- Preferences
- Display name
- Meditation intention

Users can export their locally stored Lunabelle data as JSON or erase it from the application.

> Important: browser `localStorage` is convenient client-side storage, not encrypted secure storage. Do not treat it as a secure vault for highly sensitive information.

## 🧪 Testing

The repository includes lightweight static smoke tests that verify:

- Required project files exist
- `index.html` references the external CSS/JS correctly
- There are no duplicate HTML IDs
- Meditation categories map to real meditation data
- Intention recommendations map to valid categories
- Core application selectors are present

Run:

```bash
npm test
```

No third-party test dependency is required.

## 🚀 Run locally

Because Lunabelle is a static application, it can be opened directly in a browser.

For a more production-like local environment, use any static server. For example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## 🌐 Deploy to GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this project.
3. Push the files to the default branch.
4. Open **Settings → Pages**.
5. Select **Deploy from a branch**.
6. Select the branch and `/ (root)` folder.
7. Save and wait for GitHub Pages to publish the site.

## 🛠️ Development principles

The refactor follows a few simple rules:

- Keep markup in HTML.
- Keep presentation in CSS.
- Keep behavior/data in JavaScript.
- Prefer reusable functions over duplicated logic.
- Keep browser-only persistence behind the `DB` abstraction.
- Keep accessibility attributes on interactive controls.
- Respect `prefers-reduced-motion`.
- Avoid unnecessary dependencies for a small static application.
- Validate data mappings when adding new meditation categories or intentions.

## 📌 Future improvements

Good next steps for a production-grade version:

1. Convert `app.js` into ES modules (`data/`, `storage/`, `audio/`, `ui/`).
2. Replace remaining inline event handlers with delegated event listeners.
3. Add automated browser tests with Playwright.
4. Add a service worker/PWA manifest for offline installation.
5. Add a formal accessibility audit.
6. Add Content Security Policy headers when deployed with configurable hosting.
7. Add stronger client-side data protection if the product ever handles sensitive information.

## 📄 License

Add the license you want to use before publishing the repository. For example, MIT is a common choice for open-source projects.


# 🌙 Lunabelle

A dreamy, feminine meditation and self-care web app — private by design.

Lunabelle is a peaceful digital space designed to support mindfulness, relaxation, emotional awareness, and everyday self-care through simple interactive experiences.

## ✨ Features

- **Meditation Library:** Explore meditation sessions for relaxation and mindfulness.
- **Ambient Audio:** Enjoy calming soundscapes generated with the Web Audio API.
- **Guided Breathing:** Follow breathing exercises to create moments of calm.
- **Mantras & Affirmations:** Discover positive reminders and encouraging words.
- **Mood Check-in:** Record how you feel and reflect on your emotional well-being.
- **Personal Journal:** Write private reflections saved locally on your device.
- **Progress Tracking:** Follow your activity and meditation streaks.
- **Sleep Mode:** Enjoy a calmer interface for nighttime use.
- **Reduced Motion:** Supports accessibility preferences for reduced animations.
- **Data Export & Deletion:** Export or delete locally stored information.
- **Responsive Design:** Works across desktop, tablet, and mobile devices.
- **Keyboard Accessibility:** Navigate supported features using a keyboard.

## 🛠️ Built With

- HTML5
- CSS3
- Vanilla JavaScript
- Web Audio API
- LocalStorage API

## 📁 Project Structure

```text
Lunabelle/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   └── app.js
│
├── tests/
│   └── smoke.test.js
│
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

## 🚀 Getting Started

You can run Lunabelle locally without installing additional dependencies for the basic experience.

### Option 1: Open Directly

1. Download or clone the repository.
2. Open the project folder.
3. Open `index.html` in your browser.

### Option 2: Use a Local Server

If Python is installed, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## 🧪 Testing

Run the project's smoke tests with:

```bash
npm test
```

Make sure the dependencies defined in `package.json` are installed if the test script requires them.

## 🔒 Privacy

Lunabelle is designed with privacy in mind.

- No account or registration is required.
- Personal information is stored locally in the browser.
- The application uses LocalStorage with the `lunabelle.*` key namespace.
- Journal entries and mood check-ins remain on the user's device.
- Users can export or delete locally stored information.
- No backend database is required for the core experience.

**Important:** LocalStorage is not encrypted secure storage. Anyone with access to the same browser profile may be able to access locally stored information.

## 🧩 Architecture

Lunabelle uses a simple client-side architecture:

- `index.html` provides the application structure.
- `css/styles.css` controls the visual presentation and responsive layout.
- `js/app.js` manages interactions, application logic, and local data.
- `tests/smoke.test.js` contains basic application tests.

The application is designed to remain lightweight and easy to maintain.

## ♿ Accessibility

Lunabelle aims to provide an accessible experience through:

- Responsive layouts.
- Keyboard navigation for supported controls.
- Reduced-motion preferences.
- Clear interface elements.
- Readable content and visual hierarchy.

## 🌱 Future Improvements

Potential future enhancements include:

- More guided meditation sessions.
- Additional ambient soundscapes.
- Expanded breathing exercises.
- More journaling and reflection features.
- Additional personalization options.
- Improved progress visualization.

## 💗 Development Principles

Lunabelle is built around four principles:

1. **Simplicity:** Keep the experience intuitive and easy to use.
2. **Privacy:** Keep personal information under the user's control.
3. **Accessibility:** Make the experience usable across different devices and needs.
4. **Mindfulness:** Encourage small, intentional moments of self-care.

## 📄 License

**MIT License**

See the [LICENSE](LICENSE) file for the complete license terms.

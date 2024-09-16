# Calculator JS

Task: https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit

This is a simple yet functional calculator web application that supports basic arithmetic operations, percentage calculations, and a dark/light theme switch. The calculator is built using JavaScript, HTML, and CSS, and is bundled using Webpack.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, and division
- Percentage calculations
- Toggle between positive and negative values
- Clear (AC) functionality
- Keyboard input support for numbers, operators, and special keys (e.g., Enter, Backspace)
- Responsive design
- Dark and light theme switch with local storage support
- Prevents consecutive operator inputs and handles invalid expressions gracefully

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/annisssimo/calculator-js.git
   cd calculator-js
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run start
   ```

4. Build the project for production:
   ```bash
   npm run build
   ```

## Usage

Once the project is set up, open the app in your browser. You can interact with the calculator using the on-screen buttons or keyboard input.

### Keyboard Shortcuts
- Numbers: `0-9`
- Operators: `+`, `-`, `*`, `/`
- Percentage: `%`
- Clear: `Escape` or `AC`
- Backspace: `Backspace` or `Delete`
- Equals: `Enter`
- Toggle between positive/negative: `ArrowDown` or `ArrowUp`

### Theme Switching
The calculator offers a light and dark mode, which can be toggled using the theme switch at the top of the calculator. The theme setting is saved in local storage, so it persists across sessions.

## Project Structure

```bash
calculator-js/
├── dist/                    # Compiled output (generated after running build)
├── src/                     # Source code
│   ├── css/                 # Stylesheets
│   ├── html/                # HTML template
│   ├── js/                  # JavaScript source files
│       ├── calculator.js    # Core calculation logic
│       ├── display.js       # Handles updating the calculator display
│       ├── inputHandlers.js # Button and keyboard event handlers
│       ├── theme.js         # Theme initialization and toggling logic
│       └── index.js         # Main entry point
├── .prettierrc              # Prettier configuration
├── .babel.config.json       # Babel configuration
├── .eslint.config.mjs       # Eslint configuration
├── webpack.config.cjs       # Webpack configuration
├── package.json             # Project metadata and dependencies
└── README.md                # This file
```

## Technologies Used

- **JavaScript**: Handles all functionality, including event handling and calculation logic.
- **CSS**: Styles the calculator and manages theme transitions.
- **Webpack**: Bundles the code, optimizes assets, and manages development and production builds.
- **Babel**: Transpiles modern JavaScript for compatibility with older browsers.

## Development

To modify the code:
1. Edit the source files in the `src` directory.
2. Run `npm run start` to launch the development server with live reload.

### Linting & Prettier

Make sure your code follows the linting and formatting rules:
- Run ESLint: `npm run lint`
- Automatically fix issues: `npm run lint:fix`

## Deployment

After building the project (`npm run build`), the production-ready files will be in the `dist` folder. You can host this on any static server (e.g., GitHub Pages, Netlify).

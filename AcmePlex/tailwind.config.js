/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        acmeRed: {
          DEFAULT: '#91162d',
          light: '#b32b46',     // Slightly lighter shade
          lighter: '#d74b66',   // Lighter shade for hover or accent
          lightest: '#f4b2bc',  // Lightest shade for backgrounds or borders
          dark: '#751022',      // Darker shade for borders or emphasis
          darkest: '#5a0d1a',   // Darkest shade for deep accents or text
        },
        acmeBlue: {
          DEFAULT: '#091b39',   // Main Acme Blue
          light: '#102b58',     // Slightly lighter shade
          lighter: '#334d7d',   // Lighter shade for hover or accent
          lightest: '#a6b4d1',  // Lightest shade for backgrounds or borders
          dark: '#08132c',      // Darker shade for borders or emphasis
          darkest: '#050d1f',   // Darkest shade for deep accents or text
        },

        // Complementary Neutral Colors
        neutral: {
          100: '#f9fafb',       // Light background or surface color
          200: '#e5e7eb',       // Light border or input background
          300: '#d1d5db',       // Muted border or disabled elements
          500: '#6b7280',       // Neutral text, icons, or secondary content
          700: '#374151',       // Dark text for headings or primary text
          900: '#111827',       // Darkest neutral, good for high contrast
        },

        // Accent Color (optional, for buttons or highlights)
        acmeYellow: {
          DEFAULT: '#f59e0b',    // Accent yellow color for call-to-action elements
          light: '#fbbf24',      // Lighter yellow for hover effects
          lighter: '#fde68a',     // Even lighter yellow
          dark: '#d97706',       // Darker shade for emphasis
        } 
      },
    },
  },
  plugins: [],
}


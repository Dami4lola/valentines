# Valentine's Day Website 💕

A romantic interactive website to ask someone to be your valentine, with tracking capabilities.

## Features

- Interactive "Yes" and "No" buttons
- "No" button moves randomly when clicked
- "Yes" button grows larger each time "No" is clicked
- Follow-up question on success page
- Email tracking of "No" button clicks
- Beautiful romantic design

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd valentines
   ```

2. **Configure tracking (optional)**
   - Copy `config.example.js` to `config.js`
   - Fill in your EmailJS credentials (see `TRACKING_SETUP.md` for details)
   - `config.js` is gitignored and won't be committed

3. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use a local server: `python3 -m http.server 8000`

## Important Notes

- **Never commit `config.js`** - it contains sensitive credentials
- The `config.example.js` file is safe to commit as a template
- See `TRACKING_SETUP.md` for detailed tracking setup instructions

## File Structure

- `index.html` - Main page with valentine question
- `success.html` - Success page with follow-up question
- `breakfast.html` - Final page when "No" is clicked 3 times
- `plans.html` - Final page when "Yes" is clicked
- `script.js` - Main page JavaScript
- `success-script.js` - Success page JavaScript
- `tracking.js` - Tracking utility
- `config.js` - Configuration (gitignored)
- `config.example.js` - Configuration template
- `style.css` - Styling

## License

Personal use project
